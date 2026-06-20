# BACKEND_ARCHITECTURE_SOUL.md — Arkitekturprinsipper for ExamPrepper Backend

<!-- Sist oppdatert: 2026-06-06 -->

Dette dokumentet beskriver arkitekturen slik den **skal** være.
Kodebasen følger disse reglene. Ny kode skal ikke bryte dem.

Når du er i tvil om hvor noe hører hjemme, les dette først.

---

## Arkitektur: lagdelt backend med manuell dependency injection

```text
HTTP Request
  ↓
Route (= controller)
  ↓
Repository eller Use Case
  ↓
Domain Service / Repository Interface
  ↓
Postgres-implementasjon
  ↓
PostgreSQL hybridmodell
```

Hvert lag har ett ansvar. Ingen lag hopper over et annet.

Routes kaller repositories direkte for rene lesinger.
Routes kaller use cases for operasjoner som trenger orkestrering.
Use cases kaller repositories og domain services.
Ingen av disse lagene vet om HTTP, Express eller `req`/`res`.

---

## Kjent teknisk gjeld

Følgende avvik er kjente. Ny kode skal ikke introdusere tilsvarende brudd.

- **Smoke-test er eneste test** — `test/smoke.test.ts` sjekker `expect(true).toBe(true)`.
  Det finnes ingen reelle repository-tester, route-tester eller integrasjonstester ennå.
- **Container wirer bare SubjectRepository** — `ExamRepository` og `QuestionRepository`
  finnes ikke ennå. Containeren utvides når de implementeres.

### Testkrav før neste fase

Scoring er kjernefunksjonalitet. Den skal ikke bygges uten tester.

```text
Før POST /exam-attempts implementeres:
  GradeAnswerServiceImpl har unit-tester for alle spørsmålstyper.
  ScoreServiceImpl har unit-tester.
  CreateExamAttemptUseCase har unit-tester med mock-repositories.

Før PostgresQuestionRepository brukes i API:
  Hydrering av minst én spørsmålstype er integrasjonstestet.

Før deployment:
  Smoke-test er erstattet med minst én route-test via supertest.
```

---

## Lagene

### 1. HTTP / Routes — `src/http/routes/`

Routes er controllere. Én fil per domeneentitet.

En route skal:

- ta imot HTTP request
- hente validerte params/query/body (via Zod-middleware)
- kalle repository eller use case
- returnere JSON-response
- sende feil til `next(error)`

En route skal ikke:

- ha SQL eller tabellnavn
- vite om `question_options`, `drag_cards` eller `attempt_question_results`
- beregne score
- importere `pg` eller `Pool`
- bygge domeneobjekter fra rå database-rows

```typescript
// Riktig — route kaller repository, returnerer resultat:
router.get("/subjects/:id", async (req, res, next) => {
    try {
        const subject = await subjectRepo.findById(req.params.id);
        if (!subject) {
            res.status(404).json({ error: "Subject not found" });
            return;
        }
        res.json(subject);
    } catch (error) {
        next(error);
    }
});

// Feil — route har SQL:
router.get("/subjects/:id", async (req, res) => {
    const result = await pool.query("SELECT * FROM subjects WHERE id = $1", [req.params.id]);
    res.json(result.rows[0]);
});

// Feil — route beregner score:
router.post("/exam-attempts", async (req, res) => {
    const questions = await questionRepo.findForGrading(req.body.examId);
    const score = questions.reduce((sum, q) => /* ... */);
    // ...
});
```

Scoring hører i domain services, ikke i routes.

### 2. Middleware — `src/http/middleware/`

Middleware er tverrgående HTTP-kode.

| Fil | Ansvar |
|---|---|
| `security.ts` | helmet, cors, express.json limit, rate-limit |
| `requestValidator.ts` | Zod-validering av params, query og body |
| `errorHandler.ts` | Mapper feiltyper til HTTP-statuskoder |
| `authMiddleware.ts` | Auth-verifisering (legges til senere) |

Middleware vet om HTTP. Den vet ikke om domenelogikk, database eller scoring.

```typescript
// Riktig — errorHandler mapper feiltyper:
if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message });
    return;
}

// Feil — errorHandler har domenekjennskap:
if (err.message.includes("question_options")) {
    res.status(500).json({ error: "Failed to load options" });
}
```

### 3. Use Cases — `src/usecases/`

Use cases finnes kun når en operasjon trenger orkestrering.

Trivielle lesinger uten policy-, mode- eller sikkerhetslogikk går direkte fra route
til repository. Hvis en lesing involverer mode-valg, fasit-policy, auth-sjekk eller
annen forretningslogikk, bør den gå via en use case eller en dedikert funksjon.

| Operasjon | Use case? | Grunn |
|---|---|---|
| GET /subjects | Nei | Triviell lesing, ingen policy |
| GET /exams/:id | Nei | Triviell lesing |
| GET /exams/:id/questions?mode=practice | Vurder | Involverer fasit-policy |
| POST /exam-attempts | Ja | Henter spørsmål, scorer, persisterer i transaksjon |

En use case:

- mottar repository-interfaces og domain services via konstruktøren
- eksponerer `execute(command)` som eneste offentlige metode
- vet ikke om HTTP, Express, `req`/`res` eller SQL
- returnerer et domeneobjekt eller kaster en domenefeil

```typescript
export class CreateExamAttemptUseCase {
    constructor(
        private examRepo: ExamRepository,
        private questionRepo: QuestionRepository,
        private attemptRepo: ExamAttemptRepository,
        private scoreService: ScoreService
    ) {}

    async execute(command: CreateAttemptCommand): Promise<ExamAttemptResult> {
        const exam = await this.examRepo.findById(command.examId);
        if (!exam) throw new NotFoundError("Exam not found");

        const questions = await this.questionRepo.findForGrading(command.examId);

        const grading = this.scoreService.calculateScore(questions, command.answers);

        return await this.attemptRepo.create({
            examId: command.examId,
            userId: command.userId,
            lang: command.lang,
            questionResults: grading.questionResults
        });
    }
}
```

Use case vet ikke hvordan svarene persisteres. Det er repository-ansvar.

```typescript
// Feil — use case med for mange ansvar:
export class ExamUseCase {
    fetchQuestions() { ... }
    gradeAnswer() { ... }
    calculateScore() { ... }
    saveAttempt() { ... }
}

// Riktig — ett ansvar per klasse:
export class CreateExamAttemptUseCase { async execute() { ... } }
```

### 4. Repository Interfaces — `src/domain/repositories/`

Repository interfaces definerer hva backend trenger, ikke hvordan databasen ser ut.

```typescript
export interface SubjectRepository {
	findAll(): Promise<Subject[]>;
	findById(id: string): Promise<Subject | null>;
}

export interface QuestionRepository {
	findForExam(examId: string): Promise<QuestionForExam[]>;
	findForPractice(examId: string): Promise<QuestionWithAnswerKey[]>;
	findForGrading(examId: string): Promise<QuestionWithAnswerKey[]>;
}

export interface ExamAttemptRepository {
	create(command: PersistExamAttemptCommand): Promise<ExamAttemptResult>;
	findById(attemptId: string): Promise<ExamAttempt | null>;
	findByUserId(userId: string): Promise<ExamAttemptSummary[]>;
}
```

Interfacet nevner aldri `Pool`, `pg`, tabellnavn eller SQL. Det returnerer domeneobjekter.

`QuestionRepository` har tre eksplisitte metoder i stedet for et boolean-flagg.
`findForExam` returnerer `QuestionForExam[]` uten fasitfelter. `findForPractice` returnerer
`QuestionWithAnswerKey[]` med fasit. `findForGrading` brukes internt av `CreateExamAttemptUseCase`.

`QuestionForExam` og `QuestionWithAnswerKey` er separate typer, ikke én type med optional
fasitfelter. TypeScript håndhever at en route som bruker `findForExam` aldri har tilgang
til fasitfelter.

Når auth innføres, skal `findById` på `ExamAttemptRepository` scopes med userId:

```typescript
// Nåværende (v1, uten auth):
findById(attemptId: string): Promise<ExamAttempt | null>;

// Med auth:
findByIdForUser(attemptId: string, userId: string): Promise<ExamAttempt | null>;
```

I v1 uten auth returneres attempt-resultat primært direkte fra POST-responsen.
`GET /exam-attempts/:id` bør enten utsettes til auth finnes, eller behandles som
en offentlig delbar resultatlenke der attemptId fungerer som tilgangsnøkkel.

Routes og use cases importerer interfacet, ikke Postgres-klassen.

### 5. Domain Services — `src/domain/services/`

Domain services inneholder ren logikk uten SQL og HTTP.

```typescript
export interface GradeAnswerService {
	grade(question: QuestionWithAnswerKey, answer: unknown): QuestionGradeResult;
}

export interface ScoreService {
	calculateScore(
		questions: QuestionWithAnswerKey[],
		answers: ExamAnswers
	): GradeResult;
}
```

Scoring trenger fasit. Typene gjenspeiler det. `QuestionForExam` kan ikke sendes
til grading fordi den mangler fasitfelter.

`GradeAnswerServiceImpl` vet om grading-regler per spørsmålstype.
`ScoreServiceImpl` delegerer til `GradeAnswerService` og summerer resultater.
Ingen av dem vet om database, HTTP eller filsystem.

### 6. Infrastructure — `src/infrastructure/`

Infrastructure inneholder konkrete implementasjoner som avhenger av eksterne systemer.

`infrastructure/postgres/` inneholder Postgres-repositories:

```text
PostgresSubjectRepository
PostgresExamRepository
PostgresQuestionRepository
PostgresExamAttemptRepository
```

Disse er de eneste stedene `Pool`, `PoolClient` og SQL-queries forekommer (utenom migrasjoner).

Domain service-implementasjoner (`GradeAnswerServiceImpl`, `ScoreServiceImpl`) ligger
under `domain/services/`, ikke under `infrastructure/`. De har ingen database- eller
HTTP-avhengigheter.

Repositories følger aggregater, ikke tabeller.

```text
// Riktig — ett repository per aggregat:
PostgresQuestionRepository    // leser questions + options + cards + targets + ...
PostgresExamAttemptRepository // skriver exam_attempts + attempt_question_results

// Feil — ett repository per tabell:
PostgresQuestionOptionRepository
PostgresDragCardRepository
PostgresDragTargetRepository
PostgresCategorizeItemRepository
```

`PostgresQuestionRepository` henter hele Question-aggregatet fra normaliserte tabeller.
Implementasjonen kan bruke flere queries, joins eller SQL-aggregasjon, så lenge resultatet
er korrekt, testet og performant. Antall queries er en implementasjonsdetalj, ikke en
arkitekturregel.

`PostgresExamAttemptRepository` skriver `exam_attempts` og `attempt_question_results` i én transaksjon med `BEGIN`/`COMMIT`/`ROLLBACK`.

### 7. Database — `src/db/`

SQL finnes bare i infrastructure-laget og i migrasjonsfiler under `src/db/migrations/`.

Routes og use cases skal aldri importere `pg` eller kjenne tabellnavn.

Migrasjonsfiler bruker `.cjs`-utvidelse fordi prosjektet har `"type": "module"` i package.json.

Migrasjonsfiler slettes aldri. De er databasehistorikk i kode.

---

## DI-container — `src/container.ts`

`container.ts` er det eneste stedet hele backenden wires sammen.

Den instansierer config, pool, repositories, domain services og use cases i riktig rekkefølge.

```typescript
const config = loadConfig();
const pool = createPool(config.databaseUrl, config.nodeEnv, config.pgSslRejectUnauthorized);

const subjectRepo = new PostgresSubjectRepository(pool);
const examRepo = new PostgresExamRepository(pool);
const questionRepo = new PostgresQuestionRepository(pool);

const gradeAnswerService = new GradeAnswerServiceImpl();
const scoreService = new ScoreServiceImpl(gradeAnswerService);

const attemptRepo = new PostgresExamAttemptRepository(pool);
const createAttemptUseCase = new CreateExamAttemptUseCase(
    examRepo, questionRepo, attemptRepo, scoreService
);
```

Containeren inneholder ingen logikk. Bare konstruktørkall og eksport.

`app.ts` mottar containeren og kobler routes til repository-instanser og use cases.
Routes mottar ferdig-instansierte avhengigheter som parametre.

```typescript
// Riktig — route mottar repository som parameter:
export function createSubjectRoutes(subjectRepo: SubjectRepository): Router { ... }

// Feil — route importerer Postgres-klasse direkte:
import { PostgresSubjectRepository } from "../../infrastructure/postgres/PostgresSubjectRepository.js";
```

---

## Manuell dependency injection — ingen magiske imports

### Prinsippet

Alle avhengigheter injiseres eksplisitt. Ingen fil henter selv det den trenger.

`container.ts` instansierer alt. `app.ts` mottar containeren og sender instanser
videre til route-factories. Route-factories mottar repositories og use cases som
funksjonsparametre. Use cases mottar repositories og services via konstruktøren.

Ingen annen fil importerer en konkret implementasjon for å bruke den.

```text
container.ts  (instansierer alt)
    ↓
app.ts  (mottar container, kobler routes)
    ↓
createSubjectRoutes(subjectRepo)  (mottar interface-instans)
    ↓
route handler bruker subjectRepo.findAll()  (allerede injisert)
```

### Hvem importerer `container.ts`?

Bare `server.ts`. Ingen andre filer.

`server.ts` kaller `createContainer()` og sender resultatet til `createApp()`.
Ingen route, use case, service eller repository importerer `container.ts`.

```typescript
// server.ts — eneste sted som importerer container:
import { createContainer } from "./container.js";
import { createApp } from "./app.js";

const container = createContainer();
const app = createApp(container);
```

### Ingen magiske imports

Tommelregel: hvis du skriver `import` i en route-fil, use case-fil eller service-fil
og stien inneholder `infrastructure/postgres/`, stopp. Du importerer en konkret
implementasjon i stedet for å motta et interface.

```typescript
// Forbudt — magisk import i route:
import { PostgresQuestionRepository } from "../../infrastructure/postgres/PostgresQuestionRepository.js";
const repo = new PostgresQuestionRepository(pool);

// Forbudt — magisk import i use case:
import { GradeAnswerServiceImpl } from "../infrastructure/postgres/GradeAnswerServiceImpl.js";
const service = new GradeAnswerServiceImpl();

// Forbudt — import av container i route:
import { createContainer } from "../../container.js";
const { questionRepo } = createContainer();
```

Alle disse hører i `container.ts`. Route og use case mottar ferdig-instansierte
avhengigheter. De vet ikke hvilken konkret klasse de bruker.

```typescript
// Riktig — route mottar interface som parameter:
export function createQuestionRoutes(questionRepo: QuestionRepository): Router {
    const router = Router();

    router.get("/exams/:examId/questions", async (req, res, next) => {
        try {
            const questions = await questionRepo.findForExam(req.params.examId);
            res.json(questions);
        } catch (error) {
            next(error);
        }
    });

    return router;
}
```

### Hvorfor manuell DI

Automatisk DI (InversifyJS, tsyringe, dekoratorer) løser et problem ExamPrepper ikke har.
Prosjektet har ca. 10 avhengigheter. Det er håndterbart med konstruktørkall i én fil.

Manuell DI gjør wiring eksplisitt og lesbar. Du ser hele avhengighetstreet i `container.ts`
uten å lete etter dekoratorer og metadata.

Ikke innfør et DI-rammeverk uten å ha et konkret problem manuell DI ikke løser.

### Testbarhet er konsekvensen

Manuell DI gjør at all kode kan testes i isolasjon.

Use cases testes ved å sende inn mock-repositories. Domain services testes direkte
uten avhengigheter. Routes testes med supertest og mock-repositories.

Ingen test importerer `container.ts`. Ingen test bruker den ekte databasen for
unit-tester. Avhengigheter injiseres som mocks.

```typescript
// Test lager sine egne avhengigheter:
const mockRepo = { findAll: vi.fn().mockResolvedValue([testSubject]) };
const route = createSubjectRoutes(mockRepo);

// Test bruker aldri container.ts:
// import { createContainer } from "../../src/container.js";  // FORBUDT
```

Kode som er vanskelig å teste har nesten alltid en skjult avhengighet som burde
vært injisert.

---

## Lav kobling, høy kohesjon

### Importregler per lag

| Fra | Kan importere | Skal ikke importere |
|---|---|---|
| Routes | Repository interfaces, use cases, middleware | Infrastructure, pg, SQL, Pool |
| Use cases | Repository interfaces, domain services | Routes, SQL, Postgres-klasser, Express |
| Domain services | Domenemodeller | HTTP, SQL, Express, pg |
| Infrastructure | pg, SQL, domenemodeller | Routes, use cases, Express |
| container.ts | Alt som trengs for wiring | Forretningslogikk |
| Migrasjoner | pgm (node-pg-migrate) | Applikasjonskode |

```typescript
// Feil — use case importerer Postgres-klasse:
import { PostgresQuestionRepository } from "../infrastructure/postgres/PostgresQuestionRepository.js";

// Riktig — use case importerer interface:
import type { QuestionRepository } from "../domain/repositories/QuestionRepository.js";
```

### Høy kohesjon — alt for ett aggregat samles i ett repository

`PostgresQuestionRepository` hydrerer alle spørsmålstyper fra alle detaljtabeller.

Mapping skal være kohesivt innenfor Question-aggregatet. Den kan ligge i samme fil
eller i private hjelpefiler i samme mappe. Poenget er at mapping ikke spres på tvers
av aggregater.

```typescript
// Akseptabelt — alt i samme fil:
function groupOptionsByQuestion(rows: OptionRow[], includeAnswerKey: boolean) { ... }
function groupDragCardsByQuestion(rows: DragCardRow[]) { ... }

// Også akseptabelt — splittet i samme mappe:
// infrastructure/postgres/question/
//   PostgresQuestionRepository.ts
//   mapOptions.ts
//   mapDragDrop.ts
//   mapCategorize.ts
```

---

## SOLID

### Single Responsibility

Én klasse, én grunn til å endre seg.

`GradeAnswerServiceImpl` vet om grading. `ScoreServiceImpl` vet om summering.
`PostgresQuestionRepository` vet om å hydrere spørsmål fra databasen.
`CreateExamAttemptUseCase` vet om å orkestrere grading og persistering.

Ingen av dem gjør mer enn én ting.

```typescript
// Feil — route gjør for mye:
router.post("/exam-attempts", async (req, res) => {
    const questions = await pool.query("SELECT ...");  // SQL i route
    const score = questions.reduce((sum, q) => /* grading i route */);
    await pool.query("INSERT INTO exam_attempts ...");  // persistering i route
    res.json({ score });
});

// Riktig — route bygger command og delegerer til use case:
router.post("/exam-attempts", async (req, res, next) => {
    try {
        const result = await createAttemptUseCase.execute({
            examId: req.body.examId,
            lang: req.body.lang,
            answers: req.body.answers,
            userId: null   // settes fra auth-token når auth innføres
        });
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});
```

### Open/Closed

Strengt tatt er ikke switch-basert dispatch Open/Closed, fordi klassen modifiseres
når en ny type legges til. Vi bruker det likevel fordi det er enkelt, lesbart og
typesikkert for antallet spørsmålstyper ExamPrepper har.

Ny spørsmålstype legges til med en ny `case`-gren i `GradeAnswerServiceImpl.grade()`
og `PostgresQuestionRepository`. Eksisterende grener er uberørt.

```typescript
grade(question: Question, answer: unknown): QuestionGradeResult {
    switch (question.type) {
        case "single": return this.gradeSingle(question, answer);
        case "multi": return this.gradeMulti(question, answer);
        // ... eksisterende typer uberørt ...
        case "newType": return this.gradeNewType(question, answer); // ny
    }
}
```

Det som er Open/Closed er at routes, use cases, middleware og container ikke endres
for en ny spørsmålstype. Endringene er begrenset til grading og repository.

Hvis antall spørsmålstyper vokser vesentlig, kan grading splittes i strategy-klasser
per type. Det gjøres når det faktisk er et problem, ikke før.

### Liskov Substitution

`PostgresSubjectRepository` implementerer `SubjectRepository`. Alle metoder returnerer
samme shape uavhengig av om implementasjonen bruker Postgres, SQLite eller en mock.

Når tester bruker en mock-repository, skal den returnere samme form som Postgres-versjonen.

### Interface Segregation

Repository-interfaces eksponerer kun metodene som trengs. `SubjectRepository` har
`findAll()` og `findById()`. Den har ikke `create()` eller `delete()` fordi subjects
opprettes via migrasjoner og seed, ikke via API.

### Dependency Inversion

Use cases og routes avhenger av repository-interfaces, ikke av Postgres-klasser.

`container.ts` er det eneste stedet der den konkrete Postgres-klassen kobles til interfacet.

```typescript
// Dependency inversion i praksis:
// Use case avhenger av interface:
constructor(private questionRepo: QuestionRepository) {}

// Container kobler konkret implementasjon:
const questionRepo = new PostgresQuestionRepository(pool);
const useCase = new CreateExamAttemptUseCase(examRepo, questionRepo, attemptRepo, scoreService);
```

---

## KISS

Løs problemet du har, ikke det du tror du får.

### Ikke lag use cases for trivielle lesinger

GET /subjects henter subjects. Route kaller `subjectRepo.findAll()`. Ferdig.
Ikke pakk det inn i `GetSubjectsUseCase` med en tom `execute()` som bare videresender.

```typescript
// Feil — unødvendig abstraksjon:
export class GetSubjectsUseCase {
    constructor(private subjectRepo: SubjectRepository) {}
    async execute(): Promise<Subject[]> {
        return this.subjectRepo.findAll();
    }
}

// Riktig — route kaller repository direkte:
router.get("/subjects", async (_req, res, next) => {
    try {
        const subjects = await subjectRepo.findAll();
        res.json(subjects);
    } catch (error) {
        next(error);
    }
});
```

Men en lesing som involverer policy (fasit/ikke fasit, auth, mode) er ikke triviell.
Da bør logikken ligge i en use case eller en dedikert funksjon, ikke i route-handleren.

### Ikke lag ett repository per tabell

Databasen er normalisert. Repositories følger aggregater.
11 hjelpetabeller for spørsmål betyr ikke 11 repositories.

### Ikke lag abstrakte Repository-baseklasser for tidlig

`PostgresSubjectRepository` er enkel. Ikke lag `AbstractPostgresRepository<T>` med generisk
CRUD. Lag det når du har tre repositories med genuint lik struktur, ikke før.

### Ikke lag service-lag som bare videresender

Hvis en service bare kaller repository uten å tilføre logikk, fjern servicen.

---

## Utvidbarhet og modularitet

### Ny spørsmålstype

Å legge til en ny spørsmålstype krever endringer i tre steder:

1. Ny detaljtabell i en migrasjon (f.eks. `timeline_items`).
2. Ny gren i `PostgresQuestionRepository` for hydrering.
3. Ny gren i `GradeAnswerServiceImpl` for scoring.

Ingen andre filer skal røres. Routes, use cases, middleware og container er uendret.
Eksisterende spørsmålstyper er uberørt.

Hvis å legge til en ny type krever endringer i routes eller use cases, er det et
tegn på at domenelogikk har lekket ut av riktig lag.

### Ny eksamen eller nytt fag

Legges til via seed-script eller migrasjoner. Ingen kodeendringer.

### Ny DataSource i frontend

Når frontend bytter fra mockdata til API, endres bare DataSource-filene i frontend.
Backend returnerer JSON som følger DTO-kontrakten i `REST_API.md`. Mockdata i frontend
ble designet etter samme kontrakt, så shapen matcher.

Hvis frontend må endre noe utenfor `src/model/datasource/` for å bruke API-et,
har enten backend returnert feil shape eller DTO-kontrakten har endret seg.
Begge deler bør løses i DataSource-laget, ikke i ViewModel eller View.

### Modulgrenser

Hvert lag er en modul med et tydelig interface.

Repository-interfaces er modulgrensen mellom routes/use cases og database.
Domain service-interfaces er modulgrensen mellom use cases og forretningslogikk.
Route-factories er modulgrensen mellom app.ts og HTTP-håndtering.

Modulgrenser defineres av TypeScript-interfaces. Konkrete klasser er interne
detaljer som kan byttes uten at noe utenfor modulen merker det.

---

## Designmønstre vi ikke bruker

ExamPrepper er én Express-server med én PostgreSQL-database.
Den er ikke et distribuert system med mange tjenester.

Følgende mønstre løser problemer vi ikke har. Ikke innfør dem uten
at prosjektet faktisk har problemet de løser.

| Mønster | Hva det løser | Hvorfor vi ikke trenger det |
|---|---|---|
| Circuit Breaker | Feil i én tjeneste sprer seg til andre | Vi har én tjeneste |
| CQRS | Les- og skrivetrafikk trenger ulik skalering | Vi har lav trafikk |
| Event Sourcing | Trenger full historikk over alle tilstandsendringer | Vi trenger bare siste tilstand |
| Message Queue | Asynkron kommunikasjon mellom tjenester | Vi har ingen asynkrone tjenester |
| API Gateway | Ruting mellom mange backend-tjenester | Vi har én backend |
| Sharding | Database er for stor for én server | Vi har noen hundre spørsmål |

Hvis prosjektet vokser til å trenge noen av disse, dokumenter det konkrete
problemet først. Ikke innfør et mønster fordi en artikkel anbefaler det.

---

## SSOT — Single Source of Truth

### Score

Score beregnes av backend. Frontend sender svar, ikke poeng.

`attempt_question_results` lagrer `points_awarded`, `max_points` og `is_correct` per spørsmål.
`exam_attempt_summary` VIEW beregner totalscore og prosent.

Frontend skal aldri beregne eller sende score i `POST /exam-attempts`.

### Fasit

Fasit lagres i normaliserte detaljtabeller (`question_options.is_correct`, `drag_correct_matches`, osv.).

I v1 er fasit i practice mode ikke hemmelig. ExamPrepper er en åpen øvingsplattform.
Practice mode er pedagogisk visning, ikke en sikkerhetsgrense. Exam mode skjuler
fasit for å simulere en reell eksamenssituasjon, ikke for å beskytte hemmelig innhold.

`QuestionRepository` bruker eksplisitte metoder for å skille:

```typescript
findForExam(examId)      // uten fasit
findForPractice(examId)  // med fasit
findForGrading(examId)   // med fasit, brukes internt av scoring
```

TypeScript-typene `QuestionForExam` og `QuestionWithAnswerKey` er separate typer.
En route som bruker `findForExam` har ingen fasitfelter tilgjengelig.

### Publiserte eksamener er immutable

Spørsmål og fasit for publiserte eksamener endres ikke etter publisering.
Endringer gjøres ved å opprette nye eksamener, ikke ved å modifisere eksisterende.

Dette er viktig fordi `CreateExamAttemptUseCase` leser spørsmål og scorer i
separate steg uten en felles transaksjon. Hvis spørsmål kunne endres mellom
lesing og scoring, ville attempt-resultater peke til feil versjon.

Immutabilitet eliminerer det problemet uten at vi trenger versjonering eller
unit-of-work-transaksjoner for lesing+skriving.

### Domenemodeller

`src/domain/models/` er det eneste stedet domenetyper defineres.

Routes, use cases og services importerer disse typene.
Postgres-repositories mapper database-rows til disse typene.
Ingen andre steder definerer egne varianter av `Question`, `Subject` eller `ExamAttempt`.

### Domenemodeller og API-responses

I v1 returnerer routes domenemodeller direkte som JSON. Domenemodellen og
API-shapen er nesten identiske, så et eget DTO-mapper-lag gir ingen verdi nå.

Hvis domenemodell og API-shape begynner å divergere (admin vs. student-views,
API-versjonering, felt som finnes i domenet men ikke skal ut), innfør da
mapper-funksjoner i routes eller i en egen `http/mappers/`-mappe. Ikke før.

### Tabellstruktur

`DATABASE_ARCHITECTURE.md` er fasit for tabellstrukturen.
Migrasjoner bygges mot DDL-en i det dokumentet.

ER-diagrammer som viser `questions.content JSONB` eller `exam_attempts.answers JSONB`
representerer en forkastet modell og skal ikke brukes som referanse.

---

## Filstruktur

```text
src/
  server.ts                         Starter serveren
  app.ts                            Setter opp Express, routes og middleware
  container.ts                      Wirer alle avhengigheter
  config.ts                         Leser .env, validerer config

  domain/
    models/
      Subject.ts                    Domenemodell
      Exam.ts
      Question.ts
      ExamAttempt.ts
    repositories/
      SubjectRepository.ts          Repository interface
      ExamRepository.ts
      QuestionRepository.ts
      ExamAttemptRepository.ts
    services/
      GradeAnswerService.ts         Service interface
      GradeAnswerServiceImpl.ts     Ren domenelogikk, ingen SQL/HTTP
      ScoreService.ts
      ScoreServiceImpl.ts

  usecases/
    CreateExamAttemptUseCase.ts      Orkestrering av scoring og persistering

  infrastructure/
    postgres/
      PostgresSubjectRepository.ts  Postgres-implementasjon
      PostgresExamRepository.ts
      PostgresQuestionRepository.ts
      PostgresExamAttemptRepository.ts
    auth/
      ClerkAuthService.ts           Auth (legges til senere)

  http/
    routes/
      healthRoutes.ts
      subjectRoutes.ts
      examRoutes.ts
      questionRoutes.ts
      attemptRoutes.ts
    middleware/
      security.ts
      requestValidator.ts
      errorHandler.ts

  db/
    pool.ts                         Database-pool
    migrations/
      NNNN_create-subjects-table.cjs
      NNNN_create-exam-bases-table.cjs
      ...
    seeds/
      seed.ts
```

### Regler

- Én fil per klasse eller interface.
- Filnavn matcher klassenavnet. `PostgresSubjectRepository.ts` inneholder `PostgresSubjectRepository`.
- Mapper speiler lag. `domain/repositories/` inneholder interfaces. `infrastructure/postgres/` inneholder implementasjoner.
- Testmappen speiler `src/`-strukturen.

---

## Teststruktur

```text
test/
  domain/
    services/
      GradeAnswerServiceImpl.test.ts
      ScoreServiceImpl.test.ts
  infrastructure/
    postgres/
      PostgresSubjectRepository.test.ts
      PostgresQuestionRepository.test.ts
      PostgresExamAttemptRepository.test.ts
  usecases/
    CreateExamAttemptUseCase.test.ts
  http/
    routes/
      subjectRoutes.test.ts
      examRoutes.test.ts
      attemptRoutes.test.ts
  smoke.test.ts
```

### Hva som skal testes

Domain services og use cases er kjernen. De inneholder forretningslogikk og skal testes i isolasjon uten database, Express eller HTTP.

| Lag | Testmetode |
|---|---|
| Domain services | Direkte instansiering, ingen avhengigheter |
| Use cases | Mock repositories og mock services |
| Repositories | Integrasjonstest mot database |
| Routes | Supertest med mock repositories |

### Domain services testes direkte

```typescript
describe("GradeAnswerServiceImpl", () => {
    const service = new GradeAnswerServiceImpl();

    describe("single choice", () => {
        test("returns correct when answer matches", () => {
            const result = service.grade(singleChoiceQuestion, "A");
            expect(result.isCorrect).toBe(true);
            expect(result.pointsAwarded).toBe(1);
        });
    });
});
```

### Use cases testes med mock repositories

```typescript
describe("CreateExamAttemptUseCase", () => {
    let useCase: CreateExamAttemptUseCase;
    let mockExamRepo: ExamRepository;
    let mockQuestionRepo: QuestionRepository;
    let mockAttemptRepo: ExamAttemptRepository;
    let mockScoreService: ScoreService;

    beforeEach(() => {
        mockExamRepo = { findById: vi.fn() };
        mockQuestionRepo = { findForExam: vi.fn(), findForPractice: vi.fn(), findForGrading: vi.fn() };
        mockAttemptRepo = { create: vi.fn(), findById: vi.fn(), findByUserId: vi.fn() };
        mockScoreService = { calculateScore: vi.fn() };

        useCase = new CreateExamAttemptUseCase(
            mockExamRepo, mockQuestionRepo, mockAttemptRepo, mockScoreService
        );
    });

    test("throws NotFoundError when exam does not exist", async () => {
        (mockExamRepo.findById as any).mockResolvedValue(null);
        await expect(useCase.execute(command)).rejects.toThrow(NotFoundError);
    });
});
```

Ikke importer instanser fra `container.ts` i tester. Avhengigheter injiseres som mocks.

### Routes testes med supertest

```typescript
import { createApp } from "../../src/app.js";

describe("GET /api/subjects", () => {
    test("returns subjects from repository", async () => {
        const mockRepo = { findAll: vi.fn().mockResolvedValue([testSubject]) };
        const container = createTestContainer({ subjectRepo: mockRepo });
        const app = createApp(container);

        const response = await request(app).get("/api/subjects");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });
});
```

### Testnavngiving

Testbeskrivelser skal leses som setninger.

```typescript
// Riktig:
test("returns true when all correct alternatives are selected", ...)
test("rolls back transaction when insert fails", ...)
test("excludes answer key when mode is exam", ...)

// Feil:
test("test1", ...)
test("gradeAnswer correct", ...)
```

---

## Navnekonvensjoner

| Type | Mønster | Eksempel |
|---|---|---|
| Route-fil | `[entity]Routes.ts` | `subjectRoutes.ts` |
| Route-factory | `create[Entity]Routes` | `createSubjectRoutes(repo)` |
| Repository interface | `[Entity]Repository` | `QuestionRepository` |
| Postgres impl | `Postgres[Entity]Repository` | `PostgresQuestionRepository` |
| Use case | `[Verb][Entity]UseCase` | `CreateExamAttemptUseCase` |
| Service interface | `[Name]Service` | `ScoreService` |
| Service impl | `[Name]ServiceImpl` | `ScoreServiceImpl` |
| Domenemodell | `[Entity]` | `Question`, `Subject` |
| DTO | `[Entity]DTO` | `QuestionDTO`, `ExamSummaryDTO` |
| Command | `[Verb][Entity]Command` | `CreateAttemptCommand`, `PersistExamAttemptCommand` |
| Error | `[Navn]Error` | `NotFoundError`, `ValidationError` |
| Migrasjon | `NNNN_[beskrivelse].cjs` | `1780738048290_create-subjects-table.cjs` |

### Eksplisitte navn

Samme regler som frontend-SOUL. Navn skal fortelle hva ting er uten å lese implementasjonen.

```typescript
// Feil — sier ingenting:
const data = await repo.findForExam(examId);
const result = service.grade(question, answer);

// Riktig:
const questions = await questionRepo.findForExam(examId);
const gradeResult = gradeAnswerService.grade(question, answer);
```

### Booleans

```typescript
// Feil:
const flag = true;
const status = submitted;

// Riktig:
const isCorrect = true;
const isPracticeMode = mode === "practice";
const hasSubmitted = attempt.submitted_at !== null;
```

### Database-kolonner vs. domenefelter

Database bruker `snake_case`. Domenemodeller og DTO-er bruker `camelCase`.
Repository-laget mapper mellom dem.

```typescript
// I PostgresSubjectRepository:
function mapRow(row: SubjectRow): Subject {
    return {
        id: row.id,
        code: row.code,
        name: row.name,
        appName: row.app_name ?? null,     // snake_case → camelCase
        iconKey: row.icon_key ?? null
    };
}
```

---

## Kodestil — OOP med konstruktør-injeksjon

### Prinsippet

Backend-koden bruker klassebasert OOP med konstruktør-injeksjon.
Avhengigheter sendes inn via konstruktøren. Tilstand holdes i private felter.
Metoder opererer på injiserte avhengigheter, ikke på importerte globaler.

Funksjonell stil (løse funksjoner, currying, closures for state, higher-order
functions som returnerer functions) brukes ikke der en klasse med konstruktør
gjør det samme.

```typescript
// Riktig — klasse med konstruktør-injeksjon:
export class PostgresSubjectRepository implements SubjectRepository {
	constructor(private pool: Pool) {}

	async findAll(): Promise<Subject[]> {
		const result = await this.pool.query("SELECT ...");
		return result.rows.map(this.mapRow);
	}

	private mapRow(row: SubjectRow): Subject {
		return { id: row.id, code: row.code, name: row.name };
	}
}

// Feil — funksjonell closure:
export function createSubjectRepository(pool: Pool) {
	return {
		findAll: async () => {
			const result = await pool.query("SELECT ...");
			return result.rows.map(mapRow);
		}
	};
}
```

### Hva som skal være klasser

Repositories, use cases og domain services skal alltid være klasser med
konstruktør. De har avhengigheter som injiseres, og de implementerer interfaces.

```typescript
// Riktig:
export class GradeAnswerServiceImpl implements GradeAnswerService {
	grade(question: Question, answer: unknown): QuestionGradeResult { ... }
}

export class CreateExamAttemptUseCase {
	constructor(
		private examRepo: ExamRepository,
		private questionRepo: QuestionRepository,
		private attemptRepo: ExamAttemptRepository,
		private scoreService: ScoreService
	) {}

	async execute(command: CreateAttemptCommand): Promise<ExamAttemptResult> { ... }
}
```

### Hva som kan være funksjoner

Route-factories (`createSubjectRoutes`) er funksjoner som mottar avhengigheter
og returnerer en `Router`. Det er et tillatt unntak fordi Express sin routing-modell
er funksjonsbasert.

Rene hjelpefunksjoner uten state (formatering, validering, mapping) kan være
frittstående funksjoner. De har ingen avhengigheter å injisere.

```typescript
// Tillatt — ren hjelpefunksjon uten state:
function mapRow(row: SubjectRow): Subject {
	return { id: row.id, code: row.code, name: row.name };
}

// Tillatt — route-factory:
export function createSubjectRoutes(subjectRepo: SubjectRepository): Router { ... }
```

### Hvorfor OOP

Klassebasert DI gjør avhengigheter synlige i konstruktøren. Du ser umiddelbart
hva en klasse trenger for å fungere. Med closures og factory-funksjoner forsvinner
den informasjonen inn i funksjonsparameterne og er vanskeligere å oppdage.

TypeScript-interfaces kan teknisk tilfredsstilles av objekter og factories uten
klasser. I dette prosjektet bruker vi likevel klasser for repositories, use cases
og services for å holde DI-stilen konsekvent og koden gjenkjennelig.

---

## Formatering

### Tabs, ikke spaces

All innrykk i backend-koden bruker **tabs**. Ikke spaces. Ingen unntak.

```typescript
// Riktig — tabs:
export class PostgresSubjectRepository implements SubjectRepository {
	constructor(private pool: Pool) {}

	async findAll(): Promise<Subject[]> {
		const result = await this.pool.query("SELECT ...");
		return result.rows.map(mapRow);
	}
}

// Feil — spaces:
export class PostgresSubjectRepository implements SubjectRepository {
    constructor(private pool: Pool) {}
}
```

Dette gjelder alle `.ts`-filer, `.cjs`-migrasjonsfiler og testfiler.

Konfigurer editoren med en `.editorconfig` i roten av prosjektet:

```ini
# .editorconfig
root = true

[*]
indent_style = tab
indent_size = 4
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

---

## Sikkerhet

### Parameterisert SQL alltid

Ingen string interpolation i SQL. Alltid `$1`, `$2`, osv.

```typescript
// Riktig:
await pool.query("SELECT * FROM subjects WHERE id = $1", [id]);

// Feil — SQL injection:
await pool.query(`SELECT * FROM subjects WHERE id = '${id}'`);
```

### Secrets aldri i kode

`.env` er i `.gitignore`. `.env.example` committes uten verdier.
Secrets (DATABASE_URL, CLERK_SECRET_KEY) settes kun i hostingplattformens dashboard.

### CORS er ikke auth

CORS begrenser browser-tilgang. Det stopper ikke curl, Postman eller scripts.
Ekte beskyttelse krever auth-tokens.

### Backend beregner score

Frontend sender svar (`answers`). Backend henter fasit, beregner score og persisterer.
Score fra frontend aksepteres aldri.

### userId fra token, aldri body

Når auth legges til, hentes userId fra det verifiserte JWT-tokenet.
Request body skal aldri inneholde userId.

```typescript
// Riktig — userId fra verifisert token:
const userId = req.auth.userId;

// Feil — userId fra body:
const userId = req.body.userId;
```

### Generisk error i production

Development logger stack trace. Production returnerer bare "Internal server error".

```typescript
res.status(500).json({
    error: isProduction ? "Internal server error" : err.message
});
```

### Input-validering

Zod validerer all input på HTTP-grensen. Repositories forutsetter at input er validert.

```typescript
const getExamQuestionsSchema = z.object({
    params: z.object({ examId: z.string().min(1) }),
    query: z.object({ mode: z.enum(["practice", "exam"]).default("practice") })
});
```

---

## Datamodellprinsipp

Spørsmål, fasit og struktur lagres normalisert i separate tabeller.

```text
questions
question_options
fill_accepted_answers
drag_cards
drag_targets
drag_correct_matches
categorize_categories
categorize_items
matrix_quadrants
matrix_items
sequence_items
```

Attempts lagres hybrid. Metadata er normalisert. Innsendte svar lagres som JSONB per spørsmål.

```text
exam_attempts                       — normalisert metadata
attempt_question_results            — én rad per spørsmål
  .submitted_answer JSONB           — det brukeren svarte
  .points_awarded                   — beregnet av backend
  .max_points
  .is_correct
```

Det finnes ikke 7 typespesifikke answer-tabeller.
Det finnes ikke én stor `answers JSONB`-blob på `exam_attempts`.

Begrunnelse for JSONB på `submitted_answer`: svarformatet varierer per spørsmålstype.
Single choice er en streng. Multi choice er en liste. Drag/drop er et map.
Å normalisere dette til egne tabeller gir ingen queryfordel og mye kompleksitet.
Men svaret er alltid bundet til et faktisk spørsmål via FK.

---

## Brudd på arkitekturen — konkrete eksempler

**SQL i route**
```typescript
// Forbudt:
router.get("/exams/:id/questions", async (req, res) => {
    const rows = await pool.query("SELECT * FROM questions WHERE exam_id = $1", [req.params.id]);
    res.json(rows);
});
```
SQL hører i repository. Route kaller `questionRepo.findForExam(examId)`.

**Postgres-import i use case**
```typescript
// Forbudt:
import { PostgresQuestionRepository } from "../infrastructure/postgres/PostgresQuestionRepository.js";
```
Use case importerer interface, ikke implementasjon.

**Score i route**
```typescript
// Forbudt:
const score = questions.filter(q => q.isCorrect).length;
```
Scoring hører i domain service.

**Tabellnavn i route**
```typescript
// Forbudt:
if (err.message.includes("exam_attempts")) { ... }
```
Route vet ikke at tabellen heter `exam_attempts`.

**Ett repository per tabell**
```typescript
// Forbudt:
export class PostgresQuestionOptionRepository { ... }
export class PostgresDragCardRepository { ... }
```
Repositories følger aggregater. Options og cards tilhører Question-aggregatet.

**userId fra body**
```typescript
// Forbudt:
const userId = req.body.userId;
```
userId kommer fra verifisert auth-token.

**Use case for ren lesing**
```typescript
// Unødvendig — route kaller repository direkte:
export class GetSubjectsUseCase {
    async execute() { return this.subjectRepo.findAll(); }
}
```

**Magisk import i route**
```typescript
// Forbudt — route henter avhengighet selv:
import { PostgresExamRepository } from "../../infrastructure/postgres/PostgresExamRepository.js";
import { createPool } from "../../db/pool.js";

const pool = createPool(/* ... */);
const examRepo = new PostgresExamRepository(pool);
```
Route mottar `examRepo` som parameter fra `app.ts`. Den instansierer ingenting selv.

**Import av container i test**
```typescript
// Forbudt — test bruker container i stedet for mocks:
import { createContainer } from "../../src/container.js";
const { subjectRepo } = createContainer();
```
Tester lager egne mock-avhengigheter. De importerer aldri `container.ts`.

**Konkret klasse som parameter-type**
```typescript
// Feil — route krever konkret klasse:
export function createSubjectRoutes(repo: PostgresSubjectRepository): Router { ... }

// Riktig — route krever interface:
export function createSubjectRoutes(repo: SubjectRepository): Router { ... }
```

---

## Hva hører hjemme hvor

| Spørsmål | Svar |
|---|---|
| Tar imot HTTP request, returnerer JSON | Route |
| Validerer params, query, body | Middleware (Zod) |
| Mapper feiltyper til statuskoder | ErrorHandler |
| Orkestrerer scoring og persistering | Use Case |
| Henter og hydrerer domeneobjekter fra database | Repository |
| Mapper database-rows til domenemodeller | Repository (private hjelpefunksjoner) |
| Beregner score per spørsmål | GradeAnswerService |
| Summerer score og prosent | ScoreService |
| Wirer alle avhengigheter | container.ts |
| Setter opp Express, routes og middleware | app.ts |
| Leser .env og validerer config | config.ts |
| Oppretter database-pool | pool.ts |
| Definerer tabellstruktur | Migrasjoner under src/db/migrations/ |
| Definerer domenetyper | src/domain/models/ |

---

## Kortversjon

> Databasen modellerer domenet. Repository-laget mapper database-rows til domenemodeller.
> Routes returnerer domenemodeller som JSON. Frontend vet ikke at databasen er normalisert.
> Routes er controllere. De kaller repositories for trivielle lesinger, use cases for skriving og policy-logikk.
> Routes sender aldri `req.body` direkte til use case. Bygg command eksplisitt.
> Use cases orkestrerer. Domain services beregner. Repositories persisterer.
> SQL finnes bare i infrastructure og migrasjoner. Domain services har ingen database-avhengigheter.
> Klassebasert OOP med konstruktør-injeksjon. Ikke funksjonell stil med closures og factories.
> `container.ts` wirer alt. Bare `server.ts` importerer den. Ingen logikk.
> Alle avhengigheter injiseres eksplisitt. Ingen fil henter selv det den trenger.
> Ingen route, use case eller service importerer fra `infrastructure/postgres/`.
> Repositories følger aggregater, ikke tabeller.
> Fasit styres av eksplisitte repository-metoder og separate typer, ikke boolean-flagg.
> Tabs, ikke spaces.
> Parameterisert SQL alltid. Secrets aldri i kode. Score aldri fra frontend.
> userId fra token, aldri body.
> Publiserte eksamener er immutable. Fasit i practice mode er ikke hemmelig.
> Ikke lag use cases for trivielle lesinger.
> Ikke lag repositories per tabell.
> Ikke lag abstraksjoner uten grunn.
> Ikke innfør designmønstre uten et konkret problem de løser.
> Ny spørsmålstype = ny migrasjon + ny gren i repository + ny gren i grading. Ingenting annet.
> Kode som er vanskelig å teste har en skjult avhengighet som burde vært injisert.
> Navngi presist. Test presist. Forklar hvorfor, ikke hva.

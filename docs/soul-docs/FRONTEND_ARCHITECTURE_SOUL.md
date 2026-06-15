# SOUL.md — Arkitekturprinsipper for ExamPrepper frontend

<!-- Sist oppdatert: 2026-05-29 -->

Dette dokumentet beskriver arkitekturen slik den **skal** være — ikke slik den tilfeldigvis har blitt.
Kodebasen følger disse reglene i stor grad, men har kjent gjeld der eldre kode ble skrevet
før reglene ble formalisert. Se [Kjent teknisk gjeld](#kjent-teknisk-gjeld) for detaljer.

Når du er i tvil om hvor noe hører hjemme — les dette først.

---

## Arkitektur: lagdelt MVVM med manuell dependency injection

```
Data          →   Repository   →   Domain (Use Cases)
                                        ↓
                                  dependencies.js
                                        ↓
                                    ViewModel
                                        ↓
                                      View (Page)
                                        ↓
                                   Komponenter
                                        ↓
                                  Subkomponenter
```

Hvert lag har ett ansvar. Ingen lag hopper over et annet.
Data flyter én vei: nedenfra og opp gjennom modellen, og deretter strikt ovenfra og ned gjennom View-hierarkiet.

---

## Kjent teknisk gjeld

Følgende brudd på arkitekturen er kjente og skal fikses. Ny kode skal ikke
introdusere tilsvarende brudd.

- **Filbanekommentarer uten mellomrom** — eldre filer bruker `//src/...` i stedet for `// src/...`
  (gjelder bl.a. `dependencies.js`, `ExamPage.jsx`, `ExamPageViewModel.js`).
- **`src/utils/answer/getCorrectIndexes.js`** — har domenekjennskap (`question.options[n].correct`).
  Hører i `src/model/domain/utils/` eller i det Use Case som bruker den.
- **Domenekjennskap i `ExamPage.jsx`** — importerer `QUESTION_TYPES` og beregner layout
  (`shouldUseScrollFooter`, `isDragDropQuestion` osv.) direkte i View. Denne logikken
  hører i `ExamPageViewModel` og skal eksponeres som ferdige verdier.
- **Generiske variabelnavn i `ExamPageViewModel`** — `loading`, `error` og `result` skal
  hete `questionsLoading`, `questionsLoadError` og `examScore`.

---

## Lagene

### 1. Datasource-laget — `src/model/datasource/`

- Det eneste stedet rådata hentes fra (mockfiler, API, localStorage, osv.)
- Ingen forretningslogikk, ingen transformasjon utover det strengt nødvendige for å lese dataene
- Instansieres i `dependencies.js` — aldri andre steder
- Eksempel: `new ConceptImageDataSource(conceptImageCatalogsBySubjectId)`

### 2. Repository-laget — `src/model/repositories/`

- Kombinerer og abstraherer én eller flere DataSources
- Eksponerer rene domeneobjekter — ikke rådata
- Vet ingenting om use cases eller ViewModels
- Mottar DataSource-instanser via konstruktøren (injisert fra `dependencies.js`)
- Eksempel: `new ExamRepository(examQuestionDataSource, conceptImageDataSource)`

### 3. Domain-laget — `src/model/domain/`

- Inneholder Use Case-klasser med ett enkelt ansvar hver
- Alle eksponerer `execute(...)` som eneste offentlige metode
- Mottar Repository-instanser (eller andre Use Cases) via konstruktøren
- Ingen UI-kjennskap, ingen React, ingen state
- Eksempel: `new CalculateExamScoreUseCase(gradeAnswerUseCase)`

### 4. DI-containeren — `src/di/dependencies.js`

- Det eneste stedet hele applikasjonen wires sammen
- Instansierer DataSources, Repositories og Use Cases i riktig rekkefølge
- Eksporterer ferdige Use Case-instanser — ingenting annet
- Ingen logikk, ingen betingelser — bare konstruktørkall og exports

```js
const examQuestionDataSource  = new ExamQuestionDataSource();
const examRepository          = new ExamRepository(examQuestionDataSource, conceptImageDataSource);
const getExamQuestionsUseCase = new GetExamQuestionsUseCase(examRepository);

export { getExamQuestionsUseCase };
```

### 5. ViewModel-laget — `src/ui/viewmodel/`

- Én ViewModel per side, skrevet som en React hook (`use[PageName]ViewModel`)
- Mottar Use Case-instanser som parametere — aldri importert direkte inne i hooken
- Eier all tilstand (`useState`, `useEffect`, `useMemo`, `useCallback`) for siden
- Returnerer ett objekt med state, avledede verdier og handlers
- Inneholder ingen JSX og ingen DOM-referanser
- Avledede presentasjonsverdier (labels, CSS-klassenavn) beregnes her — ikke i View

```js
export default function useExamPageViewModel(
    getExamQuestionsUseCase,
    gradeAnswerUseCase,
    calculateExamScoreUseCase,
    examId,
    language
) { ... }
```

### 6. View-laget — `src/ui/view/`

- Page-komponenter mottar `viewModel` som eneste prop
- Page-komponenten gjør ingen beregninger, ingen logikk — bare rendring og prop-drilling ned til underkomponenter
- Underkomponenter mottar spesifikke, navngitte props — ikke hele `viewModel`-objektet
- Ingen import av Use Cases, Repositories, DataSources eller `dependencies.js` i View-laget

```jsx
// Riktig:
export default function ExamPage({ viewModel }) {
    return (
        <div className={viewModel.workspaceClassName}>
            <Header
                scoreLabel={viewModel.scoreLabel}
                elapsedTimeLabel={viewModel.elapsedTimeLabel}
                onSubmit={viewModel.submitExam}
            />
        </div>
    );
}

// Feil — View beregner klassenavn selv:
const cls = question.categories.length >= 5 ? "wide" : "";
```

---

## App.jsx — navigasjon og instansiering

`App.jsx` er det eneste stedet ViewModels instansieres og kobles til Pages.
Bruk wrapper-komponenter for å isolere ViewModel-instansiering fra navigasjonslogikk:

```jsx
function ExamPageWrapper({ examId, language }) {
    const viewModel = useExamPageViewModel(
        getExamQuestionsUseCase,
        gradeAnswerUseCase,
        calculateExamScoreUseCase,
        examId,
        language
    );
    return <ExamPage viewModel={viewModel} />;
}

{activeScreen === NAV_SCREENS.EXAM && (
    <ExamPageWrapper examId={selectedExamId} language={language} />
)}
```

---

## Unidirectional data flow og state hoisting

### Prinsippet

State skal eies så høyt oppe i hierarkiet som mulig — alltid i ViewModel.
Data flyter én vei: ViewModel → Page → komponenter → subkomponenter.
Ingen komponent henter data selv. Den mottar det den trenger som props.

```
ViewModel  (eier all state og logikk)
    ↓ viewModel prop
  Page  (fordeler props nedover)
    ↓ spesifikke props
  Komponent  (bruker det den får, sender events opp via callbacks)
    ↓ spesifikke props
  Subkomponent  (rendrer kun)
```

### Data ned, events opp

Props og verdier flyter nedover. Brukerhandlinger bobler oppover som callbacks. Aldri omvendt.

En komponent som trenger å endre noe, kaller en callback den har fått som prop.
Den muterer aldri state direkte, og den importerer aldri noe for å gjøre det selv.

```jsx
// Riktig — komponenten rapporterer opp, ViewModel bestemmer:
<AnswerOption
    selected={isSelected}
    onSelect={() => viewModel.setSingleAnswer(question.id, option.id)}
/>

// Feil — komponenten sender en setter nedover:
<AnswerOption
    onSelect={() => setAnswers(prev => ({ ...prev, [id]: value }))}
/>
```

Callbacks navngis alltid med `on`-prefiks (`onSelect`, `onSubmit`, `onToggle`).
Dersom du sender en setter (`setAnswers`, `setCurrentIndex`) som prop til en komponent,
er det et tegn på at logikken hører i ViewModel — ikke i komponenten som mottar den.

### Komponenter henter ingenting selv

En komponent skal aldri:

- importere fra `dependencies.js`
- kalle et Use Case direkte
- ha egne `useState`-kall for data som tilhører siden
- bruke `useContext` for å hente forretningsdata

Egne `useState`-kall er tillatt kun for rent lokal UI-state som ingen andre komponenter
bryr seg om — se seksjonen om lokale interaksjonshooks nedenfor.

```jsx
// Feil — komponenten henter data selv:
import { getExamQuestionsUseCase } from "../../../di/dependencies.js";

function QuestionCard() {
    const [question, setQuestion] = useState(null);
    useEffect(() => {
        getExamQuestionsUseCase.execute(...).then(setQuestion);
    }, []);
}

// Riktig — komponenten mottar data som props:
function QuestionCard({ question, answer, submitted, onAnswer }) {
    return ...;
}
```

### Context er infrastruktur, ikke data

`useContext` er tillatt for rent tekniske cross-cutting concerns:
tema (lys/mørk), språkstrenger (`t.submit`), og innstillinger som ikke påvirker domenelogikk.

Dette er infrastruktur. Forretningsdata — spørsmål, svar, score, eksamensstatus —
skal aldri hentes via context. De skal sendes som props fra ViewModel.

### Ingen magiske imports i komponenter

Følgende er forbudt i alle filer under `src/ui/view/`:

```js
// Forbudt:
import { gradeAnswerUseCase } from "../../di/dependencies.js";
import ExamRepository from "../../model/repositories/ExamRepository.js";
```

Tommelregel: hvis du skriver `import` i en View-fil og stien inneholder
`model/`, `domain/`, `repositories/` eller `dependencies` — stopp.

---

## Lokale interaksjonshooks i View-laget

Drag-and-drop-komponenter (CategorySort, MatrixPlacement, TableMatch) bruker lokale hooks
(`useCategorySortQuestion`, `useMatrixPlacementQuestion`, `useTableMatchQuestion`)
som ligger i komponentmappene sine.

Dette er et tillatt unntak fra "ingen state i View"-regelen, men kun under disse vilkårene:

**Tillatt — hooken holder:**
- visuell interaksjonsstate: hvilken item er "valgt", hvilken dropzone er aktiv
- event-handlers for drag-and-drop (nettleser-APIer som `dataTransfer`, `dragOver`)
- avledede visningsverdier basert på props den allerede har mottatt

**Forbudt — hooken skal ikke:**
- kalle Use Cases
- importere fra `dependencies.js` eller `model/`
- eie state som andre komponenter utenfor sin egen tre trenger
- hente data fra noe annet enn props den mottar

```js
// Riktig — lokal hook opererer kun på props den mottar:
export function useCategorySortQuestion(params) {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [dragOverCategoryId, setDragOverCategoryId] = useState(null);

    const assignItem = (categoryId, itemId) => {
        // kaller callback den fikk som prop — bobler opp til ViewModel
        params.onSingleAnswer(params.question.id, nextAnswer);
    };
}
```

---

## Lav kobling, høy kohesjon

### Importregler per lag

| Fra | Kan importere | Kan ikke importere |
|---|---|---|
| View / komponent | Props (ingen imports av logikk) | Use Cases, Repositories, DataSources, `dependencies.js` |
| ViewModel | Use Cases (via parametere), React hooks | View-komponenter, andre ViewModels |
| Use Case | Repository (via konstruktør) | ViewModel, View, andre Use Cases (unntatt via konstruktør) |
| Repository | DataSource (via konstruktør) | Use Cases, ViewModel, View |
| DataSource | Rådata / ekstern kilde | Alle andre lag |

### Høy kohesjon — alt for én side samles i én ViewModel

Ikke spre sidens logikk over løse hjelpefiler og komponenter.

```js
// Feil — logikk spredt ut av ViewModel og inn i View:
// I ExamPage.jsx:
const getLongestText = (question) => { /* domenekjennskap */ };
const workspaceClass = isDragCategorize && count >= 5 ? "wide" : "";

// Riktig — alt samlet i ExamPageViewModel.js:
const workspaceClassName = useMemo(() =>
    deriveWorkspaceClassName(currentQuestion, submitted),
    [currentQuestion, submitted]
);
```

### `src/utils/` — tekniske hjelpefunksjoner uten domenekjennskap

`src/utils/` er forbeholdt generiske tekniske hjelpefunksjoner som ikke vet noe om
domeneobjektene i applikasjonen: stringformatering, datoutils, matematiske hjelpere.

Funksjoner som vet om `question.options`, `option.correct`, `answer.placements`
eller andre domenestrukturer hører ikke i `src/utils/`. De hører i
`src/model/domain/` eller absorberes direkte i det Use Case som bruker dem.

```js
// Feil — domenekjennskap i utils/:
// src/utils/answer/getCorrectIndexes.js
export function getCorrectIndexes(question) {
    return question.options
        .map((opt, i) => opt.correct ? i : null)
        .filter(Boolean);
}

// Riktig — flytt til src/model/domain/utils/ eller inn i relevant UseCase
```

---

## Bilder i utvidede forklaringer

Bilder som vises i feedback og utvidede forklaringer flyter gjennom alle lag og
berikes av Repository — ikke av View.

### Dataflyten

**1. Rådata — `src/data/subjects/{subjectId}/conceptImages.js`**

En flat liste av katalogoppføringer. Ingen `src`-strenger, ingen URL-er — bare metadata:

```js
{
    moduleId: "cio-tool-box",
    groupId: "cynefin",
    imageId: "cynefin_theory_of_everything",
    title: { no: "Cynefin-metoden", en: "The Cynefin method" },
    alt:   { no: "...", en: "..." },
    caption: { no: "...", en: "..." }
}
```

Selve bildefilene ligger i `public/subjects/{subjectId}/{moduleId}/{groupId}/{imageId}.{ext}`.

**2. DataSource — `ConceptImageDataSource.js`**

Det eneste stedet som vet hvordan en `src`-streng konstrueres:

```js
#buildSrc(subjectId, moduleId, groupId, imageId, ext) {
    return `/subjects/${subjectId}/${moduleId}/${groupId}/${imageId}.${ext}`;
}
```

Returnerer ferdige bildeobjekter: `{ id, src, alt, title, caption }`.

**3. Repository — `ExamRepository.js`**

Beriker spørsmålsobjekter med bilder ved lasting — ikke ved visning.
Resultatet er at `whyExtendedImages` er et ferdigbygd array på spørsmålet
når det når ViewModel.

Bildereferanser (`whyExtendedImageRefs`) ligger direkte på spørsmålet,
svarsalternativet eller targeten i mockdata som en array av `imageId`-strenger.
Repository løser dem via `ConceptImageDataSource` og legger ferdige
bildeobjekter på `whyExtendedImages`.

```js
// I mockdata — bare imageId, ingen filbaner eller mappestruktur:
whyExtendedImageRefs: ["cynefin_theory_of_everything"]
```

**4. View — komponenter som rendrer bilder**

`AnswerOptionExtendedPanel` og `DragDropFeedbackExplanation` mottar `images`-arrayet
som prop og rendrer `<figure>/<img>` direkte. De vet ingenting om hvordan bildene
ble hentet, og de konstruerer aldri `src`-strenger selv.

```jsx
// Riktig — komponenten mottar ferdige bildeobjekter:
function AnswerOptionExtendedPanel({ images = [] }) {
    return images.map(image => (
        <figure key={image.id ?? image.src}>
            <img src={image.src} alt={image.alt ?? ""} loading="lazy" />
            {image.caption && <p>{image.caption}</p>}
        </figure>
    ));
}

// Forbudt — komponenten bygger src selv:
const src = `/subjects/${subjectId}/${moduleId}/${imageId}.svg`;
```

### Legge til nye bilder

1. Legg bildefilen i `public/subjects/{subjectId}/{moduleId}/{groupId}/`
2. Legg til en oppføring i `src/data/subjects/{subjectId}/conceptImages.js`
3. Legg til `imageId` i `whyExtendedImageRefs` på spørsmålet eller alternativet

View-laget trenger ingen endringer.

---

## Fremtidig backend — DataSource-laget er bytte-punktet

ExamPrepper er i dag en ren frontend-applikasjon der DataSource-klassene henter data
fra lokale mockfiler. Arkitekturen er bevisst designet slik at en Express.js backend
kan innføres uten at noe annet enn DataSource-filene trenger å endres.

### Hvorfor dette fungerer

DataSource-metodene er allerede `async` og returnerer Promises — selv om de i dag
bare returnerer lokale objekter. Repository, Use Cases og ViewModel vet ikke om
dataen kom fra en fil eller et API. De venter bare på et Promise.

```js
// Slik ser det ut i dag:
export default class ExamQuestionDataSource {
    async fetchAllExams() {
        return EXAMS;              // returnerer mockdata direkte
    }

    async fetchExamById(examId) {
        return EXAMS.find(e => e.id === examId) ?? null;
    }
}

// Slik ser det ut med en Express-backend:
export default class ExamQuestionDataSource {
    #baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

    async fetchAllExams() {
        const response = await fetch(`${this.#baseUrl}/api/exams`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    }

    async fetchExamById(examId) {
        const response = await fetch(`${this.#baseUrl}/api/exams/${examId}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    }
}
```

Resten av applikasjonen — Repository, Use Cases, ViewModel, View — er uendret.

### Abstrakt baseklasse for HTTP

Når backend innføres, bør DataSource-klassene arve fra en felles abstrakt baseklasse
som håndterer URL-bygging, headers, feilhåndtering og logging. Mønsteret er det
samme som vist i Havsus-prosjektet:

```js
// src/model/datasource/DataSource.js
export default class DataSource {
    #baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
    #callCount = 0;

    async get(path) {
        this.#callCount += 1;
        const url = `${this.#baseUrl}/${path}`;
        const who = this.constructor.name;

        console.log(`[API][${who}] GET #${this.#callCount} → ${url}`);
        const startedAt = performance.now();

        const response = await fetch(url, {
            headers: { Accept: "application/json" }
        });

        const ms = Math.round(performance.now() - startedAt);

        if (!response.ok) {
            console.warn(`[API][${who}] FEIL ${response.status} etter ${ms}ms → ${url}`);
            throw new Error(`HTTP ${response.status}`);
        }

        console.log(`[API][${who}] OK ${response.status} etter ${ms}ms`);
        return response.json();
    }

    async post(path, body) {
        this.#callCount += 1;
        const url = `${this.#baseUrl}/${path}`;
        const who = this.constructor.name;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    }
}
```

```js
// src/model/datasource/ExamQuestionDataSource.js
import DataSource from "./DataSource.js";

export default class ExamQuestionDataSource extends DataSource {
    async fetchAllExams() {
        return this.get("api/exams");
    }

    async fetchExamById(examId) {
        return this.get(`api/exams/${examId}`);
    }

    async fetchExamByBaseIdAndLang(baseId, language) {
        return this.get(`api/exams/base/${baseId}?lang=${language}`);
    }
}
```

### Regler for DataSource-implementasjon

- Én DataSource-klasse per datakilde / API-domene
- Metodenavn beskriver hva som hentes, ikke hvordan: `fetchExamById`, ikke `getFromApi`
- Metodene er alltid `async` og returnerer alltid domeneobjekter eller `null` — aldri rå `Response`-objekter
- Feilhåndtering (HTTP-statuskoder) skjer i DataSource — Repository forutsetter at data er gyldig
- API-nøkler og base-URLer hentes fra miljøvariabler (`import.meta.env.VITE_*`), aldri hardkodet
- DataSource vet om HTTP og JSON — den vet ikke om domeneregler, Repository eller ViewModel

### Hva som ikke skal endres ved en backend-innføring

Når `ExamQuestionDataSource` og `SubjectDataSource` byttes fra mockfiler til
HTTP-kall, skal ingen av disse filene røres:

- `ExamRepository.js`
- `SubjectRepository.js`
- Alle Use Case-klasser
- `dependencies.js` (bortsett fra eventuell ny baseklasse-import)
- Alle ViewModels
- Alle View-komponenter

Hvis du må endre noe utenfor `src/model/datasource/` for å innføre en backend,
er det et tegn på at arkitekturgrensen er brutt et sted.

---

## Sikkerhet og secrets

### .env-filer og secrets

Alle hemmeligheter og miljøspesifikke verdier hører i `.env`-filer.
`.env`-filer skal alltid ligge i `.gitignore` og skal aldri committes.

Prosjektet skal ha en `.env.example` som viser hvilke variabler som trengs,
men uten faktiske verdier.

```
# .gitignore
.env
.env.local
.env.production
```

```
# .env.example — committes, viser struktur uten verdier
VITE_API_BASE_URL=
```

### Hva som aldri skal i frontend

Alt med `VITE_`-prefiks havner i den kompilerte JavaScript-bundlen og er
fullt lesbar for alle som åpner nettleseren. Det er ikke en feil — det er
designet slik. Det betyr at følgende aldri skal ligge i frontend, verken i
kode eller i `.env`-filer:

```env
# Forbudt i frontend:
VITE_ADMIN_API_KEY=...
VITE_JWT_SECRET=...
VITE_DATABASE_URL=...
VITE_SUPABASE_SERVICE_ROLE_KEY=...
```

Det eneste som er trygt å ha i frontend med `VITE_`-prefiks er offentlige
URL-er og ikke-sensitive konfigurasjoner:

```env
# Tillatt i frontend:
VITE_API_BASE_URL=https://api.example.com
VITE_SUPABASE_URL=https://xyz.supabase.co
VITE_SUPABASE_ANON_KEY=...   ← kun tillatt når Supabase RLS er aktivert
```

Backend-secrets hører utelukkende i backend sin `.env` eller i hosting-platformens
secret manager:

```env
# Kun i backend/.env — aldri i frontend:
DATABASE_URL=postgres://...
ADMIN_API_KEY=...
JWT_SECRET=...
CORS_ORIGIN=https://fredrikvogth.github.io
```

### XSS — ikke render brukerstyrt HTML

React escaper tekst automatisk når den rendres normalt. Det er trygt:

```jsx
<p>{question.title}</p>
```

`dangerouslySetInnerHTML` er forbudt. Bruk det ikke, uansett kilde.

```jsx
// Forbudt:
<div dangerouslySetInnerHTML={{ __html: question.explanation }} />
```

Hvis rik tekst må støttes i fremtiden, skal HTML sanitiseres før rendering
med et godkjent bibliotek (f.eks. DOMPurify). Det bestemmes eksplisitt —
ikke bare lagt til.

### Scoring tilhører backend

Frontend er aldri kilde til sannhet for resultater.

Når backend innføres, skal frontend sende svar — ikke beregnet score:

```js
// Riktig — frontend sender kun svar:
POST /api/exam-attempts
{
    "examId": "mock-exam-1-no",
    "answers": { "q1": "a", "q2": ["b", "c"] }
}

// Feil — frontend beregner og sender score:
POST /api/exam-attempts
{
    "score": 8,
    "percentage": 80,
    "passed": true
}
```

Backend henter fasit, beregner score og persisterer resultatet.
`CalculateExamScoreUseCase` og `GradeAnswerUseCase` brukes i dag lokalt
for å gi umiddelbar feedback i UI — det er greit for en øvingsplattform,
men de er ikke autoritative. Autoritativ scoring skjer på server.

---

## Filbanekommentarer

Alle kildefiler skal ha en filbanekommentar som første linje. Formålet er at enhver
fil kan leses i isolasjon — i en editor, i en AI-chat, i en code review — uten at
man trenger å se mappestrukturen for å vite hvor den hører hjemme.

### Format

```js
// src/ui/viewmodel/ExamPageViewModel.js
```

```css
/* src/ui/style/ExamPage/QuestionCard/index.css */
```

**Mellomrom etter `//` er obligatorisk.** `//src/` ser ut som en URL og er feil.

### Regler

- Første linje i filen, ingen blank linje før
- Stien er relativ fra prosjektroten (`src/...`)
- JS/JSX bruker `//`, CSS bruker `/* ... */`
- Kommentaren oppdateres hvis filen flyttes — en fil med feil sti i kommentaren
  er verre enn ingen kommentar, fordi den aktivt villeder

### Vanlige feil å unngå

```js
// Feil — mangler mellomrom:
//src/ui/viewmodel/ExamPageViewModel.js

// Feil — gammel sti etter refaktorering (ikke oppdatert):
// src/ui/view/components/ExamPage/QuestionCard/DragDrop/TableMatch/...
// (filen ligger nå under QuestionTypes/DragDrop/TableMatch/)

// Riktig:
// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Question/TableMatchQuestion.jsx
```

---

## CSS-struktur

### Prinsippet: CSS-mapper speiler komponentmapper

CSS-mappestrukturen under `src/ui/style/` skal speile komponentstrukturen under
`src/ui/view/components/`. For hver komponentmappe skal det finnes en tilsvarende
CSS-mappe med samme navn og samme nesting.

```
view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/CategorySort/
→ style/ExamPage/QuestionCard/QuestionTypes/DragDrop/CategorySort/
```

Dette gjelder ned til mappenivå, ikke nødvendigvis én CSS-fil per komponentfil.
En komponentmappe med mange komponenter kan samle styles i én eller noen få CSS-filer
— men mappen den ligger i skal matche.

### Entry point og importkjede

`App.css` er eneste entry point. Ingen komponentfil importerer CSS direkte.
All CSS importeres via `index.css`-filer som samler sin mappes innhold:

```
App.css
└── ExamPage/index.css
    ├── page.css
    ├── progress.css
    ├── responsive.css
    ├── FeedbackPanel/index.css
    ├── ResultBadge/index.css
    └── QuestionCard/index.css
        ├── Shared/index.css
        └── QuestionTypes/...
```

### Inndeling innad i en CSS-mappe

Én komponentmappe kan inneholde flere CSS-filer splittet på ansvar:

| Fil | Inneholder |
|---|---|
| `index.css` | Bare `@import`-linjer, ingen regler |
| `base.css` / `layout.css` | Struktur, posisjonering, flex/grid |
| `[del].css` | Én fil per distinkt ansvarsområde (knapper, kort, topbar) |
| `responsive.css` | Alle media queries for denne mappen samlet |

`responsive.css` er alltid sist i `index.css`.

### Tokens vs. komponent-CSS

`Tokens.css` inneholder kun globale design tokens: spacing, farger, radii, shadows,
overganger og dark mode-overrides. Disse gjelder hele applikasjonen.

Komponent-spesifikke størrelser og padding hører i komponentens egen CSS-fil —
ikke i `Tokens.css`.

```css
/* Riktig i Tokens.css — gjelder globalt: */
--radius-md: 16px;
--accent: #1067ff;

/* Feil i Tokens.css — komponent-spesifikt: */
--header-button-min-height: 54px;
--header-stat-card-min-width: 84px;
```

### Bruk tokens så høyt oppe i hierarkiet som mulig

En CSS-variabel skal defineres på det høyeste nivået der den er meningsfull.
Variabler som gjelder hele applikasjonen hører i `Tokens.css` på `:root`.
Variabler som bare gjelder én komponent hører i den komponentens CSS — ikke i `Tokens.css`.

Det betyr at komponent-CSS ikke skal hardkode verdier som allerede finnes som tokens:

```css
/* Feil — hardkoder verdi som finnes som token: */
.question-card {
    border-radius: 28px;
    background: #ffffff;
    box-shadow: 0 16px 48px rgba(18, 38, 63, 0.09);
}

/* Riktig — bruker token: */
.question-card {
    border-radius: var(--radius-xl);
    background: var(--panel-strong);
    box-shadow: var(--shadow-card);
}
```

Tommelregel: hvis du skriver en konkret fargeverdi, skygge, radius eller
spacing-verdi i en komponent-CSS-fil, sjekk om det finnes en token for det i
`Tokens.css` først. Finnes den — bruk tokenet. Finnes den ikke og verdien er
gjenbrukbar — vurder å legge den til i `Tokens.css`. Er den kun aktuell for
én komponent — la den bli i komponentens CSS.

Dark mode håndteres utelukkende via tokens. Komponent-CSS skal aldri ha
`.dark`-selektorer for farger og overflater — de skal bruke tokens som allerede
har dark mode-verdier definert i `.dark { }` i `Tokens.css`.

```css
/* Feil — komponent-CSS omdefinerer farger for dark mode: */
.question-card { background: var(--panel-strong); }
.dark .question-card { background: #07162a; }

/* Riktig — --panel-strong er allerede overstyrt i .dark i Tokens.css: */
.question-card { background: var(--panel-strong); }
```

---

## Hva hører hjemme hvor

| Spørsmål | Svar |
|---|---|
| Henter rådata | DataSource |
| Kombinerer datakilder, returnerer domeneobjekter | Repository |
| Beriker domeneobjekter med bilder | Repository (`ExamRepository`) |
| Forretningsregel med ett ansvar | Use Case |
| Wirer alt sammen | `dependencies.js` |
| State, handlers, avledede verdier, CSS-klassenavn | ViewModel |
| Fordeler props nedover, rendrer layout | Page |
| Rendrer én avgrenset del av UI | Komponent |
| Lokal drag-and-drop interaksjonsstate | Lokal hook i komponentmappen |
| Instansierer ViewModels, bestemmer hvilken Page som vises | `App.jsx` |
| Globale design tokens | `Tokens.css` |
| CSS for en komponent | CSS-mappe som speiler komponentmappen |

---

## Brudd på arkitekturen — konkrete eksempler

**Magisk import i komponent**
```js
// Forbudt:
import { getExamQuestionsUseCase } from "../../di/dependencies.js";
```
Use Cases injiseres inn i ViewModel. Ingen komponent importerer dem.

**Domenekjennskap i View**
```jsx
// Forbudt — View beregner layout basert på domeneobjekter:
const isWide = question.categories.length >= 5 || longestText >= 34;
```
Flytt til ViewModel. View mottar `viewModel.workspaceClassName` ferdig.

**Komponent henter egne data**
```jsx
// Forbudt:
const [questions, setQuestions] = useState([]);
useEffect(() => { fetch("/api/questions").then(...) }, []);
```
State og datahenting tilhører ViewModel. Komponenten mottar `questions` som prop.

**Setter sendes som prop**
```jsx
// Advarsel — indikerer at logikk hører i ViewModel:
<QuestionCard onAnswer={setAnswers} />
```
Wrap i en handler i ViewModel og send den ned i stedet.

**Hele viewModel sendes videre til underkomponent**
```jsx
// Unngå:
<QuestionCard viewModel={viewModel} />
```
Drill spesifikke props. `QuestionCard` skal ikke vite at en ViewModel eksisterer.

**Domenekjennskap i `src/utils/`**
```js
// Feil plassering:
// src/utils/answer/getCorrectIndexes.js vet om question.options[n].correct
```
Flytt til `src/model/domain/utils/` eller inn i det Use Case som bruker den.

**Komponent-tokens i `Tokens.css`**
```css
/* Feil — hører i Header/index.css eller Header/layout.css: */
--header-button-min-height: 54px;
```

**CSS-mappe som ikke matcher komponentmappe**
```
style/FeedbackPanel/   ← feil, komponenten ligger i view/ExamPage/FeedbackPanel/
style/ExamPage/FeedbackPanel/   ← riktig
```

**ViewModel importerer fra View-laget**
```js
// Forbudt:
import QuestionCard from "../view/components/QuestionCard.jsx";
```
ViewModel vet ikke at komponenter eksisterer. Eneste unntak er React selv.

---

## React-native kode — bruk React, ikke vanilla JS

Koden skal være React-native. Det betyr at React sine mekanismer brukes konsekvent
der de finnes, og vanilla JS DOM-APIer brukes bare der React ikke har et alternativ.

### State og refs

Bruk `useState` for reaktiv state. Bruk `useRef` for verdier som ikke skal trigge
re-render, eller for å holde en referanse til et DOM-element når det er strengt
nødvendig (f.eks. scroll-target eller focus-management).

```jsx
// Riktig:
const [isOpen, setIsOpen] = useState(false);

// Feil — vanilla JS muterer DOM direkte:
document.getElementById("panel").style.display = "block";
```

### Eventlytting

Bruk React sine syntetiske event-props (`onClick`, `onChange`, `onKeyDown`) for
brukerinteraksjon på egne elementer. Legg aldri til `addEventListener` på et
React-eid element.

```jsx
// Riktig:
<button onClick={handleClose}>Lukk</button>

// Feil — vanilla JS på React-eid element:
useEffect(() => {
    buttonRef.current.addEventListener("click", handleClose);
}, []);
```

`document.addEventListener` er tillatt kun for hendelser som ikke kan fanges via
React-props fordi de trenger global scope — typisk `keydown` på `document` for
Escape-håndtering i modaler, og `mousedown` for klikk-utenfor-deteksjon.
Begge skal alltid ryddes opp i cleanup-funksjonen i `useEffect`.

```jsx
// Tillatt — global scope er nødvendig:
useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
}, [isOpen, onClose]);
```

### Portaler

Bruk `createPortal` fra `react-dom` for å rendre modaler og overlays utenfor
komponenttreet. Ikke manipuler `document.body` direkte.

```jsx
// Riktig:
return createPortal(<Dialog />, document.body);

// Feil:
document.body.innerHTML += "<div class='dialog'>...</div>";
```

### Klasser og stilendringer

Bruk className-strenger og CSS-klasser for stilendringer — ikke inline
`element.style`-manipulasjon.

```jsx
// Riktig:
<div className={isActive ? "panel panel-open" : "panel"} />

// Feil:
ref.current.style.opacity = "1";
ref.current.style.transform = "translateX(0)";
```

Dark mode er unntaket: å toggle `.dark`-klassen på `document.documentElement`
er tillatt i `ThemeContext` fordi dark mode krever en global CSS-klasse på roten
som ikke kan håndteres av komponent-scoped className.

### Timere og animasjoner

Bruk `window.setInterval` / `window.clearInterval` og `window.requestAnimationFrame`
der timing er nødvendig. Disse skal alltid kalles inne i `useEffect` med cleanup.

```js
// Riktig — i ViewModel, med cleanup:
useEffect(() => {
    if (submitted) return;
    const id = window.setInterval(() => setElapsedSeconds(s => s + 1), 1000);
    return () => window.clearInterval(id);
}, [submitted]);
```

CSS-animasjoner og transitions foretrekkes fremfor JS-animasjoner der det er mulig.

### localStorage

Bruk `localStorage` kun i Context-providers for persistering av brukerpreferanser
(tema, språk). Aldri i ViewModels, komponenter eller Use Cases.

```jsx
// Riktig — i ThemeContext:
const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
});

// Feil — i en komponent eller ViewModel:
const saved = localStorage.getItem("theme");
```

### Oppsummert — tillatt vs. forbudt

| Situasjon | Bruk |
|---|---|
| Brukerinteraksjon på egne elementer | React event-props (`onClick`, `onKeyDown`) |
| Global tastatur- eller klikkdeteksjon | `document.addEventListener` i `useEffect` med cleanup |
| Modale overlays | `createPortal` |
| Stilendringer | `className` og CSS-klasser |
| Dark mode root-klasse | `document.documentElement.classList` i ThemeContext |
| Timere | `window.setInterval` / `window.clearInterval` i `useEffect` |
| Scroll-posisjon | `ref.current.scrollTo()` i ViewModel via `useRef` |
| Brukerpreferanser som skal persisteres | `localStorage` i Context-provider |
| DOM-manipulasjon ellers | Forbudt |

---

## Navnekonvensjoner

Prosjektet har faste navnmønstre per lag. Disse skal følges konsekvent slik at
filnavn alene forteller hvilket lag en fil tilhører og hva den gjør.

### Klasser og hooks

| Lag | Mønster | Eksempel |
|---|---|---|
| DataSource | `[Navn]DataSource` | `ExamQuestionDataSource` |
| Repository | `[Navn]Repository` | `ExamRepository` |
| Use Case | `[Verb][Subjekt]UseCase` | `GetExamQuestionsUseCase`, `GradeAnswerUseCase` |
| ViewModel | `use[PageNavn]ViewModel` | `useExamPageViewModel` |
| Page | `[Navn]Page` | `ExamPage`, `ExamSelectPage` |
| Lokal hook | `use[KomponentNavn]` | `useCategorySortQuestion` |

### Use Case-navngiving

Verb-prefiks beskriver hva Use Case-et gjør:

- `Get` — henter data: `GetExamByIdUseCase`, `GetAvailableExamsUseCase`
- `Grade` — vurderer svar: `GradeAnswerUseCase`
- `Calculate` — beregner noe: `CalculateExamScoreUseCase`

Unngå generiske navn som `ExamUseCase`, `DataHelper` eller `Manager`.
Ett Use Case — ett ansvar — ett presist verb.

### Filer og mapper

- Klasser bruker `PascalCase`: `ExamRepository.js`, `QuestionCard.jsx`
- Hooks bruker `camelCase`: `useExamPageViewModel.js`, `useCategorySortQuestion.js`
- CSS-filer bruker `kebab-case`: `answer-card.css`, `category-sort.css`
- Mapper bruker `PascalCase` for komponenter og lag: `ExamPage/`, `QuestionTypes/`
- Mapper bruker `kebab-case` for CSS-undermapper som ikke er komponentnavn: `cio-tool-box/`

### `execute()` er eneste offentlige metode i Use Cases

Use Cases eksponerer kun `execute(...)`. Hjelpemetoder er private.

```js
// Riktig:
class GradeAnswerUseCase {
    execute(question, answer) { ... }       // public
    #gradeMultiChoice(question, answer) { } // private
}

// Feil — for mange offentlige metoder:
class GradeAnswerUseCase {
    grade(question, answer) { }
    gradeMulti(question, answer) { }
    gradeFill(question, answer) { }
}
```

Unntak: Use Cases som trenger å eksponere mer enn rene sannhetsverdier
(f.eks. `getQuestionScore`, `getDragDropStats`) kan ha tilleggsmetoder, men
`execute` er alltid inngangspunktet for den primære operasjonen.

---

## Eksplisitte navn — unngå AI-slop

Dette er en av de viktigste reglene i hele dokumentet.

Navn skal fortelle nøyaktig hva en variabel inneholder, hva en funksjon gjør,
eller hva en komponent viser. Et navn som krever at man leser implementasjonen
for å forstå hva det er, er et dårlig navn.

Generiske navn som `data`, `result`, `item`, `value`, `response`, `content`,
`handler`, `helper`, `manager`, `util`, `obj`, `temp`, `res`, `cb` er forbudt
som permanente navn. De sier ingenting om hva de faktisk inneholder.

### Variabler og state

```js
// Forbudt — sier ingenting:
const data = await getExamQuestionsUseCase.execute({ examId, language });
const result = calculateExamScoreUseCase.execute(questions, answers);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Riktig — presist og selvforklarende:
const questions = await getExamQuestionsUseCase.execute({ examId, language });
const examScore = calculateExamScoreUseCase.execute(questions, answers);
const [questionsLoading, setQuestionsLoading] = useState(true);
const [questionsLoadError, setQuestionsLoadError] = useState(null);
```

Merk: `loading` og `error` er akseptable kun når det er én eneste ting som
lastes på siden og konteksten er entydig. Er det flere asynkrone operasjoner,
skal de navngis etter hva de representerer.

### Props og callbacks

Callbacks navngis etter hva de gjør — ikke bare `onClick` eller `onChange`:

```jsx
// Forbudt — generisk, sier ikke hva som skjer:
<QuestionCard onClick={handleClick} onChange={handleChange} />

// Riktig — presist, forteller hva callbacken gjør:
<QuestionCard
    onSelectSingleAnswer={viewModel.setSingleAnswer}
    onToggleMultiAnswer={viewModel.toggleMultiAnswer}
    onToggleAnswerExpanded={viewModel.toggleAnswerOptionExpanded}
/>
```

`onClick` er tillatt kun som navn på en intern prop i en liten gjenbrukbar
primitiv (f.eks. `SidebarNavigationItem({ onClick })`), ikke som prop-navn
på domenespesifikke komponenter.

### Funksjoner og handlers

En funksjon skal ha et navn som beskriver hva den gjør, ikke bare at den er
"en handler":

```js
// Forbudt:
const handleClick = () => { ... };
const handleChange = () => { ... };
const handleEvent = () => { ... };
const handleSubmit = () => { ... };

// Riktig — beskriver hva som faktisk skjer:
const selectAnswer = () => { ... };
const toggleFeedbackPanel = () => { ... };
const submitExam = () => { ... };
const goToNextQuestion = () => { ... };
```

### Klasser og komponenter

```js
// Forbudt — sier ikke hva klassen gjør:
class DataManager { }
class QuestionHelper { }
class ExamUtil { }
class ContentHandler { }

// Riktig — presist ansvar:
class GetExamQuestionsUseCase { }
class GradeAnswerUseCase { }
class ExamRepository { }
```

### Booleans

Booleans skal leses som spørsmål eller påstander:

```js
// Forbudt — uklart hva true/false betyr:
const exam = true;
const flag = false;
const status = submitted;

// Riktig — leser som en påstand:
const isSubmitted = true;
const canGoNext = currentIndex < totalQuestions - 1;
const hasAnswered = answers[question.id] !== undefined;
const showFeedback = submitted && showAllFeedback;
```

### Løkkevariabler og kortlivede variabler

`i`, `j`, `k` er akseptable i rene tallindeks-løkker uten domenekontekst.
I alle andre løkker skal variabelen navngis etter hva den representerer:

```js
// Akseptabelt — ren tallindeks:
for (let i = 0; i < questions.length; i++) { ... }

// Forbudt — item uten kontekst:
for (const item of questions) { ... }

// Riktig:
for (const question of questions) { ... }
for (const [examId, attempts] of examAttemptMap) { ... }
```

### Test for et godt navn

Spør deg selv: hvis du ser bare variabelnavnet — uten å lese resten av koden
— vet du da nøyaktig hva det er?

```js
const x = ...;                          // Nei
const data = ...;                       // Nei
const questions = ...;                  // Ja
const currentQuestionIndex = ...;       // Ja
const expandedAnswerOptionByQuestionId = ...; // Ja — presist og detaljert
const answeredCountLabel = ...;         // Ja — forteller til og med at det er en label
```

Detaljerte navn er ikke et problem. `expandedAnswerOptionByQuestionId` er bedre
enn `expanded`. Kode leses langt oftere enn det skrives.

---

## Testing

### Testmappen speiler `src/`-strukturen

`test/` er strukturert som et speil av `src/`. En fil i `src/model/domain/`
testes i `test/model/domain/`, med samme filnavn og `.test.js`-suffiks.

```
src/model/domain/GradeAnswerUseCase.js
→ test/model/domain/GradeAnswerUseCase.test.js

src/model/repositories/ExamRepository.js
→ test/model/repositories/ExamRepository.test.js

src/ui/viewmodel/Utils/resolveTranslatedExamId.js
→ test/ui/viewmodel/resolveTranslatedExamId.test.js
```

### Hva som skal testes

Use Cases og Repositories er kjernen av det som testes. De inneholder
forretningslogikken og skal kunne verifiseres i isolasjon uten DOM, browser
eller React.

```
test/model/domain/       ← alle Use Cases testes her
test/model/repositories/ ← alle Repositories testes her
test/integration/        ← flyt gjennom flere lag sammen
test/ui/viewmodel/       ← ViewModelutils og avledede verdier
test/utils/              ← generiske hjelpefunksjoner
```

View-komponenter testes ikke med enhetstester. Visuelle komponenter og
interaksjonslogikk dekkes av integrasjons- og manuell testing.

### Use Cases testes uten avhengigheter

Use Cases som ikke har Repository-avhengigheter instansieres direkte:

```js
// GradeAnswerUseCase har ingen avhengigheter — instansieres direkte:
beforeEach(() => {
    useCase = new GradeAnswerUseCase();
});
```

Use Cases og Repositories med avhengigheter bruker manuelle mock-objekter —
ikke importerte instanser fra `dependencies.js`:

```js
// ExamRepository testes med mock DataSource:
beforeEach(() => {
    dataSource = {
        fetchAllExams: jest.fn(),
        fetchExamById: jest.fn()
    };
    repository = new ExamRepository(dataSource, null);
});
```

Dette er det samme DI-prinsippet som i produksjonskoden: avhengigheter
injiseres inn, aldri importeres direkte inne i klassen.

### Testnavngiving

Testbeskrivelser skal leses som setninger:

```js
// Riktig — lesbar som setning:
test("returns true when all correct alternatives are selected", ...)
test("returns false when answer is not an array", ...)
test("ignores unknown items and unknown quadrants", ...)

// Feil — teknisk og uleselig:
test("test1", ...)
test("gradeAnswer correct", ...)
```

Grupper relaterte tester med `describe`:

```js
describe("GradeAnswerUseCase", () => {
    describe("single choice", () => { ... });
    describe("multi choice", () => { ... });
    describe("fill in", () => { ... });
});
```

### Filbanekommentar i testfiler

Testfiler følger samme konvensjon som øvrige filer:

```js
// test/model/domain/GradeAnswerUseCase.test.js
```

---


---

## Kodekvalitetsprinsipper

Kode skrives for å leses, forstås, testes, vedlikeholdes og utvides.
I den rekkefølgen. Ytelse er viktig, men lesbarhet og korrekthet kommer først.

---

### KISS — Keep It Simple

Løs problemet du har, ikke det du tror du kanskje får. Ikke introduser
abstraksjon, generalisering eller fleksibilitet uten et konkret behov.

```js
// Feil — over-engineered for et problem som ikke eksisterer:
class QuestionHandlerFactory {
    static create(type) {
        return QuestionHandlerRegistry.getInstance().resolve(type);
    }
}

// Riktig — løser problemet direkte:
if (question.type === QUESTION_TYPES.SINGLE) {
    return this.#isSingleChoiceAnswerCorrect(question, answer);
}
```

Hvert lag i arkitekturen er allerede en bevisst abstraksjon. Ikke lag
abstraksjoner innad i lagene uten grunn.

---

### SOLID

**Single Responsibility** — én klasse, én grunn til å endre seg.

`GradeAnswerUseCase` vet om grading. `CalculateExamScoreUseCase` vet om
totalscoring og delegerer til `GradeAnswerUseCase`. De vet ikke om hverandre
annet enn via konstruktør-injeksjon. Slik skal det være.

```js
// Feil — én klasse gjør for mye:
class ExamUseCase {
    fetchQuestions() { ... }
    gradeAnswer() { ... }
    calculateScore() { ... }
    saveAttempt() { ... }
}

// Riktig — ett ansvar per klasse:
class GetExamQuestionsUseCase { execute() { ... } }
class GradeAnswerUseCase      { execute() { ... } }
class CalculateExamScoreUseCase { execute() { ... } }
```

**Open/Closed** — åpen for utvidelse, lukket for endring.

Når en ny spørsmålstype legges til, skal eksisterende grading-logikk ikke
endres — en ny `if`-gren legges til i `execute()`, og en ny privat metode
implementerer grading for den typen. Eksisterende typer er uberørt.

```js
// Slik utvides GradeAnswerUseCase med en ny type:
execute(question, answer) {
    // ... eksisterende typer uberørt ...
    if (question.type === QUESTION_TYPES.TABLE_MATCH) {
        return this.#isTableMatchAnswerCorrect(question, answer); // nytt
    }
}
```

**Liskov Substitution** — en subklasse skal kunne brukes overalt der
foreldreklassen brukes uten at oppførselen brytes.

Når `ApiExamQuestionDataSource` erstatter `ExamQuestionDataSource`, skal alle
metoder returnere samme shape. Repository skal ikke trenge å vite om bytten.

**Interface Segregation** — ikke tving en klasse til å implementere mer enn
den trenger. Use Cases eksponerer `execute()` — ikke et bredt interface med
metoder kallerene ikke trenger.

**Dependency Inversion** — avheng av abstraksjoner, ikke konkrete implementasjoner.

`CalculateExamScoreUseCase` mottar `gradeAnswerUseCase` som parameter og kaller
`execute()` på det. Den vet ikke hvilken konkret klasse det er. Det er DI i praksis.

```js
// CalculateExamScoreUseCase avhenger av interfacet { execute, getQuestionScore }
// — ikke av den konkrete GradeAnswerUseCase-klassen:
constructor(gradeAnswerUseCase) {
    this.gradeAnswerUseCase = gradeAnswerUseCase;
}
```

---

### Utvidbarhet og modularitet

Ny funksjonalitet skal kunne legges til uten å endre eksisterende, velfungerende
kode. Tegn på god modularitet:

- Ny spørsmålstype → legg til i `QUESTION_TYPES`, implementer grading i
  `GradeAnswerUseCase`, legg til komponent under `QuestionTypes/`. Ingen andre
  filer skal røres.
- Nytt fag → legg til i `src/data/subjects/`, registrer i
  `conceptImageCatalogRegistry.js`. Frontend er uendret.
- Ny DataSource → implementer samme metodesignatur, bytt ut i `dependencies.js`.
  Repository, Use Cases og ViewModel er uendret.

Hvis å legge til noe nytt krever at man endrer mange eksisterende filer,
er det et tegn på for høy kobling.

---

### Testbarhet

Kode som er vanskelig å teste er som regel dårlig strukturert.

Konkret:

- Use Cases og Repositories skal kunne testes uten DOM, browser eller React.
  De mottar avhengigheter via konstruktøren og kan testes med mock-objekter.
- ViewModels skal kunne testes ved å sende inn mock Use Cases.
- View-komponenter testes ikke med enhetstester — de er avhengige av
  React-runtime og visuell kontekst.

```js
// Testbar fordi avhengighet er injisert:
const useCase = new CalculateExamScoreUseCase(mockGradeAnswerUseCase);

// Ikke testbar fordi avhengighet er hardkodet inne i klassen:
class CalculateExamScoreUseCase {
    #grader = new GradeAnswerUseCase(); // umulig å mocke
}
```

---

### Vedlikeholdbarhet

Kode som er lett å vedlikeholde har disse egenskapene:

- **Liten overraskelse** — koden gjør det navnet sier, ikke mer.
- **Ingen skjult state** — side-effekter er eksplisitte og forutsigbare.
- **Duplisering er konsekvent unngått** — samme logikk finnes ett sted. Når
  noe endres, endres det ett sted.
- **Kommentarer forklarer hvorfor, ikke hva** — koden er selvforklarende nok
  til at "hva" ikke trenger forklaring. En kommentar som sier `// henter eksamen`
  over `fetchExam()` er støy.

```js
// Kommentar som forklarer HVORFOR — verdifull:
// Normaliserer longitude til -180..180 fordi New Zealand krysser datogrensen.
const cleanLon = ((lon + 180) % 360 + 360) % 360 - 180;

// Kommentar som bare gjentar koden — støy:
// Henter eksamen ved id
const exam = await examRepository.getExamById(examId);
```

---

### Tidskompleksitet — O-notasjon

Velg riktig datastruktur fra starten. Oppslag i en `Map` eller `Set` er O(1).
Linjærsøk med `.find()` eller `.includes()` i en array er O(n) og blir
merkbart tregere ettersom datasettet vokser.

**Bruk Map og Set for oppslag og tilhørighetsssjekk:**

```js
// O(n) per oppslag — tregere med mange spørsmål:
const question = questions.find(q => q.id === questionId);

// O(1) per oppslag — bygg Map én gang, bruk mange ganger:
const questionsById = new Map(questions.map(q => [q.id, q]));
const question = questionsById.get(questionId);
```

`ConceptImageDataSource` gjør dette riktig — den bygger en intern `Map` i
konstruktøren én gang, og alle etterfølgende oppslag er O(1):

```js
// Bygges én gang i konstruktøren:
this.#index = this.#buildIndex(conceptImageCatalogsBySubjectId); // O(n)

// Alle etterfølgende oppslag:
const entry = this.#index.get(key); // O(1)
```

**Unngå nestede løkker på store datasett:**

```js
// O(n²) — for hvert spørsmål, søk gjennom alle svar:
questions.forEach(question => {
    const answer = answers.find(a => a.questionId === question.id);
});

// O(n) — bygg et oppslag først:
const answersByQuestionId = new Map(answers.map(a => [a.questionId, a]));
questions.forEach(question => {
    const answer = answersByQuestionId.get(question.id); // O(1)
});
```

**Praktisk tommelregel for dette prosjektet:**

Eksamener har typisk 15–30 spørsmål. O(n) vs O(1) er umerkelig her.
Prioriter alltid lesbarhet over mikrooptimalisering for slike størrelser.

Optimaliser når:
- Datasettet er stort og ukjent (f.eks. fremtidig database med tusenvis av eksamensforsøk)
- En operasjon kalles i en løkke (da er O(n) inne i O(n) = O(n²))
- Profiling viser faktisk tregthet

Ikke optimaliser når:
- Datasettet er lite og kjent
- Optimaliseringen gjør koden vesentlig vanskeligere å lese
- Det ikke er målt et faktisk problem

---


---

## Skrivestil — unngå AI-slop

Dette gjelder all tekst en bot produserer i dette prosjektet: kodekommentarer,
forklaringer, commit-meldinger, svar på spørsmål, og dokumentasjon.

AI-generert tekst har gjenkjennelige mønstre. De gjør teksten vag, oppblåst og
ubrukelig. Alle mønstrene nedenfor er forbudt.

---

### Forbudte ord og fraser

Følgende ord og fraser er typiske AI-slop-markører. De sier ingenting presist
og skal ikke brukes:

```
crucial / pivotal / vital / key (som adjektiv)
robust / powerful / elegant / seamless / intuitive
ensure / leverage / streamline / facilitate
comprehensive / holistic / sophisticated
highlight / underscore / emphasize (som verb om kode)
showcase / demonstrate (om hva kode "gjør")
it's worth noting / it's important to note / notably
serves as / stands as / acts as (i stedet for "er")
foster / cultivate / enhance (om arkitektur)
in order to (bruk bare "to")
```

```jsx
// Forbudt — oppblåst og intetsigende:
// This component serves as a crucial part of the exam flow,
// ensuring a seamless user experience by leveraging React's
// powerful state management capabilities.

// Riktig — presist og direkte:
// Rendrer spørsmålskortet og sender svar opp via onSingleAnswer.
```

---

### Ikke blås opp enkle ting

AI har en tendens til å gi enkle ting "profound implications" eller "significant
impact on maintainability". Ikke gjør det.

```
// Forbudt:
// This architectural decision has significant implications for
// the scalability and long-term maintainability of the codebase.

// Riktig:
// Holder grading-logikken atskilt fra HTTP-logikken.
```

Hvis noe faktisk er viktig — forklar konkret *hvorfor* det er viktig.
Ikke bare påstå at det er viktig.

---

### Ikke heng på -ing-fraser

AI legger ofte til "-ing"-fraser på slutten av setninger som late begrunnelser:
"...ensuring separation of concerns", "...fostering maintainability",
"...highlighting the importance of clean architecture".

Disse frasene er nesten alltid tomme. Kutt dem.

```
// Forbudt:
// Spørsmål hentes i DataSource-laget, ensuring a clean
// separation between data access and business logic.

// Riktig:
// Spørsmål hentes i DataSource-laget. Business-logikk
// ligger i Use Cases.
```

---

### Ikke bruk "not just X, but also Y"

AI er glad i kontraster som later som om de avkrefter en misforståelse leseren
aldri hadde:

```
// Forbudt:
// This is not just a simple hook — it's a carefully designed
// abstraction that encapsulates the entire exam state.

// Riktig:
// Hooken eier all state for eksamenssiden.
```

---

### Ikke bruk regel-av-tre uten grunn

AI lager alltid tre eksempler, tre fordeler, tre punkter — selv når ett hadde
holdt. Bruk det antallet som faktisk er riktig.

```
// Forbudt — tre punkter for å virke grundig:
// Dette sikrer:
// - Lav kobling mellom lagene
// - Høy kohesjon innad i hvert lag
// - Enkel testbarhet for alle komponenter

// Riktig — hvis alle tre er reelle:
// skriv dem. Hvis bare ett er poenget:
// Dette gjør lagene enkle å teste i isolasjon.
```

---

### Ikke start med anerkjennelse

AI starter gjerne svar med å anerkjenne spørsmålet eller rose det:

```
// Forbudt:
"Det er et godt spørsmål. La meg forklare..."
"Absolutt! Her er hvordan du kan..."
"Selvfølgelig, det er viktig å forstå at..."

// Riktig — svar direkte:
"ExamRepository beriker spørsmålene med bilder ved lasting..."
```

---

### Ikke oppsummer det du akkurat sa

AI avslutter gjerne med en oppsummering av det den nettopp forklarte:

```
// Forbudt:
// I summary, the MVVM architecture ensures that the ViewModel
// acts as the single source of truth, while the View remains
// purely presentational, and the Model handles all data concerns.

// Riktig — si det én gang, presist.
```

---

### Kodekommentarer — hva som er tillatt

En kommentar skal forklare **hvorfor**, ikke **hva**. Koden viser hva som skjer.
Kommentaren forklarer noe koden ikke kan si selv.

```js
// Forbudt — gjentar koden:
// Henter eksamen basert på id
const exam = await examRepository.getExamById(examId);

// Forbudt — oppblåst:
// This crucial step ensures that the exam data is properly
// fetched from the repository layer, maintaining our clean
// MVVM architecture.

// Riktig — forklarer noe ikke-åpenbart:
// Normaliserer longitude til -180..180 fordi New Zealand
// krysser datogrensen og gir feil koordinater ellers.

// Riktig — markerer bevisst valg:
// Beregnes ved lasting, ikke ved visning, slik at View
// aldri trenger å kjenne til bildekatalogen.
```

Ingen kommentar er bedre enn en kommentar som bare støyer.

---

### Commit-meldinger og beskrivelser

Konkret og presist. Hva ble endret og hvorfor — ikke en essay om hva endringen
"ensures" eller "facilitates".

```
// Forbudt:
"Refactor ExamPage to ensure better separation of concerns,
fostering maintainability and improving the overall architecture
by moving layout logic to the ViewModel layer."

// Riktig:
"Flytt workspaceClassName-beregning fra ExamPage til ExamPageViewModel"
```

---


## Kortversjon

> DataSource vet om data.
> Repository vet om domenet — og beriker det med bilder.
> Use Case vet om én regel.
> `dependencies.js` vet om alle tre.
> ViewModel eier siden — all state, all logikk, alle avledede verdier.
> Page fordeler nedover.
> Komponenter mottar og rendrer.
> CSS-mapper speiler komponentmapper. Testmappen speiler `src/`.
> Navnmønstre er ikke tilfeldige — de er kontrakter.
> Navn skal fortelle hva ting er — ikke at de eksisterer.
> KISS: løs problemet du har, ikke det du tror du får.
> SOLID: ett ansvar, åpen for utvidelse, lukket for endring.
> Bruk riktig datastruktur — Map og Set for oppslag, ikke array-søk.
> Bruk React sine mekanismer — ikke vanilla JS DOM-APIer.
> Skriv presist. Ikke "ensures maintainability" — forklar konkret hva som skjer.
> Ingenting henter noe selv.

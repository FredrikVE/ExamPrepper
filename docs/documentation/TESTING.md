<a href="../../README.md">← Tilbake til README</a>

---

# Testing

Dette dokumentet beskriver hvordan prosjektet testes, hvilke testkommandoer som brukes, hvordan testene er strukturert, og hvilke deler av applikasjonen som dekkes.

Prosjektet bruker automatiserte tester med **Jest**. Testene dekker primært forretningslogikk, repository-logikk, use cases, hjelpefunksjoner og integrert eksamensflyt med ekte data.

---

## Testverktøy

Prosjektet bruker ES Modules:

```json
"type": "module"
```

Derfor kjøres Jest via Node med:

```bash
NODE_OPTIONS=--experimental-vm-modules jest
```

Dette gjør at Jest kan kjøre testfiler som bruker `import` / `export`.

Testene bruker eksplisitte Jest-imports:

```js
import { describe, test, expect, jest } from "@jest/globals";
```

---

## Installer testverktøy første gang

Installer alle dependencies:

```bash
npm install
```

Jest er installert som utviklingsavhengighet:

```bash
npm install --save-dev jest @jest/globals
```

`--save-dev` betyr at Jest installeres som et utviklingsverktøy for prosjektet, ikke som en dependency appen trenger i produksjon.

---

## Scripts i package.json

Prosjektet har disse test-scriptene:

```json
"scripts": {
  "test": "NODE_OPTIONS=--experimental-vm-modules jest",
  "test:watch": "NODE_OPTIONS=--experimental-vm-modules jest --watch",
  "test:coverage": "NODE_OPTIONS=--experimental-vm-modules jest --coverage"
}
```

---

## Kjør tester

Kjør alle tester:

```bash
npm test
```

Kjør tester i watch mode:

```bash
npm run test:watch
```

Kjør tester med coverage:

```bash
npm run test:coverage
```

Når testene kjøres, kan Node vise denne advarselen:

```txt
ExperimentalWarning: VM Modules is an experimental feature
```

Denne advarselen kommer fordi Jest kjøres med ES Modules-støtte. Testene kan likevel kjøre korrekt.

---

## Bygg og lokal kontroll

Jest-testene dekker forretningslogikk, repository-logikk, use cases og feature-nære hjelpefunksjoner. De starter ikke Vite og tester ikke visuell styling direkte.

Etter endringer i UI, CSS eller komponentstruktur bør produksjonsbuilden også testes:

```bash
npm run build
```

Test den ferdige builden lokalt med Vite preview:

```bash
npm run preview
```

Åpne URL-en som Vite viser, vanligvis:

```txt
http://localhost:4173/
```

Ved CSS- eller layoutendringer bør følgende sjekkes visuelt:

- vanlige single choice- og multiple choice-spørsmål
- fill blank-spørsmål
- drag-and-drop-variantene `TableMatch`, `CategorySort` og `MatrixPlacement`
- feedback-visning før og etter levering
- responsiv visning i smal skjerm / devtools

Hvis Vite viser en advarsel om store chunks etter build, er det en ytelses-/optimaliseringsadvarsel og ikke nødvendigvis en testfeil. Builden regnes som grønn så lenge `vite build` fullfører uten feil.

---

## Nåværende teststatus

Siste dokumenterte testkjøring:

```txt
Test Suites: 14 passed, 14 total
Tests:       88 passed, 88 total
Snapshots:   0 total
```

Ikke oppdater denne seksjonen med ny status uten at testene faktisk er kjørt.

---

## Teststruktur

Testene ligger i en egen `test/`-mappe og er organisert etter samme lagdeling som resten av prosjektet.

```bash
test/
├── integration/
│   └── examFlow.integration.test.js
├── model/
│   ├── domain/
│   │   ├── CalculateExamScoreUseCase.test.js
│   │   ├── GetAvailableExamsUseCase.test.js
│   │   ├── GetAvailableSubjectsUseCase.test.js
│   │   ├── GetExamByBaseIdAndLangUseCase.test.js
│   │   ├── GetExamQuestionsUseCase.test.js
│   │   ├── GetSubjectByIdUseCase.test.js
│   │   └── GradeAnswerUseCase.test.js
│   └── repositories/
│       ├── ExamRepository.test.js
│       └── SubjectRepository.test.js
├── ui/
│   └── QuestionCard/
│       └── matrixPlacementAnswerLogic.test.js
└── utils/
    ├── answerUtils.test.js
    ├── questionUtils.test.js
    └── viewModelUtils.test.js
```

Testmappene har følgende ansvar:

| Mappe | Ansvar |
|------|--------|
| `test/integration/` | Tester samlet eksamensflyt med ekte data fra prosjektet. |
| `test/model/domain/` | Tester use cases og domenelogikk isolert. |
| `test/model/repositories/` | Tester repository-laget og henting av fag/eksamensdata. |
| `test/ui/` | Tester komponentnær og feature-nær UI-logikk, blant annet matrix placement-visningslogikk. |
| `test/utils/` | Tester felles og feature-nære hjelpefunksjoner for svar, spørsmål og viewmodel-visning. |

---

## Teststrategi

Teststrategien følger arkitekturen i prosjektet:

```txt
Data
  ↓
Repository
  ↓
UseCases
  ↓
ViewModel / Utils
```

Målet er å teste mest mulig av forretningslogikken uten å måtte starte Vite eller åpne appen i nettleseren.

Automatiserte Jest-tester dekker ikke visuelle CSS-regresjoner direkte, så UI- og stylingendringer bør i tillegg valideres med `npm run build` og lokal preview.

Testene dekker blant annet:

- retting av single choice-svar
- retting av multiple choice-svar
- retting av fill-in-svar
- retting av drag-and-drop-oppgaver
- retting av category sort-oppgaver
- retting av table match-oppgaver
- retting av matrix placement-oppgaver
- defensive edge cases for matrix placement, inkludert tomme svar, ukjente items og ukjente quadrants
- matrix placement-visningsrekkefølge med både legacy low/high-labels og generiske left/right/top/bottom-labels
- beregning av score og prosent
- henting av fag
- henting av eksamener
- henting av spørsmål
- henting av riktig språkversjon av samme eksamen
- repository-logikk
- hjelpefunksjoner for svar, spørsmål og visning
- feature-nære hjelpefunksjoner etter refaktorering av `QuestionCard`, `FeedbackPanel`, `ExamProgress` og `Footer`
- integrert eksamensflyt med ekte data

---

## Enhetstester

| ID | Test-case | Testbetingelse | Testdata / input | Forventet resultat | Testfil | Risiko |
|---|---|---|---|---|---|---|
| UT-01 | Rette single choice-svar | Systemet skal avgjøre om valgt alternativ er korrekt. | Spørsmål av typen `single` + valgt index. | Returnerer `true` for riktig alternativ og `false` for feil alternativ. | `GradeAnswerUseCase.test.js` | Svært alvorlig |
| UT-02 | Rette multiple choice-svar | Systemet skal håndtere flere riktige alternativer. | Spørsmål av typen `multi` + liste med valgte indexer. | Returnerer `true` bare når alle og kun riktige alternativer er valgt. | `GradeAnswerUseCase.test.js` | Svært alvorlig |
| UT-03 | Rette fill-in-svar | Systemet skal godta riktige tekstsvar og alternative svar. | Spørsmål av typen `fill` + tekstinput. | Returnerer `true` for godkjente svar og `false` for feil svar. | `GradeAnswerUseCase.test.js` / `answerUtils.test.js` | Svært alvorlig |
| UT-04 | Beregne eksamensscore | Systemet skal beregne poengsum og prosent etter levering. | Liste med spørsmål + brukerens svar. | Returnerer korrekt `score`, `totalPoints` og `percentage`. | `CalculateExamScoreUseCase.test.js` | Svært alvorlig |
| UT-05 | Hente tilgjengelige fag | Systemet skal vise fag som kan velges i appen. | `{ language: "no" }` | Returnerer fagliste med riktige fag, synlighet og eksamensteller. | `GetAvailableSubjectsUseCase.test.js` | Alvorlig |
| UT-06 | Hente fag basert på ID | Systemet skal finne riktig fag når `subjectId` er valgt. | `{ subjectId: "in5431", language: "en" }` | Returnerer riktig fag med kode, navn og `examCount`. | `GetSubjectByIdUseCase.test.js` | Alvorlig |
| UT-07 | Hente tilgjengelige eksamener for fag og språk | Systemet skal vise riktige eksamener for valgt fag og språk. | `{ subjectId: "in5431", language: "no" }` | Returnerer riktige eksamener med riktig `id`, `lang` og spørsmålsteller. | `GetAvailableExamsUseCase.test.js` | Svært alvorlig |
| UT-08 | Hente spørsmål for valgt eksamen | Systemet skal laste spørsmålene til valgt eksamen. | `examId: "mock-exam-1-no"` | Returnerer riktig antall spørsmål og riktige spørsmålstyper. | `GetExamQuestionsUseCase.test.js` | Svært alvorlig |
| UT-09 | Hente språkversjon av samme eksamen | Systemet skal kunne finne eksamen basert på `baseId` og `lang`. | `{ baseId: "mock-exam-1", lang: "en" }` | Returnerer eksamen med riktig `id`, samme `baseId` og riktig `lang`. | `GetExamByBaseIdAndLangUseCase.test.js` | Svært alvorlig |
| UT-10 | Repository returnerer riktige eksamensdata | Repository-laget skal hente eksamener og spørsmål fra datagrunnlaget. | Eksisterende og ikke-eksisterende `examId`, `baseId`, `lang`. | Returnerer riktig eksamen/spørsmål, eller `null`/tom liste når data mangler. | `ExamRepository.test.js` | Alvorlig |
| UT-11 | Repository returnerer riktige fagdata | Repository-laget skal hente fag og fagmetadata fra datagrunnlaget. | Eksisterende og ikke-eksisterende `subjectId`. | Returnerer riktig fag eller `null` når fag ikke finnes. | `SubjectRepository.test.js` | Alvorlig |
| UT-12 | Hjelpefunksjoner for svarlogikk | Utils skal tolke og normalisere svar likt på tvers av appen. | Tekstsvar, valgt index, valgte alternativer. | Returnerer riktig normalisert svar og riktig vurderingsgrunnlag. | `answerUtils.test.js` | Alvorlig |
| UT-13 | Hjelpefunksjoner for spørsmål | Utils skal gi riktig presentasjonsdata for spørsmål. | Spørsmålsobjekter med ulike typer. | Returnerer riktige labels, verdier og visningsdata. | `questionUtils.test.js` | Moderat |
| UT-14 | Hjelpefunksjoner for ViewModel-visning | Utils skal gi riktig UI-status basert på state. | Svarstatus, submitted-status og spørsmålsdata. | Returnerer riktige statusverdier og visningsflagg. | `viewModelUtils.test.js` | Moderat |
| UT-15 | Rette matrix placement-svar | Systemet skal avgjøre om kort er plassert i riktig kvadrant i en 2x2-matrise. | `matrix-placement`-spørsmål med riktige, feil, tomme og ugyldige svar. | Returnerer korrekt boolean, delscore og stats for riktig/feil/ubesvart. | `GradeAnswerUseCase.test.js` | Svært alvorlig |
| UT-16 | Matrix placement-visningslogikk | UI-logikken skal sortere quadrants og normalisere svar defensivt. | 2x2-matriser med `lowLabel`/`highLabel`, `leftLabel`/`rightLabel`/`topLabel`/`bottomLabel` og ugyldige svar. | Returnerer riktig quadrant-rekkefølge og filtrerer ugyldige svar. | `matrixPlacementAnswerLogic.test.js` | Alvorlig |

---

## Integrasjonstester

| ID | Test-case | Testbetingelse | Testdata / input | Forventet resultat | Testfil | Risiko |
|---|---|---|---|---|---|---|
| IT-01 | Laste synlige fag med eksamensteller | Appen skal kunne hente fag fra ekte datagrunnlag. | `{ language: "no" }` | Returnerer fagliste der `IN5431` har riktig `examCount`, og fag uten eksamener fortsatt vises riktig. | `examFlow.integration.test.js` | Alvorlig |
| IT-02 | Laste norske eksamener for IN5431 | Appen skal hente riktige eksamener for valgt fag og språk. | `{ subjectId: "in5431", language: "no" }` | Returnerer norske eksamener for `IN5431` med riktig `id`, `baseId`, `lang` og spørsmålsteller. | `examFlow.integration.test.js` | Svært alvorlig |
| IT-03 | Laste spørsmål og beregne full score | Appen skal kunne hente spørsmål og beregne resultat når alle svar er riktige. | Valgt eksamen + korrekte svar. | Returnerer riktig `score`, `totalPoints` og `percentage`. | `examFlow.integration.test.js` | Svært alvorlig |
| IT-04 | Rette faktiske spørsmål fra eksamensdata | Retting skal fungere med ekte spørsmålstyper fra eksamensdata, inkludert matrix placement. | Spørsmål fra eksamensdata. | `GradeAnswerUseCase` returnerer `true` for korrekte svar fra data. | `examFlow.integration.test.js` | Svært alvorlig |
| IT-05 | Finne oversatt eksamen basert på `baseId` og `lang` | Språkbytte skal finne riktig språkversjon av samme eksamen. | `{ baseId: "mock-exam-1", lang: "en" }` | Returnerer eksamen med riktig `id`, samme `baseId` og riktig `lang`. | `examFlow.integration.test.js` | Svært alvorlig |
| IT-06 | Finne fag med eksamensteller | Appen skal hente valgt fag og beregne antall tilgjengelige eksamener. | `{ subjectId: "in5431", language: "en" }` | Returnerer `IN5431` med riktig `examCount`. | `examFlow.integration.test.js` | Alvorlig |

---

## Kontrakt for språkversjoner

Eksamensdataene bruker denne strukturen:

```js
{
  id: "mock-exam-1-en",
  baseId: "mock-exam-1",
  lang: "en"
}
```

Derfor bruker også `GetExamByBaseIdAndLangUseCase` samme kontrakt:

```js
execute({ baseId, lang })
```

Dette gjør at data, repository, use case, viewmodel og tester bruker samme begreper.

Eksempel:

```js
const exam = await getExamByBaseIdAndLangUseCase.execute({
  baseId: "mock-exam-1",
  lang: "en"
});
```

Denne kontrakten ble valgt for å unngå blanding av `lang` og `language` i samme kall.

---

## Hvorfor testene er delt slik

Enhetstestene tester små deler isolert:

```txt
UseCase
Repository
Utils
```

Integrasjonstestene tester at flere lag fungerer sammen:

```txt
Data → Repository → UseCase → Resultat
```

Dette gjør det lettere å finne feil:

- Hvis en enhetstest feiler, er feilen sannsynligvis i én bestemt klasse eller funksjon.
- Hvis en integrasjonstest feiler, er feilen sannsynligvis i samspillet mellom flere lag.
- Hvis begge feiler, kan det tyde på en kontraktsfeil mellom lagene.

Et konkret eksempel var `GetExamByBaseIdAndLangUseCase`, der testene avdekket en uklar kontrakt mellom `baseId`, `lang` og `language`.

Løsningen ble å gjøre kontrakten tydelig:

```js
execute({ baseId, lang })
```

og oppdatere både produksjonskode og tester til å bruke samme struktur.

---

## Testregler for nye endringer

Bruk denne matrisen som minimumssjekk når prosjektet endres:

<table>
    <tr>
        <th>Endringstype</th>
        <th>Sjekk</th>
    </tr>
    <tr>
        <td>Dokumentasjon</td>
        <td><code>git diff --check</code></td>
    </tr>
    <tr>
        <td>CSS/layout</td>
        <td><code>npm run build</code> + manuell visuell sjekk.</td>
    </tr>
    <tr>
        <td>Domenelogikk</td>
        <td><code>npm test</code> + <code>npm run build</code>.</td>
    </tr>
    <tr>
        <td>Dataformat</td>
        <td>Import-/build-sjekk + relevant manuell flyt.</td>
    </tr>
    <tr>
        <td>Ny spørsmålstype</td>
        <td>Unit test for retting, relevant utils-test og minst én integrasjonstest med ekte data.</td>
    </tr>
</table>

---

## Videre arbeid

Mulige forbedringer i testoppsettet:

- Legge til komponenttester for `QuestionCard`, `AnswerOptionCard`, `FeedbackPanel`, `ExamProgress` og `ResultBadge`
- Legge til komponenttester for oppgavetypene under `QuestionCard/QuestionTypes`, spesielt drag-and-drop-variantene `TableMatch`, `CategorySort` og `MatrixPlacement`
- Legge til visuelle/regresjonstester for sentrale `QuestionCard`-varianter etter CSS-refaktoreringen
- Teste at nye oppgavetyper følger samme struktur for feature-nær logikk og CSS
- Legge til tester for drag-and-drop-interaksjoner med React Testing Library
- Legge til tester for ViewModels med React Testing Library eller Vitest
- Legge testkjøring inn i GitHub Actions
- Lage coverage-krav for pull requests
- Legge til accessibility-tester for sentrale UI-komponenter

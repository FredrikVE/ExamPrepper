# IN5431 Exam Emulator

## Om prosjektet

Et **JavaScript, React, Vite og Tailwind CSS**-prosjekt laget for å øve til skoleeksamen i **IN5431 – IT and Management**.

Prosjektet er en interaktiv eksamenssimulator der brukeren kan velge mellom flere øveeksamener og få umiddelbar tilbakemelding etter levering.

Appen støtter flere spørsmålstyper:

1. Multiple choice med ett riktig svar
2. Multiple choice med flere riktige svar
3. Fyll inn riktig begrep

Etter levering får brukeren tilbakemelding på hvert spørsmål:

- Om svaret er riktig eller feil
- Hva fasiten er
- Hvorfor riktig alternativ er riktig
- Hvorfor gale alternativer er gale
- Henvisning til pensum, forelesning eller fasitgrunnlag

Prosjektet er strukturert etter MVVM-arkitekturmønsteret med tydelig lagdeling mellom data, datasource, repository, use cases, viewmodel, page og komponenter.

Målet med prosjektet er både å lage et nyttig eksamensverktøy og å demonstrere tydelig modularisering av en React-applikasjon.

---

## Sentrale funksjoner

| Funksjon | Beskrivelse |
|----------|-------------|
| Valg av eksamen | Brukeren kan velge mellom flere øveeksamener |
| Multiple choice | Støtter både ett riktig svar og flere riktige svar |
| Fyll inn begrep | Brukeren skriver inn riktig fagbegrep, med støtte for flere aksepterte svar |
| Automatisk retting | Svarene rettes når brukeren trykker «Lever og sjekk» |
| Fasit med forklaring | Viser hvorfor svaret er riktig eller galt |
| Pensumhenvisning | Hvert spørsmål har kilde/fasitlinje mot forelesning eller pensum |
| Poengscore | Viser antall poeng og prosent riktig |
| Filtrering | Etter levering kan brukeren filtrere på alle, riktige eller gale svar |
| Ny runde | Eksamen kan nullstilles og tas på nytt |
| Språkvalg | Brukeren kan bytte mellom norsk og engelsk |
| Lys/mørk modus | Brukeren kan bytte mellom light mode og dark mode fra innstillinger |
| Responsivt grensesnitt | Layouten tilpasser seg skjermbredde |
| Moderne eksamenslayout | Bruker sidebar, progressbar, question cards og footer-navigasjon |
| Utvidbart eksamensregister | Nye øveeksamener kan legges til som egne datafiler |

---

## Prosjektstruktur

```bash
IN5431-Exam-Emulator/
├── README.md
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── constants/
    │   └── QuestionTypes.js
    ├── data/
    │   ├── data.js
    │   └── exams/
    │       ├── mockExam1_en.js
    │       ├── mockExam1_no.js
    │       ├── mockExam2_en.js
    │       └── mockExam2_no.js
    ├── di/
    │   └── dependencies.js
    ├── i18n/
    │   ├── LanguageContext.jsx
    │   └── translations.js
    ├── model/
    │   ├── datasource/
    │   │   └── ExamQuestionDataSource.js
    │   ├── domain/
    │   │   ├── CalculateExamScoreUseCase.js
    │   │   ├── GetAvailableExamsUseCase.js
    │   │   ├── GetExamByBaseIdAndLangUseCase.js
    │   │   ├── GetExamQuestionsUseCase.js
    │   │   └── GradeAnswerUseCase.js
    │   └── repositories/
    │       └── ExamRepository.js
    ├── navigation/
    │   └── navGraph.js
    ├── ui/
    │   ├── style/
    │   │   ├── App.css
    │   │   ├── ExamPage.css
    │   │   ├── ExamSelectPage.css
    │   │   ├── FeedbackPanel.css
    │   │   ├── Footer.css
    │   │   ├── Header.css
    │   │   ├── QuestionCard.css
    │   │   ├── ResultBadge.css
    │   │   └── SettingsMenu.css
    │   ├── theme/
    │   │   └── ThemeContext.jsx
    │   ├── view/
    │   │   ├── pages/
    │   │   │   ├── ExamPage.jsx
    │   │   │   └── ExamSelectPage.jsx
    │   │   └── components/
    │   │       ├── ExamPage/
    │   │       │   ├── FeedbackPanel.jsx
    │   │       │   ├── QuestionCard.jsx
    │   │       │   └── ResultBadge.jsx
    │   │       ├── Footer/
    │   │       │   ├── Footer.jsx
    │   │       │   └── FooterNavigationButton.jsx
    │   │       ├── Header/
    │   │       │   ├── Header.jsx
    │   │       │   ├── HeaderActions.jsx
    │   │       │   ├── HeaderButtons.jsx
    │   │       │   ├── HeaderInfo.jsx
    │   │       │   ├── StatCard.jsx
    │   │       │   └── SubmittedActions.jsx
    │   │       └── Settings/
    │   │           └── SettingsMenu.jsx
    │   └── viewmodel/
    │       └── useExamViewModel.js
    └── utils/
        ├── answerutils/
        │   ├── AnswerLabelFormatter.js
        │   ├── getAnswerLabel.js
        │   ├── getCorrectIndexes.js
        │   └── normalizeAnswer.js
        └── viewmodelutils/
            ├── getAnsweredCountLabel.js
            ├── getFeedbackToggleLabel.js
            ├── getQuestionProgressLabel.js
            └── getScoreLabel.js
```

---

## Eksamensdata

Eksamensinnholdet er delt opp i flere egne filer under `src/data/exams/`.

Hver eksamen eksporterer et objekt med metadata og spørsmål:

```js
export const mockExam1No = {
  id: "mock-exam-1-no",
  baseId: "mock-exam-1",
  lang: "no",
  title: "Øveeksamen 1: Full repetisjon",
  description: "CIO toolbox, D4D, IT governance, strategy og sustainability.",
  questions: [
    {
      id: 1,
      type: "fill",
      title: "Business process",
      // ...
    },
  ],
};
```

Alle eksamener samles i `src/data/data.js`. Tanken med dette er å gjøre det enkelt å legge til nye øveeksamener og språkversjoner uten å endre UI-komponentene.

---

## Arkitektur

Prosjektet følger et lagdelt mønster inspirert av MVVM og Clean Architecture.

```mermaid
flowchart TB

%% =========================
%% SIDE INPUTS
%% =========================
subgraph SideInputs["Side Inputs"]
    DI["dependencies.js"]
    NavGraph["navGraph.js"]
end

%% =========================
%% APP
%% =========================
subgraph AppLayer["App Layer"]
    App["App.jsx"]
end

%% =========================
%% VIEW / PAGES
%% =========================
subgraph View["View / Pages & Components"]
    ExamSelectPage["ExamSelectPage.jsx"]
    ExamPage["ExamPage.jsx"]
    Header["Header"]
    QuestionCard["QuestionCard"]
    Footer["Footer"]
    SettingsMenu["SettingsMenu"]
end

%% =========================
%% VIEWMODEL
%% =========================
subgraph ViewModel["ViewModel"]
    ExamVM["useExamViewModel"]
end

%% =========================
%% DOMAIN
%% =========================
subgraph Domain["Domain Layer"]
    GetAvailableExamsUC["GetAvailableExamsUseCase"]
    GetExamByBaseIdAndLangUC["GetExamByBaseIdAndLangUseCase"]
    GetExamQuestionsUC["GetExamQuestionsUseCase"]
    GradeAnswerUC["GradeAnswerUseCase"]
    CalculateScoreUC["CalculateExamScoreUseCase"]
end

%% =========================
%% MODEL
%% =========================
subgraph Model["Model"]
    Repo["ExamRepository"]
    DS["ExamQuestionDataSource"]
end

%% =========================
%% DATA
%% =========================
subgraph Data["Data"]
    DataRegistry["data.js"]
    MockExam1No["mockExam1_no.js"]
    MockExam1En["mockExam1_en.js"]
    MockExam2No["mockExam2_no.js"]
    MockExam2En["mockExam2_en.js"]
end

%% =========================
%% SIDE INPUTS INTO APP
%% =========================
DI -.-> App
NavGraph -.-> App

%% =========================
%% APP → PAGES
%% =========================
App --> ExamSelectPage
App --> ExamPage

%% =========================
%% SELECT PAGE FLOW
%% =========================
ExamSelectPage --> GetAvailableExamsUC

%% =========================
%% VIEW → VIEWMODEL
%% =========================
ExamPage --> ExamVM

%% =========================
%% VIEW COMPOSITION
%% =========================
ExamPage --> Header
ExamPage --> QuestionCard
ExamPage --> Footer
ExamPage --> SettingsMenu

%% =========================
%% VIEWMODEL → DOMAIN
%% =========================
ExamVM --> GetExamByBaseIdAndLangUC
ExamVM --> GetExamQuestionsUC
ExamVM --> GradeAnswerUC
ExamVM --> CalculateScoreUC

%% =========================
%% DOMAIN INTERNAL
%% =========================
CalculateScoreUC --> GradeAnswerUC

%% =========================
%% DOMAIN → MODEL
%% =========================
GetAvailableExamsUC --> Repo
GetExamByBaseIdAndLangUC --> Repo
GetExamQuestionsUC --> Repo

%% =========================
%% MODEL → DATA
%% =========================
Repo --> DS
DS --> DataRegistry
Repo --> DataRegistry

%% =========================
%% DATA REGISTRY
%% =========================
DataRegistry --> MockExam1No
DataRegistry --> MockExam1En
DataRegistry --> MockExam2No
DataRegistry --> MockExam2En

%% =========================
%% NODE COLORS
%% =========================
classDef sideNode fill:#E0E0E0,stroke:#424242,color:#000000
classDef appNode fill:#C5E1A5,stroke:#33691E,color:#000000
classDef viewNode fill:#C5E1A5,stroke:#33691E,color:#000000
classDef viewModelNode fill:#C5E1A5,stroke:#33691E,color:#000000
classDef domainNode fill:#C5E1A5,stroke:#33691E,color:#000000
classDef modelNode fill:#C5E1A5,stroke:#33691E,color:#000000
classDef dataNode fill:#C5E1A5,stroke:#33691E,color:#000000

class DI,NavGraph sideNode
class App appNode
class ExamSelectPage,ExamPage,Header,QuestionCard,Footer,SettingsMenu viewNode
class ExamVM viewModelNode
class GetAvailableExamsUC,GetExamByBaseIdAndLangUC,GetExamQuestionsUC,GradeAnswerUC,CalculateScoreUC domainNode
class Repo,DS modelNode
class DataRegistry,MockExam1No,MockExam1En,MockExam2No,MockExam2En dataNode

%% =========================
%% SUBGRAPH COLORS
%% =========================
style SideInputs stroke:#000000,fill:#E0E0E0,color:#000000
style AppLayer stroke:#000000,fill:#E1BEE7,color:#000000
style View stroke:#000000,fill:#FFF9C4,color:#000000
style ViewModel stroke:#000000,fill:#FFCDD2,color:#000000
style Domain stroke:#000000,fill:#C5CAE9,color:#000000
style Model stroke:#000000,fill:#DCEDC8,color:#000000
style Data stroke:#000000,fill:#FFE082,color:#000000
```

### Arkitekturflyt

```text
mockExam-filer
  ↓
data.js
  ↓
ExamQuestionDataSource
  ↓
ExamRepository
  ↓
UseCases
  ↓
useExamViewModel
  ↓
ExamPage
  ↓
UI Components
```

---

## Lagdeling

| Lag | Filer | Ansvar |
|-----|-------|--------|
| **Data** | `src/data/data.js`, `src/data/exams/*.js` | Inneholder eksamensregister, standardeksamen og alle øveeksamener |
| **DataSource** | `ExamQuestionDataSource.js` | Henter eksamensdata og spørsmål fra lokal datakilde |
| **Repository** | `ExamRepository.js` | Gir domenelaget tilgang til eksamener og spørsmål uten at domenet kjenner datakilden |
| **Domain / UseCases** | `GetAvailableExamsUseCase`, `GetExamByBaseIdAndLangUseCase`, `GetExamQuestionsUseCase`, `GradeAnswerUseCase`, `CalculateExamScoreUseCase` | Inneholder appens sentrale regler |
| **ViewModel** | `useExamViewModel.js` | Holder React-state, valgt eksamen, svar, leveringstilstand, filter, feedback-visning, språktilpasset eksamen og score |
| **View / Page** | `ExamPage.jsx`, `ExamSelectPage.jsx` | Setter sammen sidene og sender props videre til komponentene |
| **Components** | `Header`, `QuestionCard`, `FeedbackPanel`, `Footer`, `SettingsMenu` | Rene UI-komponenter som viser data og sender brukerhandlinger oppover |
| **i18n** | `LanguageContext.jsx`, `translations.js` | Håndterer språkvalg og tekstnøkler |
| **Theme** | `ThemeContext.jsx` | Håndterer light mode og dark mode |
| **Utils** | `answerutils`, `viewmodelutils` | Hjelpefunksjoner for svar, labels og visningslogikk |

---

## Kjøring

Forutsetninger:

- Node.js installert
- npm installert

Installer avhengigheter:

```bash
npm install
```

Start utviklingsserver:

```bash
npm run dev
```

Bygg produksjonsversjon:

```bash
npm run build
```

Forhåndsvis produksjonsbygget:

```bash
npm run preview
```

---

## Designvalg

**Eksamensdata er delt opp i flere filer.**  
Hver øveeksamen og språkversjon ligger i egen fil under `src/data/exams/`. `data.js` fungerer som samlet eksamensregister.

**Hver eksamen har egen metadata.**  
Hver øveeksamen har en unik `id`, en `baseId`, et språkfelt, en `title`, en `description` og en liste med `questions`. Dette gjør at appen kan vise riktig eksamen basert på både valgt eksamen og valgt språk.

**Rette-logikken ligger i domenelaget.**  
`GradeAnswerUseCase` avgjør om et svar er riktig. Dette gjør at komponentene ikke trenger å kjenne reglene for single choice, multiple choice eller fill-in.

**Score beregnes i en egen use case.**  
`CalculateExamScoreUseCase` gjør poengberegning separat fra både UI og datalagring.

**ViewModel samler React-state.**  
`useExamViewModel` håndterer valgt eksamen, brukerens svar, submitted-status, filter, feedback-visning, loading, score og navigasjon mellom spørsmål. Dermed holdes `ExamPage.jsx` enklere.

**UI-et er delt inn i tydelige visuelle soner.**  
Eksamenssiden består av en sidebar, header/statistikk, progressbar, question card og footer-navigasjon. Dette gjør at brukeren hele tiden ser hvor langt de har kommet, hvilken oppgave de jobber med, og hvilke handlinger som er tilgjengelige.

**Språk og tema håndteres globalt.**  
Språkvalg håndteres gjennom `LanguageContext`, mens light/dark mode håndteres gjennom `ThemeContext`. Dette gjør at komponentene kan bruke felles tilstand uten å duplisere logikk.

**Styling er samlet per UI-område.**  
Stilarkene ligger under `src/ui/style/` og er delt etter område, for eksempel `ExamPage.css`, `Header.css`, `Footer.css`, `QuestionCard.css` og `SettingsMenu.css`.

**Composition Root i `dependencies.js`.**  
Alle datasource-, repository- og use case-instansene opprettes på ett sted. Det gjør appen mer ryddig og gjør det lettere å bytte implementasjoner senere.

---

## Teknologier

| Teknologi | Bruk |
|----------|------|
| JavaScript | Programmeringsspråk |
| React | UI-bibliotek |
| Vite | Byggverktøy og utviklingsserver |
| Tailwind CSS | Styling og utility-klasser |
| CSS | Komponentbasert styling for layout, header, footer, cards og settings |
| lucide-react | Ikoner |

---

## Legge til en ny øveeksamen

For å legge til en ny øveeksamen:

1. Opprett nye filer i `src/data/exams/`, for eksempel `mockExam3_no.js` og `mockExam3_en.js`.
2. Eksporter eksamensobjekter med unik `id`.
3. Bruk samme `baseId` for språkversjonene.
4. Sett riktig språkfelt, for eksempel `lang: "no"` og `lang: "en"`.
5. Importer eksamenene i `src/data/data.js`.
6. Legg eksamenene inn i `EXAMS`-listen.

Eksempel:

```js
//src/data/exams/mockExam3_no.js

export const mockExam3No = {
  id: "mock-exam-3-no",
  baseId: "mock-exam-3",
  lang: "no",
  title: "Øveeksamen 3: Strategi og IT governance",
  description: "Repetisjon av strategy, governance, architecture og digital transformation.",
  questions: [
    {
      id: 1,
      type: "single",
      title: "Strategic positioning",
      // ...
    },
  ],
};
```

Deretter registreres eksamenen i `data.js`:

```js
import { mockExam1No } from "./exams/mockExam1_no.js";
import { mockExam1En } from "./exams/mockExam1_en.js";
import { mockExam2No } from "./exams/mockExam2_no.js";
import { mockExam2En } from "./exams/mockExam2_en.js";
import { mockExam3No } from "./exams/mockExam3_no.js";
import { mockExam3En } from "./exams/mockExam3_en.js";

export const EXAMS = [
  mockExam1No,
  mockExam1En,
  mockExam2No,
  mockExam2En,
  mockExam3No,
  mockExam3En,
];
```

Alle eksamener må ha unik `id`. Språkversjoner av samme eksamen bør dele samme `baseId`.

---

## Videre arbeid

Mulige forbedringer:

- Legge til flere øveeksamener fra pensum
- Lage egne eksamener per tema, for eksempel CIO Toolbox, D4D, strategi, IT governance og bærekraft
- Legge til vanskelighetsgrad per spørsmål
- Legge til kategorier eller tags per spørsmål
- Lagre valgt eksamen og progresjon i localStorage
- Lage eksamensmodus med tilfeldig rekkefølge
- Lage statistikk over hvilke temaer brukeren ofte svarer feil på
- Legge til tester for `GradeAnswerUseCase` og `CalculateExamScoreUseCase`
- Legge til tester for henting av riktig eksamen basert på `examId`, `baseId` og språk
- Hente spørsmål fra ekstern JSON-fil eller API

---

## Pensumgrunnlag

Øveeksamenene er basert på sentrale temaer i IN5431, blant annet:

| Tema | Eksempler |
|------|-----------|
| CIO Toolbox | Business case, alternative analysis, design thinking, projects, product teams og IT governance |
| Strategy | Operational effectiveness, strategic positioning, trade-offs og activity systems |
| IT Architecture | Business processes, operating model, BPMN, TOGAF og Fowler-perspektivet |
| Designed for Digital | Operational Backbone, Shared Customer Insights, Digital Platform, Accountability Framework og External Developer Platform |
| Digital strategy | Digital resources, digital initiatives, roadmap og ansvar |
| Sustainability | Digital teknologi, bærekraftstransisjoner, IKT-konsekvenser og rapportering |

---

## Kort oppsummert

Dette prosjektet er en strukturert React-applikasjon for eksamenstrening i IN5431.

Det viktigste læringspoenget er todelt:

1. Øve på pensumbegreper gjennom aktiv testing og forklarende fasit
2. Øve på modularisering av React-kode med tydelig ansvarsdeling

```text
Exam files → data.js → DataSource → Repository → UseCase → ViewModel → Page → Components
```
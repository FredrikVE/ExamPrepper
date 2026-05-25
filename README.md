# IN5431 Exam Emulator

## Om prosjektet

Et **JavaScript, CSS, React og Vite**-prosjekt laget for å øve til skoleeksamen i **IN5431 – IT and Management**.

Prosjektet er en interaktiv eksamenssimulator der brukeren kan velge mellom flere øveeksamener, svare på spørsmål og få fasit med forklaring etter levering.

Appen støtter flere spørsmålstyper:

1. Multiple choice med ett riktig svar
2. Multiple choice med flere riktige svar
3. Fyll inn riktig begrep

Etter levering får brukeren tilbakemelding på hvert spørsmål:

- Om svaret er riktig eller feil
- Hva fasiten er
- Kort forklaring på hvert svaralternativ
- Mulighet til å åpne svarkort for utvidet forklaring når `whyExtended` finnes i eksamensdataene
- Henvisning til pensum, forelesning eller fasitgrunnlag

Prosjektet er strukturert etter et MVVM-inspirert arkitekturmønster med tydelig lagdeling mellom data, datasource, repository, use cases, viewmodel, page og komponenter.

Målet med prosjektet er både å lage et nyttig eksamensverktøy og å demonstrere tydelig modularisering av en React-applikasjon.

---

## Sentrale funksjoner

| Funksjon | Beskrivelse |
|----------|-------------|
| Valg av eksamen | Brukeren kan velge mellom flere øveeksamener |
| Multiple choice | Støtter både ett riktig svar og flere riktige svar |
| Fyll inn begrep | Brukeren skriver inn riktig fagbegrep, med støtte for flere aksepterte svar |
| Automatisk retting | Svarene rettes når brukeren trykker «Lever nå» |
| Fasit etter levering | Etter levering vises fasit, forklaringer og vurdering av svarene |
| Utvidede forklaringer | Svarkort kan åpnes for å vise mer detaljert forklaring |
| Pensumhenvisning | Hvert spørsmål kan ha kilde/fasitlinje mot forelesning eller pensum |
| Poengscore | Viser antall poeng og prosent riktig |
| Ny runde | Eksamen kan nullstilles og tas på nytt |
| Språkvalg | Brukeren kan bytte mellom norsk og engelsk |
| Lys/mørk modus | Brukeren kan bytte mellom light mode og dark mode fra innstillinger |
| Felles sidebar | Samme sidebar brukes på tvers av hele appen |
| Hamburger/drawer på små skjermer | På smale skjermer åpnes sidebaren via hamburgermeny og kan lukkes med backdrop eller lukkeknapp |
| Responsivt grensesnitt | Layouten tilpasser seg skjermbredde |
| Moderne eksamenslayout | Bruker sidebar, header/statistikk, progressbar, question cards og footer-navigasjon |
| Lever nå-knapp | Siste spørsmål viser «Lever nå» i stedet for «Neste» i footer-navigasjonen |
| Resultatdots | Etter levering viser footer-dots grønn eller rød farge per spørsmål |
| Utvidbart eksamensregister | Nye øveeksamener kan legges til som egne datafiler |

---

## Prosjektstruktur

```bash
IN5431-Exam-Emulator/
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── public/
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── constants/
    │   ├── QuestionConfig.js
    │   └── QuestionTypes.js
    ├── data/
    │   ├── data.js
    │   ├── subjects.js
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
    │   │   ├── ExamQuestionDataSource.js
    │   │   └── SubjectDataSource.js
    │   ├── domain/
    │   │   ├── CalculateExamScoreUseCase.js
    │   │   ├── GetAvailableExamsUseCase.js
    │   │   ├── GetAvailableSubjectsUseCase.js
    │   │   ├── GetExamByBaseIdAndLangUseCase.js
    │   │   ├── GetExamQuestionsUseCase.js
    │   │   ├── GetSubjectByIdUseCase.js
    │   │   └── GradeAnswerUseCase.js
    │   └── repositories/
    │       ├── ExamRepository.js
    │       └── SubjectRepository.js
    ├── navigation/
    │   ├── navGraph.js
    │   └── navItems.js
    ├── ui/
    │   ├── style/
    │   │   ├── App.css
    │   │   ├── Tokens.css
    │   │   ├── Global.css
    │   │   ├── Responsive.css
    │   │   ├── ExamPage/
    │   │   │   └── ...
    │   │   ├── ExamSelectPage/
    │   │   │   └── ...
    │   │   ├── Header/
    │   │   │   └── ...
    │   │   ├── Footer/
    │   │   │   └── ...
    │   │   ├── QuestionCard/
    │   │   │   └── ...
    │   │   ├── FeedbackPanel/
    │   │   │   └── ...
    │   │   ├── SettingsMenu/
    │   │   │   └── ...
    │   │   ├── Sidebar/
    │   │   │   └── ...
    │   │   ├── SubjectSelectPage/
    │   │   │   └── ...
    │   │   └── ResultBadge/
    │   │       └── ...
    │   ├── theme/
    │   │   └── ThemeContext.jsx
    │   ├── view/
    │   │   ├── pages/
    │   │   │   ├── ExamPage.jsx
    │   │   │   ├── ExamSelectPage.jsx
    │   │   │   └── SubjectSelectPage.jsx
    │   │   └── components/
    │   │       ├── ExamSelectPage/
    │   │       │   ├── ExamSelectCard.jsx
    │   │       │   ├── ExamSelectGrid.jsx
    │   │       │   ├── ExamSelectIntro.jsx
    │   │       │   └── ExamSelectTopbar.jsx
    │   │       ├── Sidebar/
    │   │       │   ├── AppSidebar.jsx
    │   │       │   ├── SidebarBrand.jsx
    │   │       │   ├── SidebarCloseButton.jsx
    │   │       │   ├── SidebarMenuButton.jsx
    │   │       │   ├── SidebarNavigation.jsx
    │   │       │   ├── SidebarSettingsButton.jsx
    │   │       │   └── SidebarUserCard.jsx
    │   │       ├── Header/
    │   │       │   ├── Header.jsx
    │   │       │   ├── HeaderActions.jsx
    │   │       │   ├── HeaderButtons.jsx
    │   │       │   ├── StatCard.jsx
    │   │       │   └── SubmittedActions.jsx
    │   │       ├── Footer/
    │   │       │   ├── Footer.jsx
    │   │       │   ├── FooterActionButton.jsx
    │   │       │   ├── FooterNavigationButton.jsx
    │   │       │   ├── QuestionDot.jsx
    │   │       │   ├── QuestionDots.jsx
    │   │       │   └── footerClassNames.js
    │   │       ├── Settings/
    │   │       │   └── SettingsMenu.jsx
    │   │       ├── SubjectIcon.jsx
    │   │       ├── SubjectSelectPage/
    │   │       │   ├── SubjectSelectCard.jsx
    │   │       │   ├── SubjectSelectControls.jsx
    │   │       │   ├── SubjectSelectGrid.jsx
    │   │       │   └── SubjectSelectTopbar.jsx
    │   │       └── ExamPage/
    │   │           ├── FeedbackPanel.jsx
    │   │           ├── QuestionCard.jsx
    │   │           ├── ResultBadge.jsx
    │   │           └── QuestionCard/
    │   │               ├── AnswerCard/
    │   │               │   └── ...
    │   │               ├── Feedback/
    │   │               │   └── ...
    │   │               ├── Header/
    │   │               │   └── ...
    │   │               ├── InputField/
    │   │               │   └── ...
    │   │               ├── Options/
    │   │               │   └── ...
    │   │               ├── Prompt/
    │   │               │   └── ...
    │   │               └── Styling/
    │   │                   └── ...
    │   └── viewmodel/
    │       ├── AppNavigationViewModel.js
    │       ├── ExamPageViewModel.js
    │       ├── ExamSelectPageViewModel.js
    │       ├── PlaceholderPageViewModel.js
    │       └── SubjectSelectPageViewModel.js
    └── utils/
        ├── answerutils/
        │   └── ...
        ├── examPageUtils/
        │   └── ...
        ├── questionutils/
        │   └── ...
        └── viewmodelutils/
            └── ...
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
      type: "single",
      title: "Business process",
      prompt: "Hva beskriver best en business process?",
      options: [
        {
          text: "En koordinert samling aktiviteter som skaper verdi.",
          correct: true,
          why: "Riktig: En business process beskriver hvordan arbeid utføres for å skape verdi.",
          whyExtended: [
            "En prosess består vanligvis av flere aktiviteter som henger sammen.",
            "Prosesser går ofte på tvers av avdelinger og roller.",
            "Poenget er å beskrive flyten fra input til output, ikke bare én isolert oppgave."
          ]
        }
      ]
    }
  ]
};
```

Alle eksamener samles i `src/data/data.js`. Tanken med dette er å gjøre det enkelt å legge til nye øveeksamener og språkversjoner uten å endre UI-komponentene.

### Spørsmålstyper

| Type | Beskrivelse |
|------|-------------|
| `single` | Multiple choice med ett riktig svar |
| `multi` | Multiple choice med flere riktige svar |
| `fill` | Fyll inn riktig fagbegrep |

### Forklaringsfelter

| Felt | Bruk |
|------|-----|
| `why` | Kort forklaring som vises direkte på svarkortet etter levering |
| `whyExtended` | Valgfri liste med utvidede forklaringspunkter som vises når svarkortet åpnes |
| `source` | Valgfri kildehenvisning mot forelesning, pensum eller fasitgrunnlag |

Hvis `whyExtended` mangler, vises ikke utvidet forklaring for det alternativet.

---

## Arkitektur

Prosjektet følger et lagdelt mønster inspirert av MVVM og Clean Architecture.

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "lineColor": "#111111",
    "primaryBorderColor": "#111111",
    "clusterBorder": "#111111",
    "edgeLabelBackground": "#FFFFFF"
  },
  "flowchart": {
    "curve": "basis"
  }
}}%%

flowchart TB

%% =========================
%% 0. SIDE INPUTS
%% =========================

subgraph SideInputs["0. Side Inputs / Configuration"]
direction LR
    DI["dependencies.js"]
    NavGraph["navGraph.js"]
end

%% =========================
%% 1. APP SHELL
%% =========================

subgraph AppShell["1. App Shell"]
direction LR

    subgraph AppLayer["Main App"]
        App["App.jsx"]
    end

    subgraph GlobalComponents["Global Components"]
    direction TB
        AppSidebar["AppSidebar"]
        SettingsMenu["SettingsMenu"]
    end

end

%% =========================
%% 2. PAGES + COMPONENTS
%% =========================

subgraph PagesAndComponents["2. Pages & Page Components"]
direction TB

    subgraph ExamPageRow["ExamPage.jsx"]
    direction LR

        subgraph ExamPageComponents["ExamPage Components"]
        direction TB
            Header["Header"]
            QuestionCard["QuestionCard"]
            FeedbackPanel["FeedbackPanel"]
            Footer["Footer"]
        end

        ExamPage["ExamPage.jsx"]

    end

    subgraph ExamSelectPageRow["ExamSelectPage.jsx"]
    direction LR

        ExamSelectPage["ExamSelectPage.jsx"]

        subgraph ExamSelectComponents["ExamSelectPage Components"]
        direction TB
            ExamSelectTopbar["ExamSelectTopbar"]
            ExamSelectIntro["ExamSelectIntro"]
            ExamSelectGrid["ExamSelectGrid"]
            ExamSelectCard["ExamSelectCard"]
        end

    end

end

%% =========================
%% 3. VIEWMODEL
%% =========================

subgraph ViewModel["3. ViewModel"]
    ExamVM["useExamViewModel"]
end

%% =========================
%% 4. DOMAIN
%% =========================

subgraph Domain["4. Domain Layer / Use Cases"]
direction TB
    GetAvailableExamsUC["GetAvailableExamsUseCase"]
    GetExamByBaseIdAndLangUC["GetExamByBaseIdAndLangUseCase"]
    GetExamQuestionsUC["GetExamQuestionsUseCase"]
    GradeAnswerUC["GradeAnswerUseCase"]
    CalculateScoreUC["CalculateExamScoreUseCase"]
end

%% =========================
%% 5. MODEL
%% =========================

subgraph Model["5. Model"]
direction TB
    Repo["ExamRepository"]
    DS["ExamQuestionDataSource"]
end

%% =========================
%% 6. DATA
%% =========================

subgraph Data["6. Data"]
direction TB
    DataRegistry["data.js"]

    subgraph MockData["Mock Exam Data"]
    direction LR
        MockExam1No["mockExam1_no.js"]
        MockExam1En["mockExam1_en.js"]
        MockExam2No["mockExam2_no.js"]
        MockExam2En["mockExam2_en.js"]
    end
end

%% =========================
%% CONNECTIONS
%% =========================

DI -.-> App
NavGraph -.-> App

App --> AppSidebar
App --> SettingsMenu

App --> ExamPage
App --> ExamSelectPage

ExamPage --> Header
ExamPage --> QuestionCard
QuestionCard --> FeedbackPanel
ExamPage --> Footer

ExamSelectPage --> ExamSelectTopbar
ExamSelectPage --> ExamSelectIntro
ExamSelectPage --> ExamSelectGrid
ExamSelectGrid --> ExamSelectCard

ExamPage --> ExamVM

ExamSelectPage --> GetAvailableExamsUC

ExamVM --> GetExamByBaseIdAndLangUC
ExamVM --> GetExamQuestionsUC
ExamVM --> GradeAnswerUC
ExamVM --> CalculateScoreUC

CalculateScoreUC --> GradeAnswerUC

GetAvailableExamsUC --> Repo
GetExamByBaseIdAndLangUC --> Repo
GetExamQuestionsUC --> Repo

Repo --> DS
DS --> DataRegistry
Repo --> DataRegistry

DataRegistry --> MockExam1No
DataRegistry --> MockExam1En
DataRegistry --> MockExam2No
DataRegistry --> MockExam2En

%% =========================
%% CLEARER ARROWS / EDGES
%% =========================

linkStyle default stroke:#111111,stroke-width:2.6px,color:#000000

%% Side input arrows
linkStyle 0 stroke:#424242,stroke-width:2.2px,stroke-dasharray:6 4
linkStyle 1 stroke:#424242,stroke-width:2.2px,stroke-dasharray:6 4

%% App shell arrows
linkStyle 2,3,4,5 stroke:#111111,stroke-width:3px

%% Page/component arrows
linkStyle 6,7,8,9,10,11,12,13,14 stroke:#111111,stroke-width:2.8px

%% ViewModel and Domain arrows
linkStyle 15,16,17,18,19,20,21,22 stroke:#111111,stroke-width:2.8px

%% Model/Data arrows
linkStyle 23,24,25,26,27,28,29,30 stroke:#111111,stroke-width:2.8px

%% =========================
%% CLASSES
%% =========================

classDef sideNode fill:#E0E0E0,stroke:#424242,stroke-width:2px,color:#000000
classDef appNode fill:#C5E1A5,stroke:#33691E,stroke-width:2.5px,color:#000000
classDef pageNode fill:#FFF9C4,stroke:#827717,stroke-width:2.5px,color:#000000
classDef componentNode fill:#DCE775,stroke:#827717,stroke-width:2px,color:#000000
classDef globalNode fill:#E1BEE7,stroke:#4A148C,stroke-width:2px,color:#000000
classDef viewModelNode fill:#FFCDD2,stroke:#B71C1C,stroke-width:2.5px,color:#000000
classDef domainNode fill:#C5CAE9,stroke:#1A237E,stroke-width:2px,color:#000000
classDef modelNode fill:#DCEDC8,stroke:#33691E,stroke-width:2px,color:#000000
classDef dataNode fill:#FFE082,stroke:#E65100,stroke-width:2px,color:#000000

class DI,NavGraph sideNode
class App appNode
class ExamPage,ExamSelectPage pageNode
class Header,QuestionCard,FeedbackPanel,Footer,ExamSelectTopbar,ExamSelectIntro,ExamSelectGrid,ExamSelectCard componentNode
class AppSidebar,SettingsMenu globalNode
class ExamVM viewModelNode
class GetAvailableExamsUC,GetExamByBaseIdAndLangUC,GetExamQuestionsUC,GradeAnswerUC,CalculateScoreUC domainNode
class Repo,DS modelNode
class DataRegistry,MockExam1No,MockExam1En,MockExam2No,MockExam2En dataNode

%% =========================
%% SUBGRAPH STYLES
%% =========================

style SideInputs stroke:#000000,stroke-width:2px,fill:#E0E0E0,color:#000000
style AppShell stroke:#000000,stroke-width:2px,fill:#F5F5F5,color:#000000
style AppLayer stroke:#000000,stroke-width:2px,fill:#E1BEE7,color:#000000
style GlobalComponents stroke:#000000,stroke-width:2px,fill:#E1BEE7,color:#000000

style PagesAndComponents stroke:#000000,stroke-width:2px,fill:#FFFDE7,color:#000000
style ExamPageRow stroke:#000000,stroke-width:2px,fill:#E3F2FD,color:#000000
style ExamSelectPageRow stroke:#000000,stroke-width:2px,fill:#FFF9C4,color:#000000

style ExamPageComponents stroke:#000000,stroke-width:2px,fill:#BBDEFB,color:#000000
style ExamSelectComponents stroke:#000000,stroke-width:2px,fill:#C8E6C9,color:#000000

style ViewModel stroke:#000000,stroke-width:2px,fill:#FFCDD2,color:#000000
style Domain stroke:#000000,stroke-width:2px,fill:#C5CAE9,color:#000000
style Model stroke:#000000,stroke-width:2px,fill:#DCEDC8,color:#000000
style Data stroke:#000000,stroke-width:2px,fill:#FFE082,color:#000000
style MockData stroke:#E65100,stroke-width:2px,fill:#FFECB3,color:#000000
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
ExamPage / ExamSelectPage
  ↓
UI Components
```

---

## Lagdeling

| Lag | Filer | Ansvar |
|-----|-------|--------|
| **Data** | `src/data/data.js`, `src/data/exams/*.js` | Inneholder eksamensregister og alle øveeksamener |
| **DataSource** | `ExamQuestionDataSource.js` | Henter eksamensdata og spørsmål fra lokal datakilde |
| **Repository** | `ExamRepository.js` | Gir domenelaget tilgang til eksamener og spørsmål uten at domenet kjenner datakilden |
| **Domain / UseCases** | `GetAvailableExamsUseCase`, `GetExamByBaseIdAndLangUseCase`, `GetExamQuestionsUseCase`, `GradeAnswerUseCase`, `CalculateExamScoreUseCase` | Inneholder appens sentrale regler |
| **ViewModel** | `useExamViewModel.js` | Holder React-state, brukerens svar, leveringstilstand, timer, navigasjon mellom spørsmål og score |
| **View / Page** | `ExamPage.jsx`, `ExamSelectPage.jsx` | Setter sammen sidene og sender props videre til komponentene |
| **Components** | `Header`, `QuestionCard`, `FeedbackPanel`, `Footer`, `SettingsMenu`, `Sidebar`, `ResultBadge` | Rene UI-komponenter som viser data og sender brukerhandlinger oppover |
| **i18n** | `LanguageContext.jsx`, `translations.js` | Håndterer språkvalg og tekstnøkler |
| **Theme** | `ThemeContext.jsx` | Håndterer light mode og dark mode |
| **Utils** | `answerutils`, `questionutils`, `viewmodelutils` | Hjelpefunksjoner for svar, spørsmålspresentasjon, labels og visningslogikk |
| **Constants** | `QuestionConfig.js`, `QuestionTypes.js` | Globale spørsmålsverdier og spørsmålstyper |

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
`useExamViewModel` håndterer brukerens svar, submitted-status, åpne/lukkede svarkort, loading, timer, score og navigasjon mellom spørsmål. Dermed holdes side- og komponentlaget enklere.

**UI-komponentene er mest mulig dumme.**  
Komponentene får data og handlers via props. State og brukerflyt eies primært av viewModelen og `App.jsx`, slik at komponentene i hovedsak fokuserer på presentasjon.

**Sidebar er felles for hele appen.**  
Navigasjonen eies av `App.jsx`, mens `AppSidebar` kun presenterer navigasjonen. På smale skjermer vises sidebaren som en hamburgerstyrt drawer med backdrop og lukkeknapp.

**ExamSelectPage er modularisert.**  
Forsiden er delt opp i `ExamSelectTopbar`, `ExamSelectIntro`, `ExamSelectGrid` og `ExamSelectCard`. Dette gjør siden lettere å vedlikeholde og gjør det enklere å endre layout uten at page-filen vokser.

**QuestionCard er delt i funksjonelle underområder.**  
`QuestionCard` består av egne undermapper for `Header`, `Prompt`, `InputField`, `Options`, `AnswerCard`, `Feedback` og `Styling`. Dette gjør det lettere å finne riktig subkomponent og videreutvikle kortet uten at én fil får for mye ansvar.

**Footer er modularisert i funksjonelle enheter.**  
Footer-komponenten er delt i `Footer`, `FooterActionButton`, `FooterNavigationButton`, `QuestionDots`, `QuestionDot` og `footerClassNames`. Handlingsknappen bytter mellom «Neste» og «Lever nå» avhengig av om brukeren er på siste spørsmål. Etter levering viser footer-dots riktig/feil-status med fargekoding.

**UI-et er delt inn i tydelige visuelle soner.**  
Eksamenssiden består av sidebar, header/statistikk, progressbar, question card og footer-navigasjon. Dette gjør at brukeren hele tiden ser hvor langt de har kommet, hvilken oppgave de jobber med, og hvilke handlinger som er tilgjengelige.

**Språk og tema håndteres globalt.**  
Språkvalg håndteres gjennom `LanguageContext`, mens light/dark mode håndteres gjennom `ThemeContext`. Dette gjør at komponentene kan bruke felles tilstand uten å duplisere logikk.

**Styling er modulært organisert per UI-område.**  
`src/ui/style/App.css` fungerer som samlet CSS-entrypoint. Globale designverdier, global reset og responsiv grunnkonfigurasjon ligger i `Tokens.css`, `Global.css` og `Responsive.css`. Større UI-områder som `ExamPage`, `ExamSelectPage`, `Header`, `Footer`, `QuestionCard`, `FeedbackPanel`, `SettingsMenu`, `Sidebar` og `ResultBadge` har egne mapper med `index.css` og mindre CSS-moduler.

**Prosjektet bruker vanlig CSS og design tokens.**  
Tailwind er fjernet til fordel for vanlige CSS-filer, CSS custom properties og en tydelig modulstruktur. Farger, tekst, radius, skygger, spacing, overganger og tema defineres som globale design tokens. Flere komponentverdier hentes fra `Tokens.css`, slik at tokens fungerer som SSOT for visuelle grunnverdier.

**Composition Root i `dependencies.js`.**  
Alle datasource-, repository- og use case-instansene opprettes på ett sted. Det gjør appen mer ryddig og gjør det lettere å bytte implementasjoner senere.

---

## Teknologier

| Teknologi | Bruk |
|----------|------|
| JavaScript | Programmeringsspråk |
| React | UI-bibliotek |
| Vite | Byggverktøy og utviklingsserver |
| CSS | Modulær styling, layout, komponentstiler og dark mode |
| CSS custom properties | Globale design tokens for farger, radius, shadows, spacing, transitions og tema |
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
      prompt: "Hva kjennetegner strategic positioning?",
      source: "Porter: What Is Strategy?",
      options: [
        {
          text: "Å velge en unik posisjon og gjøre trade-offs.",
          correct: true,
          why: "Riktig: Strategi handler om valg, trade-offs og en unik posisjon.",
          whyExtended: [
            "Strategisk posisjonering handler ikke bare om å være effektiv.",
            "Virksomheten må velge hva den ikke skal gjøre.",
            "Trade-offs gjør strategien vanskeligere å kopiere."
          ]
        }
      ]
    }
  ]
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
  mockExam3En
];
```

Alle eksamener må ha unik `id`. Språkversjoner av samme eksamen bør dele samme `baseId`.

---

## Legge til eller endre styling

Global styling importeres fra `src/ui/style/App.css`.

```css
/* src/ui/style/App.css */

@import "./Tokens.css";
@import "./Global.css";
@import "./Responsive.css";

@import "./ExamSelectPage/index.css";
@import "./ExamPage/index.css";

@import "./Sidebar/index.css";
@import "./Header/index.css";
@import "./Footer/index.css";
@import "./QuestionCard/index.css";
@import "./FeedbackPanel/index.css";
@import "./SettingsMenu/index.css";
@import "./ResultBadge/index.css";
```

Retningslinjer:

- Globale designverdier legges i `Tokens.css`.
- Global reset og basisregler legges i `Global.css`.
- Globale responsive regler legges i `Responsive.css`.
- Side-spesifikk styling legges i mappen for siden, for eksempel `ExamPage/` eller `ExamSelectPage/`.
- Komponentområde-spesifikk styling legges i mappen for komponentområdet, for eksempel `Header/`, `Sidebar/` eller `QuestionCard/`.
- Hver mappe bør ha en `index.css` som importerer del-filene i riktig rekkefølge.
- Komponenter bør bruke design tokens fra `Tokens.css` fremfor hardkodede verdier når verdien er gjenbrukbar.

---

## Videre arbeid

Mulige forbedringer:

- Legge til flere øveeksamener fra pensum
- Lage egne eksamener per tema, for eksempel CIO Toolbox, D4D, strategi, IT governance og bærekraft
- Legge til vanskelighetsgrad per spørsmål
- Legge til kategorier eller tags per spørsmål
- Fylle ut `whyExtended` i alle språkversjoner
- Lagre valgt eksamen og progresjon i localStorage
- Lage eksamensmodus med tilfeldig rekkefølge
- Lage statistikk over hvilke temaer brukeren ofte svarer feil på
- Legge til tester for `GradeAnswerUseCase` og `CalculateExamScoreUseCase`
- Legge til tester for henting av riktig eksamen basert på `examId`, `baseId` og språk
- Legge til komponenttester for `QuestionCard`, `AnswerOptionCard` og `FeedbackPanel`
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
2. Øve på modularisering av React-kode og CSS med tydelig ansvarsdeling
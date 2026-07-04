# MERMAID_SOUL.md — Regler for arkitekturdiagrammer i ExamPrepper

<!-- Sist oppdatert: 2026-05-29 -->

Dette dokumentet beskriver hvordan Mermaid-diagrammer for ExamPrepper skal skrives, vedlikeholdes og vurderes.

Målet er ikke å tegne alle imports i prosjektet.

Målet er å vise arkitekturen slik den skal forstås:

```txt
Dependencies / Configuration
        ↓
App
        ↓
Pages / Views
        ↓
Components
        ↓
ViewModels
        ↓
Domain Use Cases
        ↓
Repositories
        ↓
DataSources
        ↓
Data
```

Et godt Mermaid-diagram skal gjøre arkitekturen lettere å forstå.
Hvis diagrammet blir en import-graf, har det feilet.

---

## Hva dette dokumentet er

Dette er en **diagram-authoring SOUL**.

```txt
ARCHITECTURE_SOUL.md
→ Hvordan applikasjonen skal bygges

PATCH_SOUL.md
→ Hvordan endringer skal lages og leveres

QUESTION_TYPE_SOUL.md
→ Hvordan oppgaver skal velges og struktureres

MERMAID_SOUL.md
→ Hvordan arkitekturen skal visualiseres
```

Dette dokumentet er normativt for README-diagrammer, arkitekturdiagrammer og andre Mermaid-diagrammer som beskriver ExamPrepper.

---

## Grunnregel

Mermaid-diagrammet skal vise **arkitekturflyt**, ikke full teknisk importstruktur.

Riktig fokus:

```txt
Hvilket lag snakker med hvilket lag?
Hvilke hovedkomponenter finnes?
Hvor går dataflyten?
Hvor ligger ansvar?
Hvordan passer MVVM-lagene sammen?
```

Feil fokus:

```txt
Alle imports
Alle hjelpefunksjoner
Alle constants
Alle context-filer
Alle CSS-filer
Alle små interne hooks
Alle props
Alle mulige kryssavhengigheter
```

Hvis en node ikke hjelper leseren å forstå arkitekturen, skal den vanligvis ikke være med.

---

## Arkitekturretning

Standardretningen er top-down:

```mermaid
flowchart TB
```

Diagrammet skal normalt følge denne rekkefølgen:

```txt
0. Dependencies
1. Side Inputs / Configuration
2. App / Composition Root
3. Pages / Views
4. Components
5. ViewModels / Hooks
6. Domain Layer / Use Cases
7. Repository Layer
8. DataSource Layer
9. Data
```

Dette speiler ExamPrepper sin lagdelte MVVM-arkitektur.

---

## Obligatoriske hovedlag

Et komplett arkitekturdiagram for README bør normalt ha disse subgraphene:

```txt
Dependencies
Side Inputs / Configuration
App / Composition Root
Pages / Views
Components
ViewModels / Hooks
Domain Layer / Use Cases
Repository Layer
DataSource Layer
Data
```

Ikke slå sammen `Domain`, `Repository` og `DataSource` til ett generisk `Model`-lag hvis målet er å forklare arkitekturen.

Disse tre lagene skal være synlige:

```txt
Domain Layer / Use Cases
Repository Layer
DataSource Layer
```

Dette gjør det tydelig at prosjektet følger:

```txt
DataSource → Repository → Domain Use Case → DI → ViewModel → View → Components
```

---

## Dependencies

`dependencies.js` skal ligge i egen subgraph.

Riktig:

```mermaid
subgraph Dependencies["0. Dependencies"]
    direction LR
        DI["dependencies.js"]
end
```

`dependencies.js` skal ikke blandes sammen med navigation, constants eller annen configuration.

Diagrammet skal vise at `dependencies.js` er wiring-punktet, ikke et vanlig runtime-lag.

Bruk stiplet pil fra dependencies til app:

```mermaid
DI -.-> App
```

Dette signaliserer at DI er en wiring/configuration-dependency, ikke en vanlig brukerflyt.

---

## Side Inputs / Configuration

Side inputs er støttefiler som påvirker appen, men som ikke er hoveddataflyten.

Typiske noder:

```txt
navGraph.js
navItems.js
```

Eksempel:

```mermaid
subgraph SideInputs["1. Side Inputs / Configuration"]
    direction LR
        NavGraph["navGraph.js"]
        NavItems["navItems.js"]
end
```

Bruk stiplede piler:

```mermaid
NavGraph -.-> App
NavItems -.-> AppSidebar
```

---

## Hva som normalt ikke skal være med

Ikke ta med disse bare fordi de finnes:

```txt
ThemeContext
LanguageContext
SettingsContext
QuestionTypes.js
QuestionConfig.js
translations.js
små utility-filer
CSS-filer
testfiler
index.js / barrel exports
```

De kan være med bare hvis diagrammets tema eksplisitt handler om dem.

Eksempel:

```txt
Hvis diagrammet handler om theming → ta med ThemeContext.
Hvis diagrammet handler om question type engine → ta med QuestionTypes.js.
Hvis diagrammet handler om vanlig README-arkitektur → ikke ta dem med.
```

Hovedregelen er:

```txt
Hvis noden skaper mer støy enn forståelse, fjern den.
```

---

## App Layer

`App.jsx` skal vises som Composition Root.

Eksempel:

```mermaid
subgraph AppLayer["2. App / Composition Root"]
        App["App.jsx"]
end
```

`App.jsx` kan peke til:

```txt
Pages / Views
Global Components
AppNavigationViewModel
```

Eksempel:

```mermaid
App --> SubjectSelectPage & LearningContentSelectPage & ExamPage & AppSidebar & SettingsMenu & AppNavVM
```

Ikke bruk diagrammet til å antyde at `App.jsx` inneholder domenelogikk.

---

## Pages / Views

Pages skal ligge i eget lag.

Eksempel:

```mermaid
subgraph Pages["3. Pages / Views"]
    direction LR
        SubjectSelectPage["SubjectSelectPage.jsx"]
        LearningContentSelectPage["LearningContentSelectPage.jsx"]
        ExamPage["ExamPage.jsx"]
end
```

Pages kan peke til:

```txt
Sine egne komponenter
Sin egen ViewModel
```

Eksempel:

```mermaid
ExamPage --> Header & ExamProgress & ExamPageContent & Footer & ExamPageVM
```

Pages skal ikke peke direkte til:

```txt
Repositories
DataSources
Data
dependencies.js
```

Hvis et diagram viser at en Page snakker direkte med Repository eller DataSource, viser diagrammet enten teknisk gjeld eller feil arkitektur.

---

## Components

Komponentlaget skal vise hovedkomponenter, ikke alle små JSX-detaljer.

Anbefalt struktur:

```txt
SubjectSelectPage Components
LearningContentSelectPage Components
ExamPage Components
QuestionCard Components
Global Components
```

Eksempel:

```mermaid
subgraph Components["4. Components"]
    direction LR
        SubjectSelectComponents
        ExamSelectComponents
        ExamPageComponents
        QuestionComponents
        GlobalComponents
end
```

Dette gir et ryddig komponentkart uten å gjøre diagrammet til en full komponentgraf.

---

## QuestionCard Components

QuestionCard kan gjerne ha egen subgraph fordi dette er en sentral del av ExamPrepper.

Anbefalt komprimert visning:

```mermaid
subgraph QuestionComponents["QuestionCard Components"]
    direction TB
        ChoiceQuestions["SingleRadio / MultiCheckbox"]
        FillBlank["FillBlankInput"]
        DragDropQuestions["CategorySort / TableMatch / MatrixPlacement / SequenceOrder"]
end
```

Ikke del dette opp i for mange noder i README-diagrammet.

Riktig nivå:

```txt
SingleRadio / MultiCheckbox
FillBlankInput
CategorySort / TableMatch / MatrixPlacement / SequenceOrder
```

For detaljert nivå:

```txt
Alle interne buttons
Alle feedback spans
Alle drag handlers
Alle lokale helper hooks
Alle små layout wrappers
```

Hvis diagrammet handler spesifikt om QuestionCard-arkitektur, kan et eget detaljdiagram lages.

README-diagrammet skal være overordnet.

---

## ViewModels

ViewModel-laget skal alltid være eget lag.

Eksempel:

```mermaid
subgraph ViewModel["5. ViewModels / Hooks"]
    direction TB
        AppNavVM["useAppNavigationViewModel"]
        ResolveTranslated["resolveTranslatedExamId"]
        SubjectSelectVM["useSubjectSelectPageViewModel"]
        ExamSelectVM["useLearningContentSelectPageViewModel"]
        ExamPageVM["useExamPageViewModel"]
end
```

Pages skal peke til sine ViewModels:

```mermaid
SubjectSelectPage --> SubjectSelectVM
LearningContentSelectPage --> ExamSelectVM
ExamPage --> ExamPageVM
```

ViewModel skal peke til Use Cases:

```mermaid
ExamPageVM --> GetExamQuestionsUC & GradeAnswerUC & CalculateScoreUC
```

Ikke tegn ViewModel som en del av komponentlaget.

Ikke tegn komponenter som om de eier ViewModel.

---

## Domain Layer / Use Cases

Domain skal være et eget lag.

Eksempel:

```mermaid
subgraph Domain["6. Domain Layer / Use Cases"]
    direction TB
        GetAvailableSubjectsUC["GetAvailableSubjectsUseCase"]
        GetSubjectByIdUC["GetSubjectByIdUseCase"]
        GetAvailableExamsUC["GetAvailableExamsUseCase"]
        GetExamByIdUC["GetExamByIdUseCase"]
        GetExamByBaseIdAndLangUC["GetExamByBaseIdAndLangUseCase"]
        GetExamQuestionsUC["GetExamQuestionsUseCase"]
        GradeAnswerUC["GradeAnswerUseCase"]
        CalculateScoreUC["CalculateExamScoreUseCase"]
end
```

Use Cases skal peke til Repositories:

```mermaid
GetExamQuestionsUC --> ExamRepo
```

Use Cases skal ikke peke til:

```txt
Pages
Components
DataSources
Data-filer
```

Unntak: én Use Case kan peke til en annen Use Case hvis den faktisk er injisert eller brukt slik.

Eksempel:

```mermaid
CalculateScoreUC --> GradeAnswerUC
```

---

## Repository Layer

Repositories skal ha egen subgraph.

Eksempel:

```mermaid
subgraph RepositoryLayer["7. Repository Layer"]
    direction TB
        ExamRepo["ExamRepository"]
        SubjectRepo["SubjectRepository"]
end
```

Repositories skal peke til DataSources:

```mermaid
SubjectRepo --> SubjectDS
ExamRepo --> ExamDS & ConceptImageDS
```

Hvis ett repository bruker et annet repository, kan det vises, men bruk det sparsomt:

```mermaid
SubjectRepo --> ExamRepo
```

Ikke tegn Repository som om det er en del av Domain.

Ikke tegn Repository som om det er rådata.

Repository er et eget arkitekturlag.

---

## DataSource Layer

DataSources skal ha egen subgraph.

Eksempel:

```mermaid
subgraph DataSourceLayer["8. DataSource Layer"]
    direction TB
        ExamDS["ExamQuestionDataSource"]
        SubjectDS["SubjectDataSource"]
        ConceptImageDS["ConceptImageDataSource"]
end
```

DataSources skal peke til Data:

```mermaid
ExamDS --> DataRegistry
SubjectDS --> SubjectsData
ConceptImageDS --> ConceptImageRegistry & DefaultImageRefs
```

DataSource-laget er byttepunktet for fremtidig backend.

Diagrammet skal derfor gjøre DataSource-laget synlig.

---

## Data

Data skal ligge nederst.

Eksempel:

```mermaid
subgraph Data["9. Data"]
    direction TB
        DataRegistry["data.js"]
        SubjectsData["subjects.js"]
        MockData
        ImageData
end
```

Mockdata og bildedata kan gjerne grupperes:

```mermaid
subgraph MockData["Mock Exam Data"]
    direction LR
        MockDefinitions["mockExamDefinitions_no.js"]
        MockExams["Mock Exams ×11"]
end

subgraph ImageData["Concept Image Data"]
    direction LR
        ConceptImageRegistry["conceptImageCatalogRegistry.js"]
        DefaultImageRefs["defaultQuestionImageRefs.js"]
end
```

Ikke list opp alle mockeksamener hvis det gjør diagrammet stort og uleselig.

Bruk heller:

```txt
Mock Exams ×11
```

Dette er bedre for README.

---

## Pilregler

Bruk vanlige piler for hovedflyt:

```mermaid
Page --> ViewModel
ViewModel --> UseCase
UseCase --> Repository
Repository --> DataSource
DataSource --> Data
```

Bruk stiplede piler for side inputs og configuration:

```mermaid
DI -.-> App
NavGraph -.-> App
NavItems -.-> AppSidebar
```

Ikke bruk piler for alt som er “teknisk sant”.

En pil betyr:

```txt
Dette er viktig for å forstå arkitekturen.
```

Ikke:

```txt
Dette finnes et sted i importtreet.
```

---

## Unngå spaghetti

Et diagram er for komplisert hvis:

```txt
piler krysser mange lag
side inputs peker inn overalt
komponenter peker til domain
data peker tilbake oppover
ViewModel-laget drukner i detaljer
alle constants og contexts er med
diagrammet må zoomes mye for å forstå hovedflyten
```

Fiks ved å:

```txt
1. Fjerne støyende noder
2. Gruppere relaterte komponenter
3. Bruke stiplede piler for side inputs
4. Slå sammen detaljer til én node
5. Splitte arkitekturlag, ikke komponentdetaljer
6. Beholde én tydelig top-down hovedflyt
```

---

## ELK-layout

Bruk ELK-layout for README-diagrammer.

Standard config:

```mermaid
---
config:
  layout: elk
  elk:
    mergeEdges: true
    nodePlacementStrategy: NETWORK_SIMPLEX
  theme: base
  themeVariables:
    background: '#FFFFFF'
    mainBkg: '#FFFFFF'
    lineColor: '#111111'
    primaryBorderColor: '#111111'
    edgeLabelBackground: '#FFFFFF'
---
flowchart TB
```

`mergeEdges: true` er vanligvis best for README fordi det reduserer visuell støy.

Hvis du trenger å feilsøke layouten, kan du midlertidig bruke:

```yaml
mergeEdges: false
```

Men standarddiagrammet bør vanligvis bruke:

```yaml
mergeEdges: true
```

---

## Hvit bakgrunn er obligatorisk

Diagrammer i README skal ha hvit bakgrunn.

Dette skal være med:

```yaml
themeVariables:
  background: '#FFFFFF'
  mainBkg: '#FFFFFF'
  edgeLabelBackground: '#FFFFFF'
```

Ved rendering med Mermaid CLI skal dette brukes:

```bash
mmdc -i diagram.mmd -o diagram.png -b white
```

Ikke stol på transparent bakgrunn.

Transparent bakgrunn gjør diagrammet dårligere på mobil, i dark mode og i eksporterte bilder.

---

## Farger

Bruk faste farger per arkitekturlag.

Anbefalt standard:

```mermaid
classDef dependencyNode fill:#CFD8DC,stroke:#263238,stroke-width:1.8px,color:#000000
classDef sideNode fill:#E0E0E0,stroke:#424242,stroke-width:1.5px,color:#000000
classDef appNode fill:#C5E1A5,stroke:#33691E,stroke-width:2px,color:#000000
classDef pageNode fill:#FFF9C4,stroke:#827717,stroke-width:2px,color:#000000
classDef componentNode fill:#DCE775,stroke:#827717,stroke-width:1.5px,color:#000000
classDef globalNode fill:#E1BEE7,stroke:#4A148C,stroke-width:1.5px,color:#000000
classDef viewModelNode fill:#FFCDD2,stroke:#B71C1C,stroke-width:2px,color:#000000
classDef domainNode fill:#C5CAE9,stroke:#1A237E,stroke-width:2px,color:#000000
classDef repositoryNode fill:#DCEDC8,stroke:#33691E,stroke-width:2px,color:#000000
classDef dataSourceNode fill:#FFE0B2,stroke:#E65100,stroke-width:2px,color:#000000
classDef dataNode fill:#FFE082,stroke:#E65100,stroke-width:2px,color:#000000
```

Farger skal støtte lesbarhet, ikke pynt.

Ikke bruk lav kontrast.

Ikke bruk transparent bakgrunn.

Ikke bruk dark-mode-avhengige farger i selve Mermaid-koden.

---

## Navngivning av noder

Node-ID-er skal være korte og stabile:

```txt
App
DI
SubjectSelectPage
ExamPageVM
GetExamQuestionsUC
ExamRepo
ExamDS
DataRegistry
```

Node-labels skal være lesbare:

```mermaid
ExamPageVM["useExamPageViewModel"]
GetExamQuestionsUC["GetExamQuestionsUseCase"]
ExamDS["ExamQuestionDataSource"]
```

Ikke bruk filstier som label med mindre det er nødvendig.

Dårlig:

```txt
src/ui/view/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/SequenceOrder.jsx
```

Bedre:

```txt
SequenceOrder
```

README-diagrammet skal forklare arkitekturen, ikke erstatte filutforskeren.

---

## Når diagrammet skal oppdateres

Oppdater Mermaid-diagrammet når ett av disse endres:

```txt
Nytt arkitekturlag
Ny Page
Ny ViewModel
Ny Use Case
Nytt Repository
Ny DataSource
Ny sentral komponentgruppe
Ny hovedtype i QuestionCard
Ny dataflyt for bilder, eksamener eller subjects
```

Ikke oppdater README-diagrammet for:

```txt
Små CSS-endringer
Renaming av intern helper
Mindre komponentdetaljer
Nye enkeltspørsmål i mockdata
Nye enkeltbilder
Små constants
```

Hvis endringen ikke påvirker arkitekturen, skal den vanligvis ikke inn i diagrammet.

---

## Kontroll før diagrammet endres

Før Mermaid-diagrammet endres, skal faktisk prosjektstruktur kontrolleres.

Minimum:

```bash
find src -maxdepth 3 -type d
find src/model -maxdepth 4 -type f
find src/ui/view -maxdepth 5 -type f
find src/ui/viewmodel -maxdepth 3 -type f
find src/data -maxdepth 4 -type f
```

Ved spørsmålstyper:

```bash
grep -R "SequenceOrder" -n src
grep -R "CategorySort" -n src
grep -R "MatrixPlacement" -n src
grep -R "dragDrop" -n src
```

Ved dataflyt for bilder:

```bash
grep -R "conceptImages" -n src
grep -R "whyExtendedImageRefs" -n src
grep -R "defaultQuestionImageRefs" -n src
```

Ikke oppdater diagrammet basert på gjetning.

Diagrammet skal reflektere faktisk prosjektstruktur og ønsket arkitektur.

---

## Dokumentasjonspatch for Mermaid

Endringer i Mermaid-diagrammet er vanligvis en dokumentasjonspatch.

En slik patch skal normalt bare endre:

```txt
README.md
docs/**
MERMAID_SOUL.md
```

Den skal ikke endre runtime-kode.

Den skal ikke endre `package.json`.

Den skal ikke endre tester.

Minimumssjekk:

```bash
git diff --check
```

Hvis Mermaid-koden er rendret lokalt, oppgi også kommandoen:

```bash
mmdc -i diagram.mmd -o diagram.png -b white
```

---

## Vanlige feil

### Feil: Diagrammet blir en importgraf

Dårlig:

```txt
Alle filer peker til alle filer de importerer.
```

Riktig:

```txt
Kun arkitektonisk viktige avhengigheter vises.
```

---

### Feil: Dependencies blandes inn i Side Inputs

Dårlig:

```mermaid
subgraph SideInputs["Side Inputs"]
    DI["dependencies.js"]
    NavGraph["navGraph.js"]
end
```

Riktig:

```mermaid
subgraph Dependencies["0. Dependencies"]
    DI["dependencies.js"]
end

subgraph SideInputs["1. Side Inputs / Configuration"]
    NavGraph["navGraph.js"]
    NavItems["navItems.js"]
end
```

---

### Feil: Model skjuler arkitekturen

Dårlig:

```mermaid
subgraph Model["Model"]
    ExamRepo
    SubjectRepo
    ExamDS
    SubjectDS
end
```

Riktig:

```mermaid
subgraph RepositoryLayer["7. Repository Layer"]
    ExamRepo
    SubjectRepo
end

subgraph DataSourceLayer["8. DataSource Layer"]
    ExamDS
    SubjectDS
    ConceptImageDS
end
```

---

### Feil: Constants og contexts skaper støy

Dårlig i README-diagram:

```txt
ThemeContext
LanguageContext
SettingsContext
QuestionTypes.js
QuestionConfig.js
```

Riktig:

```txt
Utelat dem, med mindre diagrammet handler om akkurat dette.
```

---

### Feil: Komponentlaget blir for detaljert

Dårlig:

```txt
QuestionText
QuestionTitle
QuestionPrompt
QuestionImage
QuestionButton
QuestionFeedbackLine
QuestionFeedbackIcon
```

Riktig:

```txt
QuestionCard
FeedbackPanel
ResultBadge
ChoiceQuestions
FillBlank
DragDropQuestions
```

---

## Standard README-diagramstruktur

Bruk denne strukturen som standard:

```txt
0. Dependencies
1. Side Inputs / Configuration
2. App / Composition Root
3. Pages / Views
4. Components
5. ViewModels / Hooks
6. Domain Layer / Use Cases
7. Repository Layer
8. DataSource Layer
9. Data
```

Dette er standardformen for ExamPrepper sitt hoveddiagram.

Andre diagrammer kan avvike hvis de har et smalere formål, men avviket skal være bevisst.

---

## Kvalitetssjekk

Et Mermaid-diagram er klart når dette er sant:

```txt
1. Det har hvit bakgrunn.
2. Det bruker top-down flowchart.
3. Det viser MVVM-lagene tydelig.
4. Dependencies ligger i egen subgraph.
5. Repository og DataSource er separate lag.
6. Domain-laget inneholder Use Cases.
7. Pages peker til ViewModels, ikke direkte til Domain.
8. ViewModels peker til Use Cases.
9. Use Cases peker til Repositories.
10. Repositories peker til DataSources.
11. DataSources peker til Data.
12. Side inputs bruker stiplede piler.
13. Diagrammet viser arkitektur, ikke alle imports.
14. QuestionCard er komprimert nok til å være lesbar.
15. Ingen unødvendige contexts/constants er med.
16. Diagrammet er lesbart på mobil.
```

Hvis diagrammet ikke består denne sjekken, forenkle det.

---

## Kortversjon

```txt
Tegn lag, ikke alle filer.
Tegn ansvar, ikke alle imports.
Tegn hovedflyt, ikke støy.
Hold dependencies separat.
Hold Repository og DataSource separat.
Bruk hvit bakgrunn.
Bruk stiplede piler for configuration.
Ikke gjør README-diagrammet til spaghetti.
```

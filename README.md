<h1 align="center">
  <img src="./docs/images/Full_logo_transparent.png" alt="ExamPrepper logo" width="520" />
</h1>

<br>

## Om ExamPrepper prosjektet

Et **JavaScript, CSS, React og Vite**-prosjekt laget for å øve til skoleeksamen i **IN5431 – IT and Management**.

Prosjektet er en interaktiv eksamenssimulator der brukeren kan velge mellom flere øveeksamener, svare på spørsmål og få fasit med forklaring etter levering.

Appen støtter flere spørsmålstyper:

1. Multiple choice med ett riktig svar
2. Multiple choice med flere riktige svar
3. Fyll inn riktig begrep
4. Dra-og-slipp til riktige kategorier
5. Dra-og-slipp matching i tabell
6. Dra-og-slipp plassering i 2x2-matrise

Etter levering får brukeren tilbakemelding på hvert spørsmål:

- Om svaret er riktig eller feil
- Hva fasiten er
- Kort forklaring på hvert svaralternativ
- Hvilke radio-/checkbox-alternativer brukeren valgte
- Brukerens fill-in-svar og riktig svar side om side
- Mulighet til å åpne svarkort for utvidet forklaring når `whyExtended` finnes i eksamensdataene
- Henvisning til pensum, forelesning eller fasitgrunnlag

Prosjektet er strukturert etter et MVVM-inspirert arkitekturmønster med tydelig lagdeling mellom data, datasource, repository, use cases, viewmodel, page og komponenter.

Målet med prosjektet er både å lage et nyttig eksamensverktøy og å demonstrere tydelig modularisering av en React-applikasjon.

---

## Sentrale funksjoner

| Funksjon | Beskrivelse |
|----------|-------------|
| Valg av fag | Brukeren kan velge fag før eksamen velges |
| Valg av eksamen | Brukeren kan velge mellom flere øveeksamener |
| Multiple choice | Støtter både ett riktig svar og flere riktige svar |
| Fyll inn begrep | Brukeren skriver inn riktig fagbegrep, med støtte for flere aksepterte svar |
| Category sort | Brukeren kan dra svaralternativer inn i riktige kategorier |
| Table match | Brukeren kan matche kort med riktig rad/beskrivelse i en tabell |
| Matrix placement | Brukeren kan plassere kort i riktig kvadrant i en generisk 2x2-matrise |
| Drag-and-drop feedback | Drag-and-drop-oppgaver viser riktige/feil plasseringer, ubesvarte kort, fasitkort og forklaringer etter levering |
| Automatisk retting | Svarene rettes når brukeren trykker «Lever nå» |
| Fasit etter levering | Etter levering vises fasit, forklaringer og vurdering av svarene |
| Tydelig fill-in feedback | Fill-in-spørsmål viser brukerens svar og riktig svar side om side etter levering |
| Markering av valgt alternativ | I feedback-mode markeres brukerens valgte radio-/checkbox-alternativer tydelig |
| Utvidede forklaringer | Svarkort kan åpnes for å vise mer detaljert forklaring |
| Forbedret feedback-visning | Forklaringer og pensumhenvisninger vises som tydelige kort |
| Pensumhenvisning | Hvert spørsmål kan ha kilde/fasitlinje mot forelesning eller pensum |
| Poengscore | Viser antall poeng og prosent riktig |
| Ny runde | Eksamen kan nullstilles og tas på nytt |
| Språkvalg | Brukeren kan bytte mellom norsk og engelsk |
| Lys/mørk modus | Brukeren kan bytte mellom light mode og dark mode fra innstillinger |
| Felles sidebar | Samme sidebar brukes på tvers av hele appen |
| Hamburger/drawer på små skjermer | På smale skjermer åpnes sidebaren via hamburgermeny og kan lukkes med backdrop eller lukkeknapp |
| Responsivt grensesnitt | Layouten tilpasser seg skjermbredde og skjermhøyde |
| Laptop-optimalisert layout | ExamPage, SubjectSelectPage og ExamSelectPage har egne responsive regler for typiske laptop-skjermer og svært lave viewport-høyder |
| Moderne eksamenslayout | Bruker sidebar, header/statistikk, progressbar, question cards og footer-navigasjon |
| Lever nå-knapp | Siste spørsmål viser «Lever nå» i stedet for «Neste» i footer-navigasjonen |
| Resultatdots | Etter levering viser footer-dots grønn eller rød farge per spørsmål |
| Utvidbart eksamensregister | Nye øveeksamener kan legges til som egne datafiler |

---

## Prosjektstruktur

Selve React-komponentene ligger under `ui/view/components/`, mens sider ligger under `ui/view/pages/`. Styling er samlet separat i `ui/style/`, slik at komponentstruktur og CSS-struktur holdes adskilt, men fortsatt speiler hverandre der det gir bedre feature-eierskap.

Den mest detaljerte delen av strukturen ligger under `ExamPage/QuestionCard/`, der oppgavetypene er samlet i `QuestionTypes/`. Hver oppgavetype har egne komponenter og eventuelle lokale `Utils/`, mens felles komponenter for hele spørsmålsvisningen ligger i `Shared/`. CSS-en for `QuestionCard` følger samme feature-inndeling under `src/ui/style/QuestionCard`, med delte base-stiler i `Base/` og spørsmålstype-spesifikk styling under `QuestionTypes/`. Globale hjelpefunksjoner beholdes kun i `src/utils/` når de brukes på tvers av flere lag eller features.

```bash
IN5431-Exam-Emulator/
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── public/
│   └── favicon.ico
├── test/
│   ├── integration/
│   │   └── ...
│   ├── model/
│   │   └── ...
│   ├── ui/
│   │   └── ...
│   └── utils/
│       └── ...
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
    │       ├── mockExam2_no.js
    │       ├── mockExam3_en.js
    │       ├── mockExam3_no.js
    │       ├── mockExam4_en.js
    │       ├── mockExam4_no.js
    │       ├── mockExam5_en.js
    │       └── mockExamDragCategorize_no.js
    ├── di/
    │   └── dependencies.js
    ├── i18n/
    │   ├── LanguageContext.jsx
    │   └── translations.js
    ├── model/
    │   ├── datasource/
    │   │   └── ...
    │   ├── domain/
    │   │   └── ...
    │   └── repositories/
    │       └── ...
    ├── navigation/
    │   ├── navGraph.js
    │   └── navItems.js
    ├── ui/
    │   ├── settings/
    │   │   └── SettingsContext.jsx
    │   ├── theme/
    │   │   └── ThemeContext.jsx
    │   ├── style/
    │   │   ├── App.css
    │   │   ├── Global.css
    │   │   ├── Tokens.css
    │   │   ├── ExamPage/
    │   │   │   └── ...
    │   │   ├── ExamSelectPage/
    │   │   │   └── ...
    │   │   ├── FeedbackPanel/
    │   │   │   └── ...
    │   │   ├── Footer/
    │   │   │   └── ...
    │   │   ├── Header/
    │   │   │   └── ...
    │   │   ├── QuestionCard/
    │   │   │   ├── AnswerCard/
    │   │   │   │   └── ...
    │   │   │   ├── Base/
    │   │   │   │   └── ...
    │   │   │   ├── QuestionTypes/
    │   │   │   │   ├── ChoiceShared/
    │   │   │   │   │   └── ...
    │   │   │   │   ├── FillBlankInputField/
    │   │   │   │   │   └── ...
    │   │   │   │   └── DragDrop/
    │   │   │   │       ├── Shared/
    │   │   │   │       │   └── ...
    │   │   │   │       ├── CategorySort/
    │   │   │   │       │   └── ...
    │   │   │   │       ├── TableMatch/
    │   │   │   │       │   └── ...
    │   │   │   │       └── MatrixPlacement/
    │   │   │   │           └── ...
    │   │   │   └── ...
    │   │   ├── ResultBadge/
    │   │   │   └── ...
    │   │   ├── SettingsMenu/
    │   │   │   └── ...
    │   │   ├── Sidebar/
    │   │   │   └── ...
    │   │   └── SubjectSelectPage/
    │   │       └── ...
    │   ├── view/
    │   │   ├── pages/
    │   │   │   ├── ExamPage.jsx
    │   │   │   ├── ExamSelectPage.jsx
    │   │   │   └── SubjectSelectPage.jsx
    │   │   └── components/
    │   │       ├── ExamPage/
    │   │       │   ├── ExamPageContent.jsx
    │   │       │   ├── ExamPageState.jsx
    │   │       │   ├── ExamProgress/
    │   │       │   │   └── ...
    │   │       │   ├── FeedbackPanel/
    │   │       │   │   └── ...
    │   │       │   ├── QuestionCard/
    │   │       │   │   ├── QuestionCard.jsx
    │   │       │   │   ├── AnswerCard/
    │   │       │   │   │   └── ...
    │   │       │   │   ├── QuestionTypes/
    │   │       │   │   │   ├── ChoiceShared/
    │   │       │   │   │   │   └── ...
    │   │       │   │   │   ├── FillBlankInputField/
    │   │       │   │   │   │   └── ...
    │   │       │   │   │   ├── MultiCheckboxSelect/
    │   │       │   │   │   │   └── MultiCheckboxSelectQuestion.jsx
    │   │       │   │   │   ├── SingleRadioButtonChoice/
    │   │       │   │   │   │   └── SingleRadioButtonChoiceQuestion.jsx
    │   │       │   │   │   └── DragDrop/
    │   │       │   │   │       ├── Shared/
    │   │       │   │   │       │   └── ...
    │   │       │   │   │       ├── CategorySort/
    │   │       │   │   │       │   └── ...
    │   │       │   │   │       ├── MatrixPlacement/
    │   │       │   │   │       │   ├── Feedback/
    │   │       │   │   │       │   ├── ItemBank/
    │   │       │   │   │       │   ├── Matrix/
    │   │       │   │   │       │   ├── Question/
    │   │       │   │   │       │   └── Utils/
    │   │       │   │   │       └── TableMatch/
    │   │       │   │   │           └── ...
    │   │       │   │   └── Shared/
    │   │       │   │       ├── Feedback/
    │   │       │   │       │   └── ...
    │   │       │   │       ├── Prompt/
    │   │       │   │       │   └── ...
    │   │       │   │       ├── QuestionHeader/
    │   │       │   │       │   └── ...
    │   │       │   │       ├── Styling/
    │   │       │   │       │   └── ...
    │   │       │   │       └── Utils/
    │   │       │   │           └── ...
    │   │       │   └── ResultBadge/
    │   │       │       └── ResultBadge.jsx
    │   │       ├── ExamSelectPage/
    │   │       │   └── ...
    │   │       ├── Footer/
    │   │       │   └── ...
    │   │       ├── Header/
    │   │       │   └── ...
    │   │       ├── Settings/
    │   │       │   └── ...
    │   │       ├── Sidebar/
    │   │       │   └── ...
    │   │       ├── SubjectIcon.jsx
    │   │       └── SubjectSelectPage/
    │   │           └── ...
    │   └── viewmodel/
    │       ├── AppNavigationViewModel.js
    │       ├── ExamPageViewModel.js
    │       ├── ExamSelectPageViewModel.js
    │       ├── SubjectSelectPageViewModel.js
    │       └── Utils/
    │           └── ...
    └── utils/
        └── answer/
            ├── getCorrectIndexes.js
            └── normalizeAnswer.js
```
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
| `test/integration/` | Tester samlet eksamensflyt med ekte data fra prosjektet |
| `test/model/domain/` | Tester use cases og domenelogikk isolert |
| `test/model/repositories/` | Tester repository-laget og henting av fag/eksamensdata |
| `test/ui/` | Klargjort for komponentnære UI-tester |
| `test/utils/` | Tester felles og feature-nære hjelpefunksjoner for svar, spørsmål og viewmodel-visning |

---

## Teststrategi

Teststrategien følger arkitekturen i prosjektet:

```text
Data
  ↓
Repository
  ↓
UseCases
  ↓
ViewModel / Utils
```

Målet er å teste mest mulig av forretningslogikken uten å måtte starte Vite eller åpne appen i nettleseren.

Testene dekker blant annet:

- retting av single choice-svar
- retting av multiple choice-svar
- retting av fill-in-svar
- retting av drag-and-drop-oppgaver
- retting av category sort-oppgaver
- retting av table match-oppgaver
- retting av matrix placement-oppgaver
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

### Enhetstester

<table>
    <thead>
        <tr>
            <th>Test-case</th>
            <th>Testbetingelse</th>
            <th>Testfil</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Rette single choice-svar</td>
            <td>Systemet skal avgjøre om valgt alternativ er korrekt.</td>
            <td><code>GradeAnswerUseCase.test.js</code></td>
        </tr>
        <tr>
            <td>Rette multiple choice-svar</td>
            <td>Systemet skal håndtere flere riktige alternativer.</td>
            <td><code>GradeAnswerUseCase.test.js</code></td>
        </tr>
        <tr>
            <td>Rette fill-in-svar</td>
            <td>Systemet skal godta riktige tekstsvar og alternative svar.</td>
            <td><code>GradeAnswerUseCase.test.js</code> / <code>answerUtils.test.js</code></td>
        </tr>
        <tr>
            <td>Rette matrix placement-svar</td>
            <td>Systemet skal avgjøre om kort er plassert i riktig kvadrant i en 2x2-matrise.</td>
            <td><code>GradeAnswerUseCase.test.js</code></td>
        </tr>
        <tr>
            <td>Beregne eksamensscore</td>
            <td>Systemet skal beregne poengsum og prosent etter levering.</td>
            <td><code>CalculateExamScoreUseCase.test.js</code></td>
        </tr>
        <tr>
            <td>Hente tilgjengelige fag</td>
            <td>Systemet skal vise fag som kan velges i appen.</td>
            <td><code>GetAvailableSubjectsUseCase.test.js</code></td>
        </tr>
        <tr>
            <td>Hente fag basert på ID</td>
            <td>Systemet skal finne riktig fag når <code>subjectId</code> er valgt.</td>
            <td><code>GetSubjectByIdUseCase.test.js</code></td>
        </tr>
        <tr>
            <td>Hente tilgjengelige eksamener for fag og språk</td>
            <td>Systemet skal vise riktige eksamener for valgt fag og språk.</td>
            <td><code>GetAvailableExamsUseCase.test.js</code></td>
        </tr>
        <tr>
            <td>Hente spørsmål for valgt eksamen</td>
            <td>Systemet skal laste spørsmålene til valgt eksamen.</td>
            <td><code>GetExamQuestionsUseCase.test.js</code></td>
        </tr>
        <tr>
            <td>Hente språkversjon av samme eksamen</td>
            <td>Systemet skal finne eksamen basert på <code>baseId</code> og <code>lang</code>.</td>
            <td><code>GetExamByBaseIdAndLangUseCase.test.js</code></td>
        </tr>
        <tr>
            <td>Teste repository for eksamensdata</td>
            <td>Repository-laget skal hente eksamener og spørsmål fra datagrunnlaget.</td>
            <td><code>ExamRepository.test.js</code></td>
        </tr>
        <tr>
            <td>Teste repository for fagdata</td>
            <td>Repository-laget skal hente fag og fagmetadata fra datagrunnlaget.</td>
            <td><code>SubjectRepository.test.js</code></td>
        </tr>
        <tr>
            <td>Teste hjelpefunksjoner for svarlogikk</td>
            <td>Utils skal tolke og normalisere svar likt på tvers av appen.</td>
            <td><code>answerUtils.test.js</code></td>
        </tr>
        <tr>
            <td>Teste hjelpefunksjoner for spørsmål</td>
            <td>Utils skal gi riktig presentasjonsdata for spørsmål.</td>
            <td><code>questionUtils.test.js</code></td>
        </tr>
        <tr>
            <td>Teste hjelpefunksjoner for ViewModel-visning</td>
            <td>Utils skal gi riktig UI-status basert på state.</td>
            <td><code>viewModelUtils.test.js</code></td>
        </tr>
    </tbody>
</table>

### Integrasjonstester

<table>
    <thead>
        <tr>
            <th>Test-case</th>
            <th>Testbetingelse</th>
            <th>Testfil</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Laste synlige fag med eksamensteller</td>
            <td>Appen skal kunne hente fag fra ekte datagrunnlag.</td>
            <td><code>examFlow.integration.test.js</code></td>
        </tr>
        <tr>
            <td>Laste norske eksamener for IN5431</td>
            <td>Appen skal hente riktige eksamener for valgt fag og språk.</td>
            <td><code>examFlow.integration.test.js</code></td>
        </tr>
        <tr>
            <td>Laste spørsmål og beregne full score</td>
            <td>Appen skal kunne hente spørsmål og beregne resultat når alle svar er riktige.</td>
            <td><code>examFlow.integration.test.js</code></td>
        </tr>
        <tr>
            <td>Rette faktiske spørsmål fra eksamensdata</td>
            <td>Retting skal fungere med ekte <code>single</code>, <code>multi</code>, <code>fill</code>, category sort, table match og matrix placement-spørsmål.</td>
            <td><code>examFlow.integration.test.js</code></td>
        </tr>
        <tr>
            <td>Finne oversatt eksamen basert på <code>baseId</code> og <code>lang</code></td>
            <td>Språkbytte skal finne riktig språkversjon av samme eksamen.</td>
            <td><code>examFlow.integration.test.js</code></td>
        </tr>
        <tr>
            <td>Finne fag med eksamensteller</td>
            <td>Appen skal hente valgt fag og beregne antall tilgjengelige eksamener.</td>
            <td><code>examFlow.integration.test.js</code></td>
        </tr>
    </tbody>
</table>

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
      source: "Forelesning / pensumhenvisning",
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

| Type | UI-navn | Beskrivelse |
|------|---------|-------------|
| `single` | `SingleRadioButtonChoice` | Multiple choice med ett riktig svar |
| `multi` | `MultiCheckboxSelect` | Multiple choice med flere riktige svar |
| `fill` | `FillBlankInputField` | Fyll inn riktig fagbegrep |
| `drag-categorize` | `CategorySort` | Dra kort inn i riktig kategori |
| `drag-drop` | `TableMatch` | Dra kort til riktig rad/beskrivelse i en tabell |
| `matrix-placement` | `MatrixPlacement` | Dra kort til riktig kvadrant i en generisk 2x2-matrise |

### Forklaringsfelter

| Felt | Bruk |
|------|------|
| `why` | Kort forklaring som vises direkte på svarkortet etter levering |
| `whyExtended` | Valgfri liste med utvidede forklaringspunkter som vises når svarkortet åpnes |
| `source` | Valgfri kildehenvisning mot forelesning, pensum eller fasitgrunnlag |

Hvis `whyExtended` mangler, vises ikke utvidet forklaring for det alternativet. For `matrix-placement` brukes `why` på hvert kort/item for å forklare hvorfor kortet hører hjemme i riktig kvadrant.

### Eksempel på matrix placement-spørsmål

`matrix-placement` er datadrevet og ikke hardkodet til én bestemt fagmodell. Samme komponent kan derfor brukes til for eksempel operating model matrix, risk awareness matrix eller andre 2x2-matriser.

```js
{
  id: 5,
  type: "matrix-placement",
  title: "Operating model matrix",
  points: 3,
  prompt: "Dra hver operating model til riktig kvadrant.",
  source: "Fasit: IN5431, CIO Toolbox, forelesning 3–6.",
  matrix: {
    xAxis: {
      label: "Forretningsprosessintegrasjon",
      lowLabel: "Lav",
      highLabel: "Høy"
    },
    yAxis: {
      label: "Prosessstandardisering",
      lowLabel: "Lav",
      highLabel: "Høy"
    },
    quadrants: [
      { id: "high-standardization-low-integration", title: "Høy standardisering / Lav integrasjon" },
      { id: "high-standardization-high-integration", title: "Høy standardisering / Høy integrasjon" },
      { id: "low-standardization-low-integration", title: "Lav standardisering / Lav integrasjon" },
      { id: "low-standardization-high-integration", title: "Lav standardisering / Høy integrasjon" }
    ]
  },
  items: [
    {
      id: "replication",
      label: "Replication",
      correctQuadrantId: "high-standardization-low-integration",
      why: "Replication betyr høy standardisering, men lav integrasjon."
    }
  ]
}
```

For matriser som ikke naturlig bruker lav/høy på aksene, kan aksene også beskrives med mer generiske retningslabels:

```js
xAxis: {
  label: "Measurement accuracy",
  leftLabel: "High",
  rightLabel: "Low"
},
yAxis: {
  label: "Risk awareness",
  topLabel: "High",
  bottomLabel: "Low"
}
```

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

subgraph SideInputs["0. Side Inputs / Configuration"]
direction LR
    DI["dependencies.js"]
    NavGraph["navGraph.js"]
end

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

subgraph PagesAndComponents["2. Pages & Page Components"]
direction TB

    subgraph ExamPageRow["ExamPage.jsx"]
    direction LR

        subgraph ExamPageComponents["ExamPage Components"]
        direction TB
            Header["Header"]
            ExamProgress["ExamProgress"]
            ExamPageContent["ExamPageContent"]
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

    subgraph SubjectSelectPageRow["SubjectSelectPage.jsx"]
    direction LR

        SubjectSelectPage["SubjectSelectPage.jsx"]

        subgraph SubjectSelectComponents["SubjectSelectPage Components"]
        direction TB
            SubjectSelectTopbar["SubjectSelectTopbar"]
            SubjectSelectControls["SubjectSelectControls"]
            SubjectSelectGrid["SubjectSelectGrid"]
            SubjectSelectCard["SubjectSelectCard"]
        end

    end

end

subgraph ViewModel["3. ViewModel"]
direction TB
    AppNavVM["AppNavigationViewModel"]
    ResolveTranslated["resolveTranslatedExamId"]
    ExamPageVM["ExamPageViewModel"]
    ExamSelectVM["ExamSelectPageViewModel"]
    SubjectSelectVM["SubjectSelectPageViewModel"]
end

subgraph Domain["4. Domain Layer / Use Cases"]
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

subgraph Model["5. Model"]
direction TB
    ExamRepo["ExamRepository"]
    SubjectRepo["SubjectRepository"]
    ExamDS["ExamQuestionDataSource"]
    ConceptImageDS["ConceptImageDataSource"]
    SubjectDS["SubjectDataSource"]
end

subgraph Data["6. Data"]
direction TB
    DataRegistry["data.js"]
    SubjectsData["subjects.js"]
    ConceptImageRegistry["conceptImageCatalogRegistry.js"]

    subgraph ConceptImageData["Concept Image Catalogs"]
    direction LR
        In5431ConceptImages["in5431/conceptImages.js"]
    end

    subgraph MockData["Mock Exam Data"]
    direction LR
        MockExam1No["mockExam1_no.js"]
        MockExam1En["mockExam1_en.js"]
        MockExam2No["mockExam2_no.js"]
        MockExam2En["mockExam2_en.js"]
        MockExam3No["mockExam3_no.js"]
        MockExam3En["mockExam3_en.js"]
        MockExam4No["mockExam4_no.js"]
        MockExam4En["mockExam4_en.js"]
        MockExam5En["mockExam5_en.js"]
        MockExamDragCategorizeNo["mockExamDragCategorize_no.js"]
    end
end

DI -.-> App
NavGraph -.-> App

App --> AppSidebar
App --> SettingsMenu

App --> SubjectSelectPage
App --> ExamSelectPage
App --> ExamPage

SubjectSelectPage --> SubjectSelectTopbar
SubjectSelectPage --> SubjectSelectControls
SubjectSelectPage --> SubjectSelectGrid
SubjectSelectGrid --> SubjectSelectCard

ExamSelectPage --> ExamSelectTopbar
ExamSelectPage --> ExamSelectIntro
ExamSelectPage --> ExamSelectGrid
ExamSelectGrid --> ExamSelectCard

ExamPage --> Header
ExamPage --> ExamProgress
ExamPage --> ExamPageContent
ExamPageContent --> QuestionCard
QuestionCard --> FeedbackPanel
ExamPage --> Footer

App --> AppNavVM
AppNavVM --> ResolveTranslated
SubjectSelectPage --> SubjectSelectVM
ExamSelectPage --> ExamSelectVM
ExamPage --> ExamPageVM

AppNavVM --> GetExamByIdUC
AppNavVM --> GetExamByBaseIdAndLangUC
SubjectSelectVM --> GetAvailableSubjectsUC
SubjectSelectVM --> GetSubjectByIdUC
ExamSelectVM --> GetAvailableExamsUC
ExamSelectVM --> GetSubjectByIdUC
ExamPageVM --> GetExamQuestionsUC
ExamPageVM --> GradeAnswerUC
ExamPageVM --> CalculateScoreUC

CalculateScoreUC --> GradeAnswerUC

GetAvailableSubjectsUC --> SubjectRepo
GetSubjectByIdUC --> SubjectRepo
GetAvailableExamsUC --> ExamRepo
GetExamByIdUC --> ExamRepo
GetExamByBaseIdAndLangUC --> ExamRepo
GetExamQuestionsUC --> ExamRepo

ExamRepo --> ExamDS
ExamRepo --> ConceptImageDS
SubjectRepo --> SubjectDS
ExamDS --> DataRegistry
SubjectDS --> SubjectsData
ConceptImageDS --> ConceptImageRegistry
ConceptImageRegistry --> In5431ConceptImages

DataRegistry --> MockExam1No
DataRegistry --> MockExam1En
DataRegistry --> MockExam2No
DataRegistry --> MockExam2En
DataRegistry --> MockExam3No
DataRegistry --> MockExam3En
DataRegistry --> MockExam4No
DataRegistry --> MockExam4En
DataRegistry --> MockExam5En
DataRegistry --> MockExamDragCategorizeNo

linkStyle default stroke:#111111,stroke-width:2.6px,color:#000000

classDef sideNode fill:#E0E0E0,stroke:#424242,stroke-width:2px,color:#000000
classDef appNode fill:#C5E1A5,stroke:#33691E,stroke-width:2.5px,color:#000000
classDef pageNode fill:#FFF9C4,stroke:#827717,stroke-width:2.5px,color:#000000
classDef componentNode fill:#DCE775,stroke:#827717,stroke-width:2px,color:#000000
classDef globalNode fill:#E1BEE7,stroke:#4A148C,stroke-width:2px,color:#000000
classDef viewModelNode fill:#FFCDD2,stroke:#B71C1C,stroke-width:2.5px,color:#000000
classDef helperNode fill:#FFEBEE,stroke:#C62828,stroke-width:1.5px,color:#000000
classDef domainNode fill:#C5CAE9,stroke:#1A237E,stroke-width:2px,color:#000000
classDef modelNode fill:#DCEDC8,stroke:#33691E,stroke-width:2px,color:#000000
classDef dataNode fill:#FFE082,stroke:#E65100,stroke-width:2px,color:#000000

class DI,NavGraph sideNode
class App appNode
class SubjectSelectPage,ExamSelectPage,ExamPage pageNode
class Header,ExamProgress,ExamPageContent,QuestionCard,FeedbackPanel,Footer,ExamSelectTopbar,ExamSelectIntro,ExamSelectGrid,ExamSelectCard,SubjectSelectTopbar,SubjectSelectControls,SubjectSelectGrid,SubjectSelectCard componentNode
class AppSidebar,SettingsMenu globalNode
class AppNavVM,ExamPageVM,ExamSelectVM,SubjectSelectVM viewModelNode
class ResolveTranslated helperNode
class GetAvailableSubjectsUC,GetSubjectByIdUC,GetAvailableExamsUC,GetExamByIdUC,GetExamByBaseIdAndLangUC,GetExamQuestionsUC,GradeAnswerUC,CalculateScoreUC domainNode
class ExamRepo,SubjectRepo,ExamDS,ConceptImageDS,SubjectDS modelNode
class DataRegistry,SubjectsData,ConceptImageRegistry,In5431ConceptImages,MockExam1No,MockExam1En,MockExam2No,MockExam2En,MockExam3No,MockExam3En,MockExam4No,MockExam4En,MockExam5En,MockExamDragCategorizeNo dataNode
```


### Arkitekturflyt

```text
mockExam-filer / subjects.js
  ↓
datasources
  ↓
repositories
  ↓
use cases
  ↓
viewmodels
  ↓
pages
  ↓
UI components
```

---

## Lagdeling

| Lag | Filer | Ansvar |
|-----|-------|--------|
| **Data** | `src/data/data.js`, `src/data/subjects.js`, `src/data/exams/*.js` | Inneholder fagregister, eksamensregister og alle øveeksamener |
| **DataSource** | `ExamQuestionDataSource.js`, `SubjectDataSource.js` | Henter fag, eksamensdata og spørsmål fra lokal datakilde |
| **Repository** | `ExamRepository.js`, `SubjectRepository.js` | Gir domenelaget tilgang til fag, eksamener og spørsmål uten at domenet kjenner datakilden |
| **Domain / UseCases** | `GetAvailableSubjectsUseCase`, `GetSubjectByIdUseCase`, `GetAvailableExamsUseCase`, `GetExamByBaseIdAndLangUseCase`, `GetExamQuestionsUseCase`, `GradeAnswerUseCase`, `CalculateExamScoreUseCase` | Inneholder appens sentrale regler |
| **ViewModel** | `AppNavigationViewModel.js`, `ExamPageViewModel.js`, `ExamSelectPageViewModel.js`, `SubjectSelectPageViewModel.js` | Holder React-state, brukerens svar, leveringstilstand, timer, navigasjon, valgt fag/eksamen og score |
| **View / Page** | `ExamPage.jsx`, `ExamSelectPage.jsx`, `SubjectSelectPage.jsx` | Setter sammen sidene og sender props videre til komponentene |
| **Components** | `Header`, `QuestionCard`, `FeedbackPanel`, `Footer`, `SettingsMenu`, `Sidebar`, `ResultBadge` | Rene UI-komponenter som viser data og sender brukerhandlinger oppover |
| **i18n** | `LanguageContext.jsx`, `translations.js` | Håndterer språkvalg og tekstnøkler |
| **Theme** | `ThemeContext.jsx` | Håndterer light mode og dark mode |
| **Utils** | Lokale `Utils/`-mapper under relevante features, samt `src/utils/answer` | Hjelpefunksjoner ligger nær komponenten eller feature-området de brukes av. Kun funksjoner som brukes på tvers av flere lag ligger globalt i `src/utils/`. |
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

Kjør tester:

```bash
npm test
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

**Fag og eksamener er adskilt.**  
Fag ligger i `subjects.js`, mens eksamener ligger i egne mock-exam-filer. Det gjør det mulig å vise fagoversikt først, og deretter filtrere eksamener basert på valgt fag.

**Rette-logikken ligger i domenelaget.**  
`GradeAnswerUseCase` avgjør om et svar er riktig. Dette gjør at komponentene ikke trenger å kjenne reglene for single choice, multiple choice, fill-in eller drag-and-drop.

**Score beregnes i en egen use case.**  
`CalculateExamScoreUseCase` gjør poengberegning separat fra både UI og datalagring.

**ViewModels samler React-state.**  
ViewModelene håndterer brukerens svar, submitted-status, åpne/lukkede svarkort, loading, timer, score og navigasjon mellom spørsmål. Dermed holdes side- og komponentlaget enklere.

**UI-komponentene er mest mulig dumme.**  
Komponentene får data og handlers via props. State og brukerflyt eies primært av viewModelene og `App.jsx`, slik at komponentene i hovedsak fokuserer på presentasjon.

**Sidebar er felles for hele appen.**  
Navigasjonen eies av `App.jsx`, mens `AppSidebar` kun presenterer navigasjonen. På smale skjermer vises sidebaren som en hamburgerstyrt drawer med backdrop og lukkeknapp.

**SubjectSelectPage er modularisert.**  
Fagvelgeren er delt opp i `SubjectSelectTopbar`, `SubjectSelectControls`, `SubjectSelectGrid` og `SubjectSelectCard`. Dette gjør siden lettere å vedlikeholde og gjør det enklere å endre layout uten at page-filen vokser.

**ExamSelectPage er modularisert.**  
Eksamensvelgeren er delt opp i `ExamSelectTopbar`, `ExamSelectIntro`, `ExamSelectGrid` og `ExamSelectCard`. Dette gjør siden lettere å vedlikeholde og gjør det enklere å endre layout uten at page-filen vokser.

**QuestionCard er delt etter oppgavetyper og fellesdeler.**  
`QuestionCard` har en egen entrypoint-komponent i `QuestionCard/QuestionCard.jsx`. Konkrete oppgavetyper ligger under `QuestionTypes/`, blant annet `FillBlankInputField`, `MultiCheckboxSelect`, `SingleRadioButtonChoice` og `DragDrop`. Drag-and-drop-oppgaver er videre delt i `CategorySort`, `TableMatch` og `MatrixPlacement`. `MatrixPlacement` er laget som en generisk 2x2-matriseoppgave, slik at samme komponent kan brukes til flere faglige matriser, for eksempel operating model matrix og risk awareness matrix. Felles deler som prompt, feedback, header, styling og view-state ligger i `Shared/`.

**AnswerCard er modularisert.**  
Svarkortene i feedback-mode er delt i `AnswerOptionCard`, `AnswerOptionActions`, `AnswerOptionMarker` og `AnswerOptionExtendedPanel`. Hjelpefunksjoner for AnswerCard ligger lokalt i `QuestionCard/AnswerCard/Utils/`.

**FeedbackPanel er tydeligere strukturert.**  
Fill-in feedback viser brukerens svar og riktig svar side om side. Forklaringer og pensumhenvisninger vises som tydelige kort, slik at feedback-mode blir lettere å lese.

**Feature-nære Utils-mapper brukes for lokal logikk.**  
Hjelpefunksjoner som bare brukes av ett komponentområde ligger i lokale `Utils/`-mapper, for eksempel under `QuestionCard`, `FeedbackPanel`, `ExamProgress` og `Footer`. Globale utils beholdes kun når funksjonen brukes på tvers av flere lag eller features.

**Footer er modularisert i funksjonelle enheter.**  
Footer-komponenten er delt i `Footer`, `FooterActionButton`, `FooterNavigationButton`, `QuestionDots`, `QuestionDot` og `footerClassNames`. Handlingsknappen bytter mellom «Neste» og «Lever nå» avhengig av om brukeren er på siste spørsmål. Etter levering viser footer-dots riktig/feil-status med fargekoding.

**UI-et er delt inn i tydelige visuelle soner.**  
Eksamenssiden består av sidebar, header/statistikk, progressbar, question card og footer-navigasjon. Dette gjør at brukeren hele tiden ser hvor langt de har kommet, hvilken oppgave de jobber med, og hvilke handlinger som er tilgjengelige.

**Responsivitet håndteres lokalt per UI-område.**  
Responsiv styling ligger som hovedregel i `responsive.css` i den relevante side- eller komponentmappen. Det gjør at for eksempel `ExamPage`, `ExamSelectPage`, `SubjectSelectPage`, `QuestionCard`, `Footer`, `Header` og `FeedbackPanel` kan justeres hver for seg uten én stor global responsive-fil.

**QuestionCard-CSS speiler oppgavetype-strukturen.**  
CSS for `QuestionCard` ligger fortsatt samlet under `src/ui/style/QuestionCard`, men er delt etter samme feature-logikk som komponentene. Delte spørsmålsstiler ligger i `Base/`, svarkortstiler i `AnswerCard/`, og spørsmålstype-spesifikke regler under `QuestionTypes/`. Drag-and-drop-stiler er videre delt i `Shared/`, `CategorySort/`, `TableMatch/` og `MatrixPlacement/`. `MatrixPlacement` har egne filer for `question`, `item-bank`, `matrix`, `feedback` og `responsive`, slik at layout, kortbank, matrisevisning, feedback og responsive regler kan vedlikeholdes separat.

**Laptop- og edge-case-layout er håndtert eksplisitt.**  
Layouten er optimalisert for typiske laptop-skjermer, inkludert 14–17 tommers skjermer og svært lave viewport-høyder. På veldig lave høyder kan store kort falle tilbake til mer kompakte listevisninger, og sticky footer kan gå tilbake i vanlig scroll-flow for å unngå overlay.

**Språk og tema håndteres globalt.**  
Språkvalg håndteres gjennom `LanguageContext`, mens light/dark mode håndteres gjennom `ThemeContext`. Dette gjør at komponentene kan bruke felles tilstand uten å duplisere logikk.

**Styling er modulært organisert per UI-område.**  
`src/ui/style/App.css` fungerer som samlet CSS-entrypoint. Globale designverdier ligger i `Tokens.css`, mens global reset og basisregler ligger i `Global.css`. Større UI-områder som `ExamPage`, `ExamSelectPage`, `SubjectSelectPage`, `Header`, `Footer`, `QuestionCard`, `FeedbackPanel`, `SettingsMenu`, `Sidebar` og `ResultBadge` har egne mapper med `index.css` og mindre CSS-moduler.

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

1. Opprett nye filer i `src/data/exams/`, for eksempel `mockExam6_no.js` og `mockExam6_en.js`.
2. Eksporter eksamensobjekter med unik `id`.
3. Bruk samme `baseId` for språkversjonene.
4. Sett riktig språkfelt, for eksempel `lang: "no"` og `lang: "en"`.
5. Importer eksamenene i `src/data/data.js`.
6. Legg eksamenene inn i `EXAMS`-listen.

Eksempel:

```js
//src/data/exams/mockExam6_no.js
export const mockExam6No = {
  id: "mock-exam-6-no",
  baseId: "mock-exam-6",
  lang: "no",
  title: "Øveeksamen 4: Strategi og IT governance",
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
import { mockExam6No } from "./exams/mockExam6_no.js";
import { mockExam6En } from "./exams/mockExam6_en.js";

export const EXAMS = [
  mockExam1No,
  mockExam1En,
  mockExam2No,
  mockExam2En,
  mockExam3No,
  mockExam3En,
  mockExam6No,
  mockExam6En
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

@import "./SubjectSelectPage/index.css";
@import "./ExamSelectPage/index.css";
@import "./ExamPage/index.css";

@import "./Header/index.css";
@import "./Footer/index.css";
@import "./QuestionCard/index.css";
@import "./FeedbackPanel/index.css";
@import "./SettingsMenu/index.css";
@import "./ResultBadge/index.css";
@import "./Sidebar/index.css";
```

### CSS-struktur for QuestionCard

`QuestionCard`-styling er organisert etter samme feature-inndeling som komponentene, men ligger fortsatt samlet under `src/ui/style/QuestionCard`. Delte stiler for hele spørsmålsvisningen ligger i `QuestionCard/Base`, mens stiler for bestemte deler eller oppgavetyper ligger i egne undermapper, for eksempel `AnswerCard`, `QuestionTypes/ChoiceShared`, `QuestionTypes/FillBlankInputField` og `QuestionTypes/DragDrop`.

```bash
src/ui/style/QuestionCard/
├── AnswerCard/
├── Base/
└── QuestionTypes/
    ├── ChoiceShared/
    ├── FillBlankInputField/
    └── DragDrop/
        ├── Shared/
        ├── CategorySort/
        ├── TableMatch/
        └── MatrixPlacement/
```

Hver mappe skal ha en `index.css` som importerer lokale CSS-filer i riktig rekkefølge. Nye spørsmålstype-spesifikke regler skal ikke legges flatt direkte under `QuestionCard`; de skal legges i riktig feature-mappe. Delte regler skal ligge i `Base` eller `Shared`, ikke inne i én spesifikk spørsmålstype.

Retningslinjer:

- Globale designverdier legges i `Tokens.css`.
- Global reset og basisregler legges i `Global.css`.
- Responsiv styling legges som hovedregel i `responsive.css` i den relevante side- eller komponentmappen.
- Globale responsive regler bør unngås med mindre de faktisk gjelder hele appen.
- Side-spesifikk styling legges i mappen for siden, for eksempel `SubjectSelectPage/`, `ExamSelectPage/` eller `ExamPage/`.
- Komponentområde-spesifikk styling legges i mappen for komponentområdet, for eksempel `Header/`, `Sidebar/`, `QuestionCard/` eller `FeedbackPanel/`.
- Hver mappe bør ha en `index.css` som importerer del-filene i riktig rekkefølge.
- `responsive.css` bør importeres sist i mappen sin `index.css`, slik at responsive regler kan overstyre base-styling.
- `QuestionCard`-spesifikke base-regler legges i `QuestionCard/Base/`.
- Spørsmålstype-spesifikk CSS legges under `QuestionCard/QuestionTypes/` og skal speile oppgavetypens feature-mappe.
- Felles drag-and-drop-regler legges i `QuestionCard/QuestionTypes/DragDrop/Shared/`.
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
- Legge til komponenttester for `QuestionCard`, `AnswerOptionCard`, `FeedbackPanel`, `ExamProgress` og `ResultBadge`
- Legge til komponenttester for oppgavetypene under `QuestionCard/QuestionTypes`
- Legge til tester for drag-and-drop-interaksjoner med React Testing Library
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

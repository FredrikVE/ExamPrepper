# Header/Footer scaffold inventory

Oppdatert: 2026-07-01
Patch: `inventory-header-footer-scaffold`
Type: dokumentasjon / analyse
Runtime-endringer: ingen

## Formål

Dette dokumentet låser Patch 1-funnene før `Header/`-navnet frigjøres og før ny `Header.jsx` / `Footer.jsx` bygges.

Målet er å bekrefte faktisk kode, imports, mobil-back-risiko og hvilken mobilmodell neste patcher skal følge.

## Base og verifiseringstype

Base:

```txt
Opplastet zip: examprepper-frontend-safe-20260701-174448.zip
Git metadata: .git er ikke med i zipen, branch/commit er derfor ikke verifisert her
```

Verifisering:

```txt
Statisk kode- og CSS-inventory i opplastet zip.
Ingen runtime-kode er endret.
Ingen emulator/device-QA er kjørt i denne patchen.
```

Viktig begrensning:

```txt
A11y/tab-konklusjonen under er statisk verifisert fra JSX/CSS:
- knappene rendres i DOM når props tilsier det
- de er ikke aria-hidden
- de er ikke disabled
- de har ikke tabIndex={-1}
- aktuell scaffold-header er ikke display:none for ExamSelect på mobil

Endelig visuell QA på ekte device/emulator bør fortsatt gjøres når Header.jsx faktisk migreres.
```

## Kommandoer brukt i inventory

```bash
grep -R "WorkspaceScaffoldHeader" -n src test
grep -R "WorkspaceScaffoldSearchFooter" -n src test
grep -R "components/Header\|\.\./components/Header\|Header/Header\|from ['\"].*Header" -n src test
grep -R "style/Header\|Header/index\|Header/" -n src test
grep -R "workspace-scaffold-header" -n src test
grep -R "MobileDropDownTopBar" -n src test
grep -R "showBackButton" -n src test
grep -R "<Header" -n src test
grep -R "viewModel={viewModel}" -n src test
grep -R "z-index" -n src/ui/style
```

## Bekreftet nåtilstand

### `src/ui/view/components/Header/`

`Header/` er i dag ExamPage-toolbar, ikke felles scaffold-header.

```txt
src/ui/view/components/Header/
├── Header.jsx
├── HeaderActions.jsx
├── HeaderButtons.jsx
├── SubmittedActions.jsx
└── StatCard.jsx
```

Funn:

```txt
src/ui/view/pages/ExamPage.jsx
└── importerer Header fra ../components/Header/Header.jsx

src/ui/view/components/Header/Header.jsx
└── rendrer <header className="exam-header">

src/ui/view/components/Header/HeaderActions.jsx
└── rendrer exam stats: answeredPercentLabel, scoreLabel, elapsedTimeLabel

src/ui/view/components/Header/HeaderButtons.jsx
└── bruker viewModel.submitted, viewModel.resetExam, viewModel.openSubmitConfirmation
```

Arkitekturbrudd som må fikses i Patch 2B:

```txt
<Header viewModel={viewModel} />
<HeaderActions viewModel={viewModel} />
<HeaderButtons viewModel={viewModel} />
```

Beslutning:

```txt
Patch 2A skal flytte denne familien mekanisk til ExamPage/ExamToolbar*.
Patch 2B skal fjerne viewModel-drilling fra ExamToolbar-familien.
Ny scaffold Header.jsx skal ikke bygges før dette navnet er frigjort.
```

### `src/ui/style/Header/`

`style/Header/` er også ExamPage-toolbar-CSS i dag.

```txt
src/ui/style/Header/
├── actions.css
├── buttons.css
├── header-tokens.css
├── index.css
├── layout.css
├── responsive.css
└── stat-card.css
```

Funn:

```txt
src/ui/style/App.css
└── @import "./Header/index.css";
```

Beslutning:

```txt
Patch 2A skal flytte denne CSS-familien til ExamPage/exam-toolbar* sammen med komponentene.
```

### `WorkspaceScaffoldHeader`

Importbruk:

```txt
src/ui/view/pages/SubjectSelectPage.jsx
src/ui/view/pages/ExamSelectPage.jsx
src/ui/view/pages/FlipcardsPage.jsx
```

Komponentkontrakt i dag:

```jsx
<WorkspaceScaffoldHeader
    showBackButton={...}
    backLabel={...}
    navigationLabel={...}
    onBack={...}
    tools={...}
/>
```

Faktisk ansvar:

```txt
- rendrer <header className="workspace-scaffold-header">
- rendrer back-knapp når showBackButton er true
- rendrer PageToolsDesktopPanel med props.tools
```

CSS-funn:

```txt
.workspace-scaffold-header
├── position: absolute
├── top/right/left: 0
├── z-index: 30
├── pointer-events: none på container
└── pointer-events: auto på back-knapp og desktop tools-trigger
```

Mobil-CSS:

```txt
@media (max-width: 932px) {
    .workspace-scaffold-header {
        position: absolute;
        min-height: var(--mobile-topbar-height);
        padding: 18px 24px;
    }
}
```

Viktig:

```txt
WorkspaceScaffoldHeader skjules ikke globalt på mobil.
```

### `WorkspaceScaffoldSearchFooter`

Importbruk:

```txt
src/ui/view/pages/SubjectSelectPage.jsx
src/ui/view/pages/ExamSelectPage.jsx
```

Komponentkontrakt i dag:

```jsx
<WorkspaceScaffoldSearchFooter
    isOpen={...}
    className="..."
    openClassName="..."
    onBlur={...}
>
    ...
</WorkspaceScaffoldSearchFooter>
```

Faktisk ansvar:

```txt
- wrapper med className workspace-scaffold-search-footer
- legger til workspace-scaffold-search-footer-open ved isOpen
- legger til openClassName ved isOpen
- sender onBlur til wrapper
- rendrer children
```

Beslutning:

```txt
Første Footer.jsx-patch skal følge denne kontrakten tett.
Footer.jsx skal ikke overta MobileBottomSheet- eller ProgressPager-mekanikk.
```

### `MobileDropDownTopBar`

Render-sted:

```txt
src/ui/view/components/Sidebar/AppNavigation.jsx
└── rendrer MobileDropDownTopBar alltid
```

Desktop/mobil CSS:

```txt
.mobile-topbar { display: none; }

@media (max-width: 932px) {
    .mobile-topbar {
        position: fixed;
        z-index: 100;
        top/right/left: 0;
        display: grid;
        height: var(--mobile-topbar-height);
    }
}
```

Back-regel i MobileDropDownTopBar:

```txt
showTopbarBackButton = props.showBackButton || shouldShowSettingsTopbar
```

Funn:

```txt
MobileDropDownTopBar vises samtidig med WorkspaceScaffoldHeader på mobil for SubjectSelect og ExamSelect.
Flipcards rendrer også WorkspaceScaffoldHeader i JSX, men skjuler den med side-spesifikk CSS på mobil.
```

### Global back-regel

`AppNavigationViewModel` har allerede flat back-regel:

```txt
showBackButton = activeScreen !== NAV_SCREENS.SUBJECTS
```

Side-VM-funn:

```txt
SubjectSelectPageViewModel
└── showBackButton: false

ExamSelectPageViewModel
└── showBackButton kommer fra AppNavigationViewModel

FlipcardsPageViewModel
└── showBackButton kommer fra AppNavigationViewModel
```

Beslutning:

```txt
Back-kontrakten er flat nok til å videreføre:
showBackButton, backLabel, onBack, navigationLabel.
Ikke innfør nested viewModel.header.back.* i dette sporet.
```

## Mobil-back per side

| Side | Scaffold-header rendres i JSX | Scaffold-header skjules på mobil | MobileDropDownTopBar vises på mobil | Back-duplikat | Konklusjon |
|---|---:|---:|---:|---:|---|
| SubjectSelect | Ja | Nei | Ja | Nei, showBackButton=false | Ingen back-duplikat, men to header-flater finnes samtidig på mobil. |
| ExamSelect | Ja | Nei | Ja | Ja | Statisk bekreftet risiko for én synlig back + én tildekket tabbable/a11y-back. |
| Flipcards | Ja | Ja, per-side `display:none` | Ja | Nei på mobil på grunn av display:none | Fungerer nå via side-spesifikk hack som skal fjernes ved Header.jsx-migrering. |
| Statistics | Nei | Ikke relevant | Ja | Nei | Har inline `statistics-page-header`, ikke scaffold-header. |
| ExamPage | Nei, bruker ExamPage-toolbar | Ikke relevant | Ja | Nei | Dagens Header/ er ExamToolbar, ikke scaffold-header. |

### ExamSelect: statisk a11y/tab-funn

På mobil med aktiv ExamSelect:

```txt
MobileDropDownTopBar
└── showTopbarBackButton = true
└── rendrer <button className="mobile-topbar-back-button">

WorkspaceScaffoldHeader
└── showBackButton = true
└── rendrer <button className="workspace-scaffold-header-button workspace-scaffold-back-button">
```

CSS-forhold:

```txt
.mobile-topbar
└── position: fixed
└── z-index: 100

.workspace-scaffold-header
└── position: absolute
└── z-index: 30
└── ikke display:none på ExamSelect mobil
```

Konklusjon:

```txt
Statisk kode/CSS bekrefter at ExamSelect kan få to back-knapper i DOM på mobil.
Den øverste mobile topbaren ligger visuelt over scaffold-headeren.
Scaffold-back er likevel ikke fjernet fra DOM, tab-rekkefølge eller a11y-tre.
Dette skal ikke løses med z-index.
```

## Beslutninger for neste patcher

### Mobilmodell for ny Header.jsx

Valg: Modell A.

```txt
Header.jsx rendres ikke på mobil der MobileDropDownTopBar eier mobil-headeren.
```

Hvorfor:

```txt
- DOM/a11y matcher det brukeren faktisk ser.
- Ingen dobbel synlig back.
- Ingen tildekket tabbable/a11y-back.
- Ingen z-index-avhengig skjuling.
- Ingen per-side display:none-hack for Header.jsx.
```

Implementeringsretning:

```txt
Page wrappers eller en felles scaffold-beslutning må hindre at Header.jsx rendres på mobile breakpoint der MobileDropDownTopBar er aktiv.
Hvis dette gjøres med CSS alene, må CSS bruke display:none på selve Header.jsx-flaten og ikke z-index-overlapp.
Foretrukket retning er render-gating, ikke overlapp.
```

### SubjectSelect

Beslutning:

```txt
SubjectSelect skal migreres til Header.jsx etter at Header.jsx er etablert.
Header.jsx skal ikke rendres på mobil i Modell A.
SubjectSelectTopbar skal fortsatt være sideinnhold som scroller.
```

### ExamSelect

Beslutning:

```txt
ExamSelect skal migreres til Header.jsx etter at Header.jsx er etablert.
Header.jsx skal ikke rendres på mobil i Modell A.
Dette er nødvendig for å fjerne dagens tildekkede tabbable/a11y-back.
ExamSelectTopbar/Intro skal fortsatt være sideinnhold som scroller.
```

### Flipcards

Beslutning:

```txt
Flipcards skal migreres til Header.jsx etter SubjectSelect/ExamSelect.
Den eksisterende mobile display:none-hacken skal fjernes når Header.jsx ikke rendres på mobil via felles modell.
Ikke bland dette med FlipcardToolMenu, ProgressPager, MobileBottomSheet eller light/dark-polish.
```

### Statistics

Beslutning:

```txt
Statistics beholder lokal statistics-page-header i denne Header/Footer-SSOT-runden.
Den har ikke scaffold-header eller back-duplikat i dag.
En eventuell senere migrering må være en egen patch og bruke Header.jsx heading/trailing slots uten å flytte dashboard/hero-logikk inn i Header.jsx.
```

### ExamPage

Beslutning:

```txt
ExamPage skal ikke migreres til scaffold Header.jsx i første Header-SSOT-runde.
Dagens Header/ er en ExamToolbar og skal først flyttes til ExamPage/ExamToolbar*.
ExamToolbar skal være side-spesifikk og få konkrete props.
Ingen exam-logikk skal flyttes inn i scaffold Header.jsx.
```

### WorkspaceScaffold-mappen

Beslutning:

```txt
WorkspaceScaffold/ skal ikke slettes nå.
Den oppløses først når Header.jsx og Footer.jsx har overtatt imports og build/test er grønt.
```

## Backlog logget fra inventory

```txt
P0: move-exam-toolbar-out-of-header
P0: exam-toolbar-concrete-props
P0: document-header-footer-contract
P0: add-header-ssot
P0: formalize-flat-back-contract
P1: subject-select-use-header
P1: exam-select-use-header
P1: flipcards-use-header
P1: introduce-footer-ssot
P2: cleanup-workspace-scaffold
P2: cleanup-old-header-footer-surfaces
```

Ekstra gjeld som ikke skal fikses i denne patchen:

```txt
- FlipcardsShell viewModel-drilling
- StatisticsShell viewModel-drilling
- ExamPageContent viewModel-drilling
- mange rå z-index-verdier uten samlet layering-tokenmodell
- SubjectSelect touch-scroll på ekte mobil
```

## Acceptance status

| Acceptance | Status |
|---|---|
| Bekreftet at `components/Header/` er ExamPage-toolbar | Ja |
| Bekreftet at `style/Header/` er ExamPage-toolbar CSS | Ja |
| Bekreftet alle imports av `components/Header/` | Ja |
| Bekreftet alle imports av `style/Header/` | Ja |
| Bekreftet alle imports av `WorkspaceScaffoldHeader` | Ja |
| Bekreftet alle imports av `WorkspaceScaffoldSearchFooter` | Ja |
| Bekreftet mobiloppførsel for SubjectSelect scaffold-header | Ja, statisk |
| Bekreftet mobiloppførsel for ExamSelect scaffold-header | Ja, statisk |
| Bekreftet mobiloppførsel for Flipcards scaffold-header | Ja, statisk |
| Bekreftet at MobileDropDownTopBar vises samtidig med scaffold-header på mobil | Ja, statisk |
| Bekreftet ExamSelect dobbel back-risiko | Ja, statisk |
| Bekreftet tildekket tabbable/a11y-back-risiko | Ja, statisk |
| Beslutning: Header.jsx rendres/rendres ikke på mobil | Ja, Modell A |
| Beslutning: global mekanisme for å unngå dobbel back | Ja, render-gating / ikke z-index-overlapp |
| Beslutning: Statistics | Ja, behold lokal header i denne runden |
| Beslutning: ExamPage | Ja, behold som ExamToolbar-spor i denne runden |
| Beslutning: WorkspaceScaffold/ | Ja, oppløses når tom |

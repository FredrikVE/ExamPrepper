# Header/Footer scaffold QA handover

> **Historisk QA-handover.** Sluttstatusen her er erstattet av [`docs/architecture/REFACTOR_DELIVERY_REPORT.md`](../architecture/REFACTOR_DELIVERY_REPORT.md). Statistics bruker nå canonical Header; dagens kontrakt er slot-basert og feature-fri.


Oppdatert: 2026-07-02
Patch: `final-header-footer-qa-doc`
Type: dokumentasjon / QA-handover
Runtime-endringer: ingen

## Formål

Dette dokumentet oppsummerer sluttstatus etter Header/Footer scaffold-sporet.
Det skal gjøre det tydelig hva som faktisk ble flyttet, hvilke SSOT-flater som gjelder nå,
hva som er verifisert lokalt, og hva som fortsatt ligger i backloggen.

## Ferdigstilt i dette sporet

```txt
Header inventory
ExamToolbar flyttet ut av Header/
ExamToolbar konkret prop-kontrakt
Header/Footer scaffold-kontrakt dokumentert
Header.jsx SSOT lagt til
Flat back-kontrakt formalisert
SubjectSelect migrert til Header.jsx
ExamSelect migrert til Header.jsx
Flipcards migrert til Header.jsx
Statistics header-beslutning dokumentert
ExamPage header-beslutning dokumentert
Footer.jsx SSOT introdusert
Footer-kontrakt dokumentert
WorkspaceScaffold/ fjernet
Gamle workspace-scaffold CSS-tokenreferanser fjernet fra src
```

## Nåværende eierskap

### Header

```txt
src/ui/view/components/Header/
├── Header.jsx
├── HeaderButton.jsx
└── HeaderTitle.jsx

src/ui/style/Header/
├── header.css
├── header-button.css
├── header-title.css
├── responsive.css
└── index.css
```

`Header.jsx` er scaffold-headerens SSOT.
Den får konkrete props og skal ikke lese route, `window`, `pageName` eller ViewModel direkte.

Flat back-kontrakt:

```txt
showBackButton
backLabel
onBack
navigationLabel
```

Mobilregel:

```txt
Modell A gjelder.
Header.jsx rendres ikke visuelt på mobil der MobileDropDownTopBar eier mobil-headeren.
Header skal ikke skjules ved z-index-overlapp.
```

### Footer

```txt
src/ui/view/components/Footer/
└── Footer.jsx

src/ui/style/Footer/
├── footer.css
└── index.css
```

`Footer.jsx` er scaffold-footerens SSOT for select-side footeren.
Første implementerte kontrakt følger den tidligere `WorkspaceScaffoldSearchFooter` tett.

Faktiske props etter introduksjonen:

```txt
isOpen
className
openClassName
onBlur
children
```

`Footer.jsx` eier wrapper, plassering, safe-area, spacing og layering for scaffold-footeren.
Den eier ikke `MobileBottomSheet`, `ProgressPager`, search/filter-state eller ViewModel.

### MobileTopBar

```txt
src/ui/view/components/Sidebar/MobileDropDownTopBar.jsx
```

`MobileDropDownTopBar` beholdes som mobil scaffold-header inntil videre.
Den bruker den flate back-kontrakten fra navigation-laget.

### ExamToolbar

```txt
src/ui/view/components/ExamPage/
├── ExamToolbar.jsx
├── ExamToolbarActions.jsx
├── ExamToolbarButtons.jsx
├── ExamToolbarSubmittedActions.jsx
└── ExamToolbarStatCard.jsx
```

`ExamToolbar` er side-spesifikk ExamPage-toolbar, ikke generell scaffold-header.
Den skal ikke flyttes inn i `Header.jsx` uten en egen senere designbeslutning.

Submit skal fortsatt gå via confirmation-flow:

```txt
openSubmitConfirmation
ExamSubmitConfirmation
confirmSubmitExam
```

### Statistics

Statistics beholder lokal `statistics-page-header` i denne runden.
Den regnes som sideinnhold, ikke scaffold-header.

## Bekreftet cleanup

Etter cleanup skal disse grepene være tomme i `src`:

```bash
git grep -n "WorkspaceScaffold\|workspace-scaffold" -- src
```

Det betyr:

```txt
Ingen runtime-imports av WorkspaceScaffold
Ingen .workspace-scaffold-header selectors i src
Ingen workspace-scaffold CSS-tokenreferanser i src
```

## Lokal QA-status

Siste rapporterte lokale kjøring etter `cleanup-old-header-footer-surfaces`:

```txt
git diff --check
git grep -n "WorkspaceScaffold\|workspace-scaffold" -- src
npm test && npm run build
```

Resultat:

```txt
git diff --check: grønn
git grep WorkspaceScaffold/workspace-scaffold: ingen treff i src
Jest: 62 passed, 1 skipped, 63 total suites
Tests: 364 passed, 9 skipped, 373 total
Vite build: grønn
Vite chunk warning: ikke-blokkerende, kjent warning
```

## Ikke ferdigstilt / fortsatt backlog

Dette er bevisst ikke løst i Header/Footer scaffold-sporet:

```txt
SubjectSelect touch-scroll audit
SubjectSelect touch-scroll fix
Flipcards theme audit
Flipcards theme token-normalisering
Z-index/layering inventory
Layering tokens
ProgressPager-refaktor
MobileBottomSheet-refaktor
Footer for Flipcards/ExamPage flows
StatisticsShell viewModel-drilling cleanup
ExamPageContent viewModel-drilling cleanup
```

## Regler videre

Ikke reintroduser:

```txt
WorkspaceScaffoldHeader
WorkspaceScaffoldSearchFooter
WorkspaceScaffold/ som runtime-mappe
workspace-scaffold-* CSS-tokens
PageHeader som ny scaffold-header
DockedFooter som ny scaffold-footer
```

Ikke send hele ViewModel til disse komponentene:

```txt
Header
Footer
ExamToolbar
HeaderButton
HeaderTitle
```

Riktig retning:

```txt
Page mottar viewModel som eneste prop.
Page fordeler konkrete props ned til scaffold-komponenter og underkomponenter.
Header/Footer/ExamToolbar rendrer props og eier ikke side-state.
```

## Anbefalt final check før merge

```bash
git diff --check
git grep -n "WorkspaceScaffold\|workspace-scaffold" -- src
npm test && npm run build
```

Hvis dette er grønt, er Header/Footer scaffold-sporet klart for merge ut fra det avtalte scope.

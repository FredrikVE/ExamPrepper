# Header/Footer scaffold contract

Oppdatert: 2026-07-01
Patch: `document-header-footer-contract`
Type: dokumentasjon / arkitekturkontrakt
Runtime-endringer: ingen

## Formål

Dette dokumentet låser kontrakten som skal brukes før `Header.jsx` og `Footer.jsx` bygges og før sider migreres bort fra `WorkspaceScaffoldHeader` og `WorkspaceScaffoldSearchFooter`.

Målet er å hindre nye parallelle header-/footer-flater og sikre at scaffoldet har én tydelig struktur.

## Bindende navn

Bruk disse navnene i kode, docs og patchrapporter:

```txt
Scaffold   = den felles rammen rundt sideinnholdet
Header.jsx = SSOT for scaffold-headeren
Footer.jsx = SSOT for scaffold-footeren
Content    = sideinnholdet mellom Header og Footer
MobileTopBar = mobil scaffold-header, dagens MobileDropDownTopBar
ExamToolbar = ExamPage-spesifikk toolbar, ikke generell Header
Topbar     = side-spesifikk tittelblokk som scroller med innhold
```

Ikke innfør disse navnene i dette sporet:

```txt
PageHeader
DockedFooter
WorkspaceScaffoldHeader som ny SSOT
WorkspaceScaffoldFooter som ny SSOT
```

## Målstruktur

```txt
Scaffold
├── Header/
│   ├── Header.jsx
│   ├── HeaderButton.jsx
│   └── HeaderTitle.jsx
├── Sidebar/
│   └── MobileDropDownTopBar.jsx
│       └── mobil scaffold-header inntil videre
├── Content
│   └── sideinnhold
└── Footer/
    └── Footer.jsx
```

Komponentmål:

```txt
src/ui/view/components/
├── Header/
│   ├── Header.jsx
│   ├── HeaderButton.jsx
│   └── HeaderTitle.jsx
├── Footer/
│   └── Footer.jsx
├── ExamPage/
│   ├── ExamToolbar.jsx
│   ├── ExamToolbarActions.jsx
│   ├── ExamToolbarButtons.jsx
│   ├── ExamToolbarSubmittedActions.jsx
│   └── ExamToolbarStatCard.jsx
└── Sidebar/
    └── MobileDropDownTopBar.jsx
```

CSS-mål:

```txt
src/ui/style/
├── Header/
│   ├── header.css
│   ├── header-button.css
│   ├── header-title.css
│   ├── responsive.css
│   └── index.css
├── Footer/
│   ├── footer.css
│   ├── responsive.css
│   └── index.css
└── ExamPage/
    ├── exam-toolbar-actions.css
    ├── exam-toolbar-buttons.css
    ├── exam-toolbar-layout.css
    ├── exam-toolbar-responsive.css
    ├── exam-toolbar-stat-card.css
    └── exam-toolbar-tokens.css
```

`WorkspaceScaffold/`-mappen beholdes til imports er migrert. Den skal oppløses når `Header.jsx` og `Footer.jsx` har overtatt ansvaret.

## MVVM-regler

Header/Footer følger samme View-regler som resten av prosjektet:

```txt
Page
└── mottar viewModel som eneste prop

Underkomponenter
├── får konkrete navngitte props
├── får ikke hele viewModel
├── importerer ikke use cases
├── importerer ikke repositories
├── importerer ikke datasources
└── importerer ikke dependencies.js
```

Forbudt:

```jsx
<Header viewModel={viewModel} />
<Footer viewModel={viewModel} />
<ExamToolbar viewModel={viewModel} />
```

Riktig retning:

```jsx
<Header
	showBackButton={viewModel.showBackButton}
	backLabel={viewModel.backLabel}
	onBack={viewModel.onBack}
	navigationLabel={viewModel.navigationLabel}
	tools={viewModel.pageTools}
	trailing={pageActions}
/>
```

## Header.jsx-kontrakt

Back-kontrakten er flat. Ikke innfør `viewModel.header.back.show`, `viewModel.scaffold.header.back` eller lignende nesting i dette sporet.

```jsx
<Header
	showBackButton={showBackButton}
	backLabel={backLabel}
	onBack={onBack}
	navigationLabel={navigationLabel}
	tools={pageTools}
	trailing={pageActions}
	heading={headingContent}
/>
```

Props:

```txt
showBackButton  boolean      ferdig avklart i navigation/ViewModel-laget
backLabel       string       ferdig label fra navigation/ViewModel-laget
onBack          function     callback fra navigation/ViewModel-laget
navigationLabel string       aria/nav-label der relevant
tools           array/object eksisterende pageTools-modell dersom Header rendrer PageToolsDesktopPanel
trailing        React node   side-spesifikke actions
heading         React node   opt-in pinned heading
```

Regler:

```txt
- Header.jsx leser aldri route.
- Header.jsx leser aldri window.location.
- Header.jsx leser aldri pageName.
- Header.jsx importerer aldri AppNavigationViewModel.
- Header.jsx importerer aldri dependencies.js.
- Header.jsx får konkrete props.
- Header.jsx får aldri hele viewModel.
- Slots skal ikke inneholde egen back-knapp.
- Slots skal ikke bygge en ny header inne i Header.jsx.
```

## Mobilmodell

Valgt modell: Modell A.

```txt
Header.jsx rendres ikke på mobil der MobileDropDownTopBar eier mobil-headeren.
```

Begrunnelse:

```txt
- DOM/a11y matcher det brukeren faktisk ser.
- Ingen dobbel synlig back.
- Ingen tildekket tabbable/a11y-back.
- Ingen z-index-avhengig skjuling.
- Ingen per-side display:none-hack for Header.jsx.
```

Implementeringsregel:

```txt
Header.jsx skal ikke skjules ved at MobileDropDownTopBar ligger over den.
Hvis Header.jsx ikke skal være aktiv på mobil, skal den enten ikke rendres eller fjernes med en felles display:none-regel for selve Header-flaten.
Foretrukket løsning er render-gating.
```

Back-regel:

```txt
Aldri to synlige tilbakeknapper i samme breakpoint.
Aldri to tabbable/a11y-eksponerte tilbakeknapper i samme breakpoint.
```

## Footer.jsx-kontrakt

Første Footer-patch skal følge dagens `WorkspaceScaffoldSearchFooter` tett. Den konseptuelle sluttkontrakten er:

```jsx
<Footer
	isOpen={isFooterOpen}
	onOpen={openFooter}
	onClose={closeFooter}
	peek={peekContent}
	content={footerContent}
/>
```

Praktisk første kontrakt kan være nærmere dagens bruk:

```jsx
<Footer
	isOpen={isOpen}
	className={className}
	openClassName={openClassName}
	onBlur={onBlur}
>
	{children}
</Footer>
```

Regler:

```txt
- Footer.jsx eier scaffoldets bunnplassering.
- Footer.jsx eier safe-area/padding for bunnflaten.
- Footer.jsx eier spacing for footerflaten.
- Footer.jsx eier layering/z-index for footerflaten via tokens der tokens finnes.
- Footer.jsx eier ikke PageTools-logikk.
- Footer.jsx eier ikke MobileBottomSheet-mekanikk.
- Footer.jsx eier ikke ProgressPager-mekanikk.
- Footer.jsx får konkrete props.
- Footer.jsx får aldri hele viewModel.
```

Footer-slots kan inneholde eksisterende mekanikk:

```txt
Footer.jsx
└── content slot
    ├── PageToolsMobileFooterSheet -> MobileBottomSheet
    ├── FlipcardsMobileFooterSheet -> MobileBottomSheet senere
    └── ExamFooter -> ProgressPager senere
```

## Tittelplassering

Side-titler er sideinnhold som standard.

```txt
SubjectSelectPage
└── SubjectSelectTopbar.jsx
    └── h1 + undertittel, scroller med innhold

ExamSelectPage
└── ExamSelectTopbar.jsx
    └── h1 + undertittel, scroller med innhold
```

Regler:

```txt
- Ikke flytt SubjectSelect- eller ExamSelect-titler inn i Header.jsx.
- HeaderTitle.jsx brukes bare for sider som eksplisitt trenger pinned heading.
- heading-slot er opt-in.
```

## Sidebeslutninger fra inventory

```txt
SubjectSelect
└── skal migreres til Header.jsx på desktop
└── Header.jsx rendres ikke på mobil i Modell A
└── SubjectSelectTopbar forblir scrollende sideinnhold

ExamSelect
└── skal migreres til Header.jsx på desktop
└── Header.jsx rendres ikke på mobil i Modell A
└── dette fjerner dagens tildekkede tabbable/a11y-back-risiko
└── ExamSelectTopbar forblir scrollende sideinnhold

Flipcards
└── skal migreres etter SubjectSelect/ExamSelect
└── eksisterende mobil display:none-hack fjernes når felles Header-modell er på plass
└── ikke bland med FlipcardToolMenu, ProgressPager, MobileBottomSheet eller theme-polish

Statistics
└── beholder lokal statistics-page-header i denne Header/Footer-SSOT-runden
└── eventuell senere migrering er egen patch

ExamPage
└── bruker ExamToolbar-sporet i denne runden
└── skal ikke migreres til scaffold Header.jsx nå
└── ingen exam-logikk flyttes inn i Header.jsx
```

## Patch-rekkefølge etter denne kontrakten

```txt
P0: add-header-ssot
P0: formalize-flat-back-contract
P1: subject-select-use-header
P1: exam-select-use-header
P1: flipcards-use-header
P1: introduce-footer-ssot
P2: cleanup-workspace-scaffold
P2: cleanup-old-header-footer-surfaces
```

## Acceptance

```txt
- Header/Footer SSOT-navn er låst.
- Scaffold-begrepet er låst.
- Flat back-kontrakt er låst.
- Modell A for mobil Header-rendering er låst.
- Header.jsx-kontrakt er dokumentert.
- Footer.jsx-kontrakt er dokumentert.
- MVVM-regler for Header/Footer er dokumentert.
- Tittelplassering er dokumentert.
- Sidebeslutninger fra inventory er dokumentert.
```

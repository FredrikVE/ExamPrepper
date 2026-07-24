# FRONTEND_ARCHITECTURE_SOUL.md — Arkitekturprinsipper for ExamPrepper frontend

<!-- Versjon: 2.5 — Sist oppdatert: 2026-07-24 — SSOT-refaktorering implementert -->
<!-- Erstatter: docs/soul-docs/FRONTEND_ARCHITECTURE_SOUL.md (V1, 2026-05-29) -->

Dette dokumentet beskriver arkitekturen slik den **skal** være — ikke slik den tilfeldigvis har blitt.
Kodebasen følger disse reglene i stor grad, men har avgrenset gjeld der eldre kode ble skrevet
før reglene ble formalisert. Se [Status etter SSOT-refaktoreringen](#status-etter-ssot-refaktoreringen).

Når du er i tvil om hvor noe hører hjemme — les dette først.

---

## Endringslogg 2.4 → 2.5

- **Pragmatisk Atomic Design er nå en låst komponentregel:** UI-primitiver,
  sammensatte komponenter, feature-komponenter, app-shell/sidemaler og Pages har
  eksplisitte ansvar og enveis avhengighetsretning.
- **Atomic Design er konseptuell, ikke en tvungen mappestruktur:** prosjektet
  innfører ikke generelle `atoms/`, `molecules/`, `organisms/` og `templates/`
  mapper. Eksisterende feature- og komponentmapper beholdes.
- **Uttrekks- og konsolideringsregler er kodifisert:** lik JSX er ikke nok for
  gjenbruk; komponenter deles når de har samme semantiske ansvar, kontrakt,
  interaksjonsmodell og endringsårsak.
- **Atomic Design er koblet til MVVM:** forretningsstate eies fortsatt av
  ViewModel. Lavere komponentnivåer mottar ferdige props og eier bare lokal,
  visuell interaksjonsstate.
- **Komponentnivåer er lagt inn i importregler, testing, plasseringstabell og
  kortversjon.**

---

## Endringslogg 2.3 → 2.4

- **Navigasjon oppdatert til dagens arkitektur:** `navGraph.js`, `navReducer.js`,
  `navItems.js`, `learningContent.js` og `pageTools.js` er erstattet av
  `src/navigation/navigation.js` for statisk konfigurasjon og
  `AppNavigationViewModel` for runtime-state og eksplisitte handlinger.
- **SSOT-begrepet strammet inn:** runtime-state/policy, autoritative registre,
  CSS-eierskap og canonical UI-implementasjoner beskrives som ulike kategorier.
  En delt renderer er ikke automatisk en source of truth.
- **Lasttilstand synkronisert med ferdig migrering:** `LOAD_STATUS` ligger i
  `viewmodel/LoadState/`; `WorkspaceState` rendrer loading, error, empty og
  content; `WorkspaceMessage` og `pageStatus`-kontrakten er fjernet.
- **Workspace-strukturen synkronisert:** den ytre komponenten heter
  `WorkspaceScaffold` og ligger utenfor `Shared/`; scrollflaten heter
  `.workspace-scaffold-body`. `WorkSpaceCard` beholder eksisterende navn og sti.
- **Subject-switcher ført inn som avledet SSOT:** desktop og mobil bruker samme
  modell. Falske fagobjekter er forbudt; `empty` og `unselected` er separate
  tilstander.
- **DI- og HTTP-eierskap presisert:** `dependencies.js` eier miljøvalidering,
  base-URL-er og instansiering. `ApiDataSource` eier felles requestmekanikk.
- **Kodestil utvidet:** imports og funksjons-/komponentsignaturer står
  horisontalt. Lange props-kontrakter bruker `props` i stedet for vertikal
  destrukturering.
- **Kjent teknisk gjeld oppdatert** mot frontend-snapshot
  `examprepper-frontend-safe-20260724-105708.zip`.

---

## Endringslogg V1 → V2

- **Ny seksjon: Låste beslutninger.** Datostemplet beslutningslogg som trumfer brødteksten
  ved konflikt. Fikser at dokumentet drifter bak beslutninger tatt i arbeid.
- **Kodestil er nå kodifisert:** tabs, ingen valgfrie parametre med defaults, imperativ stil,
  navngitte predikater/komparatorer, terskel for parameterobjekt. V1 manglet disse, og
  V1-eksempler brøt dem. Alle eksempler i V2 er oppdatert til å følge egen standard.
- **View-regelen presisert:** «ingen logikk» erstattet med «ingen domeneavledning».
  Forgrening og iterasjon over mottatte props er lovlig View-arbeid.
- **Boolean-navneregelen revidert:** state navngis etter funksjon, ikke etter
  View-komponentnavn. Fjerner selvmotsigelsen mot «ViewModel vet ikke at komponenter
  eksisterer». Eksisterende komponentkoblede navn er kjent gjeld.
- **Undermodell-mønsteret legitimert:** ViewModels kan komponeres av undermodell-hooks
  på gitte vilkår. Importtabellen er oppdatert tilsvarende.
- **Nye SSOT-seksjoner:** navigasjon (`navGraph.js`), scaffold (`Header`/`Footer`),
  lasttilstand (`loadStatus` / `useLoadModel` / `WorkspaceState`), brytpunkt og z-indeks.
- **Backend-seksjonen omskrevet:** backend eksisterer nå (Express på Render, Clerk-auth).
  Bytteløftet er justert: DI-wiring og token-tilførsel er lovlige berøringspunkter.
- **DataSource-baseklassen:** logging kun bak dev-flagg.
- **`execute()`-unntaket strammet inn.**

## Endringslogg 2.2 → 2.3

- **Nye workspace-SSOT-er:** `WorkSpaceScaffold` for ytre arbeidsflate/skall
  og `WorkSpaceCard` for innholdsflaten inni skallet. Regelen skiller eksplisitt
  mellom scaffold, innholdskort og utvalgskort.
- **Arvekontrakt for workspace-CSS:** sideklasser kan komponeres med Shared-klassen
  og sette navngitte `--workspace-scaffold-*`-/`--workspace-card-*`-variabler,
  men redeklarerer ikke superklassens ramme, bakgrunn, skygge eller blur direkte.
- **WorkSpaceCard-tokennavn:** felles flate bruker `--workspace-card-*`;
  ExamPage-navn som `--question-card-*` er ikke nye utvidelsespunkter.
- **Navngitte unntak:** Flipcard-faces og SelectionCard-familien er ikke
  WorkSpaceCard-konsumenter. De har egne visuelle identiteter og skal ikke
  presses inn i workspace-card-regelen.

## Endringslogg 2.1 → 2.2

- Alle plasseringsreferanser synkronisert med den låste strukturbeslutningen
  (`src/ui/viewmodel/LoadState/`, `viewmodel/LoadState/`): importtabellen,
  undermodell-vilkårene, «Hva hører hjemme hvor» og testseksjonen.
- Lasttilstand: `RELOADING` fjernet fra offentlig `LOAD_STATUS`;
  `WorkspaceMessage` skilt ut; feiltekst avledes ved retur fra `useLoadModel`
  slik at språkbytte i ERROR-tilstand oppdaterer meldingen uten reload.

## Endringslogg 2.0 → 2.1 (ekstern review)

- Imperativ-regelen presisert: hard linje ved to eller flere kjedede ledd;
  enkelt ledd tillatt der det er mer lesbart. Ført som datert presisering
  av den låste 2026-06-beslutningen.
- Defaults-forbudet scopet til produksjonskode (`src/`); testbyggere og
  fixtures i `test/` er unntatt. Ikke unntak for «lokale helpers».
- Lasttilstand-seksjonen markerer eksplisitt at eksisterende sider er
  migreringsmål per LOAD_STATE_SSOT_PLAN.md — ny kode følger regelen fra dag én.
- `<header>`-regelen omformulert: forbudet gjelder duplisert scaffold-header,
  ikke semantiske `<header>`-elementer i avgrensede innholdskomponenter.
- Brytpunktet omdøpt fra «SSOT» til «synkronisert JS/CSS-kontrakt».
- Ny seksjon: Migreringsregel (gammel kode rettes når filen røres;
  stil-migrering blandes aldri med featurepatcher).
- Styringsregel for beslutningsloggen: holdes kort, erstattede
  beslutninger erstattes i loggen — den er ikke historisk dagbok.

---

## Låste beslutninger

Denne loggen er dokumentets høyeste autoritet. Ved konflikt mellom en låst beslutning
og brødtekst eller eksempler lenger ned, gjelder beslutningen — og avviket skal meldes
som dokumentfeil. Nye låste beslutninger føres her med dato i samme patch-serie som
kodeendringen de springer ut av.

Loggen holdes kort. Når en beslutning presiseres eller erstattes, oppdateres
raden med ny dato — gamle versjoner akkumuleres ikke. Loggen er gjeldende rett,
ikke historisk dagbok; historikken bor i git.

| Dato | Beslutning |
|---|---|
| 2026-05 | MVVM-lagdeling med manuell DI via `dependencies.js`. Én ViewModel per side; app-shell-kapabiliteter kan ha egne ViewModels. |
| 2026-05 | CSS-mapper speiler komponentmapper. `App.css` er eneste CSS-entry point. |
| 2026-06, presisert 2026-07-24 | `Header.jsx` og `Footer.jsx` er canonical scaffold-implementasjoner. De skal ikke inlines eller dupliseres som konkurrerende app-shell. Semantiske innholdsheadere er tillatt. |
| 2026-06, erstattet 2026-07-24 | Statisk navigasjonskonfigurasjon bor i `src/navigation/navigation.js`. Runtime-state og eksplisitte navigasjonshandlinger bor i `AppNavigationViewModel`. Stabile skjermegenskaper skal deklareres i navigation-config, ikke som parallelle skjermsett i ViewModels eller Views. |
| 2026-06 | Tabs for innrykk i all JS/JSX/CSS. |
| 2026-06, presisert 2026-07-05 | Ingen valgfrie parametre eller default-parametre i produksjonskode (`src/`). Fravær uttrykkes eksplisitt som `null`, `[]`, en navngitt no-op eller en diskriminert modell. Testbyggere og fixtures i `test/` er unntatt. |
| 2026-07-24 | Imports, funksjonssignaturer og destrukturerte props står på én linje. Blir props-listen uleselig, mottar komponenten `props`; den vertikaliseres ikke i signaturen. Objektliteraler og argumentobjekter kan stå over flere linjer. |
| 2026-06, presisert 2026-07-05 | Imperativ stil: eksplisitte `for`-løkker med `push`, navngitte predikater og komparatorer. To eller flere kjedede ledd er alltid løkke. Enkelt `.map()`/`.filter()`-ledd er tillatt der det er mer lesbart; JSX-rendring bruker `.map()`. |
| 2026-06 | Ingen `.dark`-selektorer i komponent-CSS. Dark mode går utelukkende via tokens. |
| 2026-07 | Back-kontrakten flyter som ett objekt (`backContract`), ikke som løse argumenter mellom app-shell og side-ViewModels. |
| 2026-07, erstattet 2026-07-24 | Lasttilstand representeres med `LOAD_STATUS` i `src/ui/viewmodel/LoadState/loadStatus.js`. `useLoadModel` eier teknisk ressursstatus. `createWorkspaceState` avleder page-state, og `WorkspaceState` rendrer loading/error/empty/content. Views importerer ikke `LOAD_STATUS`. |
| 2026-07-05 | Feiltekst til bruker er produkttekst fra i18n. Teknisk feilobjekt logges kun i dev og lekker ikke direkte til UI. |
| 2026-07 | Flere enn fire hook-/konstruktørparametre, eller én boolean-parameter, utløser navngitt parameterobjekt. |
| 2026-07 | State-booleans navngis etter funksjonen de styrer, ikke etter komponentnavnet som rendrer dem. |
| 2026-07-07, presisert 2026-07-24 | `WorkspaceScaffold` i `components/WorkspaceScaffold/` er canonical eier av ytre workspace-skall, header-/footer-/overlay-slots og scrollflaten `.workspace-scaffold-body`. |
| 2026-07-07 | `WorkSpaceCard` er SSOT for innholdsflaten inni et workspace: ramme, `--workspace-card-surface`, kortskygge, inset-highlight og ambient glow. `QuestionCard` adopterer via klassekomposisjon; enklere konsumenter bruker komponenten. |
| 2026-07-07 | Workspace-arv skjer med multiklasse + deklarerte CSS-variabler. Sideklasser setter bare dokumenterte utvidelsespunkter og egen geometri; de redeklarerer ikke Shared-skjemaets kjerneegenskaper. |
| 2026-07-07 | Flipcard-faces og SelectionCard/utvalgskort er navngitte unntak fra WorkSpaceCard. De beholder egen identitet. |
| 2026-07-24 | Subject-switcher avledes én gang i `createSubjectSwitcherModel` og brukes av desktop og mobil. UI lager aldri et falskt fagobjekt. `empty` betyr ingen fag; `unselected` betyr fag finnes, men ingen er valgt. |
| 2026-07-24 | «SSOT» reserveres for autoritativ state, policy, konfigurasjon eller token-eierskap. Delte renderere dokumenteres som canonical UI-implementasjoner, ikke som state-SSOT-er. |
| 2026-07-24 | Komponentarkitekturen følger pragmatisk Atomic Design: UI-primitiver → sammensatte komponenter → feature-komponenter → app-shell/sidemal → Page. Nivåene beskriver ansvar og avhengighetsretning, ikke obligatoriske mapper. Lik markup alene er ikke grunnlag for konsolidering. |
| (backlog) | Navngitt z-indeksskala i `Tokens.css`. Rå app-lag i komponent-CSS fases ut; lokale stacking-verdier tokeniseres ikke automatisk. |

---

## Arkitektur: lagdelt MVVM med manuell dependency injection

```
Data          →   Repository   →   Domain (Use Cases)
                                        ↓
                                  dependencies.js
                                        ↓
                                    ViewModel
                                   (+ undermodeller)
                                        ↓
                                      View (Page)
                                        ↓
                                   Komponenter
                                        ↓
                                  Subkomponenter
```

Hvert lag har ett ansvar. Ingen lag hopper over et annet.
Data flyter én vei: nedenfra og opp gjennom modellen, og deretter strikt ovenfra
og ned gjennom View-hierarkiet.

---

## Status etter SSOT-refaktoreringen

Den implementeringsklare SSOT-planen mot snapshotet fra 2026-07-24 er gjennomført. Følgende kontrakter er nå etablert og testlåst i kildekoden:

- `createSubjectSwitcherModel` skiller `empty` fra `unselected` og brukes av desktop og mobil.
- `navigation.js` eier `SCREEN_CONFIG`; lokale screen-sets og Sidebar-policy er fjernet.
- `backContract` er eneste back-API fra `AppNavigationViewModel` til app-shell.
- `Header` er feature-fri, slot-basert og eier app-shell-geometri gjennom eksplisitte varianter.
- Statistics bruker canonical Header; konkurrerende sideheader er fjernet.
- `WorkspaceScaffold` har ikke lenger en dynamisk `contentClassName`-kanal.
- 932/933-kontrakten er synkronisert og kontrollert med PostCSS.
- Globale lag bruker bare tokens som stacking-inventeringen har bevist; lokale stacking contexts forblir lokale.
- i18n-kontrakten håndhever key-/type-paritet, ikke-tomme strings og config-refererte keys.
- `normalizeSearchTerm` og `shuffleInPlace` eier de dokumenterte duplikatene.
- Root `AppErrorBoundary`, språksynkfeil og submit-feil har separate livsløp og recovery-kontrakter.
- Ukjente spørsmålstyper får eksplisitt produkttekst og rutes ikke gjennom choice-renderere.
- Sidebar validerer sine lokale icon keys uten et globalt ikonregister.

Gjenstående, avgrenset gjeld som ikke var del av planen:

- enkelte eldre ViewModels har fortsatt posisjonelle parametre over den nye terskelen,
- eldre filer har fortsatt vertikale signaturer eller space-innrykk og migreres bare i dedikerte stilpatcher,
- enkelte state-booleans er fortsatt navngitt etter konkrete View-komponenter,
- `WorkspaceScaffold` og `WorkSpaceCard` har ulik kapitalisering,
- browser-/device-QA må fortsatt kjøres i et miljø med installerte avhengigheter og nettleser.

---

## Lagene

### 1. Datasource-laget — `src/model/datasource/`

- Det eneste model-laget som kjenner transport: HTTP-endepunkter, headers og rå payloads
- Ingen forretningslogikk; returnerer parsede transportdata/DTO-er, aldri `Response`
- Brukerpreferanser i `localStorage` er et eksplisitt Context-unntak, ikke en DataSource
- Instansieres i `dependencies.js` — aldri andre steder
- Felles HTTP-mekanikk arves fra `ApiDataSource`

### 2. Repository-laget — `src/model/repositories/`

- Kombinerer og abstraherer én eller flere DataSources
- Eksponerer rene domeneobjekter — ikke rådata
- Vet ingenting om use cases eller ViewModels
- Mottar DataSource-instanser via konstruktøren (injisert fra `dependencies.js`)

### 3. Domain-laget — `src/model/domain/`

- Use Case-klasser med ett ansvar hver
- `execute(...)` er inngangspunktet for den primære operasjonen
- Mottar Repositories (eller andre Use Cases) via konstruktøren
- Ingen UI-kjennskap, ingen React, ingen state

**`execute()`-regelen, presisert:** tilleggsmetoder utover `execute()` er tillatt
kun når de eksponerer delresultater av samme beregning (`getQuestionScore` etter
`execute`). En metode som utfører en *annen operasjon* er et nytt Use Case —
ikke en ny offentlig metode.

### 4. DI-containeren — `src/di/dependencies.js`

- Det eneste stedet applikasjonen wires sammen
- Leser og validerer runtime-konfigurasjon som påkrevde `VITE_*`-verdier
- Eier konkrete base-URL-er og sender dem eksplisitt til DataSources
- Instansierer DataSources, Repositories og Use Cases i riktig rekkefølge
- Eksporterer ferdige Use Case-instanser
- Kan velge konkrete implementasjoner og validere konfigurasjon, men inneholder ingen
  domene-, navigasjons- eller presentasjonsbeslutninger

### 5. ViewModel-laget — `src/ui/viewmodel/`

- Én ViewModel per side, skrevet som React hook (`use[PageNavn]ViewModel`)
- Mottar Use Case-instanser som parametere — aldri importert direkte inne i hooken
- Eier all sidetilstand og returnerer ett objekt med state, avledede verdier og handlers
- Ingen JSX, ingen DOM-referanser utover refs den eksponerer for scroll/fokus
- Avledede presentasjonsverdier (labels, CSS-klassenavn) beregnes her — ikke i View

**Parameterregel (låst 2026-07):** flere enn fire parametre, eller én boolean,
utløser navngitt parameterobjekt. Alle felter påkrevde — ingen defaults.

```js
// Feil — posisjonell boolean og løse kontraktfelter:
useFlipcardsPageViewModel(useCaseA, useCaseB, subjectId, key, language, t, true, showBackButton, backLabel, navigationLabel, onBack)

// Riktig — kontrakter som objekter, boolean navngitt:
useFlipcardsPageViewModel({
	getFlashcardsUseCase,
	getTopicAreasUseCase,
	subjectId,
	initialTopicAreaKey,
	language,
	t,
	isActive,
	backContract
})
```

#### Undermodeller — komponerte ViewModels

En side-ViewModel kan komponeres av undermodell-hooks. Dette er mønsteret bak
`useExamQuestionLoadModel`, `useLoadModel` og statistikk-dashboardets moduler,
og det er den riktige kuren mot ViewModels på flere hundre linjer.

Vilkår:

- Undermodellen bor i en mappe navngitt etter eieren
  (`src/ui/viewmodel/ExamPage/`) eller i en delt kapabilitetsmappe
  (`src/ui/viewmodel/LoadState/`)
- Den importeres og kalles kun av ViewModels — aldri av View-laget
- Den inneholder ingen JSX
- Delte undermodeller (`LoadState/`) er domenefrie; domenespesifikk logikk
  (preserve-attempt o.l.) bor i eierens undermodellmappe
- Side-ViewModelen er fortsatt eneste kontrakt mot View: undermodellens
  retur re-eksponeres som navngitte felter, aldri som rått objekt

«Alt for én side samles i én ViewModel» betyr dermed: samles bak **ett
kontraktpunkt** — ikke nødvendigvis i én fil.

### 6. View-laget — `src/ui/view/`

- Page-komponenter mottar `viewModel` som eneste prop
- Underkomponenter mottar spesifikke, navngitte props — ikke hele `viewModel`-objektet
- Ingen import av Use Cases, Repositories, DataSources eller `dependencies.js`

**Logikkregelen, presisert:** View gjør ingen *domeneavledning* — den beregner
aldri nye verdier fra domeneobjekter. Forgrening og iterasjon over det den
mottar er lovlig View-arbeid:

```jsx
// Lovlig View-arbeid — forgrener og itererer over ferdige modeller:
<WorkspaceState state={viewModel.workspaceState}>
	{viewModel.visibleQuestions.map((question) => (
		<QuestionCard key={question.id} question={question} />
	))}
</WorkspaceState>

// Forbudt — View avleder ny verdi fra domeneobjekt:
const isWide = question.categories.length >= 5 || longestText >= 34;
```

Grensetesten: kan uttrykket skrives uten å lese felter *inne i* et domeneobjekt
for å produsere en ny verdi? Sammenligning mot en status-enum eller mapping over
en liste består testen. Telling, måling og terskling av domenefelter gjør ikke.

View-laget kan importere rene presentasjons- og navigasjonskonstanter fra
`src/ui/presentation/` og `src/navigation/` (`PRESENTATION_MODE`,
`NAV_SCREENS`). Page-Views importerer ikke `LOAD_STATUS`; de mottar ferdig
`workspaceState` fra ViewModel. `WorkspaceState`-rendereren kan importere sin
egen `WORKSPACE_STATE_KINDS`-kontrakt.

---

## Komponentarkitektur — pragmatisk Atomic Design

ExamPrepper bruker Atomic Design som modell for komponentkomposisjon. Modellen
supplerer MVVM; den erstatter ikke lagdelingen eller state-eierskapet.

Den opprinnelige Atomic Design-terminologien oversettes slik:

| Atomic Design | ExamPrepper-begrep | Ansvar |
|---|---|---|
| Atom | UI-primitive | Liten, domenefri UI-byggestein |
| Molecule | Sammensatt komponent | Avgrenset UI-funksjon bygget av primitiver |
| Organism | Feature-komponent | Produktspesifikk komponent med tydelig feature-kontrakt |
| Template | App-shell / sidemal | Layout, slots, scroll, stacking og felles geometri |
| Page | Page | Komposisjonsrot for én appskjerm |

Dette er en konseptuell mapping. Prosjektet innfører ikke obligatoriske mapper som
`atoms/`, `molecules/`, `organisms/` og `templates/`. Komponentene organiseres
fortsatt etter ansvar, feature og eksisterende komponentstruktur.

### Avhengighetsretning

```txt
UI-primitive
  ↓
Sammensatt komponent
  ↓
Feature-komponent
  ↓
App-shell / sidemal
  ↓
Page
```

En komponent kan komponere komponenter på samme eller lavere nivå. En generell
primitive skal aldri importere en feature-komponent, Page, ViewModel eller
model-laget. En feature-komponent skal ikke importere en Page eller en annen
features interne komponent bare for å gjenbruke implementasjon.

### UI-primitiver — atoms

En UI-primitive er en liten, domenefri byggestein.

Eksempler:

```txt
Button
LoadingSpinner
SearchField
FilterOptionList
ProgressBar
WorkSpaceCard
DockedMobileBottomSheet
```

Regler:

- Har ett lite og generelt ansvar.
- Kjenner ikke fag, eksamener, spørsmål eller andre produktdomener.
- Eier ingen sidedata eller forretningsstate.
- Importerer ikke ViewModels, Use Cases, Repositories, DataSources eller
  `dependencies.js`.
- Kan bruke generiske callback-navn som `onClick`, `onChange` og `onKeyDown`.
- Mottar bare props den trenger; den mottar ikke et domeneobjekt som en skjult
  prop-bag.
- Trenger ikke være ett DOM-element. En primitive kan komponere flere elementer
  dersom de samlet uttrykker én generell UI-funksjon.

### Sammensatte komponenter — molecules

En sammensatt komponent kombinerer primitiver til én avgrenset interaksjons-
eller presentasjonsfunksjon.

Eksempler:

```txt
SearchFilterControl
SubjectPickerButton
WorkspaceActionButton
ToolCard
ToolCardGrid
LearningContentHeader
```

Regler:

- Komponerer UI-primitiver og eventuelt små komponenter på samme nivå.
- Mottar ferdig avledede presentasjonsverdier.
- Henter ikke data og tolker ikke rå domeneobjekter.
- Eier bare lokal visuell interaksjonsstate som ingen utenfor komponenttreet
  trenger.
- Rapporterer brukerhandlinger oppover gjennom callbacks.
- Har en prop-kontrakt som beskriver UI-funksjonen, ikke siden som tilfeldigvis
  bruker den.

### Feature-komponenter — organisms

En feature-komponent representerer en konkret produktfunksjon.

Eksempler:

```txt
SidebarNavigation
DesktopPopOutMenu
GlossaryMobileChapterSheet
QuestionCard
FlipcardDeck
ExamSubmitConfirmation
```

Regler:

- Kan bruke domenespesifikke prop-navn.
- Komponerer primitiver og sammensatte komponenter.
- Mottar ferdig avledede modeller og verdier fra Page eller ViewModel.
- Henter ikke data direkte.
- Eier ikke state som Page, ViewModel eller søskenkomponenter trenger.
- Kan eie lokal interaksjonsstate som fokus, drag-and-drop, hover eller åpnet
  detaljvisning når staten bare påvirker eget tre.
- Bruker presise callbacks som `onSelectSubject`, `onSubmitExam` og
  `onSelectTopicArea`.

Feature-komponenter konsolideres ikke bare fordi de bruker samme primitive.
`GlossaryMobileChapterSheet` og en page-tools-sheet kan begge bruke
`DockedMobileBottomSheet`, men de har ulike data, handlinger og endringsårsaker.
De skal derfor være separate feature-komponenter.

### App-shell og sidemaler — templates

App-shell og sidemaler eier plassering, slots, geometri og felles sidestruktur.

Eksempler:

```txt
WorkspaceScaffold
Header
Footer
MobileDropDownTopBar
```

Regler:

- Mottar innhold gjennom props, slots eller `children`.
- Eier layout, scrollområde, stacking og felles geometri.
- Kjenner ikke side-spesifikke domeneregler.
- Henter ikke data.
- Kopieres ikke eller implementeres på nytt per side.
- Visuelle varianter uttrykkes som eksplisitte kontrakter, ikke som skjulte
  descendant-regler i fremmed side-CSS.

### Pages

En Page er komposisjonsroten for én appskjerm.

Eksempler:

```txt
SubjectSelectPage
LearningContentSelectPage
ExamPage
FlipcardsPage
MatchCardsPage
GlossaryPage
StatisticsPage
```

Regler:

- Mottar Page-ViewModel som eneste toppnivå-prop.
- Fordeler ferdige verdier og callbacks til feature-komponenter.
- Forgrener på ferdige presentasjonsmodeller som `workspaceState`.
- Henter ikke data og eier ikke forretningsregler.
- Avleder ikke nye verdier fra domeneobjekter.
- Skal hovedsakelig være lesbar komposisjon, ikke en ny ViewModel skrevet i JSX.

### Atomic Design og state-eierskap

Atomic Design endrer ikke MVVM-regelen:

```txt
ViewModel
  ↓
Page
  ↓
Feature-komponent
  ↓
Sammensatt komponent
  ↓
UI-primitive
```

Forretningsstate eies av ViewModel og flyter nedover. Lokale komponenter kan bare
eie state som:

- kun påvirker eget komponenttre,
- er visuelt eller interaksjonsrelatert,
- ikke må leses av ViewModel eller søskenkomponenter,
- ikke representerer en domeneverdi eller servertilstand.

### Uttrekksregel

En komponent trekkes ut når minst ett av disse gjelder:

1. Den har et eget ansvar som kan navngis presist.
2. Den brukes på mer enn ett sted.
3. Den skjuler en kompleks visuell struktur.
4. Den har en selvstendig interaksjons- eller tilgjengelighetskontrakt.
5. Parent-komponenten blir vanskelig å lese uten uttrekket.
6. Den representerer en stabil UI-kontrakt som bør kunne endres isolert.

En komponent trekkes ikke ut bare for å redusere linjetall. Mellomkomponenter
uten eget ansvar er fragmentering, ikke Atomic Design.

### Konsolideringsregel

Lik JSX, samme ikon eller lik visuell form er ikke nok til å etablere en felles
komponent.

To komponenter konsolideres bare når de deler:

- samme semantiske ansvar,
- samme prop-kontrakt,
- samme interaksjonsmodell,
- samme tilgjengelighetskrav,
- og forventes å endres av samme årsak.

Deler de bare visuell struktur, trekkes den visuelle strukturen ut som en
primitive eller sammensatt komponent. Feature-komponentene beholdes separate.

Eksempel:

```txt
DockedMobileBottomSheet
  ├── PageToolsMobileSheet
  └── GlossaryMobileChapterSheet
```

`DockedMobileBottomSheet` eier sheet-struktur og geometri.
`PageToolsMobileSheet` eier sidehandlinger.
`GlossaryMobileChapterSheet` eier søk, filter og kapittelvalg.

### Prop-kontrakter per nivå

Prop-kontrakten blir mer konkret oppover i hierarkiet.

```jsx
<Button label={label} onClick={onClick} disabled={disabled} />
<SubjectPickerButton subjectName={subjectName} subjectCode={subjectCode} onOpenSubjectPicker={openSubjectPicker} />
```

En primitive mottar ikke et helt subject- eller question-objekt dersom den bare
trenger tekst, status og en callback. En feature-komponent mottar ikke hele
Page-ViewModel-objektet; den får feltene den faktisk bruker.

---

## Navigasjon — statisk konfigurasjon og runtime-state har ulike eiere

Navigasjon har to bevisste eiernivåer:

| Eier | Ansvar |
|---|---|
| `src/navigation/navigation.js` | Skjerm-ID-er, læringsinnholdstyper, statiske sidebar-/toggle-/pop-out-items og stabile skjermegenskaper |
| `AppNavigationViewModel` | Runtime-state, eksplisitte brukerhandlinger, overlay-koordinering og språksynk |

`navigation.js` eksponerer i dag:

```txt
NAV_SCREENS
LEARNING_CONTENT_TYPES
NAV_ITEMS.sidebarItems
NAV_ITEMS.toggleButtonItems
NAV_ITEMS.popOutMenuItems
```

Stabile skjermegenskaper skal samles i samme modul som en liten deklarativ
`screenConfig`, for eksempel:

```js
export const SCREEN_CONFIG = {
	[NAV_SCREENS.SUBJECTS]: { requiresSubject: false, requiresExam: false, backTo: null, showsSubjectSwitcher: false, pageClassName: "exam-select-page", shellClassName: "exam-select-shell" },
	[NAV_SCREENS.SELECT]: { requiresSubject: true, requiresExam: false, backTo: NAV_SCREENS.SUBJECTS, showsSubjectSwitcher: true, pageClassName: "exam-select-page", shellClassName: "exam-select-shell" }
};
```

Dette registeret skal eie fakta om en skjerm. `AppNavigationViewModel` skal fortsatt
ha eksplisitte domenehandlinger som `selectSubject`, `selectExam`,
`selectFlipcardDeck`, `selectMatchCardsDeck`, `changeScreen` og `goBack`.

Regler:

- Ingen Page implementerer egne guards, nullstillingsregler eller back-targets.
- Views oppretter ikke egne `Set`/arrays med skjerm-ID-er.
- Nye skjermer registreres i `NAV_SCREENS` og `SCREEN_CONFIG` i samme patch.
- `NAV_ITEMS` grupperes etter faktisk UI-flate. Glossarys dynamiske søk/kapittel-sheet
  er ikke et pop-out-menu-item bare fordi det bruker samme mobile primitive.
- Sidebar-synlighet deklareres på itemet eller i screen-config, ikke som lokal
  skjermbetingelse i `SidebarNavigation`.
- Back-kontrakten flyter som ett objekt fra app-shell til side-ViewModel.
- `App.jsx` velger Page ut fra `activeScreen`, men eier ingen overgangsregler.

Nåværende avvik: screen-policyen er fortsatt fordelt mellom `navigation.js`,
`AppNavigationViewModel` og `SidebarNavigation`. Dette er prioritert gjeld, men
den gamle generiske grafen/reduceren skal ikke gjeninnføres.

---

## App-shell — Header og Footer som canonical implementasjoner

`src/ui/view/components/Header/Header.jsx` og `Footer/Footer.jsx` er appens
canonical desktop-header og footer. De er delte strukturelle implementasjoner,
ikke runtime-state-SSOT-er.

- Tilbakeknappen rendres i Headers leading-slot — aldri som en frittsvevende
  sideknapp.
- Sideeide verktøy monteres gjennom Header-kontrakten; siden eier data og
  handlinger, Header eier plassering og app-shell-struktur.
- Header monteres via `WorkspaceScaffold` sin `header`-slot som søsken til
  scrollflaten.
- Mobil app-shell eies av `MobileDropDownTopBar`; desktop-Header skjules ved samme
  brytpunkt. Dette er en responsiv variant, ikke en konkurrerende desktop-header.
- Footer monteres gjennom scaffoldets `footer`-slot når siden trenger den.

Forbudet gjelder scaffold-ansvar, ikke HTML-taggen. Semantiske `<header>`-elementer
inne i kort, artikler, dialoger og avgrensede innholdskomponenter er lovlig HTML.

Header-varianter skal være eksplisitte (`default`, `transparent`,
`wide-progress` eller tilsvarende). Side-CSS skal ikke skjule header-policy gjennom
vilkårlige descendant-overrides. Statistics-sidens egen app-shell-header og dagens
sideeide header-varianter er kjent gjeld.

---

## Workspace-arkitektur — WorkspaceScaffold og WorkSpaceCard

Workspace-reglene skiller mellom tre visuelle familier. Samme navn skal ikke
brukes om ulike ansvar.

| Begrep | Ansvar | Canonical eier |
|---|---|---|
| `WorkspaceScaffold` | Ytre avrundet arbeidsområde: shell, header/footer/overlay-slots og scrollflate | `src/ui/view/components/WorkspaceScaffold/` + `src/ui/style/WorkspaceScaffold/` |
| `WorkSpaceCard` | Innholdsflate inni skallet: kortborder, surface, kortskygge, inset-highlight og ambient glow | `src/ui/view/components/Shared/WorkSpaceCard/` + `src/ui/style/Shared/WorkSpaceCard/` |
| Utvalgskort | Valgkort og panelkort i grids/dashboards | `SelectionCard`-familien og tilhørende CSS |

Flipcard-faces er et navngitt unntak. De har egen identitet med accent-ramme,
mestringsskygger og 3D-flip og skal ikke adopteres av `WorkSpaceCard`.

### WorkspaceScaffold

`WorkspaceScaffold` rendrer `<main>` og mottar en eksplisitt kontrakt:

```txt
className
contentClassName
header
footer
overlay
scrollToTopRequestId
children
```

Fravær sendes eksplisitt som `null` eller tom streng etter propens kontrakt.
Komponenten eier:

```txt
.workspace-scaffold
.workspace-scaffold-header
.workspace-scaffold-body
.workspace-scaffold-footer-overlay
.workspace-scaffold-overlay
```

Regler:

- Alle syv hovedsider bruker `WorkspaceScaffold`; de lager ikke konkurrerende
  `<main className="x-workspace">`-skall med kopiert shell-oppskrift.
- Header monteres via `header`-slotten og er søsken til
  `.workspace-scaffold-body`.
- `.workspace-scaffold` eier `position`, flex-shell, høyde, overflow, isolasjon,
  border, radius, bakgrunn, skygge og backdrop-filter.
- `.workspace-scaffold-body` eier posisjon, flex-oppførsel, min-størrelser,
  scrolling, overscroll og scrollbar-kontrakt.
- Side-CSS kan eie padding og indre layout når scaffoldet ikke setter den samme
  propertyen. Overstyring av scaffold-eide body-properties skjer bare gjennom en
  dokumentert descendant-kontrakt.
- `contentClassName` er en modifikatorkanal, ikke en alternativ scaffold-eier.
  En arkitekturtest skal avvise at enhver slik klasse setter scaffold-eide
  properties som søskenklasse.
- Scroll-to-top trigges bare når `scrollToTopRequestId` ikke er `null`.

### WorkSpaceCard

`WorkSpaceCard` er flate-SSOT-en inni et workspace. CSS-klassen er den primære
kontrakten; komponenten er et tynt skall for enkle konsumenter. Kompliserte
konsumenter kan adoptere flaten med klassekomposisjon uten DOM-endring.

Regler:

- `.workspace-card` eier border, radius, background, shadow, inset-highlight og
  ambient glow.
- Konsumenten eier geometri: `min-height`, `overflow`, `padding` og indre layout.
- `QuestionCard` adopterer flaten med `className="workspace-card question-card"`.
- Enkle konsumenter bruker `<WorkSpaceCard className={null}>...</WorkSpaceCard>`
  eller sender en eksplisitt modifikatorklasse.
- `--workspace-card-surface`, `--workspace-card-ambient-glow` og
  `--workspace-card-ambient-glow-display` er generiske tokennavn. Nye
  `--question-card-*`-utvidelsespunkter er forbudt.

### Arvekontrakt for workspace-CSS

CSS har ikke klassearv. Workspace-arv uttrykkes med multiklasse og deklarerte
custom properties:

```html
<main class="workspace-scaffold exam-workspace">
```

Sideklassen får gjøre to ting:

1. Sette dokumenterte `--workspace-scaffold-*`, `--scaffold-*` eller
   `--workspace-card-*`-utvidelsespunkter.
2. Style egne barn og egen geometri.

Sideklasser redeklarerer aldri Shared-/scaffold-oppskriftens kjerneegenskaper
direkte: `border`, `background`, `box-shadow`, `backdrop-filter`, `isolation` og
strukturell `overflow`. Trengs et avvik, opprettes et navngitt utvidelsespunkt i
eierfilen i samme patch som første konsument.

Utvidelsespunkter opprettes ikke på forskudd. Én reell variasjon gir én variabel.
Verdier i sideklasser skal være tokens når de uttrykker design; rå verdier er bare
tillatt for sideunik geometri.

```css
/* Riktig */
.flipcards-workspace {
	--workspace-scaffold-backdrop-filter: none;
}

/* Feil */
.flipcards-workspace {
	background: var(--shell-bg);
	box-shadow: var(--shadow-heavy);
	backdrop-filter: none;
}
```

---

## Lasttilstand — én teknisk status, én page-state-modell

Lasting, feil og suksess representeres ikke som boolean+nullable-par. Teknisk
ressursstatus og presentert page-state er to forskjellige nivåer.

### Teknisk ressursstatus

SSOT:

- `src/ui/viewmodel/LoadState/loadStatus.js` — `LOAD_STATUS` med `LOADING`,
  `ERROR`, `READY`
- `src/ui/viewmodel/LoadState/useLoadModel.js` — generisk async-ressurs som
  eksponerer `{ status, data, error, reload }`
- `src/ui/viewmodel/LoadState/combineLoadStatuses.js` — prioritet
  `error > loading > ready` ved flere ressurser

`useLoadModel` holder stående data under reload etter første vellykkede last.
Teknisk `loadError` logges kun i dev. `error` som returneres til ViewModel er den
brukersikre produktteksten som ble sendt inn fra i18n.

### Page-state

SSOT:

- `src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js`
- `src/ui/viewmodel/WorkspaceState/createWorkspaceState.js`
- `src/ui/view/components/WorkspaceState/WorkspaceState.jsx`

Gyldige page-state-varianter:

```txt
loading
error
empty
content
```

Flyt:

```txt
useLoadModel / combineLoadStatuses
  ↓
createWorkspaceState({ loadStatus, isEmpty, labels, errorAction })
  ↓
WorkspaceState({ state, children })
```

Regler:

- Page-ViewModel eksponerer `workspaceState`, ikke enkeltressursenes statuses.
- Page-View importerer ikke `LOAD_STATUS`.
- `WorkspaceState` er eneste page-level boundary for loading/error/empty/content.
- `state.action` er eksplisitt `null` eller `{ label, onAction }`.
- Loading/error/empty rendres inne i `WorkspaceScaffold`; app-shell forblir
  montert.
- Empty er en gyldig READY-presentasjon, ikke en teknisk feil.
- Content returnerer `children` uten et ekstra wrapperlag.
- Ukjente status-/kind-verdier kaster feil; de skjules ikke med defaults.

Alle syv hovedsider er migrert til denne modellen. `WorkspaceMessage`,
`pageStatus`, `pageErrorMessage` og lokale page-state-skall er ikke gjeldende
arkitektur og skal ikke gjeninnføres.

---

## Unidirectional data flow og state hoisting

State eies så høyt oppe som mulig — alltid i ViewModel.
Data flyter én vei: ViewModel → Page → komponenter → subkomponenter.
Ingen komponent henter data selv.

### Data ned, events opp

Props flyter nedover. Brukerhandlinger bobler oppover som callbacks.

```jsx
// Riktig — komponenten rapporterer opp, ViewModel bestemmer:
<AnswerOption
	selected={isSelected}
	onSelect={() => viewModel.setSingleAnswer(question.id, option.id)}
/>

// Feil — komponenten mottar en setter:
<AnswerOption onSelect={() => setAnswers(...)} />
```

Callbacks navngis med `on`-prefiks. En setter (`setAnswers`) sendt som prop er
et tegn på at logikken hører i ViewModel.

### Komponenter henter ingenting selv

En komponent skal aldri importere fra `dependencies.js`, kalle et Use Case,
ha egne `useState`-kall for sidedata, eller bruke `useContext` for forretningsdata.

### Context er infrastruktur, ikke data

`useContext` er tillatt for tekniske cross-cutting concerns: tema, språkstrenger,
innstillinger. Forretningsdata — spørsmål, svar, score — sendes som props fra
ViewModel, aldri via context.

### Lokale interaksjonshooks i View-laget

Drag-and-drop-komponenter bruker lokale hooks i komponentmappene sine
(`useCategorySortQuestion` osv.). Tillatt unntak fra «ingen state i View»,
kun for: visuell interaksjonsstate, drag-and-drop-eventhåndtering og avledede
visningsverdier fra props hooken allerede har mottatt. Forbudt: kalle Use Cases,
importere fra `model/`, eie state andre komponenter utenfor eget tre trenger.

---

## Lav kobling, høy kohesjon

### Importregler per lag

| Fra | Kan importere | Kan ikke importere |
|---|---|---|
| View / komponent | Props, canonical UI-primitiver, `presentation/`- og `navigation/`-konstanter, rene presentasjonshelpers | Use Cases, Repositories, DataSources, `dependencies.js`, side-ViewModels, `LOAD_STATUS` |
| Page-ViewModel | Injiserte Use Cases, React hooks, egne undermodeller, `LoadState/`, `WorkspaceState/`, presentation/navigation-config | View-komponenter, andre siders ViewModels |
| Undermodell | React hooks, rene konstanter, modeller i samme kapabilitet | View-komponenter, `dependencies.js`, andre siders ViewModels |
| Use Case | Repository via konstruktør, andre Use Cases via konstruktør | ViewModel, View |
| Repository | DataSource via konstruktør | Use Cases, ViewModel, View |
| DataSource | Felles `ApiDataSource`, transportdata og plattform-API | Repository, Use Cases, ViewModel, View |
| `dependencies.js` | Alle konkrete implementasjoner og runtime-konfigurasjon | UI-beslutninger og domeneregler |

Atomic Design presiserer importretningen inne i View-laget:

```txt
Page → app-shell/feature → sammensatt komponent → UI-primitive
```

Lavere nivå importerer aldri et høyere nivå. Komponenter på samme nivå kan deles
når de har en reell felles kontrakt; features importerer ikke hverandres interne
komponenter som snarvei.

### `src/utils/` — tekniske hjelpere uten domenekjennskap

Funksjoner som kjenner `question.options`, `answer.placements` eller andre
domenestrukturer hører i `src/model/domain/` — ikke i `src/utils/`.

---

## Bilder i utvidede forklaringer

Bilder flyter gjennom lagene og berikes av Repository — ikke av View.

1. **Rådata** (`src/data/subjects/{subjectId}/conceptImages.js`) — flat katalog
   med metadata. Ingen `src`-strenger.
2. **DataSource** (`ConceptImageDataSource`) — eneste sted en `src`-streng
   konstrueres. Returnerer ferdige bildeobjekter.
3. **Repository** (`ExamRepository`) — løser `whyExtendedImageRefs`
   (array av `imageId`-strenger på spørsmål/alternativ/target) og legger
   ferdige objekter på `whyExtendedImages` ved lasting.
4. **View** — mottar `images`-arrayet og rendrer `<figure>/<img>`. Konstruerer
   aldri `src` selv.

Nytt bilde: fil i `public/subjects/...`, oppføring i katalogen, `imageId` i
`whyExtendedImageRefs`. View-laget røres ikke.

```jsx
// Riktig — alle props påkrevde, ingen default:
function AnswerOptionExtendedPanel({ images }) {
	return images.map((image) => (
		<figure key={image.id}>
			<img src={image.src} alt={image.alt} loading="lazy" />
			{image.caption ? <p>{image.caption}</p> : null}
		</figure>
	));
}
```

Tomme lister sendes eksplisitt som `[]` fra ViewModel — komponenten skal aldri
trenge en default for å overleve.

---

## Backend — ApiDataSource er HTTP-grensen

Backend eksisterer: Express/TypeScript på Render, PostgreSQL via Neon og
Clerk-JWT-auth. Frontendens DataSource-klasser er HTTP-grensen.

### Hva som er stabilt ved transportendringer

Når et endepunkt, transportformat eller backendmiljø endres, skal disse normalt
ikke røres:

- Use Cases
- ViewModels og undermodeller
- View-komponenter

Repository kan måtte røres dersom transportens DTO-shape endres og mappingen til
domeneobjekter må oppdateres. Løftet er domenestabilitet utover Repository, ikke at
kun én fysisk fil alltid endres.

### Eierskap

`dependencies.js` eier:

- validering av `VITE_API_BASE_URL` og `VITE_IMAGE_BASE_URL`,
- konkrete DataSource-/Repository-/Use Case-instanser,
- token-provider som injiseres,
- valg av konkret implementasjon.

`ApiDataSource` eier:

- URL-sammensetting fra injisert base-URL,
- auth-header fra injisert token-funksjon,
- felles GET/POST-requestmekanikk,
- parsing av payload,
- avvisning av ikke-OK responses.

DataSource kjenner ikke Clerk. Den mottar `getToken` eksplisitt; dersom en kilde
kan være offentlig, sender wiring `null` eksplisitt.

### Canonical baseklasse for HTTP

```js
// src/model/datasource/ApiDataSource.js
export default class ApiDataSource {
	#baseUrl;
	#getToken;

	constructor({ baseUrl, getToken }) {
		if (!baseUrl) {
			throw new Error("ApiDataSource requires baseUrl");
		}

		this.#baseUrl = baseUrl.replace(/\/$/, "");
		this.#getToken = getToken;
	}

	async get(path) {
		return await this.#request(path, { method: "GET", headers: null, body: null });
	}

	async #request(path, request) {
		const authHeaders = await this.#getAuthHeaders();
		const requestHeaders = request.headers === null ? {} : request.headers;
		const response = await fetch(`${this.#baseUrl}${path}`, {
			method: request.method,
			headers: { Accept: "application/json", ...authHeaders, ...requestHeaders },
			body: request.body
		});

		const payload = await readPayload(response);

		if (!response.ok) {
			throw new Error(payload?.error ?? `API request failed: ${response.status}`);
		}

		return payload;
	}

	async #getAuthHeaders() {
		if (this.#getToken === null) {
			return {};
		}

		const token = await this.#getToken();
		return token === null ? {} : { Authorization: `Bearer ${token}` };
	}
}
```

Eksemplet viser kontrakten, ikke et krav om nøyaktig intern implementasjon.

### Feilkontrakt

- Teknisk feilobjekt vises ikke direkte i UI.
- Page-load-feil går gjennom `useLoadModel` og i18n-produkttekst.
- Action-feil kan ha egen lokal/felles modell fordi de har en annen livsløp enn
  page-load.
- Typed API-feil (`status`, `code`, `message`) innføres først når en konkret
  konsument trenger forskjellig oppførsel per feiltype. Ikke bygg et hierarki på
  forskudd.
- En root ErrorBoundary skal håndtere uventede render-feil; dette er kjent gjeld.

### Regler for DataSource-implementasjon

- Én DataSource-klasse per API-domene
- Metodenavn beskriver operasjonen: `fetchExamById`, ikke `getFromApi`
- Metodene er `async` og returnerer parsede transportdata/DTO eller `null`, aldri
  rå `Response`
- Repository mapper transportdata til domeneobjekter
- Base-URL injiseres fra `dependencies.js`, aldri leses eller hardkodes i konkrete
  DataSource-klasser
- Dev-logging står bak `import.meta.env.DEV`; ingen ubetinget requestlogging

---

## Sikkerhet og secrets

- `.env`-filer i `.gitignore`, aldri committet. `.env.example` viser struktur
  uten verdier.
- Alt med `VITE_`-prefiks er lesbart i bundlen. Kun offentlige URL-er og
  ikke-sensitive verdier. Aldri: API-nøkler med skriverettigheter,
  JWT-secrets, databasestrenger.
- Backend-secrets bor i backend sin `.env` eller hostingplattformens secret
  manager.
- `dangerouslySetInnerHTML` er forbudt. Rik tekst krever eksplisitt beslutning
  om sanitisering (DOMPurify) først.
- **Scoring tilhører backend.** Frontend sender svar, aldri beregnet score.
  Lokale `GradeAnswerUseCase`/`CalculateExamScoreUseCase` gir umiddelbar
  UI-feedback, men er ikke autoritative.

---

## Filbanekommentarer

Første linje i hver kildefil, relativ sti fra prosjektroten, mellomrom etter `//`:

```js
// src/ui/viewmodel/ExamPageViewModel.js
```

```css
/* src/ui/style/ExamPage/QuestionCard/index.css */
```

Kommentaren oppdateres når filen flyttes — feil sti villeder aktivt.

---

## CSS-struktur

### CSS-mapper speiler komponentmapper

For hver komponentmappe under `src/ui/view/components/` finnes en tilsvarende
mappe med samme navn og nesting under `src/ui/style/`. Gjelder på mappenivå —
én mappe kan samle styles i få filer.

### Entry point og importkjede

`App.css` er eneste entry point. Ingen komponentfil importerer CSS direkte.
All CSS importeres via `index.css`-filer per mappe. `index.css` inneholder kun
`@import`-linjer. `responsive.css` er alltid sist i sin `index.css`.

### Tokens vs. komponent-CSS

`Tokens.css` inneholder kun globale design tokens. Komponent-spesifikke
størrelser hører i komponentens egen CSS. Hardkod aldri en verdi som finnes
som token.

Dark mode håndteres utelukkende via tokens. `.dark`-selektorer i komponent-CSS
er forbudt (låst 2026-06) — `.dark { }` finnes kun i `Tokens.css`.

### Shared workspace-CSS

Workspace-CSS følger samme speilregel som komponentene:

- `components/WorkspaceScaffold/` har CSS under `style/WorkspaceScaffold/`
- `components/Shared/WorkSpaceCard/` har CSS under
  `style/Shared/WorkSpaceCard/`

Side-CSS under `ExamPage/`, `MatchCardsPage/`, `FlipcardsPage/`,
`GlossaryPage/`, `StatisticsPage/`, `SubjectSelectPage/` og
`LearningContentSelectPage/` inneholder sideavvik og geometri. Shell- og
flateoppskrifter kopieres aldri ned i sidemapper.

### Brytpunktet — synkronisert JS/CSS-kontrakt

App-brytpunktet har to tekniske representasjoner fordi CSS ikke kan lese en
JavaScript-konstant direkte:

- JS: `APP_MOBILE_QUERY = "(max-width: 932px)"` i
  `src/ui/presentation/presentationMode.js`
- CSS: `max-width: 932px` og den komplementære `min-width: 933px`

Dette er en synkronisert kontrakt, ikke én fysisk SSOT. Garantien skal være en
arkitekturtest som tillater akkurat disse to grensene og avviser nye app-brytpunkt
uten eksplisitt whitelist/låst beslutning. Endres grensen, endres JS, CSS og testen
i samme patch.

Dagens kode har mange literalforekomster og mangler full drifttest; det er kjent
gjeld. En CSS custom property kan ikke brukes i media-query condition og er ikke
løsningen.

### Z-indeksskala (backlog, låst retning)

Navngitt skala i `Tokens.css` (`--z-workspace`, `--z-scaffold-header`,
`--z-overlay`, …). Rå z-index-tall i komponent-CSS er kjent gjeld og fases ut.
Ny kode bruker skalaen fra dag én når den lander.

### Stacking-fellen

`backdrop-filter` og `filter` gjør elementet til containing block for
`position: fixed`-etterkommere. Monter aldri `fixed`-elementer under en flate
med disse egenskapene — det er roten til hamburger- og verktøymeny-buggene.
Portaler (`createPortal`) er utveien for overlays.

---

## Hva hører hjemme hvor

| Spørsmål | Svar |
|---|---|
| Henter HTTP/transportdata | Konkret DataSource via `ApiDataSource` |
| Validerer base-URL-er og wirer konkrete instanser | `dependencies.js` |
| Mapper DTO-er og kombinerer kilder til domeneobjekter | Repository |
| Beriker domeneobjekter med bilder | Repository |
| Forretningsregel med ett ansvar | Use Case |
| Sidetilstand, handlers og avledede presentasjonsverdier | Page-ViewModel |
| Gjenbrukbar async-lasting | `viewmodel/LoadState/useLoadModel` |
| Page-level loading/error/empty/content | `createWorkspaceState` + `WorkspaceState` |
| Domenespesifikk lastelogikk | Undermodell i `viewmodel/[Eier]/` |
| Statisk navigasjonskonfigurasjon | `navigation/navigation.js` |
| Runtime-navigasjon og eksplisitte handlinger | `AppNavigationViewModel` |
| Subject-switcher-state | `createSubjectSwitcherModel` via `SubjectSelectPageViewModel` |
| Desktop app-shell-header / footer | `components/Header/`, `components/Footer/` |
| Mobil app-shell | `components/Sidebar/MobileDropDownTopBar.jsx` |
| Ytre workspace-skall | `components/WorkspaceScaffold/` + `style/WorkspaceScaffold/` |
| Workspace-innholdsflate | `components/Shared/WorkSpaceCard/` + `style/Shared/WorkSpaceCard/` |
| Utvalgskort | `components/Shared/SelectionCard/`-familien, ikke WorkSpaceCard |
| Domenefri gjenbrukbar UI-byggestein | UI-primitive / Atomic Design atom |
| Avgrenset UI-funksjon bygget av primitiver | Sammensatt komponent / molecule |
| Konkret produktfunksjon | Feature-komponent / organism |
| Layout, slots, scroll og app-shell-geometri | App-shell / sidemal / template |
| Fordeler props, forgrener på ferdige modeller, rendrer skjermen | Page |
| Lokal visuell del uten domeneavledning | Komponent på passende Atomic Design-nivå |
| Lokal drag/drop-/gesture-state | Lokal hook i komponentmappen |
| Instansierer side-ViewModels og velger Page | `App.jsx` |
| Globale designverdier og semantiske layer-tokens | `Tokens.css` |
| Aktivt språk/tema/settings | Tilhørende Context-provider |
| Dynamisk glossary chapter/search-sheet | Glossary-modell og Glossary-komponenter, ikke `NAV_ITEMS.popOutMenuItems` |

---

## React-native kode — bruk React, ikke vanilla JS

- `useState` for reaktiv state; `useRef` for ikke-reaktive verdier og
  DOM-referanser (scroll, fokus)
- React event-props for interaksjon på egne elementer; aldri
  `addEventListener` på React-eide elementer
- `document.addEventListener` kun for global scope (Escape i modaler,
  klikk-utenfor), alltid med cleanup i `useEffect`
- `createPortal` for modaler og overlays; aldri `document.body`-manipulasjon
- Stilendringer via `className` og CSS-klasser; aldri `element.style`.
  Unntak: `.dark` på `document.documentElement` i `ThemeContext`.
- Timere via `window.setInterval`/`clearInterval` i `useEffect` med cleanup;
  CSS-animasjoner foretrekkes fremfor JS
- `localStorage` kun i Context-providers for brukerpreferanser; aldri i
  ViewModels, komponenter eller Use Cases

---

## Kodestil

Låste regler (2026-06/07), gjelder all ny og endret kode:

### Tabs for innrykk

All JS/JSX/CSS bruker tabs. Blandet innrykk i en fil rettes når filen røres.

### Horisontale imports og signaturer

Import-specifiers, funksjonsparametre og destrukturerte props står på én linje:

```js
import { NAV_ITEMS, NAV_SCREENS, LEARNING_CONTENT_TYPES } from "../../navigation/navigation.js";

export default function SubjectPickerButton({ subjectSwitcher, isOpen, onToggle }) {
	// ...
}
```

Forbudt:

```js
import {
	NAV_ITEMS,
	NAV_SCREENS
} from "../../navigation/navigation.js";

export default function SubjectPickerButton({
	subjectSwitcher,
	isOpen,
	onToggle
}) {
}
```

Blir props-signaturen for lang, bruk `props` og eksplisitte feltnavn i kroppen:

```js
export default function MobileDropDownTopBar(props) {
	return <button onClick={props.onToggleMenu}>{props.subjectSwitcher.label}</button>;
}
```

Objektliteraler og navngitte argumentobjekter kan stå over flere linjer. Regelen
gjelder imports og signaturer, ikke all multiline-kode.

### Ingen valgfrie parametre med defaults (produksjonskode)

```js
// Forbudt:
function useExamPageViewModel(..., showBackButton = false, onBack = null) { }

// Riktig — alle parametre påkrevde; kalleren er eksplisitt:
function useExamPageViewModel({ ..., backContract }) { }
```

Trengs et «tomt» tilfelle, sender kalleren det eksplisitt (`null`, `[]`, en
navngitt no-op eller en diskriminert kontrakt). Fravær skal synes på kallstedet,
ikke gjemmes i signaturen. Et objektfelt er enten påkrevd eller eksplisitt
nullable; konsumenten skal ikke gjette om feltet finnes.

**Scope:** forbudet gjelder all kode under `src/`. Testbyggere og fixtures
under `test/` kan bruke defaults når defaulten er del av testoppsettet
(`buildQuestion({ type = QUESTION_TYPES.SINGLE })`). Det finnes ikke noe
«lokal helper»-unntak i produksjonskode — det er nøyaktig smutthullet
regelen ble laget for å tette.

### Parameterobjekt-terskelen

Flere enn fire parametre, eller én boolean-parameter, utløser navngitt objekt.
En naken `true` på et kallsted er alltid feil.

### Imperativ stil

Hovedregel: bruk imperativ stil — eksplisitte `for`-løkker med `push`,
navngitte predikater og komparatorer — når transformasjonen har mer enn
ett steg, domenegrener, sideeffekter eller behov for navngitte
mellomverdier. Review-spørsmålet er «er dette lesbart og riktig?»,
ikke «brukte du `.map()`?».

Den harde, greppbare grensen: **to eller flere kjedede ledd er alltid
løkke.** En kjede (`filter().map()`) skjuler mellomtilstandene og én løkke
per ledd.

```js
// Forbudt — kjeding:
const correctOptionIds = question.options
	.filter((option) => option.correct)
	.map((option) => option.id);

// Riktig — imperativ med navngitt predikat:
function isCorrectOption(option) {
	return option.correct;
}

const correctOptionIds = [];
for (const option of question.options) {
	if (isCorrectOption(option)) {
		correctOptionIds.push(option.id);
	}
}
```

Oppslagsstrukturer bygges imperativt:

```js
const questionsById = new Map();
for (const question of questions) {
	questionsById.set(question.id, question);
}
```

Tillatt uten videre: JSX-rendring bruker `.map()` — det er Reacts idiom for
lister, ikke databehandling. Ett enkelt `.map()`- eller `.filter()`-ledd uten
kjeding er tillatt der det er mer lesbart enn løkken.

### Migreringsregel

Gammel kode som bryter kodestil eller reviderte regler rettes **når filen
likevel røres** — aldri som del av en featurepatch. Stil-migrering er alltid
en egen patch med ett formål (jf. PATCH_SOULs «én patch — ett formål» og
«ikke rydd i nærliggende kode»). En AI som leser eksisterende kode skal
behandle dokumentet, ikke kodebasen, som fasit for ny kode.

---

## Navnekonvensjoner

### Klasser og hooks

| Lag | Mønster | Eksempel |
|---|---|---|
| DataSource | `[Navn]DataSource` | `ExamQuestionDataSource` |
| Repository | `[Navn]Repository` | `ExamRepository` |
| Use Case | `[Verb][Subjekt]UseCase` | `GradeAnswerUseCase` |
| ViewModel | `use[PageNavn]ViewModel` | `useExamPageViewModel` |
| Undermodell | `use[Ansvar]Model` | `useExamQuestionLoadModel`, `useLoadModel` |
| Page | `[Navn]Page` | `ExamPage` |
| Lokal hook | `use[KomponentNavn]` | `useCategorySortQuestion` |

Verb-prefiks i Use Cases: `Get` henter, `Grade` vurderer, `Calculate` beregner,
`Submit` sender. Aldri `Manager`, `Helper`, `Util`.

### Filer og mapper

- Klasser og komponenter: `PascalCase`
- Hooks: `camelCase`
- CSS-filer: `kebab-case`
- Komponentmapper: `PascalCase`; CSS-undermapper som ikke er komponentnavn: `kebab-case`

### Booleans

Booleans leser som påstander: `isSubmitted`, `canGoNext`, `hasAnswered`.

**Revidert regel (låst 2026-07):** UI-state navngis etter *funksjonen* den
styrer — ikke etter komponenten som rendrer den. ViewModel skal ikke kjenne
View-treets navn, og et komponentbytte skal ikke tvinge navnebytte i et annet
lag.

```js
// Riktig — funksjonsbasert, overlever komponent-rename:
const isMobileNavigationMenuOpen = false;
const closeMobileNavigationMenu = () => { ... };
const isSubjectPickerOpen = false;

// Kjent gjeld — komponentkoblet (døpes om opportunistisk):
const isMobileDropDownTopBarMenuOpen = false;
```

Kravet fra V1 består i kjernen: navnet skal entydig peke på hvilken del av
UI-et verdien styrer. Samlebegreper uten referent (`isOverlayOpen`,
`isPanelOpen`) er fortsatt forbudt.

### Eksplisitte navn — unngå AI-slop

Generiske navn er forbudt som permanente navn: `data`, `result`, `item`,
`value`, `response`, `content`, `handler`, `helper`, `temp`, `res`, `cb`.

```js
// Forbudt:
const data = await getExamQuestionsUseCase.execute({ examId });
const [loading, setLoading] = useState(true);

// Riktig:
const questions = await getExamQuestionsUseCase.execute({ examId });
const questionLoad = useLoadModel({ ... });
```

Handlers navngis etter hva de gjør: `submitExam`, `goToNextQuestion`,
`toggleFeedbackPanel` — aldri `handleClick`, `handleChange`.

`onClick` som prop-navn er tillatt kun i små gjenbrukbare primitiver.
Domenekomponenter bruker presise callback-navn (`onSelectSingleAnswer`).

Løkkevariabler: `i`/`j` kun i rene tallindeks-løkker. Ellers navngis etter
innhold: `for (const question of questions)`.

Testen for et godt navn: ser du bare navnet — vet du nøyaktig hva det er?
`expandedAnswerOptionIndexesByQuestionId` består. `expanded` gjør ikke.

---

## Testing

- `test/` speiler `src/`-strukturen med `.test.js`-suffiks.
- Use Cases og Repositories testes i isolasjon med injiserte avhengigheter.
- ViewModel-undermodeller og rene modellbyggere testes direkte.
- `useLoadModel`, workspace-state, subject-switcher og navigasjon har egne
  kontraktstester.
- Arkitekturtester brukes når regelen kan uttrykkes maskinelt: importgrenser,
  én canonical implementasjon, CSS-token-eierskap, screen-config og breakpoint-drift.
- Atomic Design-grenser kan testlåses der mappene har tydelig ansvar: generelle
  primitiver importerer ikke feature-, Page-, ViewModel- eller model-lag; Pages
  importeres ikke av lavere komponentnivåer.
- Atomic Design-kategorier enhetstestes ikke som etiketter. Testen skal håndheve
  faktisk avhengighetsretning og kontrakt, ikke filnavnet «atom» eller «organism».
- React-komponenter render-enhetstestes ikke som standard i soloprosjektet. Rene
  helpers og lokale interaksjonshooks under komponentmapper kan enhetstestes.
- Avhengigheter mockes manuelt og injiseres; tester importerer ikke konkrete
  instanser fra `dependencies.js`.
- Testbeskrivelser leser som setninger og relaterte tester grupperes med `describe`.
- Testfiler har filbanekommentar som produksjonsfiler.
- En arkitekturpatch godkjennes først når `git apply --check`, Jest og build er
  kjørt mot den navngitte commit/zip-basen. Kan miljøet ikke kjøre dem, skal det
  stå eksplisitt; gamle tall gjenbrukes aldri.

---

## Kodekvalitetsprinsipper

Kode skrives for å leses, forstås, testes, vedlikeholdes og utvides — i den
rekkefølgen.

### KISS

Løs problemet du har, ikke det du tror du får. Lagene er allerede bevisste
abstraksjoner — ikke lag flere innad i dem uten konkret behov.

### SOLID

- **Single Responsibility** — én modul har ett tydelig eierskap og én hovedgrunn
  til å endre seg
- **Open/Closed** — nye varianter bruker dokumenterte utvidelsespunkter; ikke lag
  et register bare for å unngå enhver endring i eksisterende kode
- **Liskov** — en ny DataSource-implementasjon leverer samme transportkontrakt;
  Repository trenger ikke kjenne transportbyttet
- **Interface Segregation** — `execute()` som primær inngang; ikke brede
  «manager»-interfaces
- **Dependency Inversion** — avhengigheter injiseres og kalles via kontrakt, aldri
  instansiert inne i domeneklassen

### Utvidbarhet

Ny spørsmålstype, nytt fag eller ny DataSource skal ikke kreve endring i
eksisterende, velfungerende filer utover de definerte utvidelsespunktene.
Krever en tilføyelse endringer mange steder, er koblingen for høy.

### Tidskompleksitet

Map/Set for oppslag, ikke lineærsøk i løkke. Men: eksamener har 15–30
spørsmål — prioriter lesbarhet, og optimaliser kun når datasettet er stort,
operasjonen ligger i en løkke, eller profilering viser faktisk treghet.

### Vedlikeholdbarhet

- Liten overraskelse — koden gjør det navnet sier
- Ingen skjult state — side-effekter er eksplisitte
- Duplisering unngås konsekvent — samme logikk finnes ett sted
- Kommentarer forklarer **hvorfor**, ikke hva. Ingen kommentar er bedre enn
  støy.

```js
// Verdifull — forklarer noe koden ikke kan si:
// Klampes ved avledning i stedet for setState-i-effekt: når antallet
// krymper er indeksen gyldig i samme render, uten kaskaderende re-render.

// Støy — gjentar koden:
// Henter eksamen ved id
```

---

## Skrivestil — unngå AI-slop

Gjelder all tekst en bot produserer i prosjektet: kommentarer, forklaringer,
commit-meldinger, dokumentasjon.

- Forbudte slop-markører: `crucial`, `robust`, `seamless`, `leverage`,
  `ensure`, `comprehensive`, `it's worth noting`, `serves as`, `foster`,
  `enhance`, `in order to`
- Ikke blås opp enkle ting med «significant implications» — forklar konkret
  hvorfor noe er viktig, eller la være
- Ingen hengende «-ing»-fraser som late begrunnelser («...ensuring separation
  of concerns»)
- Ingen «not just X, but Y»-kontraster mot misforståelser ingen hadde
- Ikke tre punkter av vane — bruk antallet som er riktig
- Ikke start svar med anerkjennelse («Godt spørsmål!») — svar direkte
- Ikke oppsummer det du nettopp sa
- Commit-meldinger: hva og hvorfor, konkret.
  `"Flytt workspaceClassName-beregning fra ExamPage til ExamPageViewModel"`

---

## Kortversjon

> Låste beslutninger trumfer brødtekst. Oppdater loggen i samme patch som arkitekturendringen.
> DataSource kjenner transport. Repository mapper til domene. Use Case eier én regel.
> `dependencies.js` eier runtime-konfigurasjon og konkret wiring.
> ViewModel eier siden bak ett kontraktpunkt; undermodeller deler byrden.
> Komponenter følger pragmatisk Atomic Design: primitive → sammensatt → feature → app-shell → Page. Nivåene er ansvar, ikke tvungne mapper.
> Page forgrener og fordeler ferdige modeller. Komponenter mottar og rendrer.
> `navigation.js` eier statisk config; `AppNavigationViewModel` eier runtime-state og handlinger.
> Header/Footer er canonical app-shell. WorkspaceScaffold eier ytre shell og scroll.
> WorkSpaceCard eier innholdsflaten. Sideklasser er modifikatorer, ikke nye eiere.
> `useLoadModel` eier teknisk lastestatus. `createWorkspaceState` + `WorkspaceState` eier page-state.
> Subject-switcher avledes én gang. Ingen falske fagobjekter; empty og unselected er ulike.
> CSS-mapper speiler komponentmapper. Brytpunktet er en testet JS/CSS-kontrakt.
> Tabs. Horisontale imports/signaturer. Ingen valgfrie parametre i `src/`.
> Objekt over fire parametre. To kjedede transformasjoner blir løkke.
> Gammel kode rettes i egne patcher når området røres, ikke skjult i featurearbeid.
> Navn forteller hva ting er og hvilken funksjon state styrer.
> KISS: løs problemet du har. En delt renderer er ikke automatisk en SSOT.
> Ingenting i View henter forretningsdata selv.

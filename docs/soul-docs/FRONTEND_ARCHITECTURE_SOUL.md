<!--docs/soul-docs/FRONTEND_ARCHITECTURE_SOUL.md-->
# FRONTEND_ARCHITECTURE_SOUL.md — Arkitekturprinsipper for ExamPrepper frontend

<!-- Versjon: 2.9 — Sist oppdatert: 2026-08-20 -->
<!-- Erstatter: FRONTEND_ARCHITECTURE_SOUL V2.8 -->

Dette dokumentet beskriver arkitekturen slik den **skal** være — ikke slik den tilfeldigvis har blitt.
Det er normativt: ved konflikt med eldre dokumentasjon gjelder de låste beslutningene og de gjeldende
kontraktene i dette dokumentet.

`docs/architecture/SSOT_REGISTER_FRONTEND.md` er evidensregisteret som viser hva kodebasen faktisk
bruker, hvilke importører og tester som finnes, og hva som fortsatt er gjeld. SOUL-dokumentet sier
hvilke regler ny og endret kode skal følge. De to dokumentene oppdateres i samme arkitekturpatch når
eierskap eller canonical implementasjoner endres.

Når du er i tvil om hvor noe hører hjemme: start med oversikten under, og bruk eksisterende eier før
du oppretter ny state, ny policy, ny delt renderer, ny utility eller ny CSS-kontrakt.

---

## Start her — appens autoritative eiere

«SSOT» betyr én autoritet for en reell beslutning. Begrepet brukes ikke som synonym for «delt kode».
Dokumentet skiller derfor fire roller:

- **Autoritative registre og runtime-SSOT** eier state, policy, konfigurasjon eller identiteter.
- **Canonical implementasjoner** er den eneste delte implementasjonen av en UI-flate eller mekanisme.
- **Delte utilities og avledninger** konverterer input til resultat og eier ingen state eller policy.
- **CSS- og token-eiere** eier navngitte stylingkontrakter og globale designverdier.

### Obligatorisk bruksregel

1. Finn eieren i tabellene før du skriver ny kode.
2. Importer og bruk eieren. Ikke kopier en eksisterende policy, identitet, requestmekanisme, canonical kontrakt eller stylingoppskrift lokalt.
3. Utvid en canonical implementasjon gjennom dokumenterte props, slots, varianter eller tokens.
4. Opprett aldri parallelle arrays, `Set`-er, fallback-tekster eller lokale konstanter for noe en autoritativ eier allerede bestemmer.
5. En utility er ikke et sted å flytte state. Den skal være ren og få alle avhengigheter som input.
6. Lik lokal JSX er tillatt når semantikk, interaksjon eller endringsårsak er forskjellig. Ikke press ulike ansvar inn i samme komponent bare fordi markup eller styling ligner.
7. En ny eier innføres først når det finnes et selvstendig ansvar, en autoritativ beslutning eller en faktisk delt kontrakt. Én konsument utelukker ikke en eier, men tekstlig likhet alene etablerer ikke en. Legg til en stabil kontrakttest når regelen kan uttrykkes presist; bruk ellers en fokusert adferdstest eller dokumenter hvorfor en arkitekturtest ikke gir verdi.
8. Når eierskap eller en canonical kontrakt endres, oppdateres kode, relevante tester, SOUL og SSOT-registeret i samme arkitekturpatch.

### Autoritative registre og runtime-SSOT

| Område | Autoritativ eier | Eier | Brukskrav |
|---|---|---|---|
| Navigasjon: statisk policy | `NAV_SCREENS`, `SCREEN_CONFIG`, `getScreenConfig()` | `src/navigation/navigation.js` | Skjerm-ID-er og de seks stabile skjermegenskapene defineres bare her. |
| Navigasjon: menydata | `NAV_ITEMS`, `LEARNING_CONTENT_TYPES`, `TEST_TYPES` | `src/navigation/navigation.js` | Sidebar, seks desktopvalg, mobilgrupper og pop-out-menyer bygges fra disse registrene. Desktoprekkefølgen er `Læringsti`, `Begrepsliste`, `Flipcards`, `Begrepsmatch`, `Kapitteltester`, `Eksamener`; `Læringsti` er deaktivert og uten target. `Kapitteltester` og `Eksamener` mapper begge til `LEARNING_CONTENT_TYPES.EXAMS`, med hver sin `testType`; de er ikke nye skjermer eller innholdstyper. |
| Navigasjon: runtime | `useAppNavigationViewModel()` | `src/ui/viewmodel/AppNavigationViewModel.js` | Eier route-/selection-state, overganger, språksynk og avledet chrome/back. |
| Mobil navigasjon | `useMobileDropDownTopBarModel()` | `src/ui/viewmodel/AppNavigation/` | Eier mobilmeny og subject-picker-state; brukes gjennom appens navigasjons-ViewModel. |
| Settings-presentasjon | `useSettingsPresentationModel()` | `src/ui/viewmodel/AppNavigation/` | Eier open-state og presentasjonsmodus for settings; sheet/sidebar følger app-shell-modus, ikke feature-presentasjonsmodus. |
| Teknisk lastestatus | `LOAD_STATUS`, `useLoadModel()` | `src/ui/viewmodel/LoadState/` | Views importerer ikke `LOAD_STATUS`; Page-ViewModel bruker load-modellen. |
| Page-state | `WORKSPACE_STATE_KINDS` | `src/ui/viewmodel/WorkspaceState/` | Loading/error/empty/content uttrykkes med denne unionen. |
| Produkttekst | `translations`, `LANGUAGES` | `src/i18n/translations.js` | All produkttekst og alle config-refererte tekstnøkler kommer herfra. |
| Aktivt språk | `LanguageProvider`, `useLanguage()` | `src/i18n/LanguageContext.jsx` | Ingen konkurrerende språk-state. |
| Aktivt tema | `ThemeProvider`, `useTheme()` | `src/ui/theme/ThemeContext.jsx` | Eier tema og `.dark` på DOM. |
| Brukerinnstillinger | `SettingsProvider`, `useSettings()` | `src/ui/settings/SettingsContext.jsx` | Ingen lokal kopi av globale settings. |
| Auth-token til transport | `setAuthTokenProvider()`, `getActiveAuthToken()` | `src/auth/AuthTokenProvider.js` | Modulbro, ikke React-provider; injiseres i transportlaget. |
| Spørsmålstype-ID-er | `QUESTION_TYPES` | `src/constants/QuestionTypes.js` | Sammenlign mot konstantene, aldri rå `"single"`/`"multi"`/`"fill"`-strenger. |
| Spørsmålskonfigurasjon | `QUESTION_CONFIG` | `src/constants/QuestionConfig.js` | Konfigurasjonsgrenser holdes separat fra type-ID-er. |
| Mobil/desktop-modus | `PRESENTATION_MODE`, `APP_MOBILE_MAX_WIDTH`, `APP_DESKTOP_MIN_WIDTH`, `usePresentationMode()` | `src/ui/presentation/` | Eier feature-presentasjon: mobil til og med `932`, desktop fra `933`. Breakpoint endres i JS, CSS og kontrakttest i samme patch. |
| App-shell-modus | `APP_SHELL_MODE`, `APP_NARROW_DESKTOP_MAX_WIDTH`, `APP_FULL_DESKTOP_MIN_WIDTH`, `APP_COMPACT_SHELL_QUERY`, `useAppShellMode()` | `src/ui/presentation/` | Eier chrome-grensen: compact shell til og med `1200`, full desktop-shell fra `1201`. Compact shell bruker eksisterende `MobileDropDownTopBar` uten å gjøre feature-presentasjonen mobil. |
| Dependency injection | `dependencies.js`-modulen / DI-wiringen | `src/di/dependencies.js` | Eneste sted som leser API-base-URL og instansierer konkrete data-/domeneavhengigheter. |
| Emneområdefiltrering | `ALL_TOPIC_AREAS`, `findTopicAreaByKey()` | `src/model/domain/utils/topicAreaFilters.js` | Bruk register og oppslag; ikke opprett lokale varianter. |

`QUESTION_TYPES` er autoriteten for spørsmålstype-ID-er. Produksjonskode skal bruke
konstantene når den tar beslutninger basert på spørsmålstype; rå typeverdier er
forbudt i `QuestionCard`-kapabiliteten og API-transformasjonen og håndheves av arkitekturtest.

### Canonical implementasjoner som skal gjenbrukes

| Ansvar | Canonical implementasjon | Regel |
|---|---|---|
| Ytre sidestillas | `<WorkspaceScaffold/>` | Alle hovedsider bruker samme shell, slots og scrollflate. |
| Rendring av page-state | `<WorkspaceState/>` | Ingen Page lager en konkurrerende loading/error/empty/content-grense. |
| Desktop app-shell-header | `<Header/>` og slot-komponentene | Appearance, layout og slots velges eksplisitt per Page. |
| Footer-skall | `<Footer/>` | Delte footere komponerer denne; den inlines ikke per side. |
| Lineær fremdrift | `<ProgressBar/>` | Renderer den canonical lineære fremdriftsflaten. |
| Punkt-/sidepaginering | `<ProgressPager/>` | Ikke bygg konkurrerende pager-renderere i feature-komponenter. |
| Responsiv innholdstypevelger | `<ToggleButtonRow/>` | Eneste offentlige inngang. Fasaden velger desktop-/mobilvariant; mobilvarianten eier lokal disclosure, defaultvalg innen en åpnet gruppe og DOM-fokus. |
| Formatert produkttekst | `<FormattedText/>` | Markup-kontrakten rendres ett sted. |
| Spørsmålsflate og oppgavetyper | `<QuestionCard/>` | Eneste offentlige inngang til oppgavetyper. Læringsmoduser velger spørsmål, eier svarstate og bestemmer rettingstidspunkt; de implementerer ikke egne oppgaverenderere. |
| Mobil bottom sheet | `<DockedMobileBottomSheet/>` | Eier docked/expanded-geometri, drag, grip, inert og slots. |
| Desktop pop-out | `<DesktopPopOutMenu/>` | Eier delt struktur og lagmekanikk. |
| Søk | Search-familien i `components/Search/` | Felt, filter, backdrop, forslag og listbox-mekanikk gjenbrukes; feature-VM eier rangering/policy. |
| Verktøykort | `<ToolCardGrid/>`, `<ToolCard/>` | Brukes for den dokumenterte verktøykort-flaten. |
| Root render-crash | `<AppErrorBoundary/>` | App-roten har én recovery-grense; page-load-feil går fortsatt gjennom WorkspaceState. |
| HTTP-requestmekanikk | `class DataSource` | Alle API-datakilder arver requestmekanismen; base-URL eies av `dependencies.js`. |

#### Eierskap for spørsmålskapabiliteten

`QuestionCard` er en delt kapabilitet. Den eies ikke av `ExamPage`, `LearningPath` eller en annen
læringsmodus. `ExamPage` er en konsument av `QuestionCard`; at eksamener og kapitteltester i dag
bruker samme testside, endrer ikke eierskapet.

Læringsmodusen eier valg og rekkefølge av spørsmål, svarstate, rettingstidspunkt, fremdrift, resultat
og navigasjon. `QuestionCard` eier valg av oppgaverenderer, oppgaveinteraksjon og presentasjon av
fasit og spørsmålsfeedback. Fremtidige læringsmoduser importerer `QuestionCard.jsx` og importerer
ikke interne komponenter under `QuestionTypes`. Modusvariasjon uttrykkes gjennom eksplisitt state
og callbacks, ikke gjennom `isExam`, `isChapterTest`, `isLearningPath` eller tilsvarende modusflagg.

### Delte avledninger og utilities

| Avledning/utility | Rolle | Regel |
|---|---|---|
| `backContract` | Avleder rutetilbake-UI fra aktiv config, labels og `goBack()` | Én form og ett konstruksjonssted; ikke en separat state-SSOT. |
| `buildProgressBarModel()` | Bygger presentasjonsmodellen for lineær fremdrift | Ren avledning; renderer og modellbygger har ulike roller. |
| `createProgressPagerEntries()` | Bygger pager-oppføringer | Ren presentasjonsavledning. |
| `createFormattedTextSegments()` | Parser støttet formatert produkttekst til segmenter | Ren presentasjonsavledning; rendringen eies av `FormattedText`. |
| `createSubjectSwitcherModel()` | Avleder desktop/mobil subject-switcher-modell | UI lager ikke falske fagobjekter; `empty` og `unselected` er ulike. |
| `createWorkspaceState()` | Avleder page-state fra load-status, tomhet og labels | Ren funksjon; eier ikke lastestatus. |
| `combineLoadStatuses()` | Kombinerer flere tekniske lastestatuser | Ren avledning. |
| `normalizeSearchTerm()` | Normaliserer søketekst | Ikke dupliser normalisering i features. |
| `shuffleInPlace(items, randomNumber)` | Fisher–Yates med injisert RNG | RNG sendes inn; ikke bruk egne shuffle-varianter. |

### CSS- og token-eiere

| Kontrakt | Eier | Regel |
|---|---|---|
| Globale design- og lagtokens | `src/ui/style/Tokens.css` | `--space-*`, `--z-*` og øvrige globale tokens defineres her. |
| Scaffold-geometri | `workspace-scaffold.css` | `--scaffold-header-height` og `--scaffold-inset` deklareres på `.workspace-scaffold`; ingen fallbacks hos konsumenter. |
| `.workspace-card` | `style/Shared/WorkSpaceCard/workspace-card.css` | En navngitt lokal flate som bare brukes av `QuestionCard`. React-wrapperen er slettet; klassen er ikke en app-bred primitive. |

---

## Endringslogg

### 2.7 → 2.8

- `QuestionCard` er flyttet ut av `ExamPage` og etablert som delt kapabilitet med én offentlig inngang.
- `QuestionTypes`, spørsmålsinteraksjon og feedback eies av `QuestionCard`; læringsmodusene eier øktflyt, svarstate, rettingstidspunkt og navigasjon.
- `QUESTION_TYPES` er faktisk SSOT for typeavgjørelser i `QuestionCard` og API-transformasjonen.
- `questionCardArchitecture` låser offentlig inngang, page-uavhengighet, CSS-entry, ExamPage-konsumering og fravær av rå typeavgjørelser.

### 2.6 → 2.7

- `ToggleButtonRow` er dokumentert som canonical responsiv fasade med interne desktop- og mobilvarianter.
- `NAV_ITEMS.toggleButtonItems` eier de delte testtypeoppføringene for desktop. Alle oppføringer har eksplisitt `contentTypeId` og `testType`; fravær er `null`, aldri et utelatt felt. `NAV_ITEMS.mobileToggleButtonItems` gjenbruker dem i mobilgruppen `Tester`. `mobileToggleEntryItems` er reservert for faktiske mobile-only oppføringer og er tom i denne kontrakten.
- `LearningContentSelectPageViewModel` eier mobilens åpne gruppe som ordinær `useState` og deler en komplett, påkrevd kontrakt med Glossary-ruten. Mobilvarianten eier kun DOM-fokus og den eksplisitte lukkeknappen; Escape og valg av underoppføring lukker ikke gruppen. Kontrakten bruker ikke optional-parametre eller fallback mellom desktop- og mobilidentitet. Når en gruppe åpnes uten aktiv underoppføring, aktiveres første enabled entry fra den autoritative rekkefølgen; breakpoint-valget eies av fasaden gjennom `usePresentationMode()`.
- Arkitekturtesten låser offentlig inngang, importgrenser, CSS-entry og fravær av lokal breakpoint- og temadrift.

Eldre versjonshistorikk ligger i git. Erstattede modeller og gamle filnavn skal ikke kopieres inn i dette normative dokumentet.

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
| 2026-07-29 | `QuestionCard` er en delt kapabilitet på `components/QuestionCard/`, ikke eid av `ExamPage`, `LearningPath` eller en annen læringsmodus. Eksterne konsumenter importerer bare `QuestionCard.jsx`; `App.css` er eneste CSS-entry. |
| 2026-06, presisert 2026-07-24 | `Header.jsx` og `Footer.jsx` er canonical app-shell-implementasjoner for desktop-header og footer. De skal ikke inlines eller dupliseres som konkurrerende app-shell. Semantiske innholdsheadere er tillatt. |
| 2026-06, erstattet 2026-07-26 | `src/navigation/navigation.js` eier `NAV_SCREENS`, `SCREEN_CONFIG`, `getScreenConfig`, `NAV_ITEMS` og `LEARNING_CONTENT_TYPES`. `SCREEN_CONFIG` eier bare `requiresSubject`, `requiresExam`, `backTo`, `showsSubjectSwitcher`, `pageClassName` og `shellClassName`. `AppNavigationViewModel` eier runtime-state, preconditions, nullstillinger, sideeffekter og eksplisitte overganger. `App.jsx` eier bare render-mapping og dokumenterte persistensunntak. |
| 2026-06 | Tabs for innrykk i all JS/JSX/CSS. |
| 2026-06, presisert 2026-07-05 | Ingen valgfrie parametre eller default-parametre i produksjonskode (`src/`). Fravær uttrykkes eksplisitt som `null`, `[]`, en navngitt no-op eller en diskriminert modell. Testbyggere og fixtures i `test/` er unntatt. |
| 2026-07-24 | Imports, funksjonssignaturer og destrukturerte props står på én linje. Blir props-listen uleselig, mottar komponenten `props`; den vertikaliseres ikke i signaturen. Objektliteraler og argumentobjekter kan stå over flere linjer. |
| 2026-06, presisert 2026-07-05 | Imperativ stil: eksplisitte `for`-løkker med `push`, navngitte predikater og komparatorer. To eller flere kjedede ledd er alltid løkke. Enkelt `.map()`/`.filter()`-ledd er tillatt der det er mer lesbart; JSX-rendring bruker `.map()`. |
| 2026-06 | Ingen `.dark`-selektorer i komponent-CSS. Dark mode går utelukkende via tokens. |
| 2026-07 | Back-kontrakten flyter som ett objekt (`backContract`), ikke som løse argumenter mellom app-shell og side-ViewModels. |
| 2026-07, presisert 2026-07-26 | `LOAD_STATUS` og `useLoadModel` eier teknisk ressursstatus. `WORKSPACE_STATE_KINDS` eier page-state-unionen. `combineLoadStatuses` og `createWorkspaceState` er avledninger; `WorkspaceState` er canonical renderer. Views importerer ikke `LOAD_STATUS`. |
| 2026-07-05 | Feiltekst til bruker er produkttekst fra i18n. Teknisk feilobjekt logges kun i dev og lekker ikke direkte til UI. |
| 2026-07 | Flere enn fire hook-/konstruktørparametre, eller én boolean-parameter, utløser navngitt parameterobjekt. |
| 2026-07 | State-booleans navngis etter funksjonen de styrer, ikke etter komponentnavnet som rendrer dem. |
| 2026-07-07, presisert 2026-07-24 | `WorkspaceScaffold` i `components/WorkspaceScaffold/` er canonical eier av ytre workspace-skall, header-/footer-/overlay-slots og scrollflaten `.workspace-scaffold-body`. |
| 2026-07-07, erstattet 2026-07-26 | React-wrapperen `WorkSpaceCard.jsx` er fjernet. `.workspace-card` i `style/Shared/WorkSpaceCard/workspace-card.css` er en navngitt lokal flate som brukes av `QuestionCard`, ikke en app-bred canonical primitive. En ny delt kortprimitive innføres bare ved dokumentert felles semantikk og kontrakt. |
| 2026-07-07, presisert 2026-07-26 | WorkspaceScaffold-arv skjer med multiklasse + deklarerte scaffold-variabler. Sideklasser setter bare dokumenterte utvidelsespunkter og egen geometri; de redeklarerer ikke scaffoldets kjerneegenskaper. |
| 2026-07-07, presisert 2026-07-26 | Flipcard-faces, `QuestionCard` og feature-eide utvalgskort beholder egne semantiske og visuelle kontrakter. Delte utvalgskort-dimensjoner kan ligge i `style/Shared/SelectionCard/`, men det finnes ingen canonical `SelectionCard`-komponent. |
| 2026-07-24 | Subject-switcher avledes én gang i `createSubjectSwitcherModel` og brukes av desktop og mobil. UI lager aldri et falskt fagobjekt. `empty` betyr ingen fag; `unselected` betyr fag finnes, men ingen er valgt. |
| 2026-07-24 | «SSOT» reserveres for autoritativ state, policy, konfigurasjon eller token-eierskap. Delte renderere dokumenteres som canonical UI-implementasjoner, ikke som state-SSOT-er. |
| 2026-07-24 | Komponentarkitekturen følger pragmatisk Atomic Design. Komposisjonsnivåene går fra UI-primitiver via sammensatte og feature-komponenter til app-shell/sidemal og Page; importavhengigheter går fra Page ned mot lavere nivåer. Nivåene er ansvar, ikke obligatoriske mapper. Lik markup alene er ikke grunnlag for konsolidering. |
| 2026-07-25 | `DockedMobileBottomSheet` eier canonical bottom-sheet-geometri, slots, drag-/gripmekanikk, inert-kontrakt og scroll. Feature-sheets eier innhold og handlinger og overstyrer ikke komponentens interne kontrakt. |
| 2026-07-25 | Search-familien eier canonical felt-, filter-, suggestion-, listbox- og tilgjengelighetsmekanikk. Feature-ViewModelen eier kandidater, rangering, aktiveringspolicy og feature-spesifikke filterregler. |
| 2026-07-26 | Globale app-lag bruker navngitte `--z-*`-tokens fra `Tokens.css` og er låst av `globalLayerPolicy`. Lokale stacking contexts kan beholde lokale verdier når de ikke deltar i appens globale lagstige. |
| 2026-07-26 | Appens feature-presentasjonsgrense er en synkronisert JS/CSS-kontrakt: `APP_MOBILE_MAX_WIDTH = 932`, desktop starter på `933`, og `appBreakpointContract` håndhever de tillatte verdiene og en eksplisitt allowlist for lokale terskler. |
| 2026-07-27 | `<ToggleButtonRow/>` er canonical responsiv innholdstypevelger. `navigation.js` eier statisk desktop- og mobilpolicy; Page-ViewModelene leverer ferdige mobilitems; fasaden velger presentasjonsvariant. |
| 2026-07-29 | `LearningContentSelectPageViewModel` eier `expandedMobileToggleButtonGroupId` som ordinær `useState` og deler en komplett, påkrevd disclosure-kontrakt med Glossary-ruten. Mobilvarianten eier DOM-fokus; bare den eksplisitte lukkeknappen lukker gruppen. Mobilgruppenes underoppføringer følger desktopens relative rekkefølge. |
| 2026-08-20 | App-shell har en separat compact/full-kontrakt: `APP_NARROW_DESKTOP_MAX_WIDTH = 1200`, full desktop-shell starter på `1201`. Intervallet `933–1200` beholder `PRESENTATION_MODE.DESKTOP`, men bruker `MobileDropDownTopBar`; PageTools og Glossary kan bruke canonical `DockedMobileBottomSheet` uten å bytte feature-presentasjon. |

---

## Arkitektur: lagdelt MVVM med manuell dependency injection

### Composition root

`dependencies.js` wirer applikasjonen ved oppstart. Modulen er ikke et runtime-ledd i dataflyten:

```text
dependencies.js
  ├── oppretter DataSources
  ├── oppretter Repositories
  ├── oppretter Use Cases
  └── leverer instansene til App og ViewModels
```

### Runtime-dataflyt

```text
DataSource → Repository → Use Case → ViewModel → Page → komponenter
```

Hvert lag har ett ansvar. Ingen lag hopper over et annet. Transportdata flyter gjennom modellagene til
ViewModelen, som eksponerer ferdige verdier og handlinger nedover gjennom View-hierarkiet.

---

## Gjenværende SSOT-gjeld og avgrensninger

SSOT-refaktoreringen har etablert stående kontrakter for navigasjon, Header, WorkspaceScaffold,
lasttilstand, i18n, app-brytpunkt, globale lag, søkenormalisering, shuffle, root error boundary og
de viktigste delte mobil-/søkemekanismene. Detaljert bevis, importører og testnavn ligger i
`docs/architecture/SSOT_REGISTER_FRONTEND.md`; SOUL-dokumentet gjentar ikke flyktige testtall.

Denne seksjonen er ikke en komplett teknisk gjeldsinventory. Eldre kode kan fortsatt bryte kodestil-
eller signaturregler, blant annet forbudet mot default-parametre og kravet om tabs. Slike avvik følger
migreringsregelen og registreres i målrettede patcher; de skal ikke feilaktig omtales som løst her.

### Faktisk SSOT-gjeld

Det finnes ingen åpen SSOT-gjeld for spørsmålstype-ID-er. `QUESTION_TYPES` brukes i de
dokumenterte typeavgjørelsene og kontrakten håndheves av `questionCardArchitecture`. Et globalt
`QUESTION_TYPE_REGISTRY` innføres fortsatt ikke før minst to moduler faktisk deler samme mapping.

### Bevisste avgrensninger

- **Semantiske farger:** Nye globale tokens opprettes bare når samme semantiske
  fargebeslutning faktisk deles av uavhengige komponenter. En hex-inventory er
  ikke i seg selv et SSOT-brudd.

### Observert overgangsgjeld uten anbefalt refaktorering nå

`AppNavigationViewModel` har noen gjentatte nullstillinger i `changeScreen`, `selectSubject`,
`selectFlipcardDeck`, `selectMatchCardsDeck` og `showAllSubjects`. Handlingene har ulik semantikk.
Et konkret utslag er at `selectFlipcardDeck(key)` setter `selectedTopicAreaKey`, mens
`changeScreen(NAV_SCREENS.FLIPCARDS)` beholder eksisterende verdi. `selectExam(examId)` håndhever
heller ikke `requiresSubject`; den bygger på at handlingen bare er nåbar fra en flyt med valgt fag.
Dette caller-premisset skal enten beholdes eksplisitt og testlåses sterkere, eller erstattes med en
subject-guard i en egen navigasjonspatch. Dagens eksplisitte callbacks er fortsatt lesbare og
karakteriseringstestet. Ikke flytt nullstillingene til generisk `clears`-metadata
på skjermnoder nå. Vurder en lokal next-state-modell først når overgangsreglene blir vesentlig flere
eller begynner å drive fra hverandre.

### Bevisst lokal policy

`ClerkAppProvider`, `AuthButton` og Statistics-grenen kan sjekke
`VITE_CLERK_PUBLISHABLE_KEY` lokalt ved sine egne rendergrenser. En triviell identisk boolsk sjekk
er ikke en ny SSOT-kandidat. Sentraliser først dersom validering, normalisering eller fallback-policy
blir mer kompleks.

---

## Lagene

### 1. Datasource-laget — `src/model/datasource/`

- Det eneste model-laget som kjenner transport: HTTP-endepunkter, headers og rå payloads
- Ingen forretningslogikk; returnerer parsede transportdata/DTO-er, aldri `Response`
- Brukerpreferanser i `localStorage` er et eksplisitt Context-unntak, ikke en DataSource
- Instansieres i `dependencies.js` — aldri andre steder
- Felles HTTP-mekanikk arves fra `DataSource`
- `ExamDataSource` og `ChapterTestDataSource` validerer den dokumenterte shared TestSet-shapen og sin egen scoped `testType` ved list/detail-boundaryen; kontraktbrudd kastes som teknisk DataSource-feil og filtreres eller normaliseres ikke bort

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
Page
  ↓
App-shell / feature-komponent
  ↓
Sammensatt komponent
  ↓
UI-primitive
```

En komponent kan komponere komponenter på samme eller lavere nivå. En generell
primitive skal aldri importere en feature-komponent, Page, ViewModel eller
model-laget. En feature-komponent skal ikke importere en Page eller en annen
features interne komponent bare for å gjenbruke implementasjon.

### UI-primitiver — atoms

En UI-primitive er en liten, domenefri byggestein.

Eksempler fra dagens kodebase:

```txt
LoadingSpinner
SearchField
FilterOptionList
ProgressBar
FormattedText
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
DockedMobileBottomSheet
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

### GlossaryPage / Fagnettverk

`useGlossaryPageViewModel()` eier glossary-feature-state og all GlossaryPage-spesifikk UI-mekanikk.
`expandedGlossaryEntryKey` er eneste expansion-state og sannhet om hvilket begrep som har aktiv detalj.
Nettverkslasting bruker canonical `useLoadModel()` og `glossaryNetworkDisplay` er en ren avledning av
expansion-key, load-status og data/error. `glossaryDetailPresentation`, bygget av
`createGlossaryDetailPresentation()`, er eneste presentasjonsmodell for begrepsdetaljen. Den konsumeres
av to flater: `GlossaryDetailModal` på desktop og expanded card i `GlossaryEntryCardList` på mobil.
`row.details` og en separat inline nettverksmodell finnes ikke; tabellmodellen avhenger ikke av
nettverkets load-status.

Desktop og mobil kan binde samme rene detaljmodell til ulik ViewModel-eid interaksjonspolicy når
produktadferden faktisk er ulik. Desktop graph/chip-navigasjon endrer ikke Search eller kapittelutvalg
og kan derfor vise «utenfor utvalget». Mobil beholder expanded-card-policyen, inkludert nødvendig
utvidelse av kapittelutvalget og mobil focus/scroll-policy. Dette er to bindinger over én modell, ikke
to konkurrerende detaljmodeller.

Rad-/disclosure-handlers, sorteringshandlinger, graph-navigasjon, kapittel-sheet open-state og
registrering av React-ref-er eies av ViewModelen. Imperativt fokus/scroll som er nødvendig for
tilgjengelig navigasjon utføres i ViewModelen via React-ref-er til elementer som React selv eier.
Glossary-komponentene mottar ferdige presentation models og callbacks, rendrer deklarativt og
oppretter ikke konkurrerende feature-state eller event-policy. De manipulerer heller ikke DOM-struktur
med `document`, `querySelector` eller `innerHTML`. Canonical delte mekanismer som Search og
`DockedMobileBottomSheet` beholder sitt dokumenterte interne eierskap. Mobilflaten er fortsatt expanded
card; eventuell overgang til modal/sheet på mobil er en separat produktbeslutning.

Glossary-kontrakten er fail-fast: alle `glossaryEntry.topicAreaKey` skal referere en kjent `topicArea`,
og brudd kaster i alle miljøer. `MASTERY_STATUS` og `GLOSSARY_RELATION_TYPE` er autoritative registre
for DTO-validering og presentasjonsmapping; ukjente enum-verdier kaster også etter boundary-validering.
Tekniske navn beskriver dataene: `directNeighborCount` er råverdien og `directNeighborLevel` er den
avledede visuelle kategorien. Produktlabelen «Viktighet» / «Importance» lever kun i i18n.

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

Deler komponentene bare visuell struktur, kan den strukturen trekkes ut når den har en
selvstendig, stabil kontrakt og reell gjenbruksverdi. Ellers beholdes lik lokal JSX.
Feature-komponentene forblir separate.

Eksempel:

```txt
DockedMobileBottomSheet
  ├── PageToolsMobileFooterSheet
  └── GlossaryMobileChapterSheet
```

`DockedMobileBottomSheet` eier sheet-struktur og geometri. Den mottar eksplisitte
`peekContent`-, `dockedOverlayContent`- og `expandedContent`-slots. Peeken er
alltid synlig. Docked-overlay-slotten plasserer interaktivt søk-/filterinnhold
over peeken uten å endre åpen-state. Expanded-slotten er skjult, `aria-hidden`
og `inert` når sheetet er docked, og synlig og scrollbart når sheetet er
åpent. Bare grip, chevron og drag endrer åpen-state. Feature-CSS overstyrer ikke interne
`.mobile-bottom-sheet-*`-selectors eller lokal collapsed-height.
`PageToolsMobileFooterSheet` eier sidehandlinger.
`GlossaryMobileChapterSheet` eier søk, filter og kapittelvalg.

### Prop-kontrakter per nivå

Prop-kontrakten blir mer konkret oppover i hierarkiet.

```jsx
<button type="button" onClick={onClick} disabled={disabled}>
	{label}
</button>
<SubjectPickerButton subjectName={subjectName} subjectCode={subjectCode} onOpenSubjectPicker={openSubjectPicker} />
```

En primitive mottar ikke et helt subject- eller question-objekt dersom den bare
trenger tekst, status og en callback. En feature-komponent mottar ikke hele
Page-ViewModel-objektet; den får feltene den faktisk bruker.

---

## Navigasjon — deklarativ policy, eksplisitte overganger, enkel rendering

Navigasjonen har tre avgrensede ansvar. De skal ikke blandes:

```text
src/navigation/navigation.js
  statisk, deklarativ policy og menydata

src/ui/viewmodel/AppNavigationViewModel.js
  runtime route-/selection-state, preconditions, nullstillinger,
  sideeffekter, overlays, språksynk og avledet chrome/back

src/App.jsx
  rendergrense: activeScreen → Page, med eksplisitte persistensunntak
```

### Statisk policy i `navigation.js`

`src/navigation/` består av én produksjonsfil. Den eksponerer:

```txt
NAV_SCREENS
SCREEN_CONFIG
getScreenConfig
LEARNING_CONTENT_TYPES
TEST_TYPES
NAV_ITEMS.sidebarItems
NAV_ITEMS.toggleButtonItems
NAV_ITEMS.mobileToggleEntryItems
NAV_ITEMS.mobileToggleButtonItems
NAV_ITEMS.popOutMenuItems
```

`SCREEN_CONFIG` har én node per skjerm. Hver node eier nøyaktig seks stabile egenskaper:

```js
[NAV_SCREENS.EXAM]: {
	requiresSubject: true,
	requiresExam: true,
	backTo: NAV_SCREENS.SELECT,
	showsSubjectSwitcher: true,
	pageClassName: "exam-page",
	shellClassName: "exam-shell"
}
```

- `requiresSubject` og `requiresExam` er deklarative guards som `changeScreen()` håndhever.
- `backTo` er deklarert tilbake-mål; faktisk resultat går gjennom målskjermens guards.
- `showsSubjectSwitcher`, `pageClassName` og `shellClassName` er app-chrome for skjermen.

`SCREEN_CONFIG` er SSOT for disse seks egenskapene, men ikke for all overgangssemantikk.
Dedikerte callback-preconditions, nullstillinger og sideeffekter eies av ViewModelen.

`getScreenConfig(screen)` er eneste produksjonsaksessor og kaster på ukjent skjerm. Ukjent skjerm
er en programmeringsfeil; stille fallback er forbudt.

`NAV_ITEMS` eier data for sidebar, seks desktopoppføringer, mobile underoppføringer, mobilgrupper og pop-out-menyer. Menydata er ikke runtime-state. `toggleButtonItems` låser rekkefølgen `Læringsti`, `Begrepsliste`, `Flipcards`, `Begrepsmatch`, `Kapitteltester`, `Eksamener`; `Læringsti` er deaktivert. `TEST_TYPES` eier `chapter-test` og `exam`; de to testoppføringene mapper begge til `LEARNING_CONTENT_TYPES.EXAMS`, og mobilgruppen gjenbruker dem. Glossarys dynamiske søk og kapittel-sheet hører fortsatt til Glossary-featuret, ikke til pop-out-registeret.

### Scoped TestSet-porter i `LearningContentSelectPageViewModel`

`useLearningContentSelectPageViewModel()` eier `selectedTestType`. Den eksisterende `selectContentType()`-handleren resolver både vanlige innholdstyper og testtypeoppføringene fra `navigation.js`, uavhengig av om valget kommer fra desktop eller mobil. `selectedTestType` velger den eksplisitt injiserte Exam- eller ChapterTest-use-case-porten; ViewModelen klassifiserer ikke returnerte DTO-er.

Backend eier ressursinvarianten: `/exams` returnerer bare Exams og `/chapter-tests` bare ChapterTests. Frontendens `ExamDataSource` og `ChapterTestDataSource` eier hver sin transportgrense og den delte DTO-shapen er dokumentert i `docs/architecture/SCOPED_TEST_SET_TRANSPORT_CONTRACT.md`. `filterTestSets()` eier bare lokal søk- og emneområdefiltrering etter at riktig scoped port er valgt.

`activeContentType` er fortsatt teknisk innholdstype. ViewModelen avleder både `desktopActiveEntryId` og `mobileActiveEntryId` fra `activeContentType` og `selectedTestType`, slik at riktig testtype markeres på begge presentasjonsflater uten en ny runtime-eier. Fagvalg åpner `NAV_SCREENS.GLOSSARY`; dermed er `Begrepsliste` den første aktive desktopoppføringen etter at et fag er valgt.

### Runtime-state og overganger i `AppNavigationViewModel`

Core route-/selection-state består av:

```txt
activeScreen
selectedSubjectId
selectedExamId
selectedTopicAreaKey
examLanguageSyncError
```

App-shell-presentasjon er komponert av to undermodeller:

```text
useMobileDropDownTopBarModel
  isMobileDropDownTopBarMenuOpen
  isMobileSubjectPickerOpen

useSettingsPresentationModel
  isSettingsPresentationOpen
  settingsPresentationMode
```

`closeNavigationOverlays()` er ett koordinasjonspunkt for settings, mobilmeny og subject-picker.
Route-handlinger validerer preconditions, oppdaterer relevante valg, setter skjerm og lukker overlays.
Mønsteret er bevisst eksplisitt; handlingene har ikke nødvendigvis samme nullstillingsregler.

`changeScreen(nextScreen)` er fellesinngangen for deklarative skjermbytter. Den:

1. henter målkonfigurasjon med `getScreenConfig`,
2. håndhever `requiresExam` og `requiresSubject`,
3. delegerer `SUBJECTS` til `showAllSubjects`,
4. nullstiller state etter den konkrete overgangssemantikken,
5. setter `activeScreen`,
6. lukker navigasjonsoverlays.

Dedikerte handlinger som `selectSubject`, `selectExam`, `selectFlipcardDeck`,
`selectMatchCardsDeck` og `showAllSubjects` eier sine egne preconditions og sideeffekter. En Page eller
feature-komponent skal ikke gjenskape disse reglene. En dedikert handling skal håndheve målskjermens
relevante guards, med mindre caller-reachability er en uttrykkelig og testlåst del av kontrakten.
Dagens `selectExam(examId)` er et dokumentert avvik fra denne regelen:
den validerer `examId`, men forutsetter at kalleren bare eksponerer handlingen
etter at fag er valgt. Avviket føres under observert overgangsgjeld.

`goBack()` leser aktiv skjerms `backTo`. `SUBJECTS` delegeres til `showAllSubjects`; andre mål går
gjennom `changeScreen` og får dermed målskjermens guards og nullstillinger.

### Språkdrevet eksamen-resynk

`useSyncSelectedExamWithLanguage` er den eneste route-utløseren som ikke starter med en direkte
brukerhandling. Ved språkbytte mens EXAM er aktiv kan den:

- oppdatere valgt eksamen og fag uten å lukke overlays,
- gå til SELECT med `examLanguageSyncError` når språkvarianten mangler,
- gå til SELECT med feiltekst når synk feiler.

Endringer i eksamens- eller språkflyten skal teste denne stien eksplisitt.

### Avledet chrome og `backContract`

ViewModelen leser aktiv `SCREEN_CONFIG` og avleder subject-switcher-synlighet, sideklasse,
shellklasse og om tilbakeknappen vises. Deretter bygges én `backContract`:

```js
const backContract = {
	showBackButton,
	backLabel: params.backLabel,
	navigationLabel: params.navigationLabel,
	onBack: goBack
};
```

`backContract` er en avledning, ikke en state-SSOT. Den er den felles kontrakten for rutetilbake i
Header og mobil app-shell. Settings har en separat lokal tilbakehandling når settings-presentasjonen
er åpen.

### Rendergrensen i `App.jsx`

`App.jsx` bruker `pageClassName` og `shellClassName` og mapper `activeScreen` til Page-wrapperne.
Den beregner ikke neste navigasjonsstate.

Betinget mounting er standard. `GlossaryPageWrapper` er et dokumentert unntak: den forblir
montert under skjermbytter og får `isActive`, slik at glossary-data og lokal state bevares når brukeren
forlater og går tilbake til Glossary. Nye persistensunntak krever et eksplisitt cache-/statebehov og test.

### Slik legger du til en ny skjerm

1. Legg skjerm-ID-en i `NAV_SCREENS`.
2. Legg en komplett node med de seks feltene i `SCREEN_CONFIG`.
3. Legg produkttekst i begge språk i `translations.js`.
4. Bruk `changeScreen()` dersom den generiske overgangen er nok. En dedikert callback skal håndheve
   målskjermens relevante guards og definere nullstillinger/sideeffekter eksplisitt, med mindre
   caller-reachability er en uttrykkelig og testlåst del av kontrakten.
5. Legg rendergrenen i `App.jsx`; bruk betinget mounting som standard.
6. Bygg Page med `WorkspaceScaffold`, `WorkspaceState` og canonical Header-kontrakt.
7. Legg eventuell direkte inngang i riktig del av `NAV_ITEMS`.
8. Utvid `navigation.test.js` og `AppNavigationViewModel.test.js` med config, guards, ugyldig state,
   overgangsresultat, back-utfall og eventuell persistens.

### Fallgruven ved `backTo`

`backTo` er ikke en ubetinget destinasjon. Målet går gjennom `changeScreen()` og målskjermens guards.
`OVERVIEW` kan være aktiv uten valgt fag, men har `SELECT` som tilbake-mål; siden SELECT krever fag,
kan tilbake fra OVERVIEW ende på SUBJECTS. Nye slike asymmetrier skal unngås eller låses med en
eksplisitt forventningstest. Den eksisterende OVERVIEW-asymmetrien er dokumentert, men
`backTo`-nåbarhet er foreløpig ikke testlåst som en generell invariant; dagens config-test verifiserer
bare at `backTo` peker på en gyldig skjerm-ID.

### Når dagens modell ikke lenger er nok

Ikke gjeninnfør dispatcher, action-typer, graf eller reducer for dagens flate skjermmodell. En tyngre lokal
overgangsmodell blir først aktuell når preconditions/nullstillinger driver fra hverandre, samme handling
kan gi flere mål basert på historisk state, guards må håndheves universelt, eller neste state bør beregnes
som én komplett verdi. Presspunktet er da ViewModelens next-state-beregning; `App.jsx` kan fortsatt
beholde enkel skjermmapping.

---

## App-shell — Header og Footer som canonical implementasjoner

`src/ui/view/components/Header/Header.jsx` og `Footer/Footer.jsx` er appens
canonical desktop-header og footer. De er delte strukturelle implementasjoner,
ikke runtime-state-SSOT-er.

- Tilbakeknappen rendres i Headerens leading-slot — aldri som en frittsvevende
  sideknapp.
- Sideeide verktøy monteres gjennom Header-kontrakten; siden eier data og
  handlinger, Header eier plassering og app-shell-struktur.
- Header monteres via `WorkspaceScaffold` sin `header`-slot som søsken til
  scrollflaten.
- Compact app-shell eies av `MobileDropDownTopBar`; desktop-Header skjules ved app-shell-grensen.
  Compact shell brukes både på ekte mobil og narrow desktop. Narrow desktop beholder
  `PRESENTATION_MODE.DESKTOP`; dette er chrome-responsivitet, ikke mobil feature-presentasjon.
- Footer monteres gjennom scaffoldets `footer`-slot når siden trenger den.

Forbudet gjelder scaffold-ansvar, ikke HTML-taggen. Semantiske `<header>`-elementer
inne i kort, artikler, dialoger og avgrensede innholdskomponenter er lovlig HTML.

Header-varianter er eksplisitte gjennom `appearance`, `layout` og slots. Side-CSS skal ikke skjule
header-policy gjennom descendant-overrides. `headerArchitecture` håndhever at alle hovedsider, også
Statistics, bruker den canonical Header-kontrakten.

---

## Workspace-arkitektur — ett scaffold, feature-eide innholdsflater

Workspace-reglene skiller mellom app-shell og innhold. En delt ytre ramme betyr ikke at alle kort inni
rammen skal ha samme primitive.

| Begrep | Ansvar | Eier |
|---|---|---|
| `WorkspaceScaffold` | Ytre arbeidsområde: shell, header/footer/overlay-slots og scrollflate | `components/WorkspaceScaffold/` + `style/WorkspaceScaffold/` |
| `WorkspaceState` | Rendring av loading/error/empty/content inni scaffoldet | `components/WorkspaceState/` |
| Feature-innholdsflate | Kort, tabell, deck eller dashboard med feature-spesifikk semantikk | Den konkrete feature-komponenten og dens CSS |
| `.workspace-card` | Navngitt lokal CSS-flate brukt av `QuestionCard` | `style/Shared/WorkSpaceCard/workspace-card.css` |
| Utvalgskort | Valgkort og panelkort i grids/dashboards | Konkrete SubjectSelect-/LearningContentSelect-komponenter; delte dimensjonstokens i `style/Shared/SelectionCard/` |

### WorkspaceScaffold

`WorkspaceScaffold` rendrer `<main>` og mottar denne eksplisitte kontrakten:

```txt
className
header
footer
overlay
scrollToTopRequestId
children
```

Det finnes ingen `contentClassName`-escape hatch. Side-spesifikk padding og indre layout ligger på
wrappere inne i `children`, ikke som en dynamisk klasse på scaffoldets body.

Komponenten eier:

```txt
.workspace-scaffold
.workspace-scaffold-header
.workspace-scaffold-body
.workspace-scaffold-footer-overlay
.workspace-scaffold-overlay
```

Regler:

- Alle hovedsider bruker `WorkspaceScaffold`.
- Header monteres i `header`-slotten som søsken til scrollflaten.
- Scaffoldet eier shell-geometri, isolasjon, border, radius, bakgrunn, skygge og backdrop-filter.
- `.workspace-scaffold-body` eier scrolling, overscroll, min-størrelser og scrollbar-kontrakt.
- Sideklasser kan sette dokumenterte scaffold-variabler og style egne barn, men redeklarerer ikke
  scaffoldets kjerneoppskrift.
- `scrollToTopRequestId === null` betyr ingen scroll-trigger.
- Nye sidevarianter uttrykkes med dokumenterte tokens/kontrakter, ikke ved å lære scaffoldet sidenavn.

### `.workspace-card` er ikke en app-bred komponent

`WorkSpaceCard.jsx` finnes ikke. `.workspace-card` er fortsatt en navngitt CSS-flate, men den brukes
bare av `QuestionCard` gjennom klassekomposisjon:

```jsx
className="workspace-card question-card"
```

Dette gir følgende regler:

- Ikke importer eller gjenopprett `<WorkSpaceCard/>` for nye konsumenter.
- Ikke behandle plasseringen under `style/Shared/` som bevis på at flaten er en canonical primitive.
- `QuestionCard` eier geometri, overflow, padding og indre layout; CSS-flaten leverer bare den
  dokumenterte flateoppskriften.
- Flipcard-faces og feature-eide utvalgskort beholder egne kontrakter. Delte dimensjonstokens gjør ikke utvalgskortene til én canonical komponentfamilie.
- En ny delt kortprimitive innføres først når minst to uavhengige konsumenter deler samme semantiske
  ansvar, prop-kontrakt, interaksjonsmodell og endringsårsak. Første patch skal oppdatere
  SSOT-registeret og få en stabil kontrakttest eller fokusert adferdstest når det gir verdi.

### Scaffold-arv i CSS

CSS har ikke klassearv. Scaffold-variasjon uttrykkes med multiklasse og deklarerte custom properties:

```html
<main class="workspace-scaffold exam-workspace">
```

Sideklassen kan sette dokumenterte `--workspace-scaffold-*`-/`--scaffold-*`-utvidelsespunkter og
eie egen geometri. Den redeklarerer ikke scaffoldets `border`, `background`, `box-shadow`,
`backdrop-filter`, `isolation` eller strukturelle `overflow`. Et nytt utvidelsespunkt opprettes i
eierfilen i samme patch som første reelle konsument; det opprettes ikke på forskudd.

---

## Lasttilstand — én teknisk status, én page-state-modell

Lasting, feil og suksess representeres ikke som boolean+nullable-par. Teknisk
ressursstatus og presentert page-state er to forskjellige nivåer.

### Teknisk ressursstatus

**Autoritative eiere**

- `src/ui/viewmodel/LoadState/loadStatus.js` — `LOAD_STATUS` med `LOADING`,
  `ERROR`, `READY`
- `src/ui/viewmodel/LoadState/useLoadModel.js` — generisk async-ressurs som
  eksponerer `{ status, data, error, reload }`

**Avledning**

- `src/ui/viewmodel/LoadState/combineLoadStatuses.js` — kombinerer flere
  ressursstatuser med prioritet `error > loading > ready`

`useLoadModel` holder stående data under reload etter første vellykkede last.
Teknisk `loadError` logges kun i dev. `error` som returneres til ViewModel er den
brukersikre produktteksten som ble sendt inn fra i18n.

### Page-state

**Autoritativ kontrakt**

- `src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js` — `WORKSPACE_STATE_KINDS`

**Avledning**

- `src/ui/viewmodel/WorkspaceState/createWorkspaceState.js`

**Canonical renderer**

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

- Page-ViewModel eksponerer `workspaceState`, ikke enkeltressursenes statuser.
- Page-View importerer ikke `LOAD_STATUS`.
- `WorkspaceState` er eneste page-level boundary for loading/error/empty/content.
- `state.action` er eksplisitt `null` eller `{ label, onAction }`.
- Loading/error/empty rendres inne i `WorkspaceScaffold`; app-shell forblir
  montert.
- Empty er en gyldig READY-presentasjon, ikke en teknisk feil.
- Content returnerer `children` uten et ekstra wrapperlag.
- Ukjente status-/kind-verdier kaster feil; de skjules ikke med defaults.

Alle hovedsider er migrert til denne modellen. `WorkspaceMessage`,
`pageStatus`, `pageErrorMessage` og lokale page-state-skall er ikke gjeldende
arkitektur og skal ikke gjeninnføres.

---

## Unidirectional data flow og state-plassering

Page- og forretningsstate eies av ViewModel. Delt infrastrukturstate eies av sin provider eller
app-shell-modell. Lokal, kortlivet interaksjonsstate eies nærmest mulig komponenttreet den påvirker.
State løftes bare høyt nok til at alle legitime konsumenter deler den.

Data flyter én vei: ViewModel → Page → komponenter → subkomponenter. Ingen komponent henter
forretningsdata selv.

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

`useContext` og providerbaserte SDK-hooks er tillatt for tekniske cross-cutting concerns som tema,
språk, innstillinger og autentiseringssession. Forretningsdata — spørsmål, svar og score — sendes som
props fra ViewModel, aldri via Context som en skjult databuss.

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
| DataSource | Felles `DataSource`, transportdata og plattform-API | Repository, Use Cases, ViewModel, View |
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

## Backend — DataSource er HTTP-grensen

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

`DataSource` eier:

- URL-sammensetting fra injisert base-URL,
- auth-header fra injisert token-funksjon,
- felles GET/POST-requestmekanikk,
- parsing av payload,
- avvisning av ikke-OK responses.

DataSource kjenner ikke Clerk. Den mottar `getToken` eksplisitt; dersom en kilde
kan være offentlig, sender wiring `null` eksplisitt.

### Canonical baseklasse for HTTP

```js
// src/model/datasource/DataSource.js
export default class DataSource {
	#baseUrl;
	#getToken;

	constructor({ baseUrl, getToken }) {
		if (!baseUrl) {
			throw new Error("DataSource requires baseUrl");
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
- Uventede render-feil håndteres av den canonical `AppErrorBoundary` ved app-roten. Den erstatter ikke normale page-load- eller action-feilkontrakter.

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
/* src/ui/style/QuestionCard/index.css */
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

### Workspace-CSS

`components/WorkspaceScaffold/` har canonical CSS under `style/WorkspaceScaffold/`. Side-CSS under
Page-mappene eier sideavvik, indre wrappers og geometri, men kopierer ikke scaffold-oppskriften.

`style/Shared/WorkSpaceCard/workspace-card.css` er et eksplisitt navne-/plasseringunntak etter at
React-wrapperen ble slettet. Filen eier den lokale `.workspace-card`-flaten som bare `QuestionCard`
bruker. Mappen skal ikke brukes som argument for å opprette nye konsumenter eller gjeninnføre en
komponentwrapper. En eventuell flytting/omdøping gjøres som en egen CSS-oppryddingspatch.

### Brytpunktene — synkroniserte JS/CSS-kontrakter

Appen har to separate responsive beslutninger fordi feature-presentasjon og app-shell ikke har samme
endringsårsak. CSS kan ikke lese JavaScript-konstanter direkte, så begge har synkroniserte tekniske
representasjoner:

- Feature-presentasjon:
  - JS: `APP_MOBILE_QUERY = "(max-width: 932px)"` i `src/ui/presentation/presentationMode.js`
  - CSS: `max-width: 932px` og den komplementære `min-width: 933px`
- App-shell:
  - JS: `APP_COMPACT_SHELL_QUERY = "(max-width: 1200px)"` i `src/ui/presentation/appShellMode.js`
  - CSS: `max-width: 1200px`; full desktop-shell starter på `1201px`

`933–1200px` er narrow desktop: featurekode ser fortsatt `PRESENTATION_MODE.DESKTOP`, mens chrome
bruker eksisterende `MobileDropDownTopBar`. PageTools og Glossary kan i dette intervallet bruke den canonical
`DockedMobileBottomSheet` uten å aktivere øvrige mobile feature-regler. `1200` er valgt som egen
app-shell-grense slik at eksisterende komponentlokale `1180px`-terskler fortsatt er lokale terskler.

Dette er synkroniserte kontrakter, ikke én fysisk SSOT. `appBreakpointContract` låser 932/933 og
1200/1201 og bruker en eksplisitt allowlist for lokale komponentterskler. Endres en appgrense, endres
JS, CSS og testen i samme patch. En CSS custom property kan ikke brukes i en media-query condition
og er ikke løsningen.

### Z-indeksskala — håndhevet global kontrakt

`Tokens.css` eier de globale `--z-*`-tokenene. `globalLayerPolicy` binder hver dokumenterte globale
deltaker til riktig token. Lokale stacking contexts, for eksempel interne lag i en avgrenset menu,
kan bruke lokale verdier når de ikke konkurrerer i appens globale lagstige.

### Stacking-fellen

`backdrop-filter` og `filter` gjør elementet til containing block for
`position: fixed`-etterkommere. Monter aldri `fixed`-elementer under en flate
med disse egenskapene — det er roten til hamburger- og verktøymeny-buggene.
Portaler (`createPortal`) er utveien for overlays.

---

## Hva hører hjemme hvor

| Spørsmål | Svar |
|---|---|
| Henter HTTP/transportdata | Konkret DataSource via `DataSource` |
| Validerer base-URL-er og wirer konkrete instanser | `dependencies.js` |
| Mapper DTO-er og kombinerer kilder til domeneobjekter | Repository |
| Beriker domeneobjekter med bilder | Repository |
| Forretningsregel med ett ansvar | Use Case |
| Sidetilstand, handlers og avledede presentasjonsverdier | Page-ViewModel |
| Gjenbrukbar async-lasting | `viewmodel/LoadState/useLoadModel` |
| Page-state-varianter | `WORKSPACE_STATE_KINDS` |
| Avledning av page-state | `createWorkspaceState` |
| Rendring av loading/error/empty/content | `WorkspaceState` |
| Domenespesifikk lastelogikk | Undermodell i `viewmodel/[Eier]/` |
| Statisk navigasjonskonfigurasjon | `navigation/navigation.js` |
| Runtime-navigasjon og eksplisitte handlinger | `AppNavigationViewModel` |
| Subject-switcher-presentasjon | `createSubjectSwitcherModel` via `SubjectSelectPageViewModel` |
| Desktop app-shell-header / footer | `components/Header/`, `components/Footer/` |
| Mobil app-shell | `components/Sidebar/MobileDropDownTopBar.jsx` |
| Mobil bottom-sheet-geometri | `components/MobileBottomSheet/DockedMobileBottomSheet.jsx` |
| Delt søkemekanikk | `components/Search/`; feature-ViewModel eier kandidater og filterpolicy |
| Root render-crash | `components/AppErrorBoundary/` |
| Ytre workspace-skall | `components/WorkspaceScaffold/` + `style/WorkspaceScaffold/` |
| Feature-innholdsflate | Den konkrete feature-komponenten og dens CSS; `.workspace-card` er kun QuestionCard sin lokale CSS-flate |
| Utvalgskort | De konkrete SubjectSelect-/LearningContentSelect-komponentene; delte dimensjonstokens ligger i `style/Shared/SelectionCard/` |
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

## React-idiomatisk kode — bruk React, ikke imperativ DOM-kode

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

Generiske navn brukes ikke når en mer presis domene- eller kontraktbetegnelse finnes. Tekniske navn
som `response`, `value` og `item` er tillatt når typen eller den generiske kontrakten gjør referenten
entydig. Uklare navn som `data`, `result`, `temp`, `res` og `cb` brukes ikke i domenekode; `content`,
`handler` og `helper` erstattes når ansvaret kan navngis mer presist.

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
- Arkitekturtester brukes når regelen kan uttrykkes stabilt uten å låse tilfeldige kildekodedetaljer: importgrenser, én canonical
  implementasjon, CSS-token-eierskap, screen-config, Header-kontrakt, i18n-paritet, globale lag,
  bottom-sheet/search-eierskap og breakpoint-drift. Når en slik test ikke gir verdi, brukes en fokusert
  adferdstest eller en eksplisitt begrunnelse.
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

En ny variant skal bare kreve endringer i eierne som faktisk har en beslutning om varianten. En ny
spørsmålstype kan derfor legitimt berøre domenegradering, transporttransformasjon, besvart-status,
presentasjon og layout når disse er selvstendige ansvar. Endringer i mange urelaterte eller parallelle
implementasjoner tyder på for høy kobling; endringer i flere selvstendige beslutningspunkter kan være
korrekte. Et globalt register innføres først når flere moduler faktisk deler samme mapping eller policy.

### Tidskompleksitet

Map/Set for oppslag, ikke lineærsøk i løkke. Men: eksamener har 15–30
spørsmål — prioriter lesbarhet, og optimaliser kun når datasettet er stort,
operasjonen ligger i en løkke, eller profilering viser faktisk treghet.

### Vedlikeholdbarhet

- Liten overraskelse — koden gjør det navnet sier
- Ingen skjult state — side-effekter er eksplisitte
- Delt policy, algoritme og kontrakt har én eier. Lik lokal kode kan beholdes når stedene beskytter
  ulike grenser og ikke deler en selvstendig beslutning.
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

> Start med tabellen over autoritative eiere. Bruk eksisterende SSOT/canonical implementasjon før du lager noe nytt.
> Låste beslutninger trumfer brødtekst. Oppdater SOUL og SSOT-registeret i samme arkitekturpatch.
> DataSource kjenner transport. Repository mapper til domene. Use Case eier én regel.
> `dependencies.js` eier runtime-konfigurasjon og konkret wiring; `DataSource` eier requestmekanikk.
> Page- og forretningsstate eies bak ViewModelens kontraktpunkt; provider-state og lokal interaksjonsstate har egne avgrensede eiere.
> Komponenter følger pragmatisk Atomic Design; Page komponerer app-shell/feature, som komponerer lavere nivåer.
> Page forgrener og fordeler ferdige modeller. Komponenter mottar og rendrer.
> `navigation.js` eier skjerm-ID-er, seks config-felt og menydata. `AppNavigationViewModel` eier runtime-state og overganger. `App.jsx` rendrer.
> Legg til skjerm som config-node + eventuell eksplisitt overgang + rendergren; ikke innfør graf/reducer uten reelt press.
> Header/Footer er canonical app-shell. WorkspaceScaffold eier ytre shell og scroll.
> `.workspace-card` er bare `QuestionCard` sin lokale CSS-flate; det finnes ingen `WorkSpaceCard`-komponent.
> `LOAD_STATUS` og `useLoadModel` eier teknisk lastestatus. `WORKSPACE_STATE_KINDS` er page-state-kontrakten; `createWorkspaceState` avleder og `WorkspaceState` rendrer.
> Subject-switcher avledes én gang. Ingen falske fagobjekter; `empty` og `unselected` er ulike.
> Search, DockedMobileBottomSheet, ProgressBar/Pager og FormattedText gjenbrukes gjennom sine canonical kontrakter.
> CSS-mapper speiler normalt komponentmapper; det gamle WorkSpaceCard-stylenavnet er et dokumentert unntak.
> Feature-brytpunktet 932/933, app-shell-brytpunktet 1200/1201 og globale `--z-*`-lag er testlåste kontrakter.
> Tabs. Horisontale imports/signaturer. Ingen valgfrie parametre i `src/`.
> Objekt over fire parametre. To kjedede transformasjoner blir løkke.
> KISS: sentraliser reell policy og delt semantikk, ikke enhver lik linje eller lik overflate.
> Ingenting i View henter forretningsdata selv.

## Implementert LearningPath-kontrakt — 2026-07-29

`LearningPathPage` og `LearningSessionPage` har hver sin Page-ViewModel. Bare Page mottar hele `viewModel`; featurekomponentene mottar ferdige modeller og callbacks. `QuestionCard` brukes gjennom canonical fasade med eksplisitt React-`key` fra `currentQuestionRenderKey`. Frontend bruker `sessionQuestionId` som øktidentitet og inneholder ingen selection-, mastery- eller gradingpolicy som konkurrerer med backend.

LearningPath- og LearningSession-frontenden klassifiserer aldri assessment-prosent. Backend sender `performanceBand`, repository-grensen validerer kontrakten, og ViewModels/React konsumerer bandet direkte. `=== 100` er tillatt som ren perfekt-score-presentasjon, men er ikke et assessment-threshold. Delte assessment-farger eies av `Tokens.css` gjennom `--assessment-*`.

For authored LearningPath-sessions er backend `isStartable` eneste startautoritet. Frontend kan avlede `isSelectable = session.isStartable`, men skal aldri rekonstruere starttillatelse fra `status`, completion eller lokal rekkefølge. Targeted starts sender eksplisitt intent til backend; aktiv økt-konflikt vises som valg mellom å fortsette aktiv økt eller eksplisitt forkaste den.

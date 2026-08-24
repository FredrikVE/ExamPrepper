<!--docs/architecture/SSOT_REGISTER_FRONTEND.md-->
# SSOT-register — ExamPrepper frontend

Oppdatert: 2026-08-24
Type: dokumentasjon / evidensregister
Registerbase: `examprepper-frontend-safe-20260823-182809.zip`
Registerstatus: statisk revisjon mot snapshot; ingen produksjonskode er endret i denne dokumentrevisjonen

## Formål

Register over hva som faktisk eier state, policy, canonical implementasjoner og stylingkontrakter i det navngitte frontend-snapshotet. Normative kontrakter kommer fra SOUL; dette dokumentet viser evidens, åpen drift, akseptert lokal policy og gjeld mot den konkrete kodebasen — ikke mot minnet om tidligere tilstander.

Dokumentet skiller fire roller, fordi «SSOT» ellers blir synonymt med «gjenbrukt kode»:

- **Autoritative registre og runtime-SSOT** — én eier per policy eller state.
- **Canonical implementasjoner** — eneste implementasjon av en delt UI-flate eller infrastrukturmekanisme; eier implementasjonen, ikke autoritativ state eller policy.
- **Delte utilities og avledninger** — konverterer input til resultat; eier ingenting.
- **CSS- og token-eiere** — eier styling-kontrakter.

Listen over canonical implementasjoner dekker de viktigste delte flatene og mekanismene, ikke hver enkelt. Den er kuratert, ikke uttømmende.

Registeret skiller mellom normativ kontrakt og faktisk implementasjonsstatus. Statusverdier brukes slik:

- **GREEN** — statisk evidens i gjeldende snapshot samsvarer med kontrakten.
- **DRIFT** — kontrakten er kjent, men gjeldende kode avviker.
- **DEBT** — implementasjonen kan være funksjonell, men evidens/testmekanismen eller eierskapet har dokumentert vedlikeholdsgjeld.
- **UNVERIFIED** — revisjonen har ikke nok runtime-/testbevis til å klassifisere som GREEN.

Et normativt utsagn fra SOUL skal aldri føres som «implementert» her dersom snapshotet viser drift.

## Base og verifisering

```txt
Snapshot:                  examprepper-frontend-safe-20260823-182809.zip
Zip sha256:                fd1f0911a1ff347c69b72a45864577071b49b1223945f162d9c526576c86f581
Zip commit:                ikke inkludert i snapshotet; ikke utledet
Filer:                     896
JS/JSX i src/ + test/:     640
Jest-testfiler:            189
Arkitekturtestfiler:       35
Tester som leser src-kode: 53
```

Verifisering i denne registerrevisjonen:

- Snapshotet er skannet statisk for filinventar, testinventar og LearningPath-kontraktene som omtales under.
- LearningPath action-modell, Page-ViewModel og tilhørende testmønstre er kontrollert mot den opplastede backend-/frontend-analysen.
- Full Jest-suite og Vite-build er **ikke** kjørt i denne dokumentrevisjonen. Ingen gammel grønn teststatus gjenbrukes.
- Antall tester eller arkitekturtester er ikke et kvalitetsmål. Arkitekturtester vurderes etter om de håndhever en stabil dependency-/policy-invariant uten implementation coupling.

## Notasjon

```txt
<X/>   React-komponent      X{}    konstant-map / enum
useX() hook                 class X klasse
X()    ren funksjon         --x:   CSS custom property
```

---

## Status for denne revisjonen

Denne revisjonen re-baserer evidensregisteret mot snapshotet fra 2026-08-23 og skiller eksplisitt mellom kontrakt og faktisk status.

De viktigste åpne avvikene er:

| ID | Område | Status | Evidens / avvik |
|---|---|---|---|
| LP-01 | LearningPath action precedence | **UNVERIFIED** | Implementasjonen er korrigert til `resumableSession → nextActivity → replay → ingen action`, og en direkte behavior-probe bekrefter precedence-fiksen. Full Jest/build er ikke verifisert i denne patchen fordi dependency-installasjon ikke fullførte i miljøet. |
| LP-02 | LearningPath auth-precondition | **UNVERIFIED** | `session.isStartable` forblir backend-eid læringspolicy, mens `canStartLearningSessions` nå er en separat auth/runtime-precondition for start-actions og handleren har defense-in-depth. Full Jest/build er ikke verifisert i miljøet. |
| LP-05 | Resume question position | **DRIFT** | Frontend kan presentere «fra oppgave X», mens backendens persistente active-session-summary ikke gir en reelt oppdatert question-position i dagens implementasjon. |
| TEST-01 | Architecture/source-test inventory | **DEBT** | Snapshotet har 35 arkitekturtester og 53 tester som leser produksjonssource direkte. Audit viser både legitime dependency-gater og implementation-detail-/migreringstester som skal ryddes inkrementelt. |

## Autoritative registre og runtime-SSOT

Én autoritet eier hver beslutning. Dette er kjernen av «SSOT» — ikke gjenbrukt kode, men eneste kilde for en policy eller state.

| Komponent | SSOT for | Fil | Evidens / enforcement |
|---|---|---|---|
| `useAppNavigationViewModel()` | Core route-/selection-state (`activeScreen`, tre valg-id-er, språksynk-feil) + route-handlingene | `viewmodel/AppNavigationViewModel.js` | Eneste eier av core route-state. Komponerer mobile/settings-undermodellene og bygger avledede chrome-/back-kontrakter |
| `useMobileDropDownTopBarModel()` | Mobilmeny- og subject-picker-state | `viewmodel/AppNavigation/useMobileDropDownTopBarModel.js` | Eneste eier av de to mobile overlay-state-verdiene; komponeres av `useAppNavigationViewModel()` |
| `useSettingsPresentationModel()` | Settings-presentasjonens open-state og modus | `viewmodel/AppNavigation/useSettingsPresentationModel.js` | Eneste eier av de to settings-state-verdiene; sheet/sidebar følger app-shell-modus og settings lukkes ved shell-mode-bytte |
| `NAV_SCREENS{}` `SCREEN_CONFIG{}` `getScreenConfig()` | Skjerm-ID-er, seks deklarative skjermegenskaper, deklarert tilbake-mål og chrome | `src/navigation/navigation.js` | `getScreenConfig` er produksjonsaksessoren og kaster på ukjent skjerm. Låst av `navigation.test.js` + `AppNavigationViewModel.test.js` |
| `NAV_ITEMS{}` `LEARNING_CONTENT_TYPES{}` `TEST_TYPES{}` | Sidebar, seks desktopvalg, mobilgrupper, testtypeoppføringer, pop-out-menyer og stabile identiteter | `src/navigation/navigation.js` | `toggleButtonItems` eier desktoprekkefølgen `Læringsti`, `Begrepsliste`, `Flipcards`, `Begrepsmatch`, `Kapitteltester`, `Eksamener`. `Læringsti` er deklarert deaktivert. De to testoppføringene peker til `LEARNING_CONTENT_TYPES.EXAMS` med hver sin `testType`; mobilgruppen `Tester` gjenbruker dem |
| `WORKSPACE_STATE_KINDS{}` | Page-state-unionen (loading/error/empty/content) | `viewmodel/WorkspaceState/` | (`createWorkspaceState()` er avledningen — se «utilities») |
| `LOAD_STATUS{}` `useLoadModel()` | Ressursstatus-enum + reaktiv innlastingstilstand | `viewmodel/LoadState/` | (`combineLoadStatuses()` er avledningen — se «utilities») |
| `useGlossaryPageViewModel()` | Glossary feature-state og GlossaryPage-spesifikk UI-mekanikk: søk, kapittelutvalg, sortering, mobile chapter-sheet open-state og eneste expansion-state `expandedGlossaryEntryKey`; teknisk nettverksstatus eies fortsatt av `useLoadModel()` | `src/ui/viewmodel/GlossaryPageViewModel.js` | Eneste offentlige kontrakt mot View. Kan komponere private hooks under `viewmodel/GlossaryPage/`, men re-eksponerer navngitte felter. Eier rad/disclosure-handlers, desktop/mobile graph-bindinger, React-ref-registrering og focus/scroll-intent. `glossaryDetailPresentation` er én ren detaljmodell med desktop modal og mobil expanded card som to konsumenter |
| `MASTERY_STATUS{}` `GLOSSARY_RELATION_TYPE{}` | Autoritative enum-verdier for Glossary mastery og relasjonstyper | `src/constants/GlossaryContracts.js` | `GlossaryDataSource` validerer mot registrene; mastery-/network-presentasjon mapper de samme verdiene og kaster på ukjent verdi |
| `createGlossaryDetailPresentation()` | Eneste presentasjonsmodell for begrepsdetalj | `src/ui/viewmodel/GlossaryPage/glossaryDetailModel.js` | Konsumeres av desktop `GlossaryDetailModal` og mobil expanded card. Tabellrader eier ikke detalj-/nettverksmodell |
| `translations{}` `LANGUAGES{}` | Autoritativt språkregister og produkttekst | `src/i18n/translations.js` | `i18nContract` låser NO↔EN-paritet, typeparitet, ikke-tomme verdier og navigasjonens tekstnøkler. Lokale `fallbackLabel`-kanaler er fjernet; testen skanner ikke all JSX for hardkodet tekst |
| `<LanguageProvider/>` `useLanguage()` | Aktivt språk + språkbytte (runtime) | `src/i18n/LanguageContext.jsx` | Én provider. Eier reaktiv språk-state; registeret over er den statiske teksten |
| `<ThemeProvider/>` `useTheme()` | Aktivt tema + DOM-klassen `.dark` | `ui/theme/ThemeContext.jsx` | Én provider, reaktiv theme-state |
| `<SettingsProvider/>` `useSettings()` | Aktive brukerinnstillinger | `ui/settings/SettingsContext.jsx` | Én provider, reaktiv settings-state |
| `AuthTokenProvider`-modulen (`setAuthTokenProvider()` `getActiveAuthToken()`) | Aktiv token-henter for transportlaget | `src/auth/AuthTokenProvider.js` | Modulglobal bro — ikke en React-provider. Injiseres i datakildene via `dependencies.js` |
| `QUESTION_TYPES{}` | Spørsmålstype-ID-er | `src/constants/QuestionTypes.js` | Autoritativt register brukt av `QuestionCard`, grading og API-transformasjon. Rå typeavgjørelser i `QuestionCard` og `transformAnswersForApi.js` avvises av `questionCardArchitecture` |
| `QUESTION_CONFIG{}` | Konfigurasjonsgrenser for spørsmålstyper (i dag: `FILL_MAX_LENGTH`) | `src/constants/QuestionConfig.js` | Egen fil, egen beslutning — ikke type-ID-er |
| `PRESENTATION_MODE{}` `APP_MOBILE_MAX_WIDTH` `usePresentationMode()` | Mobil/desktop feature-presentasjon + breakpoint-tall | `ui/presentation/` | `932`/`933` låst av `appBreakpointContract`; narrow desktop forblir `PRESENTATION_MODE.DESKTOP` |
| `APP_SHELL_MODE{}` `APP_NARROW_DESKTOP_MAX_WIDTH` `APP_FULL_DESKTOP_MIN_WIDTH` `APP_COMPACT_SHELL_QUERY` `useAppShellMode()` | Compact/full app-shell + shell-breakpoint | `ui/presentation/` | `1200`/`1201` låst av `appBreakpointContract`; compact shell bruker `MobileDropDownTopBar`, og PageTools/Glossary kan bruke canonical `DockedMobileBottomSheet` på narrow desktop uten å gjøre feature-presentasjonen mobil |
| `dependencies{}` | Manuell DI — eneste sted som leser `VITE_API_BASE_URL` og wirer datakilder | `src/di/dependencies.js` | Eneste instansieringssted. Leser appens base-URL og injiserer den i hver `DataSource` |
| `ALL_TOPIC_AREAS` `findTopicAreaByKey()` | Emneområde-filtrering | `model/domain/utils/topicAreaFilters.js` | Brukes på tvers av feature-filtrering |
| Backend `performanceBand` | Assessment-klassifisering for LearningSession og LearningPath | `LearningPathRepository` validerer; ViewModels konsumerer | Frontend har ingen 40/55/80-klassifisering; `=== 100` er kun perfekt-score-presentasjon |
| Backend `isStartable` | Om en authored LearningPath-økt kan velges/startes | `LearningPathRepository` → `createLearningPathSessionModel` | `isSelectable` er direkte avledet fra `session.isStartable`, aldri roadmap-status |
| LearningPath read-cache | Brukerspesifikk in-memory deduplisering av `getLearningPath` | `LearningPathRepository` | Privat Promise-`Map` per `subjectId + language`; tømmes ved LearningSession-mutations, lagret Exam/ChapterTest-attempt og via repositoryets `clearUserState()` ved auth-provider-bytte. Ingen TTL og ingen cachekontrakt i UI-laget |
| `--assessment-*` | Delte semantiske assessment-farger | `src/ui/style/Tokens.css` | LearningSession- og LearningPath-CSS konsumerer de samme tokenene |

## Canonical implementasjoner

Eier rendering, struktur, styling eller en delt infrastrukturmekanisme — ikke autoritativ state eller policy. «Kanonisk» betyr én implementasjon av kontrakten, ikke SSOT i streng forstand. Der en renderer har en tilhørende presentasjonsavledning, er begge listet med rolle.

| Komponent | Eier | Fil | Bruk |
|---|---|---|---|
| `<WorkspaceScaffold/>` | Sidestillas | `components/WorkspaceScaffold/` | Hovedsidene bruker scaffoldet; dependency-/content-kontrakten håndheves av relevante arkitekturgater |
| `<WorkspaceState/>` | Rendring av page-state | `components/WorkspaceState/` | 7 importører |
| `<Header/>` + slot-komponenter | Scaffold-header, struktur og utseende | `components/Header/` | Alle 7 sider, Statistics inkludert. `headerArchitecture` krever at hver side velger appearance, layout og slots eksplisitt |
| `<Footer/>` | Footer-skall | `components/Footer/` | Direkte av `SubjectSelectPage` og `LearningContentSelectPage`; komponert av `<GlossaryFooter/>` |
| `<ProgressBar/>` (renderer) + `buildProgressBarModel()` (presentasjonsavledning) | Lineær fremdrift | `components/Shared/ProgressBar/` | Direkte importører: `MobileDropDownTopBar`, `ExamPage`, `MatchCardsPage` |
| `<ProgressPager/>` (renderer) + `createProgressPagerEntries()` (presentasjonsavledning) | Punkt/side-paginering | `components/ProgressPager/` | `ExamFooter`, `FlipcardsStudySurface`, `FlipcardsMobileFooterSheet` |
| `<ToggleButtonRow/>` | Responsiv innholdstypevelger og variantvalg | `components/ToggleButtonRow/` | Én offentlig fasade brukt av `LearningContentHeader`; desktop beholder tablist-kontrakten. Eksisterende `LearningContentSelectPageViewModel` eier mobilens åpne gruppe slik at disclosure-state overlever route-bytte til Begrepsliste; mobilvarianten eier DOM-fokus og kan bare lukke gruppen via den eksplisitte lukkeknappen. Låst av `toggleButtonRowArchitecture`, mobilkontrakttest og hook-test |
| `<FormattedText/>` (renderer) + `createFormattedTextSegments()` (presentasjonsavledning) | Tekst-rendering | `components/Shared/FormattedText.jsx` | Delt renderer brukt på tvers av flere features |
| `<QuestionCard/>` | Spørsmålsflate, valg av oppgaverenderer, oppgaveinteraksjon og feedback | `components/QuestionCard/QuestionCard.jsx` | Offentlig fasade for `ExamPage`, `LearningSessionPage` og andre læringsmoduser. Interne `QuestionTypes` importeres ikke direkte utenfra; låst av `questionCardArchitecture` |
| `<DockedMobileBottomSheet/>` | Mobil bottom-sheet-geometri (docked/expanded, drag, grip, inert) | `components/MobileBottomSheet/` | 3 feature-konsumenter: `PageToolsMobileFooterSheet`, `FlipcardsMobileFooterSheet`, `GlossaryMobileChapterSheet` |
| `<DesktopPopOutMenu/>` | Desktop pop-out-struktur og lagmekanikk | `components/DesktopPopOutMenu/` | PageTools- og Flipcards-verktøymenyene |
| Search-familien (`<SearchField/>` m.fl.) | Søkefelt, filter, backdrop, forslag | `components/Search/` | Delt av SubjectSelect, LearningContentSelect, Glossary |
| `<ToolCardGrid/>` `<ToolCard/>` | Verktøykort-flate | `components/ToolCard/` | PageTools + Flipcards |
| `<AppErrorBoundary/>` | Root render-crash-grense | `components/AppErrorBoundary/` | Rot-nivå recovery |
| `class DataSource` | Canonical HTTP-transportbase (URL-bygging, fetch, auth-header, JSON, feilmapping) | `model/datasource/DataSource.js` | Alle konkrete datakilder arver. Eier **ikke** base-URL — den injiseres fra `dependencies.js` |

### Eierskap for spørsmål og øktflyt

| Beslutning / kontrakt | Eier | Konsumenter |
|---|---|---|
| Oppgavetype-ID-er | `QUESTION_TYPES` | `QuestionCard`, grading, API-transformasjon |
| Valg av oppgaverenderer | `QuestionCard` og `getQuestionViewState()` | Alle læringsmoduser gjennom `QuestionCard.jsx` |
| Oppgaveinteraksjon og feedback | `QuestionCard/QuestionTypes` og `QuestionCard/Shared/Feedback` | `ExamPage`, `LearningSessionPage` |
| Øktflyt, svarstate, rettingstidspunkt, fremdrift og navigasjon | Den enkelte læringsmodus | Ikke `QuestionCard` |

`ExamPage` og `LearningSessionPage` er konsumenter, ikke eiere. Læringsmoduser stopper ved fasaden og innfører
ikke egne oppgaverenderere eller modusflagg i `QuestionCard`.

## Delte utilities og avledninger

| Komponent | Gjør | Fil | Konsumenter |
|---|---|---|---|
| `backContract` | Avleder rutenavigasjonens tilbake-UI fra aktiv `SCREEN_CONFIG`, labels og `goBack()` | `viewmodel/AppNavigationViewModel.js` | Ett konstruksjonssted og én kontraktform; ny objektverdi per render. Sendes til page-VM-er, Header og `MobileDropDownTopBar`. Settings har en separat lokal tilbakehandling |
| `createWorkspaceState()` | Avleder page-state fra load-status, empty-status og labels | `viewmodel/WorkspaceState/` | Eier ingen state; konverterer input til resultat |
| `combineLoadStatuses()` | Avleder samlet status fra flere ressursstatuser | `viewmodel/LoadState/combineLoadStatuses.js` | Ren avledning |
| `normalizeSearchTerm()` | Søkenormalisering | `viewmodel/Utils/normalizeSearchTerm.js` | Flere feature-konsumenter |
| `shuffleInPlace(items, randomNumber)` | Fisher-Yates med injisert RNG | `viewmodel/Utils/shuffleInPlace.js` | `answerOptionOrder`, `matchCardsSlots`, `matchCardsSession` og `flipcardDeckToolState`. `Math.random` sendes inn, ikke gjentatt |

## CSS- og token-eiere

| Eier | Kontrakt | Fil | Evidens / enforcement |
|---|---|---|---|
| `:root{}` `--space-*` `--z-*` | Designtokens og lagstige | `style/Tokens.css` | Global-lag låst av `globalLayerPolicy` |
| `--scaffold-header-height` `--scaffold-inset` | Scaffoldets geometri-hooks | `style/WorkspaceScaffold/workspace-scaffold.css` | Erklært på `.workspace-scaffold`, null fallbacks. Låst av `scaffoldTokenOwnership` |
| `workspace-card` (CSS) | Navngitt kort-flate | `style/Shared/WorkSpaceCard/workspace-card.css` | Brukes av **kun `QuestionCard`**. React-wrapperen `WorkSpaceCard.jsx` er slettet i patch 41; CSS-klassen beholdes som lokal kortflate, ikke dokumentert app-bred canonical primitive |

---

## Historikk og lukkede migreringer

Detaljert migreringshistorikk, slettede filnavn og tidligere patchnummer hører hjemme i git/changelog, ikke som permanente negative kontrakter i evidensregisteret.

Registeret beholder bare gjeldende eier, kontrakt, enforcement og åpen drift. En negativ test er stående evidens bare når den uttrykker et permanent kategori-/dependency-forbud; «gammel fil X må fortsatt ikke finnes» er ikke i seg selv en arkitekturinvariant.

## Åpen SSOT-gjeld

| I dag | Foreslått | Hvor spredt | Omfang |
|---|---|---|---|
| Gjentatt semantisk fargeverdi brukt av flere uavhengige komponenter | Semantisk `Tokens.css`-variabel — men bare ved dokumentert gjenbruk | Utgangspunkt: 93 hex-forekomster i 22 CSS-filer utenfor `Tokens.css`. Dette er inventory, ikke 93 brudd — lokale paletter, grafserier og dekorative bakgrunner er legitime | opportunistisk |

Et **globalt `QUESTION_TYPE_REGISTRY`** anbefales derimot ikke nå. Filene som forgrener på type håndterer ulike beslutninger — presentasjon, besvart-status, randomisering, layout, transportformat, domenegradering. Ett register som samler dem ville koblet transport til layout til domeneadferd, og blitt en større code smell enn dagens avgrensede funksjoner. Innfør et register først når to eller flere moduler faktisk deler samme mapping.

**Navigasjonsnullstillingene** er flyttet til «Observert gjeld uten anbefalt tiltak» under — de hører ikke hjemme her, siden ingen refaktorering anbefales.

---

## Observert gjeld uten anbefalt tiltak

Duplisering som er reell, men der riktig beslutning ved dagens omfang er å la den stå.

| Observasjon | Status |
|---|---|
| Inline nullstillingsregler og caller-forutsetning i `AppNavigationViewModel` | `changeScreen(FLIPCARDS)` beholder emneområdet mens `selectFlipcardDeck(key)` setter det. `selectExam(examId)` håndhever ikke `requiresSubject`, men forutsetter at kalleren bare eksponerer handlingen etter valgt fag. Dagens eksplisitte callbacks er lesbare, men caller-premisset bør enten testlåses sterkere eller erstattes med en subject-guard i en egen navigasjonspatch. Ikke innfør generisk `clears`-metadata nå; vurder en lokal next-state-modell først når overgangslogikken vokser betydelig |

---

## Bevisst lokal policy — ikke SSOT-kandidat nå

Gjentatt kode som med vilje *ikke* er sentralisert, dokumentert her så en senere SSOT-gjennomgang ikke feilflagger den.

| Observasjon | Beslutning |
|---|---|
| `ClerkAppProvider`, `AuthButton` og Statistics-grenen i `App.jsx` sjekker `VITE_CLERK_PUBLISHABLE_KEY` lokalt (3 steder) | Beholdes. Hvert sted beskytter sin egen rendergrense, og regelen er en identisk, triviell boolsk sjekk uten delt validerings-, normaliserings- eller fallback-policy. `AUTH_CONFIG` eller en `isClerkConfigured()`-helper innføres først dersom regelen faktisk blir mer kompleks eller begynner å drifte. Samsvarer med dokumentets SSOT-definisjon: én autoritet per reell policy, ikke sentralisering av enhver gjentatt linje |

---

## Test-evidens

Arkitekturtestenes verdi vurderes etter invariant, ikke antall filer.

**Stående negative regler kan for eksempel være:**

- View importerer ikke DataSource/Repository/Use Case direkte.
- model-laget importerer ikke ui-laget.
- frontend implementerer ikke lokale assessment-thresholds når backend eier klassifiseringen.
- private feature-submoduler importeres ikke utenfor eiergrensen.

**Ikke stående arkitekturevidens:**

- helper-/variabelnavn,
- nøyaktige JSX-snutter,
- CSS-bredder som bare beskriver dagens prototype,
- gamle filnavn eller komponenter som ble slettet i en tidligere migrering.

Når en source-basert test er eneste dekning av viktig behavior, etableres behavior-/kontraktsdekning før testen fjernes.

---

## Hvordan navigasjonen fungerer

Navigasjonens eierskap er delt i to lag, med `App.jsx` som en separat rendergrense:

```text
src/navigation/navigation.js
  statisk, deklarativ policy
  NAV_SCREENS, SCREEN_CONFIG, getScreenConfig, NAV_ITEMS, LEARNING_CONTENT_TYPES, TEST_TYPES

src/ui/viewmodel/AppNavigationViewModel.js
  core route-/selection-state: useState × 5
  mobile topbar-state: useMobileDropDownTopBarModel (useState × 2)
  settings-state: useSettingsPresentationModel (useState × 2)
  route-handlinger, språksynk og avledede chrome-/back-kontrakter

src/App.jsx
  rendergrense: activeScreen → Page, med eksplisitte persistensunntak
```

### Statisk, deklarativ policy (`navigation.js`)

`SCREEN_CONFIG` har én node per skjerm i `NAV_SCREENS`. Hver node eier seks deklarative egenskaper — og bare disse:

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

Betydningen er:

- `requiresSubject` / `requiresExam`: deklarative krav som `changeScreen()` håndhever.
- `backTo`: deklarert tilbake-mål. Faktisk utfall går gjennom målskjermens guards.
- `showsSubjectSwitcher`, `pageClassName`, `shellClassName`: app-chrome for skjermen.

`SCREEN_CONFIG` er dermed SSOT for disse seks egenskapene, men **ikke** for all overgangssemantikk. Preconditions i dedikerte callbacks, nullstillinger og sideeffekter eies fortsatt av ViewModelen.

`getScreenConfig(screen)` er produksjonsaksessoren. Den kaster på ukjent skjerm i stedet for å falle tilbake stille, fordi en ukjent skjerm er en programmeringsfeil.

`NAV_ITEMS` eier navigasjonsdata, ikke runtime-state: `sidebarItems`, `toggleButtonItems`, `mobileToggleEntryItems`, `mobileToggleButtonItems` og `popOutMenuItems`. Hver oppføring i `toggleButtonItems` har eksplisitt `contentTypeId` og `testType`; fravær uttrykkes med `null`, ikke ved at feltet utelates. `TEST_TYPES` eier klassifikasjonene `chapter-test` og `exam`. Desktoprekkefølgen er `Læringsti`, `Begrepsliste`, `Flipcards`, `Begrepsmatch`, `Kapitteltester`, `Eksamener`. Mobilgruppen `Øve` følger samme relative rekkefølge: `Begrepsliste`, `Flipcards`, `Begrepsmatch`; `Tester` følger `Kapitteltester`, `Eksamener`. `Læringsti` har ingen innholdstype eller target og er deaktivert. `Kapitteltester` og `Eksamener` peker begge til `LEARNING_CONTENT_TYPES.EXAMS`, og mobilgruppen `Tester` gjenbruker de samme testoppføringene. `mobileToggleEntryItems` er tom og beholdes kun som et eksplisitt utvidelsespunkt for fremtidige mobile-only oppføringer. Det opprettes ingen ny skjerm eller læringsinnholdstype.

### Scoped TestSet-porter på læringsinnholdssiden

`useLearningContentSelectPageViewModel()` eier `selectedTestType`. Den eksisterende `selectContentType()`-handleren resolver de fem aktive desktopoppføringene og de samme oppføringene når de brukes i mobilgruppen; den deaktiverte `Læringsti`-oppføringen ignoreres. `selectedTestType` velger eksplisitt mellom de injiserte `getAvailableExamsUseCase`- og `getAvailableChapterTestsUseCase`-portene. Returnerte DTO-er klassifiseres ikke på nytt i frontend; `filterTestSets()` filtrerer bare søk og emneområde.

Backend eier type-renheten i ressursene: `/exams` returnerer Exams og `/chapter-tests` returnerer ChapterTests. `ExamDataSource` og `ChapterTestDataSource` eier bare sine respektive HTTP-endepunkter og sender transportresponsen videre uten et parallelt frontend-schema eller ny klassifisering.

`activeContentType` forblir den tekniske innholdstypen. ViewModelen avleder `desktopActiveEntryId` og `mobileActiveEntryId` fra `activeContentType` og `selectedTestType`, slik at både desktopknappen og den åpne mobilgruppen markerer riktig valg uten å opprette en ny innholdstype. Den samme ViewModelen eier `expandedMobileToggleButtonGroupId` som ordinær `useState`; state er ikke erstattet av et objekt eller flyttet inn i presentasjonskomponenten. App sender den komplette, påkrevde kontrakten videre til Glossary-ruten, slik at valg av en utvidet knapp ikke lukker gruppen. Ingen av feltene har defaultverdier eller fallback. Bare mobilradens eksplisitte lukkeknapp kaller `closeMobileToggleButtonGroup()`. Når brukeren velger et fag, åpner `AppNavigationViewModel` `NAV_SCREENS.GLOSSARY`, slik at `Begrepsliste` er valgt som første aktive læringsflate.

### Runtime-state og overganger (`AppNavigationViewModel`)

Core route-/selection-state består av fem direkte state-verdier:

```js
activeScreen
selectedSubjectId
selectedExamId
selectedTopicAreaKey
examLanguageSyncError
```

App-shell-presentasjon eies i tillegg av to lokale undermodeller:

```text
useMobileDropDownTopBarModel
  isMobileDropDownTopBarMenuOpen
  isMobileSubjectPickerOpen

useSettingsPresentationModel
  isSettingsPresentationOpen
  settingsPresentationMode
```

`closeNavigationOverlays()` samler lukking av settings, mobilmeny og mobil subject-picker.

De fleste brukerinitierte route-overgangene følger samme overordnede sekvens: valider preconditions, oppdater relevante valg, sett skjerm og lukk overlays. Mønsteret er ikke identisk; hver callback eier egne preconditions og nullstillingsregler, mens `goBack()` og språksynk er egne varianter.

`changeScreen(nextScreen)` er fellesinngangen for deklarative skjermbytter. Den leser guards fra config, men nullstillingsreglene er hardkodet etter skjermnavn:

```js
const changeScreen = useCallback((nextScreen) => {
	const nextScreenConfig = getScreenConfig(nextScreen);

	if (nextScreenConfig.requiresExam && !selectedExamId) return;
	if (nextScreenConfig.requiresSubject && !selectedSubjectId) {
		showAllSubjects();
		return;
	}
	if (nextScreen === NAV_SCREENS.SUBJECTS) {
		showAllSubjects();
		return;
	}

	setExamLanguageSyncError(null);
	if (nextScreen !== NAV_SCREENS.EXAM) setSelectedExamId(null);
	if (nextScreen === NAV_SCREENS.SELECT || nextScreen === NAV_SCREENS.GLOSSARY) {
		setSelectedTopicAreaKey(null);
	}

	setActiveScreen(nextScreen);
	closeNavigationOverlays();
}, [closeNavigationOverlays, selectedExamId, selectedSubjectId, showAllSubjects]);
```

De dedikerte handlingene (`selectSubject`, `selectExam`, `selectFlipcardDeck`, `selectMatchCardsDeck`, `showAllSubjects`) håndhever sin egen overgang. Eksempel: `selectExam` vokter `!examId`, men re-validerer ikke `requiresSubject`; den stoler på at kalleren bare tilbys etter at fag er valgt.

Det finnes også en konkret overgangsdivergens: `selectFlipcardDeck(key)` setter `selectedTopicAreaKey`, mens `changeScreen(FLIPCARDS)` beholder eksisterende verdi. Dette er ufarlig med dagens kallere, men viser hvorfor inline-nullstillinger er dokumentert som overgangsgjeld.

`goBack()` slår opp aktiv skjerms `backTo`. `SUBJECTS` delegeres til `showAllSubjects()`; andre mål sendes gjennom `changeScreen()`, og får dermed målskjermens guards og nullstillinger.

### Delsystem: språkdrevet eksamen-resynk

`useSyncSelectedExamWithLanguage` kjører ved siden av de manuelle overgangene. Når språk faktisk endres mens EXAM er aktiv og en eksamen er valgt, forsøker hooken å finne språkekvivalenten:

```text
onExamResolved
  oppdaterer selectedExamId og selectedSubjectId uten å lukke overlays

onExamUnavailable
  går til SELECT og setter examLanguageSyncError

onExamSyncFailed
  går til SELECT og setter examLanguageSyncError
```

Dette er den eneste route-utløseren som ikke starter med en direkte brukerhandling. Endringer i språk- eller eksamenshåndtering må derfor vurdere denne stien eksplisitt.

### Avledet chrome og tilbakekontrakt

ViewModelen leser aktiv config og avleder:

```js
const activeScreenConfig = getScreenConfig(activeScreen);
const shouldShowSubjectSwitcher = activeScreenConfig.showsSubjectSwitcher;
const pageClassName = activeScreenConfig.pageClassName;
const shellClassName = activeScreenConfig.shellClassName;
const showBackButton = activeScreenConfig.backTo !== null;

const backContract = {
	showBackButton,
	backLabel: params.backLabel,
	navigationLabel: params.navigationLabel,
	onBack: goBack
};
```

`backContract` er ikke en egen SSOT. Det er en avledet app-shell-kontrakt med ett konstruksjonssted og én form; en ny objektverdi opprettes per render. Den er den felles kontrakten for **rutenavigasjonens** tilbakehandling. Settings-presentasjonen har en separat lokal tilbakehandling som `MobileDropDownTopBar` velger når settings er åpen.

### Rendergrensen (`App.jsx`)

`App.jsx` bruker `pageClassName` / `shellClassName` og mapper `activeScreen` til hovedflater. De fleste Pages monteres betinget:

```jsx
{activeScreen === NAV_SCREENS.EXAM && <ExamPageWrapper />}
{activeScreen === NAV_SCREENS.FLIPCARDS && <FlipcardsPageWrapper />}
```

`GlossaryPageWrapper` er det dokumenterte unntaket: den er persistent montert og får `isActive`. Det bevarer Glossary-data og lokal state mellom skjermbytter. Betinget mounting er standard; persistent mounting skal bare brukes når bevart state eller cache er et eksplisitt krav.

Handlingene (`selectExam`, `selectFlipcardDeck`, `changeScreen`, osv.) sendes ned som props. `App.jsx` eier render-mappingen, ikke beregningen av neste state.

## Slik legger du til en ny skjerm

Eksempel: en ny `SUMMARY`-skjerm som krever valgt fag.

1. **`NAV_SCREENS`** — legg til `SUMMARY: "summary"`.
2. **`SCREEN_CONFIG`** — legg til de seks deklarative egenskapene. Dette er eneste sted disse seks egenskapene defineres; overgangspreconditions og nullstillinger hører fortsatt hjemme i ViewModelen.
   ```js
   [NAV_SCREENS.SUMMARY]: {
	   requiresSubject: true,
	   requiresExam: false,
	   backTo: NAV_SCREENS.SELECT,
	   showsSubjectSwitcher: true,
	   pageClassName: "exam-select-page",
	   shellClassName: "exam-select-shell"
   }
   ```
   Chrome-klassene er inline strenger. Gjenbruk en eksisterende kombinasjon med mindre skjermen trenger et nytt utseende; samsvaret er konvensjon, ikke en kompilatorgaranti.
3. **i18n** — legg til tekstnøkler i begge språk i `translations.js`.
4. **ViewModel** — bruk `changeScreen(NAV_SCREENS.SUMMARY)` dersom det er nok. Ved en dedikert callback:
   - håndhev målskjermens `requiresSubject` / `requiresExam`, eller deleger selve skjermbyttet gjennom `changeScreen()`;
   - et caller-reachability-unntak må være uttrykkelig og testlåst; dagens `selectExam` er dokumentert overgangsgjeld fordi den forutsetter valgt fag hos kalleren;
   - definer callbackens nullstillinger og sideeffekter eksplisitt;
   - test at ugyldig state ikke kan aktivere skjermen.
5. **`App.jsx`** — legg til rendergrenen og send inn nødvendige handlinger. Bruk betinget mounting som standard; bruk persistent mounting med `isActive` bare ved dokumentert behov.
6. **Page** — bygg på `<WorkspaceScaffold/>`, `<WorkspaceState/>` og `<Header/>` etter den eksisterende page-kontrakten.
7. **Meny, valgfritt** — legg oppføringen i riktig del av `NAV_ITEMS` dersom skjermen skal være direkte tilgjengelig derfra.
8. **Tester** — utvid `navigation.test.js` og `AppNavigationViewModel.test.js` med config, guards, ugyldig state, overgangsresultat og eventuell persistens.

### Fallgruve ved `backTo`

`goBack()` sender ikke direkte til `backTo`; målet går gjennom `changeScreen()` og målskjermens guards. `OVERVIEW` kan nås uten valgt fag, men peker til `SELECT`, som krever fag. Tilbake fra OVERVIEW uten valgt fag ender derfor på SUBJECTS via guarden.

`navigation.test.js` låser allerede config-kompletthet, felttyper, gyldige skjermreferanser og at ukjent skjerm kaster. Den identifiserte luken er **nåbarhet/forventet redirect for `backTo`**. Nye asymmetrier bør enten unngås eller låses med en eksplisitt test; en generell «må ikke være strengere»-regel kan ikke legges inn uten å håndtere dagens OVERVIEW-unntak.

Du trenger fortsatt ingen dispatcher, action-typer eller adapter. Legg til deklarativ skjermdata, en overgang bare når nødvendig, og en rendergren.

## Hvor grensen for dagens design går

Den flate modellen passer dagens omfang: sju skjermer, enkle deklarative guards og overgangsregler som fortsatt er lesbare som eksplisitte callbacks.

En tyngre overgangsmodell blir først berettiget når én eller flere av disse oppstår:

- nullstillings- og precondition-reglene blir mange nok til at dedikerte callbacks driver fra hverandre;
- samme handling kan gi flere mulige mål basert på ekstern eller historisk state;
- deklarative guards må håndheves universelt på tvers av alle innganger;
- neste state må beregnes og testes som én komplett verdi fremfor flere imperative settere.

Det er da `AppNavigationViewModel` og next-state-beregningen som først blir presset. `App.jsx` kan fortsatt beholde enkel `activeScreen`-mapping så lenge overgangsmodellen produserer én aktiv skjerm.

Til da: deklarativ skjermpolicy i `navigation.js`, eksplisitte overganger i ViewModelen og rendering i `App.jsx`. Utvid ved å legge til en node og en gren, ikke ved å innføre et rammeverk.

## LearningPath — eierskap og faktisk status 2026-08-24

| Ansvar | Autoritativ eier | Status | Evidens / avvik i snapshot |
|---|---|---|---|
| LearningPath-sidepolicy | `useLearningPathPageViewModel` | **GREEN** | Page-ViewModel er offentlig kontrakt mot LearningPath-siden. |
| LearningSession-state og UI-mekanikk | `useLearningSessionPageViewModel` + `sessionReducer` | **GREEN** | LearningSession eier øktflyt og svarstate; `QuestionCard` er renderer/interaksjonskapabilitet. |
| Transport og mapping | `LearningPathDataSource` + `LearningPathRepository` | **GREEN** | Transport/mapping er avgrenset fra ViewModel/View. |
| Spørsmålsrendring | canonical `QuestionCard` | **GREEN** | `LearningSessionPage` bruker den delte fasaden. |
| Sessionidentitet i frontend | `sessionQuestionId` | **GREEN** | Brukes som frontend-identitet for session-spørsmål. |
| Navigasjon | `navigation.js` + `AppNavigationViewModel` | **GREEN** | Statisk policy og runtime-navigasjon har separate eiere. |
| Assessment-band | Backend `performanceBand` | **GREEN** | Frontend validerer/presenterer uten lokale 40/55/80-thresholds. |
| Authored startpolicy | Backend `isStartable` | **UNVERIFIED (LP-02)** | `isSelectable` avledes fortsatt direkte fra `session.isStartable`; authenticated start er nå en separat `canStartLearningSessions`-precondition i actionflyten. Full Jest/build gjenstår før GREEN. |
| LearningPath completion | Backend `isComplete` for module/section | **GREEN** | Frontend skal ikke rekonstruere completion fra counts eller prosent. |
| ChapterTest-resultat | Backend `performancePercent` + `performanceBand` | **GREEN** | Frontend presenterer backend-resultatet uten lokal scoreklassifisering. |
| Module replay | Backend `isReplayAvailable` | **UNVERIFIED (LP-01)** | Replay er flyttet til fallback etter et samtidig backend-eid `nextActivity`; full Jest/build gjenstår før GREEN. |
| Neste LearningPath-aktivitet | Backend `nextActivity` | **UNVERIFIED (LP-01)** | Action-builderen prioriterer nå backendvalget foran replay; full Jest/build gjenstår før GREEN. |
| Action precedence | Backend-signaler + frontend-orchestrering | **UNVERIFIED (LP-01)** | Implementasjonen følger nå den normative kontrakten `resumableSession → nextActivity → explicit replay → ingen action`; full Jest/build gjenstår før GREEN. |
| Aktiv LearningSession-navigasjon | Backend `resumableSession` / konfliktens `activeSessionId` | **GREEN** | ViewModel gjenopptar aktiv økt direkte og bruker conflict-id som defensiv fallback. |
| Resume question-position | Backend active-session-summary | **DRIFT (LP-05)** | Frontendcopy kan uttrykke en konkret question-position som dagens backend ikke persisterer reelt utover startverdien. |
| Assessment-farger | `Tokens.css` via `--assessment-*` | **GREEN** | LearningPath/LearningSession bruker delte semantiske tokens. |

### Action precedence som skal verifiseres etter patch 01

```text
1. resumableSession
2. nextActivity for aktuell modul
3. explicit replay når nextActivity ikke velger aktivitet
4. ingen start-action
```

### Auth-precondition som skal verifiseres etter patch 02

```text
isStartable
= backend-eid læringspolicy

isLoaded / isSignedIn
= separat frontend runtime-precondition for authenticated mutation
```

Registeret oppdateres fra `DRIFT` til `GREEN` først når den aktuelle patchen er implementert og verifisert mot den navngitte snapshot-/commit-basen.

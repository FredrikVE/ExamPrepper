# SSOT-register — ExamPrepper frontend

Oppdatert: 2026-07-26
Type: dokumentasjon / analyse
Analysert snapshot: `examprepper-frontend-safe-20260726-145114.zip` (inkluderer patch 41)

## Formål

Register over hva som faktisk er single source of truth i frontenden nå, hva som fortsatt burde vært det, og hvilke SSOT-funn fra forrige runde som er lukket — sett mot kodegrunnlaget og den eksplisitt oppførte patchen, ikke mot minnet om tidligere tilstander.

Dokumentet skiller fire roller, fordi «SSOT» ellers blir synonymt med «gjenbrukt kode»:

- **Autoritative registre og runtime-SSOT** — én eier per policy eller state.
- **Canonical implementasjoner** — eneste implementasjon av en delt UI-flate eller infrastrukturmekanisme; eier implementasjonen, ikke autoritativ state eller policy.
- **Delte utilities og avledninger** — konverterer input til resultat; eier ingenting.
- **CSS- og token-eiere** — eier styling-kontrakter.

Listen over canonical implementasjoner dekker de viktigste delte flatene og mekanismene, ikke hver enkelt. Den er kuratert, ikke uttømmende.

## Base og verifisering

```txt
Snapshot:      examprepper-frontend-safe-20260726-145114.zip
sha256:        bcb0a2b5e9ccd8c3630612bf99cde39e9c564d56d212419ffa9ea0769560b0df
Filer:         702
JS/JSX:        475 i src/ + test/
Jest-filer:    114

Snapshotet inkluderer patch 41:
- WorkSpaceCard.jsx finnes ikke.
- Null JS/JSX-importer eller <WorkSpaceCard>-bruk gjenstår.
- workspace-card.css og QuestionCard sin direkte .workspace-card-bruk er beholdt.

Verifisering for denne registerrevisjonen:
- Statisk kontroll av filtre, WorkSpaceCard-fravær og workspace-card-konsumenter.
- Registerinnholdet bygger på post-patch-41-inventaren, der base-snapshotet hadde
  648 beståtte / 9 hoppede tester i 113 suites før patchen.
- Full Jest-suite, Vite-build og device-QA er ikke kjørt på nytt i denne dokumentrevisjonen.
```

## Notasjon

```txt
<X/>   React-komponent      X{}    konstant-map / enum
useX() hook                 class X klasse
X()    ren funksjon         --x:   CSS custom property
```

---

## Den store endringen siden forrige runde

Hele `src/navigation/` er kollapset til **én fil**: `navigation.js` (230 linjer). `navGraph.js`, `navItems.js`, `pageTools.js` og `learningContent.js` finnes ikke lenger. Overgangsfunksjonene (`resolveNavigation`, `resolveScreenEntry`, `resolveBackNavigation`, hele reducer-sporet) er borte.

Navigasjonen er nå ren **data + ett oppslag**:

- `NAV_SCREENS{}` — de sju skjermene
- `SCREEN_CONFIG{}` — én node per skjerm med `requiresSubject`, `requiresExam`, `backTo`, `showsSubjectSwitcher`, `pageClassName`, `shellClassName`
- `getScreenConfig()` — eneste funksjon; **kaster** på ukjent skjerm i stedet for å falle tilbake stille
- `LEARNING_CONTENT_TYPES{}`, `TEST_TYPES{}`, `NAV_ITEMS{}` (sidebar, seks desktopvalg, mobilgrupper, testtypeoppføringer og pop-out-menyer)

Overgangslogikken bor nå i `AppNavigationViewModel` som eksplisitte `useState`-settere. Det er en bevisst retningsendring — se «Vurdering» til slutt.

---

## Autoritative registre og runtime-SSOT

Én autoritet eier hver beslutning. Dette er kjernen av «SSOT» — ikke gjenbrukt kode, men eneste kilde for en policy eller state.

| Komponent | SSOT for | Fil | Bevis |
|---|---|---|---|
| `useAppNavigationViewModel()` | Core route-/selection-state (`activeScreen`, tre valg-id-er, språksynk-feil) + route-handlingene | `viewmodel/AppNavigationViewModel.js` | Eneste eier av core route-state. Komponerer mobile/settings-undermodellene og bygger avledede chrome-/back-kontrakter |
| `useMobileDropDownTopBarModel()` | Mobilmeny- og subject-picker-state | `viewmodel/AppNavigation/useMobileDropDownTopBarModel.js` | Eneste eier av de to mobile overlay-state-verdiene; komponeres av `useAppNavigationViewModel()` |
| `useSettingsPresentationModel()` | Settings-presentasjonens open-state og modus | `viewmodel/AppNavigation/useSettingsPresentationModel.js` | Eneste eier av de to settings-state-verdiene; lukker settings ved presentation-mode-bytte |
| `NAV_SCREENS{}` `SCREEN_CONFIG{}` `getScreenConfig()` | Skjerm-ID-er, seks deklarative skjermegenskaper, deklarert tilbake-mål og chrome | `src/navigation/navigation.js` | 10 importører. `getScreenConfig` er produksjonsaksessoren og kaster på ukjent skjerm. Låst av `navigation.test.js` + `AppNavigationViewModel.test.js` |
| `NAV_ITEMS{}` `LEARNING_CONTENT_TYPES{}` `TEST_TYPES{}` | Sidebar, seks desktopvalg, mobilgrupper, testtypeoppføringer, pop-out-menyer og stabile identiteter | `src/navigation/navigation.js` | `toggleButtonItems` eier desktoprekkefølgen `Læringsti`, `Begrepsliste`, `Flipcards`, `Begrepsmatch`, `Kapitteltester`, `Eksamener`. `Læringsti` er deklarert deaktivert. De to testoppføringene peker til `LEARNING_CONTENT_TYPES.EXAMS` med hver sin `testType`; mobilgruppen `Tester` gjenbruker dem |
| `WORKSPACE_STATE_KINDS{}` | Page-state-unionen (loading/error/empty/content) | `viewmodel/WorkspaceState/` | 7 importører. (`createWorkspaceState()` er avledningen — se «utilities») |
| `LOAD_STATUS{}` `useLoadModel()` | Ressursstatus-enum + reaktiv innlastingstilstand | `viewmodel/LoadState/` | `LOAD_STATUS`: 6 importører. `useLoadModel`: 7. (`combineLoadStatuses()` er avledningen — se «utilities») |
| `translations{}` `LANGUAGES{}` | Autoritativt språkregister og produkttekst | `src/i18n/translations.js` | 20 importører. `i18nContract` låser NO↔EN-paritet, typeparitet, ikke-tomme verdier og navigasjonens tekstnøkler. Lokale `fallbackLabel`-kanaler er fjernet; testen skanner ikke all JSX for hardkodet tekst |
| `<LanguageProvider/>` `useLanguage()` | Aktivt språk + språkbytte (runtime) | `src/i18n/LanguageContext.jsx` | Én provider. Eier reaktiv språk-state; registeret over er den statiske teksten |
| `<ThemeProvider/>` `useTheme()` | Aktivt tema + DOM-klassen `.dark` | `ui/theme/ThemeContext.jsx` | Én provider, reaktiv theme-state |
| `<SettingsProvider/>` `useSettings()` | Aktive brukerinnstillinger | `ui/settings/SettingsContext.jsx` | Én provider, reaktiv settings-state |
| `AuthTokenProvider`-modulen (`setAuthTokenProvider()` `getActiveAuthToken()`) | Aktiv token-henter for transportlaget | `src/auth/AuthTokenProvider.js` | Modulglobal bro — ikke en React-provider. Injiseres i datakildene via `dependencies.js` |
| `QUESTION_TYPES{}` | Spørsmålstype-ID-er | `src/constants/QuestionTypes.js` | Tiltenkt autoritativt register — men fem direkte strengsammenligninger (`"single"`/`"multi"`/`"fill"`) omgår det fortsatt, se «burde vært SSOT». Ikke fullt håndhevet ennå |
| `QUESTION_CONFIG{}` | Konfigurasjonsgrenser for spørsmålstyper (i dag: `FILL_MAX_LENGTH`) | `src/constants/QuestionConfig.js` | Egen fil, egen beslutning — ikke type-ID-er |
| `PRESENTATION_MODE{}` `APP_MOBILE_MAX_WIDTH` `usePresentationMode()` | Mobil/desktop-modus + breakpoint-tall | `ui/presentation/` | 7 importører. `932`/`933` låst av `appBreakpointContract` |
| `dependencies{}` | Manuell DI — eneste sted som leser `VITE_API_BASE_URL` og wirer datakilder | `src/di/dependencies.js` | Eneste instansieringssted. Leser appens base-URL og injiserer den i hver `ApiDataSource` |
| `ALL_TOPIC_AREAS` `findTopicAreaByKey()` | Emneområde-filtrering | `model/domain/utils/topicAreaFilters.js` | 10 importører |

## Canonical implementasjoner

Eier rendering, struktur, styling eller en delt infrastrukturmekanisme — ikke autoritativ state eller policy. «Kanonisk» betyr én implementasjon av kontrakten, ikke SSOT i streng forstand. Der en renderer har en tilhørende presentasjonsavledning, er begge listet med rolle.

| Komponent | Eier | Fil | Bruk |
|---|---|---|---|
| `<WorkspaceScaffold/>` | Sidestillas | `components/WorkspaceScaffold/` | Alle 7 sider. Låst av `workspaceArchitecture` + `workspaceContentContract` |
| `<WorkspaceState/>` | Rendring av page-state | `components/WorkspaceState/` | 7 importører |
| `<Header/>` + slot-komponenter | Scaffold-header, struktur og utseende | `components/Header/` | Alle 7 sider, Statistics inkludert. `headerArchitecture` krever at hver side velger appearance, layout og slots eksplisitt |
| `<Footer/>` | Footer-skall | `components/Footer/` | Direkte av `SubjectSelectPage` og `LearningContentSelectPage`; komponert av `<GlossaryFooter/>` |
| `<ProgressBar/>` (renderer) + `buildProgressBarModel()` (presentasjonsavledning) | Lineær fremdrift | `components/Shared/ProgressBar/` | Direkte importører: `MobileDropDownTopBar`, `ExamPage`, `MatchCardsPage` |
| `<ProgressPager/>` (renderer) + `createProgressPagerEntries()` (presentasjonsavledning) | Punkt/side-paginering | `components/ProgressPager/` | `ExamFooter`, `FlipcardsStudySurface`, `FlipcardsMobileFooterSheet` |
| `<ToggleButtonRow/>` | Responsiv innholdstypevelger og variantvalg | `components/ToggleButtonRow/` | Én offentlig fasade brukt av `LearningContentHeader`; desktop beholder tablist-kontrakten, mobil eier lokal disclosure/Escape/fokus og aktiverer første enabled gruppe-entry når ingen gruppe-entry allerede er aktiv. Låst av `toggleButtonRowArchitecture` og hook-test |
| `<FormattedText/>` (renderer) + `createFormattedTextSegments()` (presentasjonsavledning) | Tekst-rendering | `components/Shared/FormattedText.jsx` | 40 importører — mest delte fil |
| `<DockedMobileBottomSheet/>` | Mobil bottom-sheet-geometri (docked/expanded, drag, grip, inert) | `components/MobileBottomSheet/` | 3 feature-konsumenter: `PageToolsMobileFooterSheet`, `FlipcardsMobileFooterSheet`, `GlossaryMobileChapterSheet` |
| `<DesktopPopOutMenu/>` | Desktop pop-out-struktur og lagmekanikk | `components/DesktopPopOutMenu/` | PageTools- og Flipcards-verktøymenyene |
| Search-familien (`<SearchField/>` m.fl.) | Søkefelt, filter, backdrop, forslag | `components/Search/` | Delt av SubjectSelect, LearningContentSelect, Glossary |
| `<ToolCardGrid/>` `<ToolCard/>` | Verktøykort-flate | `components/ToolCard/` | PageTools + Flipcards |
| `<AppErrorBoundary/>` | Root render-crash-grense | `components/AppErrorBoundary/` | Rot-nivå recovery |
| `class ApiDataSource` | Canonical HTTP-transportbase (URL-bygging, fetch, auth-header, JSON, feilmapping) | `model/datasource/ApiDataSource.js` | Alle 5 datakilder arver. Eier **ikke** base-URL — den injiseres fra `dependencies.js` |

## Delte utilities og avledninger

| Komponent | Gjør | Fil | Konsumenter |
|---|---|---|---|
| `backContract` | Avleder rutenavigasjonens tilbake-UI fra aktiv `SCREEN_CONFIG`, labels og `goBack()` | `viewmodel/AppNavigationViewModel.js` | Ett konstruksjonssted og én kontraktform; ny objektverdi per render. Sendes til page-VM-er, Header og `MobileDropDownTopBar`. Settings har en separat lokal tilbakehandling |
| `createWorkspaceState()` | Avleder page-state fra load-status, empty-status og labels | `viewmodel/WorkspaceState/` | 7 — eier ingen state, konverterer input til resultat |
| `combineLoadStatuses()` | Avleder samlet status fra flere ressursstatuser | `viewmodel/LoadState/combineLoadStatuses.js` | 5 — ren avledning |
| `normalizeSearchTerm()` | Søkenormalisering | `viewmodel/Utils/normalizeSearchTerm.js` | 5 produksjonsimportører |
| `shuffleInPlace(items, randomNumber)` | Fisher-Yates med injisert RNG | `viewmodel/Utils/shuffleInPlace.js` | 4 moduler: `answerOptionOrder`, `matchCardsSlots`, `matchCardsSession`, `flipcardDeckToolState`. `Math.random` sendes inn, ikke gjentatt |

## CSS- og token-eiere

| Eier | Kontrakt | Fil | Bevis |
|---|---|---|---|
| `:root{}` `--space-*` `--z-*` | Designtokens og lagstige | `style/Tokens.css` | Global-lag låst av `globalLayerPolicy` |
| `--scaffold-header-height` `--scaffold-inset` | Scaffoldets geometri-hooks | `style/WorkspaceScaffold/workspace-scaffold.css` | Erklært på `.workspace-scaffold`, null fallbacks. Låst av `scaffoldTokenOwnership` |
| `workspace-card` (CSS) | Navngitt kort-flate | `style/Shared/WorkSpaceCard/workspace-card.css` | Brukes av **kun `QuestionCard`**. React-wrapperen `WorkSpaceCard.jsx` er slettet i patch 41; CSS-klassen beholdes som lokal kortflate, ikke dokumentert app-bred canonical primitive |

---

## Lukket siden forrige runde

Forrige inventory hadde disse i «burde vært SSOT». De er nå løst — de fleste med en håndhevende test:

| Tidligere funn | Status nå |
|---|---|
| `shouldShowSubjectSwitcher` som `||`-kjede i ViewModel | Flyttet til `SCREEN_CONFIG.showsSubjectSwitcher` |
| Søkenormalisering duplisert i 4 moduler | `normalizeSearchTerm()` |
| Tre shuffle-implementasjoner | Én `shuffleInPlace` med injisert RNG |
| `--scaffold-*` udefinert / feil eier | Erklært på scaffoldet, låst av test |
| Header-varianter som per-side-CSS | `headerArchitecture`-test krever eksplisitt appearance/layout/slots; MatchCards-reglene ute av `progress-bar.css` |
| Breakpoint 932 spredt uten kilde | `appBreakpointContract` med allowlist for lokale terskler |
| z-index uten lagstige | `globalLayerPolicy` binder hver global deltaker til et token |
| `fallbackLabel`-kanaler ved siden av i18n | `i18nContract` avviser lokale fallback-kanaler |
| Navigasjonens resolver/reducer-oppblåsning | Hele resolver-sporet slettet; `navigation.js` er ren data |
| Ubrukt `WorkSpaceCard.jsx`-wrapper | React-komponenten er slettet i patch 41. `workspace-card.css` og `QuestionCard` sin direkte klassebruk er beholdt |

Arkitektur-testmappen gikk fra 2 til 11 filer. Det er den største enkeltendringen i SSOT-disiplin: funnene er ikke bare ryddet, de er gjort til stående garantier.

## Andre lukkede korrekthetsfunn

Rettelser som ikke berørte noen SSOT-eier — tatt med for sporbarhet.

| Funn | Status nå |
|---|---|
| `AuthButton` kalte `useUser()` i en rendergren der `ClerkProvider` ikke var garantert (når nøkkelen mangler rendrer `ClerkAppProvider` appen uten provider) | `AuthButton` velger nå konfigurert/ukonfigurert underkomponent før noen Clerk-hook brukes; `useUser()` finnes bare i `ConfiguredAuthButton`. Provider-precondition-brudd, ikke Rules-of-Hooks-brudd. **Ingen ny auth-konfigurasjons-SSOT ble innført** — `AuthTokenProvider`-raden står uendret |

---

## Fortsatt burde vært SSOT

| I dag | Foreslått | Hvor spredt | Omfang |
|---|---|---|---|
| Rå spørsmålstype-strenger (`"single"`, `"multi"`, `"fill"`) | Importer `QUESTION_TYPES` og sammenlign mot konstantene | `transformAnswersForApi.js:29,34`, `FeedbackPanel.jsx:10,238`, `AnswerLabelFormatter.js:8` | 5 forekomster i 3 filer |
| Gjentatt semantisk fargeverdi brukt av flere uavhengige komponenter | Semantisk `Tokens.css`-variabel — men bare ved dokumentert gjenbruk | Utgangspunkt: 93 hex-forekomster i 22 CSS-filer utenfor `Tokens.css`. Dette er inventory, ikke 93 brudd — lokale paletter, grafserier og dekorative bakgrunner er legitime | opportunistisk |

Den nye toppsaken er de rå spørsmålstype-strengene: `QUESTION_TYPES` er ment å eie type-ID-ene, men fem steder sammenligner mot rå strenger i stedet for konstantene. Å bytte dem ut gjør `QUESTION_TYPES` til faktisk SSOT for type-ID-ene — et lite, avgrenset tiltak.

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

`NAV_ITEMS` eier navigasjonsdata, ikke runtime-state: `sidebarItems`, `toggleButtonItems`, `mobileToggleEntryItems`, `mobileToggleButtonItems` og `popOutMenuItems`. `TEST_TYPES` eier klassifikasjonene `chapter-test` og `exam`. Desktoprekkefølgen er `Læringsti`, `Begrepsliste`, `Flipcards`, `Begrepsmatch`, `Kapitteltester`, `Eksamener`. `Læringsti` har ingen innholdstype eller target og er deaktivert. `Kapitteltester` og `Eksamener` peker begge til `LEARNING_CONTENT_TYPES.EXAMS`, og mobilgruppen `Tester` gjenbruker de samme testoppføringene. `mobileToggleEntryItems` er tom og beholdes kun som et eksplisitt utvidelsespunkt for fremtidige mobile-only oppføringer. Det opprettes ingen ny skjerm eller læringsinnholdstype.

### Testtypefilter på læringsinnholdssiden

`useLearningContentSelectPageViewModel()` eier `selectedTestType`. Den eksisterende `selectContentType()`-handleren resolver de fem aktive desktopoppføringene og de samme oppføringene når de brukes i mobilgruppen; den deaktiverte `Læringsti`-oppføringen ignoreres. `filterExams()` mottar `selectedTestType` som eksplisitt input og kombinerer det med søk og emneområde.

`activeContentType` forblir den tekniske innholdstypen. ViewModelen avleder `desktopActiveEntryId` og `mobileActiveEntryId` fra `activeContentType` og `selectedTestType`, slik at både desktopknappen og den åpne mobilgruppen markerer riktig valg uten å opprette en ny innholdstype. Når brukeren velger et fag, åpner `AppNavigationViewModel` `NAV_SCREENS.GLOSSARY`, slik at `Begrepsliste` er valgt som første aktive læringsflate.

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

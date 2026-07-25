# SSOT-register — ExamPrepper frontend

Oppdatert: 2026-07-25
Type: dokumentasjon / analyse
Analysert snapshot: `examprepper-frontend-safe-20260725-204408.zip`
SHA-256: `dfe39d6136575f26a832408f9560e736a6bf324767e1cb49ae74ae929c3bc282`

## Formål

Dokumentet registrerer hvilke moduler som faktisk er **single source of truth** i dagens frontend, hvilke delte implementasjoner som bare er canonical UI, hvilke avledninger som har én eier, og hvilke åpne kanaler som fortsatt kan skape drift.

«SSOT» brukes her bare om autoritativ state, policy, konfigurasjon eller token-eierskap. En delt React-komponent er ikke automatisk state-SSOT; den beskrives som en **canonical UI-implementasjon** når den eier rendering, struktur eller geometri.

Denne revisjonen erstatter analysen fra 2026-07-23. Den gamle revisjonen beskrev blant annet `navGraph.js`, `navReducer.js`, separate navigation-registre, en konkurrerende Statistics-header og en svakere Search-/MobileBottomSheet-kontrakt. Disse forholdene gjelder ikke lenger.

## Base og verifiseringstype

```txt
Opplastet zip:        examprepper-frontend-safe-20260725-204408.zip
SHA-256:              dfe39d6136575f26a832408f9560e736a6bf324767e1cb49ae74ae929c3bc282
Zip-interne mtimes:   2026-07-25 20:42:24
Filer i snapshotet:   703
Pages:                7
JS/JSX i src/ + test/: 476
CSS-filer:            182
Jest-testfiler:       114
Git metadata:         .git er ikke med i zipen; branch/commit er ikke verifisert
```

Statisk verifisering utført mot en ny uttrekking til tom katalog:

```txt
Relative JS/JSX-importer: 845 analysert, 0 uløste
node --check:              alle .js-filer i src/ og test/ bestått
Produksjonsmoduler uten importører:
  - src/main.jsx (forventet entry point)
  - src/ui/view/components/Shared/WorkSpaceCard/WorkSpaceCard.jsx
```

`npm ci` fullførte ikke i analysevinduet, og denne revisjonen fremstiller derfor ikke Jest- eller Vite-resultater som om de ble kjørt her. Browser-/device-QA er heller ikke utført i denne analysen.

## Klassifisering

| Kategori | Betydning |
|---|---|
| Streng runtime-SSOT | Eier autoritativ runtime-state eller en beslutningsregel som muterer state |
| Autoritativt register | Eier statiske ID-er, konfigurasjon, mappinger eller kontraktverdier |
| CSS-/token-eier | Eier delt geometri, theme-verdi eller dokumentert global lagrelasjon |
| Canonical UI-implementasjon | Delt renderer, primitive eller app-shell som eier struktur og mekanikk |
| Avledet presentasjonsmodell | Én ren eller lokalt komponert avledning som Views konsumerer |

---

## Strenge runtime-SSOT-er

| Eier | SSOT for | Fil / grense | Bevis og avgrensning |
|---|---|---|---|
| `useAppNavigationViewModel()` | `activeScreen`, valgt fag, valgt eksamen, valgt topic area, navigation-overlays og eksplisitte navigasjonshandlinger | `src/ui/viewmodel/AppNavigationViewModel.js` | Runtime-state ligger her; stabil skjermpolicy slås opp i `SCREEN_CONFIG`. ViewModelen beholder eksplisitte nullstillinger og sideeffekter |
| `backContract` | Om back-knappen vises, labels og handler gjennom app-shell-kjeden | `AppNavigationViewModel → App → Page ViewModel → Page → Header` | Én objektskontrakt; de tidligere flate back-feltene er fjernet |
| `useLoadModel()` | Teknisk status, data, feil og reload for én asynkron ressurs | `src/ui/viewmodel/LoadState/useLoadModel.js` | Views importerer ikke `LOAD_STATUS`; page-state avledes videre gjennom `createWorkspaceState()` |
| `LanguageProvider` / `useLanguage()` | Aktivt språk, translation-map, locale og datofatering | `src/i18n/LanguageContext.jsx` | Én Context-eier; lagring i `localStorage` er providerens eksplisitte browser-grense |
| `ThemeProvider` / `useTheme()` | Aktivt light/dark-tema | `src/ui/theme/ThemeContext.jsx` | Provider eier runtime-state og synkronisering mot `<html class="dark">` |
| `SettingsProvider` / `useSettings()` | Brukerinnstillinger, per nå randomisering av svaralternativer | `src/ui/settings/SettingsContext.jsx` | Én Context-eier og én lagringskanal |
| Auth-token-provider | Aktiv asynkron tokenleverandør for datasource-laget | `src/auth/AuthTokenProvider.js` + `AuthTokenBridge.jsx` | Datasources får token gjennom én aktiv providerkanal |
| Side-ViewModels | Sidedata, sidehandlinger og domeneavledning for sin Page | `src/ui/viewmodel/*PageViewModel.js` | Hver Page mottar én Page-ViewModel; lokal visuell state kan fortsatt ligge i avgrensede komponenter/hooks |

`AppNavigationViewModel` er ikke et statisk navigation-register. Den eier runtime-state og handlinger; `navigation.js` eier stabil policy.

---

## Autoritative registre og policy-eiere

| Eier | Autoritet | Fil | Bevis / status |
|---|---|---|---|
| `NAV_SCREENS{}` `SCREEN_CONFIG{}` `getScreenConfig()` | Skjerm-ID-er, `requiresSubject`, `requiresExam`, `backTo`, subject-switcher-policy og page/shell-klasser | `src/navigation/navigation.js` | 10 produksjonsimportører. Alle sju skjermer har config; ukjent skjerm kaster |
| `LEARNING_CONTENT_TYPES{}` `NAV_ITEMS{}` | Innholdstyper, sidebar-items, toggle-items og page-tool-konfigurasjon | `src/navigation/navigation.js` | Tidligere `navItems.js`, `learningContent.js` og `pageTools.js` er konsolidert uten `navGraph` eller reducer |
| `translations{}` `LANGUAGES{}` | Norsk/engelsk produkttekst og translation keys | `src/i18n/translations.js` | Key-/type-paritet, ikke-tomme strenger og config-referanser er testlåst |
| `dependencies{}` | Miljøvalidering, base-URL-er og konkret dependency graph | `src/di/dependencies.js` | Eneste instansieringssted for DataSources, Repositories og Use Cases |
| `QUESTION_TYPES{}` | Spørsmålstype-ID-er | `src/constants/QuestionTypes.js` | Ukjent type håndteres eksplisitt; det er bevisst ikke innført et globalt renderer-/graderingsregister |
| `QUESTION_CONFIG{}` | Delte spørsmålskonstanter | `src/constants/QuestionConfig.js` | Foreløpig blant annet maksimal fill-lengde |
| Topic-area-filtermodulen | `ALL_TOPIC_AREAS` og canonical topic-area-oppslag | `src/model/domain/utils/topicAreaFilters.js` | Delt av relevante filtre og modeller |
| `PRESENTATION_MODE{}` / `APP_MOBILE_QUERY` | Synkronisert JS-kontrakt for appens 932/933-grense | `src/ui/presentation/presentationMode.js` | Seks produksjonsimportører; CSS-literals er kontrollert av PostCSS-test og eksplisitt allowlist for lokale breakpoints |
| `HEADER_APPEARANCES{}` `HEADER_LAYOUTS{}` | Gyldige Header-varianter og klasseoppløsning | `src/ui/view/components/Header/headerVariants.js` | Ukjent variant kaster; alle Pages må velge appearance/layout eksplisitt |
| `PROGRESS_BAR_VARIANTS{}` | Gyldige ProgressBar-renderingsvarianter | `src/ui/view/components/Shared/ProgressBar/progressBarVariants.js` | Header-spesifikk geometri uttrykkes av komponentens egen variant, ikke Header-descendant-CSS |
| `SEARCH_SUGGESTION_LIMIT` | Delt maksimal suggestions-lengde | `src/ui/viewmodel/Search/searchSuggestionContract.js` | Tre produksjonskonsumenter: SubjectSelect, LearningContentSelect og Glossary; verdien er `6` |

---

## Avledede presentasjonsmodeller

| Eier | Kontrakt | Fil / konsument |
|---|---|---|
| `createWorkspaceState()` | Teknisk load-state + empty-regel → uttømmende `loading/error/empty/content` | `src/ui/viewmodel/WorkspaceState/`; rendres av `WorkspaceState` på alle sju Pages |
| `createSubjectSwitcherModel()` | `loading`, `error`, `empty`, `unselected`, `ready` for desktop og mobil | `src/ui/viewmodel/SubjectSelectPage/createSubjectSwitcherModel.js` |
| `buildProgressBarModel()` | Ferdig progressmodell til delt ProgressBar | To produksjonsimportører + enhetstest |
| Glossary-searchmodellen | Autocomplete-terskel, eksakt/start/ordstart/contains-rangering og kapittelavgrensning | `src/ui/viewmodel/GlossaryPage/glossarySearchModel.js` |
| Glossary-tabell-/topic-modeller | Ferdige rader, topic-area-presentasjon, counts og selection | `src/ui/viewmodel/GlossaryPage/` |
| `createFlipcardTermPresentation()` | Hovedbegrep, separat avsluttende parentesforklaring og myke delingspunkter | `src/ui/viewmodel/FlipcardsPage/createFlipcardTermPresentation.js` |
| Norsk sammensetningssegmentering | Feature-spesifikk, vocabulary-avledet heuristikk for kontrollerte soft-hyphen-punkter på Flipcards | `src/ui/viewmodel/FlipcardsPage/norwegianCompoundSegmentation.js` |
| Page-ViewModels | Labels, booleans, callback-kontrakter, CSS-klasser og side-spesifikk presentasjon | `src/ui/viewmodel/*PageViewModel.js` |

Den norske sammensetningssegmenteringen er **ikke** et generelt norsk språk-SSOT. Den bygger et lokalt leksikon fra den innlastede Flipcards-bunken og støttetekstene, og brukes bare til Flipcard-presentasjon.

---

## Canonical UI-implementasjoner

| Komponent | Canonical for | Fil | Bevis / avgrensning |
|---|---|---|---|
| `<WorkspaceScaffold/>` | Ytre workspace-skall, header/body/footer-overlay/overlay-slots og scrollflate | `src/ui/view/components/WorkspaceScaffold/WorkspaceScaffold.jsx` | Direkte importert av alle sju Pages. Ingen legacy-scaffold finnes |
| `<WorkspaceState/>` | Page-level rendering av loading/error/empty/content | `src/ui/view/components/WorkspaceState/WorkspaceState.jsx` | Direkte importert av alle sju Pages; Views importerer ikke `LOAD_STATUS` |
| `<Header/>` | Feature-fri, slot-basert app-shell-header | `src/ui/view/components/Header/` | Direkte importert av alle sju Pages, inkludert Statistics. Header-CSS refererer ikke til feature-komponenter eller `.progress-bar` |
| `<Footer/>` | Delt footer-skall | `src/ui/view/components/Footer/Footer.jsx` | Tre direkte produksjonskonsumenter; andre sider kan bruke null/andre scaffold-slots |
| `<DockedMobileBottomSheet/>` | Docked sheet-struktur, grip/drag, peek, docked overlay, expanded visibility, safe-area og scroll | `src/ui/view/components/MobileBottomSheet/` | Tre feature-konsumenter: PageTools, Glossary og Flipcards. Ingen konkurrerende `MobileBottomSheet.jsx` |
| Search-familien | Feltmekanikk, filterkontroll, clear-action, valgfri combobox-tastaturkontrakt, listbox og blur/backdrop | `src/ui/view/components/Search/` | `SearchFilterField` har fire produksjonsimportører; `SearchBackdrop` brukes av tre Pages. Glossary bruker samme mekanikk med egen autocomplete-policy |
| `<FormattedText/>` + `createFormattedTextSegments()` | Canonical rendering av produkttekst med `**fet tekst**` | `src/ui/view/components/Shared/FormattedText.jsx`, `src/ui/presentation/formattedText.js` | 40 direkte produksjonsimportører. Glossary-tabell og mobilkort går gjennom samme renderer |
| `<ProgressBar/>` | Delt fremdriftsindikator | `src/ui/view/components/Shared/ProgressBar/` | Tre produksjonsimportører; modell bygges i ViewModel-laget |
| `<ProgressPager/>` | Delt dot-/pager-komposisjon og primitiver | `src/ui/view/components/ProgressPager/` | Tre produksjonsimportører; test hindrer feature-spesifikke wrapperkopier |
| `<LearningContentHeader/>` | Delt heading for læringsinnholdssider | `src/ui/view/components/LearningContentHeader/` | Nøyaktig to produksjonskonsumenter, testlåst |
| `<ToolCardGrid/>` / `<ToolCard/>` | Delt verktøykort-rendering | `src/ui/view/components/ToolCard/` | Fire produksjonsimportører; data/policy kommer fra feature-/navigation-modeller |
| `<DesktopPopOutMenu/>` | Delt desktop pop-out-mekanikk | `src/ui/view/components/DesktopPopOutMenu/` | To produksjonskonsumenter; intern 81/82/83-stige er bevisst lokal |
| `<AppErrorBoundary/>` | Root-grense for uventet render-/lifecycle-crash | `src/ui/view/components/AppErrorBoundary/` | Montert én gang i `App`; reload-policy ligger i composition root |

### WorkSpaceCard-presisering

`workspace-card.css` er fortsatt canonical eier av den delte visuelle kortflaten, og `QuestionCard` adopterer kontrakten gjennom klassekomposisjon (`workspace-card question-card`).

`src/ui/view/components/Shared/WorkSpaceCard/WorkSpaceCard.jsx` har derimot **ingen produksjons- eller testimportører** i snapshotet. React-komponenten skal derfor ikke listes som en bekreftet canonical renderer før den enten tas i bruk eller slettes. Den faktiske SSOT-en i dag er CSS-kontrakten, ikke den ubrukte wrapperkomponenten.

---

## CSS- og token-eierskap

| Eier | Autoritet | Status |
|---|---|---|
| `src/ui/style/App.css` | Eneste CSS-entry point og importrekkefølge | Importerer Tokens, globalt stilark, alle Pages og delte UI-mapper én gang |
| `Tokens.css` | Delte designverdier, dark-mode-overstyringer og beviste globale lag | `.dark`-eierskap ligger her; globale z-relasjoner er navngitt, lokale stacking contexts forblir lokale |
| Header-CSS + `headerVariants.js` | Header-geometri og appearance/layout-varianter | Page-CSS eier ikke `.scaffold-header*` |
| WorkspaceScaffold-CSS | Scaffoldstruktur, slots og `.workspace-scaffold-body` | `contentClassName`-escape hatch er fjernet; page-padding ligger i wrappers inne i `children` |
| MobileBottomSheet-CSS + mobile-sheet-tokens | Docked geometri, topbar-clearance, peek, overlay, expanded-scroll og safe-area | Feature-CSS kan ikke overstyre `.mobile-bottom-sheet-*`; dokumentert background custom property er eneste visuelle feature-hook |
| Search-CSS | Feltgeometri, clear-action, autocomplete-hint, popuphøyde, suggestions, blur/backdrop og footer-lift | Feature-CSS kan ikke sette egen suggestion-limit eller popuphøyde |
| `workspace-card.css` | Delt card-surface, skygge, inset-highlight og ambient glow | Konsumeres via klassekomposisjon; se presiseringen om ubrukt React-wrapper |
| GlossaryPage-CSS | Lokal desktoplayout og tabellkontrakt | To selvstendige sibling-kort; term/forklaring er eksplisitt `40% / 60%`; språklig orddeling og overflow-beskyttelse er lokal |
| FlipcardDeck-CSS | Lokal kortgeometri og termpresentasjon | Begrep bruker `hyphens: manual`; bare ViewModel-genererte soft hyphens kan bryte begrepet. Forklaringer bruker `hyphens: auto` |

### Global lagstige

Bare relasjoner som er bevist på tvers av komponenter er sentralisert i `Tokens.css`:

```txt
  1  --z-app-content
 30  --z-scaffold-header
 40  --z-search-backdrop
 50  --z-workspace-footer-overlay
 60  --z-search-footer-content
 71  --z-docked-mobile-sheet
 80  --z-navigation-backdrop
 90  --z-navigation-panel
100  --z-mobile-topbar
110  --z-exam-submit-confirmation
130  --z-settings-dialog
```

Lokale verdier i kort, drag-and-drop, Flipcards, sticky table headings og `DesktopPopOutMenu` er ikke tokenisert bare fordi de er numerisk like andre verdier.

---

## Utilities med dokumentert delt eierskap

| Eier | Kontrakt | Produksjonsbruk |
|---|---|---:|
| `normalizeSearchTerm(searchTerm)` | String inn → trim + locale-uavhengig lower-case; ingen skjult domenepolicy | 5 importører |
| `shuffleInPlace(items, random)` | In-place Fisher–Yates med eksplisitt RNG | 4 importører |
| `createFormattedTextSegments(text)` | Parser prosjektets avgrensede `**bold**`-kontrakt | Brukes av `FormattedText` og MatchCards-presentasjon |
| `SEARCH_SUGGESTION_LIMIT` | Felles maksimum på seks forslag | 3 importører |

Feature-policy for identisk rekkefølge, autocomplete-rangering, search commitment eller norsk sammensetningsanalyse forblir lokal og bygges på de delte utility-kontraktene.

---

## Søkekontrakten

Søk er nå delt på mekanikknivå, men feature-policy er avgrenset:

```txt
SearchFilterField
├── input/ref
├── filterkontroll
├── clear-action
├── Escape
├── valgfri combobox-ARIA
└── ArrowUp / ArrowDown / Enter

SearchBackdrop
└── canonical blur, lag og klikk-utenfor

SearchSuggestionList / SearchSheetBody
└── canonical listbox, option-rader og popup-overflate
```

SubjectSelect og LearningContentSelect bruker standard search-sheet-policy. Glossary bruker de samme canonical komponentene, men ViewModelen eier:

- forslag fra første tegn,
- eksakt/start/ordstart/contains-rangering,
- kapittelfilter,
- aktivt forslag,
- draft input versus valgt/committed begrep.

Glossary-input filtrerer ikke lenger tabellen i sanntid. Tabellen endres først når et autocomplete-forslag velges. Dette er en feature-policy, ikke en parallell Search-implementasjon.

---

## MobileBottomSheet-kontrakten

`DockedMobileBottomSheet` er eneste canonical docked sheet-implementasjon:

```txt
Docked:
- grip synlig
- peekContent aktivt
- dockedOverlayContent kan brukes til søk/filter
- expandedContent skjult, inert og uten pointer-events

Åpen:
- grip synlig
- peekContent fortsatt aktivt
- expandedContent synlig og scrollbart
```

Bare grip, chevron og drag endrer åpen-state. Søk og filter kan brukes i både docked og åpen tilstand uten å åpne sheetet automatisk.

Feature-komponentene forblir separate fordi de har ulike data og endringsårsaker:

```txt
PageToolsMobileFooterSheet
GlossaryMobileChapterSheet
FlipcardsMobileFooterSheet
```

Dette er ikke et SSOT-brudd; de deler mekanikken, men eier hver sin feature.

---

## Feilkontrakter

| Livsløp | Eier |
|---|---|
| Page-load | `useLoadModel → createWorkspaceState → WorkspaceState` |
| Root render-/lifecycle-crash | `AppErrorBoundary` + recovery-callback i composition root |
| Exam-language unavailable | Lokal språksynk-kontrakt med egen i18n-produkttekst |
| Teknisk exam-language-sync-feil | Lokal språksynk-kontrakt, dev-logg og egen produkttekst |
| Exam submit-feil | Lokal action-state og i18n-produkttekst |

Det finnes ingen global error store. Teknisk `error.message` brukes ikke som produkttekst.

---

## Verifisert som ikke-brudd

| Ser ut som duplisering | Faktisk kontrakt |
|---|---|
| Standard søk vs Glossary-autocomplete | Samme `SearchFilterField`, backdrop, popup og listbox; bare rangering/commit-policy er feature-spesifikk |
| PageTools-, Glossary- og Flipcards-sheet | Separate feature-komponenter over samme `DockedMobileBottomSheet`-primitive |
| `ProgressBar` vs `ProgressPager` | Ulike presentasjonskontrakter: lineær progress versus punkt-/sidepager |
| `DesktopPopOutMenu` og mobile bottom sheet | Ulike viewport-/interaksjonsmekanismer; deler feature-data, ikke shell-implementasjon |
| `QuestionCard` med `workspace-card`-klasse | Bevisst CSS-komposisjon. React-wrapperen er ubrukt, men CSS-kontrakten er canonical |
| Norsk Flipcard-segmentering vs vanlig CSS-hyphenation | Begrep bruker kontrollerte soft hyphens; forklaring bruker browserens språkbaserte auto-hyphenation |
| Lokale icon maps | Feature-lokale registre er tillatt; et globalt ikonregister er ikke automatisk en bedre SSOT |

---

## Løst siden revisjonen 2026-07-23

| Tidligere funn | Dagens løsning |
|---|---|
| `NAV_GRAPH` + `navReducer` + flere navigation-filer | Fjernet. `navigation.js` eier stabil config; `AppNavigationViewModel` eier eksplisitt runtime-state og handlinger |
| Lokale screen-sets og separat subject-switcher-policy | Flyttet til `SCREEN_CONFIG` |
| Parallelle back-felter | Én canonical `backContract` |
| Header-varianter skjult i Page-CSS | Eksplisitte `HEADER_APPEARANCES`/`HEADER_LAYOUTS`; Header er feature-fri |
| Statistics med konkurrerende header | Statistics bruker canonical Header |
| `contentClassName` som dynamisk scaffold-kanal | Fjernet; page-geometri ligger i wrappers inni `children` |
| Utestet 932/933-drift | Synkronisert JS/CSS-kontrakt og PostCSS-arkitekturtest |
| Tilfeldige globale z-index-verdier | Bare beviste app-lag er sentralisert i semantiske tokens |
| Duplisert søkenormalisering | `normalizeSearchTerm()` |
| Tre Fisher–Yates-varianter | `shuffleInPlace(items, random)` |
| Fragmentert Search-opplevelse | Canonical Search-familie med backdrop, filterfield, suggestion-list og felles seks-resultatgrense |
| Fragmentert docked bottom-sheet-geometri | Canonical `DockedMobileBottomSheet` med eksplisitte slots og accessibility-state |
| Glossary live-filtrerte tabellen under typing | Draft autocomplete er separert fra committed content |
| Glossary mistet `**bold**`-rendering | Term og forklaring rendres igjen gjennom `FormattedText` |
| Flipcard-begreper fikk vilkårlige bokstavbrudd | ViewModel-genererte soft hyphens + `hyphens: manual` |
| Root crash-recovery manglet | `AppErrorBoundary` |
| Fragmentert error-livsløp | Page-load, root crash, language sync og submit er separate kontrakter |
| Hardkodede navigation fallback-labels | Fjernet; i18n-registeret er autoritativt |
| Ukjent spørsmålstype kunne falle inn i choice-adferd | Eksplisitt unknown-type-presentasjon |

---

## Kontrakter som uttrykkelig ikke er innført

- `navGraph.js` eller `navReducer.js`,
- global navigation reducer,
- parallelle lokale screen-sets,
- global error store,
- globalt ikonregister uten målt gevinst,
- global z-index-policy basert bare på tallstørrelse,
- runtime resize-state som erstatning for CSS media queries,
- grading i UI-laget,
- `QUESTION_TYPE_REGISTRY` uten dokumentert beslutningsgevinst,
- compatibility fields mellom gammel og ny kontrakt,
- en universell norsk språkservice basert på Flipcards-heuristikken.

---

## Gjenstående avgrenset gjeld

### 1. Ubrukt `WorkSpaceCard`-komponent

`src/ui/view/components/Shared/WorkSpaceCard/WorkSpaceCard.jsx` er eneste produksjonsmodul uten importører utover entry pointet `main.jsx`. Enten bør wrapperen tas i faktisk bruk av en legitim konsument, eller slettes. `workspace-card.css` kan fortsatt være canonical CSS-kontrakt uten React-wrapperen.

### 2. Ulik icon-key-feilpolicy

Sidebarens lokale ikonoppslag kaster ved ukjent key. `SubjectIcon` normaliserer legacy keys og faller tilbake til `clipboard`; `ToolCard` faller tilbake til `List`. Dette er ikke et argument for et globalt ikonregister, men de tre lokale kontraktene bør dokumentere om silent fallback eller tydelig feil er ønsket.

### 3. Eldre signatur- og parameterstil

Det finnes fortsatt:

- Page-ViewModels med mange posisjonelle parametre,
- produksjonsfunksjoner med default-parametre,
- eldre space-innrykk og vertikale signaturer,
- enkelte state-booleans navngitt etter View-komponenter.

Dette er stil-/kontraktsgjeld og bør ikke blandes inn i funksjonelle featurepatcher.

### 4. Rå fargeliteraler utenfor `Tokens.css`

Statisk inventory finner 93 hex-literalforekomster fordelt på 22 CSS-filer utenfor `Tokens.css`. Flere er lokale illustrasjons-/statuspaletter, men semantisk delte verdier bør flyttes opportunistisk til tokens når filene røres. En blind global migrering anbefales ikke.

### 5. `AppNavigationViewModel` er fortsatt bred

ViewModelen returnerer fortsatt en flat kontrakt som kombinerer navigation-state, overlay-state og språksynk. Eierskapet er korrekt, men oppdeling i interne undermodeller kan vurderes dersom filen får ny endringsbelastning. Returen bør ikke grupperes bare for estetikk.

### 6. Navnekonsistens

`WorkspaceScaffold` og `WorkSpaceCard` bruker ulik kapitalisering. Dette er kosmetisk gjeld og bør ikke kombineres med funksjonell endring.

### 7. Runtime-verifisering

Denne revisjonen har ikke kjørt full Jest-suite, Vite-build eller browser-QA. Følgende må fortsatt verifiseres i prosjektets eget installerte miljø:

- desktop/mobil,
- light/dark,
- norsk/engelsk,
- søk, blur, autocomplete og filter,
- docked/åpen MobileBottomSheet,
- Header-/overlay-lag,
- Glossary desktoplayout,
- Flipcard soft-hyphen-presentasjon.

---

## Prioritert videre arbeid

1. **Avklar `WorkSpaceCard.jsx`.** Slett den døde wrapperen eller adopter den der semantikken faktisk passer.
2. **Kjør full CI og browser-QA mot dette snapshotet.** Dokumenter resultatene uten å gjenbruke eldre tall.
3. **Dokumenter lokal icon-key-policy.** Behold lokale registre, men velg bevisst fail-fast versus fallback per kontrakt.
4. **Migrer signatur-/default-parametergjeld i dedikerte patcher.** Ikke bland med featurearbeid.
5. **Tokeniser semantisk delte farger opportunistisk.** Behold ekte lokale paletter lokalt.
6. **Vurder AppNavigation-undermodeller bare ved konkret endringspress.** Ikke opprett ny reducer eller navGraph.

---

## Metodens begrensning

Registeret bygger på:

- relativ importgraf for JS/JSX,
- tekst- og strukturinspeksjon av React-kontrakter,
- CSS selector-/custom-property-inventory,
- eksisterende arkitekturtester og dokumenterte kontrakter,
- `node --check` for `.js`-filer.

Importgrafen kan bevise importører og døde moduler, men ikke runtime-adferd eller faktisk computed CSS. CSS-inventory kan finne eierskap og overstyringskanaler, men ikke bevise visuell korrekthet i nettleseren. Derfor må full Jest/Vite og browser-QA behandles som en separat verifikasjonsfase.

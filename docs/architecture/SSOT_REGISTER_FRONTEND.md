# SSOT-register — ExamPrepper frontend

Oppdatert: 2026-07-24
Verifisert base: `examprepper-frontend-safe-20260724-105708.zip`
Base-SHA-256: `f63c174ee8c18a046723f0d6c7a41c365fc3c66ebd3dc0c19204f165d06f315d`

## Klassifisering

| Kategori | Betydning |
|---|---|
| Streng state-/policy-SSOT | Eier autoritativ runtime-state eller beslutningsregel |
| Autoritativt register | Eier statiske ID-er, config eller mappinger |
| CSS-/token-eier | Eier delt stilverdi, geometri eller global layer-policy |
| Canonical UI-implementasjon | Delt renderer eller app-shell; ikke automatisk state-SSOT |
| Avledet presentasjonsmodell | Én ren avledning som flere Views konsumerer |

## Strenge runtime-SSOT-er

| Eier | Autoritet |
|---|---|
| `useAppNavigationViewModel()` | `activeScreen`, `selectedSubjectId`, `selectedExamId`, `selectedTopicAreaKey` og eksplisitte navigasjonshandlinger |
| `useLoadModel()` | Teknisk status, data, error og reload for én asynkron ressurs |
| `LanguageProvider` / `useLanguage()` | Aktivt språk og aktiv translation-map |
| `ThemeProvider` / `useTheme()` | Aktivt tema |
| `SettingsProvider` / `useSettings()` | Brukerinnstillinger |
| Auth-token-provider | Aktiv tokenkanal for datakilder |

`AppNavigationViewModel` er ikke et statisk register. Stabil skjermpolicy ligger i `SCREEN_CONFIG`.

## Autoritative registre

| Eier | Autoritet |
|---|---|
| `src/navigation/navigation.js` | `NAV_SCREENS`, `SCREEN_CONFIG`, `NAV_ITEMS` |
| `src/i18n/translations.js` | `LANGUAGES`, norsk og engelsk translation-map |
| `src/di/dependencies.js` | Miljøvalidering, base-URL-er og konkret dependency graph |
| `src/constants/QuestionTypes.js` | Spørsmålstype-ID-er |
| `src/constants/QuestionConfig.js` | Delte spørsmålskonstanter |
| topic-area-filtermodulen | Sentinel og canonical oppslag for topic areas |
| `src/ui/presentation/presentationMode.js` | Synkronisert 932/933 JS-kontrakt og media query-string |

## Avledede presentasjonsmodeller

| Eier | Kontrakt |
|---|---|
| `createWorkspaceState()` | Load-status + empty-regel → diskriminert workspace-state |
| `createSubjectSwitcherModel()` | Loading, error, empty, unselected og ready for desktop og mobil |
| `buildProgressBarModel()` | Ferdig progress-presentasjonsmodell |
| Page-ViewModels | Labels, booleans, callbacks, CSS-klasser og side-spesifikk presentasjon |

`createSubjectSwitcherModel` lager aldri falske fagobjekter og bruker ikke `subjects[0]` som fallback.

## Canonical UI-implementasjoner

| Eier | Ansvar |
|---|---|
| `WorkspaceScaffold` | Ytre workspace-skall, slots og scrollflate |
| `WorkspaceState` | Uttømmende rendering av loading/error/empty/content |
| `Header` | Feature-fri, slot-basert app-shell-header og geometri |
| `Footer` | Canonical app-shell-footer |
| `WorkSpaceCard` | Delt innholdsflate inni workspace |
| `AppErrorBoundary` | Root-grense for uventet render-/lifecycle-crash |

Disse er canonical renderere eller templates. De er ikke automatisk state-SSOT-er.

## CSS- og token-eierskap

| Eier | Autoritet |
|---|---|
| `Tokens.css` | Delte designverdier, dark-mode-overstyringer og beviste globale lag |
| Header-CSS + `headerVariants.js` | Header-geometri og eksplisitte appearance-/layout-varianter |
| WorkspaceScaffold-CSS | Scaffoldstruktur og `.workspace-scaffold-body` |
| WorkSpaceCard-CSS | Delt card-surface, skygge og utvidelsespunkter |
| Page-CSS | Sidespesifikk indre geometri; ikke Header- eller Scaffold-kjernepolicy |

`contentClassName` er fjernet. Sidespesifikk layout ligger i wrappers inne i `children`. Lokale stacking contexts tokeniseres ikke uten en global relasjon.

## Utilities med dokumentert delt eierskap

| Eier | Kontrakt |
|---|---|
| `normalizeSearchTerm(searchTerm)` | Streng string inn, trim + lower-case ut; ingen coercion |
| `shuffleInPlace(items, random)` | In-place Fisher–Yates med eksplisitt RNG |

Feature-policy som identisk-rekkefølge-rotasjon forblir lokal.

## Feilkontrakter

| Livsløp | Eier |
|---|---|
| Page-load | `useLoadModel` → `createWorkspaceState` → `WorkspaceState` |
| Root render/lifecycle-crash | `AppErrorBoundary` og composition-root recovery |
| Exam-language unavailable | Lokal sync-kontrakt med egen i18n-produkttekst |
| Exam-language teknisk sync-feil | Lokal sync-kontrakt, dev-logg og egen i18n-produkttekst |
| Exam submit-feil | Lokal action-state og i18n-produkttekst |

Det finnes ingen global error store. Teknisk feiltekst lekker ikke til UI.

## Kontrakter som uttrykkelig ikke er innført

- `navGraph.js` eller `navReducer.js`,
- global navigation reducer,
- parallelle lokale screen-sets,
- global error store,
- global icon registry,
- global z-index-terskel basert på tallstørrelse,
- runtime resize-state som layout-autoritet,
- grading i UI-laget,
- `QUESTION_TYPE_REGISTRY` uten målt gevinst,
- compatibility fields mellom patcher.

## Gjenstående avgrenset gjeld

- Eldre ViewModels med posisjonelle parametre over terskelen.
- Eldre space-innrykk og vertikale signaturer utenfor filer som denne serien måtte endre.
- Enkelte komponentkoblede boolean-navn.
- Ulik kapitalisering mellom `WorkspaceScaffold` og `WorkSpaceCard`.
- Browser-/device-QA i et miljø med installerte avhengigheter.

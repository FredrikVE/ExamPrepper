<a href="../../README.md">← Tilbake til README</a>

---

# Frontend-arkitektur

Prosjektet følger lagdelt MVVM med manuell dependency injection og pragmatisk Atomic Design. Det normative dokumentet er [`docs/soul-docs/FRONTEND_ARCHITECTURE_SOUL.md`](../soul-docs/FRONTEND_ARCHITECTURE_SOUL.md).

![Arkitekturdiagram](./ARCHITECTURE.png)

## Autoritativ dataflyt

```text
DataSource
→ Repository
→ Domain / Use Case
→ dependencies.js
→ ViewModel
→ Page
→ komponenter
→ subkomponenter
```

Ingen lag hopper over et annet. Modellen flyter opp til en Page-ViewModel; ferdige props og callbacks flyter deretter ned gjennom React-treet.

## Ansvarsgrenser

| Lag | Eier |
|---|---|
| DataSource | Transport, requestmekanikk og rå payloads |
| Repository | Tilgang til domeneobjekter uten transportkunnskap |
| Domain / Use Case | Forretningsregler, grading og domenetransformasjon |
| `dependencies.js` | Runtime-konfigurasjon og konkret dependency graph |
| ViewModel | Runtime-state, koordinering, domeneavledning, labels, booleans, callbacks og presentasjonsmodeller |
| Page | Mottar én Page-ViewModel, komponerer React-noder og fordeler ferdige props |
| Komponent | Deklarativ rendering og lokal visuell/interaksjonsstate |

Views importerer ikke Use Cases, Repositories, DataSources, `dependencies.js` eller `LOAD_STATUS`. ViewModels returnerer ikke JSX, komponentreferanser eller DOM refs som presentasjonsinnhold.

## Navigasjon

`src/navigation/navigation.js` er autoritativt register for:

```text
NAV_SCREENS
SCREEN_CONFIG
NAV_ITEMS
```

`SCREEN_CONFIG` eier stabil skjermpolicy. `AppNavigationViewModel` eier runtime-state, guards, eksplisitte handlinger, nullstillinger, overlay-lukking og sideeffekter. `backContract` flyter som ett objekt til app-shell; gamle parallelle back-felter finnes ikke.

## App-shell

- `Header` er canonical, feature-fri og slot-basert app-shell/template.
- Pages komponerer `HeaderTitle`, `ProgressBar`, `PageTools` og feature-actions som React-noder.
- `headerVariants.js` eier eksplisitt appearance-/layout-policy.
- `ProgressBar` eier sin egen `HEADER`-variant.
- `WorkspaceScaffold` eier ytre workspace-skall og `.workspace-scaffold-body`.
- `WorkspaceState` rendrer diskriminerte loading-, error-, empty- og content-states.
- `WorkSpaceCard` eier den delte innholdsflaten inni et workspace.

## Presentation og CSS

`src/ui/presentation/presentationMode.js` eksporterer den synkroniserte app-kontrakten:

```text
APP_MOBILE_MAX_WIDTH = 932
APP_DESKTOP_MIN_WIDTH = 933
APP_MOBILE_QUERY
```

CSS-media queries er layout-autoriteten. Runtime resize-state eller `window.innerWidth` brukes ikke som layout-SSOT.

`Tokens.css` eier globale designverdier og de globale lagene som stacking-context-inventeringen faktisk beviser. Lokale stacking contexts og lokale z-index-verdier forblir lokale.

## i18n

`translations.js` eier `LANGUAGES`, norsk og engelsk translation-map. Arkitekturtester håndhever:

- key-paritet,
- type-paritet,
- ikke-tomme stringverdier,
- gyldige translation-funksjoner,
- at config-refererte keys finnes.

Eksplisitt fravær er `null`, ikke tom oversettelse.

## Feillivsløp

```text
Page-load-feil
useLoadModel → createWorkspaceState → WorkspaceState

Uventet render-/lifecycle-crash
AppErrorBoundary → plattformfri fallback → eksplisitt recovery-klikk i composition root

Språksynk
null/unavailable eller exception/teknisk feil → separate i18n-produkttekster

Exam submit
lokal action-state → i18n-produkttekst
```

Rå `error.message` vises ikke i UI. Det finnes ingen global error store.

## Små, delte kontrakter

- `normalizeSearchTerm(searchTerm)` har streng string-kontrakt og eier de dokumenterte søkeduplikatene.
- `shuffleInPlace(items, random)` eier Fisher–Yates; RNG er eksplisitt og feature-policy forblir lokal.
- `createSubjectSwitcherModel` eier den avledede subject-switcher-kontrakten for desktop og mobil.
- `getQuestionTypeLabel` har eksplisitt unknown-produkttekst; unknown rutes ikke gjennom choice-renderere.
- Sidebar eier og validerer sin lokale icon-map. Subject-, navigation- og tool-icons er separate domener.

## Komponentretning

```text
UI-primitive
→ sammensatt komponent
→ feature-komponent
→ app-shell/sidemal
→ Page
```

Dette er en ansvarsmodell, ikke en obligatorisk mappestruktur. Lik JSX alene er ikke grunnlag for uttrekk.

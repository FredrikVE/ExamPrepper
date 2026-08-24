<!-- docs/skills/SSOT_COMPONENTS.md -->
# SSOT_COMPONENTS.md — Canonical komponentkontrakter i ExamPrepper frontend

Oppdatert: 2026-08-24

Dette registeret viser hvilke delte UI-flater og mekanismer som allerede har en canonical implementasjon.
Det er ikke et register over all React-kode, og «canonical» betyr ikke at komponenten eier domene- eller runtime-state.

`FRONTEND_ARCHITECTURE_SKILL.md` eier reglene for lagdeling, state og dependency-retning.
`SSOT_COMPONENTS.md` svarer på et smalere spørsmål:

> Finnes det allerede en delt komponent eller mekanisme som eier denne UI-kontrakten?

## Bruksregel

Før en ny delt komponent opprettes:

1. Finn nærmeste ansvar i registeret.
2. Bruk den eksisterende offentlige inngangen dersom kontrakten er den samme.
3. Utvid via dokumenterte props, slots, varianter eller tokens når endringsårsaken fortsatt er den samme.
4. Ikke importer private undermoduler for å omgå den offentlige fasaden.
5. Ikke konsolider feature-komponenter bare fordi markup, ikon eller styling ligner.
6. Opprett en ny canonical komponent først når ansvaret, kontrakten og endringsårsaken er selvstendig.

## App-shell og workspace

| Ansvar | Canonical implementasjon | Offentlig bruk | Grense |
|---|---|---|---|
| Ytre workspace-skall | `WorkspaceScaffold` | `src/ui/view/components/WorkspaceScaffold/` | Eier shell, slots og scrollflate. Feature-layout ligger i innholdet. |
| Loading/error/empty/content | `WorkspaceState` | `src/ui/view/components/WorkspaceState/` | Rendrer ferdig page-state. Eier ikke ressursstatus. |
| Desktop app-shell-header | `Header` + slots | `src/ui/view/components/Header/` | Page velger appearance, layout og slots eksplisitt. |
| Footer-skall | `Footer` | `src/ui/view/components/Footer/` | Delte footere komponerer denne i stedet for å inline konkurrerende shell. |
| Root render-crash | `AppErrorBoundary` | `src/ui/view/components/AppErrorBoundary/` | Root recovery. Erstatter ikke ordinær page-load-/action-feilhåndtering. |

## Delt navigasjon og kontrollflater

| Ansvar | Canonical implementasjon | Offentlig bruk | Grense |
|---|---|---|---|
| Responsiv innholdstypevelger | `ToggleButtonRow` | `src/ui/view/components/ToggleButtonRow/` | Én offentlig fasade. Interne desktop-/mobilvarianter importeres ikke som alternative offentlige innganger. |
| Mobil bottom sheet | `DockedMobileBottomSheet` | `src/ui/view/components/MobileBottomSheet/` | Eier geometri, drag, grip, inert, slots og scroll. Feature eier innholdet. |
| Desktop pop-out | `DesktopPopOutMenu` | `src/ui/view/components/DesktopPopOutMenu/` | Eier delt struktur og layer-mekanikk. |
| Søk | Search-familien | `src/ui/view/components/Search/` | Eier felt/listbox/filter-mekanikk. Feature-ViewModel eier kandidater, rangering og policy. |
| Verktøykort | `ToolCardGrid`, `ToolCard` | `src/ui/view/components/ToolCard/` | Brukes når den samme verktøykort-semantikken faktisk deles. |

## Spørsmålskapabilitet

| Ansvar | Canonical implementasjon | Offentlig bruk | Grense |
|---|---|---|---|
| Spørsmålsflate | `QuestionCard` | `src/ui/view/components/QuestionCard/QuestionCard.jsx` | Eneste offentlige inngang for læringsmoduser. |
| Valg av type-renderer | `QuestionCardContent` | `src/ui/view/components/QuestionCard/QuestionCardContent.jsx` | Eksplisitt router over `QUESTION_TYPES`; ikke offentlig capability. |
| Spørsmålspresentasjon | `src/ui/view/components/QuestionCard/QuestionTypes/**` | Kun gjennom `QuestionCard` | Eier type-spesifikk interaksjon og rendering, ikke øktflyt. |
| Feedback | `src/ui/view/components/QuestionCard/Shared/Feedback/**` | Kun gjennom `QuestionCard` | Presenterer spørsmålsfeedback; læringsmodus eier tidspunkt/state for retting. |

Læringsmoduser som `ExamPage` og `LearningSessionPage` eier spørsmålvalg, svarstate, rettingstidspunkt,
fremdrift, resultat og navigasjon. De lager ikke egne oppgaverenderere og importerer ikke private
`QuestionTypes` eller `QuestionCardContent` direkte.

## Delte presentasjonsflater

| Ansvar | Canonical implementasjon | Offentlig bruk | Grense |
|---|---|---|---|
| Lineær fremdrift | `ProgressBar` | `src/ui/view/components/Shared/ProgressBar/` | Renderer. Presentasjonsmodellen kan bygges separat av `buildProgressBarModel()`. |
| Punkt-/sidepaginering | `ProgressPager` | `src/ui/view/components/ProgressPager/` | Én pager-flate. Entries avledes separat. |
| Formatert produkttekst | `FormattedText` | `src/ui/view/components/Shared/FormattedText.jsx` | Én renderer for støttet markup-kontrakt. |

## Runtime providers og boundaries

Disse er ikke «shared components» i visuell forstand, men de er canonical runtime-grenser som UI-kode ikke skal duplisere.

| Ansvar | Eier | Grense |
|---|---|---|
| Aktivt språk | `LanguageProvider`, `useLanguage()` i `src/i18n/LanguageContext.jsx` | Én reaktiv språk-state. Produkttekst eies av i18n-registeret. |
| Aktivt tema | `ThemeProvider`, `useTheme()` i `src/ui/theme/ThemeContext.jsx` | Eier reaktiv theme-state og `.dark` på dokumentroten. |
| Theme-persistens | `src/ui/theme/themePreference.js` | Eier feil-tolerant `localStorage`-lesing/-skriving. Ikke en React-provider. |
| Brukerinnstillinger | `SettingsProvider`, `useSettings()` i `src/ui/settings/SettingsContext.jsx` | Én global settings-state. |

## Ikke canonical komponenter

Følgende skal ikke behandles som app-brede komponent-SSOT-er:

- `.workspace-card` er en navngitt CSS-flate brukt av `QuestionCard`, ikke en `WorkSpaceCard`-komponent.
- Delte `SelectionCard`-dimensjonstokens etablerer ikke en canonical `SelectionCard`-komponent.
- Flipcard-faces, SubjectSelect-/LearningContentSelect-kort og andre feature-eide flater beholder egne kontrakter når semantikk eller interaksjon er forskjellig.
- Lik JSX alene etablerer ikke en ny delt komponent.
- En intern helper, hook eller renderer blir ikke offentlig API bare fordi flere filer finnes i samme feature-mappe.

## Endringsregel

Når en canonical komponentkontrakt faktisk endres:

1. Endre eierimplementasjonen.
2. Oppdater relevante behavior-/architecture-tester.
3. Oppdater dette registeret dersom offentlig inngang, ansvar eller grense er endret.
4. Oppdater `FRONTEND_ARCHITECTURE_SKILL.md` bare når selve arkitekturregelen endres.
5. Ikke behold slettede komponentnavn eller patchnummer som permanent historikk; Git eier historikken.

## Kort sjekkliste

```text
Trenger jeg ny delt komponent?

Finnes samme semantiske ansvar allerede?     → bruk canonical eier
Samme utseende, men ulik semantikk?           → behold feature-eierskap
Trenger eksisterende eier en ekte variant?    → utvid eksplisitt
Må jeg importere en privat undermodul?         → stopp og vurder offentlig kontrakt
Er dette bare for å redusere linjetall?        → ikke trekk ut
```

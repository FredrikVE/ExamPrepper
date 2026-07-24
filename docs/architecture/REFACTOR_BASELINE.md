# SSOT-refaktoreringsbaseline

Dato: 2026-07-24

## Verifisert base

- Zip: `examprepper-frontend-safe-20260724-105708.zip`
- SHA-256: `f63c174ee8c18a046723f0d6c7a41c365fc3c66ebd3dc0c19204f165d06f315d`
- Lokal import-commit: `553b0eb7413b22757c43f3935a5cae4f1b72730a`
- Node: `v22.16.0`
- npm: `10.9.2`

## Baseline-verifikasjon

`npm ci --no-audit --no-fund` ble forsøkt mot den verifiserte zip-basen. Installasjonen stoppet før `node_modules` ble opprettet fordi pakkeregisteret svarte `503 Service Temporarily Unavailable` for `zod-validation-error-4.0.2.tgz`.

Følgene for baseline:

- Testsuiter: ikke kjørt; avhengigheter var ikke installert.
- Beståtte tester: ikke målt.
- Hoppede tester: ikke målt.
- Build: ikke kjørt; avhengigheter var ikke installert.
- Browser-QA: ikke kjørt.

Gamle test- eller buildtall er ikke gjenbrukt. Test, build og replay skal forsøkes på nytt etter patchserien.

## Subject-switcher før refaktorering

| Ressursstatus | Fag | Valgt fag | Dagens modell |
|---|---:|---|---|
| `loading` | ukjent | `null` | `kind: "loading"`, tom liste, loading-label, kan ikke åpnes |
| `error` | ukjent | valgfritt | `kind: "error"`, tom liste, produkttekst fra `useLoadModel`, kan ikke åpnes |
| `ready` | 0 | `null` | `kind: "empty"`, «Ingen fag», kan ikke åpnes |
| `ready` | > 0 | `null` | feilaktig `kind: "empty"`, «Ingen fag», kan åpnes |
| `ready` | > 0 | valgt objekt | `kind: "ready"`, valgt fagnavn, kan åpnes |

Desktop og mobil mottar samme `subjectSwitcher`-objekt fra `SubjectSelectPageViewModel`, men modellen skiller ikke tom fagliste fra manglende valg. Modellen bygges med `useMemo` uten dokumentert identitetsbehov.

## Navigasjon før refaktorering

- `SUBJECTS` → back: ingen overgang.
- `SELECT` → back: `SUBJECTS`; fag, eksamen og topic area nullstilles; overlays lukkes.
- `EXAM` → back: `SELECT`; `selectedExamId` nullstilles; overlays lukkes.
- `FLIPCARDS` → back: `SELECT`; `selectedExamId` og `selectedTopicAreaKey` nullstilles; overlays lukkes.
- `MATCHCARDS` → back: `SELECT`; `selectedExamId` og `selectedTopicAreaKey` nullstilles; overlays lukkes.
- `GLOSSARY` → back: `SELECT`; `selectedExamId` og `selectedTopicAreaKey` nullstilles; overlays lukkes.
- `OVERVIEW` → back: `SELECT`; valg beholdes bortsett fra `selectedExamId`; overlays lukkes.
- Subject-required skjerm uten fag: `showAllSubjects()` kjøres og alle valg nullstilles.
- `EXAM` uten `selectedExamId`: overgangen ignoreres.
- Skjermbytte bort fra `EXAM`: `selectedExamId` nullstilles.
- Skjermbytte til `SELECT` eller `GLOSSARY`: `selectedTopicAreaKey` nullstilles.
- Gyldig skjermbytte og eksplisitte valg lukker settings, mobilmeny og mobil subject-picker.
- Språksynk av valgt eksamen oppdaterer exam/subject uten å lukke overlays.
- Ukjent skjerm ignoreres i dagens kontrakt.

Stabil screen-policy er fordelt mellom tre steder:

- lokale sets og chrome-avledning i `AppNavigationViewModel`,
- statiske items i `navigation.js`,
- lokal skjuleregel i `SidebarNavigation`.

## Kjente QA-avvik ved start

- Ingen dependency-basert Jest-/Vite-baseline på grunn av pakkeregisterets 503-feil.
- Ingen browser-, responsiv-, dark-mode- eller språk-QA i baseline.
- Stacking-context-relasjoner er ikke verifisert i DevTools.
- Subject-switcher viser «Ingen fag» når fag finnes uten valgt fag.
- Header, Statistics-header, scaffold content-kanal, breakpoint-literals, globale lag, i18n-fallbacks, dupliserte utilities og feilkontrakter har gjelden beskrevet i den autoritative planen.

## Sluttstatus etter patchserien

Produksjonsendringene ble gjennomført i planens rekkefølge. Patch 7C ble ikke opprettet fordi stacking-inventeringen og de tilgjengelige statiske kontrollene ikke dokumenterte en konkret layer-defekt; en tom patch eller generell tallnormalisering ville ha brutt planen.

Sluttkontroller i implementasjonsmiljøet:

- `npm install --package-lock-only --ignore-scripts --no-audit --no-fund`: bestått; lockfilen er validert og normalisert.
- `npm ci --no-audit --no-fund`: blokkert av `503 Service Temporarily Unavailable` for `zod-validation-error-4.0.2.tgz` fra pakkeregisteret.
- `npm test -- --runInBand`: forsøkt, men kunne ikke starte fordi den blokkerte installasjonen ikke leverte `jest`.
- `npm run build`: forsøkt, men kunne ikke starte fordi den blokkerte installasjonen ikke leverte `vite`.
- TypeScript-parserkontroll: 465 JS/JSX-filer uten syntaksfeil.
- `node --check`: alle `.js`-filer i `src/` og `test/` bestått.
- Relative imports: 827 analysert, 0 uløste.
- Strukturelle sluttkontrakter: 22 bestått, 0 feil.
- Browser-/device-QA: ikke kjørt fordi avhengigheter og browser-runtime ikke var tilgjengelige.

Ingen gamle test- eller buildresultater er fremstilt som nye resultater.

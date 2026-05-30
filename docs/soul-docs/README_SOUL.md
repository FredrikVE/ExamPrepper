# README_SOUL.md — Regler for README og prosjektdokumentasjon

<!-- Sist oppdatert: 2026-05-30 -->

Dette dokumentet beskriver hvordan `README.md` og tilhørende `docs/`-dokumentasjon skal skrives, struktureres og kvalitetssikres.

Målet er å lage dokumentasjon som er:

```txt
lett å skumme
lett å navigere
visuelt variert
teknisk korrekt
konkret og prosjektnær
enkel å vedlikeholde
basert på faktisk prosjektstruktur
nyttig for både lesere, utviklere og AI-assistenter
```

README skal ikke være stedet der all dokumentasjon presses inn.

README skal være prosjektets **forside**.

Detaljene hører hjemme i `docs/`.

---

## Hva dette dokumentet er

Dette er en **documentation-authoring SOUL**.

```txt
ARCHITECTURE_SOUL.md
→ Hvordan applikasjonen skal bygges

PATCH_SOUL.md
→ Hvordan endringer skal lages og leveres

MERMAID_SOUL.md
→ Hvordan diagrammer skal lages og holdes forståelige

QUESTION_TYPE_SOUL.md
→ Hvordan oppgaver eller faglig innhold skal struktureres

README_SOUL.md
→ Hvordan README og docs skal skrives, deles opp og kvalitetssikres
```

`README_SOUL.md` bestemmer ikke arkitekturen i koden.

Det bestemmer hvordan arkitektur, funksjoner, use cases, testing, sikkerhet, bilder, diagrammer og prosjektstruktur skal forklares.

---

## Grunnregel

README skal raskt svare på fem spørsmål:

```txt
1. Hva er prosjektet?
2. Hvem er det for?
3. Hva kan det gjøre?
4. Hvordan kjører jeg det?
5. Hvor finner jeg mer dokumentasjon?
```

Hvis en seksjon ikke hjelper leseren med minst ett av disse spørsmålene, bør den enten forkortes eller flyttes til `docs/`.

---

## README er forside, docs er dybde

Hoved-README skal være en startside for prosjektet.

Den skal gi:

```txt
kort prosjektintro
kort feature-oppsummering
eventuelt skjermbilde eller preview
innholdsfortegnelse
hurtigstart
komprimert prosjektstruktur
kort arkitekturintro
teknologier
testkommandoer på høyt nivå
lenker til detaljert dokumentasjon
```

Detaljer som bør flyttes til `docs/`:

```txt
lange feature-lister
full prosjektstruktur
lange arkitekturforklaringer
use case-detaljer
modellering og diagramforklaringer
teststrategi i detalj
sikkerhetsvurdering
STRIDE-tabeller
datakontrakter
stylingregler
roadmap-detaljer
kildegrunnlag eller pensum
```

README skal gi oversikt.

`docs/` skal gi dybde.

---

## Plassering av README_SOUL.md

Anbefalt plassering for SOUL-dokumenter er:

```txt
docs/soul-docs/
```

Eksempel:

```txt
docs/soul-docs/
├── README_SOUL.md
├── ARCHITECTURE_SOUL.md
├── PATCH_SOUL.md
├── MERMAID_SOUL.md
└── QUESTION_TYPE_SOUL.md
```

Dette holder prosjektroten ryddig.

`README_SOUL.md` kan likevel ligge i prosjektroten hvis prosjektet bevisst ønsker at AI-assistenter eller utviklere skal finne filen raskere.

Hvis `README_SOUL.md` ligger i root, er det et bevisst unntak.

---

## Dokumentasjonsnivåer

Ikke alle prosjekter trenger full dokumentasjonsstruktur.

Velg nivå etter prosjektets kompleksitet.

```txt
Minimum
→ små prosjekter, demoer, enkle scripts

Standard
→ vanlige applikasjonsprosjekter

Utvidet
→ større apper, skole-/mappeprosjekter, backend, auth, API, database, sikkerhet eller flere brukerflyter
```

Ikke opprett dokumenter bare for å fylle en mal.

Opprett dokumenter når de faktisk hjelper leseren.

---

## Minimumsstruktur

Alle prosjekter skal ha:

```txt
README.md
```

Hvis README eller docs bruker bilder, skal prosjektet også ha:

```txt
docs/images/
```

Små prosjekter uten bilder trenger ikke `docs/images/`.

Eksempel på minimumsstruktur:

```txt
README.md
src/
```

Eksempel på minimumsstruktur med bilder:

```txt
README.md

docs/
└── images/
    └── screenshots/
```

Minimumsstrukturen passer bare for små prosjekter uten større arkitektur, backend, database, auth eller flere sentrale brukerflyter.

---

## Standardstruktur

Vanlige applikasjonsprosjekter bør bruke denne strukturen:

```txt
README.md

docs/
├── architecture/
│   ├── ARCHITECTURE.md
│   ├── ARCHITECTURE.png
│   └── MERMAID.md
│
├── documentation/
│   ├── FEATURES.md
│   ├── SETUP.md
│   ├── PROJECT_STRUCTURE.md
│   ├── DESIGN_DECISIONS.md
│   └── TESTING.md
│
└── images/
    ├── screenshots/
    └── diagrams/
```

Dette er anbefalt standard når prosjektet har:

```txt
flere sider eller views
flere sentrale features
tydelig arkitektur
tester
visuell UI
behov for forklaring utover root README
```

---

## Utvidet struktur

Større eller mer seriøse prosjekter kan legge til flere dokumenter:

```txt
docs/documentation/
├── USECASES.md
├── MODELLING.md
├── SECURITY.md
├── DATA.md
├── STYLING.md
├── ROADMAP.md
├── REFERENCES.md
├── DEPLOYMENT.md
├── ACCESSIBILITY.md
└── PERFORMANCE.md
```

Bruk disse ved behov.

Ikke alle prosjekter trenger alle filene.

---

## Anbefalt full struktur

For større applikasjonsprosjekter kan dette være en god full struktur:

```txt
README.md

docs/
├── architecture/
│   ├── ARCHITECTURE.md
│   ├── ARCHITECTURE.png
│   └── MERMAID.md
│
├── documentation/
│   ├── FEATURES.md
│   ├── USECASES.md
│   ├── MODELLING.md
│   ├── SETUP.md
│   ├── PROJECT_STRUCTURE.md
│   ├── DESIGN_DECISIONS.md
│   ├── STYLING.md
│   ├── TESTING.md
│   ├── SECURITY.md
│   ├── DATA.md
│   ├── ROADMAP.md
│   └── REFERENCES.md
│
├── images/
│   ├── screenshots/
│   │   ├── desktop/
│   │   ├── mobile/
│   │   └── states/
│   ├── diagrams/
│   └── examples/
│
└── soul-docs/
    ├── README_SOUL.md
    ├── ARCHITECTURE_SOUL.md
    ├── PATCH_SOUL.md
    ├── MERMAID_SOUL.md
    └── QUESTION_TYPE_SOUL.md
```

Prosjektspesifikke dokumenter kan legges til ved behov:

```txt
CURRICULUM.md
API.md
BACKEND_PLAN.md
DEPLOYMENT.md
ACCESSIBILITY.md
PERFORMANCE.md
```

`CURRICULUM.md` passer for fag-, skole- eller eksamensprosjekter, men skal ikke være standard i alle prosjekter.

---

## Ansvar per dokument

<table>
    <tr>
        <th>Dokument</th>
        <th>Når brukes det?</th>
        <th>Ansvar</th>
    </tr>
    <tr>
        <td><code>README.md</code></td>
        <td>Alltid</td>
        <td>Prosjektets forside. Gir rask oversikt, hurtigstart, kort arkitekturintro og lenker videre.</td>
    </tr>
    <tr>
        <td><code>docs/architecture/ARCHITECTURE.md</code></td>
        <td>Standard</td>
        <td>Forklarer arkitektur, lagdeling, ansvar og dataflyt.</td>
    </tr>
    <tr>
        <td><code>docs/architecture/ARCHITECTURE.png</code></td>
        <td>Standard når diagram brukes</td>
        <td>Rendret arkitekturdiagram som kan vises direkte på GitHub.</td>
    </tr>
    <tr>
        <td><code>docs/architecture/MERMAID.md</code></td>
        <td>Standard når Mermaid brukes</td>
        <td>Prosjektets konkrete Mermaid-kilde eller forklaring av arkitekturdiagrammet.</td>
    </tr>
    <tr>
        <td><code>docs/documentation/FEATURES.md</code></td>
        <td>Standard</td>
        <td>Beskriver hva prosjektet kan gjøre, gruppert etter funksjonsområde.</td>
    </tr>
    <tr>
        <td><code>docs/documentation/SETUP.md</code></td>
        <td>Standard</td>
        <td>Forklarer installasjon, kjøring, miljøvariabler og lokale oppsett.</td>
    </tr>
    <tr>
        <td><code>docs/documentation/PROJECT_STRUCTURE.md</code></td>
        <td>Standard</td>
        <td>Forklarer mappestruktur og ansvar per område.</td>
    </tr>
    <tr>
        <td><code>docs/documentation/DESIGN_DECISIONS.md</code></td>
        <td>Standard for større prosjekter</td>
        <td>Forklarer sentrale designvalg og hvorfor prosjektet er bygget slik det er.</td>
    </tr>
    <tr>
        <td><code>docs/documentation/TESTING.md</code></td>
        <td>Standard</td>
        <td>Forklarer teststrategi, testkommandoer, manuelle tester og testdekning.</td>
    </tr>
    <tr>
        <td><code>docs/documentation/USECASES.md</code></td>
        <td>Utvidet</td>
        <td>Beskriver aktører, brukerflyter, hovedflyt, alternativ flyt og feilflyt.</td>
    </tr>
    <tr>
        <td><code>docs/documentation/MODELLING.md</code></td>
        <td>Utvidet</td>
        <td>Samler og forklarer prosjektets modeller og diagrammer.</td>
    </tr>
    <tr>
        <td><code>docs/documentation/SECURITY.md</code></td>
        <td>Ved backend/API/auth/database/brukerdata</td>
        <td>Forklarer sikkerhetsprinsipper, trusler, tiltak, STRIDE og sikkerhetstester.</td>
    </tr>
    <tr>
        <td><code>docs/documentation/DATA.md</code></td>
        <td>Ved data/API/database/mockdata</td>
        <td>Forklarer dataformat, datakilder, API-kontrakter, database eller mockdata.</td>
    </tr>
    <tr>
        <td><code>docs/documentation/STYLING.md</code></td>
        <td>Ved UI-prosjekter</td>
        <td>Forklarer CSS, design tokens, responsivitet, tema og visuelle regler.</td>
    </tr>
    <tr>
        <td><code>docs/documentation/ROADMAP.md</code></td>
        <td>Ved planlagt videreutvikling</td>
        <td>Beskriver planlagte forbedringer og videre arbeid.</td>
    </tr>
    <tr>
        <td><code>docs/documentation/REFERENCES.md</code></td>
        <td>Ved fagkilder/API/datasett</td>
        <td>Samler fagkilder, API-kilder, datasett, pensum eller eksterne referanser.</td>
    </tr>
    <tr>
        <td><code>docs/images/</code></td>
        <td>Når bilder brukes</td>
        <td>Inneholder skjermbilder, diagrammer og visuelle ressurser brukt i README og docs.</td>
    </tr>
</table>

---

## Tilbake-lenker i underdokumenter

Alle lesbare dokumenter under `docs/documentation/` og `docs/architecture/` bør ha tilbake-lenke øverst.

Standard:

```md
<a href="../../README.md">← Tilbake til README</a>

---
```

Hvis dokumentet ligger et annet nivå, justeres lenken.

Unntak kan gjøres for filer som ikke er ment å leses direkte, for eksempel rene genererte diagramfiler.

---

## Root README.md

Root `README.md` skal være kortere enn underdokumentasjonen.

Standardstruktur:

```txt
1. Prosjektnavn
2. Kort prosjektintro
3. Preview eller skjermbilde
4. Kort funksjonssammendrag
5. Hurtigstart
6. Innholdsfortegnelse
7. Prosjektstruktur
8. Arkitektur
9. Teknologier
10. Testing
11. Referanser eller kildegrunnlag
12. Dokumentasjon / lenker videre
13. Status, begrensninger eller roadmap-lenke
```

Rekkefølgen kan justeres, men hovedregelen er:

```txt
Start med hva prosjektet er.
Vis hva det kan.
Forklar hvordan det kjøres.
Pek videre til dypere dokumentasjon.
```

---

## Prosjektintro

Introen skal være kort og konkret.

God struktur:

```txt
1. Hva prosjektet er
2. Hvem det er for eller hva det demonstrerer
3. Hva brukeren kan gjøre
4. Hvilken arkitektur eller struktur prosjektet følger
```

Eksempel:

```md
# Prosjektnavn

Prosjektnavn er en kort forklaring av hva prosjektet er, bygget med relevante teknologier.

Prosjektet er laget for [formål], og lar brukeren [viktigste brukerhandlinger].

Prosjektet følger [arkitekturmønster/prinsipp] med skille mellom [viktige lag].
```

Ikke skriv lang salgstekst.

Unngå vage ord som:

```txt
powerful
robust
seamless
intuitive
comprehensive
cutting-edge
state-of-the-art
```

Skriv konkret hva prosjektet gjør.

---

## Preview og bilder i README

Hvis prosjektet har UI, bør root README ha et skjermbilde eller en visuell preview.

Bilder som brukes i README skal ligge under:

```txt
docs/images/
```

Anbefalt struktur når bilder brukes:

```txt
docs/images/
├── screenshots/
│   ├── desktop/
│   ├── mobile/
│   └── states/
├── diagrams/
└── examples/
```

Eksempel:

```md
![Preview av appen](docs/images/screenshots/desktop/preview.png)
```

Bilder skal ha:

```txt
beskrivende filnavn
alt-tekst
riktig relativ sti
fornuftig størrelse
```

Gode filnavn:

```txt
exam-page-desktop.png
subject-select-mobile.png
feedback-panel-submitted.png
architecture-overview.png
```

Dårlige filnavn:

```txt
image.png
screenshot1.png
final-final.png
diagram_new2.png
```

Ikke opprett `docs/images/` hvis prosjektet ikke bruker bilder.

---

## Innholdsfortegnelse

README bør ha en innholdsfortegnelse når dokumentasjonen er delt opp i flere filer.

Bruk gjerne HTML-tabell for ryddig GitHub-visning.

Eksempel:

```html
## Innholdsfortegnelse

<table>
    <tr>
        <th>Seksjon</th>
        <th>Beskrivelse</th>
    </tr>
    <tr>
        <td>Funksjoner</td>
        <td><a href="./docs/documentation/FEATURES.md">Oversikt over sentrale funksjoner.</a></td>
    </tr>
    <tr>
        <td>Use cases</td>
        <td><a href="./docs/documentation/USECASES.md">Brukerflyter, aktører og alternative flyter.</a></td>
    </tr>
    <tr>
        <td>Arkitektur</td>
        <td><a href="./docs/architecture/ARCHITECTURE.md">Forklaring av lagdeling og dataflyt.</a></td>
    </tr>
    <tr>
        <td>Testing</td>
        <td><a href="./docs/documentation/TESTING.md">Teststrategi og testkommandoer.</a></td>
    </tr>
</table>
```

Regler:

```txt
Lenken skal peke til en fil som finnes.
Beskrivelsen skal si hva leseren finner der.
Innholdsfortegnelsen skal hjelpe navigasjon, ikke være pynt.
Ikke legg inn døde eller foreløpige lenker.
```

---

## Prosjektstruktur i README

Root README skal vise komprimert prosjektstruktur.

Ikke lim inn full `tree`.

Ikke ta med:

```txt
node_modules/
dist/
coverage/
.cache/
.vite/
build/
```

Eksempel:

```txt
Prosjektnavn/
├── README.md
├── docs/
├── public/
├── test/
└── src/
    ├── constants/
    ├── data/
    ├── di/
    ├── model/
    ├── ui/
    └── utils/
```

Full struktur hører hjemme i:

```txt
docs/documentation/PROJECT_STRUCTURE.md
```

---

## Arkitektur i root README

Root README skal ha en kort arkitekturintro.

Den bør inneholde:

```txt
kort forklaring
komprimert dataflyt
eventuelt arkitekturbilde
lenke til full arkitekturdokumentasjon
```

Eksempel på tekstlig dataflyt:

```txt
Data
  ↓
DataSource
  ↓
Repository
  ↓
Use Case
  ↓
ViewModel
  ↓
Page
  ↓
Components
```

Les mer i:

```txt
docs/architecture/ARCHITECTURE.md
```

Hvis prosjektet har arkitekturbilde:

```html
<p align="center">
  <img src="./docs/architecture/ARCHITECTURE.png" alt="Arkitekturdiagram" width="720" />
</p>
```

Arkitekturdiagrammet skal vise hovedflyt, ikke alle imports.

Hvis diagrammet blir en importgraf, er det feil nivå for README.

---

## Arkitekturflyt og diagramretning

Det finnes to legitime perspektiver på arkitekturflyt.

### Dataflyt

I tekstlig forklaring kan dataflyten beskrives slik:

```txt
Data
  ↓
DataSource
  ↓
Repository
  ↓
Use Case
  ↓
ViewModel
  ↓
Page
  ↓
Components
```

Dette forklarer hvordan data beveger seg fra datakilde til UI.

### Diagramlayout

I Mermaid-diagrammer kan layouten være top-down fra appen og nedover:

```txt
Dependencies / Configuration
        ↓
App
        ↓
Pages / Views
        ↓
Components
        ↓
ViewModels
        ↓
Domain Use Cases
        ↓
Repositories
        ↓
DataSources
        ↓
Data
```

Dette er en leseretning for diagrammet.

Diagrammet må likevel ikke antyde at View, Page eller Components henter data direkte fra Repository, DataSource eller Data.

---

## docs/architecture/

Arkitekturdokumentasjon skal ligge under:

```txt
docs/architecture/
```

Standardfiler:

```txt
docs/architecture/
├── ARCHITECTURE.md
├── ARCHITECTURE.png
└── MERMAID.md
```

Roller:

```txt
ARCHITECTURE.md
→ Forklarer arkitektur, lag, ansvar og dataflyt.

ARCHITECTURE.png
→ Rendret diagram som README kan vise pent på GitHub.

MERMAID.md
→ Prosjektets konkrete Mermaid-kilde eller diagramforklaring.
```

Hvis prosjektet bruker flere diagramkilder, kan disse legges i samme mappe:

```txt
docs/architecture/
├── ARCHITECTURE.md
├── ARCHITECTURE.png
├── MERMAID.md
├── app-architecture.mmd
├── data-flow.mmd
└── ui-flow.mmd
```

Regel:

```txt
Mermaid-kilde er source of truth.
PNG er rendret output.
Når Mermaid endres, skal PNG regenereres.
```

---

## MERMAID_SOUL.md vs MERMAID.md

Skill mellom normative diagramregler og prosjektets konkrete diagrammer.

```txt
docs/soul-docs/MERMAID_SOUL.md
→ Regler for hvordan diagrammer skal lages, avgrenses og vurderes.

docs/architecture/MERMAID.md
→ Prosjektets konkrete Mermaid-kilde eller forklaring av diagrammet.

docs/architecture/ARCHITECTURE.png
→ Rendret output som brukes i README.
```

`MERMAID.md` skal ikke duplisere hele `MERMAID_SOUL.md`.

Hvis diagramreglene endres, oppdater `MERMAID_SOUL.md`.

Hvis prosjektets diagram endres, oppdater `MERMAID.md`, `ARCHITECTURE.png` og eventuelt `ARCHITECTURE.md`.

---

## Arkitekturdiagrammer

Arkitekturdiagrammer skal vise arkitekturflyt, ikke full teknisk importstruktur.

Riktig fokus:

```txt
lag
ansvar
hovedflyt
dataflyt
arkitekturgrenser
viktige avhengigheter
```

Feil fokus:

```txt
alle imports
alle hjelpefunksjoner
alle CSS-filer
alle constants
alle context-filer
alle små komponenter
alle props
```

Repository og DataSource skal ikke skjules i ett generisk `Model`-lag hvis målet er å forklare arkitekturen.

---

## FEATURES.md

`docs/documentation/FEATURES.md` skal beskrive hva prosjektet kan gjøre.

Funksjoner skal grupperes i naturlige seksjoner.

Eksempel:

```txt
Sentrale funksjoner
├── Eksamensflyt
├── Spørsmålstyper
├── Feedback og fasit
├── Resultat og progresjon
├── Språk og tema
├── Layout og navigasjon
└── Utvidbarhet
```

Hver seksjon bør ha:

```txt
1. Kort innledende avsnitt
2. Én liten tabell
3. Konsekvent punktum i beskrivelser
```

Godt:

```txt
flere små tabeller gruppert etter tema
```

Unngå:

```txt
én stor tabell med 30+ rader uten pauser
```

Hvis tabellene ser bedre ut på GitHub som HTML, bruk HTML-tabeller.

---

## USECASES.md

`docs/documentation/USECASES.md` skal beskrive hva brukeren, systemet og eventuelle adminroller faktisk gjør.

Det skal ikke bare være en feature-liste.

Det skal beskrive:

```txt
aktører
use case-oversikt
pre-betingelser
post-betingelser
trigger
hovedflyt
alternativ flyt
feilflyt / unntaksflyt
kobling til testing
kobling til sikkerhet
```

Standardstruktur:

```txt
1. Kort intro
2. Eventuelt use case-diagram
3. Aktører
4. Use case-oversikt
5. Primær brukerflyt
6. Tekstlige beskrivelser av sentrale use cases
7. Alternative flyter
8. Feilflyter / unntaksflyter
9. Use case → feature → testcase
10. Use case → abuse case → sikkerhetstiltak
```

### Use case-oversikt

Start med en kompakt oversiktstabell.

```html
<table>
    <tr>
        <th>ID</th>
        <th>Use case</th>
        <th>Primæraktør</th>
        <th>Kort beskrivelse</th>
    </tr>
    <tr>
        <td>UC-01</td>
        <td>Velge fag</td>
        <td>Bruker</td>
        <td>Brukeren velger hvilket fag de vil øve på.</td>
    </tr>
</table>
```

### Tekstlig beskrivelse av use case

De viktigste use casene skal ha tekstlig beskrivelse.

Mal:

```md
## UC-XX — Navn på use case

<table>
    <tr>
        <th>Felt</th>
        <th>Beskrivelse</th>
    </tr>
    <tr>
        <td>Navn</td>
        <td>Navn på use case.</td>
    </tr>
    <tr>
        <td>Primæraktør</td>
        <td>Hvem som starter eller eier flyten.</td>
    </tr>
    <tr>
        <td>Sekundæraktør</td>
        <td>Eksterne systemer, API-er, backend, database eller andre roller.</td>
    </tr>
    <tr>
        <td>Pre-betingelser</td>
        <td>Hva som må være sant før flyten starter.</td>
    </tr>
    <tr>
        <td>Post-betingelser</td>
        <td>Hva som skal være sant etter at flyten er fullført.</td>
    </tr>
    <tr>
        <td>Trigger</td>
        <td>Hva som starter flyten.</td>
    </tr>
</table>

### Hovedflyt

1. Første steg.
2. Andre steg.
3. Systemet gjør noe.
4. Brukeren ser resultatet.

### Alternativ flyt 1 — Navn på alternativ flyt

2.1 Alternativt steg.  
2.2 Systemet gjør noe annet.  
2.3 Flyten returnerer til punkt 3 i hovedflyten.

### Feilflyt 1 — Navn på feilflyt

3.1 Noe feiler.  
3.2 Systemet viser feilmelding eller fallback.  
3.3 Brukeren kan prøve igjen eller gå tilbake.
```

### Alternativ flyt vs feilflyt

<table>
    <tr>
        <th>Type flyt</th>
        <th>Beskrivelse</th>
    </tr>
    <tr>
        <td>Alternativ flyt</td>
        <td>En gyldig variant av normal bruk, for eksempel at brukeren velger en annen visning eller hopper over et spørsmål.</td>
    </tr>
    <tr>
        <td>Feilflyt / unntaksflyt</td>
        <td>Noe går galt, for eksempel API-feil, manglende data, ugyldig input eller avbrutt handling.</td>
    </tr>
</table>

Ikke alle use cases trenger full detaljbeskrivelse.

Bruk full beskrivelse for:

```txt
hovedflyten i appen
kritiske brukerhandlinger
backend/API/database-flyter
adminflyter
sikkerhetsrelevante flyter
flyter som krever tydelig testing
```

---

## MODELLING.md

`docs/documentation/MODELLING.md` skal samle og forklare prosjektets modeller og diagrammer.

Det skal ikke erstatte `ARCHITECTURE.md`, `USECASES.md` eller `SECURITY.md`.

Det skal gi visuell oversikt og peke videre til detaljdokumentene.

Typiske modeller:

```txt
forenklet arkitekturoversikt
klasse-/strukturdiagram
use case-diagram
aktivitetsdiagram
sekvensdiagram
dataflytdiagram
trusselmodell
```

Standardstruktur:

```txt
1. Kort intro
2. Innholdsfortegnelse
3. Forenklet arkitekturoversikt
4. Use case-diagram
5. Aktivitetsdiagrammer
6. Sekvensdiagrammer
7. Klasse-/strukturdiagrammer
8. Avgrensninger
9. Lenker til detaljerte dokumenter
```

Hvert diagram skal ha:

```txt
hva diagrammet viser
hvorfor diagrammet finnes
hva som bevisst er utelatt
lenke til mer detaljert dokumentasjon
```

Diagrammer skal ligge under:

```txt
docs/images/diagrams/
```

Eksempel:

```md
![Use case-diagram](../images/diagrams/usecase-diagram.png)
```

---

## SETUP.md

`docs/documentation/SETUP.md` skal forklare hvordan prosjektet installeres, kjøres og konfigureres.

Skal minst dekke:

```txt
krav til miljø
installasjon
utviklingsserver
build
testing
miljøvariabler
vanlige problemer
```

Eksempelstruktur:

```txt
1. Krav
2. Installering
3. Kjøring lokalt
4. Build
5. Testkommandoer
6. Miljøvariabler
7. Feilsøking
```

Root README skal bare ha hurtigstart.

Detaljer hører i `SETUP.md`.

---

## PROJECT_STRUCTURE.md

`docs/documentation/PROJECT_STRUCTURE.md` skal forklare mappestrukturen.

Det skal ikke bare være en `tree`-dump.

For hver sentral mappe, forklar:

```txt
hva den inneholder
hva slags ansvar den har
hva som ikke skal ligge der
```

God struktur:

```txt
src/data/
→ rådata, mockdata eller statiske data

src/model/datasource/
→ henter data fra lokal kilde, API eller database

src/model/repositories/
→ abstraherer datasources og returnerer domeneobjekter

src/model/domain/
→ use cases og domenelogikk

src/ui/viewmodel/
→ state, handlers og avledede verdier

src/ui/view/
→ pages og presentasjon

src/ui/components/
→ gjenbrukbare UI-komponenter
```

Ikke dokumenter mapper som ikke finnes.

---

## DESIGN_DECISIONS.md

`docs/documentation/DESIGN_DECISIONS.md` skal forklare hvorfor prosjektet er strukturert som det er.

Typiske seksjoner:

```txt
Data og innhold
Domenelogikk
ViewModels og state
Sider og komponentstruktur
Lokal logikk og hjelpefunksjoner
UI og layout
CSS og visuell struktur
Språk, tema og globale valg
```

Bruk tabeller når de forklarer forholdet mellom ting:

```txt
prinsipp → betydning
felt → bruk
lag → ansvar
stateområde → eksempel
token-type → bruk
```

Ikke bruk tabell bare for å ramse opp komponentnavn.

Enkle komponentlister kan skrives inline:

```md
Fagvelgeren er delt opp i `SubjectSelectTopbar`, `SubjectSelectControls`, `SubjectSelectGrid` og `SubjectSelectCard`.
```

---

## STYLING.md

`docs/documentation/STYLING.md` skal forklare visuell struktur, CSS-organisering og designregler.

Bør dekke:

```txt
CSS-struktur
design tokens
farger
typografi
spacing
radius
skygger
tema
responsivitet
layoutprinsipper
komponent-spesifikke CSS-regler
```

For UI-prosjekter bør `STYLING.md` finnes.

Hvis prosjektet bruker design tokens, skal dokumentet forklare hvor de ligger og hvordan de brukes.

---

## TESTING.md

`docs/documentation/TESTING.md` skal forklare hvordan prosjektet testes.

Den skal være praktisk, ikke teoretisk.

Bør dekke:

```txt
hva som testes
testkommandoer
manuell testliste
hva som ikke testes ennå
testregler for nye endringer
feilsøking
```

Eksempel på testmatrise:

```html
<table>
    <tr>
        <th>Endringstype</th>
        <th>Sjekk</th>
    </tr>
    <tr>
        <td>Dokumentasjon</td>
        <td><code>git diff --check</code></td>
    </tr>
    <tr>
        <td>CSS/layout</td>
        <td><code>npm run build</code> + manuell visuell sjekk.</td>
    </tr>
    <tr>
        <td>Domenelogikk</td>
        <td><code>npm test</code> + <code>npm run build</code>.</td>
    </tr>
    <tr>
        <td>Dataformat</td>
        <td>Import-/build-sjekk + relevant manuell flyt.</td>
    </tr>
</table>
```

Ikke skriv at tester er kjørt hvis de ikke faktisk er kjørt.

---

## SECURITY.md

`docs/documentation/SECURITY.md` skal finnes når prosjektet har:

```txt
backend
database
API
auth
adminfunksjoner
brukerdata
lagrede resultater
eksterne integrasjoner
offentlig deploy
```

Ikke lag en full `SECURITY.md` bare for å fylle en mal.

Lag den når prosjektet faktisk har sikkerhetsflater.

For rene statiske frontend-demoer kan `SECURITY.md` være valgfri.

### SECURITY.md skal minst inneholde

```txt
1. Formål
2. Scope
3. Grunnprinsipper
4. Trust boundaries
5. Data og verdier som skal beskyttes
6. Sikkerhetstiltak
7. STRIDE-trusselmodell
8. Use case → abuse case → testcase
9. Backend- eller Supabase-spesifikke regler
10. Produksjonssjekkliste
11. Kjente åpne sikkerhetsspørsmål
```

### Grunnprinsipper

Sikkerhetsdokumentet bør dekke:

```txt
Valider all input.
Stol aldri på frontend.
Bruk parameterisert SQL.
Escape output.
Hash passord.
Bruk HTTPS.
Beskytt secrets.
Logg uten å lekke sensitiv informasjon.
```

### STRIDE-tabell

Bruk STRIDE når prosjektet har backend, API, auth eller database.

```html
<table>
    <tr>
        <th>ID</th>
        <th>Område</th>
        <th>STRIDE</th>
        <th>Trussel</th>
        <th>Konsekvens</th>
        <th>Risiko</th>
        <th>Tiltak</th>
    </tr>
    <tr>
        <td>T1</td>
        <td>Admin API</td>
        <td>S / E</td>
        <td>Angriper får admin-tilgang.</td>
        <td>Kan endre eller slette data.</td>
        <td>Høy</td>
        <td>Admin-auth, secret handling, rate limit og logging.</td>
    </tr>
</table>
```

### Use case → abuse case → testcase

`SECURITY.md` bør gjøre sikkerhet testbart.

```html
<table>
    <tr>
        <th>Use case</th>
        <th>Abuse case</th>
        <th>Forventet beskyttelse</th>
        <th>Testcase</th>
    </tr>
    <tr>
        <td>Bruker leverer eksamen</td>
        <td>Klienten sender manipulert score.</td>
        <td>Backend beregner score selv.</td>
        <td>Send <code>score: 100</code> og verifiser at backend ignorerer klient-score.</td>
    </tr>
</table>
```

---

## DATA.md

`docs/documentation/DATA.md` skal forklare dataformat, datakilder og datakontrakter.

Bør finnes når prosjektet har:

```txt
mockdata
API-data
database
JSON-kontrakter
importformat
flere språkversjoner
migreringer
```

Bør dekke:

```txt
hvor data ligger
hvordan data lastes
hvilke felter som kreves
hvordan data valideres
hvordan data flyter gjennom arkitekturen
hvordan data kan utvides
```

Ikke gjenta hele arkitekturen.

Forklar data spesielt.

---

## ROADMAP.md

`docs/documentation/ROADMAP.md` skal beskrive planlagt videre arbeid.

Root README kan lenke til roadmap, men bør ikke inneholde lange roadmap-lister.

Roadmap skal skille mellom:

```txt
planlagt
pågår
ferdig
usikkert / vurderes
```

Ikke presenter planlagte features som om de allerede finnes.

---

## REFERENCES.md

`docs/documentation/REFERENCES.md` skal brukes når prosjektet bygger på:

```txt
pensum
fagkilder
API-er
datasett
eksterne artikler
dokumentasjon
standarder
```

Root README kan ha kort kildehenvisning, men lange kildelister bør flyttes til `REFERENCES.md`.

Bruk konsekvent format.

Ikke ta med kilder som ikke faktisk er brukt.

---

## Tabellregler

Tabeller skal brukes når de gjør informasjon lettere å sammenligne.

Bruk tabeller for:

```txt
funksjon → beskrivelse
teknologi → bruk
seksjon → innhold
felt → betydning
lag → ansvar
kommando → forklaring
use case → aktør
risiko → tiltak
testtype → kommando
```

Unngå tabeller for:

```txt
vanlige avsnitt
enkle oppramsinger
lange forklaringer
komponentnavn uten reell forklaring
innhold som blir for bredt på mobil
```

Hvis en tabell får veldig lange celler, del innholdet i flere seksjoner.

---

## Markdown-tabeller vs HTML-tabeller

Bruk markdown-tabeller når tabellen er kort og enkel.

Bruk HTML-tabeller når:

```txt
tabellen skal se bedre ut på GitHub
celler inneholder code-tags
celler inneholder lenker
tabellen har lengre beskrivelser
du vil ha mer kontroll på struktur
```

Eksempel på HTML-tabell:

```html
<table>
    <tr>
        <th>Funksjon</th>
        <th>Beskrivelse</th>
    </tr>
    <tr>
        <td><code>multiple choice</code></td>
        <td>Støtter både ett riktig svar og flere riktige svar.</td>
    </tr>
</table>
```

Ikke bruk HTML-tabeller bare for pynt hvis markdown-tabell er mer lesbar i kildefilen.

---

## Visuell variasjon

God dokumentasjon bruker flere presentasjonsformer.

Anbefalt miks:

```txt
korte avsnitt
HTML-tabeller
markdown-tabeller
kodeblokker
text-diagrammer
Mermaid-diagrammer
skjermbilder
arkitekturdiagrammer
punktlister
lenker videre
```

Ikke bruk alt i hver seksjon.

God rytme:

```txt
kort avsnitt
→ tabell
→ kort forklaring
→ kodeblokk eller diagram
→ lenke videre
```

Dårlig rytme:

```txt
tabell
→ tabell
→ tabell
→ tabell
```

eller:

```txt
langt avsnitt
→ langt avsnitt
→ langt avsnitt
```

README skal føles lett å skumme.

---

## Backticks

Bruk backticks for:

```txt
filnavn
mapper
kommandoer
tekniske begreper
type-verdier
komponentnavn
klasse- eller funksjonsnavn
konkrete feature-navn når de behandles som labels
```

Eksempler:

```txt
`README.md`
`docs/documentation/FEATURES.md`
`npm run dev`
`multiple choice`
`ViewModel`
`dependencies.js`
```

Ikke bruk backticks på vanlige ord bare for pynt.

---

## Språk og tone

Skriv:

```txt
kort
presist
direkte
prosjektnært
konkret
```

Unngå AI-slop:

```txt
robust
powerful
seamless
intuitive
comprehensive
cutting-edge
state-of-the-art
leverage
facilitate
enhance
crucial
pivotal
```

Ikke skriv:

```txt
This project showcases a robust and seamless architecture.
```

Skriv heller:

```txt
Prosjektet skiller datahenting, domenelogikk, viewmodels og UI-komponenter.
```

Hvis noe er viktig, forklar konkret hvorfor.

---

## Faktisk prosjektstruktur skal alltid sjekkes

Ikke skriv README basert på antakelser.

Før README eller docs genereres, sjekk faktisk prosjektstruktur:

```bash
ls
find . -maxdepth 2 -type f | sort
find docs -maxdepth 3 -type f | sort
find src -maxdepth 3 -type d | sort
cat package.json
```

Ved frontend-prosjekter:

```bash
find src/ui -maxdepth 5 -type f | sort
find src/model -maxdepth 5 -type f | sort
find src/data -maxdepth 5 -type f | sort
```

Ved backend-prosjekter:

```bash
find src -maxdepth 5 -type f | sort
find server -maxdepth 5 -type f | sort
find db -maxdepth 5 -type f | sort
```

Ikke dokumenter mapper, scripts, tester eller teknologier som ikke finnes.

---

## README skal ikke lyve

Forbudt:

```txt
Å si at tester finnes hvis de ikke finnes.
Å si at build er testet hvis den ikke er kjørt.
Å si at appen støtter features som bare er planlagt.
Å lenke til filer som ikke finnes.
Å vise arkitektur som prosjektet ikke følger.
Å skrive at noe er automatisk hvis det er manuelt.
Å late som sikkerhetstiltak finnes før de er implementert.
```

Hvis noe er planlagt, legg det i `ROADMAP.md`.

Hvis noe er delvis implementert, skriv det tydelig.

---

## Dokumentasjonspatcher

Endringer i README og `docs/**` er dokumentasjonspatcher.

De skal vanligvis ikke endre:

```txt
runtime-kode
package.json
package-lock.json
tester
CSS
datafiler
```

Minimumssjekk:

```bash
git diff --check
```

Hvis dokumentasjonen inneholder kommandoer, filstier, scripts eller diagrammer, skal de sjekkes mot faktisk prosjektstruktur.

For detaljer om patch-leveranse, følg `PATCH_SOUL.md`.

---

## Standard AI-arbeidsflyt for README

Når en AI-assistent skal lage eller forbedre README:

```txt
1. Les eksisterende README.
2. Inspiser faktisk filstruktur.
3. Les package.json.
4. Finn eksisterende docs-mapper.
5. Finn arkitektur- eller SOUL-dokumenter.
6. Identifiser hva som bør bli i root README.
7. Identifiser hva som bør flyttes til docs.
8. Lag kort hoved-README.
9. Lag eller foreslå sub-dokumenter.
10. Sjekk lenker og stier.
11. Sjekk språk og visuell variasjon.
12. Ikke oppfinn filer, scripts eller features.
```

Ikke gjett.

Ikke skriv at noe finnes før det er verifisert.

---

## Sjekkliste for root README

Root README er klar når dette er sant:

```txt
[ ] Prosjektet forklares på under tre korte avsnitt.
[ ] Hovedfeatures beskrives kort.
[ ] Det finnes tydelig innholdsfortegnelse hvis docs er delt opp.
[ ] Alle lenker peker til filer som finnes.
[ ] Prosjektstruktur er komprimert og uten node_modules/dist.
[ ] Arkitektur vises på overordnet nivå.
[ ] Full arkitektur lenkes til egen docs-fil.
[ ] Teknologier er relevante og korrekte.
[ ] Oppsett kan følges av en ny utvikler.
[ ] Testkommandoer er riktige.
[ ] Detaljer er flyttet ut til docs.
[ ] README ser ryddig ut på GitHub.
[ ] Tabeller brukes der de gir oversikt.
[ ] Det er ikke én lang massiv tekstblokk.
[ ] Det er ikke én lang massiv tabell.
[ ] Backticks brukes for tekniske navn.
[ ] Bilder har alt-tekst.
[ ] Kilder er formatert konsekvent hvis de finnes.
[ ] Språket er konkret og uten AI-slop.
[ ] README er basert på faktisk filstruktur.
```

---

## Sjekkliste for sub-dokumenter

Alle dokumenter under `docs/` bør ha:

```txt
[ ] Tilbake-lenke til README.
[ ] Kort intro.
[ ] Tydelige seksjoner.
[ ] Konsekvent bruk av tabeller, kodeblokker og tekst.
[ ] Lenker videre der det er relevant.
[ ] Ingen unødvendig duplisering av root README.
[ ] Ingen placeholder-tekst.
[ ] Ingen lenker til filer som ikke finnes.
```

Standardstart:

```md
<a href="../../README.md">← Tilbake til README</a>

---

# Dokumenttittel

Kort forklaring av hva dokumentet dekker.
```

---

## Når README skal deles opp

Del README når en seksjon blir for lang.

Tegn på at innhold bør flyttes ut:

```txt
Seksjonen er mer enn 1–2 skjermer lang.
Seksjonen har mange detaljerte regler.
Seksjonen må oppdateres ofte.
Seksjonen er mest relevant for utviklere.
Seksjonen handler om test, styling, dataformat, use cases, sikkerhet eller arkitektur i detalj.
```

Flytt til riktig dokument:

```txt
FEATURES.md
USECASES.md
MODELLING.md
SETUP.md
PROJECT_STRUCTURE.md
DESIGN_DECISIONS.md
STYLING.md
TESTING.md
SECURITY.md
DATA.md
ROADMAP.md
REFERENCES.md
```

---

## Kortversjon

```txt
README er forsiden.
docs er dybden.

Start med hva prosjektet er.
Forklar hva det kan.
Vis hvordan det kjøres.
Pek videre til detaljer.

Bruk minimumsstruktur for små prosjekter.
Bruk standardstruktur for vanlige apper.
Bruk utvidet struktur når prosjektet trenger det.

Bruk visuell variasjon.
Ikke gjør alt til tabeller.
Ikke gjør alt til tekst.
Bruk bilder og diagrammer når de hjelper.

Ha arkitekturdokumentasjon når systemet har tydelig arkitektur.
Ha testingdokumentasjon når prosjektet har tester eller manuelle testbehov.
Ha use cases for større apper.
Ha sikkerhetsdokumentasjon når prosjektet har backend, API, auth, database, brukerdata eller adminfunksjoner.

Sjekk faktisk filstruktur.
Ikke dokumenter ting som ikke finnes.
Ikke lyv om tester, features, sikkerhet eller arkitektur.
```

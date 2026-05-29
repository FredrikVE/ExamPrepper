# QUESTION_TYPE_SOUL.md — Regler for valg av oppgavetype i ExamPrepper

<!-- Sist oppdatert: 2026-05-29 -->

Dette dokumentet beskriver hvordan man skal velge, skrive og kvalitetssikre oppgavetyper i ExamPrepper.

Målet er ikke å bruke mest mulig fancy UI. Målet er å velge den oppgavetypen som tester det studenten faktisk skal lære.

Når du lager en ny oppgave: start med fagstrukturen, ikke med komponenten.

---

## Hva dette dokumentet er

Dette er en **content-authoring SOUL**.

`SOUL.md` beskriver hvordan applikasjonen skal bygges arkitektonisk.

`QUESTION_TYPE_SOUL.md` beskriver hvordan oppgaver skal lages pedagogisk og datamessig.

```txt
SOUL.md
→ Hvordan koden skal organiseres

QUESTION_TYPE_SOUL.md
→ Hvordan oppgaver skal velges, struktureres og skrives
```

Dette dokumentet er normativt. Det beskriver hvordan nye oppgaver **skal** lages.

---

## Grunnregel

Velg oppgavetype ut fra hva studenten skal gjøre kognitivt:

```txt
Gjenkjenne ett riktig svar              → SingleRadioButtonChoice
Velge flere riktige utsagn              → MultiCheckboxSelect
Huske et presist begrep                 → FillBlankInputField
Matche én ting til én ting              → TableMatch
Sortere flere ting i kategorier         → CategorySort
Plassere ting i en todimensjonal modell → MatrixPlacement
Sette ting i riktig rekkefølge          → SequenceOrder
```

Hvis oppgavetypen ikke passer fagstrukturen, blir oppgaven dårlig selv om UI-et ser bra ut.

---

## Appens faktiske type-verdier

Bruk disse verdiene i datafilene.

| Pedagogisk navn         |  Appens `type`-verdi | Brukes til                        |
| ----------------------- | -------------------: | --------------------------------- |
| SingleRadioButtonChoice |           `"single"` | Ett riktig svar                   |
| MultiCheckboxSelect     |            `"multi"` | Flere riktige svar                |
| FillBlankInputField     |             `"fill"` | Presist kort tekstsvar            |
| TableMatch              |         `"dragDrop"` | Én-til-én-match                   |
| CategorySort            |  `"drag-categorize"` | Flere kort inn i kategorier       |
| MatrixPlacement         | `"matrix-placement"` | Plassering i todimensjonal modell |
| SequenceOrder           |    `"SequenceOrder"` | Rekkefølge                        |

Viktig:

```txt
"dragDrop" betyr pedagogisk TableMatch.
"drag-categorize" betyr pedagogisk CategorySort.
"SequenceOrder" er foreløpig appens faktiske type-verdi, selv om navnet ikke følger samme stil som de andre.
```

Ikke finn på nye type-strenger.

---

## Før du velger oppgavetype: velg læringsnivå

En god oppgave starter ikke med UI. Den starter med hva slags forståelse studenten skal demonstrere.

```txt
Nivå 1: Gjenkjenne
→ Studenten kjenner igjen riktig definisjon, begrep eller utsagn.

Nivå 2: Skille
→ Studenten skiller mellom nærliggende begreper som ofte forveksles.

Nivå 3: Strukturere
→ Studenten organiserer begreper, faser, modeller eller eksempler.

Nivå 4: Anvende
→ Studenten bruker en modell på en casebeskrivelse.

Nivå 5: Begrunne
→ Studenten forklarer hvorfor en vurdering er riktig i en konkret situasjon.
```

Autograderte oppgaver egner seg best for nivå 1–4.

Nivå 5 kan delvis støttes gjennom gode casebaserte oppgaver og utvidet feedback, men selve begrunnelsen bør vanligvis ligge i `whyExtended`, ikke i fasiten alene.

---

## Gjenkjenning er ikke nok

Mange dårlige oppgaver er teknisk korrekte, men pedagogisk svake.

Svak oppgave:

```txt
Operational Backbone → definisjon
```

Dette tester bare gjenkjenning.

Sterkere oppgave:

```txt
Case: En virksomhet har fragmenterte kundedata, mange manuelle overføringer
og ulike prosesser i hver avdeling. Hvilken D4D-byggekloss bør forbedres først?

→ Operational Backbone
```

Dette tester anvendelse.

Bruk derfor denne progresjonen når det er mulig:

```txt
Begrep → definisjon          = grunnleggende
Begrep → eksempel            = bedre
Case → riktig begrep/modell  = sterkere
Case → prioritering          = mest eksamensnært
```

---

## Beslutningstre

```txt
                              ┌──────────────────────────────┐
                              │ Hva skal studenten gjøre?     │
                              └──────────────┬───────────────┘
                                             │
        ┌────────────────────────────────────┼────────────────────────────────────┐
        │                                    │                                    │
        ▼                                    ▼                                    ▼
┌────────────────┐                 ┌────────────────┐                 ┌────────────────┐
│ Velge svar     │                 │ Skrive svar    │                 │ Flytte kort    │
└───────┬────────┘                 └───────┬────────┘                 └───────┬────────┘
        │                                  │                                  │
        ▼                                  ▼                                  ▼
┌────────────────────────┐       ┌────────────────────────┐       ┌────────────────────────┐
│ Ett riktig?            │       │ Presist begrep?        │       │ Én-til-én?             │
│ → "single"             │       │ → "fill"               │       │ → "dragDrop"           │
├────────────────────────┤       └────────────────────────┘       ├────────────────────────┤
│ Flere riktige?         │                                        │ Flere i samme kategori?│
│ → "multi"              │                                        │ → "drag-categorize"    │
└────────────────────────┘                                        ├────────────────────────┤
                                                                  │ To akser?              │
                                                                  │ → "matrix-placement"   │
                                                                  ├────────────────────────┤
                                                                  │ Rekkefølge?            │
                                                                  │ → "SequenceOrder"      │
                                                                  └────────────────────────┘
```

Bruk denne rekkefølgen når du velger oppgavetype:

```txt
1. Skal studenten skrive inn et presist begrep?
   → "fill"

2. Skal studenten velge ett riktig svar?
   → "single"

3. Skal studenten velge flere riktige svar?
   → "multi"

4. Skal hvert kort ha nøyaktig én match?
   → "dragDrop"

5. Skal flere kort kunne høre til samme kategori?
   → "drag-categorize"

6. Skal kort plasseres i en matrise med to akser?
   → "matrix-placement"

7. Skal kort plasseres i en bestemt rekkefølge?
   → "SequenceOrder"

8. Hvis ingen av disse passer:
   → Ikke lag oppgaven ennå. Presiser fagstrukturen først.
```

---

## Kvalitetskrav for alle oppgaver

En oppgave er ikke ferdig før den har:

```txt
1. Entydig fasit
2. Plausible distraktorer
3. Klar kobling til pensum
4. Korrekt type-verdi
5. Nok informasjon i prompten
6. Feedback som forklarer faglig forskjell
7. Source-felt som peker på relevant pensumgrunnlag
8. Ingen skjult flertydighet
9. Ingen UI-type valgt bare fordi den ser kul ut
```

---

## Standardfelter

Alle oppgaver bør minst ha:

```js
{
  id: 1,
  type: "...",
  title: "...",
  points: 1,
  prompt: "...",
  source: "Fasit: IN5431, ...",
  ...
}
```

Bruk `source` til å si hvor fasiten kommer fra.

Eksempler:

```txt
Fasit: IN5431, CIO Toolbox, forelesning om IT governance.
Fasit: IN5431, Designed for Digital, building blocks.
Fasit: IN5431, forelesning om business case og alternative analysis.
```

Ikke bruk vage kilder som:

```txt
Pensum
Forelesning
Internett
ChatGPT
```

---

# Oppgavetyper

---

## 1. SingleRadioButtonChoice

App-type:

```js
type: "single"
```

Brukes når studenten skal velge ett riktig alternativ.

```txt
┌──────────────────────────────────────────────┐
│ Hva beskriver best digital transformasjon?   │
├──────────────────────────────────────────────┤
│ ○ Å skanne papirskjemaer                     │
│ ● Betydelig organisatorisk endring drevet    │
│   eller muliggjort av digital teknologi      │
│ ○ Å kjøpe et nytt IT-system                  │
│ ○ Å automatisere én isolert arbeidsoppgave   │
└──────────────────────────────────────────────┘
```

Passer til:

```txt
beste definisjon
hovedpoeng
mest presise forklaring
hvilket utsagn er riktig
hvilket utsagn er ikke riktig
hva er beste anbefaling i en enkel case
```

God struktur:

```js
{
  id: 1,
  type: "single",
  title: "Hva er digital transformasjon?",
  points: 1,
  prompt: "Hvilket utsagn beskriver best digital transformasjon?",
  source: "Fasit: IN5431, forelesning om digital strategy and digital transformation.",
  options: [
    {
      text: "Betydelig organisatorisk endring drevet eller muliggjort av omfattende bruk av digital teknologi.",
      correct: true,
      why: "Riktig: digital transformasjon handler om omfattende organisatorisk endring, ikke bare enkeltstående IT-tiltak.",
      whyExtended: [
        "Begrepet peker på endringer i hvordan mennesker arbeider, hvordan prosesser organiseres og hvordan virksomheten skaper verdi."
      ]
    },
    {
      text: "Å skanne papirskjemaer og lagre dem som PDF-er.",
      correct: false,
      why: "Feil: dette er et typisk eksempel på digitisering, ikke digital transformasjon.",
      whyExtended: [
        "Digital transformasjon krever mer enn teknisk omforming av informasjon."
      ]
    }
  ]
}
```

Bruk denne når distraktorene er faglig plausible.

Ikke bruk denne når flere alternativer kan være riktige.

---

### Gode SingleRadioButtonChoice-spørsmål

```txt
Hva beskriver best IT governance?

Hva er hovedforskjellen mellom business strategy og digital strategy?

Hvilken D4D-byggekloss er mest relevant når virksomheten mangler standardiserte
og integrerte kjerneprosesser?

Hva er den beste beskrivelsen av operational backbone?
```

---

### Dårlige SingleRadioButtonChoice-spørsmål

```txt
Hvilke av disse beskriver TOGAF?
```

Hvis flere svar kan være riktige, skal dette være `multi`.

```txt
Hva er riktig?
```

For vagt. Spørsmålet må si hva studenten skal vurdere.

---

## 2. MultiCheckboxSelect

App-type:

```js
type: "multi"
```

Brukes når flere alternativer kan være riktige samtidig.

```txt
┌───────────────────────────────────────────────┐
│ Hvilke utsagn beskriver TOGAF?                │
├───────────────────────────────────────────────┤
│ ☑ Et rammeverk for Enterprise Architecture    │
│ ☑ Bruker ADM som arkitekturmetode             │
│ ☐ Et rammeverk for IT Service Management      │
│ ☑ Ofte forbundet med formell arkitekturstyring│
│ ☐ En metode for prosjektgjennomføring         │
└───────────────────────────────────────────────┘
```

Passer til:

```txt
flere kjennetegn
flere riktige utsagn
flere eksempler
flere konsekvenser
flere deler av en modell
flere relevante tiltak i en case
```

God struktur:

```js
{
  id: 2,
  type: "multi",
  title: "Kjennetegn ved TOGAF",
  points: 2,
  prompt: "Hvilke utsagn beskriver TOGAF?",
  source: "Fasit: IN5431, forelesning om IT Architecture og TOGAF.",
  options: [
    {
      text: "Et rammeverk for Enterprise Architecture.",
      correct: true,
      why: "Riktig: TOGAF er et rammeverk for virksomhetsarkitektur."
    },
    {
      text: "Bruker ADM som metode for arkitekturarbeid.",
      correct: true,
      why: "Riktig: Architecture Development Method er sentral i TOGAF."
    },
    {
      text: "Et rammeverk for IT Service Management.",
      correct: false,
      why: "Feil: dette beskriver ITIL, ikke TOGAF."
    },
    {
      text: "En metode for prosjektgjennomføring.",
      correct: false,
      why: "Feil: prosjektstyring passer bedre med PRINCE2."
    }
  ]
}
```

Regel:

```txt
Hvis oppgaven har mer enn ett riktig svar, bruk "multi".
```

Ikke bruk `single` med formuleringer som “hvilke av disse” hvis flere alternativer kan være riktige.

---

### Gode MultiCheckboxSelect-spørsmål

```txt
Hvilke utsagn beskriver Operational Backbone?

Hvilke av disse er D4D-byggeklosser?

Hvilke forhold bør vurderes i en business case?

Hvilke påstander beskriver accountability framework?
```

---

### Vanlig feil

Dårlig:

```txt
Hvilket av disse er typiske fordeler ved en digital platform?
```

Men fasiten har flere fordeler.

Riktig:

```txt
Hvilke av disse er typiske fordeler ved en digital platform?
```

og bruk `type: "multi"`.

---

## 3. FillBlankInputField

App-type:

```js
type: "fill"
```

Brukes når studenten skal huske et presist ord eller begrep.

```txt
┌──────────────────────────────────────────────┐
│ Architecture is always about the ______      │
│ of a system — or a group of systems.         │
├──────────────────────────────────────────────┤
│ Svar: [ design                         ]     │
└──────────────────────────────────────────────┘
```

Passer til:

```txt
nøkkelbegreper
presise modellnavn
akronymer
formelkomponenter
manglende ord i en kjent definisjon
```

God struktur:

```js
{
  id: 3,
  type: "fill",
  title: "Arkitektur som design",
  points: 1,
  prompt: "Architecture is always about the ______ of a system — or a group of systems.",
  source: "Fasit: IN5431, forelesning om IT Architecture.",
  answers: ["design"],
  whyCorrect: "Riktig: arkitektur handler grunnleggende om design.",
  whyWrong: "Feil: i denne formuleringen er det sentrale ordet 'design'.",
  whyExtended: [
    "I pensum brukes dette som en enkel inngang til å forstå arkitektur før mer formelle definisjoner som TOGAF."
  ]
}
```

Bruk denne sparsomt.

Den er god når begrepet er viktig i seg selv.

---

### Gode FillBlankInputField-svar

```txt
design
TOGAF
ADM
NPV
SMACIT
Cynefin
```

---

### Dårlige FillBlankInputField-svar

```txt
"en helhetlig organisatorisk konfigurering av mennesker, prosesser og teknologi"
```

For langt.

```txt
"fordi det muliggjør rask innovasjon gjennom gjenbrukbare komponenter"
```

For mange mulige formuleringer.

```txt
"business process integration and standardization"
```

Kan fungere, men bør heller være `single`, `dragDrop` eller `matrix-placement` hvis studenten skal forstå modellen.

---

### Viktig advarsel

`fill` tester ofte pugging.

Bruk `fill` når det er viktig å kunne navnet på begrepet.

Ikke bruk `fill` når målet er å teste forståelse, anvendelse eller begrunnelse.

---

## 4. TableMatch

App-type:

```js
type: "dragDrop"
```

Brukes når hver rad har én riktig match.

```txt
┌──────────────────────────────┐      ┌──────────────────────────────────────┐
│ Framework cards              │      │ Intended usage                       │
├──────────────────────────────┤      ├──────────────────────────────────────┤
│ ⋮ TOGAF                      │ ───▶ │ Enterprise architecture               │
│ ⋮ PRINCE2                    │ ───▶ │ Project governance and management     │
│ ⋮ Scrum                      │ ───▶ │ Agile software delivery               │
│ ⋮ ITIL                       │ ───▶ │ IT Service Management                 │
│ ⋮ Prosci / ADKAR             │ ───▶ │ Change management                     │
└──────────────────────────────┘      └──────────────────────────────────────┘
```

Dette er den beste oppgavetypen for:

```txt
begrep → definisjon
rammeverk → intended usage
modell → forklaring
domene → betydning
fase → typisk aktivitet
byggekloss → kort definisjon
```

God struktur:

```js
{
  id: 4,
  type: "dragDrop",
  title: "Rammeverk og bruksområde",
  points: 2,
  prompt: "Dra hvert rammeverk til riktig bruksområde.",
  source: "Fasit: IN5431, CIO Toolbox.",
  cards: [
    { id: "togaf", text: "TOGAF" },
    { id: "prince2", text: "PRINCE2" },
    { id: "itil", text: "ITIL" }
  ],
  targets: [
    {
      id: "enterprise-architecture",
      description: "Enterprise architecture",
      correctCardId: "togaf",
      correctLabel: "TOGAF",
      whyCorrect: "TOGAF er et rammeverk for enterprise architecture.",
      whyWrong: "Denne beskrivelsen handler om arkitekturarbeid, ikke prosjektstyring eller IT service management.",
      whyExtended: [
        "TOGAF forbindes ofte med formell arkitekturstyring og ADM."
      ]
    },
    {
      id: "project-governance",
      description: "Project governance and management",
      correctCardId: "prince2",
      correctLabel: "PRINCE2",
      whyCorrect: "PRINCE2 er et rammeverk for prosjektstyring og project governance.",
      whyWrong: "Denne beskrivelsen handler om prosjektgjennomføring, ikke arkitektur.",
      whyExtended: [
        "PRINCE2 legger vekt på roller, ansvar, business case, faser og styring."
      ]
    }
  ]
}
```

Regel:

```txt
Én riktig per rad = "dragDrop".
```

---

### Gode TableMatch-emner i IN5431

```txt
CIO-toolbox-verktøy → typisk formål
D4D-byggekloss → definisjon
IT governance-domene → forklaring
Governance archetype → beslutningstaker
Rammeverk → bruksområde
PRINCE2-prinsipp → betydning
```

---

### Når TableMatch er feil

Ikke bruk `dragDrop` når flere kort skal kunne havne i samme kategori.

Dårlig:

```txt
Sorter eksempler på digitisering, digitalisering og digital transformasjon.
```

Dette er ikke én-til-én. Flere eksempler kan høre til samme kategori.

Bruk `drag-categorize`.

---

## 5. CategorySort

App-type:

```js
type: "drag-categorize"
```

Brukes når flere kort kan høre til samme kategori.

```txt
┌───────────────────────────────┐
│ Kategorier                    │
├───────────────────────────────┤
│ Digitisering                  │
│  ├─ Skanne papirskjema        │
│  └─ Registrere data digitalt  │
│                               │
│ Digitalisering                │
│  ├─ Endre arbeidsprosess      │
│  └─ Bruke data i kundereise   │
│                               │
│ Digital transformasjon        │
│  ├─ Ny digital forretningsmod.│
│  └─ Omfattende org-redesign   │
└───────────────────────────────┘
```

Passer til:

```txt
eksempler → begrepskategori
utsagn → modellområde
tiltak → D4D-byggekloss
risikoer → type risiko
rammeverk → hovedfamilie
prosesser → styring/organisering/valg
```

God struktur:

```js
{
  id: 5,
  type: "drag-categorize",
  title: "Eksempler: digitisering, digitalisering og transformasjon",
  points: 2,
  prompt: "Dra hvert eksempel til riktig begrepskategori.",
  source: "Fasit: IN5431, digitalisering og digital transformasjon.",
  items: [
    { id: "scan-paper", label: "Skanne papirskjemaer" },
    { id: "change-workflow", label: "Endre arbeidsprosesser ved hjelp av digitale systemer" },
    { id: "new-business-model", label: "Utvikle en ny digital forretningsmodell" }
  ],
  categories: [
    { id: "digitisering", label: "Digitisering" },
    { id: "digitalisering", label: "Digitalisering" },
    { id: "digital-transformasjon", label: "Digital transformasjon" }
  ],
  correctAnswer: {
    digitisering: ["scan-paper"],
    digitalisering: ["change-workflow"],
    "digital-transformasjon": ["new-business-model"]
  },
  itemFeedback: {
    "scan-paper": {
      whyCorrect: "Å skanne papir er et teknisk eksempel på digitisering.",
      whyWrong: "Dette er teknisk omforming, ikke bred organisatorisk transformasjon.",
      whyExtended: [
        "Digitisering kan være et første steg, men er ikke nok i seg selv."
      ]
    }
  }
}
```

Regel:

```txt
Flere kort kan høre til samme kategori = "drag-categorize".
```

---

### Gode CategorySort-emner

```txt
Digitisering / digitalisering / digital transformasjon
CIO-toolbox: valg / organisering / styring / utforskning
D4D: business transformation / architecture transformation / governance transformation
Sustainability: positive / negative effekter av digital teknologi
IT governance: sentralisering / desentralisering / hybrid
```

---

### Når CategorySort er feil

Ikke bruk `drag-categorize` når hver kategori bare skal ha ett kort.

Dårlig:

```txt
TOGAF, PRINCE2, Scrum, ITIL → hvert sitt bruksområde
```

Dette er `dragDrop`.

---

## 6. MatrixPlacement

App-type:

```js
type: "matrix-placement"
```

Brukes når studenten skal plassere elementer i en todimensjonal modell.

```txt
                         Prosessstandardisering
                              Høy
                               ▲
                               │
        Replication            │          Unification
        Høy standardisering    │          Høy standardisering
        Lav integrasjon        │          Høy integrasjon
                               │
───────────────────────────────┼──────────────────────────────▶
                               │       Forretningsprosess-
                               │       integrasjon
        Diversification        │          Coordination
        Lav standardisering    │          Lav standardisering
        Lav integrasjon        │          Høy integrasjon
                               │
                              Lav
```

Passer til:

```txt
operating model matrix
governance-spenninger med to akser
caseplassering i 2x2-modell
høy/lav grad av to dimensjoner
```

God struktur:

```js
{
  id: 6,
  type: "matrix-placement",
  title: "Operating model matrix",
  points: 3,
  prompt: "Dra hver operating model til riktig kvadrant.",
  source: "Fasit: IN5431, CIO Toolbox, forelesning om IT Architecture.",
  matrix: {
    xAxis: {
      label: "Forretningsprosessintegrasjon",
      lowLabel: "Lav",
      highLabel: "Høy"
    },
    yAxis: {
      label: "Prosessstandardisering",
      lowLabel: "Lav",
      highLabel: "Høy"
    },
    quadrants: [
      {
        id: "high-standardization-low-integration",
        title: "Høy standardisering / Lav integrasjon",
        description: "Standardiserte prosesser, men begrenset integrasjon på tvers"
      },
      {
        id: "high-standardization-high-integration",
        title: "Høy standardisering / Høy integrasjon",
        description: "Felles prosesser og tett integrerte data på tvers"
      },
      {
        id: "low-standardization-low-integration",
        title: "Lav standardisering / Lav integrasjon",
        description: "Lokal autonomi og lite behov for felles prosesser"
      },
      {
        id: "low-standardization-high-integration",
        title: "Lav standardisering / Høy integrasjon",
        description: "Ulike prosesser, men stort behov for delt data og koordinering"
      }
    ]
  },
  items: [
    {
      id: "replication",
      label: "Replication",
      correctQuadrantId: "high-standardization-low-integration",
      why: "Replication betyr høy standardisering, men lav integrasjon."
    },
    {
      id: "unification",
      label: "Unification",
      correctQuadrantId: "high-standardization-high-integration",
      why: "Unification betyr både høy standardisering og høy integrasjon."
    }
  ]
}
```

Regel:

```txt
To uavhengige akser = "matrix-placement".
```

---

### MatrixPlacement bør helst teste caseforståelse

Svakere:

```txt
Dra operating model-navn til riktig kvadrant.
```

Sterkere:

```txt
Dra casebeskrivelser til riktig kvadrant.
```

Eksempel:

```txt
“Global hotellkjede med felles kundedata og standardiserte bookingprosesser”
→ Unification

“Uavhengige datterselskaper med ulike kunder, ulike prosesser og lite delt data”
→ Diversification
```

Dette tester at studenten forstår aksene, ikke bare husker navnene.

---

### Når MatrixPlacement er feil

Ikke bruk matrix hvis det bare finnes én dimensjon.

Dårlig:

```txt
Sorter D4D-byggeklossene fra mest teknisk til mest organisatorisk.
```

Dette er ikke en tydelig 2x2-modell.

Bruk heller `drag-categorize` eller `single`.

---

## 7. SequenceOrder

App-type:

```js
type: "SequenceOrder"
```

Brukes når studenten skal sette elementer i en bestemt rekkefølge.

```txt
┌──────────────────────────────────────────────┐
│ Sett Double Diamond-fasene i riktig rekkefølge│
├──────────────────────────────────────────────┤
│ 1. Discover                                 │
│ 2. Define                                   │
│ 3. Develop                                  │
│ 4. Deliver                                  │
└──────────────────────────────────────────────┘
```

Passer til:

```txt
faser
prosesser
trinn i metode
beslutningsprosess
livsløp
logisk rekkefølge
```

God struktur:

```js
{
  id: 7,
  type: "SequenceOrder",
  title: "Double Diamond – rekkefølgen i designprosessen",
  points: 2,
  prompt: "Sett fasene i Double Diamond-modellen i riktig rekkefølge.",
  source: "Fasit: IN5431, CIO Toolbox 2: Projects, products and design thinking.",
  items: [
    { id: "discover", label: "Discover" },
    { id: "define", label: "Define" },
    { id: "develop", label: "Develop" },
    { id: "deliver", label: "Deliver" }
  ],
  correctOrder: [
    "discover",
    "define",
    "develop",
    "deliver"
  ],
  itemFeedback: {
    discover: {
      whyCorrect: "Discover kommer først fordi fasen handler om å forstå problemet før man antar løsningen.",
      whyWrong: "Discover må komme først. Før man definerer eller løser problemet, må man forstå situasjonen og menneskene som påvirkes.",
      whyExtended: [
        "Målet er å utforske problemet, ikke hoppe rett til løsning."
      ]
    }
  }
}
```

Regel:

```txt
Tydelig rekkefølge = "SequenceOrder".
```

---

### Når rekkefølgen er logisk, men ikke eksplisitt pensumfestet

Hvis rekkefølgen bare er en praktisk eller logisk arbeidsflyt, og ikke en eksplisitt modell fra pensum, må prompten si det.

Godt:

```txt
Sett stegene i en logisk arbeidsflyt for business case-vurdering.
```

Dårlig:

```txt
Sett business case-stegene i riktig rekkefølge.
```

Forskjellen er viktig: “riktig rekkefølge” antyder at pensum har én autoritativ fasit. “Logisk arbeidsflyt” gjør det tydelig at oppgaven tester praktisk resonnering innenfor en struktur.

---

### Gode SequenceOrder-emner

```txt
Double Diamond: Discover → Define → Develop → Deliver
Generisk beslutningsprosess: Understand situation → Synthesize options → Evaluate and propose
Strategiprosess: strategisk mål → action plan → gjennomføring → evaluering
Business case-beregning som logisk arbeidsflyt: identifiser kontantstrøm → vurder risiko → diskonter → sammenlign alternativer
```

---

### Viktig advarsel om PRINCE2

PRINCE2 passer ikke alltid som en enkel lineær rekkefølge.

Bruk `SequenceOrder` for PRINCE2 bare når prompten sier:

```txt
Sett PRINCE2-prosessene i en forenklet livsløpsrekkefølge.
```

Unngå å late som hele PRINCE2 er én enkel sekvens. `Directing a Project` ligger over prosjektet, og flere prosesser gjentas per fase.

Ofte er disse bedre:

```txt
PRINCE2-prinsipp → betydning       → "dragDrop"
PRINCE2 theme → forklaring         → "dragDrop"
Prinsipp / theme / process         → "drag-categorize"
```

---

# Feedback-regler

---

## Feedback er en del av læringen

Feedback skal ikke bare si “riktig” eller “feil”.

God feedback skal forklare:

```txt
1. Hvorfor riktig svar er riktig
2. Hvorfor et nærliggende feil svar er feil
3. Hva begrepet ofte forveksles med
4. Hvor i pensum dette hører hjemme
5. Hva det betyr i praksis
```

---

## Feltkonvensjoner

For `single` og `multi` brukes ofte:

```js
{
  text: "...",
  correct: true,
  why: "...",
  whyExtended: ["..."]
}
```

For `dragDrop` targets:

```js
{
  id: "...",
  description: "...",
  correctCardId: "...",
  correctLabel: "...",
  whyCorrect: "...",
  whyWrong: "...",
  whyExtended: ["..."]
}
```

For `drag-categorize`:

```js
itemFeedback: {
  "item-id": {
    whyCorrect: "...",
    whyWrong: "...",
    whyExtended: ["..."]
  }
}
```

For `matrix-placement` items:

```js
{
  id: "...",
  label: "...",
  correctQuadrantId: "...",
  why: "..."
}
```

For `SequenceOrder`:

```js
itemFeedback: {
  "item-id": {
    whyCorrect: "...",
    whyWrong: "...",
    whyExtended: ["..."]
  }
}
```

---

## God feedback

```txt
Riktig: Operational Backbone handler om standardiserte og integrerte systemer,
prosesser og data som støtter kjerneoperasjoner.

Feil: Dette er ikke Digital Platform. Digital Platform handler om gjenbrukbare
komponenter for rask utvikling av digitale tilbud, mens Operational Backbone
handler om stabilitet, standardisering og integrasjon i kjerneprosesser.

Utvidet: Uten en god Operational Backbone kan digital innovasjon bli hemmet
av fragmenterte data, manuelle overføringer og lokale prosessvarianter.
```

---

## Dårlig feedback

```txt
Riktig.
```

```txt
Feil.
```

```txt
Dette står i pensum.
```

```txt
Operational Backbone er riktig fordi det er riktig.
```

---

# Distraktorer

---

## Distraktorer skal være plausible

En distraktor er et feil svaralternativ.

Gode distraktorer er faglig nærliggende og tester reell forståelse.

Dårlig:

```txt
Hva er TOGAF?

A. Enterprise Architecture
B. En type ost
C. Et fotballag
D. En printer
```

Godt:

```txt
Hva er TOGAF?

A. Enterprise Architecture
B. IT Service Management
C. Project governance
D. Agile software delivery
```

---

## Distraktorer bør komme fra vanlige forvekslinger

Typiske forvekslinger i IN5431:

```txt
TOGAF ↔ ITIL ↔ PRINCE2 ↔ Scrum
Operational Backbone ↔ Digital Platform
Shared Customer Insights ↔ Digital Platform
Accountability Framework ↔ IT Governance
Digitisering ↔ Digitalisering ↔ Digital transformasjon
Business case ↔ Alternative analysis
Projects ↔ Product teams
Centralization ↔ Decentralization
Unification ↔ Replication
Coordination ↔ Diversification
```

---

# Casebaserte oppgaver

---

## Case er ofte bedre enn definisjon

Når målet er eksamensforberedelse, bør mange oppgaver være casebaserte.

Svak:

```txt
Hva er Shared Customer Insights?
```

Sterkere:

```txt
En virksomhet lanserer stadig nye digitale funksjoner, men vet lite om hvilke
kundebehov som faktisk er betalingsvillige. Hvilken D4D-byggekloss bør styrkes?

A. Shared Customer Insights
B. Operational Backbone
C. External Developer Platform
D. IT Infrastructure
```

---

## Caseoppgaver må være entydige

En case må ha nok signalord til at fasiten er rettferdig.

For svak case:

```txt
Bedriften har problemer med digitalisering. Hva bør de gjøre?
```

For mange mulige svar.

Bedre case:

```txt
Bedriften har kundedata spredt på flere systemer, ulike avdelinger bruker
forskjellige prosesser, og ansatte må registrere samme informasjon flere ganger.
Hvilken D4D-byggekloss er mest relevant å forbedre først?
```

Fasit:

```txt
Operational Backbone
```

---

## Caseoppgaver bør bruke signaler

Eksempler på signalord:

```txt
Fragmenterte data, manuelle overføringer, ulike prosesser
→ Operational Backbone

Gjenbrukbare komponenter, API-er, rask konfigurering av digitale tilbud
→ Digital Platform

Kundeinnsikt, betalingsvilje, eksperimentering, MVP, test-and-learn
→ Shared Customer Insights

Ansvar, beslutningsrettigheter, autonomi og alignment
→ Accountability Framework

Eksterne partnere, økosystem, åpne API-er, boundary resources
→ External Developer Platform
```

---

# Pensumspesifikke anbefalinger

---

## CIO Toolbox

Bruk oppgavetyper slik:

| Fagstruktur                                                 | Beste oppgavetype   |
| ----------------------------------------------------------- | ------------------- |
| Verktøy → formål                                            | `"dragDrop"`        |
| Case → riktig verktøy                                       | `"single"`          |
| Flere kjennetegn ved verktøy                                | `"multi"`           |
| Verktøy i kategorier: valg/organisering/styring/utforskning | `"drag-categorize"` |
| Beslutningsprosess i steg                                   | `"SequenceOrder"`   |

Eksempler:

```txt
Business case → prioritering av digitale tjenester og finansiering
Alternative analysis → leverandørvalg og produktvalg
Design thinking → utforskning når problemet er uklart
IT Architecture → analysere og strukturere IT-porteføljen
Projects → planlegge og organisere utvikling
Product teams → kontinuerlig utvikling og drift
IT governance → fordele beslutningsrettigheter og ansvar
```

---

## Designed for Digital

Bruk oppgavetyper slik:

| Fagstruktur                      | Beste oppgavetype   |
| -------------------------------- | ------------------- |
| Byggekloss → definisjon          | `"dragDrop"`        |
| Case → riktig byggekloss         | `"single"`          |
| Flere eksempler → byggekloss     | `"drag-categorize"` |
| Byggekloss → transformation type | `"drag-categorize"` |
| Risikoer ved ubalansert roadmap  | `"multi"`           |

D4D-byggeklossene:

```txt
Operational Backbone
Shared Customer Insights
Digital Platform
Accountability Framework
External Developer Platform
```

Transformation mapping:

```txt
Business Transformation
→ nye digitale verdiforslag og digital offerings

Architecture Transformation
→ Operational Backbone, Digital Platform, Digital Offerings

Governance Transformation
→ Shared Customer Insights, Accountability Framework
```

---

## Operating Model

Operating model passer svært godt til `matrix-placement`.

Aksene:

```txt
X-akse: Business Process Integration
Lav → Høy

Y-akse: Business Process Standardization
Lav → Høy
```

Riktig plassering:

```txt
High standardization / High integration → Unification
High standardization / Low integration  → Replication
Low standardization / High integration  → Coordination
Low standardization / Low integration   → Diversification
```

Best oppgave:

```txt
Plasser casebeskrivelser i operating model matrix.
```

Nest best:

```txt
Plasser modellnavnene i riktig kvadrant.
```

---

## IT Governance

Bruk oppgavetyper slik:

| Fagstruktur                     | Beste oppgavetype                                      |
| ------------------------------- | ------------------------------------------------------ |
| Archetype → hvem bestemmer      | `"dragDrop"`                                           |
| Decision domain → forklaring    | `"dragDrop"`                                           |
| Governance matrix               | `"matrix-placement"` bare hvis to akser faktisk brukes |
| Flere kjennetegn ved governance | `"multi"`                                              |
| Case → riktig archetype         | `"single"`                                             |

Governance archetypes:

```txt
Business Monarchy
IT Monarchy
Feudal
Federal
IT Duopoly
Anarchy
```

Decision domains:

```txt
IT Principles
IT Architecture
IT Infrastructure
Business Application Needs
IT Investment and Prioritization
```

Unngå å lage oppgaver der studenten bare pugger hele governance-matrisen uten kontekst.

Sterkere oppgaver ber studenten tolke:

```txt
Hvem bør ha beslutningsrett i denne situasjonen?
Hvilket domene handler beslutningen om?
Hvilken styringsstil passer best med strategisk mål?
```

---

## PRINCE2

Bruk oppgavetyper slik:

| Fagstruktur                  | Beste oppgavetype   |
| ---------------------------- | ------------------- |
| Prinsipp → betydning         | `"dragDrop"`        |
| Theme → forklaring           | `"dragDrop"`        |
| Process → formål             | `"dragDrop"`        |
| Prinsipp/theme/process       | `"drag-categorize"` |
| Forenklet livsløpsrekkefølge | `"SequenceOrder"`   |

Ikke gjør PRINCE2 mer lineært enn det er.

---

## Business case og alternative analysis

Bruk oppgavetyper slik:

| Fagstruktur                           | Beste oppgavetype   |
| ------------------------------------- | ------------------- |
| Begrep → forklaring                   | `"dragDrop"`        |
| Flere relevante hensyn                | `"multi"`           |
| Case → beste metode                   | `"single"`          |
| Beslutningsprosess i tre steg         | `"SequenceOrder"`   |
| Plus/minus-elementer → type vurdering | `"drag-categorize"` |

Business case bør knyttes til:

```txt
benefit
cost
timing
risk
NPV
discount rate
risk premium
non-quantifiable benefits
communication/transparency
```

Alternative analysis bør knyttes til:

```txt
understand the situation
synthesize options
evaluate and propose
financial business case
plus/minus method
cost ranking
real options
```

---

# Autograding og scoring

---

## Single, multi og fill

Disse er i praksis all-or-nothing.

```txt
single → riktig alternativ valgt
multi  → nøyaktig riktig sett av alternativer
fill   → normalisert tekst matcher ett av answers
```

For `multi`: ikke lag oppgaver med for mange riktige svar dersom det blir ren gjettelek.

---

## Drag/drop, category, matrix og sequence

Disse kan gi delvis uttelling.

```txt
dragDrop          → poeng etter antall riktige targets
drag-categorize   → poeng etter antall riktige items
matrix-placement  → poeng etter antall riktige items
SequenceOrder     → poeng etter antall riktige posisjoner
```

Derfor passer disse godt til større strukturspørsmål.

---

# Bilder og utvidet forklaring

---

## Bilder skal støtte forståelse

Bilder bør brukes når de gjør modellen lettere å forstå.

Gode bildebrukstilfeller:

```txt
Operating model matrix
D4D building blocks
Governance matrix
CIO Toolbox overview
Process diagrams
PRINCE2 overview
Cynefin
Double Diamond
```

Ikke bruk bilder som pynt.

---

## Bildehenvisninger skal ikke bygges i komponenten

Oppgavedata kan referere til bilder, men View-komponenter skal ikke bygge `src`-strenger selv.

Bruk eksisterende bildeflyt i appen.

---

# Anti-patterns

---

## Anti-pattern 1: Fancy UI uten faglig grunn

Dårlig:

```txt
Bruke matrix-placement fordi det ser kult ut.
```

Riktig:

```txt
Bruk matrix-placement bare når det finnes to meningsfulle akser.
```

---

## Anti-pattern 2: Single choice med flere riktige svar

Dårlig:

```txt
Hvilket utsagn beskriver Digital Platform?

A. Har gjenbrukbare komponenter
B. Kan bruke API-er
C. Støtter rask konfigurering av digitale tilbud
D. Handler om digital offerings
```

Flere er riktige.

Bruk `multi`.

---

## Anti-pattern 3: Fill blank for lange svar

Dårlig:

```txt
Digital business design is ______.
```

Fasit:

```txt
the holistic organizational configuration of people, processes and technology...
```

Dette er for langt og for formuleringsavhengig.

Bruk `single`, `multi` eller `dragDrop`.

---

## Anti-pattern 4: TableMatch når det egentlig er kategorisering

Dårlig:

```txt
Dra seks eksempler til tre kategorier, men bruk dragDrop.
```

Riktig:

```txt
Bruk drag-categorize.
```

---

## Anti-pattern 5: CategorySort når det egentlig er én-til-én

Dårlig:

```txt
TOGAF, ITIL, PRINCE2, Scrum → hver sin definisjon,
men bruk drag-categorize.
```

Riktig:

```txt
Bruk dragDrop.
```

---

## Anti-pattern 6: SequenceOrder for ikke-lineære modeller

Dårlig:

```txt
Sett D4D-byggeklossene i riktig rekkefølge.
```

D4D-byggeklossene er ikke en enkel lineær fasemodell.

Bedre:

```txt
Match byggekloss til definisjon.
Sorter tiltak etter byggekloss.
Velg hvilken byggekloss caset bør prioritere.
```

---

## Anti-pattern 7: For åpen case i autogradert oppgave

Dårlig:

```txt
En virksomhet sliter digitalt. Hva bør de gjøre?
```

For mange mulige riktige svar.

Bedre:

```txt
En virksomhet har fragmenterte kundedata, manuelle overføringer og ulike
arbeidsprosesser i hver avdeling. Hvilken D4D-byggekloss er mest relevant?
```

---

# Bot-oppskrift for å lage nye oppgaver

Når en bot lager en ny oppgave, skal den følge denne prosessen:

```txt
1. Identifiser pensumatom
   → begrep, modell, prosess, rammeverk, case eller sammenheng

2. Bestem læringsnivå
   → gjenkjenne, skille, strukturere, anvende eller begrunne

3. Finn vanlig forveksling
   → hva blander studenter ofte dette med?

4. Velg oppgavetype
   → bruk beslutningstreet i dette dokumentet

5. Lag fasit først
   → før distraktorer og UI-detaljer

6. Lag plausible distraktorer
   → feil svar skal være faglig nærliggende

7. Skriv prompten
   → klart, konkret og uten skjult flertydighet

8. Legg inn source
   → relevant pensumgrunnlag

9. Legg inn feedback
   → why, whyCorrect, whyWrong, whyExtended eller itemFeedback

10. Sjekk datakontrakten
   → riktig type-verdi og riktig datastruktur

11. Sjekk entydighet
   → finnes det mer enn ett rimelig riktig svar?

12. Sjekk pedagogisk verdi
   → tester oppgaven forståelse, eller bare UI-manipulasjon?
```

---

# Sjekkliste før commit

Bruk denne sjekklisten før en oppgave legges inn i datafilene.

```txt
[ ] Har oppgaven riktig app-type?
[ ] Er fasiten entydig?
[ ] Er prompten klar?
[ ] Er alle distraktorer plausible?
[ ] Har oppgaven source?
[ ] Har riktige svar forklaring?
[ ] Har feil svar forklaring?
[ ] Finnes whyExtended der det er faglig nyttig?
[ ] Brukes dragDrop bare til én-til-én-match?
[ ] Brukes drag-categorize bare til kategorisering?
[ ] Brukes matrix-placement bare med to akser?
[ ] Brukes SequenceOrder bare ved faktisk rekkefølge?
[ ] Er caseoppgaver tydelige nok til autograding?
[ ] Er oppgaven eksamensrelevant, ikke bare definisjonspugg?
```

---

# Kortversjon

```txt
Ett riktig svar
→ "single"

Flere riktige svar
→ "multi"

Presist kort tekstsvar
→ "fill"

Én ting matcher én ting
→ "dragDrop"

Flere ting sorteres i kategorier
→ "drag-categorize"

Ting plasseres etter to akser
→ "matrix-placement"

Ting settes i rekkefølge
→ "SequenceOrder"
```

Den viktigste regelen:

```txt
Start med hva studenten skal lære.
Ikke start med hvilken komponent du har lyst til å bruke.
```

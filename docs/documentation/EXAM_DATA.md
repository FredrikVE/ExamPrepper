# Eksamensdata

Eksamensinnholdet er delt opp i flere egne filer under `src/data/exams/`.

Hver eksamen eksporterer et objekt med metadata og spørsmål:

```js
export const mockExam1No = {
  id: "mock-exam-1-no",
  baseId: "mock-exam-1",
  lang: "no",
  title: "Øveeksamen 1: Full repetisjon",
  description: "CIO toolbox, D4D, IT governance, strategy og sustainability.",
  questions: [
    {
      id: 1,
      type: "single",
      title: "Business process",
      prompt: "Hva beskriver best en business process?",
      source: "Forelesning / pensumhenvisning",
      options: [
        {
          text: "En koordinert samling aktiviteter som skaper verdi.",
          correct: true,
          why: "Riktig: En business process beskriver hvordan arbeid utføres for å skape verdi.",
          whyExtended: [
            "En prosess består vanligvis av flere aktiviteter som henger sammen.",
            "Prosesser går ofte på tvers av avdelinger og roller.",
            "Poenget er å beskrive flyten fra input til output, ikke bare én isolert oppgave."
          ]
        }
      ]
    }
  ]
};
```

Alle eksamener samles i `src/data/data.js`. Tanken med dette er å gjøre det enkelt å legge til nye øveeksamener og språkversjoner uten å endre UI-komponentene.

### Spørsmålstyper

| Type | UI-navn | Beskrivelse |
|------|---------|-------------|
| `single` | `SingleRadioButtonChoice` | Multiple choice med ett riktig svar |
| `multi` | `MultiCheckboxSelect` | Multiple choice med flere riktige svar |
| `fill` | `FillBlankInputField` | Fyll inn riktig fagbegrep |
| `drag-categorize` | `CategorySort` | Dra kort inn i riktig kategori |
| `drag-drop` | `TableMatch` | Dra kort til riktig rad/beskrivelse i en tabell |
| `matrix-placement` | `MatrixPlacement` | Dra kort til riktig kvadrant i en generisk 2x2-matrise |

### Forklaringsfelter

| Felt | Bruk |
|------|------|
| `why` | Kort forklaring som vises direkte på svarkortet etter levering |
| `whyExtended` | Valgfri liste med utvidede forklaringspunkter som vises når svarkortet åpnes |
| `source` | Valgfri kildehenvisning mot forelesning, pensum eller fasitgrunnlag |

Hvis `whyExtended` mangler, vises ikke utvidet forklaring for det alternativet. For `matrix-placement` brukes `why` på hvert kort/item for å forklare hvorfor kortet hører hjemme i riktig kvadrant.

### Eksempel på matrix placement-spørsmål

`matrix-placement` er datadrevet og ikke hardkodet til én bestemt fagmodell. Samme komponent kan derfor brukes til for eksempel operating model matrix, risk awareness matrix eller andre 2x2-matriser.

```js
{
  id: 5,
  type: "matrix-placement",
  title: "Operating model matrix",
  points: 3,
  prompt: "Dra hver operating model til riktig kvadrant.",
  source: "Fasit: IN5431, CIO Toolbox, forelesning 3–6.",
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
      { id: "high-standardization-low-integration", title: "Høy standardisering / Lav integrasjon" },
      { id: "high-standardization-high-integration", title: "Høy standardisering / Høy integrasjon" },
      { id: "low-standardization-low-integration", title: "Lav standardisering / Lav integrasjon" },
      { id: "low-standardization-high-integration", title: "Lav standardisering / Høy integrasjon" }
    ]
  },
  items: [
    {
      id: "replication",
      label: "Replication",
      correctQuadrantId: "high-standardization-low-integration",
      why: "Replication betyr høy standardisering, men lav integrasjon."
    }
  ]
}
```

For matriser som ikke naturlig bruker lav/høy på aksene, kan aksene også beskrives med mer generiske retningslabels:

```js
xAxis: {
  label: "Measurement accuracy",
  leftLabel: "High",
  rightLabel: "Low"
},
yAxis: {
  label: "Risk awareness",
  topLabel: "High",
  bottomLabel: "Low"
}
```

---

## Legge til en ny øveeksamen

For å legge til en ny øveeksamen:

1. Opprett nye filer i `src/data/exams/`, for eksempel `mockExam6_no.js` og `mockExam6_en.js`.
2. Eksporter eksamensobjekter med unik `id`.
3. Bruk samme `baseId` for språkversjonene.
4. Sett riktig språkfelt, for eksempel `lang: "no"` og `lang: "en"`.
5. Importer eksamenene i `src/data/data.js`.
6. Legg eksamenene inn i `EXAMS`-listen.

Eksempel:

```js
//src/data/exams/mockExam6_no.js
export const mockExam6No = {
  id: "mock-exam-6-no",
  baseId: "mock-exam-6",
  lang: "no",
  title: "Øveeksamen 4: Strategi og IT governance",
  description: "Repetisjon av strategy, governance, architecture og digital transformation.",
  questions: [
    {
      id: 1,
      type: "single",
      title: "Strategic positioning",
      prompt: "Hva kjennetegner strategic positioning?",
      source: "Porter: What Is Strategy?",
      options: [
        {
          text: "Å velge en unik posisjon og gjøre trade-offs.",
          correct: true,
          why: "Riktig: Strategi handler om valg, trade-offs og en unik posisjon.",
          whyExtended: [
            "Strategisk posisjonering handler ikke bare om å være effektiv.",
            "Virksomheten må velge hva den ikke skal gjøre.",
            "Trade-offs gjør strategien vanskeligere å kopiere."
          ]
        }
      ]
    }
  ]
};
```

Deretter registreres eksamenen i `data.js`:

```js
import { mockExam1No } from "./exams/mockExam1_no.js";
import { mockExam1En } from "./exams/mockExam1_en.js";
import { mockExam2No } from "./exams/mockExam2_no.js";
import { mockExam2En } from "./exams/mockExam2_en.js";
import { mockExam3No } from "./exams/mockExam3_no.js";
import { mockExam3En } from "./exams/mockExam3_en.js";
import { mockExam6No } from "./exams/mockExam6_no.js";
import { mockExam6En } from "./exams/mockExam6_en.js";

export const EXAMS = [
  mockExam1No,
  mockExam1En,
  mockExam2No,
  mockExam2En,
  mockExam3No,
  mockExam3En,
  mockExam6No,
  mockExam6En
];
```

Alle eksamener må ha unik `id`. Språkversjoner av samme eksamen bør dele samme `baseId`.

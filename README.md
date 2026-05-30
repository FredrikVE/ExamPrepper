<p align="left">
  <a href="https://github.com/fredrikvogth/ExamPrepper">← Tilbake til GitHub repo</a>
</p>


<h1 align="center">
  <img src="./docs/images/Full_logo_transparent.png" alt="ExamPrepper logo" width="520" />
</h1>

<br>

# ExamPrepper

ExamPrepper er en interaktiv eksamenssimulator bygget med **JavaScript**, **React**, **Vite** og **CSS**. Prosjektet er laget for å øve til skoleeksamen i **IN5431 – IT and Management**, samtidig som det demonstrerer modularisering av en React-applikasjon med tydelig lagdeling.

Appen lar brukeren velge fag, velge øveeksamen, svare på spørsmål og få fasit med forklaring etter levering. Den støtter `multiple choice`, `fill-in-svar`, `category sort`, `table match` og `matrix placement`. Etter levering får brukeren `automatisk retting`, `poengscore`, `fasit` og `forklaringer`. Appen har også `norsk/engelsk språkvalg`, `light/dark mode` og `responsivt grensesnitt`.

Prosjektet følger et MVVM-inspirert arkitekturmønster med skille mellom `data`, `datasource`, `repository`, `use cases`, `viewmodel`, `pages` og `komponenter`.

Se full oversikt i [FEATURES.md](./docs/documentation/FEATURES.md).

---

## Innholdsfortegnelse

<table>
    <tr>
        <th>Seksjon</th>
        <th>Beskrivelse</th>
    </tr>
    <tr>
        <td>Funksjoner</td>
        <td><a href="./docs/documentation/FEATURES.md">Oversikt over sentrale funksjoner i appen.</a></td>
    </tr>
    <tr>
        <td>Oppsett</td>
        <td><a href="./docs/documentation/SETUP.md">Installasjon, kjøring, testing og bygging av prosjektet.</a></td>
    </tr>
    <tr>
        <td>Prosjektstruktur</td>
        <td><a href="./docs/documentation/PROJECT_STRUCTURE.md">Oversikt over mapper, filer og organisering av kodebasen.</a></td>
    </tr>
    <tr>
        <td>Arkitektur</td>
        <td><a href="./docs/architecture/ARCHITECTURE.md">Forklaring av MVVM-inspirert lagdeling, dataflyt og arkitektur.</a></td>
    </tr>
    <tr>
        <td>Designvalg</td>
        <td><a href="./docs/documentation/DESIGN_DECISIONS.md">Begrunnelse for sentrale tekniske og strukturelle valg.</a></td>
    </tr>
    <tr>
        <td>Testing</td>
        <td><a href="./docs/documentation/TESTING.md">Teststruktur, teststrategi, enhetstester og integrasjonstester.</a></td>
    </tr>
    <tr>
        <td>Eksamensdata</td>
        <td><a href="./docs/documentation/EXAM_DATA.md">Hvordan eksamener, spørsmålstyper, fasit og forklaringer er strukturert.</a></td>
    </tr>
    <tr>
        <td>Styling</td>
        <td><a href="./docs/documentation/STYLING.md">CSS-struktur, design tokens, responsivitet og stylingprinsipper.</a></td>
    </tr>
    <tr>
        <td>Videre arbeid</td>
        <td><a href="./docs/documentation/ROADMAP.md">Planlagte forbedringer og mulige utvidelser.</a></td>
    </tr>
    <tr>
        <td>Pensumgrunnlag</td>
        <td><a href="./docs/documentation/CURRICULUM.md">Faglige temaer som øveeksamenene bygger på.</a></td>
    </tr>
</table>

---

## Prosjektstruktur

Prosjektet er organisert med tydelig skille mellom data, domenelogikk, viewmodels, sider, komponenter og styling.

```bash
ExamPrepper/
├── README.md
├── package.json
├── vite.config.js
├── public/
│   └── subjects/              # Bilder og visuelle ressurser knyttet til fag/tema
├── docs/
│   ├── documentation/         # Utfyllende prosjektdokumentasjon
│   ├── architecture/          # Arkitekturdiagrammer og arkitekturforklaring
│   └── images/                # README- og dokumentasjonsbilder
├── test/
│   ├── integration/           # Integrasjonstester for eksamensflyt
│   ├── model/                 # Tester for domain, datasource og repositories
│   ├── ui/                    # UI-nære tester og oppgavelogikk
│   └── utils/                 # Tester for hjelpefunksjoner
└── src/
    ├── constants/             # Globale konstanter og spørsmålstyper
    ├── data/                  # Fag, eksamener og bildereferanser
    ├── di/                    # Composition root og dependency wiring
    ├── i18n/                  # Språkvalg og oversettelser
    ├── model/                 # Datasource, repositories og use cases
    ├── navigation/            # Navigasjonsstruktur
    ├── ui/
    │   ├── view/              # Pages og React-komponenter
    │   ├── viewmodel/         # State, brukerflyt og presentasjonslogikk
    │   ├── style/             # Modulær CSS strukturert per UI-område
    │   ├── settings/          # Globale innstillinger
    │   └── theme/             # Light/dark mode
    └── utils/                 # Globale hjelpefunksjoner
```

React-komponenter ligger hovedsakelig under `src/ui/view/components/`, mens sider ligger under `src/ui/view/pages/`. Styling ligger separat under `src/ui/style/`, organisert etter samme hovedområder som UI-et.

Den mest detaljerte UI-strukturen finnes rundt `ExamPage/QuestionCard`, der hver spørsmålstype har egne komponenter, lokal logikk og tilhørende CSS.

Se full struktur i [PROJECT_STRUCTURE.md](./docs/documentation/PROJECT_STRUCTURE.md).

---

## Arkitektur

Prosjektet følger et MVVM-inspirert og lagdelt mønster:

```text
Data
  ↓
DataSource
  ↓
Repository
  ↓
UseCases
  ↓
ViewModel
  ↓
Pages
  ↓
UI Components
```

Skisse som viser appen oppbygging visuelt

![Arkitekturdiagram](./docs/architecture/ARCHITECTURE.png)


Les mer i [ARCHITECTURE.md](./docs/architecture/ARCHITECTURE.md).

---

## Teknologier

<p><strong>Prosjektet bruker blant annet:</strong></p>

<table>
    <tr>
        <th>Teknologi</th>
        <th>Bruk</th>
    </tr>
    <tr>
        <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><strong>JavaScript</strong></a></td>
        <td>Programmeringsspråk</td>
    </tr>
    <tr>
        <td><a href="https://react.dev/"><strong>React</strong></a></td>
        <td>UI-bibliotek</td>
    </tr>
    <tr>
        <td><a href="https://vite.dev/"><strong>Vite</strong></a></td>
        <td>Byggverktøy og utviklingsserver</td>
    </tr>
    <tr>
        <td><a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><strong>CSS</strong></a></td>
        <td>Modulær styling, layout, komponentstiler og dark mode</td>
    </tr>
    <tr>
        <td><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/--*"><strong>CSS custom properties</strong></a></td>
        <td>Design tokens for farger, radius, shadows, spacing, transitions og tema</td>
    </tr>
    <tr>
        <td><a href="https://lucide.dev/"><strong>lucide-react</strong></a></td>
        <td>Ikoner</td>
    </tr>
</table>

---

## Kildehenvisning til spørsmål

<b>Grov, J., Sampah, D. A., & Øvrelid, E.</b> (2026, Januar 19).<br> <i>Introduction to course lectures and group session.</i><br>
Hentet fra IT and Management: Timeplan V26:<br>
https://www.uio.no/studier/emner/matnat/ifi/IN5431/v26/slides/in5431-2025-01-19---introduction.pdf<br><br>

<b>Grov, J.</b> (2026a, Februar 2).<br> <i>Strategy, governing documents, and other structural frames: What does it mean, and what is the importance of IT?</i><br>
Hentet fra IT and Management: Timeplan V26:<br>
https://www.uio.no/studier/emner/matnat/ifi/IN5431/v26/timeplan/<br><br>

<b>Grov, J.</b> (2026b, Februar 9).<br> <i>CIO Toolbox 1: Business case, concept selection and alternative analysis.</i><br>
Hentet fra IT and Management: Timeplan V26:<br>
https://www.uio.no/studier/emner/matnat/ifi/IN5431/v26/slides/in5431-2025-02-09---cio-toolbox-and-choices.pdf<br><br>

<b>Grov, J.</b> (2026c, Februar 23).<br> <i>The CIO toolbox 2: How to organize development?</i><br>
Hentet fra IT and Management: Timeplan V26:<br>
https://www.uio.no/studier/emner/matnat/ifi/IN5431/v26/timeplan/<br><br>

<b>Grov, J.</b> (2026d, Mars 2).<br> <i>The CIO toolbox 3: How to understand business and technology architecture?</i><br>
Hentet fra IT and Management: Timeplan V26:<br>
https://www.uio.no/studier/emner/matnat/ifi/IN5431/v26/timeplan/<br><br>

<b>Grov, J.</b> (2026e, Mars 9).<br> <i>Guest lecture: Agile Startups.</i><br>
Hentet fra IT and Management: Timeplan V26:<br>
https://www.uio.no/studier/emner/matnat/ifi/IN5431/v26/timeplan/<br><br>

<b>Grov, J.</b> (2026f, Mars 16).<br> <i>CIO Toolbox 4: IT governance.</i><br>
Hentet fra IT and Management: Timeplan V26:<br>
https://www.uio.no/studier/emner/matnat/ifi/IN5431/v26/slides/in5431-2026-03-15---it-governance-and-summary.pdf<br><br>

<b>Øvrelid, E.</b> (2026a, Mars 23).<br> <i>Digital Business Design and Building Shared Customer Insights.</i><br>
Hentet fra IT and Management: Timeplan V26:<br>
https://www.uio.no/studier/emner/matnat/ifi/IN5431/v26/timeplan/<br><br>

<b>Øvrelid, E.</b> (2026b, April 13).<br> <i>Operational Backbone.</i><br>
Hentet fra IT and Management: Timeplan V26:<br>
https://www.uio.no/studier/emner/matnat/ifi/IN5431/v26/timeplan/lec3_operationalbackbone_26_final.pdf<br><br>

<b>Øvrelid, E.</b> (2026c, April 13).<br> <i>Digital Platform.</i><br>
Hentet fra IT and Management: Timeplan V26:<br>
https://www.uio.no/studier/emner/matnat/ifi/IN5431/v26/timeplan/<br><br>

<b>Øvrelid, E., & Danilova, K.</b> (2026, April 20).<br> <i>Managing Digitalization in Organizations.</i><br>
Hentet fra IT and Management: Timeplan V26:<br>
https://www.uio.no/studier/emner/matnat/ifi/IN5431/v26/timeplan/<br><br>

<b>Øvrelid, E.</b> (2026d, Mai 4).<br> <i>Accountability Framework and External Developer Platform.</i><br>
Hentet fra IT and Management: Timeplan V26:<br>
https://www.uio.no/studier/emner/matnat/ifi/IN5431/v26/timeplan/<br><br>



<a href="../../README.md">← Tilbake til README</a>

---

# Designvalg

Dette dokumentet beskriver de viktigste designvalgene i ExamPrepper. Målet med valgene er å gjøre prosjektet lett å forstå, enkelt å utvide og ryddig å vedlikeholde.

Prosjektet er bygget rundt tre hovedprinsipper:

<table>
    <tr>
        <th>Prinsipp</th>
        <th>Hva det betyr i prosjektet</th>
    </tr>
    <tr>
        <td><strong>Tydelig ansvar</strong></td>
        <td>Data, domenelogikk, viewmodels, sider, komponenter og styling har hver sine roller.</td>
    </tr>
    <tr>
        <td><strong>Modularitet</strong></td>
        <td>Store UI-områder og spørsmålstyper er delt opp i mindre, feature-nære deler.</td>
    </tr>
    <tr>
        <td><strong>Utvidbarhet</strong></td>
        <td>Nye eksamener, spørsmålstyper, språk og visuelle forbedringer kan legges til uten store endringer i resten av appen.</td>
    </tr>
</table>

---

## Data og eksamensinnhold

### Eksamensdata er delt opp i flere filer

Hver øveeksamen og språkversjon ligger i egen fil under `src/data/exams/`. `data.js` fungerer som samlet eksamensregister.

Dette gjør det enklere å legge til, fjerne eller endre én eksamen uten å måtte arbeide i én stor datafil.

### Hver eksamen har egen metadata

Hver øveeksamen har faste metadatafelt som gjør at appen kan vise riktig eksamen basert på både valgt eksamen og valgt språk.

<table>
    <tr>
        <th>Felt</th>
        <th>Bruk</th>
    </tr>
    <tr>
        <td><code>id</code></td>
        <td>Unik identifikator for eksamenen.</td>
    </tr>
    <tr>
        <td><code>baseId</code></td>
        <td>Kobler språkversjoner av samme eksamen sammen.</td>
    </tr>
    <tr>
        <td><code>lang</code></td>
        <td>Angir hvilket språk eksamenen tilhører.</td>
    </tr>
    <tr>
        <td><code>title</code></td>
        <td>Vises som eksamenens tittel i UI-et.</td>
    </tr>
    <tr>
        <td><code>description</code></td>
        <td>Gir brukeren en kort forklaring av eksamenen.</td>
    </tr>
    <tr>
        <td><code>questions</code></td>
        <td>Inneholder oppgavene som hører til eksamenen.</td>
    </tr>
</table>

### Fag og eksamener er adskilt

Fag ligger i `subjects.js`, mens eksamener ligger i egne mock-exam-filer.

Denne delingen gjør det mulig å vise fagoversikt først, og deretter filtrere eksamener basert på valgt fag.

---

## Domenelogikk og score

### Rette-logikken ligger i domenelaget

`GradeAnswerUseCase` avgjør om et svar er riktig.

Komponentene trenger derfor ikke å kjenne reglene for de ulike spørsmålstypene:

<table>
    <tr>
        <th>Spørsmålstype</th>
        <th>Hva rette-logikken vurderer</th>
    </tr>
    <tr>
        <td><code>single choice</code></td>
        <td>Om ett valgt alternativ er riktig.</td>
    </tr>
    <tr>
        <td><code>multiple choice</code></td>
        <td>Om alle riktige alternativer er valgt, uten feilvalg.</td>
    </tr>
    <tr>
        <td><code>fill-in</code></td>
        <td>Om tekstsvaret matcher forventet svar.</td>
    </tr>
    <tr>
        <td><code>drag-and-drop</code></td>
        <td>Om elementene er plassert, sortert eller koblet riktig.</td>
    </tr>
</table>

Dette gjør domenelogikken lettere å teste og endre uten at UI-komponentene må oppdateres.

### Score beregnes i en egen use case

`CalculateExamScoreUseCase` gjør poengberegning separat fra både UI og datalagring.

Dette gjør scorelogikken lettere å teste, gjenbruke og endre uten å påvirke visningen.

---

## ViewModels og state

### ViewModels samler React-state

ViewModelene håndterer sentral eksamensstate, slik at side- og komponentlaget holdes enklere.

<table>
    <tr>
        <th>Stateområde</th>
        <th>Eksempel</th>
    </tr>
    <tr>
        <td>Brukersvar</td>
        <td>Svarene brukeren har valgt, skrevet inn eller plassert.</td>
    </tr>
    <tr>
        <td>Submitted-status</td>
        <td>Om en oppgave eller eksamen er levert.</td>
    </tr>
    <tr>
        <td>Åpne/lukkede svarkort</td>
        <td>Hvilke feedback-kort som er ekspandert.</td>
    </tr>
    <tr>
        <td>Loading</td>
        <td>Om data eller sideinnhold lastes.</td>
    </tr>
    <tr>
        <td>Timer</td>
        <td>Tidsbruk eller eksamenstid.</td>
    </tr>
    <tr>
        <td>Score</td>
        <td>Resultat etter levering.</td>
    </tr>
    <tr>
        <td>Navigasjon</td>
        <td>Hvilket spørsmål brukeren står på.</td>
    </tr>
</table>

### UI-komponentene er mest mulig dumme

Komponentene får data og handlers via props. State og brukerflyt eies primært av viewModelene og `App.jsx`.

Dette gjør at komponentene i hovedsak fokuserer på presentasjon.

---

## Sider og komponentstruktur

### Sidebar er felles for hele appen

Navigasjonen eies av `App.jsx`, mens `AppSidebar` kun presenterer navigasjonen.

På smale skjermer vises sidebaren som en hamburgerstyrt drawer med backdrop og lukkeknapp.

### SubjectSelectPage er modularisert

Fagvelgeren er delt opp i `SubjectSelectTopbar`, `SubjectSelectControls`, `SubjectSelectGrid` og `SubjectSelectCard`.

Dette gjør siden lettere å vedlikeholde og gjør det enklere å endre layout uten at page-filen vokser.

### ExamSelectPage er modularisert

Eksamensvelgeren er delt opp i `ExamSelectTopbar`, `ExamSelectIntro`, `ExamSelectGrid` og `ExamSelectCard`.

Dette gjør siden lettere å vedlikeholde og gir samme strukturelle prinsipp som fagvelgeren.

### QuestionCard er delt etter oppgavetyper og fellesdeler

`QuestionCard` har en egen entrypoint-komponent i `QuestionCard/QuestionCard.jsx`.

Konkrete oppgavetyper ligger under `QuestionTypes/`:

<table>
    <tr>
        <th>Komponent</th>
        <th>Bruk</th>
    </tr>
    <tr>
        <td><code>FillBlankInputField</code></td>
        <td>Brukes for tekstbaserte utfyllingsoppgaver.</td>
    </tr>
    <tr>
        <td><code>MultiCheckboxSelect</code></td>
        <td>Brukes for oppgaver der flere alternativer kan velges.</td>
    </tr>
    <tr>
        <td><code>SingleRadioButtonChoice</code></td>
        <td>Brukes for oppgaver der bare ett alternativ kan velges.</td>
    </tr>
    <tr>
        <td><code>DragDrop</code></td>
        <td>Brukes for oppgaver med dra-og-slipp-interaksjon.</td>
    </tr>
</table>

Drag-and-drop-oppgaver er videre delt i `CategorySort`, `TableMatch` og `MatrixPlacement`.

`MatrixPlacement` er laget som en generisk 2x2-matriseoppgave, slik at samme komponent kan brukes til flere faglige matriser, for eksempel operating model matrix og risk awareness matrix.

Felles deler som prompt, feedback, header, styling og view-state ligger i `Shared/`.

### AnswerCard er modularisert

Svarkortene i feedback-mode er delt i `AnswerOptionCard`, `AnswerOptionActions`, `AnswerOptionMarker` og `AnswerOptionExtendedPanel`.

Hjelpefunksjoner for AnswerCard ligger lokalt i `QuestionCard/AnswerCard/Utils/`.

### FeedbackPanel er tydeligere strukturert

Fill-in feedback viser brukerens svar og riktig svar side om side.

Forklaringer og pensumhenvisninger vises som tydelige kort, slik at feedback-mode blir lettere å lese.

### Footer er modularisert i funksjonelle enheter

Footer-komponenten er delt i `Footer`, `FooterActionButton`, `FooterNavigationButton`, `QuestionDots`, `QuestionDot` og `footerClassNames`.

Handlingsknappen bytter mellom «Neste» og «Lever nå» avhengig av om brukeren er på siste spørsmål.

Etter levering viser footer-dots riktig/feil-status med fargekoding.

---

## Lokal logikk og hjelpefunksjoner

### Feature-nære Utils-mapper brukes for lokal logikk

Hjelpefunksjoner som bare brukes av ett komponentområde ligger i lokale `Utils/`-mapper.

```text
QuestionCard/Utils
FeedbackPanel/Utils
ExamProgress/Utils
Footer/Utils
```

Globale utils beholdes kun når funksjonen brukes på tvers av flere lag eller features.

---

## UI og layout

### UI-et er delt inn i tydelige visuelle soner

Eksamenssiden er delt inn i tydelige visuelle soner som gjør det enklere for brukeren å forstå både status, innhold og tilgjengelige handlinger.

<table>
    <tr>
        <th>UI-sone</th>
        <th>Hva brukeren får oversikt over</th>
    </tr>
    <tr>
        <td><code>Sidebar</code></td>
        <td>Navigasjon og tilgang til hovedområder i appen.</td>
    </tr>
    <tr>
        <td><code>Header/statistikk</code></td>
        <td>Overordnet status, eksamensinfo og nøkkeltall.</td>
    </tr>
    <tr>
        <td><code>Progressbar</code></td>
        <td>Hvor langt brukeren har kommet i eksamenen.</td>
    </tr>
    <tr>
        <td><code>Question card</code></td>
        <td>Selve oppgaven brukeren arbeider med.</td>
    </tr>
    <tr>
        <td><code>Footer-navigasjon</code></td>
        <td>Handlinger og navigasjon mellom spørsmål.</td>
    </tr>
</table>

Dette gjør at brukeren hele tiden ser hvor langt de har kommet, hvilken oppgave de jobber med, og hvilke handlinger som er tilgjengelige.

### Responsivitet håndteres lokalt per UI-område

Responsiv styling ligger som hovedregel i `responsive.css` i den relevante side- eller komponentmappen.

Det gjør at `ExamPage`, `ExamSelectPage`, `SubjectSelectPage`, `QuestionCard`, `Footer`, `Header` og `FeedbackPanel` kan justeres hver for seg uten én stor global responsive-fil.

### Laptop- og edge-case-layout er håndtert eksplisitt

Layouten er optimalisert for typiske laptop-skjermer, inkludert 14–17 tommers skjermer og svært lave viewport-høyder.

På veldig lave høyder kan store kort falle tilbake til mer kompakte listevisninger, og sticky footer kan gå tilbake i vanlig scroll-flow for å unngå overlay.

---

## CSS og visuell struktur

### QuestionCard-CSS speiler oppgavetype-strukturen

CSS for `QuestionCard` ligger samlet under `src/ui/style/QuestionCard`, men er delt etter samme feature-logikk som komponentene.

```text
QuestionCard/
├── Base/
├── AnswerCard/
└── QuestionTypes/
    ├── ChoiceShared/
    ├── FillBlankInputField/
    └── DragDrop/
        ├── Shared/
        ├── CategorySort/
        ├── TableMatch/
        └── MatrixPlacement/
```

Delte spørsmålsstiler ligger i `Base/`, svarkortstiler i `AnswerCard/`, og spørsmålstype-spesifikke regler ligger under `QuestionTypes/`.

`MatrixPlacement` har egne CSS-filer for `question`, `item-bank`, `matrix`, `feedback` og `responsive`, slik at layout, kortbank, matrisevisning, feedback og responsive regler kan vedlikeholdes separat.

### Styling er modulært organisert per UI-område

`src/ui/style/App.css` fungerer som samlet CSS-entrypoint.

Globale designverdier ligger i `Tokens.css`, mens global reset og basisregler ligger i `Global.css`.

Større UI-områder har egne mapper med `index.css` og mindre CSS-moduler:

```text
ExamPage
ExamSelectPage
SubjectSelectPage
Header
Footer
QuestionCard
FeedbackPanel
SettingsMenu
Sidebar
ResultBadge
```

### Prosjektet bruker vanlig CSS og design tokens

Tailwind er fjernet til fordel for vanlige CSS-filer, CSS custom properties og en tydelig modulstruktur.

Globale designverdier defineres som tokens:

<table>
    <tr>
        <th>Token-type</th>
        <th>Bruk</th>
    </tr>
    <tr>
        <td>Farger</td>
        <td>Definerer fargepalett og tema.</td>
    </tr>
    <tr>
        <td>Tekst</td>
        <td>Definerer typografi og tekststørrelser.</td>
    </tr>
    <tr>
        <td>Radius</td>
        <td>Definerer avrunding på kort, knapper og paneler.</td>
    </tr>
    <tr>
        <td>Skygger</td>
        <td>Definerer dybde og visuell separasjon.</td>
    </tr>
    <tr>
        <td>Spacing</td>
        <td>Definerer avstander og luft i layouten.</td>
    </tr>
    <tr>
        <td>Overganger</td>
        <td>Definerer animasjoner og transition-verdier.</td>
    </tr>
    <tr>
        <td>Tema</td>
        <td>Definerer verdier for light og dark mode.</td>
    </tr>
</table>

Flere komponentverdier hentes fra `Tokens.css`, slik at tokens fungerer som SSOT (single source of truth) for visuelle grunnverdier.

---

## Språk, tema og globale valg

### Språk og tema håndteres globalt

Språkvalg håndteres gjennom `LanguageContext`, mens light/dark mode håndteres gjennom `ThemeContext`.

Dette gjør at komponentene kan bruke felles tilstand uten å duplisere logikk.

### Composition Root i `dependencies.js`

Alle datasource-, repository- og use case-instansene opprettes på ett sted.

Dette gjør appen mer ryddig og gjør det lettere å bytte implementasjoner senere.

<a href="../../README.md">← Tilbake til README</a>

---

# Sentrale funksjoner

Dette dokumentet gir en samlet oversikt over de viktigste funksjonene i ExamPrepper. Målet er å vise hva appen støtter, både fra et brukerperspektiv og fra et funksjonelt perspektiv.

Funksjonene er delt inn i mindre grupper for å gjøre siden lettere å skumme.

---

## Eksamensflyt

Denne delen beskriver hovedflyten brukeren går gjennom i appen. Funksjonene dekker valg av fag, valg av eksamen, levering og muligheten til å starte på nytt.

<table>
    <tr>
        <th>Funksjon</th>
        <th>Beskrivelse</th>
    </tr>
    <tr>
        <td>Valg av fag</td>
        <td>Brukeren kan velge fag før eksamen velges.</td>
    </tr>
    <tr>
        <td>Valg av eksamen</td>
        <td>Brukeren kan velge mellom flere øveeksamener.</td>
    </tr>
    <tr>
        <td>Lever nå-knapp</td>
        <td>Siste spørsmål viser «Lever nå» i stedet for «Neste» i footer-navigasjonen.</td>
    </tr>
    <tr>
        <td>Automatisk retting</td>
        <td>Svarene rettes når brukeren trykker «Lever nå».</td>
    </tr>
    <tr>
        <td>Ny runde</td>
        <td>Eksamen kan nullstilles og tas på nytt.</td>
    </tr>
</table>

---

## Spørsmålstyper

Denne delen viser spørsmålstypene appen støtter. Variasjonen gjør det mulig å lage øveeksamener med både enkle valgspørsmål og mer interaktive oppgaver.

<table>
    <tr>
        <th>Funksjon</th>
        <th>Beskrivelse</th>
    </tr>
    <tr>
        <td><code>multiple choice</code></td>
        <td>Støtter både ett riktig svar og flere riktige svar.</td>
    </tr>
    <tr>
        <td><code>fill-in</code></td>
        <td>Brukeren skriver inn riktig fagbegrep, med støtte for flere aksepterte svar.</td>
    </tr>
    <tr>
        <td><code>category sort</code></td>
        <td>Brukeren kan dra svaralternativer inn i riktige kategorier.</td>
    </tr>
    <tr>
        <td><code>table match</code></td>
        <td>Brukeren kan matche kort med riktig rad/beskrivelse i en tabell.</td>
    </tr>
    <tr>
        <td><code>matrix placement</code></td>
        <td>Brukeren kan plassere kort i riktig kvadrant i en generisk 2x2-matrise.</td>
    </tr>
</table>

---

## Feedback og fasit

Denne delen beskriver hvordan appen gir brukeren tilbakemelding etter levering. Feedbacken skal gjøre det tydelig hva brukeren svarte, hva som var riktig, og hvorfor.

<table>
    <tr>
        <th>Funksjon</th>
        <th>Beskrivelse</th>
    </tr>
    <tr>
        <td>Fasit etter levering</td>
        <td>Etter levering vises fasit, forklaringer og vurdering av svarene.</td>
    </tr>
    <tr>
        <td>Tydelig fill-in feedback</td>
        <td>Fill-in-spørsmål viser brukerens svar og riktig svar side om side etter levering.</td>
    </tr>
    <tr>
        <td>Markering av valgt alternativ</td>
        <td>I feedback-mode markeres brukerens valgte radio-/checkbox-alternativer tydelig.</td>
    </tr>
    <tr>
        <td>Drag-and-drop feedback</td>
        <td>Drag-and-drop-oppgaver viser riktige/feil plasseringer, ubesvarte kort, fasitkort og forklaringer etter levering.</td>
    </tr>
    <tr>
        <td>Utvidede forklaringer</td>
        <td>Svarkort kan åpnes for å vise mer detaljert forklaring.</td>
    </tr>
    <tr>
        <td>Forbedret feedback-visning</td>
        <td>Forklaringer og pensumhenvisninger vises som tydelige kort.</td>
    </tr>
    <tr>
        <td>Pensumhenvisning</td>
        <td>Hvert spørsmål kan ha kilde/fasitlinje mot forelesning eller pensum.</td>
    </tr>
</table>

---

## Resultat og progresjon

Denne delen dekker hvordan brukeren får oversikt over fremdrift og sluttresultat. Den hjelper brukeren å se både samlet score og status per spørsmål.

<table>
    <tr>
        <th>Funksjon</th>
        <th>Beskrivelse</th>
    </tr>
    <tr>
        <td>Poengscore</td>
        <td>Viser antall poeng og prosent riktig.</td>
    </tr>
    <tr>
        <td>Resultatdots</td>
        <td>Etter levering viser footer-dots grønn eller rød farge per spørsmål.</td>
    </tr>
</table>

---

## Språk og tema

Denne delen beskriver funksjoner som lar brukeren tilpasse appen. Språkvalg og tema gjør grensesnittet mer fleksibelt for ulike brukere og preferanser.

<table>
    <tr>
        <th>Funksjon</th>
        <th>Beskrivelse</th>
    </tr>
    <tr>
        <td>Språkvalg</td>
        <td>Brukeren kan bytte mellom norsk og engelsk.</td>
    </tr>
    <tr>
        <td>Lys/mørk modus</td>
        <td>Brukeren kan bytte mellom light mode og dark mode fra innstillinger.</td>
    </tr>
</table>

---

## Layout og navigasjon

Denne delen beskriver hvordan appen er strukturert visuelt. Layouten skal gi brukeren tydelig oversikt over navigasjon, progresjon og aktivt spørsmål.

<table>
    <tr>
        <th>Funksjon</th>
        <th>Beskrivelse</th>
    </tr>
    <tr>
        <td>Felles sidebar</td>
        <td>Samme sidebar brukes på tvers av hele appen.</td>
    </tr>
    <tr>
        <td>Hamburger/drawer på små skjermer</td>
        <td>På smale skjermer åpnes sidebaren via hamburgermeny og kan lukkes med backdrop eller lukkeknapp.</td>
    </tr>
    <tr>
        <td>Responsivt grensesnitt</td>
        <td>Layouten tilpasser seg skjermbredde og skjermhøyde.</td>
    </tr>
    <tr>
        <td>Laptop-optimalisert layout</td>
        <td><code>ExamPage</code>, <code>SubjectSelectPage</code> og <code>LearningContentSelectPage</code> har egne responsive regler for typiske laptop-skjermer og svært lave viewport-høyder.</td>
    </tr>
    <tr>
        <td>Moderne eksamenslayout</td>
        <td>Bruker sidebar, header/statistikk, progressbar, question cards og footer-navigasjon.</td>
    </tr>
</table>

---

## Utvidbarhet

Denne delen beskriver hvordan appen kan vokse videre. Eksamensregisteret er laget slik at nye øveeksamener kan legges til uten store endringer i resten av appen.

<table>
    <tr>
        <th>Funksjon</th>
        <th>Beskrivelse</th>
    </tr>
    <tr>
        <td>Utvidbart eksamensregister</td>
        <td>Nye øveeksamener kan legges til som egne datafiler.</td>
    </tr>
</table>

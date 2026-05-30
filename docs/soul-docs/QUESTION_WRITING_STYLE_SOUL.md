# QUESTION_WRITING_STYLE_SOUL.md

<!-- Sist oppdatert 2026-05-30 -->

Dette dokumentet styrer hvordan oppgaver i ExamPrepper skal formuleres.

Målet er oppgaver som høres ut som pensum.
Ikke som generert tekst.
Ikke som markedsføring.
Ikke som en lærebok som prøver å virke smartere enn kilden.

Oppgaven skal være faglig presis, kort og tett på forelesningsslides, pensumtekst og eksisterende datasett.

---

## Hva dette dokumentet gjelder

Bruk dette dokumentet når du skriver eller endrer tekst i oppgavedata.

Det gjelder særlig disse feltene.

```txt
title
description
prompt
options text
answers
answerKey
why
whyCorrect
whyWrong
whyExtended
source
modeLabel
```

Det gjelder ikke teknisk syntaks i kode.
Ikke ødelegg JavaScript, JSON, Markdown eller filbaner for å følge skrivestil.

---

## Prioritet

Når regler kolliderer, gjelder denne rekkefølgen.

```txt
Faglig korrekthet først.
Nærhet til kilden deretter.
Klarhet deretter.
Skrivestil til slutt.
```

Skriv aldri en penere oppgave som blir mindre presis.

---

## Grunnregel

Start i kilden.

Finn slide, tabell, figur eller pensumsetning som oppgaven bygger på.
Formuler oppgaven så tett på kilden som mulig.
Endre bare det som trengs for at teksten skal fungere som en oppgave.

Ikke pynt fagstoffet.
Ikke gjør begrepet større enn det er.
Ikke legg til strategisk betydning hvis kilden ikke sier det.

God oppgavetekst føles som en ryddig eksamensvariant av kilden.

---

## Nær-kilde-regelen

Oppgaver skal ikke være frie omskrivinger av pensum.

Behold dette fra kilden.

```txt
modellnavn
begreper
distinksjoner
dimensjoner
rekkefølger
listeelementer
definisjonsord
slideformuleringer
faste uttrykk fra kurset
```

Endre dette bare når det gjør oppgaven tydeligere.

```txt
setningsrekkefølge
lengde
grammatikk
småord
spørsmålsform
```

Når kilden sier `Operational Backbone`, skriv `Operational Backbone`.
Når kilden sier `business process integration and standardization`, bruk de ordene.
Når kilden sier `autonomy and alignment`, behold uttrykket.

---

## Norsk og engelsk

Norske oppgaver skal være naturlige på norsk.
Fagbegreper skal ofte stå på engelsk.

Behold engelske begreper når forelesningen bruker dem slik.

```txt
business case
alternative analysis
operating model
Net Present Value
Operational Backbone
Shared Customer Insights
Digital Platform
Accountability Framework
External Developer Platform
IT governance
decision rights
business application needs
product teams
design thinking
```

Ikke oversett et begrep bare for å gjøre teksten mer norsk.
Bruk norsk rundt begrepet.

Dårlig

```txt
Hvilken driftsmodell passer best for unike forretningsenheter
```

Bedre

```txt
Hvilken operating model passer best for unike forretningsenheter
```

Bruk norsk bøyning når det gir bedre flyt.

```txt
roadmapet
business casen
governance-arketype
```

---

## Oppgavens stemme

Skriv som en seminarleder som lager en presis repetisjonsoppgave.

Stilen skal være slik.

```txt
kort
konkret
nøktern
faglig
eksamensnær
kildenær
```

Stilen skal ikke være slik.

```txt
oppblåst
motiverende
reklamete
essayaktig
Wikipedia-aktig
AI-aktig
```

---

## Tegn og setningsflyt

Ikke bruk em dash.
Ikke bruk semikolon som setningstegn.
Unngå kolon i vanlig prosa når punktum fungerer.

Bruk korte setninger.
Del opp lange forklaringer.
La ett spørsmål teste ett poeng.

Dårlig

```txt
Hvilket utsagn illustrerer den sentrale rollen Operational Backbone spiller i en robust digital transformation
```

Bedre

```txt
Hva beskriver best en Operational Backbone
```

---

## Ord som normalt skal bort

Unngå ord som gjør teksten vag eller kunstig.

```txt
robust
seamless
powerful
intuitive
comprehensive
cutting-edge
state-of-the-art
pivotal
crucial
vital
leverage
facilitate
enhance
foster
cultivate
underscore
highlight
showcase
demonstrate
```

Bruk slike ord bare når kilden selv bruker dem og begrepet er faglig viktig.

Dårlig

```txt
Digital Platform plays a crucial role in enabling seamless innovation.
```

Bedre

```txt
Digital Platform gives access to reusable business, data and infrastructure components.
```

---

## AI-aktige mønstre som skal bort

Ikke legg inn bred betydning uten kilde.

Unngå slike mønstre.

```txt
plays a central role
marks a significant shift
reflects a broader trend
stands as an example of
underscores the importance of
contributes to a holistic understanding
in today's digital landscape
it is important to note
it is worth mentioning
in conclusion
overall
```

Skriv heller hva begrepet gjør i kurset.

Dårlig

```txt
IT governance plays a central role in ensuring a holistic digital strategy.
```

Bedre

```txt
IT governance determines who makes and contributes to IT decisions.
```

---

## Ikke bruk regel av tre uten grunn

AI-tekst lager ofte tre ledd selv når to eller ett holder.

Dårlig

```txt
The Digital Platform enables innovation, agility and transformation.
```

Bedre

```txt
The Digital Platform helps teams configure digital offerings faster.
```

Bruk tre ledd bare når kilden faktisk har tre ledd.

Eksempel fra D4D som skal beholdes.

```txt
people, processes and technology
```

---

## Prompts

En prompt skal være kort.
Den skal spørre om ett faglig poeng.
Den skal ikke forklare hele modellen før spørsmålet.

Gode promptstartere på norsk.

```txt
Hva beskriver best ...
Hvilket verktøy ...
Hvilken situasjon ...
Marker utsagnene ...
Hvilke elementer ...
```

Gode promptstartere på engelsk.

```txt
What best describes ...
Which tool ...
Which situation ...
Mark the statements ...
Which elements ...
```

Unngå dette.

```txt
Hva er det viktigste og mest sentrale poenget med ...
Hvordan kan man forstå den bredere betydningen av ...
På hvilken måte illustrerer dette en helhetlig transformasjon ...
```

Hvis prompten blir lang, flytt konteksten til en kort case.
Ikke press alt inn i én setning.

---

## Fill-oppgaver

Bruk fill når kilden har en definisjon, et fast uttrykk eller et sentralt begrep.

Fill skal helst være én kildenær setning med ett blankt felt.

God bruk.

```txt
A project is a ________ organization established to deliver specified results or products within a specified period.
```

```txt
Digital transformation is a significant organizational change, driven or enabled by the extensive use of ________ technologies.
```

Unngå fill når flere svar kan være rimelige.
Unngå blanke felt for småord.
Unngå blanke felt der studenten gjetter grammatikk i stedet for fag.

Svarlisten skal tillate vanlige varianter.
Den skal ikke tillate et svar som endrer begrepet.

---

## Single choice

Bruk single choice når oppgaven tester ett skille.

Typiske skiller.

```txt
business case vs alternative analysis
Coordination vs Replication
IT governance vs IT management
Operational Backbone vs Digital Platform
project vs product team
digitization vs digitalization
```

Riktig alternativ skal være direkte støttet av kilden.

Feilalternativer skal være plausible.
De bør komme fra samme tema eller nærliggende modell.
Ikke bruk tullete feilalternativer.

Dårlig feilalternativ

```txt
A pizza delivery method
```

Bedre feilalternativ

```txt
A temporary project team for digital innovation
```

---

## Multi choice

Bruk multi choice når kilden faktisk inneholder flere riktige elementer.

Eksempler.

```txt
five D4D building blocks
five IT governance decision domains
PRINCE2 principles
action plan elements
Scope 1, 2 and 3
```

Ikke bruk multi choice for ett begrep med én korrekt definisjon.

Alle riktige alternativer skal kunne forsvares direkte fra kilden.
Alle gale alternativer skal være faglig men feil.
Gale alternativer skal helst teste en vanlig forveksling.

---

## Casebaserte oppgaver

Bruk case når studenten skal anvende en modell.

Case skal være kort.
Case skal gi nok informasjon til å velge modell.
Case skal ikke inneholde støy som ikke brukes i svaret.

God caseinformasjon.

```txt
høy eller lav standardisering
høy eller lav integrasjon
hvem som tar beslutninger
om problemet er uklart
om tiltaket er midlertidig eller varig
om fokus er stabil drift eller rask konfigurering
```

Dårlig caseinformasjon.

```txt
navn på fiktive ansatte
lange historiefortellinger
morsomme detaljer
bransjedetaljer som ikke påvirker svaret
```

---

## Alternativer

Alternativer skal være omtrent like lette å lese.
Ikke gjør riktig alternativ lengst hver gang.
Ikke legg inn ekstra presisjon bare i riktig alternativ.

Skriv alternativene som selvstendige svar.
Ikke skriv alternativer som bare fungerer grammatisk med prompten hvis det gjør dem uklare.

Gode distraktorer kommer fra pensum.

```txt
PRINCE2
ITIL
BPMN
Business case
Operating model
Digital Platform
Operational Backbone
```

Dårlige distraktorer kommer fra fantasi eller dagligtale.

```txt
a random software trend
a general leadership mindset
a nice customer experience
```

---

## Feedback

Feedback skal forklare faglig kobling.
Den skal ikke belønne studenten med tom ros.

Kort feedback i `why` skal normalt være én setning.

God form.

```txt
Correct because Coordination has high integration and low standardization.
```

```txt
Galt fordi PRINCE2 handler om project governance and management, ikke finansieringsprioritering.
```

Unngå dette.

```txt
Great job, this answer beautifully captures the essence of the concept.
```

---

## Utvidet feedback

`whyExtended` skal brukes når studenten trenger faglig repetisjon.

Hver linje skal gjøre én jobb.

Gode linjer gjør dette.

```txt
knytter svaret til kilden
forklarer forvekslingen
viser hvorfor et annet begrep ikke passer
viser hvordan modellen brukes
```

Ikke bruk `whyExtended` til å skrive et miniessay.
Ikke avslutt med oppsummeringsfraser.
Ikke gjenta samme poeng med nye ord.

Maks fire linjer er normalt nok.

---

## Kilder

Alle oppgaver skal ha en kilde.
Kilden skal være konkret nok til at en utvikler kan sjekke oppgaven.

God kildeinformasjon.

```txt
forelesningsnummer
forelesningstittel
slide-tittel
figur eller modellnavn
pensumtekst når relevant
```

Hvis kilden ikke er kjent, ikke finn på en.
Skriv at kilden må verifiseres før commit.

Bruk samme språkstil som datasettet.
Engelske datasett bruker `Source`.
Norske datasett bruker `Fasit`.

---

## Når du lager nye oppgaver fra slides

Følg denne prosessen.

```txt
1. Finn fagpoenget i kilden.
2. Velg oppgavetype.
3. Kopier modellnavn og sentrale formuleringer.
4. Lag prompten kort.
5. Lag riktige alternativer fra kilden.
6. Lag gale alternativer fra nærliggende begreper.
7. Skriv kort feedback.
8. Sjekk at kilden er konkret.
9. Fjern AI-aktig språk.
10. Sjekk tegn og setningsflyt.
```

Ikke start med komponenten i appen.
Start med hva studenten skal lære.

---

## Når du oversetter oppgaver

Oversett mening, ikke pynt.

Behold dette.

```txt
modellnavn
fagbegreper
slideuttrykk
skiller mellom begreper
kildehenvisning
```

Tilpass dette.

```txt
norsk grammatikk
ordstilling
småord
bøying
```

Ikke gjør norsk versjon friere enn engelsk versjon.
Ikke legg til forklaringer som ikke finnes i originaloppgaven.

---

## Gode mønstre fra eksisterende datasett

Eksisterende oppgaver bruker ofte denne strukturen.

```txt
kort tittel
kort prompt
konkret kilde
riktig alternativ med faglig begrunnelse
galt alternativ med tydelig forveksling
utvidet feedback når begrepet er viktig
bildehenvisning når modellen bør repeteres visuelt
```

Behold dette mønsteret.

Særlig godt fungerer oppgaver som tester skiller.

```txt
Business case handler om prioritering og finansiering.
Alternative analysis handler om leverandørvalg og produktvalg.
Operational Backbone handler om stabilitet og integrasjon.
Digital Platform handler om gjenbrukbare komponenter for digitale tilbud.
IT governance fordeler decision rights og accountability.
```

---

## Dårlig og bedre

Dårlig

```txt
Digital transformation is a comprehensive and powerful shift that highlights the importance of technology in today's digital landscape.
```

Bedre

```txt
Digital transformation is a significant organizational change, driven or enabled by the extensive use of digital technologies.
```

Dårlig

```txt
Hvilket konsept spiller en sentral rolle i å skape en robust og sømløs digital organisasjon
```

Bedre

```txt
Hvilket D4D building block beskriver standardiserte og integrerte systemer, prosesser og data som støtter core operations
```

Dårlig

```txt
Hvorfor er Accountability Framework viktig for en helhetlig digital transformasjon
```

Bedre

```txt
Hva balanserer Accountability Framework ifølge D4D
```

---

## Sjekkliste før commit

Bruk denne sjekklisten før nye oppgaver legges inn.

```txt
Oppgaven tester ett tydelig fagpoeng.
Prompten er kort.
Riktig svar støttes direkte av kilden.
Distraktorer er plausible og pensumnære.
Fagbegreper er beholdt på engelsk der kurset bruker engelsk.
Norsk tekst er naturlig, men ikke løsrevet fra kilden.
Feedback forklarer forvekslingen.
Kilden er konkret.
Ingen em dash i prosa.
Ingen semikolon i prosa.
Kolon er ikke brukt som pynt.
Ingen reklameord.
Ingen bred betydning uten kilde.
Ingen avsluttende AI-oppsummering.
```

---

## Hard stopp

Ikke commit oppgaven hvis ett av punktene stemmer.

```txt
Kilden mangler.
Riktig svar er bare sannsynlig, ikke kildebelagt.
Prompten kan tolkes på flere måter.
To alternativer kan være riktige.
Et fagbegrep er oversatt bort.
Forklaringen inneholder pynt i stedet for fag.
Oppgaven tester språk mer enn fag.
Oppgaven høres ut som AI.
```

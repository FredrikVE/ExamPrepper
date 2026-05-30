# QUESTION_WRITING_STYLE_SOUL.md

<!-- Sist oppdatert 2026-05-30 -->

Dette dokumentet styrer hvordan tekstinnholdet i ExamPrepper-oppgaver skal formuleres.

`QUESTION_TYPE_SOUL.md` styrer oppgavetype, datastruktur og hvordan nye oppgaver legges til.

Dette dokumentet styrer språk, tone, kildenærhet og formulering.

Målet er oppgaver som høres ut som pensum.
Ikke som generert tekst.
Ikke som markedsføring.
Ikke som en lærebok som prøver å virke smartere enn kilden.

Oppgaven skal være faglig presis, kort og tett på forelesningsslides, pensumtekst og eksisterende datasett.

---

## Hva dette dokumentet gjelder

Bruk dette dokumentet når du skriver eller endrer tekst i oppgavedata.

Det gjelder særlig tekst i disse feltene.

```txt
title
description
prompt
options.text
cards.text
items.label
targets.description
answers
answerKey
why
whyCorrect
whyWrong
whyExtended
itemFeedback
source
modeLabel
```

Dette dokumentet gjelder ikke valg av oppgavetype.
Det gjelder ikke appens datakontrakt.
Det gjelder ikke komponentstruktur.

Når du trenger regler for `type`, feltstruktur, scoring eller hvordan oppgaven legges inn i datafilene, bruk `QUESTION_TYPE_SOUL.md`.

---

## Ikke ødelegg teknisk syntaks

Reglene i dette dokumentet gjelder vanlig prosa.

De gjelder ikke teknisk syntaks i kode, JavaScript, JSON, Markdown, CSS, HTML, filbaner eller appens faktiske type-verdier.

Ikke endre dette for å følge skrivestil.

```txt
"single"
"multi"
"fill"
"dragDrop"
"drag-categorize"
"matrix-placement"
"SequenceOrder"
```

Ikke endre `whyExtended`, `correctCardId`, `answerKey` eller andre feltnavn fordi de ser tekniske ut.

Datakontrakten styres av appen.
Språket inni feltene styres av dette dokumentet.

---

## Prioritet

Når regler kolliderer, gjelder denne rekkefølgen.

```txt
Faglig korrekthet først.
Datakontrakt deretter.
Nærhet til kilden deretter.
Klarhet deretter.
Skrivestil til slutt.
```

Skriv aldri en penere oppgave som blir mindre presis.

Ikke forkort bort informasjon som trengs for at fasiten skal bli entydig.

Ikke fjern fagbegreper for å gjøre teksten mer hverdagslig.

Ikke oversett engelske pensumbegreper bort.

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

Når kilden sier `decision rights`, ikke skriv det om til et løst norsk uttrykk hvis det svekker koblingen til pensum.

---

## Presisjon slår korthet

Korte oppgaver er bra.
Entydige oppgaver er viktigere.

Ikke gjør caset så kort at flere svar kan forsvares.

Dårlig.

```txt
Bedriften har problemer med digitalisering. Hvilken D4D-byggekloss bør styrkes?
```

Bedre.

```txt
Bedriften har fragmenterte kundedata, manuelle overføringer og ulike kjerneprosesser i hver avdeling. Hvilken D4D-byggekloss bør styrkes?
```

Den første er kort, men for åpen.
Den andre gir signalene som gjør `Operational Backbone` til en rettferdig fasit.

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
digital transformation
digitalization
digitization
```

Ikke oversett et begrep bare for å gjøre teksten mer norsk.
Bruk norsk rundt begrepet.

Dårlig.

```txt
Hvilken driftsmodell passer best for unike forretningsenheter?
```

Bedre.

```txt
Hvilken operating model passer best for unike forretningsenheter?
```

Bruk norsk bøyning når det gir bedre flyt.

```txt
roadmapet
business casen
governance-arketype
D4D-byggekloss
```

Ikke gjør norsk versjon friere enn engelsk versjon.

Ikke legg til forklaringer i norsk versjon som ikke finnes i engelsk versjon.

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

Ikke ros studenten i selve oppgaveteksten.

Ikke prøv å gjøre oppgaven morsom.

Ikke skriv som om appen selger noe.

---

## Tegn og setningsflyt

Ikke bruk em dash i prosa.

Ikke bruk semikolon som setningstegn i prosa.

Unngå kolon i vanlig prosa når punktum fungerer bedre.

Dette gjelder ikke kode, dataformater eller konkrete tekstverdier.

Bruk korte setninger.
Del opp lange forklaringer.
La ett spørsmål teste ett poeng.

Dårlig.

```txt
Hvilket utsagn illustrerer den sentrale rollen Operational Backbone spiller i en robust digital transformation?
```

Bedre.

```txt
Hva beskriver best en Operational Backbone?
```

Dårlig.

```txt
Digital Platform gir organisasjonen nye muligheter, raskere innovasjon og en mer sømløs kundeopplevelse.
```

Bedre.

```txt
Digital Platform gir tilgang til gjenbrukbare komponenter for digitale tilbud.
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

Bruk slike ord bare når kilden selv bruker dem og ordet er faglig viktig i konteksten.

Dårlig.

```txt
Digital Platform plays a crucial role in enabling seamless innovation.
```

Bedre.

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

Dårlig.

```txt
IT governance plays a central role in ensuring a holistic digital strategy.
```

Bedre.

```txt
IT governance determines who makes and contributes to IT decisions.
```

Dårlig.

```txt
Operational Backbone is a vital foundation for a company's digital journey.
```

Bedre.

```txt
Operational Backbone is a coherent set of standardized, integrated systems, processes and data supporting core operations.
```

---

## Ikke bruk regel av tre uten grunn

AI-tekst lager ofte tre ledd selv når to eller ett holder.

Dårlig.

```txt
The Digital Platform enables innovation, agility and transformation.
```

Bedre.

```txt
The Digital Platform helps teams configure digital offerings faster.
```

Bruk tre ledd bare når kilden faktisk har tre ledd.

Eksempel som skal beholdes.

```txt
people, processes and technology
```

Eksempel som også kan beholdes hvis kilden bruker det.

```txt
benefit, cost, timing and risk
```

Ikke lag ekstra treledd for å få teksten til å høres balansert ut.

---

## Feltregler

### `title`

`title` skal være en kort faglig etikett.

Godt.

```txt
Operating model
Net Present Value
Digital Platform
IT governance
Business case
```

Dårlig.

```txt
En viktig oppgave om hvordan digitale organisasjoner lykkes
```

Ikke skriv hele spørsmålet i `title`.

---

### `description`

`description` brukes mest på eksamenssett.
Skriv kort hva settet trener.

Godt.

```txt
Blandet repetisjon på grunnnivå: CIO Toolbox, D4D, IT governance, strategi og bærekraft.
```

Dårlig.

```txt
En omfattende og engasjerende læringsopplevelse som hjelper studenten å mestre hele pensum.
```

---

### `prompt`

En prompt skal gi én tydelig instruks.

Godt.

```txt
Hvilket verktøy i CIO toolbox er særlig knyttet til prioritering av digitale tjenester og finansiering?
```

Dårlig.

```txt
Hvordan kan man forstå den bredere betydningen av ulike styringsverktøy i en moderne digital organisasjon?
```

En prompt skal ikke forklare hele modellen før spørsmålet.
Hvis konteksten trengs, bruk en kort case.

---

### `options.text`

Alternativer skal være omtrent like lette å lese.
Ikke gjør riktig alternativ lengst hver gang.
Ikke legg inn ekstra presisjon bare i riktig alternativ.

Dårlig.

```txt
A. Operational Backbone, which is the central and comprehensive organizational capability that enables robust digital transformation through standardized and integrated systems
B. Digital Platform
C. Shared Customer Insights
D. Accountability Framework
```

Bedre.

```txt
A. Operational Backbone
B. Digital Platform
C. Shared Customer Insights
D. Accountability Framework
```

Hvis alternativene er utsagn, hold samme form på alle.

Dårlig.

```txt
A. High integration and low standardization
B. Replication
C. It is when organizations use a lot of data
D. Digital innovation
```

Bedre.

```txt
A. High integration and low standardization
B. High integration and high standardization
C. Low integration and high standardization
D. Low integration and low standardization
```

---

### `answers`

`answers` skal inneholde realistiske varianter studenten kan skrive.

Ta med vanlige språkvarianter.
Ikke ta med svar som endrer begrepet.

Godt.

```txt
digitalization
digitalisering
```

Godt.

```txt
process
business process
forretningsprosess
```

Dårlig.

```txt
change
technology
organization
```

For generelt.

---

### `answerKey`

`answerKey` skal vise forventet svar kort.

Godt.

```txt
Digitalization / digitalisering
```

Dårlig.

```txt
Alt som handler om å bruke teknologi til å endre organisasjoner
```

`answerKey` er ikke stedet for lang forklaring.
Bruk `whyCorrect` eller `whyExtended`.

---

### `why`

`why` skal normalt være én kort faglig begrunnelse.

Godt.

```txt
Riktig: Coordination betyr høy integrasjon og lav standardisering.
```

Dårlig.

```txt
Riktig! Dette er et veldig godt valg fordi det viser en helhetlig forståelse av modellen.
```

`why` skal forklare faglig forskjell, ikke gi ros.

---

### `whyCorrect`

`whyCorrect` skal forklare hvorfor svaret er riktig.

Godt.

```txt
Riktig fordi Operational Backbone handler om standardiserte og integrerte systemer, prosesser og data som støtter core operations.
```

Dårlig.

```txt
Riktig fordi dette er det beste svaret.
```

---

### `whyWrong`

`whyWrong` skal forklare hvorfor et nærliggende feil svar er feil.

Godt.

```txt
Galt fordi Digital Platform handler om gjenbrukbare komponenter for digitale tilbud, ikke stabilisering av kjerneprosesser.
```

Dårlig.

```txt
Galt fordi dette ikke stemmer.
```

Forklar forvekslingen.
Ikke bare avvis svaret.

---

### `whyExtended`

`whyExtended` skal gi repetisjon.
Ikke skriv et miniessay.

Hver linje skal gjøre én jobb.

Gode linjer gjør dette.

```txt
knytter svaret til kilden
forklarer forvekslingen
viser hvorfor et annet begrep ikke passer
viser hvordan modellen brukes
```

Godt.

```txt
Operational Backbone støtter core operations gjennom standardiserte og integrerte systemer, prosesser og data.
Digital Platform bygger videre på dette ved å gi tilgang til gjenbrukbare komponenter for digitale tilbud.
Skillet er viktig fordi stabil drift og rask innovasjon krever ulike kapabiliteter.
```

Dårlig.

```txt
Operational Backbone plays a crucial role in the organization's broader digital transformation journey by facilitating a robust and seamless foundation for strategic agility.
```

Maks fire linjer er normalt nok.

Ikke avslutt med generiske oppsummeringer.

---

### `source`

`source` skal være konkret nok til at fasiten kan sjekkes.

Godt.

```txt
Fasit: Forelesning 5, Business processes and IT Architecture, slide 'What is a business process?'.
```

Godt.

```txt
Source: Lecture 7, D4D building blocks, slide 'What is the difference between digitization, digitalization and digital transformation?'.
```

Dårlig.

```txt
Fasit: Pensum.
```

Dårlig.

```txt
Source: ChatGPT.
```

Engelske datasett bruker `Source`.
Norske datasett bruker `Fasit`.

Hvis kilden ikke er kjent, ikke finn på en.
Skriv at kilden må verifiseres før commit.

---

## Prompts

En prompt skal være kort.
Den skal spørre om ett faglig poeng.
Den skal være tydelig nok til at fasiten er rettferdig.

Gode promptstartere på norsk.

```txt
Hva beskriver best ...
Hvilket verktøy ...
Hvilken situasjon ...
Marker utsagnene ...
Hvilke elementer ...
Dra hvert begrep ...
Sett stegene ...
Plasser casene ...
```

Gode promptstartere på engelsk.

```txt
What best describes ...
Which tool ...
Which situation ...
Mark the statements ...
Which elements ...
Drag each concept ...
Put the steps ...
Place the cases ...
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

God bruk.

```txt
Digital transformation is a significant organizational change, driven or enabled by the extensive use of ________ technologies.
```

Unngå fill når flere svar kan være rimelige.

Unngå blanke felt for småord.

Unngå blanke felt der studenten gjetter grammatikk i stedet for fag.

Svarlisten skal tillate vanlige varianter.
Den skal ikke tillate et svar som endrer begrepet.

Dårlig.

```txt
Digital business design is ________.
```

Dette krever for langt svar.

Bedre.

```txt
Digital business design is a holistic organizational configuration of people, processes and ________.
```

---

## Single choice

Single choice-tekst skal brukes når oppgaven tester ett skille.

Typiske skiller.

```txt
business case vs alternative analysis
Coordination vs Replication
IT governance vs IT management
Operational Backbone vs Digital Platform
project vs product team
digitization vs digitalization
digitalization vs digital transformation
```

Riktig alternativ skal være direkte støttet av kilden.

Feilalternativer skal være plausible.
De bør komme fra samme tema eller nærliggende modell.
Ikke bruk tullete feilalternativer.

Dårlig feilalternativ.

```txt
A pizza delivery method
```

Bedre feilalternativ.

```txt
A temporary project team for digital innovation
```

Ikke gjør riktig alternativ tydeligere enn de andre bare gjennom lengde.

---

## Multi choice

Multi choice-tekst skal brukes når kilden faktisk inneholder flere riktige elementer.

Eksempler.

```txt
five D4D building blocks
five IT governance decision domains
PRINCE2 principles
action plan elements
Scope 1, 2 and 3
business case-estimater
```

Ikke bruk multi choice for ett begrep med én korrekt definisjon.

Alle riktige alternativer skal kunne forsvares direkte fra kilden.

Alle gale alternativer skal være faglige, men feil.

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
om problemet handler om kundedata, komponenter eller ansvar
```

Dårlig caseinformasjon.

```txt
navn på fiktive ansatte
lange historiefortellinger
morsomme detaljer
bransjedetaljer som ikke påvirker svaret
```

Svak case.

```txt
En virksomhet sliter med digitalisering. Hva bør den gjøre?
```

Sterkere case.

```txt
En virksomhet har kundedata spredt på flere systemer, ulike avdelinger bruker forskjellige prosesser, og ansatte må registrere samme informasjon flere ganger. Hvilken D4D-byggekloss er mest relevant å forbedre først?
```

---

## Caseoppgaver bør bruke signaler

Eksempler på signalord.

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

Signalene må være tydelige nok til at oppgaven kan autogrades rettferdig.

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

## Distraktorer

Distraktorer skal være plausible.

Gode distraktorer er faglig nærliggende og tester reell forståelse.

Dårlig.

```txt
Hva er TOGAF?

A. Enterprise Architecture
B. En type ost
C. Et fotballag
D. En printer
```

Godt.

```txt
Hva er TOGAF?

A. Enterprise Architecture
B. IT Service Management
C. Project governance
D. Agile software delivery
```

Typiske forvekslinger i IN5431.

```txt
TOGAF ↔ ITIL ↔ PRINCE2 ↔ Scrum
Operational Backbone ↔ Digital Platform
Shared Customer Insights ↔ Digital Platform
Accountability Framework ↔ IT governance
Digitization ↔ digitalization ↔ digital transformation
Business case ↔ alternative analysis
Projects ↔ product teams
Centralization ↔ decentralization
Unification ↔ Replication
Coordination ↔ Diversification
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

God form.

```txt
Galt fordi PRINCE2 handler om project governance and management, ikke finansieringsprioritering.
```

Unngå dette.

```txt
Great job, this answer beautifully captures the essence of the concept.
```

Unngå også dette.

```txt
Riktig.
Feil.
Dette står i pensum.
```

Feedback skal forklare hva studenten bør lære av svaret.

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

```txt
Engelske datasett → Source
Norske datasett → Fasit
```

---

## Når du lager nye oppgaver fra slides

Følg denne prosessen.

```txt
1. Finn fagpoenget i kilden.
2. Finn den nærmeste slideformuleringen.
3. Kopier modellnavn og sentrale begreper.
4. Skriv prompten kort.
5. Lag riktige alternativer fra kilden.
6. Lag gale alternativer fra nærliggende begreper.
7. Skriv kort feedback.
8. Sjekk at kilden er konkret.
9. Fjern AI-aktig språk.
10. Sjekk tegn og setningsflyt.
11. Sjekk at teksten fortsatt er kildenær.
```

Ikke start med å gjøre språket pent.
Start med å bevare fagpoenget.

---

## Når du legger til nye eksamenssett

Når en bot lager et nytt mockExam-sett, skal den også sjekke tester som bruker faktisk eksamensdata.

Dette gjelder særlig denne filen.

```txt
test/integration/examFlow.integration.test.js
```

Når et nytt eksamenssett legges til i `src/data/data.js`, må botten kontrollere og eventuelt oppdatere disse testene.

```txt
loads visible subjects with exam counts from real data
loads available Norwegian exams for IN5431 from real data
```

Disse testene kan feile fordi antall synlige eksamener endrer seg når et nytt sett registreres.

Typiske ting som må oppdateres.

```txt
examCount for synlige fag
forventet antall eksamener
forventet liste med exam.id
rekkefølge dersom sortOrder gjør at ny eksamen vises i listen
```

Ikke oppdater tester mekanisk.

Hvis en test bruker subject-metadata direkte, skal tallet bare endres hvis metadataen faktisk er endret.

Eksempel.

```txt
GetAvailableSubjectsUseCase kan telle synlige eksamener fra reelle data.
GetSubjectByIdUseCase kan returnere examCount fra subject-metadata.

Disse to trenger ikke alltid samme forventning.
```

Botten skal derfor lese testen før den endrer tallet.

Hard regel.

```txt
Når et nytt mockExam-sett legges til, skal botten kjøre eller be brukeren kjøre:

npm test -- --runInBand
npm run build
```

Hvis testene feiler på eksamenstelling, skal botten lage en egen liten testpatch.

Den patchen skal bare endre forventningene som faktisk følger av nytt eksamenssett.

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

Ikke oversett engelske pensumbegreper bort.

Dårlig.

```txt
operating model → driftsmodell
```

Bedre.

```txt
operating model
```

Dårlig.

```txt
decision rights → avgjørelsesprivilegier
```

Bedre.

```txt
decision rights
```

Bruk norsk rundt begrepet.

```txt
Hvem har decision rights i denne situasjonen?
```

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

Dårlig.

```txt
Digital transformation is a comprehensive and powerful shift that highlights the importance of technology in today's digital landscape.
```

Bedre.

```txt
Digital transformation is a significant organizational change, driven or enabled by the extensive use of digital technologies.
```

Dårlig.

```txt
Hvilket konsept spiller en sentral rolle i å skape en robust og sømløs digital organisasjon?
```

Bedre.

```txt
Hvilket D4D building block beskriver standardiserte og integrerte systemer, prosesser og data som støtter core operations?
```

Dårlig.

```txt
Hvorfor er Accountability Framework viktig for en helhetlig digital transformasjon?
```

Bedre.

```txt
Hva balanserer Accountability Framework ifølge D4D?
```

Dårlig.

```txt
Hva er riktig?
```

Bedre.

```txt
Hvilket utsagn beskriver best forskjellen mellom IT governance og IT management?
```

Dårlig.

```txt
Hvilken modell er viktigst i digitalisering?
```

Bedre.

```txt
Hvilken D4D-byggekloss er mest relevant når virksomheten mangler standardiserte og integrerte kjerneprosesser?
```

---

## Språksjekk før commit

Bruk denne sjekklisten før nye eller endrede oppgavetekster legges inn.

```txt
[ ] Oppgaven tester ett tydelig fagpoeng.
[ ] Prompten er kort nok.
[ ] Prompten er presis nok.
[ ] Riktig svar støttes direkte av kilden.
[ ] Distraktorer er plausible og pensumnære.
[ ] Fagbegreper er beholdt på engelsk der kurset bruker engelsk.
[ ] Norsk tekst er naturlig, men ikke løsrevet fra kilden.
[ ] Feedback forklarer forvekslingen.
[ ] Kilden er konkret.
[ ] Teksten ligger tett på slide eller pensum.
[ ] Ingen em dash i prosa.
[ ] Ingen semikolon i prosa.
[ ] Kolon er ikke brukt som pynt.
[ ] Ingen reklameord.
[ ] Ingen bred betydning uten kilde.
[ ] Ingen tom ros.
[ ] Ingen avsluttende AI-oppsummering.
[ ] Riktig alternativ er ikke alltid lengst.
[ ] Caset inneholder nok signaler til rettferdig fasit.
```

---

## Hard stopp

Ikke commit oppgaveteksten hvis ett av punktene stemmer.

```txt
Kilden mangler.
Riktig svar er bare sannsynlig, ikke kildebelagt.
Prompten kan tolkes på flere måter.
To alternativer kan være riktige i en single choice.
Et fagbegrep er oversatt bort.
Forklaringen inneholder pynt i stedet for fag.
Oppgaven tester språk mer enn fag.
Oppgaven høres ut som AI.
Caset er for åpent til autograding.
Feedback sier bare riktig eller feil.
```

---

## Kortversjon

```txt
Skriv kort.
Skriv konkret.
Start i kilden.
Behold fagbegreper.
Behold modellnavn.
Behold sentrale slideformuleringer.
Ikke pynt.
Ikke overdriv.
Ikke oversett bort engelske pensumbegreper.
Ikke skriv som AI.
```

Den viktigste regelen.

```txt
Hold oppgaven tett på pensum.
```

Den nest viktigste regelen.

```txt
Skriv som en ryddig seminarleder, ikke som en tekstgenerator.
```

# OVERSIKTSFIGUR_SOUL.md

<!-- Sist oppdatert 2026-05-31 -->

Dette dokumentet beskriver hvordan oversiktsfigurer skal lages.

Målet er figurer som gjør fagstoff lettere å forstå.

En oversiktsfigur skal vise sammenhenger.

Den skal være faglig presis, lett å lese på skjerm og trygg å gjøre om til PDF.

---

## Hva dette dokumentet er

Dette er en **figure-authoring SOUL**.

```txt
WRITING_STYLE_SOUL.md
→ Hvordan tekst skal skrives

MERMAID_SOUL.md
→ Hvordan Mermaid-diagrammer skal avgrenses

README_SOUL.md
→ Hvordan dokumentasjon skal struktureres

OVERSIKTSFIGUR_SOUL.md
→ Hvordan faglige oversiktsfigurer skal bygges
```

Dette dokumentet gjelder figurer som forklarer fagstoff i én samlet visning.

Eksempler.

```txt
matriser
beslutningsflyt
BPMN-oversikter
side-by-side-sammenligninger
modellforklaringer
klassifiseringsfigurer
repetisjonspostere
PDF-klare læringsark
```

Dokumentet gjelder HTML, SVG, Mermaid og statiske bilder.

---

## Grunnregel

En oversiktsfigur skal gjøre én faglig sammenheng synlig.

Start med spørsmålet leseren skal kunne svare på etterpå.

```txt
Hva er modellen?
Hva betyr aksene?
Hvordan brukes modellen på et case?
Hvorfor havner caset i denne kategorien?
Hvordan kan leseren klassifisere et nytt case selv?
```

Hvis figuren ikke hjelper leseren å svare på et slikt spørsmål, er den for svak.

Hvis figuren prøver å svare på for mange spørsmål samtidig, er den for stor.

---

## Prioritet

Når regler kolliderer, gjelder denne rekkefølgen.

```txt
1. Faglig korrekthet
2. Læringsflyt
3. Lesbarhet på skjerm
4. PDF-vennlighet
5. Visuell stil
```

Ikke gjør figuren penere hvis den blir mindre presis.

Ikke gjør figuren mer kompakt hvis teksten blir uleselig.

Ikke legg til innhold bare fordi det er plass.

---

## Hvis du bare leser én seksjon

Følg dette.

```txt
Start med fagstrukturen.
Velg én hovedidé.
Vis modellen først.
Vis case etterpå.
Vis klassifisering til slutt.
Bruk korte setninger.
Bruk luft.
Bruk piller på nøkkelbegreper.
Ikke legg viktig innhold i iframe.
Planlegg PDF-sidebrekk tidlig.
Test print før figuren regnes som ferdig.
```

---

## Hva en oversiktsfigur skal gjøre

En god oversiktsfigur gjør tre ting.

```txt
1. Den gir leseren kartet.
2. Den viser hvor caset ligger i kartet.
3. Den viser hvordan leseren kan plassere et nytt case selv.
```

Eksempel.

```txt
Operating model-matrise
→ viser kartet

Unification + BPMN-eksempel
→ viser plassering i kartet

Klassifiseringsalgoritme
→ viser hvordan leseren gjør vurderingen selv
```

Dette er sterkere enn tre løse figurer.

Poenget er koblingen mellom dem.

---

## Standard læringsflyt

Bruk denne flyten når figuren skal forklare en fagmodell.

```txt
1. Forklar fagbegrepet.
2. Forklar dimensjonene eller aksene.
3. Vis hovedmodellen.
4. Vis ett konkret case ved siden av modellen.
5. Vis beslutningsflyt eller klassifiseringsregel.
6. Vis eksempler, fallgruver og takeaway.
```

Denne flyten passer når studenten skal bruke en modell på et case.

Eksempel.

```txt
Driftsmodell
→ integration og standardization
→ operating model-matrisen
→ Unification i matrisen ved siden av BPMN-case
→ algoritme for klassifisering
→ pedagogiske forenklinger og fallgruver
```

---

## Start med fagstrukturen

Ikke start med layout.

Start med fagstoffet.

Skriv først dette i ren tekst.

```txt
Modell
Aksene
Kategoriene
Case
Klassifiseringssignal
Vanlige feil
Takeaway
```

Når strukturen er klar, velg visuell form.

Dårlig rekkefølge.

```txt
1. Lage en fancy grid.
2. Fylle den med tekst.
3. Håpe at modellen blir tydelig.
```

Riktig rekkefølge.

```txt
1. Finne faglig kjerne.
2. Velge figurtype.
3. Fjerne alt som ikke støtter kjernen.
4. Bygge layout.
```

---

## Velg riktig figurtype

Velg figurtype etter hva leseren skal gjøre.

| Leseren skal | Bruk |
|---|---|
| Se to dimensjoner samtidig | Matrise |
| Se hvordan et case passer i en modell | Side-by-side |
| Følge en vurdering steg for steg | Beslutningsflyt |
| Se aktører, lanes og dataflyt | BPMN eller prosessfigur |
| Skille begreper | Sammenligningstabell |
| Huske hovedpoenget | Takeaway-boks |
| Se vanlige feil | Fallgruvekort |

Ikke bruk matrise hvis fagstoffet egentlig er en rekkefølge.

Ikke bruk flytskjema hvis fagstoffet egentlig er to akser.

Ikke bruk tabell hvis sammenhengen krever romlig plassering.

---

## En figur skal ha én jobb

Hver figur skal ha én tydelig jobb.

Godt.

```txt
Denne matrisen viser fire operating models.
Denne BPMN-figuren viser hvorfor caset klassifiseres som Unification.
Denne algoritmen viser beslutningsflyten.
```

Dårlig.

```txt
Denne figuren viser alt om operating model, D4D, BPMN, governance, eksempler og eksamenstips.
```

Hvis figuren får flere jobber, del den opp.

Del heller i flere små celler enn én tung figur.

---

## Bruk side-by-side når koblingen er poenget

Side-by-side passer når leseren skal se teori og case samtidig.

God struktur.

```txt
Venstre panel
→ plassering i modellen

Høyre panel
→ konkret case eller prosess

Tekst under
→ hvorfor de henger sammen
```

Eksempel.

```txt
Venstre panel
Unification i driftsmodell-matrisen

Høyre panel
BPMN eksempel på 'Unification' klassifisering
```

Ikke bytt høyre tittel til casenavn hvis poenget er klassifisering.

Casenavn kan stå i brødtekst eller caption.

Paneltittelen skal si hva figuren gjør.

---

## Bruk matriser riktig

En matrise skal ha tydelige akser.

Aksene må være viktigere enn dekorasjonen.

En god matrise har.

```txt
x-akse
y-akse
lav og høy på begge akser
fire eller flere tydelige felt
kort forklaring i hvert felt
markering av relevant felt
```

Ikke gjør alle feltene like sterke hvis ett felt er hovedpoenget.

Marker valgt felt med rolig bakgrunn, kant eller venstre stripe.

Ikke bruk farge alene.

Tekst og plassering må også vise poenget.

---

## Bruk algoritmer riktig

En algoritme skal vise beslutningsflyt.

Den skal ikke bli et plakatkart over alt.

God struktur.

```txt
START
→ spørsmål 1
→ spørsmål 2
→ resultat
```

Hvert spørsmål skal teste én dimensjon.

Eksempel.

```txt
1. Må enhetene dele data?
2. Jobber de likt?
3. Velg Diversification, Replication, Coordination eller Unification.
```

Hvis algoritmen blir høy og tung, gjør den mindre.

Krymp først luft og ytre margin.

Krymp deretter nodeavstand.

Krymp tekst til slutt.

Ikke gjør resultatene uleselige.

---

## Bruk BPMN som klassifiseringsgrunnlag

Når BPMN brukes i en oversiktsfigur, skal den gi signaler for klassifisering.

Se etter.

```txt
pools
swimlanes
systemer
dataflyt
felles prosess
lokale prosesser
felles kundedata
felles transaksjonsdata
```

Vis gjerne BPMN ved siden av modellen.

Da kan leseren se både caset og klassifiseringen.

Ikke skriv at et BPMN-case er Unification uten å vise hvorfor.

Forklar signalet kort.

---

## Tekst i figurer

Tekst i figurer skal være kort.

Bruk linjeskift når en setning blir tung.

Dårlig.

```txt
Bruk algoritmen som beslutningsflyt. Vurder først dataflyt og integration. Vurder så prosesslikhet og standardization. Da ender BPMN-caset i Diversification, Replication, Coordination eller Unification.
```

Bedre.

```txt
Bruk algoritmen som beslutningsflyt.

a) Vurder først dataflyt og integration.
b) Vurder så prosesslikhet og standardization.
c) Plasser caset i én operating model.
```

Bruk luft for å gjøre figuren skumbar.

Ikke fyll kort med lange avsnitt.

---

## Piller og fagbegreper

Bruk piller for korte fagbegreper som skal gjenkjennes raskt.

Gode pillebegreper.

```txt
integration
standardization
Unification
Coordination
Replication
Diversification
BPMN
Operational Backbone
```

Bruk piller på labels, ikke på hele setninger.

Godt.

```txt
Høy process [integration] krever mer felles data.
```

Dårlig.

```txt
[Høy process integration krever mer felles data og mer styring.]
```

Piller skal være inline når de står i en setning.

De skal ikke bryte `process integration` over to linjer.

---

## Fet skrift

Bruk fet skrift på fagbegreper når det hjelper leseren.

Godt.

```txt
**operating model**
**process integration**
**process standardization**
**BPMN**
```

Ikke bruk fet skrift på nesten alle ord.

Hvis alt er viktig, blir ingenting viktig.

---

## Farger

Farger skal støtte betydning.

De skal ikke være pynt.

Bruk faste farger per kategori.

Eksempel.

```txt
Unification
→ grønn

Coordination
→ blå

Replication
→ lilla

Diversification
→ oransje
```

Samme begrep skal ha samme farge gjennom hele figuren.

Ikke bruk flere farger for samme begrep.

Ikke bruk svak kontrast.

Ikke bruk farge som eneste forklaring.

---

## Luft og skumming

Oversiktsfigurer skal kunne skummes.

Bruk.

```txt
korte avsnitt
linjeskift
små punktlister
piller
tydelige overskrifter
marg mellom seksjoner
kort takeaway
```

Unngå.

```txt
lange tabellceller
store tekstblokker
mange små forklaringer i samme kort
mange like sterke farger
for mange ikoner
```

Luft er ikke pynt.

Luft gjør at leseren ser strukturen.

---

## PDF-vennlighet

Oversiktsfigurer skal ofte bli PDF.

Design for det tidlig.

Sjekk dette.

```txt
ingen horisontal skrolling
ingen tekst som blir kuttet
ingen viktig informasjon utenfor viewport
god kontrast på hvit bakgrunn
lesbar font ved utskrift
ikke for store SVG-er
ikke for store ytre marginer
print CSS finnes ved behov
```

Hvis figuren skal inn i PDF, prioriter A4 eller A3 tidlig.

Ikke vent til slutt.

---

## Responsivitet

HTML-figurer skal være responsive.

Unngå faste minimumsbredder som tvinger sidelengs skroll.

Bruk.

```txt
max-width: 100%
width: 100%
overflow: hidden når PDF er viktig
grid med minmax(0, 1fr)
SVG med viewBox
```

Vær forsiktig med.

```txt
min-width: 1100px
store inline SVG-er uten skalering
lange labels uten wrap
paneler som aldri kan krympe
```

Hvis en importert figur har fast bredde, overstyr den i wrapperen.

---

## Når figuren lages i HTML

Bruk semantisk struktur.

Godt.

```txt
section
article
figure
figcaption
table når data faktisk er tabell
```

Bruk scope på klassenavn.

Godt.

```txt
.om-card
.om-matrix
.om-pill
.om-algorithm
```

Dårlig.

```txt
.card
.title
.box
.node
```

Generiske klassenavn kolliderer lett når flere figurer settes inn i samme HTML-side.

HTML-en skal bygges som et dokument.

Den skal fungere på skjerm, smal skjerm og PDF.

---

## HTML-figurer som skal tåle skjerm og PDF

Når en oversiktsfigur lages i HTML, skal den bygges som et dokument.

Den skal ikke være en nettside som tilfeldigvis kan printes.

HTML-en må fungere på tre nivåer.

```txt
1. Skjerm
2. Smal skjerm
3. PDF / print
```

Hvis figuren brukes til eksamensnotater, repetisjonsark eller læringsposter, må PDF-kravene tas inn tidlig.

Ikke vent til slutt.

### Unngå iframe for viktig innhold

Ikke legg viktige figurer inn som `iframe srcdoc`.

Dårlig.

```html
<iframe srcdoc="...stor HTML eller SVG..."></iframe>
```

Dette gjør figuren vanskeligere å kontrollere.

Problemer.

```txt
print-CSS utenfor iframe virker ikke inni iframe
sidebrekk blir vanskeligere
høyder må ofte settes manuelt
PDF-motorer kan kutte innhold
innholdet blir tungt å vedlikeholde
```

Bedre.

```html
<section class="om-figure-card">
  <figure class="om-matrix">
    <!-- matrise direkte i HTML -->
  </figure>

  <figure class="om-bpmn">
    <!-- SVG direkte i HTML -->
  </figure>
</section>
```

Viktig innhold skal ligge direkte i dokumentet.

Bruk inline SVG hvis figuren må skaleres som én enhet.

Bruk vanlig HTML hvis teksten skal endres ofte.

### Bruk aspect-ratio i stedet for faste høyder

Unngå faste høyder på figurer.

Dårlig.

```css
.algorithm-frame {
  height: 590px;
}
```

Bedre.

```css
.om-figure {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.om-figure svg {
  width: 100%;
  height: 100%;
  display: block;
}
```

For høye algoritmer kan forholdet følge SVG-ens `viewBox`.

```css
.om-algorithm {
  aspect-ratio: 1881 / 2048;
}
```

Dette gjør at figuren skalerer etter bredde uten å bli klippet.

### Bruk SVG riktig i HTML

SVG passer når plassering, piler og relasjoner må være presise.

Bruk SVG for.

```txt
BPMN-lignende prosessfigurer
klassifiseringsalgoritmer
figurer med mange piler
figurer som skal skaleres som én samlet enhet
```

Ikke bruk SVG for all tekst.

Tekst som ofte skal redigeres, bør ligge i HTML.

God regel.

```txt
Fast diagramlogikk → SVG
Forklarende tekst → HTML
Tabellinnhold → HTML table
Korte labels → SVG eller HTML
```

SVG skal alltid ha `viewBox`.

```html
<svg viewBox="0 0 1500 950" role="img">
```

Ikke la SVG-en tvinge siden til fast bredde.

```css
.om-bpmn svg {
  width: 100%;
  height: auto;
  max-width: 100%;
}
```

### Lag egne PDF-sider i HTML-en

Hvis dokumentet skal bli PDF, del innholdet i tydelige print-sider.

God struktur.

```html
<section class="pdf-page">
  <!-- definisjon og hovedmatrise -->
</section>

<section class="pdf-page">
  <!-- side-by-side case -->
</section>

<section class="pdf-page">
  <!-- algoritme -->
</section>

<section class="pdf-page">
  <!-- eksempler, fallgruver og takeaway -->
</section>
```

Print-CSS.

```css
@media print {
  .pdf-page {
    break-after: page;
    page-break-after: always;
  }

  .pdf-page:last-child {
    break-after: auto;
    page-break-after: auto;
  }
}
```

Ikke la nettleseren gjette alle sidebrekk.

Bestem de viktigste brekkene selv.

### Bruk break-inside med omtanke

Små kort bør ikke deles over to sider.

```css
@media print {
  .om-card,
  .om-mini-card,
  figure,
  table tr {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
```

Ikke bruk dette på store seksjoner.

Dårlig.

```css
.whole-page {
  break-inside: avoid;
}
```

Hvis en stor seksjon ikke får lov til å brekke, kan PDF-en få rare tomrom eller kuttet innhold.

God regel.

```txt
Små kort skal holdes samlet.
Store seksjoner skal deles i planlagte PDF-sider.
```

### Lag egen print-layout

Skjermlayout og PDF-layout trenger ikke være like.

På skjerm kan tre kolonner fungere.

I PDF kan to eller én kolonne være bedre.

```css
.om-main-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media print {
  .om-main-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

For tunge seksjoner kan print være én kolonne.

```css
@media print {
  .print-one-column {
    grid-template-columns: 1fr;
  }
}
```

Ikke press alt inn i samme skjermgrid når dokumentet printes.

### Gjør linjeskift bevisste

HTML-figurer skal ha gode linjeskift.

Bruk dette på teksttunge elementer.

```css
p,
li,
td,
.om-card,
.om-tagline,
.om-mini-card {
  overflow-wrap: break-word;
  hyphens: auto;
}
```

Sett riktig språk i HTML.

```html
<html lang="no">
```

Ikke la fagpiller brekke stygt.

```css
.om-pill,
.om-term-pair {
  white-space: nowrap;
}
```

Godt.

```txt
process [integration]
```

Dårlig.

```txt
process
[integration]
```

Hvis en setning blir for lang for en kort boks, skriv den om.

Ikke la CSS alene løse dårlig tekst.

### Unngå horisontal skrolling i PDF

Horisontal skrolling kan være greit på skjerm.

Det fungerer dårlig i PDF.

Dårlig for PDF.

```css
.om-figure-scroll {
  overflow-x: auto;
}

.om-figure {
  min-width: 1100px;
}
```

Bedre for PDF.

```css
.om-figure {
  max-width: 100%;
  width: 100%;
}

.om-figure svg {
  width: 100%;
  height: auto;
}
```

Hvis en figur må ha horisontal scroll på små skjermer, lag egen print-regel.

```css
@media print {
  .om-figure-scroll {
    overflow: visible;
  }

  .om-figure {
    min-width: 0;
    width: 100%;
  }
}
```

PDF skal aldri være avhengig av scroll.

### Bruk scoped class names

Oversiktsfigurer settes ofte inn i større dokumenter.

Derfor bør klassenavn være scoped.

Godt.

```css
.om-card
.om-matrix
.om-pill
.om-bpmn
.om-algorithm
```

Dårlig.

```css
.card
.box
.title
.node
.arrow
```

Generiske klassenavn kolliderer lett.

Dette blir særlig problematisk når flere figurer settes sammen i samme HTML-fil.

### Gjør CSS-en ryddig

Del CSS-en i seksjoner.

```txt
1. Design tokens
2. Base
3. Layout
4. Components
5. Figures
6. Responsive
7. Print
```

Eksempel.

```css
/* 1. Design tokens */
:root {}

/* 2. Base */
html, body {}

/* 3. Layout */
.om-page {}
.om-grid {}

/* 4. Components */
.om-card {}
.om-pill {}

/* 5. Figures */
.om-matrix {}
.om-bpmn {}
.om-algorithm {}

/* 6. Responsive */
@media screen and (max-width: 900px) {}

/* 7. Print */
@media print {}
```

CSS skal være lett å endre uten å ødelegge andre figurer.

### Test PDF tidlig

Test print før figuren er ferdig.

Sjekk dette.

```txt
Blir tekst kuttet?
Blir SVG-er skalert riktig?
Kommer sidebrekk på riktige steder?
Deler tabeller seg stygt?
Forsvinner bakgrunnsfarger?
Blir piller brutt over linjer?
Er fonten lesbar på papir?
```

Legg dette inn i print-CSS.

```css
@media print {
  body {
    background: white;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  @page {
    size: A3 landscape;
    margin: 8mm;
  }
}
```

Velg A4 eller A3 bevisst.

Ikke la standard printinnstillinger bestemme formatet.

### Kort HTML-regel

```txt
Viktig innhold skal ikke ligge i iframe.
Figurer skal skalere med viewBox og aspect-ratio.
PDF-sider skal ha planlagte sidebrekk.
Tekst skal kunne brekke pent.
Fagpiller skal ikke brekke stygt.
Print-layout skal være egen layout.
```

---

## Når figuren lages med SVG

SVG passer for faste prosessdiagrammer og algoritmer.

Bruk SVG når.

```txt
plassering må være presis
piler er viktige
BPMN-lignende flyt skal vises
diagrammet skal skaleres som én enhet
```

Ikke bruk SVG for vanlig tekstinnhold.

Tekst som skal kunne endres ofte, bør ligge i HTML.

Hvis SVG-en er stor, skaler den i wrapperen.

Ikke la SVG bestemme hele sidens bredde.

Alle SVG-er som skal skaleres, skal ha `viewBox`.

---

## Når figuren lages med Mermaid

Mermaid passer for enkle flyter og arkitekturdiagrammer.

Bruk Mermaid når.

```txt
diagrammet er tekstnært
flyten er viktigere enn nøyaktig layout
diagrammet skal vedlikeholdes i Markdown
```

Ikke bruk Mermaid når figuren krever plakatlayout, kort, piller eller tett kontroll på print.

Da passer HTML eller SVG bedre.

---

## Eksempler skal merkes som eksempler

Eksempler i oversiktsfigurer er ofte pedagogiske forenklinger.

Merk dem slik.

God overskrift.

```txt
Pedagogiske forenklinger
```

Dårlig overskrift.

```txt
Fasit
```

Skriv forbehold når eksemplet kan variere.

Godt.

```txt
DNB kan ha Coordination-trekk i ett forenklet eksempel.

Forbehold.
Banker kan også ha Unification-trekk i kjerneprosesser som KYC, betaling og compliance.
```

Ikke gjør en forenkling til en absolutt påstand.

---

## Takeaway

Takeaway skal være kort.

Den skal svare på figurens hovedspørsmål.

Godt.

```txt
En operating model spør hvor mye prosesser må dele data, og hvor likt prosessene må utføres.
```

Dårlig.

```txt
Denne modellen gir en helhetlig forståelse av hvordan moderne organisasjoner kan tenke strategisk rundt prosessdesign og digital transformasjon.
```

Hvis takeaway blir lang, har figuren sannsynligvis for mange poeng.

---

## Vanlige feil

### Feil: Figuren blir en plansje med alt

Symptom.

```txt
Mange bokser
Mange farger
Mange piler
Ingen tydelig start
Ingen tydelig hovedpoeng
```

Fiks.

```txt
Velg én hovedidé.
Flytt resten til underseksjoner.
```

### Feil: Modellen og caset står for langt fra hverandre

Symptom.

```txt
Leseren må scrolle mye mellom teori og eksempel.
```

Fiks.

```txt
Sett modell og case side ved side.
Legg forklaring rett under.
```

### Feil: Algoritmen tar for mye plass

Symptom.

```txt
Beslutningsflyten dominerer siden.
```

Fiks.

```txt
Krymp ytre margin.
Reduser nodeavstand.
Forkort tekst.
Behold lesbarhet.
```

### Feil: Teksten blir for tett

Symptom.

```txt
Lange setninger i små kort.
Mye tekst i tabellceller.
```

Fiks.

```txt
Del setninger.
Bruk linjeskift.
Bruk a), b), c) når prosessen har steg.
```

### Feil: Figuren forklarer ikke klassifiseringen

Symptom.

```txt
Figuren viser kategori, men ikke hvorfor caset havner der.
```

Fiks.

```txt
Vis signalet.
Koble signalet til modellen.
Koble modellen til resultatet.
```

### Feil: Figuren ser bra ut på skjerm, men feiler i PDF

Symptom.

```txt
iframe inneholder viktig figur
faste høyder kutter SVG
sidebrekk kommer midt i figur
piller brytes over to linjer
horisontal scroll trengs for å se innhold
```

Fiks.

```txt
Inline viktig innhold.
Bruk viewBox og aspect-ratio.
Planlegg PDF-sider.
Lag egen print-layout.
Test print tidlig.
```

---

## Sjekkliste før levering

Sjekk dette før en oversiktsfigur leveres.

```txt
Er hovedpoenget synlig på 10 sekunder?
Har figuren én tydelig jobb?
Er fagbegrepene presise?
Er modellen og caset koblet visuelt?
Er klassifiseringsgrunnlaget synlig?
Er eksempler merket som forenklinger?
Er lange setninger delt opp?
Er piller brukt bare på korte fagbegreper?
Er piller inline når de står i setninger?
Er farger konsekvente?
Ligger viktig innhold direkte i dokumentet?
Unngår figuren iframe for matrise, BPMN og algoritme?
Skalerer SVG-er med viewBox?
Brukes aspect-ratio der proporsjoner er viktigere enn fast høyde?
Har PDF-versjonen planlagte sidebrekk?
Fungerer figuren uten horisontal skrolling i PDF?
Er print-layout testet?
Er støy fjernet?
```

Hvis svaret er nei på ett av disse, rydd før levering.

---

## Kortversjon

```txt
Lag kartet først.
Vis caset ved siden av kartet.
Vis algoritmen etterpå.
Bruk korte setninger.
Bruk luft.
Bruk piller på nøkkelbegreper.
Hold fargene konsekvente.
Legg viktig innhold direkte i HTML-en.
Bruk viewBox og aspect-ratio.
Planlegg PDF-sidebrekk.
Lag egen print-layout.
Test PDF.
```

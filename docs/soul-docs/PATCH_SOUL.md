# PATCH_SOUL.md — Regler for AI-genererte patcher i ExamPrepper

<!-- Sist oppdatert: 2026-05-29 -->

Dette dokumentet beskriver hvordan en AI-assistent skal lage kodeendringer som patch-filer i ExamPrepper.

Dette dokumentet **utfyller `ARCHITECTURE_SOUL.md`**.

`ARCHITECTURE_SOUL.md` beskriver hvordan prosjektet skal være bygd.
`PATCH_SOUL.md` beskriver hvordan endringer skal lages, testes og leveres.
`QUESTION_TYPE_SOUL.md` beskriver hvordan spørsmålstyper skal velges og utformes.

Når du lager en patch: les dette først.

---

## 0. Minimum før du lager patch

Hvis du bare leser én seksjon, les denne.

Før en patch leveres, skal assistenten minst gjøre dette:

```txt
1. Inspiser faktisk filstruktur eller faktisk filinnhold
2. Endre minst mulig
3. Lag én patch med ett formål
4. Lag en vanlig Git patch
5. Kjør eller forsøk å kjøre git apply --check
6. Oppgi patch-base og forutsetninger
7. Oppgi testkommandoer
8. Ikke si at tester er kjørt hvis de ikke er kjørt
9. Ikke gjett når patchen feiler — les brukerens faktiske fil
```

---

## 1. Forholdet mellom ARCHITECTURE_SOUL.md, PATCH_SOUL.md og brukerens instruksjon

Ved konflikt gjelder denne rekkefølgen:

```txt
1. ARCHITECTURE_SOUL.md
   → arkitektur, lagdeling, kodekvalitet og prosjektprinsipper

2. PATCH_SOUL.md
   → hvordan AI-assistenter skal lage, teste og levere patcher

3. Brukerens konkrete instruksjon
   → så lenge den ikke bryter arkitekturreglene
```

Brukerens instruksjon kan bare overstyre `PATCH_SOUL.md` hvis brukeren eksplisitt ber om et bevisst avvik.

Eksempel:

```txt
Lag en midlertidig hack-patch, jeg vet at dette bryter ARCHITECTURE_SOUL.md.
```

Da kan assistenten gjøre et bevisst avvik, men avviket skal nevnes tydelig i svaret.

Eksempel:

```txt
Merk: Denne patchen bryter normalt ARCHITECTURE_SOUL.md fordi den legger midlertidig logikk i View.
Jeg gjør det bare fordi du eksplisitt ba om en midlertidig hack-patch.
```

Hvis brukeren ikke eksplisitt ber om avvik, skal assistenten følge `ARCHITECTURE_SOUL.md` og `PATCH_SOUL.md`.

---

## 2. Grunnregel

En patch skal være:

```txt
liten
målrettet
reverserbar
testbar
forklart
```

Ikke endre filer som ikke trengs.

Ikke refaktorer samtidig som du legger til funksjonalitet.

Ikke “rydd litt” i nærliggende kode.

Ikke gjør kosmetiske endringer i filer som ikke er en nødvendig del av oppgaven.

Hvis en endring kan deles i to meningsfulle patcher, skal den vanligvis deles.

---

## 3. ARCHITECTURE_SOUL.md er arkitekturautoriteten

`PATCH_SOUL.md` bestemmer **hvordan patchen lages**.

`ARCHITECTURE_SOUL.md` bestemmer **hvor kode hører hjemme**.

Assistenten skal derfor alltid følge disse prinsippene fra `ARCHITECTURE_SOUL.md`:

```txt
DataSource → Repository → Domain Use Case → DI → ViewModel → View → Komponenter
```

Kortversjon:

* View importerer aldri Use Cases, Repositories, DataSources eller `dependencies.js`
* ViewModel mottar Use Cases som parametere
* Use Cases eksponerer `execute(...)` som primær inngang
* Repository beriker og returnerer domeneobjekter
* DataSource henter rådata
* CSS importeres via `index.css`-kjeden, ikke direkte i komponenter
* Komponent-CSS skal bruke tokens der tokens finnes
* Domenelogikk skal ikke ligge i `src/utils/`
* Bilder skal flyte via data/repository, ikke hardkodes i View

Hvis en vanlig patch krever brudd på `ARCHITECTURE_SOUL.md`, er patchen feil utformet.

Lag heller en mindre patch som følger arkitekturen.

---

## 4. Standard arbeidsflyt

Når brukeren ber om en kodeendring, skal assistenten gjøre dette:

```txt
1. Inspiser relevant filstruktur
2. Finn minste sett med filer som må endres
3. Avklar patch-type
4. Forklar kort planlagt endring
5. Lag endringen i en kopi av prosjektet
6. Generer en vanlig Git patch
7. Sjekk at patchen kan applyes
8. Kjør relevante tester hvis mulig
9. Lever nedlastbar patch-fil
10. Gi eksakte kommandoer for apply og test
11. Oppgi forutsetninger og base
```

Hvis brukerens ønske er klart nok til å lage en trygg, liten patch, skal assistenten lage patchen uten unødvendige oppklaringsspørsmål.

Antakelser skal oppgis tydelig i svaret.

---

## 5. Patch-base skal alltid oppgis

Når en patch leveres, skal assistenten si hva patchen er laget mot.

Eksempel:

```txt
Base:
- Opplastet prosjekt: ExamPrepper.zip
- Branch/commit: ukjent
- Forutsetter ren arbeidsmappe
- Forutsetter at tidligere patcher ikke er applyet
```

Hvis Git-informasjon finnes:

```txt
Base:
- Branch: main
- Commit: a030543
- Working tree: clean
```

Hvis patchen bygger på en tidligere patch:

```txt
Base:
- Opplastet prosjekt: ExamPrepper.zip
- Forutsetter at 01-add-sequenceorder-engine.patch allerede er applyet
```

Hvis assistenten ikke kan se brukerens lokale `git status`, skal den ikke late som den kan det.

Riktig formulering:

```txt
Patchen er laget mot den opplastede zip-versjonen. Hvis din lokale branch har endringer i samme filer, kjør git apply --check først.
```

---

## 6. Ikke patch feil branch-state

Før en patch lages eller applyes, bør arbeidsmappen være ren:

```bash
git status
```

Forventet:

```txt
nothing to commit, working tree clean
```

Hvis arbeidsmappen ikke er ren, skal assistenten ikke anta at patchen kan applyes.

Be brukeren enten committe:

```bash
git add .
git commit -m "save local work"
```

eller stashe:

```bash
git stash push -m "before-ai-patch"
```

eller laste opp de faktiske filene som patchen skal bygges mot.

Hvis brukeren likevel ønsker patch mot en skitten arbeidsmappe, skal assistenten oppgi risikoen tydelig.

---

## 7. Patch-format

Patchen skal kunne kjøres fra prosjektroten:

```bash
git apply navn-pa-patch.patch
```

Patchen skal være en vanlig Git patch.

Bruk vanligvis:

```bash
git diff > navn-pa-patch.patch
```

Hvis patchen inneholder binærfiler, for eksempel bilder, ikoner, PDF-er eller andre assets, bruk:

```bash
git diff --binary > navn-pa-patch.patch
```

Hvis patchen kommer fra en commit, kan dette brukes:

```bash
git format-patch -1 HEAD
```

Ikke gi brukeren bare kodeblokker som må kopieres manuelt dersom brukeren har bedt om patch.

---

## 8. Obligatorisk patch-sjekk

Før patchen leveres, skal assistenten forsøke å sjekke at den kan applyes.

Minimum:

```bash
git apply --check navn-pa-patch.patch
```

Gjerne også:

```bash
git apply --stat navn-pa-patch.patch
git diff --check
```

Best praksis er å teste patchen mot en ren kopi:

```bash
cp -R ExamPrepper ExamPrepper_patch_check
cd ExamPrepper_patch_check
git apply --check ../navn-pa-patch.patch
```

Hvis `git apply --check` ikke kan kjøres i miljøet, skal assistenten si det eksplisitt.

Ikke skriv:

```txt
Patchen er testet
```

hvis den bare er generert, men ikke kontrollert.

---

## 9. Filnavn for patcher

Patchfilen skal ha et presist navn i kebab-case.

Gode navn:

```txt
add-sequenceorder-double-diamond-question.patch
fix-tablematch-feedback-scoring.patch
move-exam-layout-logic-to-viewmodel.patch
add-cynefin-default-question-images.patch
```

Dårlige navn:

```txt
patch.patch
fix.patch
changes.patch
new-question.patch
update.patch
```

Navnet skal si hva patchen gjør.

Hvis patchen bygger på en tidligere patch, kan navnet vise rekkefølge:

```txt
01-add-sequenceorder-engine.patch
02-add-sequenceorder-questions.patch
03-add-sequenceorder-images.patch
```

---

## 10. Svarformat når patchen leveres

Når patchen er laget, skal svaret til brukeren inneholde:

```txt
1. Kort hva patchen gjør
2. Hvilke filer den endrer
3. Patch-base
4. Nedlastbar lenke til patchen
5. Kommando for å sjekke patchen
6. Kommando for å applye patchen
7. Kommandoer for å teste
8. Eventuelle forutsetninger
9. Eventuelle ting som ikke kunne testes
```

Standardformat:

```txt
Laget patchen.

Den gjør:
- ...

Endrer:
- ...

Base:
- ...

Patch:
- [filnavn.patch]

Sjekk fra prosjektroten:
git apply --check filnavn.patch

Apply:
git apply filnavn.patch

Test:
git diff --check
npm test -- --runInBand
npm run build

Forutsetninger:
- ...
```

Svaret skal være kort og konkret.

Ikke skriv lange essay om hvorfor endringen er god.

Forklar det som trengs for å bruke patchen trygt.

---

## 11. Standard testkommandoer

Bruk vanligvis:

```bash
git diff --check
npm test -- --runInBand
npm run build
```

Hvis patchen bare endrer dokumentasjon, er dette vanligvis nok:

```bash
git diff --check
```

Forklar da hvorfor `npm test` og `npm run build` ikke er nødvendig.

Hvis patchen endrer CSS eller visuell JSX uten logikk, vurder:

```bash
npm run build
```

Hvis patchen endrer domenelogikk, grading, repository eller ViewModel, skal tester kjøres eller oppdateres:

```bash
npm test -- --runInBand
npm run build
```

Hvis test eller build feiler på grunn av miljø eller dependencies, skal assistenten skille tydelig mellom:

```txt
patch-feil
miljøfeil
eksisterende feil i prosjektet
```

Eksempel:

```txt
Jeg kunne ikke verifisere npm test fordi node_modules mangler / Jest runner mangler i miljøet. Patchen er derfor bare kontrollert med git apply --check og git diff --check.
```

Foreslå da:

```bash
npm ci
npm test -- --runInBand
npm run build
```

Ikke framstill patchen som fulltestet hvis testene ikke faktisk ble kjørt.

---

## 12. Før patchen lages

Assistenten skal undersøke faktisk prosjektstruktur før endring.

Ikke anta at en fil finnes bare fordi den “bør” finnes.

Eksempler:

```bash
ls
find src -maxdepth 3 -type d
find src/model -maxdepth 4 -type f
find src/ui/view -maxdepth 5 -type f
find src/ui/style -maxdepth 5 -type f
find test -maxdepth 5 -type f
```

Ved arbeid med spørsmålstyper:

```bash
grep -R "QUESTION_TYPES" -n src test
grep -R "SequenceOrder" -n src test
grep -R "TableMatch" -n src test
grep -R "CategorySort" -n src test
```

Ved arbeid med eksamensdata:

```bash
find src/data/exams -maxdepth 2 -type f
grep -R "questions" -n src/data/exams
grep -R "type:" -n src/data/exams
```

Ved arbeid med bilder:

```bash
find public/subjects -maxdepth 5 -type f
find src/data/subjects -maxdepth 5 -type f
grep -R "whyExtendedImageRefs" -n src/data
grep -R "conceptImages" -n src/data
```

Ved arbeid med CSS:

```bash
find src/ui/style -maxdepth 8 -type f
grep -R "@import" -n src/ui/style
```

---

## 13. En patch — ett formål

Riktig:

```txt
Patch 1: Legg til SequenceOrder-motor
Patch 2: Legg til SequenceOrder-spørsmål
Patch 3: Legg til bilder til SequenceOrder-feedback
Patch 4: Rydd gammel layoutlogikk ut av View
```

Feil:

```txt
Én patch som legger til ny oppgavetype, refaktorerer CSS, renamer mapper,
oppdaterer eksamensdata, endrer styling og fikser tester.
```

Store endringer skal deles i flere patcher med tydelig rekkefølge.

Hvis brukeren ber om en stor endring, skal assistenten foreslå patch-rekkefølge eller levere første trygge patch.

---

## 14. Patch-typer

Før endring skal assistenten identifisere hvilken type patch dette er.

Vanlige typer:

```txt
Dokumentasjonspatch
Spørsmålspatch
Motorpatch
UI-patch
CSS-patch
Bugfix-patch
Repository/DataSource-patch
Testpatch
Dependency-patch
```

Dette avgjør hva som må testes og hvilke filer som normalt kan røres.

---

## 15. Dokumentasjonspatcher

Dokumentasjonspatcher endrer typisk:

```txt
README.md
ARCHITECTURE_SOUL.md
PATCH_SOUL.md
QUESTION_TYPE_SOUL.md
docs/**
```

Regler:

* Skal ikke endre runtime-kode
* Skal ikke endre package-filer
* Skal ikke endre tester
* Krever vanligvis ikke `npm test`
* Skal fortsatt sjekkes med `git diff --check`

Test:

```bash
git diff --check
```

Hvis dokumentasjonen inneholder kommandoer, filstier eller arkitekturregler, skal disse stemme med faktisk prosjektstruktur.

---

## 16. Spørsmålspatcher

Spørsmålspatcher endrer typisk:

```txt
src/data/exams/**
src/data/subjects/**
public/subjects/**
```

Spørsmålspatcher skal ikke endre:

```txt
GradeAnswerUseCase
QuestionCard
ViewModel
CSS
QuestionTypes
```

Unntak: Hvis patchen avdekker at motoren ikke støtter dataformatet, skal motorendringen være en egen patch.

Regler for spørsmål:

* `id` skal være unik i eksamenen
* `type` skal matche eksisterende datakontrakt
* `title` skal være kort
* `prompt` skal si hva studenten skal gjøre
* `source` skal peke til pensum/kilde der prosjektet bruker det
* `whyCorrect` skal forklare faglig fasit
* `whyExtended` skal gi merverdi, ikke bare gjenta prompten
* Kortlabels skal være korte
* Lange forklaringer hører i feedback, ikke i kortlabel
* Norske eksamener bruker norsk prompt og norsk feedback
* Engelske fagbegreper beholdes når pensum bruker dem

Før en spørsmålspatch lages, skal assistenten alltid sjekke faktisk `type`-kontrakt.

Minimum:

```bash
cat src/constants/QuestionTypes.js
grep -R "QUESTION_TYPES" -n src test
```

Hvis AI-en legger inn feil `type`, er patchen feil.

Sjekk minst:

```bash
git diff --check
npm run build
```

Hvis mockdata kan importeres direkte, sjekk også relevant import:

```bash
node -e "import('./src/data/exams/mockExamDefinitions_no.js').then(m => console.log(Boolean(m.default)))"
```

Tilpass filnavnet til faktisk datastruktur.

---

## 17. Faktiske question type-verdier

Ikke anta at komponentnavn og `type`-verdi er identiske.

Assistenten skal sjekke `src/constants/QuestionTypes.js` før den legger inn eller endrer spørsmål.

Vanlig mønster i ExamPrepper kan være:

```txt
SingleRadioButtonChoice-komponent → type: "single"
MultiCheckboxSelect-komponent     → type: "multi"
FillBlankInputField-komponent      → type: "fill"
TableMatch-komponent               → type: "dragDrop"
CategorySort-komponent             → type: "drag-categorize"
MatrixPlacement-komponent          → type: "matrix-placement"
SequenceOrder-komponent            → type: "SequenceOrder"
```

Listen over er ikke autoritet.

Autoriteten er alltid faktisk kode:

```bash
cat src/constants/QuestionTypes.js
grep -R "QUESTION_TYPES" -n src test
```

Hvis det finnes tester som viser dataformatet for oppgavetypen, skal disse også sjekkes.

---

## 18. Valg av riktig spørsmålstype

For valg av oppgavetype, følg `QUESTION_TYPE_SOUL.md`.

`PATCH_SOUL.md` eier ikke hele oppgavetype-regelverket. Dette dokumentet beskriver bare hvordan endringen skal pakkes og leveres som patch.

Kort huskeregel:

```txt
Ett riktig alternativ                → Single choice
Flere riktige alternativer           → Multi choice
Presist begrep som skal huskes       → Fill blank
Én-til-én-matching                   → TableMatch
Flere kort i samme kategori          → CategorySort
To akser / todimensjonal modell      → MatrixPlacement
Entydig faglig rekkefølge            → SequenceOrder
```

Særlig viktige grenser:

```txt
Én riktig per rad = TableMatch
Flere riktige i samme dropzone = CategorySort
To dimensjoner = MatrixPlacement
Bare faglig entydig rekkefølge = SequenceOrder
```

Ikke bruk `SequenceOrder` for vurderingsbaserte rangeringer som “viktigst til minst viktig”.

Hvis `QUESTION_TYPE_SOUL.md` og eksisterende kode er uenige, skal assistenten stoppe og nevne avviket før patchen lages.

---

## 19. Motorpatcher

Motorpatcher endrer oppgavetype, grading, ViewModel, Repository eller UI-komponenter.

Typiske filer:

```txt
src/constants/QuestionTypes.js
src/model/domain/GradeAnswerUseCase.js
src/model/domain/CalculateExamScoreUseCase.js
src/ui/viewmodel/**
src/ui/view/components/ExamPage/**
src/ui/style/ExamPage/**
test/model/domain/**
test/ui/viewmodel/**
```

Motorpatcher skal normalt ha tester.

Må vurderes:

```txt
execute støtter typen
scoreberegning støtter typen
delpoeng håndteres riktig
tomt svar håndteres riktig
ukjent/ugyldig svar håndteres riktig
feedback får nødvendig stats
ViewModel sender riktige props
View importerer ikke domene
CSS følger importkjeden
```

Motorpatcher bør ikke samtidig legge til mange faglige spørsmål.

Bruk én liten testoppgave eller eksisterende data dersom UI må demonstreres.

---

## 20. Grading-regler

Grading hører i:

```txt
src/model/domain/GradeAnswerUseCase.js
```

Ikke i View.

Ikke i komponenter.

Ikke i ViewModel, med mindre ViewModel bare kaller et Use Case og lagrer resultatet.

Når ny oppgavetype legges til:

```txt
[ ] execute støtter typen
[ ] getQuestionScore støtter typen hvis delpoeng trengs
[ ] feedback-stats støtter typen hvis relevant
[ ] tester dekker riktig svar
[ ] tester dekker feil svar
[ ] tester dekker tomt svar
[ ] tester dekker delvis svar hvis typen har delpoeng
[ ] tester dekker ugyldige/ukjente verdier
```

Eksempel for SequenceOrder:

```txt
full score = alle posisjoner riktige
delpoeng = riktige posisjoner / totalt antall posisjoner
ukjente eller dupliserte item-id-er = håndteres etter eksisterende tester og kode
tom liste = ubesvart
```

Eksakt kontrakt skal følge eksisterende tester og kode.

---

## 21. UI-patcher

UI-patcher endrer JSX, komponentstruktur eller ViewModel-presentasjon.

Regler:

* Ikke legg forretningslogikk i View
* Ikke importer Use Cases i View
* Ikke send hele `viewModel` dypt ned i komponenttreet
* Send spesifikke props
* Events skal boble opp via callbacks
* Callback-props skal ha presise navn
* Ikke send raw setters som props dersom en navngitt handler hører i ViewModel
* Ikke bruk `document.querySelector` eller DOM-manipulasjon for React-eide elementer
* Bruk React state, props, refs og events

Tillatt lokal state i komponenter:

```txt
selectedItemId
dragOverIndex
expandedSlotIndex
lokal hover/focus/open-state
lokale drag/drop-handlers
```

Ikke tillatt lokal state i komponenter:

```txt
questions
answers
score
submitted
exam result
datahenting
repository-resultater
Use Case-resultater som eies av siden
```

---

## 22. CSS-patcher

CSS-patcher skal følge prosjektets CSS-struktur.

Regler:

* Ikke importer CSS direkte i komponenter
* CSS importeres via `index.css`-kjeden
* CSS-mapper skal speile komponentmapper
* Bruk eksisterende tokens før du legger til nye verdier
* Ikke hardkod farger, shadows eller radii hvis token finnes
* Ikke legg komponent-spesifikke tokens i globale `Tokens.css`
* Ikke legg `.dark`-spesifikke farger i komponent-CSS hvis token kan brukes
* `responsive.css` skal ligge sist i importkjeden der den finnes

Riktig mønster:

```css
/* src/ui/style/ExamPage/QuestionCard/QuestionTypes/DragDrop/index.css */
@import "./SequenceOrder/index.css";
```

```css
/* src/ui/style/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/index.css */
@import "./sequence-order.css";
@import "./responsive.css";
```

Feil i komponentfil:

```jsx
import "./sequence-order.css";
```

---

## 23. Bilder og binærfiler

Ikke hardkod bilde-URL-er direkte i komponenter.

Riktig dataflyt:

```txt
src/data/subjects/{subjectId}/conceptImages.js
        ↓
ConceptImageDataSource
        ↓
ExamRepository
        ↓
question.whyExtendedImages
        ↓
View-komponent mottar ferdige bildeobjekter
```

Når nye bilder legges til:

```txt
1. Legg bildefilen i public/subjects/{subjectId}/{moduleId}/{groupId}/
2. Legg metadata i src/data/subjects/{subjectId}/conceptImages.js
3. Pek på bildet via whyExtendedImageRefs eller defaultQuestionImageRefs
4. Ikke endre View bare for å bygge src-strenger
```

Hvis patchen inkluderer bilder eller andre binærfiler, må patchen genereres med:

```bash
git diff --binary > navn-pa-patch.patch
```

Ikke bruk vanlig `git diff > patch.patch` for binærfiler.

---

## 24. Repository/DataSource-patcher

Repository/DataSource-patcher endrer dataflyt.

Regler:

* DataSource henter rådata
* Repository kombinerer, normaliserer og beriker domeneobjekter
* Use Cases skal ikke vite hvor data kommer fra
* ViewModel skal ikke vite om DataSource eller Repository
* API-/HTTP-detaljer hører i DataSource
* Repository skal ikke inneholde UI-kunnskap
* DataSource skal ikke inneholde domeneregler

Hvis backend-forberedelser gjøres:

```txt
Bytt DataSource-implementasjon, ikke ViewModel eller View.
```

Hvis en backend-innføring krever endringer i View-komponenter, er det et tegn på at arkitekturgrensen er brutt.

---

## 25. Dependency-patcher

Dependency-patcher endrer typisk:

```txt
package.json
package-lock.json
vite.config.js
jest.config.js
babel.config.js
```

Regler:

* Ikke endre dependencies uten at oppgaven krever det
* Ikke endre `package-lock.json` alene
* Ikke endre `package.json` uten å oppdatere lockfile når npm brukes
* Forklar hvorfor dependency trengs
* Foretrekk eksisterende dependencies før nye legges til
* Ikke legg inn store biblioteker for små problemer
* Ikke legg til runtime dependency for noe som kan løses enkelt med eksisterende kode

Test vanligvis:

```bash
npm ci
npm test -- --runInBand
npm run build
```

Hvis `npm ci` ikke kan kjøres i miljøet, si det.

---

## 26. Filer som ikke skal patchkes

Ikke endre:

```txt
node_modules/
dist/
coverage/
.DS_Store
.vite/
.cache/
```

Ikke endre genererte filer.

Ikke endre lockfile med mindre patchen faktisk endrer dependencies.

Ikke endre formattering i store filer hvis oppgaven ikke handler om formattering.

Ikke rename mapper med skrivefeil hvis det ikke er en del av oppgaven.

Eksempel:

```txt
Hvis prosjektet allerede bruker en mappe med skrivefeil, behold stien.
Lag eventuell rename som egen patch.
```

---

## 27. Importregler

Ikke bryt lagdelingen.

Forbudt i View:

```js
import { gradeAnswerUseCase } from "../../../../di/dependencies.js";
import ExamRepository from "../../../../model/repositories/ExamRepository.js";
```

Tillatt i View:

```js
import SequenceOrderQuestion from "./QuestionTypes/DragDrop/SequenceOrder/Question/SequenceOrderQuestion.jsx";
```

Forbudt i ViewModel:

```js
import ExamPage from "../view/pages/ExamPage.jsx";
```

Tillatt i ViewModel:

```js
import { useMemo, useState, useCallback } from "react";
```

Use Cases skal motta dependencies via konstruktør.

Repositories skal motta DataSources via konstruktør.

`dependencies.js` er eneste sted som wirer konkrete instanser sammen.

---

## 28. Filbanekommentarer

Alle nye kildefiler skal ha filbanekommentar som første linje.

JS/JSX:

```js
// src/ui/viewmodel/useExamPageViewModel.js
```

CSS:

```css
/* src/ui/style/ExamPage/QuestionCard/index.css */
```

Regler:

* Første linje i filen
* Ingen blank linje før
* Sti relativ fra prosjektroten
* Mellomrom etter `//` er obligatorisk
* Kommentaren skal oppdateres hvis filen flyttes

Ikke gjør en egen patch bare for å fikse gamle filbanekommentarer med mindre brukeren ber om det.

Hvis du oppretter ny fil, følg regelen.

Hvis du endrer en fil som allerede har gammel feilkommentar, kan du rette den dersom det er nærliggende og ikke skaper unødvendig diff.

---

## 29. Navngiving i patcher

Følg prosjektets navnekonvensjoner.

Unngå generiske navn som permanente navn:

```txt
data
result
item
value
response
content
handler
helper
manager
util
obj
temp
res
cb
```

Bruk presise navn:

```txt
questions
examScore
currentQuestion
selectedAnswerIds
expandedAnswerOptionByQuestionId
questionsLoading
questionsLoadError
```

Booleans skal leses som påstander:

```txt
isSubmitted
hasAnswered
canGoNext
shouldShowFeedback
```

Callbacks skal beskrive brukerhandling eller intensjon:

```txt
onSelectSingleAnswer
onToggleMultiAnswer
onSubmitExam
onGoToNextQuestion
```

Ikke bruk `handleClick` i domenespesifikke komponenter hvis funksjonen egentlig gjør noe mer presist.

---

## 30. Testing

Testmappen skal speile `src/`.

Eksempler:

```txt
src/model/domain/GradeAnswerUseCase.js
→ test/model/domain/GradeAnswerUseCase.test.js

src/model/repositories/ExamRepository.js
→ test/model/repositories/ExamRepository.test.js

src/ui/viewmodel/resolveTranslatedExamId.js
→ test/ui/viewmodel/resolveTranslatedExamId.test.js
```

Hva som bør testes:

```txt
Use Cases
Repositories
ViewModel-utils
ren domenelogikk
scoreberegning
answer-normalisering
image-enrichment
fallback-logikk
```

Hva som vanligvis ikke trenger enhetstest:

```txt
ren visuell JSX
CSS
statisk mockdata uten logikk
```

Men mockdata skal kunne importeres uten syntax-feil.

Testbeskrivelser skal leses som setninger:

```js
test("returns true when all correct alternatives are selected", () => {});
test("returns false when answer is not an array", () => {});
test("returns partial score when two of four placements are correct", () => {});
```

Dårlig:

```js
test("test1", () => {});
test("gradeAnswer correct", () => {});
```

---

## 31. Håndtering av patch-feil

Hvis brukeren får:

```txt
error: patch failed
patch does not apply
```

skal assistenten ikke gjette.

Be om relevant informasjon:

```bash
git status
git apply --check navn-pa-patch.patch
```

Hvis feilen gjelder en bestemt fil:

```bash
git diff -- path/to/file
sed -n '1,220p' path/to/file
```

eller be brukeren laste opp aktuell fil.

Lag deretter en ny patch mot den faktiske versjonen brukeren har.

Ikke si:

```txt
Patchen burde fungere
```

når Git sier at den ikke gjør det.

Riktig:

```txt
Patchen matcher ikke filversjonen din. Send meg git status og relevant filutdrag, så lager jeg en ny patch mot din faktiske versjon.
```

---

## 32. Forutsetninger og patch-rekkefølge

Når en patch bygger på en tidligere patch, si det eksplisitt.

Eksempel:

```txt
Denne patchen forutsetter at 01-add-sequenceorder-engine.patch allerede er applyet.
```

Hvis det finnes to varianter, navngi dem tydelig:

```txt
add-sequenceorder-questions-after-engine.patch
add-sequenceorder-engine-and-questions.patch
```

Ikke gi to patcher uten å forklare hvilken som skal brukes.

Hvis brukeren bare skal bruke én av dem, si det tydelig.

---

## 33. Manuell UI-sjekk

Etter UI-patcher bør brukeren kunne sjekke manuelt:

```bash
npm run dev
```

Manuell sjekkliste for eksamensspørsmål:

```txt
[ ] Eksamen vises i eksamenslisten
[ ] Spørsmålet rendres
[ ] Svar kan gis
[ ] Submit fungerer
[ ] Poeng beregnes riktig
[ ] Feedback vises
[ ] Utvidet forklaring kan åpnes/lukkes
[ ] Bilder vises med caption/alt der det finnes
[ ] Neste/forrige-spørsmål fungerer
[ ] Layout fungerer på desktop
[ ] Layout fungerer på smal skjerm
```

For drag-and-drop-oppgaver:

```txt
[ ] Kort kan dras
[ ] Klikkbasert fallback fungerer hvis typen støtter det
[ ] Dropzones viser riktig state
[ ] Feil svar gir nyttig feedback
[ ] Ubesvart svar håndteres
[ ] Footer oppfører seg riktig ved store oppgaver
```

Assistenten skal ikke hevde at manuell UI er sjekket hvis den ikke faktisk er sjekket.

---

## 34. Sikkerhet

Ikke legg secrets i kode eller patch.

Forbudt i frontend:

```env
VITE_ADMIN_API_KEY=
VITE_JWT_SECRET=
VITE_DATABASE_URL=
VITE_SUPABASE_SERVICE_ROLE_KEY=
```

Tillatt i frontend bare når verdien er offentlig og ment for klienten:

```env
VITE_API_BASE_URL=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Forutsetning for Supabase anon key:

```txt
RLS må være aktivert og korrekt konfigurert.
```

`.env`-filer skal ikke committes.

`.env.example` kan committes med tomme eksempelverdier.

Ikke bruk:

```jsx
dangerouslySetInnerHTML
```

med mindre brukeren eksplisitt ber om rik HTML-støtte og patchen inkluderer trygg sanitization.

---

## 35. AI skal ikke skjule usikkerhet

Assistenten skal være tydelig om hva som faktisk er gjort.

Riktig:

```txt
Jeg har kjørt git apply --check og git diff --check.
Jeg kunne ikke kjøre npm test fordi dependencies mangler i miljøet.
```

Feil:

```txt
Alt er testet og fungerer.
```

hvis build/test ikke faktisk ble kjørt.

Hvis noe er antatt, si at det er antatt.

Hvis noe ikke er verifisert, si at det ikke er verifisert.

Hvis patchen er laget mot en opplastet zip og ikke brukerens lokale branch, si det.

---

## 36. Når patchen er ferdig

Svar til brukeren skal være kort og konkret.

Eksempel:

```txt
Laget patchen.

Den flytter layoutlogikk for drag-and-drop-spørsmål fra ExamPage.jsx til ExamPageViewModel.

Endrer:
- src/ui/viewmodel/ExamPageViewModel.js
- src/ui/view/pages/ExamPage.jsx
- test/ui/viewmodel/ExamPageViewModel.test.js

Base:
- Opplastet ExamPrepper.zip
- Commit ukjent

Patch:
- move-dragdrop-layout-logic-to-viewmodel.patch

Sjekk:
git apply --check move-dragdrop-layout-logic-to-viewmodel.patch

Apply:
git apply move-dragdrop-layout-logic-to-viewmodel.patch

Test:
git diff --check
npm test -- --runInBand
npm run build

Merk:
Jeg kunne ikke kjøre npm test i dette miljøet fordi node_modules mangler.
```

---

## 37. Kortversjon

```txt
Les ARCHITECTURE_SOUL.md først.
Les QUESTION_TYPE_SOUL.md ved spørsmålstypevalg.
Inspiser faktisk prosjektstruktur.
Endre minst mulig.
Én patch — ett formål.
Oppgi patch-base.
Lag vanlig Git patch.
Bruk git diff --binary for binærfiler.
Sjekk med git apply --check.
Ikke rør genererte filer.
Ikke bryt lagdelingen.
Ikke importer domene inn i View.
Ikke importer CSS direkte i komponenter.
Ikke hardkod bildebaner i View.
Sjekk QuestionTypes.js før du endrer spørsmål.
Legg til tester når logikk endres.
Skill mellom patch-feil og miljøfeil.
Når patch feiler, les brukerens faktiske fil og lag ny patch.
Lever kort svar med patch, apply-kommando og testkommandoer.
```
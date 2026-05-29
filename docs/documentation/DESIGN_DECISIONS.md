# Designvalg

**Eksamensdata er delt opp i flere filer.**
Hver øveeksamen og språkversjon ligger i egen fil under `src/data/exams/`. `data.js` fungerer som samlet eksamensregister.

**Hver eksamen har egen metadata.**
Hver øveeksamen har en unik `id`, en `baseId`, et språkfelt, en `title`, en `description` og en liste med `questions`. Dette gjør at appen kan vise riktig eksamen basert på både valgt eksamen og valgt språk.

**Fag og eksamener er adskilt.**
Fag ligger i `subjects.js`, mens eksamener ligger i egne mock-exam-filer. Det gjør det mulig å vise fagoversikt først, og deretter filtrere eksamener basert på valgt fag.

**Rette-logikken ligger i domenelaget.**
`GradeAnswerUseCase` avgjør om et svar er riktig. Dette gjør at komponentene ikke trenger å kjenne reglene for single choice, multiple choice, fill-in eller drag-and-drop.

**Score beregnes i en egen use case.**
`CalculateExamScoreUseCase` gjør poengberegning separat fra både UI og datalagring.

**ViewModels samler React-state.**
ViewModelene håndterer brukerens svar, submitted-status, åpne/lukkede svarkort, loading, timer, score og navigasjon mellom spørsmål. Dermed holdes side- og komponentlaget enklere.

**UI-komponentene er mest mulig dumme.**
Komponentene får data og handlers via props. State og brukerflyt eies primært av viewModelene og `App.jsx`, slik at komponentene i hovedsak fokuserer på presentasjon.

**Sidebar er felles for hele appen.**
Navigasjonen eies av `App.jsx`, mens `AppSidebar` kun presenterer navigasjonen. På smale skjermer vises sidebaren som en hamburgerstyrt drawer med backdrop og lukkeknapp.

**SubjectSelectPage er modularisert.**
Fagvelgeren er delt opp i `SubjectSelectTopbar`, `SubjectSelectControls`, `SubjectSelectGrid` og `SubjectSelectCard`. Dette gjør siden lettere å vedlikeholde og gjør det enklere å endre layout uten at page-filen vokser.

**ExamSelectPage er modularisert.**
Eksamensvelgeren er delt opp i `ExamSelectTopbar`, `ExamSelectIntro`, `ExamSelectGrid` og `ExamSelectCard`. Dette gjør siden lettere å vedlikeholde og gjør det enklere å endre layout uten at page-filen vokser.

**QuestionCard er delt etter oppgavetyper og fellesdeler.**
`QuestionCard` har en egen entrypoint-komponent i `QuestionCard/QuestionCard.jsx`. Konkrete oppgavetyper ligger under `QuestionTypes/`, blant annet `FillBlankInputField`, `MultiCheckboxSelect`, `SingleRadioButtonChoice` og `DragDrop`. Drag-and-drop-oppgaver er videre delt i `CategorySort`, `TableMatch` og `MatrixPlacement`. `MatrixPlacement` er laget som en generisk 2x2-matriseoppgave, slik at samme komponent kan brukes til flere faglige matriser, for eksempel operating model matrix og risk awareness matrix. Felles deler som prompt, feedback, header, styling og view-state ligger i `Shared/`.

**AnswerCard er modularisert.**
Svarkortene i feedback-mode er delt i `AnswerOptionCard`, `AnswerOptionActions`, `AnswerOptionMarker` og `AnswerOptionExtendedPanel`. Hjelpefunksjoner for AnswerCard ligger lokalt i `QuestionCard/AnswerCard/Utils/`.

**FeedbackPanel er tydeligere strukturert.**
Fill-in feedback viser brukerens svar og riktig svar side om side. Forklaringer og pensumhenvisninger vises som tydelige kort, slik at feedback-mode blir lettere å lese.

**Feature-nære Utils-mapper brukes for lokal logikk.**
Hjelpefunksjoner som bare brukes av ett komponentområde ligger i lokale `Utils/`-mapper, for eksempel under `QuestionCard`, `FeedbackPanel`, `ExamProgress` og `Footer`. Globale utils beholdes kun når funksjonen brukes på tvers av flere lag eller features.

**Footer er modularisert i funksjonelle enheter.**
Footer-komponenten er delt i `Footer`, `FooterActionButton`, `FooterNavigationButton`, `QuestionDots`, `QuestionDot` og `footerClassNames`. Handlingsknappen bytter mellom «Neste» og «Lever nå» avhengig av om brukeren er på siste spørsmål. Etter levering viser footer-dots riktig/feil-status med fargekoding.

**UI-et er delt inn i tydelige visuelle soner.**
Eksamenssiden består av sidebar, header/statistikk, progressbar, question card og footer-navigasjon. Dette gjør at brukeren hele tiden ser hvor langt de har kommet, hvilken oppgave de jobber med, og hvilke handlinger som er tilgjengelige.

**Responsivitet håndteres lokalt per UI-område.**
Responsiv styling ligger som hovedregel i `responsive.css` i den relevante side- eller komponentmappen. Det gjør at for eksempel `ExamPage`, `ExamSelectPage`, `SubjectSelectPage`, `QuestionCard`, `Footer`, `Header` og `FeedbackPanel` kan justeres hver for seg uten én stor global responsive-fil.

**QuestionCard-CSS speiler oppgavetype-strukturen.**
CSS for `QuestionCard` ligger fortsatt samlet under `src/ui/style/QuestionCard`, men er delt etter samme feature-logikk som komponentene. Delte spørsmålsstiler ligger i `Base/`, svarkortstiler i `AnswerCard/`, og spørsmålstype-spesifikke regler under `QuestionTypes/`. Drag-and-drop-stiler er videre delt i `Shared/`, `CategorySort/`, `TableMatch/` og `MatrixPlacement/`. `MatrixPlacement` har egne filer for `question`, `item-bank`, `matrix`, `feedback` og `responsive`, slik at layout, kortbank, matrisevisning, feedback og responsive regler kan vedlikeholdes separat.

**Laptop- og edge-case-layout er håndtert eksplisitt.**
Layouten er optimalisert for typiske laptop-skjermer, inkludert 14–17 tommers skjermer og svært lave viewport-høyder. På veldig lave høyder kan store kort falle tilbake til mer kompakte listevisninger, og sticky footer kan gå tilbake i vanlig scroll-flow for å unngå overlay.

**Språk og tema håndteres globalt.**
Språkvalg håndteres gjennom `LanguageContext`, mens light/dark mode håndteres gjennom `ThemeContext`. Dette gjør at komponentene kan bruke felles tilstand uten å duplisere logikk.

**Styling er modulært organisert per UI-område.**
`src/ui/style/App.css` fungerer som samlet CSS-entrypoint. Globale designverdier ligger i `Tokens.css`, mens global reset og basisregler ligger i `Global.css`. Større UI-områder som `ExamPage`, `ExamSelectPage`, `SubjectSelectPage`, `Header`, `Footer`, `QuestionCard`, `FeedbackPanel`, `SettingsMenu`, `Sidebar` og `ResultBadge` har egne mapper med `index.css` og mindre CSS-moduler.

**Prosjektet bruker vanlig CSS og design tokens.**
Tailwind er fjernet til fordel for vanlige CSS-filer, CSS custom properties og en tydelig modulstruktur. Farger, tekst, radius, skygger, spacing, overganger og tema defineres som globale design tokens. Flere komponentverdier hentes fra `Tokens.css`, slik at tokens fungerer som SSOT for visuelle grunnverdier.

**Composition Root i `dependencies.js`.**
Alle datasource-, repository- og use case-instansene opprettes på ett sted. Det gjør appen mer ryddig og gjør det lettere å bytte implementasjoner senere.

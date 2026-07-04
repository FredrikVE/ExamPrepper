<a href="../../README.md">← Tilbake til README</a>

---

# Styling

Global styling importeres fra `src/ui/style/App.css`.

```css
/* src/ui/style/App.css */

@import "./Tokens.css";
@import "./Global.css";

@import "./SubjectSelectPage/index.css";
@import "./LearningContentSelectPage/index.css";
@import "./ExamPage/index.css";

@import "./Header/index.css";
@import "./Footer/index.css";
@import "./QuestionCard/index.css";
@import "./FeedbackPanel/index.css";
@import "./SettingsMenu/index.css";
@import "./ResultBadge/index.css";
@import "./Sidebar/index.css";
```

### CSS-struktur for QuestionCard

`QuestionCard`-styling er organisert etter samme feature-inndeling som komponentene, men ligger fortsatt samlet under `src/ui/style/QuestionCard`. Delte stiler for hele spørsmålsvisningen ligger i `QuestionCard/Base`, mens stiler for bestemte deler eller oppgavetyper ligger i egne undermapper, for eksempel `AnswerCard`, `QuestionTypes/ChoiceShared`, `QuestionTypes/FillBlankInputField` og `QuestionTypes/DragDrop`.

```bash
src/ui/style/QuestionCard/
├── AnswerCard/
├── Base/
└── QuestionTypes/
    ├── ChoiceShared/
    ├── FillBlankInputField/
    └── DragDrop/
        ├── Shared/
        ├── CategorySort/
        ├── TableMatch/
        └── MatrixPlacement/
```

Hver mappe skal ha en `index.css` som importerer lokale CSS-filer i riktig rekkefølge. Nye spørsmålstype-spesifikke regler skal ikke legges flatt direkte under `QuestionCard`; de skal legges i riktig feature-mappe. Delte regler skal ligge i `Base` eller `Shared`, ikke inne i én spesifikk spørsmålstype.

Retningslinjer:

- Globale designverdier legges i `Tokens.css`.
- Global reset og basisregler legges i `Global.css`.
- Responsiv styling legges som hovedregel i `responsive.css` i den relevante side- eller komponentmappen.
- Globale responsive regler bør unngås med mindre de faktisk gjelder hele appen.
- Side-spesifikk styling legges i mappen for siden, for eksempel `SubjectSelectPage/`, `LearningContentSelectPage/` eller `ExamPage/`.
- Komponentområde-spesifikk styling legges i mappen for komponentområdet, for eksempel `Header/`, `Sidebar/`, `QuestionCard/` eller `FeedbackPanel/`.
- Hver mappe bør ha en `index.css` som importerer del-filene i riktig rekkefølge.
- `responsive.css` bør importeres sist i mappen sin `index.css`, slik at responsive regler kan overstyre base-styling.
- `QuestionCard`-spesifikke base-regler legges i `QuestionCard/Base/`.
- Spørsmålstype-spesifikk CSS legges under `QuestionCard/QuestionTypes/` og skal speile oppgavetypens feature-mappe.
- Felles drag-and-drop-regler legges i `QuestionCard/QuestionTypes/DragDrop/Shared/`.
- Komponenter bør bruke design tokens fra `Tokens.css` fremfor hardkodede verdier når verdien er gjenbrukbar.

# Prosjektstruktur

Selve React-komponentene ligger under `ui/view/components/`, mens sider ligger under `ui/view/pages/`. Styling er samlet separat i `ui/style/`, slik at komponentstruktur og CSS-struktur holdes adskilt, men fortsatt speiler hverandre der det gir bedre feature-eierskap.

Den mest detaljerte delen av strukturen ligger under `ExamPage/QuestionCard/`, der oppgavetypene er samlet i `QuestionTypes/`. Hver oppgavetype har egne komponenter og eventuelle lokale `Utils/`, mens felles komponenter for hele spørsmålsvisningen ligger i `Shared/`. CSS-en for `QuestionCard` følger samme feature-inndeling under `src/ui/style/QuestionCard`, med delte base-stiler i `Base/` og spørsmålstype-spesifikk styling under `QuestionTypes/`. Globale hjelpefunksjoner beholdes kun i `src/utils/` når de brukes på tvers av flere lag eller features.

```bash
IN5431-Exam-Emulator/
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── public/
│   └── favicon.ico
├── test/
│   ├── integration/
│   │   └── ...
│   ├── model/
│   │   └── ...
│   ├── ui/
│   │   └── ...
│   └── utils/
│       └── ...
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── constants/
    │   ├── QuestionConfig.js
    │   └── QuestionTypes.js
    ├── data/
    │   ├── data.js
    │   ├── subjects.js
    │   └── exams/
    │       ├── mockExam1_en.js
    │       ├── mockExam1_no.js
    │       ├── mockExam2_en.js
    │       ├── mockExam2_no.js
    │       ├── mockExam3_en.js
    │       ├── mockExam3_no.js
    │       ├── mockExam4_en.js
    │       ├── mockExam4_no.js
    │       ├── mockExam5_en.js
    │       └── mockExamDragCategorize_no.js
    ├── di/
    │   └── dependencies.js
    ├── i18n/
    │   ├── LanguageContext.jsx
    │   └── translations.js
    ├── model/
    │   ├── datasource/
    │   │   └── ...
    │   ├── domain/
    │   │   └── ...
    │   └── repositories/
    │       └── ...
    ├── navigation/
    │   ├── navGraph.js
    │   └── navItems.js
    ├── ui/
    │   ├── settings/
    │   │   └── SettingsContext.jsx
    │   ├── theme/
    │   │   └── ThemeContext.jsx
    │   ├── style/
    │   │   ├── App.css
    │   │   ├── Global.css
    │   │   ├── Tokens.css
    │   │   ├── ExamPage/
    │   │   │   └── ...
    │   │   ├── ExamSelectPage/
    │   │   │   └── ...
    │   │   ├── FeedbackPanel/
    │   │   │   └── ...
    │   │   ├── Footer/
    │   │   │   └── ...
    │   │   ├── Header/
    │   │   │   └── ...
    │   │   ├── QuestionCard/
    │   │   │   ├── AnswerCard/
    │   │   │   │   └── ...
    │   │   │   ├── Base/
    │   │   │   │   └── ...
    │   │   │   ├── QuestionTypes/
    │   │   │   │   ├── ChoiceShared/
    │   │   │   │   │   └── ...
    │   │   │   │   ├── FillBlankInputField/
    │   │   │   │   │   └── ...
    │   │   │   │   └── DragDrop/
    │   │   │   │       ├── Shared/
    │   │   │   │       │   └── ...
    │   │   │   │       ├── CategorySort/
    │   │   │   │       │   └── ...
    │   │   │   │       ├── TableMatch/
    │   │   │   │       │   └── ...
    │   │   │   │       └── MatrixPlacement/
    │   │   │   │           └── ...
    │   │   │   └── ...
    │   │   ├── ResultBadge/
    │   │   │   └── ...
    │   │   ├── SettingsMenu/
    │   │   │   └── ...
    │   │   ├── Sidebar/
    │   │   │   └── ...
    │   │   └── SubjectSelectPage/
    │   │       └── ...
    │   ├── view/
    │   │   ├── pages/
    │   │   │   ├── ExamPage.jsx
    │   │   │   ├── ExamSelectPage.jsx
    │   │   │   └── SubjectSelectPage.jsx
    │   │   └── components/
    │   │       ├── ExamPage/
    │   │       │   ├── ExamPageContent.jsx
    │   │       │   ├── ExamPageState.jsx
    │   │       │   ├── ExamProgress/
    │   │       │   │   └── ...
    │   │       │   ├── FeedbackPanel/
    │   │       │   │   └── ...
    │   │       │   ├── QuestionCard/
    │   │       │   │   ├── QuestionCard.jsx
    │   │       │   │   ├── AnswerCard/
    │   │       │   │   │   └── ...
    │   │       │   │   ├── QuestionTypes/
    │   │       │   │   │   ├── ChoiceShared/
    │   │       │   │   │   │   └── ...
    │   │       │   │   │   ├── FillBlankInputField/
    │   │       │   │   │   │   └── ...
    │   │       │   │   │   ├── MultiCheckboxSelect/
    │   │       │   │   │   │   └── MultiCheckboxSelectQuestion.jsx
    │   │       │   │   │   ├── SingleRadioButtonChoice/
    │   │       │   │   │   │   └── SingleRadioButtonChoiceQuestion.jsx
    │   │       │   │   │   └── DragDrop/
    │   │       │   │   │       ├── Shared/
    │   │       │   │   │       │   └── ...
    │   │       │   │   │       ├── CategorySort/
    │   │       │   │   │       │   └── ...
    │   │       │   │   │       ├── MatrixPlacement/
    │   │       │   │   │       │   ├── Feedback/
    │   │       │   │   │       │   ├── ItemBank/
    │   │       │   │   │       │   ├── Matrix/
    │   │       │   │   │       │   ├── Question/
    │   │       │   │   │       │   └── Utils/
    │   │       │   │   │       └── TableMatch/
    │   │       │   │   │           └── ...
    │   │       │   │   └── Shared/
    │   │       │   │       ├── Feedback/
    │   │       │   │       │   └── ...
    │   │       │   │       ├── Prompt/
    │   │       │   │       │   └── ...
    │   │       │   │       ├── QuestionHeader/
    │   │       │   │       │   └── ...
    │   │       │   │       ├── Styling/
    │   │       │   │       │   └── ...
    │   │       │   │       └── Utils/
    │   │       │   │           └── ...
    │   │       │   └── ResultBadge/
    │   │       │       └── ResultBadge.jsx
    │   │       ├── ExamSelectPage/
    │   │       │   └── ...
    │   │       ├── Footer/
    │   │       │   └── ...
    │   │       ├── Header/
    │   │       │   └── ...
    │   │       ├── Settings/
    │   │       │   └── ...
    │   │       ├── Sidebar/
    │   │       │   └── ...
    │   │       ├── SubjectIcon.jsx
    │   │       └── SubjectSelectPage/
    │   │           └── ...
    │   └── viewmodel/
    │       ├── AppNavigationViewModel.js
    │       ├── ExamPageViewModel.js
    │       ├── ExamSelectPageViewModel.js
    │       ├── SubjectSelectPageViewModel.js
    │       └── Utils/
    │           └── ...
    └── utils/
        └── answer/
            ├── getCorrectIndexes.js
            └── normalizeAnswer.js
```

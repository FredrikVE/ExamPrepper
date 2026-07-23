<a href="../../README.md">← Tilbake til README</a>

---

# Prosjektstruktur

Selve React-komponentene ligger under `ui/view/components/`, mens sider ligger under `ui/view/pages/`. Styling er samlet separat i `ui/style/`, slik at komponentstruktur og CSS-struktur holdes adskilt, men fortsatt speiler hverandre der det gir bedre feature-eierskap.

Den mest detaljerte delen av strukturen ligger under `ExamPage/QuestionCard/`, der oppgavetypene er samlet i `QuestionTypes/`. Hver oppgavetype har egne komponenter og eventuelle lokale `Utils/`, mens felles komponenter for hele spørsmålsvisningen ligger i `Shared/`. CSS-en for `QuestionCard` følger samme feature-inndeling under `src/ui/style/QuestionCard`, med delte base-stiler i `Base/` og spørsmålstype-spesifikk styling under `QuestionTypes/`. Globale hjelpefunksjoner beholdes kun i `src/utils/` når de er tekniske og domeneløse. Domenespesifikke hjelpefunksjoner ligger i `src/model/domain/utils/`.

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
    │   │   ├── utils/
    │   │   │   ├── fuzzyMatch.js
    │   │   │   ├── getCorrectIndexes.js
    │   │   │   └── normalizeAnswer.js
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
    │   │   ├── LearningContentSelectPage/
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
    │   │   │   ├── LearningContentSelectPage.jsx
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
    │   │       ├── LearningContentSelectPage/
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
    │       ├── LearningContentSelectPageViewModel.js
    │       ├── SubjectSelectPageViewModel.js
    │       └── Utils/
    │           └── ...
```


### Page tools

Delte definisjoner for sideverktøy ligger i `src/ui/pageTools/pageTools.js`; de er UI-konfigurasjon, ikke navigasjonsregler.

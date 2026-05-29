// src/i18n/translations.js
export const LANGUAGES = {
    NO: "no",
    EN: "en"
};

export const LANGUAGE_LABELS = {
    [LANGUAGES.NO]: "Norsk",
    [LANGUAGES.EN]: "English"
};

export const translations = {
    [LANGUAGES.NO]: {
        // SubjectSelectPage
        subjectSelectTitle: "Velg fag",
        subjectSelectSubtitle: "Velg hvilket fag du vil øve på før du velger mock-eksamen.",
        subjectSelectEyebrow: "Mock Exam Simulator",
        subjectSearchLabel: "Søk etter fag",
        subjectSearchPlaceholder: "Søk på fagkode eller navn...",
        subjectFacultyLabel: "Fakultet",
        subjectAllFaculties: "Alle fakulteter",
        subjectEmptyMessage: "Fant ingen fag som matcher søket ditt.",
        subjectLoadingMessage: "Laster fag...",
        subjectErrorMessage: "Kunne ikke laste inn fag.",
        subjectMockExamCount: (count) => `${count} mock-eksamen${count === 1 ? "" : "er"}`,

        // ExamSelectPage
        selectTitle: "Eksamens-emulator",
        selectIntroTitle: "Velg eksamen",
        selectSubtitle: (subjectCode) => `Velg en øvingsprøve for ${subjectCode}`,
        selectSubtitleFallback: "Velg en øvingsprøve for å starte",
        selectStatistics: "Din statistikk",
        selectPracticeExamLabel: (number) => `ØVINGSPRØVE ${number}`,
        selectQuestionLabel: "spørsmål",
        selectMinuteLabel: "minutter",
        selectEmptyTitle: "Ingen eksamener tilgjengelig",
        selectEmptyMessage: "Dette faget har ingen mock-eksamener ennå.",
        selectLoadingMessage: "Laster eksamener...",
        selectErrorMessage: "Kunne ikke laste inn eksamener.",
        selectBackToSubjects: "Tilbake til fag",

        // Header
        headerLabel: "Mock skoleeksamen",
        headerTitle: "Eksamens-emulator med fasit",
        headerQuestionProgress: (current, total) => `Spørsmål ${current} av ${total}`,
        headerStatAnswered: "besvart",
        headerStatScore: "score",
        headerStatTime: "tid brukt",
        headerSubmitButton: "Lever nå",
        headerResetButton: "Ny runde",
        headerBackTitle: "Tilbake til eksamenslisten",

        // ExamPage
        loadingMessage: "Laster eksamen...",
        errorPrefix: "Feil",
        emptyMessage: "Ingen spørsmål funnet...",

        // Footer
        footerPrevious: "Forrige",
        footerNext: "Neste",
        footerQuestionNavigationLabel: "Hopp direkte til spørsmål",
        footerGoToQuestion: (number) => `Gå til spørsmål ${number}`,

        // QuestionCard
        questionMeta: (id, points, typeLabel) => `Oppgave ${id} · ${points}p · ${typeLabel}`,
        questionTypeFill: "Fyll inn",
        questionTypeMulti: "Flervalg",
        questionTypeSingle: "Ett riktig svar",
        questionTypeDragDrop: "Dra og slipp",
        questionTypeDragCategorize: "Dra til kategori",
        questionTypeMatrixPlacement: "Matriseplassering",
        questionTypeSequenceOrder: "Rekkefølge",
        questionInputPlaceholder: "Skriv begrep her...",
        questionAnswerLabel: "Ditt svar",
        questionInputRule: "Skriv kun ett begrep. Ingen mellomrom før eller etter.",
        questionCharacterCount: (count, max) => `${count} / ${max} tegn`,
        questionWrongTitle: "Feil svar",
        questionWrongHint: "Trykk «Vis fasit» øverst for forklaring og pensumhenvisning.",

        dragDropCardBankTitle: "Svar-kort",
        dragDropCardBankHint: "Dra et kort til tabellen, eller klikk kortet og deretter feltet du vil plassere det i.",
        dragDropDescriptionHeader: "Beskrivelse",
        dragDropAnswerHeader: "Svar",
        dragDropDropHere: "Slipp her",
        dragDropSelectAnswer: "Velg svar",
        dragDropSelectPlaceholder: "Velg eller slipp her",
        dragDropClearAnswer: "Fjern svar",
        dragDropSummaryTitle: "Oppsummering av dra-og-slipp-svar",
        dragDropPartlyCorrect: "Delvis korrekt svar",
        dragDropCorrectShort: "riktig",
        dragDropWrongShort: "feil",
        dragDropUnansweredShort: "ubesvart",
        dragDropUnanswered: "Ubesvart",
        dragDropShowExplanation: "Vis forklaring",
        dragDropHideExplanation: "Skjul forklaring",

        dragCategorizeItemBankTitle: "Svar-kort",
        dragCategorizeItemBankHint: "Dra et kort til riktig kategori, eller klikk kortet og deretter kategorien.",
        dragCategorizeFeedbackBankHint: "Kortene over viser oppgavens mulige svar.",
        dragCategorizeDropHere: "Slipp her",
        dragCategorizeRemoveAnswer: "Fjern svar",

        matrixPlacementItemBankTitle: "Svar-kort",
        matrixPlacementItemBankSubtitle: "Dra hver blokk til riktig kvadrant.",
        matrixPlacementItemBankHint: "Dra et kort til riktig kvadrant, eller klikk kortet og deretter kvadranten.",
        matrixPlacementDropHere: "Slipp kort her",
        matrixPlacementRemoveAnswer: "Fjern svar",
        matrixPlacementPlacedSuffix: "plassert",
        matrixPlacementNoPlacedItems: "Ingen kort plassert",
        matrixPlacementAnswerKeyPill: "Fasit",

        sequenceOrderAlternativeBankTitle: "Alternativbank",
        sequenceOrderAlternativeBankHint: "Dra et alternativ inn i riktig rekkefølge, eller klikk alternativet og deretter feltet.",
        sequenceOrderCorrectSequenceTitle: "Riktig rekkefølge",
        sequenceOrderCorrectOrderTitle: "Riktig rekkefølge",
        sequenceOrderSubmittedSequenceTitle: "Din rekkefølge",
        sequenceOrderRemoveAnswer: "Fjern alternativ",

        // FeedbackPanel
        feedbackCorrectLabel: "Din besvarelse er riktig",
        feedbackWrongLabel: "Din besvarelse er feil",
        feedbackAnswerLabel: "Fasit:",
        feedbackYourAnswerLabel: "Du svarte",
        feedbackCorrectAnswerLabel: "Riktig svar",
        feedbackWhyCorrectTitle: "Hvorfor er fasit riktig?",
        feedbackWhyWrongTitle: "Hvorfor ble ditt svar vurdert som galt?",
        feedbackOptionsTitle: "Hvorfor er alternativene riktige/gale?",
        feedbackOptionCorrect: "Riktig alternativ",
        feedbackOptionWrong: "Galt alternativ",
        feedbackOptionSelected: "du valgte denne",
        feedbackExtendedLabel: "Utvidet forklaring",
        feedbackSourceTitle: "Henvisning til fasit/pensum",

        // ResultBadge
        resultCorrect: "Riktig",
        resultWrong: "Feil",

        // Settings
        settingsTitle: "Innstillinger",
        settingsLanguage: "Språk",
        settingsClose: "Lukk innstillinger",
        settingsOpenMenu: "Åpne meny",
        settingsRandomizeAnswers: "Randomisering",
        settingsDarkMode: "Mørkt tema",

        // Sidebar
        sidebarLabel: "Eksamensnavigasjon",
        sidebarSubjects: "Velg fag fra hjemskjerm",
        sidebarExams: "Velg eksamen",
        sidebarHome: "Velg fag fra hjemskjerm",
        sidebarOverview: "Oversikt",
        sidebarNotes: "Notater",
        sidebarSettings: "Innstillinger"
    },

    [LANGUAGES.EN]: {
        // SubjectSelectPage
        subjectSelectTitle: "Choose subject",
        subjectSelectSubtitle: "Choose which subject you want to practise before selecting a mock exam.",
        subjectSelectEyebrow: "Mock Exam Simulator",
        subjectSearchLabel: "Search for subject",
        subjectSearchPlaceholder: "Search by subject code or name...",
        subjectFacultyLabel: "Faculty",
        subjectAllFaculties: "All faculties",
        subjectEmptyMessage: "No subjects matched your search.",
        subjectLoadingMessage: "Loading subjects...",
        subjectErrorMessage: "Could not load subjects.",
        subjectMockExamCount: (count) => `${count} mock exam${count === 1 ? "" : "s"}`,

        // ExamSelectPage
        selectTitle: "Exam Emulator",
        selectIntroTitle: "Choose exam",
        selectSubtitle: (subjectCode) => `Choose a practice exam for ${subjectCode}`,
        selectSubtitleFallback: "Choose a practice exam to begin",
        selectStatistics: "Your statistics",
        selectPracticeExamLabel: (number) => `PRACTICE EXAM ${number}`,
        selectQuestionLabel: "questions",
        selectMinuteLabel: "minutes",
        selectEmptyTitle: "No exams available",
        selectEmptyMessage: "This subject does not have any mock exams yet.",
        selectLoadingMessage: "Loading exams...",
        selectErrorMessage: "Could not load exams.",
        selectBackToSubjects: "Back to subjects",

        // Header
        headerLabel: "Mock exam",
        headerTitle: "Exam emulator with answer key",
        headerQuestionProgress: (current, total) => `Question ${current} of ${total}`,
        headerStatAnswered: "answered",
        headerStatScore: "score",
        headerStatTime: "time used",
        headerSubmitButton: "Submit",
        headerResetButton: "New round",
        headerBackTitle: "Back to exam list",

        // ExamPage
        loadingMessage: "Loading exam...",
        errorPrefix: "Error",
        emptyMessage: "No questions found...",

        // Footer
        footerPrevious: "Previous",
        footerNext: "Next",
        footerQuestionNavigationLabel: "Jump directly to a question",
        footerGoToQuestion: (number) => `Go to question ${number}`,

        // QuestionCard
        questionMeta: (id, points, typeLabel) => `Question ${id} · ${points}p · ${typeLabel}`,
        questionTypeFill: "Fill in",
        questionTypeMulti: "Multiple choice",
        questionTypeSingle: "Single answer",
        questionTypeDragDrop: "Drag and drop",
        questionTypeDragCategorize: "Category sort",
        questionTypeMatrixPlacement: "Matrix placement",
        questionTypeSequenceOrder: "Sequence order",
        questionInputPlaceholder: "Type term here...",
        questionAnswerLabel: "Your answer",
        questionInputRule: "Write one term only. No leading or trailing spaces.",
        questionCharacterCount: (count, max) => `${count} / ${max} chars`,
        questionWrongTitle: "Wrong answer",
        questionWrongHint: "Press \"Show answers\" above for explanation and curriculum reference.",

        dragDropCardBankTitle: "Archetype cards",
        dragDropCardBankHint: "Drag a card into the table, or click a card and then click a drop field.",
        dragDropDescriptionHeader: "Description",
        dragDropAnswerHeader: "Answer",
        dragDropDropHere: "Drop here",
        dragDropSelectAnswer: "Choose answer",
        dragDropSelectPlaceholder: "Choose or drop here",
        dragDropClearAnswer: "Clear answer",
        dragDropSummaryTitle: "Drag-and-drop answer summary",
        dragDropPartlyCorrect: "Partly correct answer",
        dragDropCorrectShort: "correct",
        dragDropWrongShort: "wrong",
        dragDropUnansweredShort: "unanswered",
        dragDropUnanswered: "Unanswered",
        dragDropShowExplanation: "Show explanation",
        dragDropHideExplanation: "Hide explanation",

        dragCategorizeItemBankTitle: "Answer cards",
        dragCategorizeItemBankHint: "Drag a card into the correct category, or click a card and then click the category.",
        dragCategorizeFeedbackBankHint: "The cards above show the possible answers for this task.",
        dragCategorizeDropHere: "Drop here",
        dragCategorizeRemoveAnswer: "Remove answer",

        matrixPlacementItemBankTitle: "Answer cards",
        matrixPlacementItemBankSubtitle: "Drag each block into the correct quadrant.",
        matrixPlacementItemBankHint: "Drag a card into the correct quadrant, or click a card and then click the quadrant.",
        matrixPlacementDropHere: "Drop card here",
        matrixPlacementRemoveAnswer: "Remove answer",
        matrixPlacementPlacedSuffix: "placed",
        matrixPlacementNoPlacedItems: "No cards placed",
        matrixPlacementAnswerKeyPill: "Answer key",

        sequenceOrderAlternativeBankTitle: "Alternative bank",
        sequenceOrderAlternativeBankHint: "Drag an alternative into the correct order, or click an alternative and then click a slot.",
        sequenceOrderCorrectSequenceTitle: "Correct sequence",
        sequenceOrderCorrectOrderTitle: "Correct order",
        sequenceOrderSubmittedSequenceTitle: "Your sequence",
        sequenceOrderRemoveAnswer: "Remove alternative",

        // FeedbackPanel
        feedbackCorrectLabel: "Your answer is correct",
        feedbackWrongLabel: "Your answer is incorrect",
        feedbackAnswerLabel: "Answer key:",
        feedbackYourAnswerLabel: "You answered",
        feedbackCorrectAnswerLabel: "Correct answer",
        feedbackWhyCorrectTitle: "Why is this correct?",
        feedbackWhyWrongTitle: "Why was your answer marked as wrong?",
        feedbackOptionsTitle: "Why are the options correct/wrong?",
        feedbackOptionCorrect: "Correct option",
        feedbackOptionWrong: "Wrong option",
        feedbackOptionSelected: "you chose this",
        feedbackExtendedLabel: "Extended explanation",
        feedbackSourceTitle: "Curriculum reference",

        // ResultBadge
        resultCorrect: "Correct",
        resultWrong: "Wrong",

        // Settings
        settingsTitle: "Settings",
        settingsLanguage: "Language",
        settingsClose: "Close settings",
        settingsOpenMenu: "Open menu",
        settingsRandomizeAnswers: "Randomization",
        settingsDarkMode: "Dark mode",

        // Sidebar
        sidebarLabel: "Exam navigation",
        sidebarSubjects: "Choose subject from home",
        sidebarExams: "Choose exam",
        sidebarHome: "Choose subject from home",
        sidebarOverview: "Overview",
        sidebarNotes: "Notes",
        sidebarSettings: "Settings"
    }
};
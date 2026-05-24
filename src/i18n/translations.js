//src/i18n/translations.js
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
        // ExamSelectPage
        selectTitle: "IN5431 Eksamens-emulator",
        selectSubtitle: "Velg en øveeksamen for å starte",
        selectQuestionCount: (count) => `${count} spørsmål`,

        // Header
        headerLabel: "IN5431 mock skoleeksamen",
        headerTitle: "Eksamens-emulator med fasit",
        headerQuestionProgress: (current, total) => `Spørsmål ${current} av ${total}`,
        headerStatAnswered: "besvart",
        headerStatScore: "score",
        headerSubmitButton: "Lever nå",
        headerShowFeedback: "Vis fasit",
        headerHideFeedback: "Skjul fasit",
        headerResetButton: "Ny runde",
        headerBackTitle: "Tilbake til eksamenslisten",

        // ExamPage
        loadingMessage: "Laster eksamen...",
        errorPrefix: "Feil",
        emptyMessage: "Ingen spørsmål funnet...",

        // Footer
        footerPrevious: "Forrige",
        footerNext: "Neste",

        // QuestionCard
        questionMeta: (id, points, typeLabel) => `Oppgave ${id} · ${points}p · ${typeLabel}`,
        questionTypeFill: "Fyll inn",
        questionTypeMulti: "Flervalg",
        questionTypeSingle: "Ett riktig svar",
        questionInputPlaceholder: "Skriv begrep her",
        questionWrongTitle: "Feil svar",
        questionWrongHint: "Trykk «Vis fasit» øverst for forklaring og pensumhenvisning.",

        // FeedbackPanel
        feedbackCorrectLabel: "Din besvarelse er riktig",
        feedbackWrongLabel: "Din besvarelse er feil",
        feedbackAnswerLabel: "Fasit:",
        feedbackWhyCorrectTitle: "Hvorfor er fasit riktig?",
        feedbackWhyWrongTitle: "Hvorfor ble ditt svar vurdert som galt?",
        feedbackOptionsTitle: "Hvorfor er alternativene riktige/gale?",
        feedbackOptionCorrect: "Riktig alternativ",
        feedbackOptionWrong: "Galt alternativ",
        feedbackOptionSelected: "du valgte denne",
        feedbackSourceTitle: "Henvisning til fasit/pensum",

        // ResultBadge
        resultCorrect: "Riktig",
        resultWrong: "Feil",

        // Settings
        settingsTitle: "Innstillinger",
        settingsLanguage: "Språk",
        settingsClose: "Lukk innstillinger",
        settingsOpenMenu: "Åpne meny"
    },

    [LANGUAGES.EN]: {
        // ExamSelectPage
        selectTitle: "IN5431 Exam Emulator",
        selectSubtitle: "Choose a practice exam to begin",
        selectQuestionCount: (count) => `${count} questions`,

        // Header
        headerLabel: "IN5431 mock exam",
        headerTitle: "Exam emulator with answer key",
        headerQuestionProgress: (current, total) => `Question ${current} of ${total}`,
        headerStatAnswered: "answered",
        headerStatScore: "score",
        headerSubmitButton: "Submit",
        headerShowFeedback: "Show answers",
        headerHideFeedback: "Hide answers",
        headerResetButton: "New round",
        headerBackTitle: "Back to exam list",

        // ExamPage
        loadingMessage: "Loading exam...",
        errorPrefix: "Error",
        emptyMessage: "No questions found...",

        // Footer
        footerPrevious: "Previous",
        footerNext: "Next",

        // QuestionCard
        questionMeta: (id, points, typeLabel) => `Question ${id} · ${points}p · ${typeLabel}`,
        questionTypeFill: "Fill in",
        questionTypeMulti: "Multiple choice",
        questionTypeSingle: "Single answer",
        questionInputPlaceholder: "Type your answer here",
        questionWrongTitle: "Wrong answer",
        questionWrongHint: "Press \"Show answers\" above for explanation and curriculum reference.",

        // FeedbackPanel
        feedbackCorrectLabel: "Your answer is correct",
        feedbackWrongLabel: "Your answer is incorrect",
        feedbackAnswerLabel: "Answer key:",
        feedbackWhyCorrectTitle: "Why is this correct?",
        feedbackWhyWrongTitle: "Why was your answer marked as wrong?",
        feedbackOptionsTitle: "Why are the options correct/wrong?",
        feedbackOptionCorrect: "Correct option",
        feedbackOptionWrong: "Wrong option",
        feedbackOptionSelected: "you chose this",
        feedbackSourceTitle: "Curriculum reference",

        // ResultBadge
        resultCorrect: "Correct",
        resultWrong: "Wrong",

        // Settings
        settingsTitle: "Settings",
        settingsLanguage: "Language",
        settingsClose: "Close settings",
        settingsOpenMenu: "Open menu"
    }
};

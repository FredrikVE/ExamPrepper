// src/ui/viewmodel/ExamPage/createExamPageCopy.js
export default function createExamPageCopy(t) {
	return {
		loadingMessage: t.loadingMessage,
		errorPrefix: t.errorPrefix,
		emptyMessage: t.emptyMessage,
		questionsLoadErrorMessage: t.examLoadErrorMessage,
		attemptSavingMessage: t.examAttemptSavingMessage,
		attemptSaveErrorMessage: t.examAttemptSaveErrorMessage,
		answeredLabel: t.examAnsweredLabel
	};
}

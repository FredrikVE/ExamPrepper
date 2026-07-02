// src/ui/viewmodel/ExamPage/shouldPreserveExamAttemptOnQuestionReload.js
export default function shouldPreserveExamAttemptOnQuestionReload(previousQuestions, nextQuestions) {
	if (!Array.isArray(previousQuestions) || !Array.isArray(nextQuestions)) {
		return false;
	}

	if (previousQuestions.length === 0 || nextQuestions.length === 0) {
		return false;
	}

	if (previousQuestions.length !== nextQuestions.length) {
		return false;
	}

	return previousQuestions.every((previousQuestion, questionIndex) => {
		const previousQuestionId = previousQuestion?.id;
		const nextQuestionId = nextQuestions[questionIndex]?.id;

		return Boolean(previousQuestionId) && previousQuestionId === nextQuestionId;
	});
}

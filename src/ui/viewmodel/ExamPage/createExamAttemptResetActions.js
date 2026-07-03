import createAnswerOptionOrderByQuestionId from "../Utils/answerOptionOrder.js";

export function createExamAttemptResetState(questionSet) {
	return {
		answers: {},
		submitted: false,
		showAllFeedback: true,
		currentQuestionIndex: 0,
		expandedAnswerOptionIndexesByQuestionId: {},
		answerOptionOrderByQuestionId: createAnswerOptionOrderByQuestionId(questionSet)
	};
}

export function resetExamAttemptState({
	questionSet,
	setAnswers,
	setSubmitted,
	setShowAllFeedback,
	setCurrentQuestionIndex,
	resetElapsedSeconds,
	setExpandedAnswerOptionIndexesByQuestionId,
	setAnswerOptionOrderByQuestionId,
	resetSubmitModel
}) {
	const resetState = createExamAttemptResetState(questionSet);

	setAnswers(resetState.answers);
	setSubmitted(resetState.submitted);
	setShowAllFeedback(resetState.showAllFeedback);
	setCurrentQuestionIndex(resetState.currentQuestionIndex);
	resetElapsedSeconds();
	setExpandedAnswerOptionIndexesByQuestionId(resetState.expandedAnswerOptionIndexesByQuestionId);
	setAnswerOptionOrderByQuestionId(resetState.answerOptionOrderByQuestionId);
	resetSubmitModel();
}

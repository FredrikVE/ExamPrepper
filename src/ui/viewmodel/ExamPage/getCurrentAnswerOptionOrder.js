export default function getCurrentAnswerOptionOrder(currentQuestion, randomizeAnswerOptions, answerOptionOrderByQuestionId) {
	if (!currentQuestion) {
		return null;
	}

	if (!randomizeAnswerOptions) {
		return null;
	}

	return answerOptionOrderByQuestionId[currentQuestion.id] ?? null;
}

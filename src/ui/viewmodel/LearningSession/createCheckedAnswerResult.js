export default function createCheckedAnswerResult({ question, answer, gradeAnswerUseCase }) {
	return {
		isCorrect: gradeAnswerUseCase.execute(question, answer),
		pointsAwarded: gradeAnswerUseCase.getQuestionScore(question, answer),
		maxPoints: question.points,
		fillMatchType: gradeAnswerUseCase.getFillMatchType(question, answer)
	};
}

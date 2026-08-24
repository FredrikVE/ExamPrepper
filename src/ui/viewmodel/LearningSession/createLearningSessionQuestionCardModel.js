// src/ui/viewmodel/LearningSession/createLearningSessionQuestionCardModel.js
export default function createLearningSessionQuestionCardModel({ currentQuestion, currentResult, currentIndex, answer, answerOptionOrderBySessionQuestionId, setSingleAnswer, toggleMultiAnswer, selectObjectAnswer }) {
	if (currentQuestion === null) {
		return null;
	}

	let correct = false;
	let fillMatchType = null;

	if (currentResult !== null) {
		correct = currentResult.isCorrect;
		fillMatchType = currentResult.fillMatchType;
	}

	const answerOptionOrder = answerOptionOrderBySessionQuestionId[currentQuestion.sessionQuestionId] ?? null;
	const submitted = currentResult !== null;

	return {
		question: currentQuestion.question,
		questionNumber: currentIndex + 1,
		answer,
		answerOptionOrder,
		submitted,
		showAllFeedback: submitted,
		correct,
		fillMatchType,
		expandedAnswerOptionIndexes: [],
		onToggleAnswerOptionExpanded: () => {},
		onSingleAnswer: setSingleAnswer,
		onToggleMultiAnswer: toggleMultiAnswer,
		onDropdownFillAnswer: selectObjectAnswer,
		onRadioButtonGridAnswer: selectObjectAnswer,
		onMultipleBlankAnswer: selectObjectAnswer
	};
}

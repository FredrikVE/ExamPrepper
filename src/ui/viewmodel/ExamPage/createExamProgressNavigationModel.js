// src/ui/viewmodel/ExamPage/createExamProgressNavigationModel.js
export function clampExamQuestionIndex(questionIndex, visibleQuestionCount) {
	if (visibleQuestionCount === 0) {
		return 0;
	}

	return Math.min(
		Math.max(questionIndex, 0),
		visibleQuestionCount - 1
	);
}

export default function createExamProgressNavigationModel({
	currentQuestionIndex,
	visibleQuestionCount
}) {
	const canGoPrevious = currentQuestionIndex > 0;
	const canGoNext = currentQuestionIndex < visibleQuestionCount - 1;

	return {
		currentQuestionNumber: currentQuestionIndex + 1,
		canGoPrevious,
		canGoNext,
		isFooterNavigationEnabled: canGoPrevious || canGoNext,
		isLastQuestion: !canGoNext
	};
}

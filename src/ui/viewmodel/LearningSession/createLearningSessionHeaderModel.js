// src/ui/viewmodel/LearningSession/createLearningSessionHeaderModel.js
export default function createLearningSessionHeaderModel({ modulePosition, moduleTitle, submitResult, currentIndex, questionCount, isMatchCardsActive, t }) {
	if (modulePosition === null) {
		return null;
	}

	let counterLabel;

	if (submitResult !== null) {
		counterLabel = t.learningSessionResultHeaderLabel;
	}

	else if (isMatchCardsActive) {
		counterLabel = t.learningSessionMatchCardsCounter;
	}

	else {
		counterLabel = t.learningSessionQuestionCounter(
			Math.min(currentIndex + 1, questionCount),
			questionCount
		);
	}

	return {
		title: t.learningSessionModuleTitle(modulePosition, moduleTitle),
		counterLabel
	};
}

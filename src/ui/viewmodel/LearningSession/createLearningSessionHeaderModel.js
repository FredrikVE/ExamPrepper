// src/ui/viewmodel/LearningSession/createLearningSessionHeaderModel.js
export default function createLearningSessionHeaderModel({ modulePosition, moduleTitle, submitResult, currentIndex, questionCount, t }) {
	if (modulePosition === null) {
		return null;
	}

	let counterLabel;

	if (submitResult === null) {
		counterLabel = t.learningSessionQuestionCounter(
			Math.min(currentIndex + 1, questionCount),
			questionCount
		);
	}

	else {
		counterLabel = t.learningSessionResultHeaderLabel;
	}

	return {
		title: t.learningSessionModuleTitle(modulePosition, moduleTitle),
		counterLabel
	};
}

// src/ui/viewmodel/LearningSession/createLearningSessionHeaderModel.js
export default function createLearningSessionHeaderModel({ modulePosition, moduleTitle, activityKind, submitResult, currentIndex, questionCount, t }) {
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
		counterLabel,
		contextLabel: createActivityLabel(activityKind, t)
	};
}

function createActivityLabel(activityKind, t) {
	if (activityKind === "review") {
		return t.learningSessionReviewLabel;
	}

	if (activityKind === "repair") {
		return t.learningSessionRepairLabel;
	}

	if (activityKind === "coverage") {
		return t.learningSessionCoverageLabel;
	}

	if (activityKind === "authored" || activityKind === "legacy-round") {
		return t.learningSessionAuthoredLabel;
	}

	throw new Error(`Unknown learning session activity kind: ${String(activityKind)}`);
}

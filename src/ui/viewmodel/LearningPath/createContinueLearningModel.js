// src/ui/viewmodel/LearningPath/createContinueLearningModel.js
export default function createContinueLearningModel({ activeEntry, nextActivity, t }) {
	if (activeEntry === null || activeEntry.actionModel === null) {
		return {
			isVisible: false,
			title: "",
			description: "",
			buttonLabel: "",
			actionModel: null
		};
	}

	if (activeEntry.actionModel.intent === "resume") {
		return {
			isVisible: true,
			title: t.learningPathResumeTitle,
			description: t.learningPathResumeBody(activeEntry.position, activeEntry.title),
			buttonLabel: t.learningPathContinueNowLabel,
			actionModel: activeEntry.actionModel
		};
	}

	return {
		isVisible: true,
		title: t.learningPathContinueTitle,
		description: createNextActivityDescription({ nextActivity, activeEntry, t }),
		buttonLabel: t.learningPathContinueNowLabel,
		actionModel: activeEntry.actionModel
	};
}

function createNextActivityDescription({ nextActivity, activeEntry, t }) {
	if (nextActivity === null || nextActivity.kind !== "start-adaptive-session") {
		return t.learningPathContinueBody(activeEntry.position, activeEntry.title);
	}

	switch (nextActivity.activityKind) {
		case "review":
			return t.learningPathReviewBody(activeEntry.position, activeEntry.title);

		case "repair":
			return t.learningPathRepairBody(activeEntry.position, activeEntry.title);

		case "coverage":
			return t.learningPathCoverageBody(activeEntry.position, activeEntry.title);

		default:
			throw new Error(`Unknown LearningPath adaptive activity '${nextActivity.activityKind}'`);
	}
}

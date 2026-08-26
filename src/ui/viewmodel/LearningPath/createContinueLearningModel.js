// src/ui/viewmodel/LearningPath/createContinueLearningModel.js
export default function createContinueLearningModel({ activeEntry, t }) {
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
		description: t.learningPathContinueBody(activeEntry.position, activeEntry.title),
		buttonLabel: t.learningPathContinueNowLabel,
		actionModel: activeEntry.actionModel
	};
}

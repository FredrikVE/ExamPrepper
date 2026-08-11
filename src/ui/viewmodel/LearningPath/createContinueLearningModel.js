//src/ui/viewmodel/LearningPath/createContinueLearningModel.js
export default function createContinueLearningModel({ activeEntry, resumableSession, nextActivity, t }) {
	if (activeEntry === null) return { isVisible: false, title: "", description: "", buttonLabel: "", actionModel: null };

	const isResume = activeEntry.actionModel.intent === "resume";
	if (isResume) {
		return { isVisible: true, title: t.learningPathResumeTitle, description: t.learningPathResumeBody(activeEntry.position, activeEntry.title, resumableSession.currentQuestionPosition + 1), buttonLabel: t.learningPathResumeLabel, actionModel: activeEntry.actionModel };
	}

	return {
		isVisible: true,
		title: nextActivity === null ? t.learningPathContinueTitle : t.learningPathAdaptiveTitle,
		description: nextActivity === null ? t.learningPathContinueBody(activeEntry.position, activeEntry.title) : createAdaptiveDescription(nextActivity.focus, activeEntry, t),
		buttonLabel: activeEntry.actionModel.label,
		actionModel: activeEntry.actionModel
	};
}

function createAdaptiveDescription(focus, activeEntry, t) {
	switch (focus) {
		case "initial-exposure": return t.learningPathAdaptiveInitialExposureBody(activeEntry.position, activeEntry.title);
		case "practice": return t.learningPathAdaptivePracticeBody(activeEntry.position, activeEntry.title);
		case "progression": return t.learningPathAdaptiveProgressionBody(activeEntry.position, activeEntry.title);
		case "revisit": return t.learningPathAdaptiveRevisitBody(activeEntry.position, activeEntry.title);
		case "repair": return t.learningPathAdaptiveRepairBody(activeEntry.position, activeEntry.title);
	}
}

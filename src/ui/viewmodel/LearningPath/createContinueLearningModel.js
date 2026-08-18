//src/ui/viewmodel/LearningPath/createContinueLearningModel.js
export default function createContinueLearningModel({ activeEntry, resumableSession, nextActivity, t }) {
	if (activeEntry === null || activeEntry.actionModel === null) return { isVisible: false, title: "", description: "", buttonLabel: "", actionModel: null };
	if (activeEntry.actionModel.intent === "resume") {
		return { isVisible: true, title: t.learningPathResumeTitle, description: t.learningPathResumeBody(activeEntry.position, activeEntry.title, resumableSession.currentQuestionPosition + 1), buttonLabel: t.learningPathContinueNowLabel, actionModel: activeEntry.actionModel };
	}

	return {
		isVisible: true,
		title: t.learningPathContinueTitle,
		description: describeNextActivity(nextActivity, activeEntry, t),
		buttonLabel: t.learningPathContinueNowLabel,
		actionModel: activeEntry.actionModel
	};
}

function describeNextActivity(nextActivity, activeEntry, t) {
	if (nextActivity?.kind === "start-adaptive-session") {
		if (nextActivity.activityKind === "review") return t.learningPathReviewBody(activeEntry.position, activeEntry.title);
		if (nextActivity.activityKind === "repair") return t.learningPathRepairBody(activeEntry.position, activeEntry.title);
		return t.learningPathCoverageBody(activeEntry.position, activeEntry.title);
	}
	return t.learningPathContinueBody(activeEntry.position, activeEntry.title);
}

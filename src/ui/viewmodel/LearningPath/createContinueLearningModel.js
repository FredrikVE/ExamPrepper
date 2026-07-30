//src/ui/viewmodel/LearningPath/createContinueLearningModel.js
export default function createContinueLearningModel({ activeEntry, resumableSession, t }) {
	if (activeEntry === null) return { isVisible: false, title: "", description: "", buttonLabel: "", actionModel: null };

	const isResume = activeEntry.actionModel.intent === "resume";
	return {
		isVisible: true,
		title: isResume ? t.learningPathResumeTitle : t.learningPathContinueTitle,
		description: isResume
			? t.learningPathResumeBody(activeEntry.position, activeEntry.title, resumableSession.currentQuestionPosition + 1)
			: t.learningPathContinueBody(activeEntry.position, activeEntry.title),
		buttonLabel: t.learningPathResumeLabel,
		actionModel: activeEntry.actionModel
	};
}

//src/ui/viewmodel/LearningPath/createContinueLearningModel.js
export default function createContinueLearningModel({ activeModule, resumableSession, isStarting, t }) {
	if (activeModule === null) return { isVisible: false, title: "", description: "", buttonLabel: "", intent: null, moduleId: null, sessionId: null, isDisabled: true };

	if (resumableSession !== null && resumableSession.moduleId === activeModule.id) {
		return {
			isVisible: true,
			title: t.learningPathResumeTitle,
			description: t.learningPathResumeBody(activeModule.position, activeModule.title, resumableSession.currentQuestionPosition + 1),
			buttonLabel: t.learningPathResumeLabel,
			intent: "resume",
			moduleId: activeModule.id,
			sessionId: resumableSession.sessionId,
			isDisabled: false
		};
	}

	return {
		isVisible: true,
		title: t.learningPathContinueTitle,
		description: t.learningPathContinueBody(activeModule.position, activeModule.title),
		buttonLabel: t.learningPathStartRoundLabel(activeModule.progress.nextRound),
		intent: "start",
		moduleId: activeModule.id,
		sessionId: null,
		isDisabled: isStarting || !activeModule.availability.isUnlocked
	};
}

//src/ui/viewmodel/LearningPath/createLearningPathActionModel.js
export default function createLearningPathActionModel({ module, resumableSession, startingModuleId, t }) {
	const canResume = resumableSession !== null && resumableSession.moduleId === module.id;
	const isStarting = startingModuleId === module.id;

	if (canResume) {
		return {
			intent: "resume",
			moduleId: module.id,
			sessionId: resumableSession.sessionId,
			round: module.progress.nextRound,
			label: t.learningPathContinueRoundLabel(module.progress.nextRound),
			isDisabled: false,
			isPending: false
		};
	}

	return {
		intent: "start",
		moduleId: module.id,
		sessionId: null,
		round: module.progress.nextRound,
		label: module.progress.completedRounds >= 3 ? t.learningPathRetryModuleLabel : t.learningPathStartRoundLabel(module.progress.nextRound),
		isDisabled: !module.availability.isUnlocked || startingModuleId !== null,
		isPending: isStarting
	};
}

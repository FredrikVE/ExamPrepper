//src/ui/viewmodel/LearningPath/createLearningPathActionModel.js
export default function createLearningPathActionModel({ module, resumableSession, nextActivity, startingModuleId, t }) {
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

	if (nextActivity !== null && nextActivity.kind === "start-round" && nextActivity.moduleId === module.id) {
		return {
			intent: "start",
			moduleId: module.id,
			sessionId: null,
			round: nextActivity.round,
			label: t.learningPathStartRoundLabel(nextActivity.round),
			isDisabled: !module.availability.isUnlocked || startingModuleId !== null,
			isPending: isStarting
		};
	}

	const isCompleted = module.progress.completedRounds >= 3;

	return {
		intent: isCompleted ? "restart" : "start",
		moduleId: module.id,
		sessionId: null,
		round: isCompleted ? 1 : module.progress.nextRound,
		label: isCompleted ? t.learningPathRetryModuleLabel : t.learningPathStartRoundLabel(module.progress.nextRound),
		isDisabled: !module.availability.isUnlocked || startingModuleId !== null,
		isPending: isStarting
	};
}

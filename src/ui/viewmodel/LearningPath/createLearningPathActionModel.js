//src/ui/viewmodel/LearningPath/createLearningPathActionModel.js
export default function createLearningPathActionModel({ module, resumableSession, nextActivity, startingModuleId, t }) {
	const canResume = resumableSession !== null && resumableSession.moduleId === module.id;
	const isStarting = startingModuleId === module.id;

	if (canResume) {
		return {
			intent: "resume",
			moduleId: module.id,
			sessionId: resumableSession.sessionId,
			round: resumableSession.round,
			label: t.learningPathContinueRoundLabel(resumableSession.round),
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

	return null;
}

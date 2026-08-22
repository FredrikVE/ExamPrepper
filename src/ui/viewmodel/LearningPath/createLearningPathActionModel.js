// src/ui/viewmodel/LearningPath/createLearningPathActionModel.js
export default function createLearningPathActionModel({ module, resumableSession, nextActivity, startingModuleId, t }) {
	const canResume = resumableSession !== null && resumableSession.moduleId === module.id;
	const isStarting = startingModuleId === module.id;

	if (canResume) {
		return {
			intent: "resume",
			moduleId: module.id,
			sessionId: resumableSession.sessionId,
			target: null,
			label: module.currentRun === null ? t.learningPathResumeLabel : t.learningPathContinueReplayLabel(module.currentRun.completedSessions, module.currentRun.totalSessions),
			isDisabled: false,
			isPending: false
		};
	}

	if (module.isReplayAvailable) {
		return {
			intent: "start",
			moduleId: module.id,
			sessionId: null,
			target: { kind: "module-replay" },
			activityKind: "authored",
			label: module.currentRun === null ? t.learningPathReplayModuleLabel : t.learningPathContinueReplayLabel(module.currentRun.completedSessions, module.currentRun.totalSessions),
			isDisabled: !module.availability.isUnlocked || startingModuleId !== null,
			isPending: isStarting
		};
	}

	if (nextActivity !== null && nextActivity.moduleId === module.id && (nextActivity.kind === "start-authored-session" || nextActivity.kind === "start-adaptive-session")) {
		return {
			intent: "start",
			moduleId: module.id,
			sessionId: null,
			target: { kind: "module" },
			activityKind: nextActivity.kind === "start-adaptive-session" ? nextActivity.activityKind : "authored",
			label: nextActivity.kind === "start-adaptive-session" ? adaptiveLabel(nextActivity.activityKind, t) : t.learningPathContinueLabel,
			isDisabled: !module.availability.isUnlocked || startingModuleId !== null,
			isPending: isStarting
		};
	}

	return null;
}

function adaptiveLabel(activityKind, t) {
	if (activityKind === "review") return t.learningPathStartReviewLabel;
	if (activityKind === "repair") return t.learningPathStartRepairLabel;
	return t.learningPathStartCoverageLabel;
}

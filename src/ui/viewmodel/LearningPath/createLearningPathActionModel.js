// src/ui/viewmodel/LearningPath/createLearningPathActionModel.js
import createLearningPathActionKey from "./createLearningPathActionKey.js";

export default function createLearningPathActionModel({ module, resumableSession, nextActivity, startingActionKey, canStartLearningSessions, t }) {
	const canResume = resumableSession !== null && resumableSession.moduleId === module.id;

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

	if (nextActivity !== null && nextActivity.moduleId === module.id && (nextActivity.kind === "start-authored-session" || nextActivity.kind === "start-adaptive-session")) {
		const target = { kind: "module" };
		const actionKey = createLearningPathActionKey({ moduleId: module.id, target });
		return {
			intent: "start",
			actionKey,
			moduleId: module.id,
			sessionId: null,
			target,
			label: nextActivity.kind === "start-adaptive-session" ? adaptiveLabel(nextActivity.activityKind, t) : t.learningPathContinueLabel,
			isDisabled: !canStartLearningSessions || !module.availability.isUnlocked || startingActionKey !== null,
			isPending: startingActionKey === actionKey
		};
	}

	if (module.isReplayAvailable) {
		const target = { kind: "module-replay" };
		const actionKey = createLearningPathActionKey({ moduleId: module.id, target });
		return {
			intent: "start",
			actionKey,
			moduleId: module.id,
			sessionId: null,
			target,
			label: module.currentRun === null ? t.learningPathReplayModuleLabel : t.learningPathContinueReplayLabel(module.currentRun.completedSessions, module.currentRun.totalSessions),
			isDisabled: !canStartLearningSessions || !module.availability.isUnlocked || startingActionKey !== null,
			isPending: startingActionKey === actionKey
		};
	}

	return null;
}

function adaptiveLabel(activityKind, t) {
	if (activityKind === "review") return t.learningPathStartReviewLabel;
	if (activityKind === "repair") return t.learningPathStartRepairLabel;
	return t.learningPathStartCoverageLabel;
}

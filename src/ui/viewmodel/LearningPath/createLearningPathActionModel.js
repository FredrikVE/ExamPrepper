// src/ui/viewmodel/LearningPath/createLearningPathActionModel.js
import createLearningPathActionKey from "./createLearningPathActionKey.js";

export default function createLearningPathActionModel({ module, resumableSession, nextActivity, startingActionKey, canStartLearningSessions, t }) {
	const canResume = resumableSession !== null && resumableSession.moduleId === module.id;

	if (canResume) {
		return createResumeActionModel({ module, resumableSession, t });
	}

	if (isBackendSelectedModuleStart({ moduleId: module.id, nextActivity })) {
		const target = {
			kind: "module"
		};

		const actionKey = createLearningPathActionKey({
			moduleId: module.id,
			target
		});

		return {
			intent: "start",
			actionKey,
			moduleId: module.id,
			sessionId: null,
			target,
			label: t.learningPathContinueLabel,
			isDisabled: !canStartLearningSessions || !module.availability.isUnlocked || startingActionKey !== null,
			isPending: startingActionKey === actionKey
		};
	}

	if (module.isReplayAvailable) {
		const target = {
			kind: "module-replay"
		};

		const actionKey = createLearningPathActionKey({
			moduleId: module.id,
			target
		});

		return {
			intent: "start",
			actionKey,
			moduleId: module.id,
			sessionId: null,
			target,
			label: createReplayActionLabel({ module, t }),
			isDisabled: !canStartLearningSessions || !module.availability.isUnlocked || startingActionKey !== null,
			isPending: startingActionKey === actionKey
		};
	}

	return null;
}

function createResumeActionModel({ module, resumableSession, t }) {
	let label = t.learningPathResumeLabel;

	if (module.currentRun !== null) {
		label = t.learningPathContinueReplayLabel(module.currentRun.completedSessions, module.currentRun.totalSessions);
	}

	return {
		intent: "resume",
		moduleId: module.id,
		sessionId: resumableSession.sessionId,
		target: null,
		label,
		isDisabled: false,
		isPending: false
	};
}

function createReplayActionLabel({ module, t }) {
	if (module.currentRun === null) {
		return t.learningPathReplayModuleLabel;
	}

	return t.learningPathContinueReplayLabel(module.currentRun.completedSessions, module.currentRun.totalSessions);
}

function isBackendSelectedModuleStart({ moduleId, nextActivity }) {
	if (nextActivity === null || nextActivity.moduleId !== moduleId) {
		return false;
	}

	return nextActivity.kind === "start-authored-session";
}

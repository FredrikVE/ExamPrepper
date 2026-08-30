// src/ui/viewmodel/LearningPath/createLearningPathActionModel.js
import { LEARNING_PATH_ACTIVITY_KIND } from "../../../constants/LearningPathActivityKind.js";
import { LEARNING_PATH_ACTION_INTENT } from "./LearningPathActionIntent.js";
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
			intent: LEARNING_PATH_ACTION_INTENT.START,
			actionKey,
			moduleId: module.id,
			sessionId: null,
			target,
			label: t.learningPathContinueLabel,
			isDisabled: !canStartLearningSessions || !module.availability.isUnlocked || resumableSession !== null || startingActionKey !== null,
			isPending: startingActionKey === actionKey
		};
	}

	if (isBackendSelectedChapterTest({ moduleId: module.id, nextActivity })) {
		return {
			intent: LEARNING_PATH_ACTION_INTENT.OPEN_CHAPTER_TEST,
			moduleId: module.id,
			examId: nextActivity.examId,
			label: t.learningPathChapterTestStartLabel,
			isDisabled: false,
			isPending: false
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
			intent: LEARNING_PATH_ACTION_INTENT.START,
			actionKey,
			moduleId: module.id,
			sessionId: null,
			target,
			label: createReplayActionLabel({ module, t }),
			isDisabled: !canStartLearningSessions || !module.availability.isUnlocked || resumableSession !== null || startingActionKey !== null,
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
		intent: LEARNING_PATH_ACTION_INTENT.RESUME,
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

	return nextActivity.kind === LEARNING_PATH_ACTIVITY_KIND.START_AUTHORED_SESSION;
}

function isBackendSelectedChapterTest({ moduleId, nextActivity }) {
	if (nextActivity === null || nextActivity.moduleId !== moduleId) {
		return false;
	}

	return nextActivity.kind === LEARNING_PATH_ACTIVITY_KIND.CHAPTER_TEST;
}

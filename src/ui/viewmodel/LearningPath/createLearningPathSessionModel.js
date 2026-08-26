// src/ui/viewmodel/LearningPath/createLearningPathSessionModel.js
import { LEARNING_PATH_ROADMAP_STATUS } from "../../../constants/LearningPathRoadmapStatus.js";
import { LEARNING_PATH_ACTION_INTENT } from "./LearningPathActionIntent.js";
import createLearningPathActionKey from "./createLearningPathActionKey.js";

export default function createLearningPathSessionModel({ session, moduleId, startingActionKey, canStartLearningSessions, t }) {
	const appearance = createSessionAppearance(session.status);
	const iconKey = createSessionIconKey(session);
	const scoreModel = createSessionScoreModel({ session, t });
	const actionModel = createSessionActionModel({
		session,
		moduleId,
		startingActionKey,
		canStartLearningSessions,
		t
	});

	return {
		planKey: session.planKey,
		position: session.position,
		questionCount: session.questionCount,
		status: session.status,
		appearance,
		iconKey,
		scoreModel,
		isSelectable: session.isStartable,
		actionModel,
		label: t.learningPathSessionLabel(session.position),
		metaLabel: t.learningPathSessionQuestionCount(session.questionCount),
		statusLabel: createSessionStatusLabel({ status: session.status, t })
	};
}

function createSessionAppearance(status) {
	switch (status) {
		case LEARNING_PATH_ROADMAP_STATUS.COMPLETED:
			return LEARNING_PATH_ROADMAP_STATUS.COMPLETED;

		case LEARNING_PATH_ROADMAP_STATUS.CURRENT:
			return LEARNING_PATH_ROADMAP_STATUS.CURRENT;

		case LEARNING_PATH_ROADMAP_STATUS.AVAILABLE:
			return LEARNING_PATH_ROADMAP_STATUS.AVAILABLE;

		case LEARNING_PATH_ROADMAP_STATUS.LOCKED:
			return LEARNING_PATH_ROADMAP_STATUS.LOCKED;

		default:
			throw new Error(`Unknown LearningPath session status '${status}'`);
	}
}

function createSessionIconKey(session) {
	if (session.status === LEARNING_PATH_ROADMAP_STATUS.COMPLETED) {
		if (session.performancePercent === 100) {
			return "check";
		}

		return "score";
	}

	if (session.status === LEARNING_PATH_ROADMAP_STATUS.LOCKED) {
		return "lock";
	}

	return "play";
}

function createSessionScoreModel({ session, t }) {
	if (session.status !== LEARNING_PATH_ROADMAP_STATUS.COMPLETED) {
		return null;
	}

	let percentage = 0;
	let displayValue = "–";
	let accessibleLabel = t.learningPathSessionNotAssessedScoreLabel(session.position);

	if (session.performancePercent !== null) {
		percentage = session.performancePercent;
		const displayPercentage = Math.round(session.performancePercent);
		displayValue = `${displayPercentage}%`;
		accessibleLabel = t.learningPathSessionScoreLabel(session.position, displayPercentage);
	}

	return {
		percentage,
		displayValue,
		appearance: session.performanceBand,
		accessibleLabel
	};
}

function createSessionActionModel({ session, moduleId, startingActionKey, canStartLearningSessions, t }) {
	if (!session.isStartable) {
		return null;
	}

	const target = {
		kind: "session",
		planKey: session.planKey
	};

	const actionKey = createLearningPathActionKey({
		moduleId,
		target
	});

	return {
		intent: LEARNING_PATH_ACTION_INTENT.START,
		actionKey,
		moduleId,
		sessionId: null,
		target,
		label: t.learningPathSessionOpenLabel(session.position),
		isDisabled: !canStartLearningSessions || startingActionKey !== null,
		isPending: startingActionKey === actionKey
	};
}

function createSessionStatusLabel({ status, t }) {
	switch (status) {
		case LEARNING_PATH_ROADMAP_STATUS.COMPLETED:
			return t.learningPathSessionCompletedLabel;

		case LEARNING_PATH_ROADMAP_STATUS.CURRENT:
			return t.learningPathSessionCurrentLabel;

		case LEARNING_PATH_ROADMAP_STATUS.AVAILABLE:
			return t.learningPathSessionAvailableLabel;

		case LEARNING_PATH_ROADMAP_STATUS.LOCKED:
			return t.learningPathStatusLocked;

		default:
			throw new Error(`Unknown LearningPath session status '${status}'`);
	}
}

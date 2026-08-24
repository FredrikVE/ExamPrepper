// src/ui/viewmodel/LearningPath/createLearningPathSessionModel.js
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
		case "completed":
			return "completed";

		case "current":
			return "current";

		case "available":
			return "available";

		case "locked":
			return "locked";

		default:
			throw new Error(`Unknown LearningPath session status '${status}'`);
	}
}

function createSessionIconKey(session) {
	if (session.status === "completed") {
		if (session.performancePercent === 100) {
			return "check";
		}

		return "score";
	}

	if (session.status === "locked") {
		return "lock";
	}

	return "play";
}

function createSessionScoreModel({ session, t }) {
	if (session.status !== "completed") {
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
		intent: "start",
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
		case "completed":
			return t.learningPathSessionCompletedLabel;

		case "current":
			return t.learningPathSessionCurrentLabel;

		case "available":
			return t.learningPathSessionAvailableLabel;

		case "locked":
			return t.learningPathStatusLocked;

		default:
			throw new Error(`Unknown LearningPath session status '${status}'`);
	}
}

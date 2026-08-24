// src/ui/viewmodel/LearningPath/createLearningPathSessionModel.js
import createLearningPathActionKey from "./createLearningPathActionKey.js";

export default function createLearningPathSessionModel({ session, moduleId, startingActionKey, canStartLearningSessions, t }) {
	const appearance = session.status === "completed" ? "completed" : session.status === "current" ? "current" : session.status === "available" ? "available" : "locked";
	const displayPercentage = session.performancePercent === null ? null : Math.round(session.performancePercent);
	const isPerfect = session.performancePercent === 100;
	const scoreModel = session.status === "completed" ? {
		percentage: session.performancePercent ?? 0,
		displayValue: displayPercentage === null ? "–" : `${displayPercentage}%`,
		appearance: session.performanceBand,
		accessibleLabel: displayPercentage === null ? t.learningPathSessionNotAssessedScoreLabel(session.position) : t.learningPathSessionScoreLabel(session.position, displayPercentage)
	} : null;
	const isSelectable = session.isStartable;
	const target = { kind: "session", planKey: session.planKey };
	const actionKey = createLearningPathActionKey({ moduleId, target });

	return {
		planKey: session.planKey,
		position: session.position,
		questionCount: session.questionCount,
		status: session.status,
		appearance,
		iconKey: session.status === "completed" ? (isPerfect ? "check" : "score") : session.status === "locked" ? "lock" : "play",
		scoreModel,
		isSelectable,
		actionModel: isSelectable ? {
			intent: "start",
			actionKey,
			moduleId,
			sessionId: null,
			target,
			label: t.learningPathSessionOpenLabel(session.position),
			isDisabled: !canStartLearningSessions || startingActionKey !== null,
			isPending: startingActionKey === actionKey
		} : null,
		label: t.learningPathSessionLabel(session.position),
		metaLabel: t.learningPathSessionQuestionCount(session.questionCount),
		statusLabel: statusLabel(session.status, t)
	};
}

function statusLabel(status, t) {
	if (status === "completed") return t.learningPathSessionCompletedLabel;
	if (status === "current") return t.learningPathSessionCurrentLabel;
	if (status === "available") return t.learningPathSessionAvailableLabel;
	return t.learningPathStatusLocked;
}

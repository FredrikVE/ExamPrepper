// src/ui/viewmodel/LearningPath/createLearningPathSessionModel.js
export default function createLearningPathSessionModel({ session, moduleId, startingModuleId, t }) {
	const appearance = session.status === "completed" ? "completed" : session.status === "current" ? "current" : session.status === "available" ? "available" : "locked";
	const displayPercentage = session.performancePercent === null ? null : Math.round(session.performancePercent);
	const isPerfect = session.performancePercent === 100;
	const scoreModel = session.status === "completed" ? {
		percentage: session.performancePercent ?? 0,
		displayValue: displayPercentage === null ? "–" : `${displayPercentage}%`,
		appearance: session.performanceBand,
		accessibleLabel: displayPercentage === null
			? t.learningPathSessionNotAssessedScoreLabel(session.position)
			: t.learningPathSessionScoreLabel(session.position, displayPercentage)
	} : null;
	const isSelectable = session.isStartable;

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
			moduleId,
			sessionId: null,
			target: { kind: "session", planKey: session.planKey },
			activityKind: "authored",
			label: t.learningPathSessionOpenLabel(session.position),
			isDisabled: startingModuleId !== null,
			isPending: startingModuleId === moduleId
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

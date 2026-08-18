export default function createLearningPathSessionModel({ session, t }) {
	const appearance = session.status === "completed" ? "completed" : session.status === "current" ? "current" : session.status === "available" ? "available" : "locked";
	return {
		planKey: session.planKey,
		position: session.position,
		questionCount: session.questionCount,
		status: session.status,
		appearance,
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

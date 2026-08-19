// src/ui/viewmodel/LearningSession/createSessionResultModel.js
const RESULT_APPEARANCES = Object.freeze({
	PRACTICE: "practice",
	PROGRESS: "progress",
	UNDERSTOOD: "understood",
	NOT_ASSESSED: "not-assessed"
});

function normalizeMetric(value) {
	if (value === null) return null;
	if (!Number.isFinite(value)) return null;
	return Math.round(value * 100) / 100;
}

function resolveCopy({ percentage, performanceBand, moduleTitle, t }) {
	if (percentage === 100) return { title: t.learningSessionResultPerfectTitle, body: t.learningSessionResultPerfectBody(moduleTitle) };
	if (performanceBand === RESULT_APPEARANCES.UNDERSTOOD) return { title: t.learningSessionResultUnderstoodTitle, body: t.learningSessionResultUnderstoodBody(moduleTitle) };
	if (performanceBand === RESULT_APPEARANCES.PROGRESS) return { title: t.learningSessionResultProgressTitle, body: t.learningSessionResultProgressBody(moduleTitle) };
	if (performanceBand === RESULT_APPEARANCES.PRACTICE) return { title: t.learningSessionResultPracticeTitle, body: t.learningSessionResultPracticeBody(moduleTitle) };
	return { title: t.learningSessionResultNotAssessedTitle, body: t.learningSessionResultNotAssessedBody(moduleTitle) };
}

export default function createSessionResultModel({ score, moduleTitle, t, onBack }) {
	const percentage = normalizeMetric(score.percentage);
	const appearance = score.performanceBand;
	const copy = resolveCopy({ percentage, performanceBand: appearance, moduleTitle, t });
	return {
		appearance,
		eyebrow: t.learningSessionResultEyebrow,
		title: copy.title,
		body: copy.body,
		statsLabel: t.learningSessionResultStatsLabel,
		pointsValue: `${score.earnedPoints} / ${score.availablePoints}`,
		pointsLabel: t.learningSessionResultPointsLabel,
		scoreValue: percentage === null ? "—" : `${percentage} %`,
		scoreLabel: t.learningSessionResultScoreLabel,
		nextStepLabel: t.learningSessionResultNextStepLabel,
		nextStepBody: t.learningSessionResultContinuePathBody,
		primaryLabel: t.learningSessionResultContinuePathLabel,
		isPrimaryDisabled: false,
		actionErrorMessage: null,
		onPrimary: onBack
	};
}

export { RESULT_APPEARANCES };

//src/ui/viewmodel/LearningSession/createSessionResultModel.js
const RESULT_APPEARANCES = Object.freeze({ STRONG: "strong", MEDIUM: "medium", WEAK: "weak" });

function normalizeMetric(value) {
	if (!Number.isFinite(value)) return 0;
	return Math.round(value * 100) / 100;
}

function resolveAppearance(percentage) {
	if (percentage >= 80) return RESULT_APPEARANCES.STRONG;
	if (percentage >= 55) return RESULT_APPEARANCES.MEDIUM;
	return RESULT_APPEARANCES.WEAK;
}

function resolveCopy({ percentage, moduleTitle, t }) {
	if (percentage === 100) return { title: t.learningSessionResultPerfectTitle, body: t.learningSessionResultPerfectBody(moduleTitle) };
	if (percentage >= 80) return { title: t.learningSessionResultStrongTitle, body: t.learningSessionResultStrongBody(moduleTitle) };
	if (percentage >= 55) return { title: t.learningSessionResultMediumTitle, body: t.learningSessionResultMediumBody(moduleTitle) };
	return { title: t.learningSessionResultWeakTitle, body: t.learningSessionResultWeakBody(moduleTitle) };
}

export default function createSessionResultModel({ score, moduleTitle, t, onBack }) {
	const percentage = normalizeMetric(score.percentage);
	const copy = resolveCopy({ percentage, moduleTitle, t });
	return {
		appearance: resolveAppearance(percentage),
		eyebrow: t.learningSessionResultEyebrow,
		title: copy.title,
		body: copy.body,
		statsLabel: t.learningSessionResultStatsLabel,
		pointsValue: `${score.earnedPoints} / ${score.availablePoints}`,
		pointsLabel: t.learningSessionResultPointsLabel,
		scoreValue: `${percentage} %`,
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

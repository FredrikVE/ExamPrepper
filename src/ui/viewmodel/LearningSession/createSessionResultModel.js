// src/ui/viewmodel/LearningSession/createSessionResultModel.js
const RESULT_APPEARANCES = {
	PRACTICE: "practice",
	PROGRESS: "progress",
	UNDERSTOOD: "understood",
	NOT_ASSESSED: "not-assessed"
};

function normalizePercentage(value) {
	if (value === null) {
		return null;
	}

	if (!Number.isFinite(value)) {
		throw new Error(`Invalid learning session percentage: ${String(value)}`);
	}

	return Math.round(value * 100) / 100;
}

function createResultCopy({ percentage, performanceBand, moduleTitle, t }) {
	if (percentage === 100) {
		return {
			title: t.learningSessionResultPerfectTitle,
			body: t.learningSessionResultPerfectBody(moduleTitle)
		};
	}

	if (performanceBand === RESULT_APPEARANCES.UNDERSTOOD) {
		return {
			title: t.learningSessionResultUnderstoodTitle,
			body: t.learningSessionResultUnderstoodBody(moduleTitle)
		};
	}

	if (performanceBand === RESULT_APPEARANCES.PROGRESS) {
		return {
			title: t.learningSessionResultProgressTitle,
			body: t.learningSessionResultProgressBody(moduleTitle)
		};
	}

	if (performanceBand === RESULT_APPEARANCES.PRACTICE) {
		return {
			title: t.learningSessionResultPracticeTitle,
			body: t.learningSessionResultPracticeBody(moduleTitle)
		};
	}

	if (performanceBand === RESULT_APPEARANCES.NOT_ASSESSED) {
		return {
			title: t.learningSessionResultNotAssessedTitle,
			body: t.learningSessionResultNotAssessedBody(moduleTitle)
		};
	}

	throw new Error(`Unknown learning session performance band: ${String(performanceBand)}`);
}

export default function createSessionResultModel({ score, moduleTitle, t, onBack }) {
	const percentage = normalizePercentage(score.percentage);
	const appearance = score.performanceBand;

	const copy = createResultCopy({
		percentage,
		performanceBand: appearance,
		moduleTitle,
		t
	});

	let scoreValue = "—";

	if (percentage !== null) {
		scoreValue = `${percentage} %`;
	}

	return {
		appearance,
		eyebrow: t.learningSessionResultEyebrow,
		title: copy.title,
		body: copy.body,
		statsLabel: t.learningSessionResultStatsLabel,
		pointsValue: `${score.earnedPoints} / ${score.availablePoints}`,
		pointsLabel: t.learningSessionResultPointsLabel,
		scoreValue,
		scoreLabel: t.learningSessionResultScoreLabel,
		nextStepLabel: t.learningSessionResultNextStepLabel,
		nextStepBody: t.learningSessionResultContinuePathBody,
		primaryLabel: t.learningSessionResultContinuePathLabel,
		isPrimaryDisabled: false,
		actionErrorMessage: null,
		onPrimary: onBack
	};
}

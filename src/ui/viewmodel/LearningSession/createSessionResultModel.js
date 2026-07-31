//src/ui/viewmodel/LearningSession/createSessionResultModel.js
const RESULT_APPEARANCES = Object.freeze({
	STRONG: "strong",
	MEDIUM: "medium",
	WEAK: "weak"
});

function normalizeMetric(value) {
	if (!Number.isFinite(value)) return 0;
	return Math.round(value * 100) / 100;
}

function resolveAppearance(percentage) {
	if (percentage >= 80) return RESULT_APPEARANCES.STRONG;
	if (percentage >= 55) return RESULT_APPEARANCES.MEDIUM;
	return RESULT_APPEARANCES.WEAK;
}

function resolveCopy({ percentage, round, moduleTitle, t }) {
	if (percentage === 100) {
		return {
			title: t.learningSessionResultPerfectTitle,
			body: t.learningSessionResultPerfectBody(round, moduleTitle)
		};
	}

	if (percentage >= 80) {
		return {
			title: t.learningSessionResultStrongTitle,
			body: t.learningSessionResultStrongBody(round, moduleTitle)
		};
	}

	if (percentage >= 55) {
		return {
			title: t.learningSessionResultMediumTitle,
			body: t.learningSessionResultMediumBody(round, moduleTitle)
		};
	}

	return {
		title: t.learningSessionResultWeakTitle,
		body: t.learningSessionResultWeakBody(round, moduleTitle)
	};
}

function resolveNextRound(round, moduleProgress) {
	const nextRound = moduleProgress.nextRound;
	return Number.isInteger(nextRound) && nextRound === round + 1 && nextRound <= 3 ? nextRound : null;
}

export default function createSessionResultModel({ score, moduleProgress, round, moduleTitle, t, onBack, onContinueToNextRound, isStartingNextRound = false, nextRoundErrorMessage = null }) {
	const percentage = normalizeMetric(score.percentage);
	const masteryPercent = normalizeMetric(moduleProgress.masteryPercent);
	const copy = resolveCopy({ percentage, round, moduleTitle, t });
	const nextRound = resolveNextRound(round, moduleProgress);
	const canContinueToNextRound = nextRound !== null;

	return {
		appearance: resolveAppearance(percentage),
		eyebrow: t.learningSessionResultEyebrow(round),
		title: copy.title,
		body: copy.body,
		statsLabel: t.learningSessionResultStatsLabel,
		pointsValue: `${score.earnedPoints} / ${score.availablePoints}`,
		pointsLabel: t.learningSessionResultPointsLabel,
		roundScoreValue: `${percentage} %`,
		roundScoreLabel: t.learningSessionResultRoundScoreLabel,
		moduleMasteryValue: `${masteryPercent} %`,
		moduleMasteryPercent: Math.min(100, Math.max(0, masteryPercent)),
		moduleMasteryLabel: t.learningSessionResultModuleMasteryLabel,
		nextStepLabel: t.learningSessionResultNextStepLabel,
		nextStepBody: canContinueToNextRound ? t.learningSessionResultNextRoundBody(nextRound) : t.learningSessionResultAllRoundsCompleteBody,
		primaryLabel: canContinueToNextRound ? isStartingNextRound ? t.learningSessionResultStartingRoundLabel(nextRound) : t.learningSessionResultContinueRoundLabel(nextRound) : t.learningSessionResultContinuePathLabel,
		secondaryLabel: canContinueToNextRound ? t.learningSessionResultEndSessionLabel : null,
		isPrimaryDisabled: isStartingNextRound,
		isSecondaryDisabled: isStartingNextRound,
		actionErrorMessage: nextRoundErrorMessage,
		onPrimary: canContinueToNextRound ? onContinueToNextRound : onBack,
		onSecondary: canContinueToNextRound ? onBack : null
	};
}

export { RESULT_APPEARANCES };

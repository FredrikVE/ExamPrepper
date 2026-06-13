// src/ui/viewmodel/StatisticsPage/normalizeStatistics.js
import { EMPTY_LABEL, normalizeNumber, normalizeNullableNumber, normalizeNullablePercentage, formatPercentageLabel, createPointsLabel } from "./statisticsFormatters.js";

// Burde ikke denne modulariseres mer??
// Denne har codesmell..

export function normalizeStatistics(statistics, formatDate, copy) {
	const attemptCount = normalizeNumber(statistics?.attemptCount);
	const totalCorrectAnswers = normalizeNumber(statistics?.totalCorrectAnswers);
	const totalQuestions = normalizeNumber(statistics?.totalQuestions);
	const uniqueExamCount = normalizeNumber(statistics?.uniqueExamCount);
	const averageScorePercentage = normalizeNullablePercentage(statistics?.averageScorePercentage);
	const bestScorePercentage = normalizeNullablePercentage(statistics?.bestScorePercentage);

	return {
		attemptCount,
		averageScorePercentage,
		bestScorePercentage,
		totalCorrectAnswers,
		totalQuestions,
		uniqueExamCount,
		scoreTrend: normalizeTrendPoints(statistics?.scoreTrend, formatDate, copy),
		recentAttempts: normalizeRecentAttempts(statistics?.recentAttempts, formatDate, copy)
	};
}

function normalizeTrendPoints(scoreTrend, formatDate, copy) {
	if (!Array.isArray(scoreTrend)) {
		return [];
	}

	const trendPoints = [];

	for (const attempt of scoreTrend) {
		if (!attempt) {
			continue;
		}

		trendPoints.push(normalizeTrendPoint(attempt, trendPoints.length, formatDate, copy));
	}

	return trendPoints;
}

function normalizeTrendPoint(attempt, index, formatDate, copy) {
	const pointNumber = index + 1;
	const percentage = normalizeNullablePercentage(attempt.percentage);
	const scorePoints = normalizeNullableNumber(attempt.scorePoints);

	return {
		id: attempt.attemptId ?? `trend-${pointNumber}`,
		name: copy.createTrendPointLabel(pointNumber),
		dateLabel: formatDate(attempt.submittedAt) ?? EMPTY_LABEL,
		percentage,
		scorePoints,
		percentageLabel: formatPercentageLabel(percentage),
		scoreLabel: createPointsLabel(attempt.scorePoints, attempt.totalPoints, copy)
	};
}

function normalizeRecentAttempts(recentAttempts, formatDate, copy) {
	if (!Array.isArray(recentAttempts)) {
		return [];
	}

	const normalizedAttempts = [];

	for (const attempt of recentAttempts) {
		if (!attempt) {
			continue;
		}

		normalizedAttempts.push(normalizeRecentAttempt(attempt, normalizedAttempts.length, formatDate, copy));
	}

	return normalizedAttempts;
}

function normalizeRecentAttempt(attempt, index, formatDate, copy) {
	const attemptNumber = index + 1;
	const percentage = normalizeNullablePercentage(attempt.percentage);
	const examId = attempt.examId ?? "";

	return {
		id: attempt.attemptId ?? `recent-${attemptNumber}`,
		examId,
		examTitle: examId ? copy.createAttemptFallbackTitle(examId) : copy.createAttemptFallbackTitle(attemptNumber),
		submittedAtLabel: formatDate(attempt.submittedAt) ?? EMPTY_LABEL,
		percentage,
		percentageLabel: formatPercentageLabel(percentage),
		pointsLabel: createPointsLabel(attempt.scorePoints, attempt.totalPoints, copy),
		scoreLabel: copy.attemptScoreLabel
	};
}

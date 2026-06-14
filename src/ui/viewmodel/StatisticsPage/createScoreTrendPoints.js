// src/ui/viewmodel/StatisticsPage/createScoreTrendPoints.js
import { EMPTY_LABEL, normalizeNullableNumber, normalizeNullablePercentage, formatPercentageLabel, createPointsLabel } from "./statisticsFormatters.js";

export function createScoreTrendPoints(scoreTrend, formatDate, copy) {
	if (!Array.isArray(scoreTrend)) {
		return [];
	}

	const trendPoints = [];

	for (const attempt of scoreTrend) {
		if (!attempt) {
			continue;
		}

		trendPoints.push(createScoreTrendPoint(attempt, trendPoints.length, formatDate, copy));
	}

	return trendPoints;
}

function createScoreTrendPoint(attempt, index, formatDate, copy) {
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

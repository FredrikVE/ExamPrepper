// src/ui/viewmodel/StatisticsPage/createScoreTrendPoints.js
import { normalizeNullableNumber, normalizeNullablePercentagePoints } from "./statisticsNumbers.js";
import { createPercentageLabel, createPointsLabel } from "./statisticsValueLabels.js";

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
	const percentage = normalizeNullablePercentagePoints(attempt.percentage);
	const scorePoints = normalizeNullableNumber(attempt.scorePoints);

	return {
		id: attempt.attemptId ?? `trend-${pointNumber}`,
		name: copy.createTrendPointLabel(pointNumber),
		dateLabel: formatDate(attempt.submittedAt) ?? copy.emptyValueLabel,
		percentage,
		scorePoints,
		percentageLabel: createPercentageLabel(percentage, copy),
		scoreLabel: createPointsLabel(attempt.scorePoints, attempt.totalPoints, copy)
	};
}

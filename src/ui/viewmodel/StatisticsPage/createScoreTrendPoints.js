// src/ui/viewmodel/StatisticsPage/createScoreTrendPoints.js
import { normalizeNullableNumber, normalizeNullablePercentagePoints } from "./statisticsNumbers.js";
import { createPercentageLabel, createPointsLabel } from "./statisticsValueLabels.js";

export function createScoreTrendPoints(scoreTrend, formatDate, text) {
	if (!Array.isArray(scoreTrend)) {
		return [];
	}

	const trendPoints = [];

	for (const attempt of scoreTrend) {
		if (!attempt) {
			continue;
		}

		trendPoints.push(createScoreTrendPoint(attempt, trendPoints.length, formatDate, text));
	}

	return trendPoints;
}

function createScoreTrendPoint(attempt, index, formatDate, text) {
	const pointNumber = index + 1;
	const percentage = normalizeNullablePercentagePoints(attempt.percentage);
	const scorePoints = normalizeNullableNumber(attempt.scorePoints);

	return {
		id: attempt.attemptId ?? `trend-${pointNumber}`,
		name: text.createTrendPointLabel(pointNumber),
		dateLabel: formatDate(attempt.submittedAt) ?? text.emptyValueLabel,
		percentage,
		scorePoints,
		percentageLabel: createPercentageLabel(percentage, text),
		scoreLabel: createPointsLabel(attempt.scorePoints, attempt.totalPoints, text)
	};
}

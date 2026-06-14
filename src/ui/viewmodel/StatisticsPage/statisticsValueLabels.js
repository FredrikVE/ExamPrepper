// src/ui/viewmodel/StatisticsPage/statisticsValueLabels.js
import { formatNumber, normalizeNumber } from "./statisticsNumbers.js";

export function createPercentageLabel(percentagePoints, copy) {
	if (percentagePoints === null) {
		return copy.emptyValueLabel;
	}

	return `${formatNumber(percentagePoints)} %`;
}

export function createPointsLabel(scorePoints, totalPoints, copy) {
	const normalizedScorePoints = normalizeNumber(scorePoints);
	const normalizedTotalPoints = normalizeNumber(totalPoints);

	return copy.createAttemptPointsLabel(
		formatNumber(normalizedScorePoints),
		formatNumber(normalizedTotalPoints)
	);
}

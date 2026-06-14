// src/ui/viewmodel/StatisticsPage/statisticsValueLabels.js
import { formatNumber, normalizeNumber } from "./statisticsNumbers.js";

export function createPercentageLabel(percentagePoints, text) {
	if (percentagePoints === null) {
		return text.emptyValueLabel;
	}

	return `${formatNumber(percentagePoints)} %`;
}

export function createPointsLabel(scorePoints, totalPoints, text) {
	const normalizedScorePoints = normalizeNumber(scorePoints);
	const normalizedTotalPoints = normalizeNumber(totalPoints);

	return text.createAttemptPointsLabel(
		formatNumber(normalizedScorePoints),
		formatNumber(normalizedTotalPoints)
	);
}

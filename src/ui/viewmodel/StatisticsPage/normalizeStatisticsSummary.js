// src/ui/viewmodel/StatisticsPage/normalizeStatisticsSummary.js
import { normalizeNumber, normalizeNullablePercentagePoints } from "./statisticsNumbers.js";

export function normalizeStatisticsSummary(statistics) {
	return {
		attemptCount: normalizeNumber(statistics?.attemptCount),
		averageScorePercentage: normalizeNullablePercentagePoints(statistics?.averageScorePercentage),
		bestScorePercentage: normalizeNullablePercentagePoints(statistics?.bestScorePercentage),
		totalCorrectAnswers: normalizeNumber(statistics?.totalCorrectAnswers),
		totalQuestions: normalizeNumber(statistics?.totalQuestions),
		uniqueExamCount: normalizeNumber(statistics?.uniqueExamCount)
	};
}

// src/ui/viewmodel/StatisticsPage/normalizeStatisticsSummary.js
import { normalizeNumber, normalizeNullablePercentage } from "./statisticsFormatters.js";

export function normalizeStatisticsSummary(statistics) {
	return {
		attemptCount: normalizeNumber(statistics?.attemptCount),
		averageScorePercentage: normalizeNullablePercentage(statistics?.averageScorePercentage),
		bestScorePercentage: normalizeNullablePercentage(statistics?.bestScorePercentage),
		totalCorrectAnswers: normalizeNumber(statistics?.totalCorrectAnswers),
		totalQuestions: normalizeNumber(statistics?.totalQuestions),
		uniqueExamCount: normalizeNumber(statistics?.uniqueExamCount)
	};
}

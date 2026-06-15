// src/ui/viewmodel/StatisticsPage/createStatisticsDashboardModel.js
import { buildScoreTrendChart } from "./buildScoreTrendChart.js";
import { buildHero } from "./buildStatisticsHero.js";
import { buildKpiCards } from "./buildStatisticsKpiCards.js";
import { createRecentAttemptCards } from "./createRecentAttemptCards.js";
import { createScoreTrendPoints } from "./createScoreTrendPoints.js";
import { normalizeStatisticsSummary } from "./normalizeStatisticsSummary.js";
import { createWeeklyActivityModel } from "./createWeeklyActivityModel.js";
import { createRecommendedExamModel } from "./createRecommendedExamModel.js";

export default function createStatisticsDashboardModel(statistics, formatDate, text) {
	const normalized = normalizeStatisticsSummary(statistics);
	const scoreTrend = createScoreTrendPoints(statistics?.scoreTrend, formatDate, text);
	const recentAttempts = createRecentAttemptCards(statistics?.recentAttempts, formatDate, text);
	const weeklyActivity = createWeeklyActivityModel(statistics?.weeklyActivity, text);
	const recommendedExam = createRecommendedExamModel(recentAttempts, text);
	const dashboardStatistics = {
		...normalized,
		scoreTrend
	};

	return {
		isStatisticsEmpty: dashboardStatistics.attemptCount === 0,
		hero: buildHero(dashboardStatistics, text),
		kpiGridLabel: text.kpiGridLabel,
		kpiCards: buildKpiCards(dashboardStatistics, text),
		scoreTrendChart: buildScoreTrendChart(scoreTrend, text),
		recommendedExam,
		recommendedExamTitle: text.recommendedTitle,
		recentAttempts,
		weeklyActivity,
		recentAttemptsTitle: text.recentAttemptsTitle,
		recentAttemptsSubtitle: text.recentAttemptsSubtitle,
		recentAttemptsEmpty: text.recentAttemptsEmpty
	};
}

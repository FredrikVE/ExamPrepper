// src/ui/viewmodel/StatisticsPage/createStatisticsDashboardModel.js
import { buildScoreTrendChart } from "./buildScoreTrendChart.js";
import { buildHero } from "./buildStatisticsHero.js";
import { buildKpiCards } from "./buildStatisticsKpiCards.js";
import { createRecentAttemptCards } from "./createRecentAttemptCards.js";
import { createScoreTrendPoints } from "./createScoreTrendPoints.js";
import { normalizeStatisticsSummary } from "./normalizeStatisticsSummary.js";
import { createWeeklyActivityModel } from "./createWeeklyActivityModel.js";

export default function createStatisticsDashboardModel(statistics, formatDate, copy) {
	const normalized = normalizeStatisticsSummary(statistics);
	const scoreTrend = createScoreTrendPoints(statistics?.scoreTrend, formatDate, copy);
	const recentAttempts = createRecentAttemptCards(statistics?.recentAttempts, formatDate, copy);
	const weeklyActivity = createWeeklyActivityModel(statistics?.weeklyActivity, copy);
	const dashboardStatistics = {
		...normalized,
		scoreTrend
	};

	return {
		isStatisticsEmpty: dashboardStatistics.attemptCount === 0,
		hero: buildHero(dashboardStatistics, copy),
		kpiGridLabel: copy.kpiGridLabel,
		kpiCards: buildKpiCards(dashboardStatistics, copy),
		scoreTrendChart: buildScoreTrendChart(scoreTrend, copy),
		recentAttempts,
		weeklyActivity,
		recentAttemptsTitle: copy.recentAttemptsTitle,
		recentAttemptsSubtitle: copy.recentAttemptsSubtitle,
		recentAttemptsEmpty: copy.recentAttemptsEmpty
	};
}

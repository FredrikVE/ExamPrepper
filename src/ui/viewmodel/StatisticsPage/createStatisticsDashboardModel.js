// src/ui/viewmodel/StatisticsPage/createStatisticsDashboardModel.js
import { buildScoreTrendChart } from "./buildScoreTrendChart.js";
import { buildHero } from "./buildStatisticsHero.js";
import { buildKpiCards } from "./buildStatisticsKpiCards.js";
import { normalizeStatistics } from "./normalizeStatistics.js";

export default function createStatisticsDashboardModel(statistics, formatDate, copy) {
	const normalized = normalizeStatistics(statistics, formatDate, copy);

	return {
		isStatisticsEmpty: normalized.attemptCount === 0,
		hero: buildHero(normalized, copy),
		kpiGridLabel: copy.kpiGridLabel,
		kpiCards: buildKpiCards(normalized, copy),
		scoreTrendChart: buildScoreTrendChart(normalized.scoreTrend, copy),
		recentAttempts: normalized.recentAttempts,
		recentAttemptsTitle: copy.recentAttemptsTitle,
		recentAttemptsSubtitle: copy.recentAttemptsSubtitle,
		recentAttemptsEmpty: copy.recentAttemptsEmpty
	};
}

// src/ui/viewmodel/StatisticsPage/buildScoreTrendChart.js
export function buildScoreTrendChart(scoreTrend, text) {
	const points = [];

	for (const point of scoreTrend) {
		if (point.percentage !== null) {
			points.push(point);
		}
	}

	return {
		title: text.scoreTrendTitle,
		subtitle: text.scoreTrendSubtitle,
		emptySummary: text.scoreTrendEmptySummary,
		points
	};
}

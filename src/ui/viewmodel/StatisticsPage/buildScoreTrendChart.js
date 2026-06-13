// src/ui/viewmodel/StatisticsPage/buildScoreTrendChart.js
export function buildScoreTrendChart(scoreTrend, copy) {
	const points = [];

	for (const point of scoreTrend) {
		if (point.percentage !== null) {
			points.push(point);
		}
	}

	return {
		title: copy.scoreTrendTitle,
		subtitle: copy.scoreTrendSubtitle,
		emptySummary: copy.scoreTrendEmptySummary,
		points
	};
}

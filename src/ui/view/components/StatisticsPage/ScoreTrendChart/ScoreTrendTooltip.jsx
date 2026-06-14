// src/ui/view/components/StatisticsPage/ScoreTrendChart/ScoreTrendTooltip.jsx
export default function StatisticsChartTooltip({ active, payload }) {
	if (!active || !payload?.length) {
		return null;
	}

	const point = payload[0]?.payload;

	return (
		<div className="statistics-chart-tooltip">
			<strong>{point.percentageLabel}</strong>
			<span>{point.dateLabel}</span>
			<span>{point.scoreLabel}</span>
		</div>
	);
}

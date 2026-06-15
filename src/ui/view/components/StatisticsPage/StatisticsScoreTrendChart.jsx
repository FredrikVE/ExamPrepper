// src/ui/view/components/StatisticsPage/StatisticsScoreTrendChart.jsx
import ScoreTrendChartContent from "./ScoreTrendChart/ScoreTrendChartContent";

export default function StatisticsScoreTrendChart({ chart }) {
	return (
		<section className="statistics-panel statistics-chart-panel" aria-labelledby="statistics-score-trend-title">
			<div className="statistics-panel-header">
				<div>
					<h2 id="statistics-score-trend-title">{chart.title}</h2>
					<p>{chart.subtitle}</p>
				</div>
			</div>

			<ScoreTrendChartContent chart={chart} />
		</section>
	);
}

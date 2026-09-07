// src/ui/view/components/StatisticsPage/Overview/StatisticsScoreChart.jsx
const STATISTICS_CHART_GRID_LINES = Object.freeze([100, 75, 50, 25, 0]);

export default function StatisticsScoreChart({ id, label, points, axisStartLabel, axisEndLabel, emptyLabel }) {
	if (points.length === 0) {
		return <p id={id} className="statistics-score-chart-empty">{emptyLabel}</p>;
	}

	return (
		<div id={id} className="statistics-score-chart" aria-label={label}>
			<div className="statistics-score-chart-plot">
				<div className="statistics-score-chart-grid" aria-hidden="true">
					{STATISTICS_CHART_GRID_LINES.map((value) => (
						<div key={value} className="statistics-score-chart-gridline">
							<span>{value} %</span>
						</div>
					))}
				</div>
				<ol className="statistics-score-chart-list">
					{points.map((point) => (
						<li key={point.key} className="statistics-score-chart-point" aria-label={`${point.label}, ${point.valueLabel}`}>
							<div className="statistics-score-chart-bar-area" aria-hidden="true">
								<span className="statistics-score-chart-bar" data-latest={point.isLatest} style={{ "--statistics-score-chart-value": `${point.value}%` }} />
							</div>
						</li>
					))}
				</ol>
				<div className="statistics-score-chart-axis-labels" aria-hidden="true">
					<span>{axisStartLabel}</span>
					<span>{axisEndLabel}</span>
				</div>
			</div>
		</div>
	);
}

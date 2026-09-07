// src/ui/view/components/StatisticsPage/Overview/StatisticsScoreChart.jsx
export default function StatisticsScoreChart({ label, points, emptyLabel }) {
	if (points.length === 0) {
		return <p className="statistics-score-chart-empty">{emptyLabel}</p>;
	}

	return (
		<div className="statistics-score-chart" role="img" aria-label={label}>
			<ol className="statistics-score-chart-list">
				{points.map((point) => (
					<li key={point.key} className="statistics-score-chart-point">
						<div className="statistics-score-chart-bar-track" aria-hidden="true">
							<span className="statistics-score-chart-bar" style={{ "--statistics-score-chart-value": `${point.value}%` }} />
						</div>
						<span className="statistics-score-chart-value">{point.valueLabel}</span>
						<span className="statistics-score-chart-label">{point.label}</span>
					</li>
				))}
			</ol>
		</div>
	);
}

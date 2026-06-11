// src/ui/view/components/StatisticsPage/StatisticsScoreTrendChart.jsx
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function StatisticsScoreTrendChart({ chart }) {
	return (
		<section className="statistics-panel statistics-chart-panel" aria-labelledby="statistics-score-trend-title">
			<div className="statistics-panel-header">
				<div>
					<h2 id="statistics-score-trend-title">{chart.title}</h2>
					<p>{chart.subtitle}</p>
				</div>
			</div>

			{chart.points.length === 0 ? (
				<p className="statistics-empty-text">{chart.emptySummary}</p>
			) : (
				<div className="statistics-chart" aria-label={chart.title}>
					<ResponsiveContainer width="100%" height={280}>
						<LineChart data={chart.points} margin={{ top: 10, right: 12, bottom: 0, left: -16 }}>
							<CartesianGrid stroke="var(--line)" strokeDasharray="4 4" />
							<XAxis
								dataKey="name"
								stroke="var(--text-soft)"
								tickLine={false}
								axisLine={false}
							/>
							<YAxis
								domain={[0, 100]}
								stroke="var(--text-soft)"
								tickFormatter={(value) => `${value} %`}
								tickLine={false}
								axisLine={false}
							/>
							<Tooltip content={<StatisticsChartTooltip />} />
							<Line
								type="monotone"
								dataKey="percentage"
								stroke="var(--accent)"
								strokeWidth={3}
								dot={{ r: 4, strokeWidth: 2 }}
								activeDot={{ r: 6 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			)}
		</section>
	);
}

function StatisticsChartTooltip({ active, payload }) {
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

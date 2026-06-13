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
						<LineChart data={chart.points} margin={{ top: 28, right: 12, bottom: 0, left: -16 }}>
							<defs>
								<linearGradient id="scoreTrendGradient" x1="0" y1="0" x2="1" y2="0">
									<stop offset="0%" stopColor="#1463ff" />
									<stop offset="30%" stopColor="#12b6aa" />
									<stop offset="58%" stopColor="#7c3aed" />
									<stop offset="78%" stopColor="#ff8a00" />
									<stop offset="100%" stopColor="#20a83a" />
								</linearGradient>
							</defs>
							<CartesianGrid stroke="var(--line)" strokeDasharray="4 4" />
							<XAxis
								dataKey="name"
								stroke="var(--text-soft)"
								tickLine={false}
								axisLine={false}
								tick={<TrendXAxisTick />}
								height={44}
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
								stroke="url(#scoreTrendGradient)"
								strokeWidth={3}
								dot={<TrendDot />}
								activeDot={{ r: 6 }}
								label={<TrendLabel />}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			)}
		</section>
	);
}

const SCORE_COLORS = [
	{ threshold: 90, color: "#20a83a" },
	{ threshold: 70, color: "#ff8a00" },
	{ threshold: 50, color: "#7c3aed" },
	{ threshold: 30, color: "#12b6aa" },
	{ threshold: 0, color: "#1463ff" }
];

function getScoreColor(percentage) {
	for (const entry of SCORE_COLORS) {
		if (percentage >= entry.threshold) {
			return entry.color;
		}
	}

	return SCORE_COLORS[SCORE_COLORS.length - 1].color;
}

function TrendDot({ cx, cy, payload }) {
	if (cx == null || cy == null || payload?.percentage == null) {
		return null;
	}

	const color = getScoreColor(payload.percentage);

	return <circle cx={cx} cy={cy} r={5} fill={color} stroke="#fff" strokeWidth={2.5} />;
}

function TrendLabel({ x, y, value }) {
	if (x == null || y == null || value == null) {
		return null;
	}

	const color = getScoreColor(value);

	return (
		<text x={x} y={y - 14} textAnchor="middle" fill={color} fontSize={12} fontWeight={700}>
			{`${Math.round(value)} %`}
		</text>
	);
}

function TrendXAxisTick({ x, y, payload }) {
	if (!payload) {
		return null;
	}

	const point = payload.value;

	return (
		<g transform={`translate(${x},${y})`}>
			<text x={0} y={0} dy={12} textAnchor="middle" fill="var(--text-muted)" fontSize={12} fontWeight={600}>
				{point}
			</text>
		</g>
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

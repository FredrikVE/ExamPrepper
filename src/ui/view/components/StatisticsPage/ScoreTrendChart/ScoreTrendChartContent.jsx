// src/ui/view/components/StatisticsPage/ScoreTrendChart/ScoreTrendChartContent.jsx
import { ResponsiveContainer } from "recharts";

import ScoreTrendLineChart from "./ScoreTrendLineChart";

export default function ScoreTrendChartContent({ chart }) {
	if (chart.points.length === 0) {
		return <p className="statistics-empty-text">{chart.emptySummary}</p>;
	}

	return (
		<div className="statistics-chart" aria-label={chart.title}>
			<ResponsiveContainer width="100%" height="100%">
				<ScoreTrendLineChart points={chart.points} />
			</ResponsiveContainer>
		</div>
	);
}

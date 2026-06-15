// src/ui/view/components/StatisticsPage/ScoreTrendChart/ScoreTrendXAxisTick.jsx
import { SCORE_TREND_X_AXIS_TICK_DY } from "./scoreTrendChartConfig";

export default function TrendXAxisTick({ x, y, payload }) {
	if (!payload) {
		return null;
	}

	const point = payload.value;

	return (
		<g transform={`translate(${x},${y})`}>
			<text className="statistics-trend-xaxis-label" x={0} y={0} dy={SCORE_TREND_X_AXIS_TICK_DY} textAnchor="middle">
				{point}
			</text>
		</g>
	);
}

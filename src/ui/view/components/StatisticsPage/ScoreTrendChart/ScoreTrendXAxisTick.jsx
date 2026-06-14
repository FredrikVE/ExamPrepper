// src/ui/view/components/StatisticsPage/ScoreTrendChart/ScoreTrendXAxisTick.jsx
import { SCORE_TREND_X_AXIS_TICK_DY } from "./scoreTrendChartConfig";

export default function TrendXAxisTick({ x, y, payload }) {
	if (!payload) {
		return null;
	}

	const point = payload.value;

	return (
		<g transform={`translate(${x},${y})`}>
			<text x={0} y={0} dy={SCORE_TREND_X_AXIS_TICK_DY} textAnchor="middle" fill="var(--text-muted)" fontSize={12} fontWeight={600}>
				{point}
			</text>
		</g>
	);
}

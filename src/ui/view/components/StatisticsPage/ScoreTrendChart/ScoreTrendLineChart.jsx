// src/ui/view/components/StatisticsPage/ScoreTrendChart/ScoreTrendLineChart.jsx
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

import {
	SCORE_TREND_ACTIVE_DOT,
	SCORE_TREND_CHART_MARGIN,
	SCORE_TREND_X_AXIS_HEIGHT,
	SCORE_TREND_Y_AXIS_WIDTH,
	SCORE_TREND_Y_DOMAIN,
	formatScoreTrendYAxisTick
} from "./scoreTrendChartConfig";
import ScoreTrendGradient from "./ScoreTrendGradient";
import { TrendDot, TrendLabel } from "./ScoreTrendMarks";
import StatisticsChartTooltip from "./ScoreTrendTooltip";
import TrendXAxisTick from "./ScoreTrendXAxisTick";

export default function ScoreTrendLineChart({ height, points, width }) {
	return (
		<LineChart data={points} height={height} margin={SCORE_TREND_CHART_MARGIN} width={width}>
			<ScoreTrendGradient />
			<CartesianGrid stroke="var(--line)" strokeDasharray="4 4" />
			<XAxis
				dataKey="name"
				stroke="var(--text-soft)"
				tickLine={false}
				axisLine={false}
				tick={<TrendXAxisTick />}
				height={SCORE_TREND_X_AXIS_HEIGHT}
			/>
			<YAxis
				domain={SCORE_TREND_Y_DOMAIN}
				width={SCORE_TREND_Y_AXIS_WIDTH}
				stroke="var(--text-soft)"
				tickFormatter={formatScoreTrendYAxisTick}
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
				activeDot={SCORE_TREND_ACTIVE_DOT}
				label={<TrendLabel />}
			/>
		</LineChart>
	);
}

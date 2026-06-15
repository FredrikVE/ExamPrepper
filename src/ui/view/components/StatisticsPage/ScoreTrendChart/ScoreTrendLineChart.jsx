// src/ui/view/components/StatisticsPage/ScoreTrendChart/ScoreTrendLineChart.jsx
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

import { SCORE_TREND_CHART_MARGIN, SCORE_TREND_X_AXIS_HEIGHT, SCORE_TREND_Y_AXIS_WIDTH, SCORE_TREND_Y_DOMAIN, formatScoreTrendYAxisTick } from "./scoreTrendChartConfig";
import ScoreTrendGradient from "./ScoreTrendGradient";
import { TrendActiveDot, TrendDot, TrendLabel } from "./ScoreTrendMarks";
import StatisticsChartTooltip from "./ScoreTrendTooltip";
import TrendXAxisTick from "./ScoreTrendXAxisTick";

export default function ScoreTrendLineChart({ height, points, width }) {
	return (
		<LineChart data={points} height={height} margin={SCORE_TREND_CHART_MARGIN} width={width}>
			<ScoreTrendGradient />
			<CartesianGrid className="statistics-chart-grid" />
			<XAxis
				className="statistics-trend-axis"
				dataKey="name"
				tickLine={false}
				axisLine={false}
				tick={<TrendXAxisTick />}
				height={SCORE_TREND_X_AXIS_HEIGHT}
			/>
			<YAxis
				className="statistics-trend-axis"
				domain={SCORE_TREND_Y_DOMAIN}
				width={SCORE_TREND_Y_AXIS_WIDTH}
				tickFormatter={formatScoreTrendYAxisTick}
				tickLine={false}
				axisLine={false}
			/>
			<Tooltip content={<StatisticsChartTooltip />} />
			<Line
				className="statistics-score-line"
				type="monotone"
				dataKey="percentage"
				dot={<TrendDot />}
				activeDot={<TrendActiveDot />}
				label={<TrendLabel />}
			/>
		</LineChart>
	);
}

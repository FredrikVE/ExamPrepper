// src/ui/view/components/StatisticsPage/ScoreTrendChart/ScoreTrendMarks.jsx
import { SCORE_TREND_DOT_STROKE, SCORE_TREND_DOT_STROKE_WIDTH, SCORE_TREND_DOT_RADIUS, SCORE_TREND_LABEL_DY } from "./scoreTrendChartConfig";
import { getScoreColor } from "./scoreTrendScoreColors";

export function TrendDot({ cx, cy, payload }) {
	if (cx == null || cy == null || payload?.percentage == null) {
		return null;
	}

	const color = getScoreColor(payload.percentage);

	return <circle 
		cx={cx} 
		cy={cy} 
		r={SCORE_TREND_DOT_RADIUS} 
		fill={color} 
		stroke={SCORE_TREND_DOT_STROKE} 
		strokeWidth={SCORE_TREND_DOT_STROKE_WIDTH} 
	/>;
}

export function TrendLabel({ x, y, value }) {
	if (x == null || y == null || value == null) {
		return null;
	}

	const color = getScoreColor(value);

	return (
		<text x={x} y={y + SCORE_TREND_LABEL_DY} textAnchor="middle" fill={color} fontSize={12} fontWeight={700}>
			{`${Math.round(value)} %`}
		</text>
	);
}

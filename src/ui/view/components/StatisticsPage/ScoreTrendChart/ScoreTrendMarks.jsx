// src/ui/view/components/StatisticsPage/ScoreTrendChart/ScoreTrendMarks.jsx
import { SCORE_TREND_ACTIVE_DOT_RADIUS, SCORE_TREND_DOT_RADIUS, SCORE_TREND_LABEL_DY } from "./scoreTrendChartConfig";
import { getScoreBandClassName } from "./scoreTrendScoreBands";

export function TrendDot({ cx, cy, payload }) {
	if (cx == null || cy == null || payload?.percentage == null) {
		return null;
	}

	const scoreBandClassName = getScoreBandClassName(payload.percentage);

	return <circle className={`statistics-trend-dot ${scoreBandClassName}`} cx={cx} cy={cy} r={SCORE_TREND_DOT_RADIUS} />;
}

export function TrendActiveDot({ cx, cy, payload }) {
	if (cx == null || cy == null || payload?.percentage == null) {
		return null;
	}

	const scoreBandClassName = getScoreBandClassName(payload.percentage);

	return <circle className={`statistics-trend-active-dot ${scoreBandClassName}`} cx={cx} cy={cy} r={SCORE_TREND_ACTIVE_DOT_RADIUS} />;
}

export function TrendLabel({ x, y, value }) {
	if (x == null || y == null || value == null) {
		return null;
	}

	const scoreBandClassName = getScoreBandClassName(value);

	return (
		<text className={`statistics-trend-label ${scoreBandClassName}`} x={x} y={y + SCORE_TREND_LABEL_DY} textAnchor="middle">
			{`${Math.round(value)} %`}
		</text>
	);
}

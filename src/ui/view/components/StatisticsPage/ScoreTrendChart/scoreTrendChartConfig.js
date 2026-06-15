// src/ui/view/components/StatisticsPage/ScoreTrendChart/scoreTrendChartConfig.js
export const SCORE_TREND_CHART_MARGIN = {
	top: 34,
	right: 28,
	bottom: 16,
	left: 12
};

export const SCORE_TREND_GRADIENT_STOPS = [
	{ offset: "0%", className: "statistics-score-gradient-stop-low" },
	{ offset: "30%", className: "statistics-score-gradient-stop-building" },
	{ offset: "58%", className: "statistics-score-gradient-stop-mid" },
	{ offset: "78%", className: "statistics-score-gradient-stop-strong" },
	{ offset: "100%", className: "statistics-score-gradient-stop-excellent" }
];

export const SCORE_TREND_Y_DOMAIN = [0, 100];
export const SCORE_TREND_X_AXIS_HEIGHT = 58;
export const SCORE_TREND_Y_AXIS_WIDTH = 58;
export const SCORE_TREND_X_AXIS_TICK_DY = 20;
export const SCORE_TREND_DOT_RADIUS = 5;
export const SCORE_TREND_ACTIVE_DOT_RADIUS = 6;
export const SCORE_TREND_LABEL_DY = -14;

export function formatScoreTrendYAxisTick(value) {
	return `${value} %`;
}

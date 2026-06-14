// src/ui/view/components/StatisticsPage/ScoreTrendChart/scoreTrendChartConfig.js
export const SCORE_TREND_CHART_MARGIN = {
	top: 34,
	right: 28,
	bottom: 16,
	left: 12
};

export const SCORE_TREND_GRADIENT_STOPS = [
	{ offset: "0%", color: "#1463ff" },
	{ offset: "30%", color: "#12b6aa" },
	{ offset: "58%", color: "#7c3aed" },
	{ offset: "78%", color: "#ff8a00" },
	{ offset: "100%", color: "#20a83a" }
];

export const SCORE_TREND_Y_DOMAIN = [0, 100];
export const SCORE_TREND_X_AXIS_HEIGHT = 58;
export const SCORE_TREND_Y_AXIS_WIDTH = 58;
export const SCORE_TREND_X_AXIS_TICK_DY = 20;
export const SCORE_TREND_DOT_RADIUS = 5;
export const SCORE_TREND_DOT_STROKE = "#fff";
export const SCORE_TREND_DOT_STROKE_WIDTH = 2.5;
export const SCORE_TREND_ACTIVE_DOT = { r: 6 };
export const SCORE_TREND_LABEL_DY = -14;

export function formatScoreTrendYAxisTick(value) {
	return `${value} %`;
}

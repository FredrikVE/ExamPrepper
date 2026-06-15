// src/ui/view/components/StatisticsPage/ScoreTrendChart/scoreTrendScoreBands.js
const SCORE_BANDS = [
	{ threshold: 90, className: "statistics-trend-score-excellent" },
	{ threshold: 70, className: "statistics-trend-score-strong" },
	{ threshold: 50, className: "statistics-trend-score-mid" },
	{ threshold: 30, className: "statistics-trend-score-building" },
	{ threshold: 0, className: "statistics-trend-score-low" }
];

export function getScoreBandClassName(percentage) {
	for (const band of SCORE_BANDS) {
		if (percentage >= band.threshold) {
			return band.className;
		}
	}

	return SCORE_BANDS[SCORE_BANDS.length - 1].className;
}

// src/ui/view/components/StatisticsPage/ScoreTrendChart/scoreTrendScoreColors.js
const SCORE_COLORS = [
	{ threshold: 90, color: "#20a83a" },
	{ threshold: 70, color: "#ff8a00" },
	{ threshold: 50, color: "#7c3aed" },
	{ threshold: 30, color: "#12b6aa" },
	{ threshold: 0, color: "#1463ff" }
];

export function getScoreColor(percentage) {
	for (const entry of SCORE_COLORS) {
		if (percentage >= entry.threshold) {
			return entry.color;
		}
	}

	return SCORE_COLORS[SCORE_COLORS.length - 1].color;
}

//src/utils/viewmodelutils
export default function getScoreLabel(submitted, score, totalPoints) {
	if (submitted) {
		return `${formatScore(score)}/${totalPoints}`;
	}

	return "—";
}

function formatScore(score) {
	if (Number.isInteger(score)) {
		return String(score);
	}

	return String(Number(score.toFixed(2)));
}

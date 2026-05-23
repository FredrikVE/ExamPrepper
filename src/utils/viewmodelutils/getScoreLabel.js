//src/utils/viewmodelutils
export default function getScoreLabel(submitted, score, totalPoints) {
	if (submitted) {
		return `${score}/${totalPoints}`;
	}

	return "—";
}
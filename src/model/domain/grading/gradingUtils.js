// src/model/domain/grading/gradingUtils.js
export function createEmptyStats() {
	return {
		correct: 0,
		wrong: 0,
		unanswered: 0
	};
}

export function calculatePartialScore(points, correctCount, totalCount) {
	if (totalCount === 0) {
		return 0;
	}

	const rawScore = points * (correctCount / totalCount);

	return Number(rawScore.toFixed(2));
}

export function isPlainObject(value) {
	return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

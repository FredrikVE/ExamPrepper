// src/ui/viewmodel/StatisticsPage/createRecommendedExamModel.js
export function createRecommendedExamModel(recentAttempts, text) {
	if (!Array.isArray(recentAttempts)) {
		return null;
	}

	if (recentAttempts.length === 0) {
		return null;
	}

	const lowestScoringAttempt = findLowestScoringAttempt(recentAttempts);

	if (!lowestScoringAttempt) {
		return null;
	}

	return {
		examId: lowestScoringAttempt.examId,
		title: createRecommendedExamTitle(lowestScoringAttempt, text),
		body: text.recommendedBody,
		badgeLabel: text.recommendedBadge
	};
}

function findLowestScoringAttempt(attempts) {
	let lowestScoringAttempt = null;

	for (const attempt of attempts) {
		if (!attempt) {
			continue;
		}

		if (attempt.percentage === null || attempt.percentage === undefined) {
			continue;
		}

		if (lowestScoringAttempt === null) {
			lowestScoringAttempt = attempt;
			continue;
		}

		if (attempt.percentage < lowestScoringAttempt.percentage) {
			lowestScoringAttempt = attempt;
		}
	}

	return lowestScoringAttempt;
}

function createRecommendedExamTitle(attempt, text) {
	if (attempt.examTitle) {
		return attempt.examTitle;
	}

	if (attempt.examId) {
		return text.createAttemptFallbackTitle(attempt.examId);
	}

	return text.recommendedTitle;
}

// src/ui/viewmodel/StatisticsPage/createRecommendedExamModel.js
export function createRecommendedExamModel(recentAttempts, text) {
	if (!Array.isArray(recentAttempts) || recentAttempts.length === 0) {
		return null;
	}

	const lowest = findLowestScoringAttempt(recentAttempts);

	if (!lowest) {
		return null;
	}

	return {
		examId: lowest.examId,
		title: createExamTitle(lowest, text),
		body: text.recommendedBody,
		badgeLabel: text.recommendedBadge,
		actionLabel: text.recommendedAction
	};
}

function findLowestScoringAttempt(attempts) {
	let lowest = null;

	for (const attempt of attempts) {
		if (attempt.percentage == null) {
			continue;
		}

		if (lowest === null || attempt.percentage < lowest.percentage) {
			lowest = attempt;
		}
	}

	return lowest;
}

function createExamTitle(attempt, text) {
	if (attempt.examTitle) {
		return attempt.examTitle;
	}

	if (attempt.examId) {
		return text.createAttemptFallbackTitle(attempt.examId);
	}

	return text.recommendedTitle;
}

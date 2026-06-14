// src/ui/viewmodel/StatisticsPage/createRecentAttemptCards.js
import { EMPTY_LABEL, normalizeNullablePercentage, formatPercentageLabel, createPointsLabel } from "./statisticsFormatters.js";

const RECENT_ATTEMPT_TONES = ["purple", "orange", "teal"];

export function createRecentAttemptCards(recentAttempts, formatDate, copy) {
	if (!Array.isArray(recentAttempts)) {
		return [];
	}

	const cards = [];

	for (const attempt of recentAttempts) {
		if (!attempt) {
			continue;
		}

		cards.push(createRecentAttemptCard(attempt, cards.length, formatDate, copy));
	}

	return cards;
}

function createRecentAttemptCard(attempt, index, formatDate, copy) {
	const attemptNumber = index + 1;
	const percentage = normalizeNullablePercentage(attempt.percentage);
	const examId = attempt.examId ?? "";

	return {
		id: attempt.attemptId ?? `recent-${attemptNumber}`,
		examId,
		examTitle: createRecentAttemptTitle(attempt, attemptNumber, copy),
		submittedAtLabel: formatDate(attempt.submittedAt) ?? EMPTY_LABEL,
		percentage,
		percentageLabel: formatPercentageLabel(percentage),
		pointsLabel: createPointsLabel(attempt.scorePoints, attempt.totalPoints, copy),
		scoreLabel: copy.attemptScoreLabel,
		tone: selectRecentAttemptTone(index)
	};
}

function createRecentAttemptTitle(attempt, attemptNumber, copy) {
	if (attempt.examTitle) {
		return attempt.examTitle;
	}

	if (attempt.examId) {
		return copy.createAttemptFallbackTitle(attempt.examId);
	}

	return copy.createAttemptFallbackTitle(attemptNumber);
}

function selectRecentAttemptTone(index) {
	return RECENT_ATTEMPT_TONES[index % RECENT_ATTEMPT_TONES.length];
}

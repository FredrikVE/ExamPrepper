// src/ui/viewmodel/StatisticsPage/createRecentAttemptCards.js
import { normalizeNullablePercentagePoints } from "./statisticsNumbers.js";
import { createPercentageLabel, createPointsLabel } from "./statisticsValueLabels.js";

const RECENT_ATTEMPT_TONES = ["purple", "orange", "teal"];

export function createRecentAttemptCards(recentAttempts, formatDate, text) {
	if (!Array.isArray(recentAttempts)) {
		return [];
	}

	const cards = [];

	for (const attempt of recentAttempts) {
		if (!attempt) {
			continue;
		}

		cards.push(createRecentAttemptCard(attempt, cards.length, formatDate, text));
	}

	return cards;
}

function createRecentAttemptCard(attempt, index, formatDate, text) {
	const attemptNumber = index + 1;
	const percentage = normalizeNullablePercentagePoints(attempt.percentage);
	const examId = attempt.examId ?? "";

	return {
		id: attempt.attemptId ?? `recent-${attemptNumber}`,
		examId,
		examTitle: createRecentAttemptTitle(attempt, attemptNumber, text),
		submittedAtLabel: formatDate(attempt.submittedAt) ?? text.emptyValueLabel,
		percentage,
		percentageLabel: createPercentageLabel(percentage, text),
		pointsLabel: createPointsLabel(attempt.scorePoints, attempt.totalPoints, text),
		scoreLabel: text.attemptScoreLabel,
		tone: selectRecentAttemptTone(index)
	};
}

function createRecentAttemptTitle(attempt, attemptNumber, text) {
	if (attempt.examTitle) {
		return attempt.examTitle;
	}

	if (attempt.examId) {
		return text.createAttemptFallbackTitle(attempt.examId);
	}

	return text.createAttemptFallbackTitle(attemptNumber);
}

function selectRecentAttemptTone(index) {
	return RECENT_ATTEMPT_TONES[index % RECENT_ATTEMPT_TONES.length];
}

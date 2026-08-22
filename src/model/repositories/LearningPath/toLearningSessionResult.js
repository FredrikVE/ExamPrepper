// src/model/repositories/LearningPath/toLearningSessionResult.js
const INVALID_LEARNING_SESSION_RESULT = "Invalid learning session result";
const NOT_ASSESSED = "not-assessed";
const ASSESSMENT_BANDS = new Set(["practice", "progress", "understood"]);

export default function toLearningSessionResult(response) {
	validateLearningSessionResult(response);

	return {
		sessionId: response.sessionId,
		status: response.status,
		score: {
			earnedPoints: response.score.earnedPoints,
			availablePoints: response.score.availablePoints,
			percentage: response.score.percentage,
			performanceBand: response.score.performanceBand
		}
	};
}

function validateLearningSessionResult(response) {
	if (!response || typeof response.sessionId !== "string" || response.status !== "completed" || !response.score || !Number.isFinite(response.score.earnedPoints) || !Number.isFinite(response.score.availablePoints) || !isValidPerformancePair(response.score.percentage, response.score.performanceBand)) {

		throw new Error(INVALID_LEARNING_SESSION_RESULT);

	}
}

function isValidPerformancePair(percentage, performanceBand) {
	if (percentage === null) {
		return performanceBand === NOT_ASSESSED;
	}

	return Number.isFinite(percentage)
		&& percentage >= 0
		&& percentage <= 100
		&& ASSESSMENT_BANDS.has(performanceBand);
}

// src/model/repositories/LearningPath/toLearningSession.js
import toPracticeQuestion from "../questions/toPracticeQuestion.js";

const INVALID_LEARNING_SESSION_RESPONSE = "Invalid learning session response";
const ACTIVITY_KINDS = new Set(["authored", "review", "repair", "coverage", "legacy-round"]);

export default function toLearningSession(response) {
	validateLearningSession(response);
	const questions = [];

	for (const entry of response.questions) {
		questions.push({
			sessionQuestionId: entry.sessionQuestionId,
			position: entry.position,
			question: toPracticeQuestion(entry.question)
		});
	}

	return {
		sessionId: response.sessionId,
		moduleId: response.moduleId,
		modulePosition: response.modulePosition,
		moduleTitle: response.moduleTitle,
		activityKind: response.activityKind,
		planKey: response.planKey,
		sectionId: response.sectionId,
		questionCount: response.questionCount,
		questions
	};
}

function validateLearningSession(response) {
	if (!response || typeof response.sessionId !== "string" || typeof response.moduleId !== "string" || !Number.isInteger(response.modulePosition) || typeof response.moduleTitle !== "string" || !ACTIVITY_KINDS.has(response.activityKind) || !isNullableString(response.planKey) || !isNullableString(response.sectionId) || !Number.isInteger(response.questionCount) || !Array.isArray(response.questions)) {

		throw new Error(INVALID_LEARNING_SESSION_RESPONSE);

	}

	for (const entry of response.questions) {
		if (!entry || typeof entry.sessionQuestionId !== "string" || !Number.isInteger(entry.position) || !entry.question || typeof entry.question !== "object") {

			throw new Error(INVALID_LEARNING_SESSION_RESPONSE);

		}
	}
}

function isNullableString(value) {
	return value === null || typeof value === "string";
}

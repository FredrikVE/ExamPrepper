//src/model/repositories/LearningPathRepository.js
const INVALID_LEARNING_PATH_RESPONSE = "Invalid learning path response";
const INVALID_LEARNING_SESSION_RESPONSE = "Invalid learning session response";
const INVALID_LEARNING_SESSION_RESULT = "Invalid learning session result";

export default class LearningPathRepository {
	constructor(learningPathDataSource) {
		this.learningPathDataSource = learningPathDataSource;
	}

	async getLearningPath({ subjectId, language }) {
		const response = await this.learningPathDataSource.getLearningPath({ subjectId, language });
		validateLearningPathResponse(response);

		return {
			subjectId: response.subjectId,
			activeModuleId: response.activeModuleId,
			resumableSession: response.resumableSession === null ? null : { ...response.resumableSession },
			modules: response.modules.map(toLearningModule),
			examGate: { ...response.examGate }
		};
	}

	async startLearningSession(command) {
		const response = await this.learningPathDataSource.startLearningSession(command);
		return toLearningSession(response);
	}

	async getLearningSession(sessionId) {
		const response = await this.learningPathDataSource.getLearningSession(sessionId);
		return toLearningSession(response);
	}

	async submitLearningSession({ sessionId, answers }) {
		const response = await this.learningPathDataSource.submitLearningSession({ sessionId, answers });
		validateSubmitResponse(response);

		return {
			sessionId: response.sessionId,
			status: response.status,
			score: { ...response.score },
			moduleProgress: { ...response.moduleProgress }
		};
	}
}

function validateLearningPathResponse(response) {
	if (!response || typeof response.subjectId !== "string" || !isNullableString(response.activeModuleId) || !isValidResumableSession(response.resumableSession) || !Array.isArray(response.modules) || !isValidExamGate(response.examGate)) {
		throw new Error(INVALID_LEARNING_PATH_RESPONSE);
	}

	for (const module of response.modules) {
		if (!isValidLearningModule(module)) {
			throw new Error(INVALID_LEARNING_PATH_RESPONSE);
		}
	}
}

function isValidLearningModule(module) {
	if (!module || typeof module.id !== "string" || typeof module.moduleKey !== "string" || !Number.isFinite(module.position) || typeof module.title !== "string" || !module.availability || typeof module.availability.isUnlocked !== "boolean" || typeof module.availability.isCurrent !== "boolean" || !isNullableString(module.availability.lockReason) || !Array.isArray(module.topics) || !module.progress || !Number.isFinite(module.progress.masteryPercent) || !Number.isInteger(module.progress.completedRounds) || !Number.isInteger(module.progress.nextRound)) {
		return false;
	}

	return module.topics.every((topic) => topic && typeof topic.key === "string" && typeof topic.label === "string" && (topic.masteryPercent === null || Number.isFinite(topic.masteryPercent)));
}

function isValidResumableSession(session) {
	return session === null || Boolean(session && typeof session.sessionId === "string" && typeof session.moduleId === "string" && Number.isInteger(session.currentQuestionPosition) && Number.isInteger(session.questionCount));
}

function isValidExamGate(examGate) {
	return Boolean(examGate && typeof examGate.isUnlocked === "boolean" && Number.isInteger(examGate.requiredCompletedRounds));
}

function isNullableString(value) {
	return value === null || typeof value === "string";
}

function toLearningModule(module) {
	return {
		id: module.id,
		moduleKey: module.moduleKey,
		position: module.position,
		title: module.title,
		description: module.description,
		availability: { ...module.availability },
		topics: module.topics.map((topic) => ({ ...topic })),
		progress: { ...module.progress }
	};
}

function toLearningSession(response) {
	if (!response || typeof response.sessionId !== "string" || typeof response.moduleId !== "string" || !Number.isInteger(response.modulePosition) || typeof response.moduleTitle !== "string" || !Number.isInteger(response.round) || !Number.isInteger(response.questionCount) || !Array.isArray(response.questions)) {
		throw new Error(INVALID_LEARNING_SESSION_RESPONSE);
	}

	const questions = [];
	for (const entry of response.questions) {
		if (!entry || typeof entry.sessionQuestionId !== "string" || !Number.isFinite(entry.position) || !entry.question || typeof entry.question !== "object") {
			throw new Error(INVALID_LEARNING_SESSION_RESPONSE);
		}

		questions.push({ sessionQuestionId: entry.sessionQuestionId, position: entry.position, question: toLearningQuestion(entry.question) });
	}

	return { sessionId: response.sessionId, moduleId: response.moduleId, modulePosition: response.modulePosition, moduleTitle: response.moduleTitle, round: response.round, questionCount: response.questionCount, questions };
}

function toLearningQuestion(question) {
	const mappedQuestion = {
		...question,
		answers: Array.isArray(question.answers) ? [...question.answers] : Array.isArray(question.acceptedAnswers) ? [...question.acceptedAnswers] : []
	};

	if (Array.isArray(question.options)) {
		mappedQuestion.options = question.options.map((option) => ({
			...option,
			correct: option.correct ?? option.isCorrect ?? false,
			why: option.why ?? option.feedback ?? ""
		}));
	}

	return mappedQuestion;
}

function validateSubmitResponse(response) {
	if (!response || typeof response.sessionId !== "string" || response.status !== "completed" || !response.score || !Number.isFinite(response.score.earnedPoints) || !Number.isFinite(response.score.availablePoints) || !Number.isFinite(response.score.percentage) || !response.moduleProgress || !Number.isFinite(response.moduleProgress.masteryPercent) || !Number.isInteger(response.moduleProgress.completedRounds) || !Number.isInteger(response.moduleProgress.nextRound)) {
		throw new Error(INVALID_LEARNING_SESSION_RESULT);
	}
}

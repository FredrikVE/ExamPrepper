// src/model/repositories/LearningPathRepository.js
const INVALID_LEARNING_PATH_RESPONSE = "Invalid learning path response";
const INVALID_LEARNING_SESSION_RESPONSE = "Invalid learning session response";
const INVALID_LEARNING_SESSION_RESULT = "Invalid learning session result";
const ACTIVITY_KINDS = new Set(["authored", "review", "repair", "coverage", "legacy-round"]);
const SESSION_STATUSES = new Set(["completed", "current", "available", "locked"]);
const CHAPTER_TEST_STATUSES = new Set(["available", "locked"]);
const ASSESSMENT_BANDS = new Set(["practice", "progress", "understood"]);

export default class LearningPathRepository {
	#learningPathResponsePromisesByKey = new Map();

	constructor(learningPathDataSource) {
		this.learningPathDataSource = learningPathDataSource;
	}

	async getLearningPath({ subjectId, language }) {
		const cacheKey = `${subjectId}:${language}`;
		let responsePromise = this.#learningPathResponsePromisesByKey.get(cacheKey);

		if (responsePromise === undefined) {
			responsePromise = this.learningPathDataSource.getLearningPath({ subjectId, language });
			this.#learningPathResponsePromisesByKey.set(cacheKey, responsePromise);
		}

		try {
			const response = normalizeLearningPathResponse(await responsePromise);
			validateLearningPathResponse(response);

			return {
				subjectId: response.subjectId,
				activeModuleId: response.activeModuleId,
				resumableSession: response.resumableSession === null ? null : { ...response.resumableSession },
				nextActivity: response.nextActivity === null ? null : { ...response.nextActivity },
				modules: response.modules.map(toLearningModule),
				examGate: { ...response.examGate }
			};
		}
		catch (error) {
			if (this.#learningPathResponsePromisesByKey.get(cacheKey) === responsePromise) {
				this.#learningPathResponsePromisesByKey.delete(cacheKey);
			}

			throw error;
		}
	}

	async startLearningSession(command) {

		try {
			return toLearningSession(await this.learningPathDataSource.startLearningSession(command));
		}
		finally {
			this.#learningPathResponsePromisesByKey.clear();
		}
	}

	async getLearningSession(sessionId) {
		return toLearningSession(await this.learningPathDataSource.getLearningSession(sessionId));
	}

	async submitLearningSession({ sessionId, answers }) {

		try {
			const response = await this.learningPathDataSource.submitLearningSession({ sessionId, answers });
			validateSubmitResponse(response);

			return { sessionId: response.sessionId, status: response.status, score: { ...response.score } };
		}
		finally {
			this.#learningPathResponsePromisesByKey.clear();
		}
	}

	clearLearningPathCache() {
		this.#learningPathResponsePromisesByKey.clear();
	}
}

function validateLearningPathResponse(response) {
	if (!response || typeof response.subjectId !== "string" || !isNullableString(response.activeModuleId) || !isValidResumableSession(response.resumableSession) || !isValidNextActivity(response.nextActivity) || !Array.isArray(response.modules) || !isValidExamGate(response.examGate)) throw new Error(INVALID_LEARNING_PATH_RESPONSE);
	for (const module of response.modules) if (!isValidLearningModule(module)) throw new Error(INVALID_LEARNING_PATH_RESPONSE);
}

function isValidLearningModule(module) {
	if (!module || typeof module.id !== "string" || typeof module.moduleKey !== "string" || !Number.isFinite(module.position) || typeof module.title !== "string" || !module.availability || typeof module.availability.isUnlocked !== "boolean" || typeof module.availability.isCurrent !== "boolean" || !isNullableString(module.availability.lockReason) || !Array.isArray(module.topics) || !isValidModuleProgress(module.progress) || !isValidModuleRunProgress(module.currentRun) || !Array.isArray(module.sections)) return false;
	return module.topics.every((topic) => topic && typeof topic.key === "string" && typeof topic.label === "string" && (topic.masteryPercent === null || Number.isFinite(topic.masteryPercent))) && module.sections.every(isValidSection);
}

function isValidModuleRunProgress(progress) {
	return progress === null || Boolean(progress && Number.isInteger(progress.completedSessions) && Number.isInteger(progress.totalSessions));
}

function isValidModuleProgress(progress) {
	return Boolean(progress && Number.isInteger(progress.completedSessions) && Number.isInteger(progress.totalSessions) && Number.isFinite(progress.completionPercent) && isValidPerformancePair(progress.performancePercent, progress.performanceBand) && isNullableNumber(progress.coveragePercent) && isNullableString(progress.lastSessionAt));
}

function normalizeLearningPathResponse(response) {
	if (!response || !Array.isArray(response.modules)) return response;
	return {
		...response,
		modules: response.modules.map((module) => !module || !Array.isArray(module.sections) ? module : {
			...module,
			sections: module.sections.map((section) => !section || !Array.isArray(section.sessions) ? section : {
				...section,
				sessions: section.sessions.map(normalizeRoadmapSession)
			})
		})
	};
}

function normalizeRoadmapSession(session) {
	if (!session || typeof session !== "object") return session;
	const percentMissing = session.performancePercent === undefined;
	const bandMissing = session.performanceBand === undefined;
	if (!percentMissing || !bandMissing) return session;
	return { ...session, performancePercent: null, performanceBand: "not-assessed" };
}

function isValidPerformancePair(percentage, band) {
	if (percentage === null) return band === "not-assessed";
	return Number.isFinite(percentage) && percentage >= 0 && percentage <= 100 && ASSESSMENT_BANDS.has(band);
}

function isValidSection(section) {
	return Boolean(section && typeof section.id === "string" && typeof section.sectionKey === "string" && typeof section.chapterKey === "string" && Number.isInteger(section.position) && typeof section.label === "string" && isValidSectionProgress(section.progress) && Array.isArray(section.sessions) && section.sessions.every(isValidRoadmapSession) && Array.isArray(section.chapterTests) && section.chapterTests.every(isValidChapterTest));
}

function isValidSectionProgress(progress) {
	return Boolean(progress && Number.isInteger(progress.completedSessions) && Number.isInteger(progress.totalSessions) && Number.isFinite(progress.completionPercent));
}

function isValidRoadmapSession(session) {
	return Boolean(session && typeof session.planKey === "string" && Number.isInteger(session.position) && Number.isInteger(session.questionCount) && typeof session.isStartable === "boolean" && SESSION_STATUSES.has(session.status) && isValidPerformancePair(session.performancePercent, session.performanceBand));
}

function isValidChapterTest(test) {
	return Boolean(test && typeof test.baseId === "string" && Number.isInteger(test.position) && CHAPTER_TEST_STATUSES.has(test.status));
}

function isValidResumableSession(session) {
	return session === null || Boolean(session && typeof session.sessionId === "string" && typeof session.moduleId === "string" && ACTIVITY_KINDS.has(session.activityKind) && isNullableString(session.planKey) && isNullableString(session.sectionId) && Number.isInteger(session.currentQuestionPosition) && Number.isInteger(session.questionCount));
}

function isValidNextActivity(activity) {
	if (activity === null) return true;
	if (!activity || typeof activity.moduleId !== "string") return false;
	if (activity.kind === "resume-session") return typeof activity.sessionId === "string";
	if (activity.kind === "start-authored-session") return typeof activity.sectionId === "string" && typeof activity.sectionKey === "string" && typeof activity.planKey === "string" && Number.isInteger(activity.sessionPosition) && Number.isInteger(activity.questionCount);
	if (activity.kind === "start-adaptive-session") return ["review", "repair", "coverage"].includes(activity.activityKind) && Number.isInteger(activity.questionCount);
	if (activity.kind === "chapter-test") return typeof activity.sectionId === "string" && typeof activity.baseId === "string";
	return false;
}

function isValidExamGate(examGate) {
	return Boolean(examGate && typeof examGate.isUnlocked === "boolean");
}

function isNullableString(value) { return value === null || typeof value === "string"; }
function isNullableNumber(value) { return value === null || Number.isFinite(value); }

function toLearningModule(module) {
	return {
		id: module.id,
		moduleKey: module.moduleKey,
		position: module.position,
		title: module.title,
		description: module.description,
		availability: { ...module.availability },
		topics: module.topics.map((topic) => ({ ...topic })),
		progress: { ...module.progress },
		currentRun: module.currentRun === null ? null : { ...module.currentRun },
		sections: module.sections.map((section) => ({
			...section,
			progress: { ...section.progress },
			sessions: section.sessions.map((session) => ({ ...session })),
			chapterTests: section.chapterTests.map((test) => ({ ...test }))
		}))
	};
}

function toLearningSession(response) {
	if (!response || typeof response.sessionId !== "string" || typeof response.moduleId !== "string" || !Number.isInteger(response.modulePosition) || typeof response.moduleTitle !== "string" || !ACTIVITY_KINDS.has(response.activityKind) || !isNullableString(response.planKey) || !isNullableString(response.sectionId) || !Number.isInteger(response.questionCount) || !Array.isArray(response.questions)) throw new Error(INVALID_LEARNING_SESSION_RESPONSE);
	const questions = [];
	for (const entry of response.questions) {
		if (!entry || typeof entry.sessionQuestionId !== "string" || !Number.isFinite(entry.position) || !entry.question || typeof entry.question !== "object") throw new Error(INVALID_LEARNING_SESSION_RESPONSE);
		questions.push({ sessionQuestionId: entry.sessionQuestionId, position: entry.position, question: toLearningQuestion(entry.question) });
	}
	return { sessionId: response.sessionId, moduleId: response.moduleId, modulePosition: response.modulePosition, moduleTitle: response.moduleTitle, activityKind: response.activityKind, planKey: response.planKey, sectionId: response.sectionId, questionCount: response.questionCount, questions };
}

function toLearningQuestion(question) {
	const mappedQuestion = { ...question, answers: Array.isArray(question.answers) ? [...question.answers] : Array.isArray(question.acceptedAnswers) ? [...question.acceptedAnswers] : [] };
	if (Array.isArray(question.options)) mappedQuestion.options = question.options.map((option) => ({ ...option, correct: option.correct ?? option.isCorrect ?? false, why: option.why ?? option.feedback ?? "" }));
	return mappedQuestion;
}

function validateSubmitResponse(response) {
	if (!response || typeof response.sessionId !== "string" || response.status !== "completed" || !response.score || !Number.isFinite(response.score.earnedPoints) || !Number.isFinite(response.score.availablePoints) || !isNullableNumber(response.score.percentage) || !(response.score.performanceBand === "not-assessed" || ASSESSMENT_BANDS.has(response.score.performanceBand))) throw new Error(INVALID_LEARNING_SESSION_RESULT);
	if ((response.score.percentage === null) !== (response.score.performanceBand === "not-assessed")) throw new Error(INVALID_LEARNING_SESSION_RESULT);
}

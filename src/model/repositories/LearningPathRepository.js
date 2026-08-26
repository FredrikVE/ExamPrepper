// src/model/repositories/LearningPathRepository.js
import { QUESTION_TYPES } from "../../constants/QuestionTypes.js";

const INVALID_LEARNING_PATH_RESPONSE = "Invalid learning path response";
const INVALID_LEARNING_SESSION_RESPONSE = "Invalid learning session response";
const INVALID_LEARNING_SESSION_RESULT = "Invalid learning session result";
const NOT_ASSESSED = "not-assessed";
const SESSION_STATUSES = new Set(["completed", "current", "available", "locked"]);
const CHAPTER_TEST_STATUSES = new Set(["available", "locked"]);
const ASSESSMENT_BANDS = new Set(["practice", "progress", "understood"]);

export default class LearningPathRepository {
	#learningPathDataSource;
	#learningPathResponsePromisesByKey = new Map();
	#learningSessionResponsePromisesById = new Map();

	constructor(learningPathDataSource) {
		this.#learningPathDataSource = learningPathDataSource;
	}

	async getLearningPath({ subjectId, language }) {
		const cacheKey = `${subjectId}:${language}`;
		let responsePromise = this.#learningPathResponsePromisesByKey.get(cacheKey);

		if (responsePromise === undefined) {
			responsePromise = this.#learningPathDataSource.fetchLearningPath({ subjectId, language });
			this.#learningPathResponsePromisesByKey.set(cacheKey, responsePromise);
		}

		try {
			return this.#toLearningPath(await responsePromise);
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
			const response = await this.#learningPathDataSource.fetchStartLearningSession(command);

			this.#learningSessionResponsePromisesById.set(
				response.sessionId,
				Promise.resolve(response)
			);

			return this.#toLearningSession(response);
		}
		finally {
			this.#learningPathResponsePromisesByKey.clear();
		}
	}

	async getLearningSession(sessionId) {
		let responsePromise = this.#learningSessionResponsePromisesById.get(sessionId);

		if (responsePromise === undefined) {
			responsePromise = this.#learningPathDataSource.fetchLearningSession(sessionId);
			this.#learningSessionResponsePromisesById.set(sessionId, responsePromise);
		}

		try {
			return this.#toLearningSession(await responsePromise);
		}
		catch (error) {
			if (this.#learningSessionResponsePromisesById.get(sessionId) === responsePromise) {
				this.#learningSessionResponsePromisesById.delete(sessionId);
			}

			throw error;
		}
	}

	async submitLearningSession({ sessionId, answers }) {
		try {
			return this.#toLearningSessionResult(
				await this.#learningPathDataSource.fetchSubmitLearningSession({
					sessionId,
					answers
				})
			);
		}
		finally {
			this.#learningSessionResponsePromisesById.delete(sessionId);
			this.#learningPathResponsePromisesByKey.clear();
		}
	}

	clearUserState() {
		this.#learningSessionResponsePromisesById.clear();
		this.#learningPathResponsePromisesByKey.clear();
	}

	#toLearningPath(response) {
		if (
			!this.#isObject(response)
			|| typeof response.subjectId !== "string"
			|| !this.#isNullableString(response.activeModuleId)
			|| !Array.isArray(response.modules)
			|| !this.#isObject(response.examGate)
			|| typeof response.examGate.isUnlocked !== "boolean"
		) {
			this.#throwInvalidLearningPath();
		}

		return {
			subjectId: response.subjectId,
			activeModuleId: response.activeModuleId,
			resumableSession: this.#toResumableSession(response.resumableSession),
			nextActivity: this.#toNextActivity(response.nextActivity),
			modules: response.modules.map((module) => this.#toLearningModule(module)),
			examGate: {
				isUnlocked: response.examGate.isUnlocked
			}
		};
	}

	#toLearningModule(module) {
		if (
			!this.#isObject(module)
			|| typeof module.id !== "string"
			|| typeof module.moduleKey !== "string"
			|| !Number.isInteger(module.position)
			|| typeof module.title !== "string"
			|| typeof module.description !== "string"
			|| typeof module.isReplayAvailable !== "boolean"
			|| !Array.isArray(module.topics)
			|| !Array.isArray(module.sections)
		) {
			this.#throwInvalidLearningPath();
		}

		return {
			id: module.id,
			moduleKey: module.moduleKey,
			position: module.position,
			title: module.title,
			description: module.description,
			isReplayAvailable: module.isReplayAvailable,
			availability: this.#toAvailability(module.availability),
			topics: module.topics.map((topic) => this.#toTopic(topic)),
			progress: this.#toModuleProgress(module.progress),
			currentRun: this.#toCurrentRun(module.currentRun),
			sections: module.sections.map((section) => this.#toSection(section))
		};
	}

	#toAvailability(availability) {
		if (
			!this.#isObject(availability)
			|| typeof availability.isUnlocked !== "boolean"
			|| typeof availability.isCurrent !== "boolean"
			|| !this.#isNullableString(availability.lockReason)
		) {
			this.#throwInvalidLearningPath();
		}

		return {
			isUnlocked: availability.isUnlocked,
			isCurrent: availability.isCurrent,
			lockReason: availability.lockReason
		};
	}

	#toTopic(topic) {
		if (
			!this.#isObject(topic)
			|| typeof topic.key !== "string"
			|| typeof topic.label !== "string"
		) {
			this.#throwInvalidLearningPath();
		}

		return {
			key: topic.key,
			label: topic.label
		};
	}

	#toModuleProgress(progress) {
		if (
			!this.#isObject(progress)
			|| !Number.isInteger(progress.completedSessions)
			|| !Number.isInteger(progress.totalSessions)
			|| !Number.isFinite(progress.completionPercent)
			|| typeof progress.isComplete !== "boolean"
			|| !this.#isValidPerformancePair(progress.performancePercent, progress.performanceBand)
			|| !this.#isNullableNumber(progress.coveragePercent)
			|| !this.#isNullableString(progress.lastSessionAt)
		) {
			this.#throwInvalidLearningPath();
		}

		return {
			completedSessions: progress.completedSessions,
			totalSessions: progress.totalSessions,
			completionPercent: progress.completionPercent,
			isComplete: progress.isComplete,
			performancePercent: progress.performancePercent,
			performanceBand: progress.performanceBand,
			coveragePercent: progress.coveragePercent,
			lastSessionAt: progress.lastSessionAt
		};
	}

	#toCurrentRun(currentRun) {
		if (currentRun === null) {
			return null;
		}

		if (
			!this.#isObject(currentRun)
			|| !Number.isInteger(currentRun.completedSessions)
			|| !Number.isInteger(currentRun.totalSessions)
		) {
			this.#throwInvalidLearningPath();
		}

		return {
			completedSessions: currentRun.completedSessions,
			totalSessions: currentRun.totalSessions
		};
	}

	#toSection(section) {
		if (
			!this.#isObject(section)
			|| typeof section.id !== "string"
			|| typeof section.sectionKey !== "string"
			|| typeof section.chapterKey !== "string"
			|| !Number.isInteger(section.position)
			|| typeof section.label !== "string"
			|| !Array.isArray(section.sessions)
			|| !Array.isArray(section.chapterTests)
		) {
			this.#throwInvalidLearningPath();
		}

		return {
			id: section.id,
			sectionKey: section.sectionKey,
			chapterKey: section.chapterKey,
			position: section.position,
			label: section.label,
			progress: this.#toSectionProgress(section.progress),
			sessions: section.sessions.map((session) => this.#toRoadmapSession(session)),
			chapterTests: section.chapterTests.map((chapterTest) => this.#toChapterTest(chapterTest))
		};
	}

	#toSectionProgress(progress) {
		if (
			!this.#isObject(progress)
			|| !Number.isInteger(progress.completedSessions)
			|| !Number.isInteger(progress.totalSessions)
			|| !Number.isFinite(progress.completionPercent)
			|| typeof progress.isComplete !== "boolean"
		) {
			this.#throwInvalidLearningPath();
		}

		return {
			completedSessions: progress.completedSessions,
			totalSessions: progress.totalSessions,
			completionPercent: progress.completionPercent,
			isComplete: progress.isComplete
		};
	}

	#toRoadmapSession(session) {
		if (
			!this.#isObject(session)
			|| typeof session.planKey !== "string"
			|| !Number.isInteger(session.position)
			|| !Number.isInteger(session.questionCount)
			|| typeof session.isStartable !== "boolean"
			|| !SESSION_STATUSES.has(session.status)
			|| !this.#isValidPerformancePair(session.performancePercent, session.performanceBand)
		) {
			this.#throwInvalidLearningPath();
		}

		return {
			planKey: session.planKey,
			position: session.position,
			questionCount: session.questionCount,
			status: session.status,
			performancePercent: session.performancePercent,
			performanceBand: session.performanceBand,
			isStartable: session.isStartable
		};
	}

	#toChapterTest(chapterTest) {
		if (
			!this.#isObject(chapterTest)
			|| typeof chapterTest.id !== "string"
			|| !Number.isInteger(chapterTest.position)
			|| !CHAPTER_TEST_STATUSES.has(chapterTest.status)
			|| !this.#isValidPerformancePair(chapterTest.performancePercent, chapterTest.performanceBand)
		) {
			this.#throwInvalidLearningPath();
		}

		return {
			id: chapterTest.id,
			position: chapterTest.position,
			status: chapterTest.status,
			performancePercent: chapterTest.performancePercent,
			performanceBand: chapterTest.performanceBand
		};
	}

	#toResumableSession(session) {
		if (session === null) {
			return null;
		}

		if (
			!this.#isObject(session)
			|| typeof session.sessionId !== "string"
			|| typeof session.moduleId !== "string"
			|| !this.#isNullableString(session.planKey)
			|| !this.#isNullableString(session.sectionId)
			|| !Number.isInteger(session.currentQuestionPosition)
			|| !Number.isInteger(session.questionCount)
		) {
			this.#throwInvalidLearningPath();
		}

		return {
			sessionId: session.sessionId,
			moduleId: session.moduleId,
			planKey: session.planKey,
			sectionId: session.sectionId,
			currentQuestionPosition: session.currentQuestionPosition,
			questionCount: session.questionCount
		};
	}

	#toNextActivity(activity) {
		if (activity === null) {
			return null;
		}

		if (!this.#isObject(activity) || typeof activity.moduleId !== "string") {
			this.#throwInvalidLearningPath();
		}

		if (activity.kind === "resume-session") {
			if (typeof activity.sessionId !== "string") {
				this.#throwInvalidLearningPath();
			}

			return {
				kind: activity.kind,
				moduleId: activity.moduleId,
				sessionId: activity.sessionId
			};
		}

		if (activity.kind === "start-authored-session") {
			if (
				typeof activity.sectionId !== "string"
				|| typeof activity.sectionKey !== "string"
				|| typeof activity.planKey !== "string"
				|| !Number.isInteger(activity.sessionPosition)
				|| !Number.isInteger(activity.questionCount)
			) {
				this.#throwInvalidLearningPath();
			}

			return {
				kind: activity.kind,
				moduleId: activity.moduleId,
				sectionId: activity.sectionId,
				sectionKey: activity.sectionKey,
				planKey: activity.planKey,
				sessionPosition: activity.sessionPosition,
				questionCount: activity.questionCount
			};
		}

		if (activity.kind === "chapter-test") {
			if (typeof activity.sectionId !== "string" || typeof activity.baseId !== "string") {
				this.#throwInvalidLearningPath();
			}

			return {
				kind: activity.kind,
				moduleId: activity.moduleId,
				sectionId: activity.sectionId,
				baseId: activity.baseId
			};
		}

		this.#throwInvalidLearningPath();
	}

	#toLearningSession(response) {
		if (
			!this.#isObject(response)
			|| typeof response.sessionId !== "string"
			|| typeof response.moduleId !== "string"
			|| !Number.isInteger(response.modulePosition)
			|| typeof response.moduleTitle !== "string"
			|| !this.#isNullableString(response.planKey)
			|| !this.#isNullableString(response.sectionId)
			|| !Number.isInteger(response.questionCount)
			|| !Array.isArray(response.questions)
		) {
			throw new Error(INVALID_LEARNING_SESSION_RESPONSE);
		}

		return {
			sessionId: response.sessionId,
			moduleId: response.moduleId,
			modulePosition: response.modulePosition,
			moduleTitle: response.moduleTitle,
			planKey: response.planKey,
			sectionId: response.sectionId,
			questionCount: response.questionCount,
			questions: response.questions.map((entry) => this.#toLearningSessionQuestion(entry))
		};
	}

	#toLearningSessionQuestion(entry) {
		if (
			!this.#isObject(entry)
			|| typeof entry.sessionQuestionId !== "string"
			|| !Number.isInteger(entry.position)
			|| !this.#isObject(entry.question)
		) {
			throw new Error(INVALID_LEARNING_SESSION_RESPONSE);
		}

		return {
			sessionQuestionId: entry.sessionQuestionId,
			position: entry.position,
			question: this.#toPracticeQuestion(entry.question)
		};
	}

	#toPracticeQuestion(question) {
		if (question.type === QUESTION_TYPES.FILL) {
			if (!Array.isArray(question.acceptedAnswers)) {
				throw new Error(`Invalid canonical practice question ${String(question.id)}: fill requires acceptedAnswers`);
			}

			return {
				...question,
				acceptedAnswers: [...question.acceptedAnswers]
			};
		}

		if (question.type === QUESTION_TYPES.SINGLE || question.type === QUESTION_TYPES.MULTI) {
			if (!Array.isArray(question.options)) {
				throw new Error(`Invalid canonical practice question ${String(question.id)}: ${question.type} requires options`);
			}

			return {
				...question,
				options: question.options.map((option) => this.#toPracticeAnswerOption(question, option))
			};
		}

		return { ...question };
	}

	#toPracticeAnswerOption(question, option) {
		if (typeof option.isCorrect !== "boolean") {
			throw new Error(`Invalid canonical practice question ${String(question.id)}: option ${String(option.id)} requires isCorrect`);
		}

		return { ...option };
	}

	#toLearningSessionResult(response) {
		if (
			!this.#isObject(response)
			|| typeof response.sessionId !== "string"
			|| response.status !== "completed"
			|| !this.#isObject(response.score)
			|| !Number.isFinite(response.score.earnedPoints)
			|| !Number.isFinite(response.score.availablePoints)
			|| !this.#isValidPerformancePair(response.score.percentage, response.score.performanceBand)
		) {
			throw new Error(INVALID_LEARNING_SESSION_RESULT);
		}

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

	#isValidPerformancePair(percentage, performanceBand) {
		if (percentage === null) {
			return performanceBand === NOT_ASSESSED;
		}

		return Number.isFinite(percentage)
			&& percentage >= 0
			&& percentage <= 100
			&& ASSESSMENT_BANDS.has(performanceBand);
	}

	#isNullableString(value) {
		return value === null || typeof value === "string";
	}

	#isNullableNumber(value) {
		return value === null || Number.isFinite(value);
	}

	#isObject(value) {
		return value !== null && typeof value === "object";
	}

	#throwInvalidLearningPath() {
		throw new Error(INVALID_LEARNING_PATH_RESPONSE);
	}
}

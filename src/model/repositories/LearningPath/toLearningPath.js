// src/model/repositories/LearningPath/toLearningPath.js
const INVALID_LEARNING_PATH_RESPONSE = "Invalid learning path response";
const NOT_ASSESSED = "not-assessed";
const ACTIVITY_KINDS = new Set(["authored", "review", "repair", "coverage", "legacy-round"]);
const ADAPTIVE_ACTIVITY_KINDS = new Set(["review", "repair", "coverage"]);
const SESSION_STATUSES = new Set(["completed", "current", "available", "locked"]);
const CHAPTER_TEST_STATUSES = new Set(["available", "locked"]);
const ASSESSMENT_BANDS = new Set(["practice", "progress", "understood"]);

export default function toLearningPath(response) {
	validateLearningPathResponse(response);

	return {
		subjectId: response.subjectId,
		activeModuleId: response.activeModuleId,
		resumableSession: toResumableSession(response.resumableSession),
		nextActivity: toNextActivity(response.nextActivity),
		modules: response.modules.map(toLearningModule),
		examGate: {
			isUnlocked: response.examGate.isUnlocked
		}
	};
}

function validateLearningPathResponse(response) {
	if (!response || typeof response.subjectId !== "string" || !isNullableString(response.activeModuleId) || !isValidResumableSession(response.resumableSession) || !isValidNextActivity(response.nextActivity) || !Array.isArray(response.modules) || !isValidExamGate(response.examGate)) {

		throw new Error(INVALID_LEARNING_PATH_RESPONSE);

	}

	for (const module of response.modules) {
		if (!isValidLearningModule(module)) {

			throw new Error(INVALID_LEARNING_PATH_RESPONSE);

		}
	}
}

function isValidLearningModule(module) {
	if (!module || typeof module.id !== "string" || typeof module.moduleKey !== "string" || !Number.isInteger(module.position) || typeof module.title !== "string" || typeof module.description !== "string" || !module.availability || typeof module.availability.isUnlocked !== "boolean" || typeof module.availability.isCurrent !== "boolean" || !isNullableString(module.availability.lockReason) || !Array.isArray(module.topics) || !isValidModuleProgress(module.progress) || !isValidModuleRunProgress(module.currentRun) || !Array.isArray(module.sections)) {
		return false;
	}

	return module.topics.every(isValidTopic) && module.sections.every(isValidSection);
}

function isValidTopic(topic) {
	return Boolean(topic && typeof topic.key === "string" && typeof topic.label === "string" && (topic.masteryPercent === null || Number.isFinite(topic.masteryPercent)));
}

function isValidModuleRunProgress(progress) {
	return progress === null || Boolean(progress && Number.isInteger(progress.completedSessions) && Number.isInteger(progress.totalSessions));
}

function isValidModuleProgress(progress) {
	return Boolean(progress && Number.isInteger(progress.completedSessions) && Number.isInteger(progress.totalSessions) && Number.isFinite(progress.completionPercent) && isValidPerformancePair(progress.performancePercent, progress.performanceBand) && isNullableNumber(progress.coveragePercent) && isNullableString(progress.lastSessionAt));
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
	if (activity === null) {
		return true;
	}

	if (!activity || typeof activity.moduleId !== "string") {
		return false;
	}

	if (activity.kind === "resume-session") {
		return typeof activity.sessionId === "string";
	}

	if (activity.kind === "start-authored-session") {
		return typeof activity.sectionId === "string" && typeof activity.sectionKey === "string" && typeof activity.planKey === "string" && Number.isInteger(activity.sessionPosition) && Number.isInteger(activity.questionCount);
	}

	if (activity.kind === "start-adaptive-session") {
		return ADAPTIVE_ACTIVITY_KINDS.has(activity.activityKind) && Number.isInteger(activity.questionCount);
	}

	if (activity.kind === "chapter-test") {
		return typeof activity.sectionId === "string" && typeof activity.baseId === "string";
	}

	return false;
}

function isValidExamGate(examGate) {
	return Boolean(examGate && typeof examGate.isUnlocked === "boolean");
}

function isNullableString(value) {
	return value === null || typeof value === "string";
}

function isNullableNumber(value) {
	return value === null || Number.isFinite(value);
}

function toLearningModule(module) {
	return {
		id: module.id,
		moduleKey: module.moduleKey,
		position: module.position,
		title: module.title,
		description: module.description,
		availability: {
			isUnlocked: module.availability.isUnlocked,
			isCurrent: module.availability.isCurrent,
			lockReason: module.availability.lockReason
		},
		topics: module.topics.map(toTopic),
		progress: toModuleProgress(module.progress),
		currentRun: toCurrentRun(module.currentRun),
		sections: module.sections.map(toSection)
	};
}

function toTopic(topic) {
	return {
		key: topic.key,
		label: topic.label,
		masteryPercent: topic.masteryPercent
	};
}

function toModuleProgress(progress) {
	return {
		completedSessions: progress.completedSessions,
		totalSessions: progress.totalSessions,
		completionPercent: progress.completionPercent,
		performancePercent: progress.performancePercent,
		performanceBand: progress.performanceBand,
		coveragePercent: progress.coveragePercent,
		lastSessionAt: progress.lastSessionAt
	};
}

function toCurrentRun(currentRun) {
	if (currentRun === null) {
		return null;
	}

	return {
		completedSessions: currentRun.completedSessions,
		totalSessions: currentRun.totalSessions
	};
}

function toSection(section) {
	return {
		id: section.id,
		sectionKey: section.sectionKey,
		chapterKey: section.chapterKey,
		position: section.position,
		label: section.label,
		progress: {
			completedSessions: section.progress.completedSessions,
			totalSessions: section.progress.totalSessions,
			completionPercent: section.progress.completionPercent
		},
		sessions: section.sessions.map(toRoadmapSession),
		chapterTests: section.chapterTests.map(toChapterTest)
	};
}

function toRoadmapSession(session) {
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

function toChapterTest(chapterTest) {
	return {
		baseId: chapterTest.baseId,
		position: chapterTest.position,
		status: chapterTest.status
	};
}

function toResumableSession(session) {
	if (session === null) {
		return null;
	}

	return {
		sessionId: session.sessionId,
		moduleId: session.moduleId,
		activityKind: session.activityKind,
		planKey: session.planKey,
		sectionId: session.sectionId,
		currentQuestionPosition: session.currentQuestionPosition,
		questionCount: session.questionCount
	};
}

function toNextActivity(activity) {
	if (activity === null) {
		return null;
	}

	if (activity.kind === "resume-session") {
		return {
			kind: activity.kind,
			moduleId: activity.moduleId,
			sessionId: activity.sessionId
		};
	}

	if (activity.kind === "start-authored-session") {
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

	if (activity.kind === "start-adaptive-session") {
		return {
			kind: activity.kind,
			moduleId: activity.moduleId,
			activityKind: activity.activityKind,
			questionCount: activity.questionCount
		};
	}

	return {
		kind: activity.kind,
		moduleId: activity.moduleId,
		sectionId: activity.sectionId,
		baseId: activity.baseId
	};
}

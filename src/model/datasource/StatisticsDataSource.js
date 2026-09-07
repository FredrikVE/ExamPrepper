// src/model/datasource/StatisticsDataSource.js
import DataSource from "./DataSource.js";

export default class StatisticsDataSource extends DataSource {
	async fetchSubjectStatistics(subjectId) {
		const payload = await this.get(`/subjects/${encodeURIComponent(subjectId)}/statistics`);

		validateSubjectStatistics(payload);

		return payload;
	}
}

function validateSubjectStatistics(payload) {
	requireObject(payload, "statistics payload");
	requireString(payload.subjectId, "statistics subjectId");
	requireArray(payload.attempts, "statistics attempts");
	requireArray(payload.chapters, "statistics chapters");

	for (const attempt of payload.attempts) {
		validateAttempt(attempt);
	}

	for (const chapter of payload.chapters) {
		validateChapter(chapter);
	}
}

function validateAttempt(attempt) {
	requireObject(attempt, "statistics attempt");
	requireString(attempt.attemptId, "statistics attemptId");
	requireString(attempt.examId, "statistics examId");
	requireString(attempt.baseId, "statistics baseId");
	requireString(attempt.testType, "statistics testType");
	requireString(attempt.title, "statistics title");
	requireString(attempt.submittedAt, "statistics submittedAt");
	requireNumber(attempt.scorePoints, "statistics scorePoints");
	requireNumber(attempt.totalPoints, "statistics totalPoints");
	requireNullableNumber(attempt.percentage, "statistics percentage");
	requireNumber(attempt.correctCount, "statistics correctCount");
	requireNumber(attempt.incorrectCount, "statistics incorrectCount");
	requireNumber(attempt.durationSeconds, "statistics durationSeconds");
}

function validateChapter(chapter) {
	requireObject(chapter, "statistics chapter");
	requireString(chapter.topicAreaKey, "statistics topicAreaKey");
	requireString(chapter.labelNo, "statistics labelNo");
	requireString(chapter.labelEn, "statistics labelEn");
	requireNullableString(chapter.iconKey, "statistics iconKey");
	requireNumber(chapter.position, "statistics position");
	requireNullableNumber(chapter.scorePercentage, "statistics scorePercentage");
	requireNumber(chapter.evidenceCount, "statistics evidenceCount");
}

function requireObject(value, fieldName) {
	if (value === null || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`Invalid ${fieldName}`);
	}
}

function requireArray(value, fieldName) {
	if (!Array.isArray(value)) {
		throw new Error(`Invalid ${fieldName}`);
	}
}

function requireString(value, fieldName) {
	if (typeof value !== "string") {
		throw new Error(`Invalid ${fieldName}`);
	}
}

function requireNullableString(value, fieldName) {
	if (value !== null) {
		requireString(value, fieldName);
	}
}

function requireNumber(value, fieldName) {
	if (typeof value !== "number" || !Number.isFinite(value)) {
		throw new Error(`Invalid ${fieldName}`);
	}
}

function requireNullableNumber(value, fieldName) {
	if (value !== null) {
		requireNumber(value, fieldName);
	}
}

// src/model/datasource/StatisticsDataSource.js
import { ASSESSMENT_BAND_VALUES, NOT_ASSESSED_BAND } from "../../constants/AssessmentBands.js";
import { STATISTICS_PERIODS } from "../../constants/StatisticsContracts.js";
import DataSource from "./DataSource.js";

const STATISTICS_PERIOD_VALUES = Object.freeze(Object.values(STATISTICS_PERIODS));

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
	requireNumber(payload.completedAttemptCount, "statistics completedAttemptCount");
	requireArray(payload.developmentPeriods, "statistics developmentPeriods");
	requireArray(payload.attempts, "statistics attempts");
	requireArray(payload.chapters, "statistics chapters");
	validateDevelopmentPeriods(payload.developmentPeriods);

	for (const attempt of payload.attempts) {
		validateAttempt(attempt);
	}

	for (const chapter of payload.chapters) {
		validateChapter(chapter);
	}
}

function validateDevelopmentPeriods(periods) {
	const seenPeriods = new Set();

	for (const developmentPeriod of periods) {
		validateDevelopmentPeriod(developmentPeriod);

		if (seenPeriods.has(developmentPeriod.period)) {
			throw new Error(`Invalid duplicate statistics period ${developmentPeriod.period}`);
		}

		seenPeriods.add(developmentPeriod.period);
	}

	for (const period of STATISTICS_PERIOD_VALUES) {
		if (!seenPeriods.has(period)) {
			throw new Error(`Missing statistics period ${period}`);
		}
	}
}

function validateDevelopmentPeriod(developmentPeriod) {
	requireObject(developmentPeriod, "statistics development period");
	requireStatisticsPeriod(developmentPeriod.period);
	requireNullableNumber(developmentPeriod.averageScorePercentage, "statistics averageScorePercentage");
	requireNullableNumber(developmentPeriod.progressPercentagePoints, "statistics progressPercentagePoints");
	requireArray(developmentPeriod.chartPoints, "statistics chartPoints");

	for (const chartPoint of developmentPeriod.chartPoints) {
		validateChartPoint(chartPoint);
	}
}

function validateChartPoint(chartPoint) {
	requireObject(chartPoint, "statistics chart point");
	requireString(chartPoint.attemptId, "statistics chart attemptId");
	requireString(chartPoint.submittedAt, "statistics chart submittedAt");
	requireNumber(chartPoint.percentage, "statistics chart percentage");
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
	requireAssessmentBand(attempt.percentage, attempt.performanceBand, "statistics attempt performanceBand");
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
	requireAssessmentBand(chapter.scorePercentage, chapter.performanceBand, "statistics chapter performanceBand");
	requireNumber(chapter.evidenceCount, "statistics evidenceCount");
}

function requireAssessmentBand(percentage, performanceBand, fieldName) {
	requireString(performanceBand, fieldName);

	if (percentage === null) {
		if (performanceBand !== NOT_ASSESSED_BAND) {
			throw new Error(`Invalid ${fieldName}`);
		}

		return;
	}

	if (!ASSESSMENT_BAND_VALUES.includes(performanceBand)) {
		throw new Error(`Invalid ${fieldName}`);
	}
}

function requireStatisticsPeriod(period) {
	if (!STATISTICS_PERIOD_VALUES.includes(period)) {
		throw new Error(`Invalid statistics period ${String(period)}`);
	}
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

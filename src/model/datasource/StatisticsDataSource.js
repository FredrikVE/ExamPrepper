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
	validateMasteryScope(payload.subjectMastery, "statistics subjectMastery");
	requireArray(payload.attempts, "statistics attempts");
	requireArray(payload.chapters, "statistics chapters");

	for (const attempt of payload.attempts) {
		validateAttempt(attempt);
	}

	for (const chapter of payload.chapters) {
		validateChapter(chapter);
	}
}

function validateMasteryScope(scope, fieldName) {
	requireObject(scope, fieldName);
	requireNullableNumber(scope.masteryPercentage, `${fieldName} masteryPercentage`);
	requireAssessmentBand(scope.masteryPercentage, scope.performanceBand, `${fieldName} performanceBand`);
	requireArray(scope.developmentPeriods, `${fieldName} developmentPeriods`);
	validateDevelopmentPeriods(scope.developmentPeriods);
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
	requireNullableString(developmentPeriod.windowStartAt, "statistics windowStartAt");
	requireString(developmentPeriod.windowEndAt, "statistics windowEndAt");
	requireNullableNumber(developmentPeriod.progressPercentagePoints, "statistics progressPercentagePoints");
	requireNonNegativeInteger(developmentPeriod.progressEvidenceCount, "statistics progressEvidenceCount");
	requireArray(developmentPeriod.chartPoints, "statistics chartPoints");

	for (const chartPoint of developmentPeriod.chartPoints) {
		validateChartPoint(chartPoint);
	}
}

function validateChartPoint(chartPoint) {
	requireObject(chartPoint, "statistics chart point");
	requireString(chartPoint.key, "statistics chart key");
	requireString(chartPoint.occurredAt, "statistics chart occurredAt");
	requireNumber(chartPoint.percentage, "statistics chart percentage");
	requirePositiveInteger(chartPoint.evidenceCount, "statistics chart evidenceCount");
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
	validateMasteryScope(chapter, "statistics chapter");
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

function requireNonNegativeInteger(value, fieldName) {
	requireNumber(value, fieldName);

	if (!Number.isInteger(value) || value < 0) {
		throw new Error(`Invalid ${fieldName}`);
	}
}

function requirePositiveInteger(value, fieldName) {
	requireNonNegativeInteger(value, fieldName);

	if (value === 0) {
		throw new Error(`Invalid ${fieldName}`);
	}
}

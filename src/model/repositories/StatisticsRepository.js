// src/model/repositories/StatisticsRepository.js
export default class StatisticsRepository {
	constructor(statisticsDataSource) {
		this.statisticsDataSource = statisticsDataSource;
	}

	async getSubjectStatistics(subjectId) {
		const dto = await this.statisticsDataSource.fetchSubjectStatistics(subjectId);
		const attempts = [];
		const chapters = [];

		for (const attempt of dto.attempts) {
			attempts.push(mapAttempt(attempt));
		}

		for (const chapter of dto.chapters) {
			chapters.push(mapChapter(chapter));
		}

		return {
			subjectId: dto.subjectId,
			completedAttemptCount: dto.completedAttemptCount,
			subjectMastery: mapMasteryScope(dto.subjectMastery),
			attempts,
			chapters
		};
	}
}

function mapMasteryScope(scope) {
	return {
		masteryPercentage: scope.masteryPercentage,
		performanceBand: scope.performanceBand,
		developmentPeriods: mapDevelopmentPeriods(scope.developmentPeriods)
	};
}

function mapChapter(chapter) {
	return {
		topicAreaKey: chapter.topicAreaKey,
		labelNo: chapter.labelNo,
		labelEn: chapter.labelEn,
		iconKey: chapter.iconKey,
		position: chapter.position,
		masteryPercentage: chapter.masteryPercentage,
		performanceBand: chapter.performanceBand,
		developmentPeriods: mapDevelopmentPeriods(chapter.developmentPeriods)
	};
}

function mapAttempt(attempt) {
	return {
		attemptId: attempt.attemptId,
		examId: attempt.examId,
		baseId: attempt.baseId,
		testType: attempt.testType,
		title: attempt.title,
		submittedAt: attempt.submittedAt,
		submittedAtEpochMs: parseStatisticsTimestamp(attempt.submittedAt),
		scorePoints: attempt.scorePoints,
		totalPoints: attempt.totalPoints,
		percentage: attempt.percentage,
		performanceBand: attempt.performanceBand,
		correctCount: attempt.correctCount,
		incorrectCount: attempt.incorrectCount,
		durationSeconds: attempt.durationSeconds
	};
}

function mapDevelopmentPeriods(developmentPeriods) {
	const mappedPeriods = [];

	for (const developmentPeriod of developmentPeriods) {
		mappedPeriods.push(mapDevelopmentPeriod(developmentPeriod));
	}

	return mappedPeriods;
}

function mapDevelopmentPeriod(developmentPeriod) {
	const chartPoints = [];

	if (developmentPeriod.windowStartAt !== null) {
		parseStatisticsTimestamp(developmentPeriod.windowStartAt);
	}

	parseStatisticsTimestamp(developmentPeriod.windowEndAt);

	for (const chartPoint of developmentPeriod.chartPoints) {
		chartPoints.push({
			key: chartPoint.key,
			occurredAt: chartPoint.occurredAt,
			occurredAtEpochMs: parseStatisticsTimestamp(chartPoint.occurredAt),
			percentage: chartPoint.percentage,
			evidenceCount: chartPoint.evidenceCount
		});
	}

	return {
		period: developmentPeriod.period,
		windowStartAt: developmentPeriod.windowStartAt,
		windowEndAt: developmentPeriod.windowEndAt,
		progressPercentagePoints: developmentPeriod.progressPercentagePoints,
		progressEvidenceCount: developmentPeriod.progressEvidenceCount,
		chartPoints
	};
}

function parseStatisticsTimestamp(timestamp) {
	const epochMs = Date.parse(timestamp);

	if (!Number.isFinite(epochMs)) {
		throw new Error("Invalid statistics timestamp");
	}

	return epochMs;
}

// src/model/repositories/StatisticsRepository.js
export default class StatisticsRepository {
	constructor(statisticsDataSource) {
		this.statisticsDataSource = statisticsDataSource;
	}

	async getSubjectStatistics(subjectId) {
		const dto = await this.statisticsDataSource.fetchSubjectStatistics(subjectId);
		const attempts = [];
		const developmentPeriods = [];
		const chapters = [];

		for (const attempt of dto.attempts) {
			attempts.push(mapAttempt(attempt));
		}

		for (const developmentPeriod of dto.developmentPeriods) {
			developmentPeriods.push(mapDevelopmentPeriod(developmentPeriod));
		}

		for (const chapter of dto.chapters) {
			chapters.push(mapChapter(chapter));
		}

		return {
			subjectId: dto.subjectId,
			completedAttemptCount: dto.completedAttemptCount,
			developmentPeriods,
			attempts,
			chapters
		};
	}
}

function mapChapter(chapter) {
	return {
		topicAreaKey: chapter.topicAreaKey,
		labelNo: chapter.labelNo,
		labelEn: chapter.labelEn,
		iconKey: chapter.iconKey,
		position: chapter.position,
		masteryPercentage: chapter.masteryPercentage,
		performanceBand: chapter.performanceBand
	};
}

function mapAttempt(attempt) {
	return {
		...attempt,
		submittedAtEpochMs: parseStatisticsTimestamp(attempt.submittedAt)
	};
}

function mapDevelopmentPeriod(developmentPeriod) {
	const chartPoints = [];

	if (developmentPeriod.windowStartAt !== null) {
		parseStatisticsTimestamp(developmentPeriod.windowStartAt);
	}

	parseStatisticsTimestamp(developmentPeriod.windowEndAt);

	for (const chartPoint of developmentPeriod.chartPoints) {
		chartPoints.push({
			...chartPoint,
			submittedAtEpochMs: parseStatisticsTimestamp(chartPoint.submittedAt)
		});
	}

	return {
		...developmentPeriod,
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

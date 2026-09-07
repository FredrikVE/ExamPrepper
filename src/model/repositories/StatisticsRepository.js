// src/model/repositories/StatisticsRepository.js
export default class StatisticsRepository {
	constructor(statisticsDataSource) {
		this.statisticsDataSource = statisticsDataSource;
	}

	async getSubjectStatistics(subjectId) {
		const dto = await this.statisticsDataSource.fetchSubjectStatistics(subjectId);
		const attempts = [];
		const developmentPeriods = [];

		for (const attempt of dto.attempts) {
			attempts.push(mapAttempt(attempt));
		}

		for (const developmentPeriod of dto.developmentPeriods) {
			developmentPeriods.push(mapDevelopmentPeriod(developmentPeriod));
		}

		return {
			subjectId: dto.subjectId,
			completedAttemptCount: dto.completedAttemptCount,
			developmentPeriods,
			attempts,
			chapters: dto.chapters
		};
	}
}

function mapAttempt(attempt) {
	return {
		...attempt,
		submittedAtEpochMs: parseStatisticsTimestamp(attempt.submittedAt)
	};
}

function mapDevelopmentPeriod(developmentPeriod) {
	const chartPoints = [];

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

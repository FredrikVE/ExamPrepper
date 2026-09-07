// src/model/repositories/StatisticsRepository.js
export default class StatisticsRepository {
	constructor(statisticsDataSource) {
		this.statisticsDataSource = statisticsDataSource;
	}

	async getSubjectStatistics(subjectId) {
		const dto = await this.statisticsDataSource.fetchSubjectStatistics(subjectId);
		const attempts = [];

		for (const attempt of dto.attempts) {
			const submittedAtEpochMs = Date.parse(attempt.submittedAt);

			if (!Number.isFinite(submittedAtEpochMs)) {
				throw new Error("Invalid statistics timestamp");
			}

			attempts.push({ ...attempt, submittedAtEpochMs });
		}

		return {
			subjectId: dto.subjectId,
			attempts,
			chapters: dto.chapters
		};
	}
}

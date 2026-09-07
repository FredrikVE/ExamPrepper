// src/model/domain/statistics/GetSubjectStatisticsUseCase.js
export default class GetSubjectStatisticsUseCase {
	constructor(statisticsRepository) {
		this.statisticsRepository = statisticsRepository;
	}

	async execute({ subjectId }) {
		if (typeof subjectId !== "string" || subjectId.length === 0) {
			throw new Error("GetSubjectStatisticsUseCase requires subjectId");
		}

		return await this.statisticsRepository.getSubjectStatistics(subjectId);
	}
}

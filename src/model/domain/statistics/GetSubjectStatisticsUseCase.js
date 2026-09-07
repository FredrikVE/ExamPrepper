// src/model/domain/statistics/GetSubjectStatisticsUseCase.js
export default class GetSubjectStatisticsUseCase {
	constructor(statisticsRepository) {
		this.statisticsRepository = statisticsRepository;
	}

	async execute({ subjectId }) {
		if (!subjectId) {
			throw new Error("GetSubjectStatisticsUseCase requires subjectId");
		}

		return await this.statisticsRepository.getSubjectStatistics(subjectId);
	}
}

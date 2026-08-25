// src/model/domain/statistics/GetMyStatisticsUseCase.js
export default class GetMyStatisticsUseCase {
	constructor(examAttemptRepository) {
		this.examAttemptRepository = examAttemptRepository;
	}

	async execute() {
		return await this.examAttemptRepository.getMyStatistics();
	}
}

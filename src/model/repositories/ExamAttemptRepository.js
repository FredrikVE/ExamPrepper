// src/model/repositories/ExamAttemptRepository.js
export default class ExamAttemptRepository {
	constructor(examAttemptDataSource) {
		this.examAttemptDataSource = examAttemptDataSource;
	}

	async submitAttempt(command) {
		return await this.examAttemptDataSource.fetchSubmitAttempt(command);
	}

	async getAttemptById(attemptId) {
		return await this.examAttemptDataSource.fetchAttemptById(attemptId);
	}

	async getMyStatistics() {
		return await this.examAttemptDataSource.fetchMyStatistics();
	}
}

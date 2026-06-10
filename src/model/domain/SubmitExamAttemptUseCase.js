// src/model/domain/SubmitExamAttemptUseCase.js
export default class SubmitExamAttemptUseCase {
	constructor(examAttemptRepository) {
		this.examAttemptRepository = examAttemptRepository;
	}

	async execute(command) {
		return await this.examAttemptRepository.submitAttempt(command);
	}
}

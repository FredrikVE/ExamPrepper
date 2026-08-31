// src/model/domain/exams/SubmitExamAttemptUseCase.js
export default class SubmitExamAttemptUseCase {
	constructor(examAttemptRepository, learningPathRepository) {
		this.examAttemptRepository = examAttemptRepository;
		this.learningPathRepository = learningPathRepository;
	}

	async execute(command) {
		const attempt = await this.examAttemptRepository.submitAttempt(command);
		this.learningPathRepository.clearUserState();

		return attempt;
	}
}

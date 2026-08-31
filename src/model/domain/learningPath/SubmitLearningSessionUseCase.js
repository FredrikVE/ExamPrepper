// src/model/domain/learningPath/SubmitLearningSessionUseCase.js
export default class SubmitLearningSessionUseCase {
	#learningPathRepository;

	constructor(learningPathRepository) {
		this.#learningPathRepository = learningPathRepository;
	}

	execute(command) {
		return this.#learningPathRepository.submitLearningSession(command);
	}
}

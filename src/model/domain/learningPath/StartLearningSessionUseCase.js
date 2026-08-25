// src/model/domain/learningPath/StartLearningSessionUseCase.js
export default class StartLearningSessionUseCase {
	#learningPathRepository;

	constructor(learningPathRepository) {
		this.#learningPathRepository = learningPathRepository;
	}

	execute(command) {
		return this.#learningPathRepository.startLearningSession(command);
	}
}

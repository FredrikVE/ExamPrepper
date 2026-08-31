// src/model/domain/learningPath/GetLearningPathUseCase.js
export default class GetLearningPathUseCase {
	#learningPathRepository;

	constructor(learningPathRepository) {
		this.#learningPathRepository = learningPathRepository;
	}

	execute(input) {
		return this.#learningPathRepository.getLearningPath(input);
	}
}

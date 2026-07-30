//src/model/domain/GetLearningPathUseCase.js
export default class GetLearningPathUseCase {
	constructor(learningPathRepository) {
		this.learningPathRepository = learningPathRepository;
	}

	execute(input) {
		return this.learningPathRepository.getLearningPath(input);
	}
}

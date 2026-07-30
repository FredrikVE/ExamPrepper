//src/model/domain/SubmitLearningSessionUseCase.js
export default class SubmitLearningSessionUseCase {
	constructor(learningPathRepository) {
		this.learningPathRepository = learningPathRepository;
	}

	execute(command) {
		return this.learningPathRepository.submitLearningSession(command);
	}
}

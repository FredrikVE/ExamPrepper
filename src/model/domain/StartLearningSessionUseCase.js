//src/model/domain/StartLearningSessionUseCase.js
export default class StartLearningSessionUseCase {
	constructor(learningPathRepository) {
		this.learningPathRepository = learningPathRepository;
	}

	execute(command) {
		return this.learningPathRepository.startLearningSession(command);
	}
}

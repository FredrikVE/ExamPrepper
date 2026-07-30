//src/model/domain/GetLearningSessionUseCase.js
export default class GetLearningSessionUseCase {
	constructor(learningPathRepository) {
		this.learningPathRepository = learningPathRepository;
	}

	execute(sessionId) {
		return this.learningPathRepository.getLearningSession(sessionId);
	}
}

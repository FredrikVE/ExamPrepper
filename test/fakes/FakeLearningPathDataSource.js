//test/fakes/FakeLearningPathDataSource.js
export default class FakeLearningPathDataSource {
	constructor({ learningPathResponse, learningSessionResponse, submitSessionResponse }) {
		this.learningPathResponse = learningPathResponse;
		this.learningSessionResponse = learningSessionResponse;
		this.submitSessionResponse = submitSessionResponse;
		this.calls = [];
	}

	async getLearningPath(input) {
		this.calls.push({ method: "getLearningPath", input });
		return structuredClone(this.learningPathResponse);
	}

	async startLearningSession(command) {
		this.calls.push({ method: "startLearningSession", input: command });
		return structuredClone(this.learningSessionResponse);
	}

	async getLearningSession(sessionId) {
		this.calls.push({ method: "getLearningSession", input: sessionId });
		return structuredClone(this.learningSessionResponse);
	}

	async submitLearningSession(command) {
		this.calls.push({ method: "submitLearningSession", input: command });
		return structuredClone(this.submitSessionResponse);
	}
}

//test/fakes/FakeLearningPathDataSource.js
export default class FakeLearningPathDataSource {
	constructor({ learningPathResponse, learningSessionResponse, submitSessionResponse }) {
		this.learningPathResponse = learningPathResponse;
		this.learningSessionResponse = learningSessionResponse;
		this.submitSessionResponse = submitSessionResponse;
		this.calls = [];
	}

	async fetchLearningPath(input) {
		this.calls.push({ method: "fetchLearningPath", input });
		return structuredClone(this.learningPathResponse);
	}

	async fetchStartLearningSession(command) {
		this.calls.push({ method: "fetchStartLearningSession", input: command });
		return structuredClone(this.learningSessionResponse);
	}

	async fetchLearningSession(sessionId) {
		this.calls.push({ method: "fetchLearningSession", input: sessionId });
		return structuredClone(this.learningSessionResponse);
	}

	async fetchSubmitLearningSession(command) {
		this.calls.push({ method: "fetchSubmitLearningSession", input: command });
		return structuredClone(this.submitSessionResponse);
	}
}

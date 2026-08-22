// src/model/repositories/LearningPathRepository.js
import toLearningPath from "./LearningPath/toLearningPath.js";
import toLearningSession from "./LearningPath/toLearningSession.js";
import toLearningSessionResult from "./LearningPath/toLearningSessionResult.js";

export default class LearningPathRepository {
	#learningPathDataSource;
	#learningPathResponsePromisesByKey = new Map();

	constructor(learningPathDataSource) {
		this.#learningPathDataSource = learningPathDataSource;
	}

	async getLearningPath({ subjectId, language }) {
		const cacheKey = `${subjectId}:${language}`;
		let responsePromise = this.#learningPathResponsePromisesByKey.get(cacheKey);

		if (responsePromise === undefined) {
			responsePromise = this.#learningPathDataSource.fetchLearningPath({ subjectId, language });
			this.#learningPathResponsePromisesByKey.set(cacheKey, responsePromise);
		}

		try {

			return toLearningPath(await responsePromise);

		}
		catch (error) {
			if (this.#learningPathResponsePromisesByKey.get(cacheKey) === responsePromise) {
				this.#learningPathResponsePromisesByKey.delete(cacheKey);
			}

			throw error;
		}
	}

	async startLearningSession(command) {

		try {

			return toLearningSession(
				await this.#learningPathDataSource.fetchStartLearningSession(command)
			);

		}
		finally {
			this.#learningPathResponsePromisesByKey.clear();
		}
	}

	async getLearningSession(sessionId) {
		return toLearningSession(
			await this.#learningPathDataSource.fetchLearningSession(sessionId)
		);
	}

	async submitLearningSession({ sessionId, answers }) {

		try {

			return toLearningSessionResult(
				await this.#learningPathDataSource.fetchSubmitLearningSession({
					sessionId,
					answers
				})
			);

		}
		finally {
			this.#learningPathResponsePromisesByKey.clear();
		}
	}

	clearUserState() {
		this.#learningPathResponsePromisesByKey.clear();
	}

}

// src/model/datasource/TestSetQuestionDataSource.js
import DataSource from "./DataSource.js";

export default class TestSetQuestionDataSource extends DataSource {
	#collectionPath;
	#questionsPathSuffix = "/questions";
	#practiceQuestionsQuery = "mode=practice";

	constructor({ baseUrl, getToken = null, collectionPath }) {
		super({ baseUrl, getToken });

		if (!collectionPath) {
			throw new Error("TestSetQuestionDataSource requires collectionPath");
		}

		this.#collectionPath = collectionPath;
	}

	async fetchPracticeQuestions(testSetId) {
		return await this.get(this.#buildPracticeQuestionsPath(testSetId));
	}

	#buildPracticeQuestionsPath(testSetId) {
		return `${this.#collectionPath}/${encodeURIComponent(testSetId)}${this.#questionsPathSuffix}?${this.#practiceQuestionsQuery}`;
	}
}

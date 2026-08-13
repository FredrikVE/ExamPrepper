// src/model/datasource/TestSetDataSource.js
import DataSource from "./DataSource.js";

export default class TestSetDataSource extends DataSource {
	#subjectsPath = "/subjects";
	#collectionPath;
	#subjectCollectionPathSuffix;

	constructor({ baseUrl, getToken = null, collectionPath, subjectCollectionPathSuffix }) {
		super({ baseUrl, getToken });

		if (!collectionPath) {
			throw new Error("TestSetDataSource requires collectionPath");
		}

		if (!subjectCollectionPathSuffix) {
			throw new Error("TestSetDataSource requires subjectCollectionPathSuffix");
		}

		this.#collectionPath = collectionPath;
		this.#subjectCollectionPathSuffix = subjectCollectionPathSuffix;
	}

	async fetchAllTestSets() {
		const subjects = await this.get(this.#subjectsPath);
		const testSets = [];

		for (const subject of subjects) {
			const subjectTestSets = await this.fetchTestSetsBySubject(subject.id);

			for (const testSet of subjectTestSets) {
				testSets.push(testSet);
			}
		}

		return testSets;
	}

	async fetchTestSetsBySubject(subjectId) {
		return await this.get(this.#buildSubjectTestSetsPath(subjectId));
	}

	async fetchTestSetById(testSetId) {
		return await this.get(this.#buildTestSetPath(testSetId));
	}

	#buildSubjectTestSetsPath(subjectId) {
		return `${this.#subjectsPath}/${encodeURIComponent(subjectId)}${this.#subjectCollectionPathSuffix}`;
	}

	#buildTestSetPath(testSetId) {
		return `${this.#collectionPath}/${encodeURIComponent(testSetId)}`;
	}
}

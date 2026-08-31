// src/model/repositories/ConceptPracticeRepository.js
export default class ConceptPracticeRepository {
	#conceptPracticeDataSource;

	constructor(conceptPracticeDataSource) {
		this.#conceptPracticeDataSource = conceptPracticeDataSource;
	}

	async getRecordFlipcardAssessment(command) {
		const rawResult = await this.#conceptPracticeDataSource.fetchRecordFlipcardAssessment(command);

		return rawResult;
	}

	async getRecordMatchCardResult(command) {
		const rawResult = await this.#conceptPracticeDataSource.fetchRecordMatchCardResult(command);

		return rawResult;
	}
}

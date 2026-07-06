// src/model/repositories/ConceptRepository.js
export default class ConceptRepository {
	#conceptDataSource;

	constructor(conceptDataSource) {
		this.#conceptDataSource = conceptDataSource;
	}

	async getConceptsBySubject({ subjectId }) {
		const response = await this.#conceptDataSource.fetchConceptsBySubject(subjectId);
		return this.#toConcepts(response.concepts ?? []);
	}

	async getConceptsBySubjectAndTopicArea({ subjectId, topicAreaKey }) {
		const response = await this.#conceptDataSource.fetchConceptsBySubjectAndTopicArea({
			subjectId,
			topicAreaKey
		});

		return this.#toConcepts(response.concepts ?? []);
	}

	#toConcepts(rawConcepts) {
		const concepts = [];

		for (const rawConcept of rawConcepts) {
			concepts.push(this.#toConcept(rawConcept));
		}

		return concepts;
	}

	#toConcept(rawConcept) {
		return {
			id: rawConcept.conceptKey,
			conceptKey: rawConcept.conceptKey,
			topicAreaKey: rawConcept.topicAreaKey,
			term: { ...rawConcept.term },
			explanation: { ...rawConcept.explanation },
			position: rawConcept.position
		};
	}
}

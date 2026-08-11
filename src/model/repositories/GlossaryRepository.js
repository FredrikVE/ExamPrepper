// src/model/repositories/GlossaryRepository.js
export default class GlossaryRepository {
	#glossaryDataSource;

	constructor(glossaryDataSource) {
		this.#glossaryDataSource = glossaryDataSource;
	}

	async getGlossaryEntriesBySubject({ subjectId }) {
		const response = await this.#glossaryDataSource.fetchGlossaryEntriesBySubject({
			subjectId
		});

		return this.#toGlossaryEntries(response.glossaryEntries);
	}

	async getGlossaryEntriesBySubjectAndTopicArea({ subjectId, topicAreaKey }) {
		const response = await this.#glossaryDataSource.fetchGlossaryEntriesBySubjectAndTopicArea({
			subjectId,
			topicAreaKey
		});

		return this.#toGlossaryEntries(response.glossaryEntries);
	}

	async getGlossaryOverview({ subjectId }) {
		const response = await this.#glossaryDataSource.fetchGlossaryOverview({ subjectId });
		const concepts = [];

		for (const concept of response.concepts) {
			concepts.push(this.#toGlossaryConcept(concept));
		}

		return concepts;
	}

	async getGlossaryNetwork({ subjectId, glossaryEntryKey }) {
		const response = await this.#glossaryDataSource.fetchGlossaryNetwork({
			subjectId,
			glossaryEntryKey
		});
		const nodes = [];
		const relations = [];

		for (const node of response.nodes) {
			nodes.push(this.#toGlossaryConcept(node));
		}

		for (const relation of response.relations) {
			relations.push({ ...relation });
		}

		return {
			subjectId: response.subjectId,
			center: this.#toGlossaryConcept(response.center),
			nodes,
			relations,
			limit: response.limit,
			depth: response.depth
		};
	}

	#toGlossaryEntries(rawGlossaryEntries) {
		const glossaryEntries = [];

		for (const rawGlossaryEntry of rawGlossaryEntries) {
			glossaryEntries.push(this.#toGlossaryEntry(rawGlossaryEntry));
		}

		return glossaryEntries;
	}

	#toGlossaryConcept(rawConcept) {
		return {
			...this.#toGlossaryEntry(rawConcept),
			mastery: rawConcept.mastery === null ? null : { ...rawConcept.mastery }
		};
	}

	#toGlossaryEntry(rawGlossaryEntry) {
		return {
			id: rawGlossaryEntry.glossaryEntryKey,
			glossaryEntryKey: rawGlossaryEntry.glossaryEntryKey,
			topicAreaKey: rawGlossaryEntry.topicAreaKey,
			term: { ...rawGlossaryEntry.term },
			explanation: { ...rawGlossaryEntry.explanation },
			position: rawGlossaryEntry.position
		};
	}
}

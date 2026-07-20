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

	#toGlossaryEntries(rawGlossaryEntries) {
		const glossaryEntries = [];

		for (const rawGlossaryEntry of rawGlossaryEntries) {
			glossaryEntries.push(this.#toGlossaryEntry(rawGlossaryEntry));
		}

		return glossaryEntries;
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

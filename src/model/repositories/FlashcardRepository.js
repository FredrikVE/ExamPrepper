// src/model/repositories/FlashcardRepository.js
export default class FlashcardRepository {
	#conceptRepository;

	constructor(conceptRepository) {
		this.#conceptRepository = conceptRepository;
	}

	async getFlashcardsBySubject({ subjectId } = {}) {
		const concepts = await this.#conceptRepository.getConceptsBySubject({ subjectId });
		const flashcards = [];

		for (const concept of concepts) {
			flashcards.push(this.#toFlashcard(concept));
		}

		return flashcards;
	}

	#toFlashcard(concept) {
		return {
			id: concept.id,
			term: { ...concept.term },
			definition: { ...concept.explanation },
			topicAreaKey: concept.topicAreaKey ?? null
		};
	}
}

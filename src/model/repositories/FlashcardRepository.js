// src/model/repositories/FlashcardRepository.js
export default class FlashcardRepository {
    #flashcardDataSource;

    constructor(flashcardDataSource) {
        this.#flashcardDataSource = flashcardDataSource;
    }

    async getFlashcardsBySubject({ subjectId, language } = {}) {
        const flashcards = await this.#flashcardDataSource.fetchFlashcardsBySubject(subjectId);

        return flashcards.map((flashcard) => this.#toFlashcard(flashcard, language));
    }

    #toFlashcard(flashcard, language = "no") {
        return {
            id: flashcard.id,
            term: this.#resolveLocalizedText(flashcard.term, language),
            definition: this.#resolveLocalizedText(flashcard.definition, language),
            topicAreaKey: flashcard.topicAreaKey ?? null
        };
    }

    #resolveLocalizedText(value, language = "no") {
        if (typeof value === "string") {
            return value;
        }

        return value?.[language] ?? value?.no ?? "";
    }
}

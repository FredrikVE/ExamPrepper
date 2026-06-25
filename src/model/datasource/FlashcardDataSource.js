// src/model/datasource/FlashcardDataSource.js
import { FLASHCARDS_BY_SUBJECT_ID } from "../../data/subjects/flashcardsIndex.js";

export default class FlashcardDataSource {
    async fetchFlashcardsBySubject(subjectId) {
        const subjectFlashcards = FLASHCARDS_BY_SUBJECT_ID[subjectId] ?? [];

        return subjectFlashcards.map((flashcard) => ({
            ...flashcard,
            term: { ...flashcard.term },
            definition: { ...flashcard.definition }
        }));
    }
}

// src/model/domain/utils/filterFlashcardsByTopicArea.js
import { ALL_TOPIC_AREAS } from "./topicAreaFilters.js";

export function filterFlashcardsByTopicArea(flashcards, topicAreaKey) {
    const filteredFlashcards = [];

    for (const flashcard of flashcards) {
        if (!flashcardMatchesTopicArea(flashcard, topicAreaKey)) {
            continue;
        }

        filteredFlashcards.push(flashcard);
    }

    return filteredFlashcards;
}

function flashcardMatchesTopicArea(flashcard, topicAreaKey) {
    if (!topicAreaKey || topicAreaKey === ALL_TOPIC_AREAS) {
        return true;
    }

    return flashcard.topicAreaKey === topicAreaKey;
}

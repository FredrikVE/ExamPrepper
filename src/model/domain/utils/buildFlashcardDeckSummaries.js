// src/model/domain/utils/buildFlashcardDeckSummaries.js
export function buildFlashcardDeckSummaries(flashcards, topicAreas) {
    const deckSummaries = [];

    for (const topicArea of topicAreas) {
        const cardCount = countCardsForTopicArea(flashcards, topicArea.key);

        if (cardCount === 0) {
            continue;
        }

        deckSummaries.push({
            topicAreaKey: topicArea.key,
            cardCount,
            estimatedMinutes: Math.max(5, Math.round(cardCount / 2))
        });
    }

    return deckSummaries;
}

function countCardsForTopicArea(flashcards, topicAreaKey) {
    let cardCount = 0;

    for (const flashcard of flashcards) {
        if (flashcard.topicAreaKey !== topicAreaKey) {
            continue;
        }

        cardCount += 1;
    }

    return cardCount;
}

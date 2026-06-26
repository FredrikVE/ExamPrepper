// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/flipcardDeckToolState.js
import { FLIPCARD_DECK_TOOL_KEYS } from "./flipcardDeckTools.js";

function rotateCardIds(cardIds) {
    if (cardIds.length < 2) {
        return cardIds;
    }

    return [...cardIds.slice(1), cardIds[0]];
}

function haveSameOrder(firstCardIds, secondCardIds) {
    return firstCardIds.length === secondCardIds.length
        && firstCardIds.every((cardId, index) => cardId === secondCardIds[index]);
}

export function createShuffledFlipcardIds(cards) {
    const originalCardIds = cards.map((card) => card.id);
    const shuffledCardIds = [...originalCardIds];

    for (let index = shuffledCardIds.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [shuffledCardIds[index], shuffledCardIds[swapIndex]] = [shuffledCardIds[swapIndex], shuffledCardIds[index]];
    }

    if (haveSameOrder(originalCardIds, shuffledCardIds)) {
        return rotateCardIds(shuffledCardIds);
    }

    return shuffledCardIds;
}

export function createVisibleFlipcards(cards, selectedCardIds) {
    if (selectedCardIds.length === 0) {
        return cards;
    }

    const cardsById = new Map(cards.map((card) => [card.id, card]));

    return selectedCardIds
        .map((cardId) => cardsById.get(cardId))
        .filter(Boolean);
}

export function createRepeatDifficultCardIds(cards, practiceCardIds) {
    return cards
        .filter((card) => practiceCardIds.includes(card.id))
        .map((card) => card.id);
}

export function createDisabledDeckToolKeys(practiceCardIds) {
    const disabledDeckToolKeys = [];

    if (practiceCardIds.length === 0) {
        disabledDeckToolKeys.push(FLIPCARD_DECK_TOOL_KEYS.REPEAT_DIFFICULT);
    }

    return disabledDeckToolKeys;
}

export function createDeckToolStatusLabels(labels, totalCardCount, practiceCardCount) {
    return {
        [FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS]: labels.toolMenuAllCardsStatusLabel(totalCardCount),
        [FLIPCARD_DECK_TOOL_KEYS.SHUFFLE]: labels.toolMenuShuffleStatusLabel,
        [FLIPCARD_DECK_TOOL_KEYS.REPEAT_DIFFICULT]: practiceCardCount > 0
            ? labels.toolMenuRepeatDifficultCountLabel(practiceCardCount)
            : labels.toolMenuNoPracticeCardsLabel,
        [FLIPCARD_DECK_TOOL_KEYS.ADD_CARD]: labels.toolMenuUnavailableLabel
    };
}

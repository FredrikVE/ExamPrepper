// src/ui/viewmodel/FlipcardsPage/flipcardsProgressModel.js
export const FLIPCARD_PROGRESS_STATUS = {
    MASTERED: "mastered",
    PRACTICE: "practice"
};

function uniqueCardIds(cardIds) {
    return [...new Set(cardIds)];
}

function addUniqueCardId(cardIds, cardId) {
    if (cardIds.includes(cardId)) {
        return cardIds;
    }

    return [...cardIds, cardId];
}

function removeCardId(cardIds, cardId) {
    if (!cardIds.includes(cardId)) {
        return cardIds;
    }

    return cardIds.filter((existingCardId) => existingCardId !== cardId);
}

export function resolveUpdatedFlipcardProgress({
    masteredCardIds,
    practiceCardIds,
    cardId,
    status
}) {
    if (status === FLIPCARD_PROGRESS_STATUS.MASTERED) {
        return {
            masteredCardIds: addUniqueCardId(masteredCardIds, cardId),
            practiceCardIds: removeCardId(practiceCardIds, cardId)
        };
    }

    if (status === FLIPCARD_PROGRESS_STATUS.PRACTICE) {
        return {
            masteredCardIds: removeCardId(masteredCardIds, cardId),
            practiceCardIds: addUniqueCardId(practiceCardIds, cardId)
        };
    }

    return {
        masteredCardIds,
        practiceCardIds
    };
}

export function createFlipcardsProgressModel({
    totalCardCount,
    masteredCardIds,
    practiceCardIds,
    labels
}) {
    const masteredCount = uniqueCardIds(masteredCardIds).length;
    const practiceCount = uniqueCardIds(practiceCardIds).length;
    const completedCount = uniqueCardIds([
        ...masteredCardIds,
        ...practiceCardIds
    ]).length;
    const remainingCount = Math.max(totalCardCount - completedCount, 0);

    return {
        totalCardCount,
        masteredCount,
        practiceCount,
        completedCount,
        remainingCount,
        progressLabel: labels.progressLabel(
            completedCount,
            totalCardCount,
            masteredCount,
            practiceCount
        ),
        completeBody: labels.completeBody(
            masteredCount,
            practiceCount,
            totalCardCount
        )
    };
}

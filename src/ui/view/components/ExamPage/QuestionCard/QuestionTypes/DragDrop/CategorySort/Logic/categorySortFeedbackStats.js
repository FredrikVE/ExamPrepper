//src/ui/view/components/ExamPage/QuestionCard/DragDrop/CategoryLogic/dragCategorizeFeedbackStats.js
import { getPlacedItemIds, getSafeArray, isItemCorrectlyPlaced, normalizeCategoryAnswer } from "./categorySortAnswerLogic.js";

export function getCategorySortStats(question, answer) {
    const safeAnswer = normalizeCategoryAnswer(question, answer);
    const items = getSafeArray(question?.items);
    const placedItemIds = getPlacedItemIds(safeAnswer);

    const stats = {
        correct: 0,
        wrong: 0,
        unanswered: 0
    };

    for (const item of items) {
        const categoryId = getPlacedCategoryId(safeAnswer, item.id);

        if (!placedItemIds.has(item.id)) {
            stats.unanswered += 1;
        } else if (isItemCorrectlyPlaced(question, categoryId, item.id)) {
            stats.correct += 1;
        } else {
            stats.wrong += 1;
        }
    }

    return stats;
}

function getPlacedCategoryId(answer, itemId) {
    for (const categoryId in answer) {
        if (getSafeArray(answer[categoryId]).includes(itemId)) {
            return categoryId;
        }
    }

    return null;
}

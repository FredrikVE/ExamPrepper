// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/CategorySort/Utils/categorySortAnswerLogic.js
export function createItemsById(items) {
    const itemsById = {};

    for (const item of getSafeArray(items)) {
        itemsById[item.id] = item;
    }

    return itemsById;
}

export function getItemLabel(item) {
    return item?.label ?? item?.text ?? "";
}

export function getCorrectCategoryId(question, itemId) {
    const correctAnswer = isPlainObject(question?.correctAnswer)
        ? question.correctAnswer
        : {};

    for (const categoryId in correctAnswer) {
        const itemIds = getSafeArray(correctAnswer[categoryId]);

        if (itemIds.includes(itemId)) {
            return categoryId;
        }
    }

    return null;
}

export function getCategoryLabelById(question, categoryId) {
    const categories = getSafeArray(question?.categories);
    const category = categories.find((item) => item.id === categoryId);

    return category?.label ?? categoryId ?? "";
}

export function isItemCorrectlyPlaced(question, categoryId, itemId) {
    if (!categoryId || !itemId) {
        return false;
    }

    return getCorrectCategoryId(question, itemId) === categoryId;
}

export function normalizeCategoryAnswer(question, answer) {
    const categories = getSafeArray(question?.categories);
    const safeAnswer = isPlainObject(answer) ? answer : {};
    const usedItemIds = new Set();
    const normalizedAnswer = {};

    for (const category of categories) {
        const answerItemIds = getSafeArray(safeAnswer[category.id]);
        const uniqueItemIds = [];

        for (const itemId of answerItemIds) {
            if (!itemId || usedItemIds.has(itemId)) {
                continue;
            }

            uniqueItemIds.push(itemId);
            usedItemIds.add(itemId);
        }

        normalizedAnswer[category.id] = uniqueItemIds;
    }

    return normalizedAnswer;
}

export function clearItemFromAllCategories(answer, itemId) {
    const nextAnswer = {};

    for (const categoryId in answer) {
        nextAnswer[categoryId] = getSafeArray(answer[categoryId]).filter((currentItemId) => {
            return currentItemId !== itemId;
        });
    }

    return nextAnswer;
}

export function getPlacedItemIds(answer) {
    const placedItemIds = new Set();

    for (const categoryId in answer) {
        for (const itemId of getSafeArray(answer[categoryId])) {
            placedItemIds.add(itemId);
        }
    }

    return placedItemIds;
}

export function getUnplacedItems(question, answer) {
    const placedItemIds = getPlacedItemIds(answer);

    return getSafeArray(question?.items).filter((item) => {
        return !placedItemIds.has(item.id);
    });
}

export function getItemFeedback(question, itemId) {
    const itemFeedback = isPlainObject(question?.itemFeedback)
        ? question.itemFeedback
        : {};

    return itemFeedback[itemId] ?? {};
}

export function getSafeArray(value) {
    if (Array.isArray(value)) {
        return value;
    }

    return [];
}

export function isPlainObject(value) {
    if (!value) {
        return false;
    }

    if (typeof value !== "object") {
        return false;
    }

    if (Array.isArray(value)) {
        return false;
    }

    return true;
}

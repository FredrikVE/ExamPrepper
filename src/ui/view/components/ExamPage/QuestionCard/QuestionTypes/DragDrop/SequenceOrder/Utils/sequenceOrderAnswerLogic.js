// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Utils/sequenceOrderAnswerLogic.js
export function getSequenceItems(question) {
    if (Array.isArray(question?.items)) {
        return question.items;
    }

    if (Array.isArray(question?.alternatives)) {
        return question.alternatives;
    }

    if (Array.isArray(question?.cards)) {
        return question.cards;
    }

    return [];
}

export function createSequenceItemsById(items) {
    const sequenceItemsById = {};

    for (const sequenceItem of getSafeArray(items)) {
        sequenceItemsById[sequenceItem.id] = sequenceItem;
    }

    return sequenceItemsById;
}

export function getSequenceItemLabel(sequenceItem) {
    return sequenceItem?.label ?? sequenceItem?.text ?? sequenceItem?.title ?? "";
}

export function getCorrectSequenceOrder(question) {
    const explicitOrder = getExplicitCorrectSequenceOrder(question);

    if (explicitOrder.length > 0) {
        return explicitOrder;
    }

    const sequenceItems = getSequenceItems(question);
    const orderedItems = sequenceItems.filter((sequenceItem) => {
        return Number.isFinite(sequenceItem?.correctIndex)
            || Number.isFinite(sequenceItem?.correctPosition)
            || Number.isFinite(sequenceItem?.order);
    });

    if (orderedItems.length > 0) {
        return [...orderedItems]
            .sort((firstItem, secondItem) => getSequenceSortIndex(firstItem) - getSequenceSortIndex(secondItem))
            .map((sequenceItem) => sequenceItem.id)
            .filter(Boolean);
    }

    return sequenceItems.map((sequenceItem) => sequenceItem.id).filter(Boolean);
}

export function normalizeSequenceOrderAnswer(question, answer) {
    const correctOrder = getCorrectSequenceOrder(question);
    const sequenceItemIds = new Set(getSequenceItems(question).map((sequenceItem) => sequenceItem.id).filter(Boolean));
    const rawAnswer = getRawSequenceAnswer(answer);
    const answerItemIds = Array.isArray(rawAnswer)
        ? rawAnswer.map((entry) => getSequenceOrderEntryId(entry))
        : [];
    const usedItemIds = new Set();

    return correctOrder.map((_, index) => {
        const sequenceItemId = answerItemIds[index];

        if (!sequenceItemId || usedItemIds.has(sequenceItemId)) {
            return null;
        }

        if (sequenceItemIds.size > 0 && !sequenceItemIds.has(sequenceItemId)) {
            return null;
        }

        usedItemIds.add(sequenceItemId);
        return sequenceItemId;
    });
}

export function placeSequenceItemAtIndex(question, answer, sequenceItemId, targetIndex) {
    const safeAnswer = normalizeSequenceOrderAnswer(question, answer);
    const normalizedTargetIndex = Number(targetIndex);

    if (!sequenceItemId || !Number.isInteger(normalizedTargetIndex)) {
        return safeAnswer;
    }

    if (normalizedTargetIndex < 0 || normalizedTargetIndex >= safeAnswer.length) {
        return safeAnswer;
    }

    return safeAnswer.map((currentItemId, index) => {
        if (index === normalizedTargetIndex) {
            return sequenceItemId;
        }

        if (currentItemId === sequenceItemId) {
            return null;
        }

        return currentItemId;
    });
}

export function removeSequenceItem(question, answer, sequenceItemId) {
    const safeAnswer = normalizeSequenceOrderAnswer(question, answer);

    if (!sequenceItemId) {
        return safeAnswer;
    }

    return safeAnswer.map((currentItemId) => {
        return currentItemId === sequenceItemId ? null : currentItemId;
    });
}

export function getAvailableSequenceItems(question, answer) {
    const placedItemIds = new Set(normalizeSequenceOrderAnswer(question, answer).filter(Boolean));

    return getSequenceItems(question).filter((sequenceItem) => {
        return !placedItemIds.has(sequenceItem.id);
    });
}

export function getSequenceItemStatus(question, answer, index) {
    const correctOrder = getCorrectSequenceOrder(question);
    const safeAnswer = normalizeSequenceOrderAnswer(question, answer);
    const selectedSequenceItemId = safeAnswer[index];

    if (!selectedSequenceItemId) {
        return "unanswered";
    }

    return selectedSequenceItemId === correctOrder[index] ? "correct" : "wrong";
}

export function getSequenceItemFeedback(question, sequenceItemId) {
    const itemFeedback = isPlainObject(question?.itemFeedback)
        ? question.itemFeedback
        : {};
    const sequenceItemsById = createSequenceItemsById(getSequenceItems(question));

    return itemFeedback[sequenceItemId] ?? sequenceItemsById[sequenceItemId] ?? {};
}

export function getSafeArray(value) {
    if (Array.isArray(value)) {
        return value;
    }

    return [];
}

export function isPlainObject(value) {
    return Boolean(value)
        && typeof value === "object"
        && !Array.isArray(value);
}

function getExplicitCorrectSequenceOrder(question) {
    const correctOrder = question?.correctOrder ?? question?.correctSequence ?? question?.correctAnswer;

    if (!Array.isArray(correctOrder)) {
        return [];
    }

    return correctOrder
        .map((entry) => getSequenceOrderEntryId(entry))
        .filter(Boolean);
}

function getRawSequenceAnswer(answer) {
    if (Array.isArray(answer?.sequence)) {
        return answer.sequence;
    }

    if (Array.isArray(answer?.order)) {
        return answer.order;
    }

    return answer;
}

function getSequenceOrderEntryId(entry) {
    if (typeof entry === "string") {
        return entry;
    }

    if (Number.isFinite(entry)) {
        return String(entry);
    }

    if (isPlainObject(entry)) {
        return entry.id ?? entry.sequenceItemId ?? entry.itemId ?? entry.cardId ?? null;
    }

    return null;
}

function getSequenceSortIndex(sequenceItem) {
    if (Number.isFinite(sequenceItem?.correctIndex)) {
        return sequenceItem.correctIndex;
    }

    if (Number.isFinite(sequenceItem?.correctPosition)) {
        return sequenceItem.correctPosition;
    }

    if (Number.isFinite(sequenceItem?.order)) {
        return sequenceItem.order;
    }

    return 0;
}

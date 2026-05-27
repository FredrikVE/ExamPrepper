// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/Utils/matrixPlacementAnswerLogic.js
export function createItemsById(items) {
    const itemsById = {};

    for (const item of getSafeArray(items)) {
        if (item?.id) {
            itemsById[item.id] = item;
        }
    }

    return itemsById;
}

export function getItemLabel(item) {
    return item?.label ?? item?.text ?? item?.title ?? item?.id ?? "";
}

export function getItemFeedback(question, itemId) {
    const itemFeedback = isPlainObject(question?.itemFeedback)
        ? question.itemFeedback
        : {};
    const item = getSafeArray(question?.items).find((candidate) => candidate.id === itemId);

    return {
        whyCorrect: item?.whyCorrect ?? item?.why ?? item?.explanation ?? itemFeedback[itemId]?.whyCorrect,
        whyWrong: item?.whyWrong ?? itemFeedback[itemId]?.whyWrong ?? item?.why ?? item?.explanation,
        whyExtended: getSafeArray(item?.whyExtended ?? item?.extendedExplanation ?? item?.explanationPoints ?? itemFeedback[itemId]?.whyExtended)
    };
}

export function getMatrixQuadrants(question) {
    return getSafeArray(question?.matrix?.quadrants ?? question?.quadrants);
}

export function getMatrixAxis(question, axisName) {
    return question?.matrix?.[axisName] ?? {};
}

export function getMatrixQuadrantsForDisplay(question) {
    const quadrants = getMatrixQuadrants(question);
    const xAxis = getMatrixAxis(question, "xAxis");
    const yAxis = getMatrixAxis(question, "yAxis");
    const rankedQuadrants = quadrants.map((quadrant, index) => ({
        quadrant,
        index,
        xRank: getAxisRank({ quadrant, axis: xAxis, axisName: "x", highRank: 1, lowRank: 0 }),
        yRank: getAxisRank({ quadrant, axis: yAxis, axisName: "y", highRank: 0, lowRank: 1 })
    }));

    return rankedQuadrants
        .sort((first, second) => {
            const firstHasRank = first.xRank !== null && first.yRank !== null;
            const secondHasRank = second.xRank !== null && second.yRank !== null;

            if (firstHasRank && secondHasRank) {
                const yDifference = first.yRank - second.yRank;

                if (yDifference !== 0) {
                    return yDifference;
                }

                return first.xRank - second.xRank;
            }

            if (firstHasRank) {
                return -1;
            }

            if (secondHasRank) {
                return 1;
            }

            return first.index - second.index;
        })
        .map((item) => item.quadrant);
}

export function normalizeMatrixPlacementAnswer(question, answer) {
    const rawAnswer = isPlainObject(answer?.placements)
        ? answer.placements
        : answer;
    const safeAnswer = isPlainObject(rawAnswer) ? rawAnswer : {};
    const itemIds = new Set(getSafeArray(question?.items).map((item) => item.id));
    const quadrantIds = new Set(getMatrixQuadrants(question).map((quadrant) => quadrant.id));
    const shouldValidate = itemIds.size > 0 && quadrantIds.size > 0;
    const normalizedAnswer = {};

    for (const itemId in safeAnswer) {
        const quadrantId = safeAnswer[itemId];

        if (!quadrantId) {
            continue;
        }

        if (shouldValidate && (!itemIds.has(itemId) || !quadrantIds.has(quadrantId))) {
            continue;
        }

        normalizedAnswer[itemId] = quadrantId;
    }

    return normalizedAnswer;
}

export function placeItemInQuadrant(question, answer, itemId, quadrantId) {
    const safeAnswer = normalizeMatrixPlacementAnswer(question, answer);

    if (!itemId || !quadrantId) {
        return safeAnswer;
    }

    return normalizeMatrixPlacementAnswer(question, {
        ...safeAnswer,
        [itemId]: quadrantId
    });
}

export function removeItemFromMatrix(question, answer, itemId) {
    const safeAnswer = normalizeMatrixPlacementAnswer(question, answer);
    const nextAnswer = { ...safeAnswer };

    delete nextAnswer[itemId];

    return nextAnswer;
}

export function getPlacedItemIds(answer) {
    return new Set(Object.keys(normalizeMatrixPlacementAnswer(null, answer)));
}

export function getUnplacedItems(question, answer) {
    const safeAnswer = normalizeMatrixPlacementAnswer(question, answer);
    const placedItemIds = new Set(Object.keys(safeAnswer));

    return getSafeArray(question?.items).filter((item) => !placedItemIds.has(item.id));
}

export function getItemsInQuadrant(question, answer, quadrantId) {
    const safeAnswer = normalizeMatrixPlacementAnswer(question, answer);
    const itemsById = createItemsById(question?.items);

    return Object.entries(safeAnswer)
        .filter(([, selectedQuadrantId]) => selectedQuadrantId === quadrantId)
        .map(([itemId]) => itemsById[itemId])
        .filter(Boolean);
}

export function getCorrectQuadrantId(question, itemId) {
    const correctAnswer = isPlainObject(question?.correctAnswer)
        ? question.correctAnswer
        : {};
    const correctPlacements = isPlainObject(question?.correctPlacements)
        ? question.correctPlacements
        : {};
    const item = getSafeArray(question?.items).find((candidate) => candidate.id === itemId);

    return correctAnswer[itemId]
        ?? correctPlacements[itemId]
        ?? item?.correctQuadrantId
        ?? item?.quadrantId
        ?? null;
}

export function getSelectedQuadrantId(answer, itemId) {
    const safeAnswer = normalizeMatrixPlacementAnswer(null, answer);

    return safeAnswer[itemId] ?? null;
}

export function getQuadrantLabelById(question, quadrantId) {
    const quadrant = getMatrixQuadrants(question).find((candidate) => candidate.id === quadrantId);

    return quadrant?.title ?? quadrant?.label ?? quadrantId ?? "";
}

export function getQuadrantDescription(quadrant) {
    return quadrant?.description ?? quadrant?.text ?? "";
}

export function isItemCorrectlyPlaced(question, quadrantId, itemId) {
    if (!quadrantId || !itemId) {
        return false;
    }

    return getCorrectQuadrantId(question, itemId) === quadrantId;
}

export function getMatrixPlacementItemStatus(question, answer, itemId) {
    const selectedQuadrantId = getSelectedQuadrantId(answer, itemId);

    if (!selectedQuadrantId) {
        return "unanswered";
    }

    return isItemCorrectlyPlaced(question, selectedQuadrantId, itemId) ? "correct" : "wrong";
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

function getAxisRank({ quadrant, axis, axisName, highRank, lowRank }) {
    const directValue = getDirectAxisValue(quadrant, axisName);
    const normalizedDirectValue = normalizeForSearch(directValue);

    if (isHighValue(normalizedDirectValue, axis)) {
        return highRank;
    }

    if (isLowValue(normalizedDirectValue, axis)) {
        return lowRank;
    }

    const searchableText = normalizeForSearch([
        quadrant?.id,
        quadrant?.title,
        quadrant?.label,
        quadrant?.description
    ].filter(Boolean).join(" "));
    const axisKeywords = getAxisKeywords(axis);

    if (hasAxisValueInText(searchableText, axisKeywords, axis?.highLabel ?? "High")) {
        return highRank;
    }

    if (hasAxisValueInText(searchableText, axisKeywords, axis?.lowLabel ?? "Low")) {
        return lowRank;
    }

    return null;
}

function getDirectAxisValue(quadrant, axisName) {
    if (axisName === "x") {
        return quadrant?.x ?? quadrant?.xValue ?? quadrant?.column ?? quadrant?.horizontal;
    }

    return quadrant?.y ?? quadrant?.yValue ?? quadrant?.row ?? quadrant?.vertical;
}

function isHighValue(value, axis) {
    return value === "high" || value === normalizeForSearch(axis?.highLabel ?? "High");
}

function isLowValue(value, axis) {
    return value === "low" || value === normalizeForSearch(axis?.lowLabel ?? "Low");
}

function hasAxisValueInText(text, axisKeywords, value) {
    const normalizedValue = normalizeForSearch(value);

    return axisKeywords.some((keyword) => {
        return text.includes(`${normalizedValue} ${keyword}`)
            || text.includes(`${normalizedValue}-${keyword}`)
            || text.includes(`${keyword} ${normalizedValue}`)
            || text.includes(`${keyword}-${normalizedValue}`);
    });
}

function getAxisKeywords(axis) {
    const words = normalizeForSearch(axis?.label ?? "")
        .split(" ")
        .filter((word) => word.length >= 4);

    return words.length > 0 ? words : ["axis"];
}

function normalizeForSearch(value) {
    return String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/[\s_/]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .replace(/-/g, " ");
}

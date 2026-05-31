// src/model/domain/GradeAnswerUseCase.js
import normalizeAnswer from "../../utils/answer/normalizeAnswer.js";
import getCorrectIndexes from "./utils/getCorrectIndexes.js";
import { isFuzzyMatch } from "./utils/fuzzyMatch.js";
import { QUESTION_TYPES } from "../../constants/QuestionTypes.js";

export default class GradeAnswerUseCase {

    execute(question, answer) {
        if (!question) {
            return false;
        }

        if (question.type === QUESTION_TYPES.SINGLE) {
            return this.#isSingleChoiceAnswerCorrect(question, answer);
        }

        if (question.type === QUESTION_TYPES.MULTI) {
            return this.#isMultiChoiceAnswerCorrect(question, answer);
        }

        if (question.type === QUESTION_TYPES.FILL) {
            return this.#isFillAnswerCorrect(question, answer);
        }

        if (question.type === QUESTION_TYPES.DRAG_DROP) {
            return this.#isDragDropAnswerFullyCorrect(question, answer);
        }

        if (question.type === QUESTION_TYPES.DRAG_CATEGORIZE) {
            return this.#isDragCategorizeAnswerFullyCorrect(question, answer);
        }

        if (question.type === QUESTION_TYPES.MATRIX_PLACEMENT) {
            return this.#isMatrixPlacementAnswerFullyCorrect(question, answer);
        }

        if (question.type === QUESTION_TYPES.SEQUENCE_ORDER) {
            return this.#isSequenceOrderAnswerFullyCorrect(question, answer);
        }

        return false;
    }

    getQuestionScore(question, answer) {
        if (!question) {
            return 0;
        }

        if (question.type === QUESTION_TYPES.DRAG_DROP) {
            return this.#getDragDropQuestionScore(question, answer);
        }

        if (question.type === QUESTION_TYPES.DRAG_CATEGORIZE) {
            return this.#getDragCategorizeQuestionScore(question, answer);
        }

        if (question.type === QUESTION_TYPES.MATRIX_PLACEMENT) {
            return this.#getMatrixPlacementQuestionScore(question, answer);
        }

        if (question.type === QUESTION_TYPES.SEQUENCE_ORDER) {
            return this.#getSequenceOrderQuestionScore(question, answer);
        }

        return this.execute(question, answer) ? question.points : 0;
    }

    getDragDropStats(question, answer) {
        const targets = Array.isArray(question?.targets) ? question.targets : [];
        const safeAnswer = this.#isPlainObject(answer) ? answer : {};

        return targets.reduce((stats, target) => {
            const selectedCardId = safeAnswer[target.id];

            if (!selectedCardId) {
                stats.unanswered += 1;
                return stats;
            }

            if (target.correctCardId === selectedCardId) {
                stats.correct += 1;
                return stats;
            }

            stats.wrong += 1;
            return stats;
        }, { correct: 0, wrong: 0, unanswered: 0 });
    }

    getDragCategorizeStats(question, answer) {
        const items = Array.isArray(question?.items) ? question.items : [];
        const safeAnswer = this.#normalizeCategoryAnswer(question, answer);

        return items.reduce((stats, item) => {
            const categoryId = this.#getPlacedCategoryId(safeAnswer, item.id);

            if (!categoryId) {
                stats.unanswered += 1;
                return stats;
            }

            if (this.#isCategoryPlacementCorrect(question, categoryId, item.id)) {
                stats.correct += 1;
                return stats;
            }

            stats.wrong += 1;
            return stats;
        }, { correct: 0, wrong: 0, unanswered: 0 });
    }

    getMatrixPlacementStats(question, answer) {
        const items = this.#getSafeMatrixItems(question);
        const safeAnswer = this.#normalizeMatrixPlacementAnswer(question, answer);

        return items.reduce((stats, item) => {
            const quadrantId = safeAnswer[item.id];

            if (!quadrantId) {
                stats.unanswered += 1;
                return stats;
            }

            if (this.#isMatrixPlacementCorrect(question, quadrantId, item.id)) {
                stats.correct += 1;
                return stats;
            }

            stats.wrong += 1;
            return stats;
        }, { correct: 0, wrong: 0, unanswered: 0 });
    }

    getSequenceOrderStats(question, answer) {
        const correctOrder = this.#getCorrectSequenceOrder(question);
        const safeAnswer = this.#normalizeSequenceOrderAnswer(question, answer);

        return correctOrder.reduce((stats, correctItemId, index) => {
            const selectedItemId = safeAnswer[index];

            if (!selectedItemId) {
                stats.unanswered += 1;
                return stats;
            }

            if (selectedItemId === correctItemId) {
                stats.correct += 1;
                return stats;
            }

            stats.wrong += 1;
            return stats;
        }, { correct: 0, wrong: 0, unanswered: 0 });
    }

    #isSingleChoiceAnswerCorrect(question, answer) {
        const selectedOption = question.options?.[answer];

        if (!selectedOption) {
            return false;
        }

        return selectedOption.correct === true;
    }

    #isMultiChoiceAnswerCorrect(question, answer) {
        const selectedIndexes = this.#getSortedSelectedIndexes(answer);
        const correctIndexes = this.#getSortedCorrectIndexes(question);

        return this.#areIndexListsEqual(selectedIndexes, correctIndexes);
    }

    #isFillAnswerCorrect(question, answer) {
        return this.getFillMatchType(question, answer) !== "none";
    }

    getFillMatchType(question, answer) {
        if (!question || question.type !== QUESTION_TYPES.FILL) {
            return "none";
        }

        const normalizedAnswer = normalizeAnswer(answer);

        if (!normalizedAnswer) {
            return "none";
        }

        const hasExactMatch = question.answers.some((acceptedAnswer) => {
            return normalizeAnswer(acceptedAnswer) === normalizedAnswer;
        });

        if (hasExactMatch) {
            return "exact";
        }

        const hasFuzzyMatch = question.answers.some((acceptedAnswer) => {
            return isFuzzyMatch(normalizedAnswer, normalizeAnswer(acceptedAnswer));
        });

        if (hasFuzzyMatch) {
            return "fuzzy";
        }

        return "none";
    }

    #isDragDropAnswerFullyCorrect(question, answer) {
        const targets = Array.isArray(question?.targets) ? question.targets : [];

        if (targets.length === 0 || !this.#isPlainObject(answer)) {
            return false;
        }

        return targets.every((target) => {
            return answer[target.id] === target.correctCardId;
        });
    }

    #getDragDropQuestionScore(question, answer) {
        const targets = Array.isArray(question?.targets) ? question.targets : [];

        if (targets.length === 0) {
            return 0;
        }

        const stats = this.getDragDropStats(question, answer);
        const rawScore = question.points * (stats.correct / targets.length);

        return Number(rawScore.toFixed(2));
    }

    #isDragCategorizeAnswerFullyCorrect(question, answer) {
        const items = Array.isArray(question?.items) ? question.items : [];
        const safeAnswer = this.#normalizeCategoryAnswer(question, answer);

        if (items.length === 0) {
            return false;
        }

        return items.every((item) => {
            const categoryId = this.#getPlacedCategoryId(safeAnswer, item.id);

            return this.#isCategoryPlacementCorrect(question, categoryId, item.id);
        });
    }

    #getDragCategorizeQuestionScore(question, answer) {
        const items = Array.isArray(question?.items) ? question.items : [];

        if (items.length === 0) {
            return 0;
        }

        const stats = this.getDragCategorizeStats(question, answer);
        const rawScore = question.points * (stats.correct / items.length);

        return Number(rawScore.toFixed(2));
    }

    #isMatrixPlacementAnswerFullyCorrect(question, answer) {
        const items = this.#getSafeMatrixItems(question);
        const safeAnswer = this.#normalizeMatrixPlacementAnswer(question, answer);

        if (items.length === 0) {
            return false;
        }

        return items.every((item) => {
            const quadrantId = safeAnswer[item.id];

            return this.#isMatrixPlacementCorrect(question, quadrantId, item.id);
        });
    }

    #getMatrixPlacementQuestionScore(question, answer) {
        const items = this.#getSafeMatrixItems(question);

        if (items.length === 0) {
            return 0;
        }

        const stats = this.getMatrixPlacementStats(question, answer);
        const rawScore = question.points * (stats.correct / items.length);

        return Number(rawScore.toFixed(2));
    }

    #isSequenceOrderAnswerFullyCorrect(question, answer) {
        const correctOrder = this.#getCorrectSequenceOrder(question);
        const safeAnswer = this.#normalizeSequenceOrderAnswer(question, answer);

        if (correctOrder.length === 0) {
            return false;
        }

        return correctOrder.every((correctItemId, index) => {
            return safeAnswer[index] === correctItemId;
        });
    }

    #getSequenceOrderQuestionScore(question, answer) {
        const correctOrder = this.#getCorrectSequenceOrder(question);

        if (correctOrder.length === 0) {
            return 0;
        }

        const stats = this.getSequenceOrderStats(question, answer);
        const rawScore = question.points * (stats.correct / correctOrder.length);

        return Number(rawScore.toFixed(2));
    }

    #normalizeCategoryAnswer(question, answer) {
        const categories = Array.isArray(question?.categories) ? question.categories : [];
        const safeAnswer = this.#isPlainObject(answer) ? answer : {};
        const usedItemIds = new Set();
        const normalizedAnswer = {};

        for (const category of categories) {
            const answerItemIds = Array.isArray(safeAnswer[category.id])
                ? safeAnswer[category.id]
                : [];

            normalizedAnswer[category.id] = [];

            for (const itemId of answerItemIds) {
                if (!itemId || usedItemIds.has(itemId)) {
                    continue;
                }

                normalizedAnswer[category.id].push(itemId);
                usedItemIds.add(itemId);
            }
        }

        return normalizedAnswer;
    }

    #normalizeMatrixPlacementAnswer(question, answer) {
        const rawAnswer = this.#isPlainObject(answer?.placements)
            ? answer.placements
            : answer;
        const safeAnswer = this.#isPlainObject(rawAnswer) ? rawAnswer : {};
        const itemIds = new Set(this.#getSafeMatrixItems(question).map((item) => item.id));
        const quadrantIds = new Set(this.#getMatrixQuadrants(question).map((quadrant) => quadrant.id));
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

    #getPlacedCategoryId(answer, itemId) {
        for (const categoryId in answer) {
            if (Array.isArray(answer[categoryId]) && answer[categoryId].includes(itemId)) {
                return categoryId;
            }
        }

        return null;
    }

    #getCorrectCategoryId(question, itemId) {
        const correctAnswer = this.#isPlainObject(question?.correctAnswer)
            ? question.correctAnswer
            : {};

        for (const categoryId in correctAnswer) {
            const categoryItemIds = Array.isArray(correctAnswer[categoryId])
                ? correctAnswer[categoryId]
                : [];

            if (categoryItemIds.includes(itemId)) {
                return categoryId;
            }
        }

        return null;
    }

    #getCorrectMatrixQuadrantId(question, itemId) {
        const correctAnswer = this.#isPlainObject(question?.correctAnswer)
            ? question.correctAnswer
            : {};
        const correctPlacements = this.#isPlainObject(question?.correctPlacements)
            ? question.correctPlacements
            : {};
        const item = this.#getSafeMatrixItems(question).find((candidate) => {
            return candidate.id === itemId;
        });

        return correctAnswer[itemId]
            ?? correctPlacements[itemId]
            ?? item?.correctQuadrantId
            ?? item?.quadrantId
            ?? null;
    }

    #isCategoryPlacementCorrect(question, categoryId, itemId) {
        if (!categoryId || !itemId) {
            return false;
        }

        return this.#getCorrectCategoryId(question, itemId) === categoryId;
    }

    #isMatrixPlacementCorrect(question, quadrantId, itemId) {
        if (!quadrantId || !itemId) {
            return false;
        }

        return this.#getCorrectMatrixQuadrantId(question, itemId) === quadrantId;
    }

    #getSafeMatrixItems(question) {
        return Array.isArray(question?.items) ? question.items : [];
    }

    #getSequenceItems(question) {
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

    #getCorrectSequenceOrder(question) {
        const explicitOrder = this.#getExplicitCorrectSequenceOrder(question);

        if (explicitOrder.length > 0) {
            return explicitOrder;
        }

        const items = this.#getSequenceItems(question);
        const orderedItems = items.filter((item) => {
            return Number.isFinite(item?.correctIndex) || Number.isFinite(item?.correctPosition) || Number.isFinite(item?.order);
        });

        if (orderedItems.length > 0) {
            return [...orderedItems]
                .sort((firstItem, secondItem) => this.#getSequenceSortIndex(firstItem) - this.#getSequenceSortIndex(secondItem))
                .map((item) => item.id)
                .filter(Boolean);
        }

        return items.map((item) => item.id).filter(Boolean);
    }

    #getExplicitCorrectSequenceOrder(question) {
        const correctOrder = question?.correctOrder ?? question?.correctSequence ?? question?.correctAnswer;

        if (!Array.isArray(correctOrder)) {
            return [];
        }

        return correctOrder
            .map((entry) => this.#getSequenceOrderEntryId(entry))
            .filter(Boolean);
    }

    #getSequenceOrderEntryId(entry) {
        if (typeof entry === "string") {
            return entry;
        }

        if (Number.isFinite(entry)) {
            return String(entry);
        }

        if (this.#isPlainObject(entry)) {
            return entry.id ?? entry.sequenceItemId ?? entry.itemId ?? entry.cardId ?? null;
        }

        return null;
    }

    #normalizeSequenceOrderAnswer(question, answer) {
        const correctOrder = this.#getCorrectSequenceOrder(question);
        const itemIds = new Set(this.#getSequenceItems(question).map((item) => item.id).filter(Boolean));
        const rawAnswer = Array.isArray(answer?.sequence)
            ? answer.sequence
            : Array.isArray(answer?.order)
                ? answer.order
                : answer;
        const answerItemIds = Array.isArray(rawAnswer)
            ? rawAnswer.map((entry) => this.#getSequenceOrderEntryId(entry))
            : [];
        const usedItemIds = new Set();

        return correctOrder.map((_, index) => {
            const itemId = answerItemIds[index];

            if (!itemId || usedItemIds.has(itemId)) {
                return null;
            }

            if (itemIds.size > 0 && !itemIds.has(itemId)) {
                return null;
            }

            usedItemIds.add(itemId);
            return itemId;
        });
    }

    #getSequenceSortIndex(item) {
        if (Number.isFinite(item?.correctIndex)) {
            return item.correctIndex;
        }

        if (Number.isFinite(item?.correctPosition)) {
            return item.correctPosition;
        }

        if (Number.isFinite(item?.order)) {
            return item.order;
        }

        return 0;
    }

    #getMatrixQuadrants(question) {
        if (Array.isArray(question?.matrix?.quadrants)) {
            return question.matrix.quadrants;
        }

        if (Array.isArray(question?.quadrants)) {
            return question.quadrants;
        }

        return [];
    }

    #getSortedSelectedIndexes(answer) {
        if (!Array.isArray(answer)) {
            return [];
        }

        return [...answer].sort(this.#sortAscending);
    }

    #getSortedCorrectIndexes(question) {
        return getCorrectIndexes(question).sort(this.#sortAscending);
    }

    #areIndexListsEqual(firstList, secondList) {
        if (firstList.length !== secondList.length) {
            return false;
        }

        return firstList.every((value, index) => {
            return value === secondList[index];
        });
    }

    #isPlainObject(value) {
        return Boolean(value && typeof value === "object" && !Array.isArray(value));
    }

    #sortAscending(a, b) {
        return a - b;
    }
}
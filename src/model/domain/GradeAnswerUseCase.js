//src/model/domain/GradeAnswerUseCase.js
import normalizeAnswer from "../../utils/answer/normalizeAnswer.js";
import getCorrectIndexes from "../../utils/answer/getCorrectIndexes.js";
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
        const items = Array.isArray(question?.items) ? question.items : [];
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
        const normalizedAnswer = normalizeAnswer(answer);

        return question.answers.some((acceptedAnswer) => {
            const normalizedAcceptedAnswer = normalizeAnswer(acceptedAnswer);

            return normalizedAcceptedAnswer === normalizedAnswer;
        });
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
        const items = Array.isArray(question?.items) ? question.items : [];
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
        const items = Array.isArray(question?.items) ? question.items : [];

        if (items.length === 0) {
            return 0;
        }

        const stats = this.getMatrixPlacementStats(question, answer);
        const rawScore = question.points * (stats.correct / items.length);

        return Number(rawScore.toFixed(2));
    }

    #normalizeMatrixPlacementAnswer(question, answer) {
        const rawAnswer = this.#isPlainObject(answer?.placements)
            ? answer.placements
            : answer;
        const safeAnswer = this.#isPlainObject(rawAnswer) ? rawAnswer : {};
        const itemIds = new Set((Array.isArray(question?.items) ? question.items : []).map((item) => item.id));
        const quadrantIds = new Set(this.#getMatrixQuadrants(question).map((quadrant) => quadrant.id));
        const normalizedAnswer = {};

        for (const itemId in safeAnswer) {
            const quadrantId = safeAnswer[itemId];

            if (!itemIds.has(itemId)) {
                continue;
            }

            if (!quadrantIds.has(quadrantId)) {
                continue;
            }

            normalizedAnswer[itemId] = quadrantId;
        }

        return normalizedAnswer;
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

    #getCorrectQuadrantId(question, itemId) {
        const correctAnswer = this.#isPlainObject(question?.correctAnswer)
            ? question.correctAnswer
            : {};
        const correctPlacements = this.#isPlainObject(question?.correctPlacements)
            ? question.correctPlacements
            : {};
        const item = Array.isArray(question?.items)
            ? question.items.find((candidate) => candidate.id === itemId)
            : null;

        return correctAnswer[itemId]
            ?? correctPlacements[itemId]
            ?? item?.correctQuadrantId
            ?? item?.quadrantId
            ?? null;
    }

    #isMatrixPlacementCorrect(question, quadrantId, itemId) {
        if (!quadrantId || !itemId) {
            return false;
        }

        return this.#getCorrectQuadrantId(question, itemId) === quadrantId;
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

    #isCategoryPlacementCorrect(question, categoryId, itemId) {
        if (!categoryId || !itemId) {
            return false;
        }

        return this.#getCorrectCategoryId(question, itemId) === categoryId;
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

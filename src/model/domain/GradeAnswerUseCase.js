//src/model/domain/GradeAnswerUseCase.js
import normalizeAnswer from "../../utils/answerutils/normalizeAnswer.js";
import getCorrectIndexes from "../../utils/answerutils/getCorrectIndexes.js";
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

        return false;
    }

    getQuestionScore(question, answer) {
        if (!question) {
            return 0;
        }

        if (question.type === QUESTION_TYPES.DRAG_DROP) {
            return this.#getDragDropQuestionScore(question, answer);
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

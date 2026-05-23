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

		return false;
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

	#sortAscending(a, b) {
		return a - b;
	}
}
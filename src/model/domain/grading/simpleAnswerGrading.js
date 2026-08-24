// src/model/domain/grading/simpleAnswerGrading.js
import normalizeAnswer from "../utils/normalizeAnswer.js";
import getCorrectIndexes from "../utils/getCorrectIndexes.js";
import { isFuzzyMatch } from "../utils/fuzzyMatch.js";
import { QUESTION_TYPES } from "../../../constants/QuestionTypes.js";

export function isSingleChoiceAnswerCorrect(question, answer) {
	const selectedOption = question.options?.[answer];

	if (!selectedOption) {
		return false;
	}

	return selectedOption.correct === true;
}

export function isMultiChoiceAnswerCorrect(question, answer) {
	const selectedIndexes = getSortedSelectedIndexes(answer);
	const correctIndexes = getSortedCorrectIndexes(question);

	return areIndexListsEqual(selectedIndexes, correctIndexes);
}

export function getFillMatchType(question, answer) {
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

function getSortedSelectedIndexes(answer) {
	if (!Array.isArray(answer)) {
		return [];
	}

	return [...answer].sort(sortAscending);
}

function getSortedCorrectIndexes(question) {
	return getCorrectIndexes(question).sort(sortAscending);
}

function areIndexListsEqual(firstList, secondList) {
	if (firstList.length !== secondList.length) {
		return false;
	}

	return firstList.every((value, index) => {
		return value === secondList[index];
	});
}

function sortAscending(firstValue, secondValue) {
	return firstValue - secondValue;
}

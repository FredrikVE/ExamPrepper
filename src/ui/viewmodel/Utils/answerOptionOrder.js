// src/ui/viewmodel/Utils/answerOptionOrder.js
import { QUESTION_TYPES } from "../../../constants/QuestionTypes.js";
import shuffleInPlace from "./shuffleInPlace.js";

export default function createAnswerOptionOrderByQuestionId(questions) {
	return questions.reduce((answerOptionOrderByQuestionId, question) => {
		const answerOptionCount = getAnswerOptionCount(question);

		if (answerOptionCount === 0) {
			return answerOptionOrderByQuestionId;
		}

		answerOptionOrderByQuestionId[question.id] = shuffleIndexes(answerOptionCount);

		return answerOptionOrderByQuestionId;
	}, {});
}

const getAnswerOptionCount = (question) => {
	if (question.type === QUESTION_TYPES.DROPDOWN_FILL) {
		return Array.isArray(question.items) ? question.items.length : 0;
	}

	if (question.type === QUESTION_TYPES.RADIO_BUTTON_GRID) {
		return Array.isArray(question.rows) ? question.rows.length : 0;
	}

	if (Array.isArray(question.options)) {
		return question.options.length;
	}

	if (shouldRandomizeItemBank(question) && Array.isArray(question.items)) {
		return question.items.length;
	}

	if (question.type === QUESTION_TYPES.SEQUENCE_ORDER) {
		return getSequenceOrderItemCount(question);
	}

	if (question.type === QUESTION_TYPES.DRAG_DROP && Array.isArray(question.cards)) {
		return question.cards.length;
	}

	return 0;
};

const shouldRandomizeItemBank = (question) => {
	return question.type === QUESTION_TYPES.DRAG_CATEGORIZE
		|| question.type === QUESTION_TYPES.MATRIX_PLACEMENT;
};

const getSequenceOrderItemCount = (question) => {
	if (Array.isArray(question.items)) {
		return question.items.length;
	}

	if (Array.isArray(question.alternatives)) {
		return question.alternatives.length;
	}

	if (Array.isArray(question.cards)) {
		return question.cards.length;
	}

	return 0;
};

const shuffleIndexes = (length) => {
	const indexes = Array.from({ length }, (_, index) => index);

	return shuffleInPlace(indexes, Math.random);
};

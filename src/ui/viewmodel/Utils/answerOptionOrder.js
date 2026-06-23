// src/ui/viewmodel/Utils/answerOptionOrder.js
import { QUESTION_TYPES } from "../../../constants/QuestionTypes.js";

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
		return 0;
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

	for (let index = indexes.length - 1; index > 0; index -= 1) {
		const randomIndex = Math.floor(Math.random() * (index + 1));
		[indexes[index], indexes[randomIndex]] = [indexes[randomIndex], indexes[index]];
	}

	return indexes;
};

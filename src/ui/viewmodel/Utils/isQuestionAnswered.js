// src/ui/viewmodel/Utils/isQuestionAnswered.js
import { QUESTION_TYPES } from "../../../constants/QuestionTypes.js";

export default function isQuestionAnswered(question, answer) {
	if (question.type === QUESTION_TYPES.MULTI) {
		return Array.isArray(answer) && answer.length > 0;
	}

	if (question.type === QUESTION_TYPES.DRAG_DROP || question.type === QUESTION_TYPES.DRAG_CATEGORIZE) {
		return answerHasAtLeastOneObjectValue(answer);
	}

	if (question.type === QUESTION_TYPES.SEQUENCE_ORDER) {
		const sequenceAnswer = Array.isArray(answer?.sequence)
			? answer.sequence
			: Array.isArray(answer?.order)
				? answer.order
				: answer;

		return Array.isArray(sequenceAnswer) && sequenceAnswer.some(Boolean);
	}

	if (question.type === QUESTION_TYPES.MATRIX_PLACEMENT) {
		return answerHasAtLeastOneObjectValue(answer?.placements ?? answer);
	}


	if (question.type === QUESTION_TYPES.DROPDOWN_FILL) {
		const items = Array.isArray(question.items) ? question.items : [];

		if (items.length === 0) {
			return false;
		}

		return Boolean(
			answer &&
			typeof answer === "object" &&
			!Array.isArray(answer) &&
			items.every((item) => Boolean(answer[item.id]))
		);
	}


	if (question.type === QUESTION_TYPES.RADIO_BUTTON_GRID) {
		const rows = Array.isArray(question.rows) ? question.rows : [];

		if (rows.length === 0) {
			return false;
		}

		return Boolean(
			answer &&
			typeof answer === "object" &&
			!Array.isArray(answer) &&
			rows.every((row) => Boolean(answer[row.id]))
		);
	}

	return answer !== undefined && String(answer).trim() !== "";
}

const answerHasAtLeastOneObjectValue = (answer) => {
	return Boolean(
		answer &&
		typeof answer === "object" &&
		!Array.isArray(answer) &&
		Object.values(answer).some(Boolean)
	);
};

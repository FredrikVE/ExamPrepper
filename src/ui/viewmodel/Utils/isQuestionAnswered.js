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

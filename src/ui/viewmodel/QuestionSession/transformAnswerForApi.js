//src/ui/viewmodel/QuestionSession/transformAnswerForApi.js
import { QUESTION_TYPES } from "../../../constants/QuestionTypes.js";

export default function transformAnswerForApi(question, answer) {
	if (!question) {
		return answer;
	}

	if (question.type === QUESTION_TYPES.SINGLE) {
		return transformSingleChoiceAnswer(question, answer);
	}

	if (question.type === QUESTION_TYPES.MULTI) {
		return transformMultiChoiceAnswer(question, answer);
	}

	if (question.type === QUESTION_TYPES.DRAG_DROP) {
		return transformDragDropAnswer(question, answer);
	}

	if (question.type === QUESTION_TYPES.DRAG_CATEGORIZE) {
		return transformDragCategorizeAnswer(answer);
	}

	return answer;
}

function transformSingleChoiceAnswer(question, answer) {
	if (!Array.isArray(question.options)) {
		return answer;
	}

	return resolveOptionId(question.options, answer);
}

function transformMultiChoiceAnswer(question, answer) {
	if (!Array.isArray(question.options) || !Array.isArray(answer)) {
		return answer;
	}

	return answer.map((index) => resolveOptionId(question.options, index));
}

function transformDragDropAnswer(question, answer) {
	if (!isPlainObject(answer)) {
		return answer;
	}

	const entries = Object.entries(answer);
	if (entries.length === 0) {
		return answer;
	}

	const targetIds = new Set((question.targets ?? []).map((target) => target.id));
	const cardIds = new Set((question.cards ?? []).map((card) => card.id));
	const usesFrontendShape = entries.every(([key, value]) => targetIds.has(key) && typeof value === "string" && cardIds.has(value));

	if (!usesFrontendShape) {
		return answer;
	}

	return Object.fromEntries(entries.map(([targetId, cardId]) => [cardId, targetId]));
}

function transformDragCategorizeAnswer(answer) {
	if (!isPlainObject(answer)) {
		return answer;
	}

	const entries = Object.entries(answer);
	if (entries.length === 0 || !entries.every(([, itemIds]) => Array.isArray(itemIds))) {
		return answer;
	}

	const apiAnswer = {};
	for (const [categoryId, itemIds] of entries) {
		for (const itemId of itemIds) {
			if (typeof itemId === "string") {
				apiAnswer[itemId] = categoryId;
			}
		}
	}

	return apiAnswer;
}

function resolveOptionId(options, index) {
	if (typeof index !== "number") {
		return index;
	}

	const option = options[index];
	return option ? option.id : index;
}

function isPlainObject(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

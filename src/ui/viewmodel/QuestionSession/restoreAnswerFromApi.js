// src/ui/viewmodel/QuestionSession/restoreAnswerFromApi.js
import { QUESTION_TYPES } from "../../../constants/QuestionTypes.js";

/* Motstykket til transformAnswerForApi. Gjør et lagret API-svar om til
   svarformatet frontenden bruker, slik at et levert forsøk kan vises på nytt.
   Returnerer null når svaret ikke lar seg plassere i dagens versjon av spørsmålet. */
export default function restoreAnswerFromApi(question, apiAnswer) {
	if (!question || apiAnswer === null || apiAnswer === undefined) {
		return null;
	}

	if (question.type === QUESTION_TYPES.SINGLE) {
		return restoreSingleChoiceAnswer(question, apiAnswer);
	}

	if (question.type === QUESTION_TYPES.MULTI) {
		return restoreMultiChoiceAnswer(question, apiAnswer);
	}

	if (question.type === QUESTION_TYPES.DRAG_DROP) {
		return restoreDragDropAnswer(apiAnswer);
	}

	if (question.type === QUESTION_TYPES.DRAG_CATEGORIZE) {
		return restoreDragCategorizeAnswer(question, apiAnswer);
	}

	return apiAnswer;
}

function restoreSingleChoiceAnswer(question, apiAnswer) {
	if (typeof apiAnswer === "number") {
		return apiAnswer;
	}

	const optionIndex = findOptionIndex(question, apiAnswer);

	if (optionIndex === -1) {
		return null;
	}

	return optionIndex;
}

function restoreMultiChoiceAnswer(question, apiAnswer) {
	if (!Array.isArray(apiAnswer)) {
		return null;
	}

	const optionIndexes = [];

	for (const optionId of apiAnswer) {
		const optionIndex = typeof optionId === "number" ? optionId : findOptionIndex(question, optionId);

		if (optionIndex !== -1 && !optionIndexes.includes(optionIndex)) {
			optionIndexes.push(optionIndex);
		}
	}

	return optionIndexes;
}

/* API: { cardId: targetId }. Frontend: { targetId: cardId }. */
function restoreDragDropAnswer(apiAnswer) {
	if (!isPlainObject(apiAnswer)) {
		return null;
	}

	const answer = {};

	for (const [cardId, targetId] of Object.entries(apiAnswer)) {
		if (typeof targetId === "string") {
			answer[targetId] = cardId;
		}
	}

	return answer;
}

/* API: { itemId: categoryId }. Frontend: { categoryId: [itemId] } i samme
   rekkefølge som elementene i spørsmålet. */
function restoreDragCategorizeAnswer(question, apiAnswer) {
	if (!isPlainObject(apiAnswer)) {
		return null;
	}

	const answer = {};

	for (const category of question.categories ?? []) {
		answer[category.id] = [];
	}

	const itemIds = (question.items ?? []).map((item) => item.id);
	const orderedItemIds = [...itemIds, ...Object.keys(apiAnswer).filter((itemId) => !itemIds.includes(itemId))];

	for (const itemId of orderedItemIds) {
		const categoryId = apiAnswer[itemId];

		if (typeof categoryId !== "string") {
			continue;
		}

		if (!Array.isArray(answer[categoryId])) {
			answer[categoryId] = [];
		}

		answer[categoryId].push(itemId);
	}

	return answer;
}

function findOptionIndex(question, optionId) {
	if (!Array.isArray(question.options)) {
		return -1;
	}

	return question.options.findIndex((option) => option?.id === optionId);
}

function isPlainObject(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

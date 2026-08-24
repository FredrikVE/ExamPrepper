// src/model/domain/grading/placementAnswerGrading.js
import { calculatePartialScore, createEmptyStats, isPlainObject } from "./gradingUtils.js";

export function isDragDropAnswerFullyCorrect(question, answer) {
	const targets = getTargets(question);

	if (targets.length === 0 || !isPlainObject(answer)) {
		return false;
	}

	return targets.every((target) => {
		return answer[target.id] === target.correctCardId;
	});
}

export function getDragDropQuestionScore(question, answer) {
	const targets = getTargets(question);
	const stats = getDragDropStats(question, answer);

	return calculatePartialScore(question.points, stats.correct, targets.length);
}

export function getDragDropStats(question, answer) {
	const targets = getTargets(question);
	const safeAnswer = getSafeAnswer(answer);
	const stats = createEmptyStats();

	for (const target of targets) {
		const selectedCardId = safeAnswer[target.id];

		if (!selectedCardId) {
			stats.unanswered += 1;
			continue;
		}

		if (target.correctCardId === selectedCardId) {
			stats.correct += 1;
			continue;
		}

		stats.wrong += 1;
	}

	return stats;
}

export function isDragCategorizeAnswerFullyCorrect(question, answer) {
	const items = getItems(question);
	const safeAnswer = normalizeCategoryAnswer(question, answer);

	if (items.length === 0) {
		return false;
	}

	return items.every((item) => {
		const categoryId = getPlacedCategoryId(safeAnswer, item.id);

		return isCategoryPlacementCorrect(question, categoryId, item.id);
	});
}

export function getDragCategorizeQuestionScore(question, answer) {
	const items = getItems(question);
	const stats = getDragCategorizeStats(question, answer);

	return calculatePartialScore(question.points, stats.correct, items.length);
}

export function getDragCategorizeStats(question, answer) {
	const items = getItems(question);
	const safeAnswer = normalizeCategoryAnswer(question, answer);
	const stats = createEmptyStats();

	for (const item of items) {
		const categoryId = getPlacedCategoryId(safeAnswer, item.id);

		if (!categoryId) {
			stats.unanswered += 1;
			continue;
		}

		if (isCategoryPlacementCorrect(question, categoryId, item.id)) {
			stats.correct += 1;
			continue;
		}

		stats.wrong += 1;
	}

	return stats;
}

export function isMatrixPlacementAnswerFullyCorrect(question, answer) {
	const items = getSafeMatrixItems(question);
	const safeAnswer = normalizeMatrixPlacementAnswer(question, answer);

	if (items.length === 0) {
		return false;
	}

	return items.every((item) => {
		const quadrantId = safeAnswer[item.id];

		return isMatrixPlacementCorrect(question, quadrantId, item.id);
	});
}

export function getMatrixPlacementQuestionScore(question, answer) {
	const items = getSafeMatrixItems(question);
	const stats = getMatrixPlacementStats(question, answer);

	return calculatePartialScore(question.points, stats.correct, items.length);
}

export function getMatrixPlacementStats(question, answer) {
	const items = getSafeMatrixItems(question);
	const safeAnswer = normalizeMatrixPlacementAnswer(question, answer);
	const stats = createEmptyStats();

	for (const item of items) {
		const quadrantId = safeAnswer[item.id];

		if (!quadrantId) {
			stats.unanswered += 1;
			continue;
		}

		if (isMatrixPlacementCorrect(question, quadrantId, item.id)) {
			stats.correct += 1;
			continue;
		}

		stats.wrong += 1;
	}

	return stats;
}

export function isSequenceOrderAnswerFullyCorrect(question, answer) {
	const correctOrder = getCorrectSequenceOrder(question);
	const safeAnswer = normalizeSequenceOrderAnswer(question, answer);

	if (correctOrder.length === 0) {
		return false;
	}

	return correctOrder.every((correctItemId, index) => {
		return safeAnswer[index] === correctItemId;
	});
}

export function getSequenceOrderQuestionScore(question, answer) {
	const correctOrder = getCorrectSequenceOrder(question);
	const stats = getSequenceOrderStats(question, answer);

	return calculatePartialScore(question.points, stats.correct, correctOrder.length);
}

export function getSequenceOrderStats(question, answer) {
	const correctOrder = getCorrectSequenceOrder(question);
	const safeAnswer = normalizeSequenceOrderAnswer(question, answer);
	const stats = createEmptyStats();

	for (let index = 0; index < correctOrder.length; index += 1) {
		const correctItemId = correctOrder[index];
		const selectedItemId = safeAnswer[index];

		if (!selectedItemId) {
			stats.unanswered += 1;
			continue;
		}

		if (selectedItemId === correctItemId) {
			stats.correct += 1;
			continue;
		}

		stats.wrong += 1;
	}

	return stats;
}

function normalizeCategoryAnswer(question, answer) {
	const categories = getCategories(question);
	const safeAnswer = getSafeAnswer(answer);
	const usedItemIds = new Set();
	const normalizedAnswer = {};

	for (const category of categories) {
		let answerItemIds = [];

		if (Array.isArray(safeAnswer[category.id])) {
			answerItemIds = safeAnswer[category.id];
		}

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

function normalizeMatrixPlacementAnswer(question, answer) {
	let rawAnswer = answer;

	if (isPlainObject(answer?.placements)) {
		rawAnswer = answer.placements;
	}

	const safeAnswer = getSafeAnswer(rawAnswer);
	const itemIds = new Set(getSafeMatrixItems(question).map((item) => item.id));
	const quadrantIds = new Set(getMatrixQuadrants(question).map((quadrant) => quadrant.id));
	const shouldValidate = itemIds.size > 0 && quadrantIds.size > 0;
	const normalizedAnswer = {};

	for (const itemId in safeAnswer) {
		const quadrantId = safeAnswer[itemId];

		if (!quadrantId) {
			continue;
		}

		if (shouldValidate && (!itemIds.has(itemId) || !quadrantIds.has(quadrantId))) {
			continue;
		}

		removeExistingItemInQuadrant(normalizedAnswer, quadrantId);
		normalizedAnswer[itemId] = quadrantId;
	}

	return normalizedAnswer;
}

function removeExistingItemInQuadrant(answer, quadrantId) {
	for (const itemId in answer) {
		if (answer[itemId] === quadrantId) {
			delete answer[itemId];
		}
	}
}

function getPlacedCategoryId(answer, itemId) {
	for (const categoryId in answer) {
		if (Array.isArray(answer[categoryId]) && answer[categoryId].includes(itemId)) {
			return categoryId;
		}
	}

	return null;
}

function getCorrectCategoryId(question, itemId) {
	let item = null;

	if (Array.isArray(question?.items)) {
		item = question.items.find((candidate) => {
			return candidate?.id === itemId;
		});
	}

	if (!item || item.correctCategoryId === null || item.correctCategoryId === undefined) {
		return null;
	}

	return item.correctCategoryId;
}

function getCorrectMatrixQuadrantId(question, itemId) {
	const correctAnswer = getSafeAnswer(question?.correctAnswer);
	const correctPlacements = getSafeAnswer(question?.correctPlacements);
	const item = getSafeMatrixItems(question).find((candidate) => {
		return candidate.id === itemId;
	});

	if (correctAnswer[itemId] !== null && correctAnswer[itemId] !== undefined) {
		return correctAnswer[itemId];
	}

	if (correctPlacements[itemId] !== null && correctPlacements[itemId] !== undefined) {
		return correctPlacements[itemId];
	}

	if (item?.correctQuadrantId !== null && item?.correctQuadrantId !== undefined) {
		return item.correctQuadrantId;
	}

	if (item?.quadrantId !== null && item?.quadrantId !== undefined) {
		return item.quadrantId;
	}

	return null;
}

function isCategoryPlacementCorrect(question, categoryId, itemId) {
	if (!categoryId || !itemId) {
		return false;
	}

	return getCorrectCategoryId(question, itemId) === categoryId;
}

function isMatrixPlacementCorrect(question, quadrantId, itemId) {
	if (!quadrantId || !itemId) {
		return false;
	}

	return getCorrectMatrixQuadrantId(question, itemId) === quadrantId;
}

function getSafeMatrixItems(question) {
	return getItems(question);
}

function getTargets(question) {
	if (!Array.isArray(question?.targets)) {
		return [];
	}

	return question.targets;
}

function getItems(question) {
	if (!Array.isArray(question?.items)) {
		return [];
	}

	return question.items;
}

function getCategories(question) {
	if (!Array.isArray(question?.categories)) {
		return [];
	}

	return question.categories;
}

function getSafeAnswer(answer) {
	if (!isPlainObject(answer)) {
		return {};
	}

	return answer;
}

function getSequenceItems(question) {
	if (Array.isArray(question?.items)) {
		return question.items;
	}

	if (Array.isArray(question?.alternatives)) {
		return question.alternatives;
	}

	if (Array.isArray(question?.cards)) {
		return question.cards;
	}

	return [];
}

function getCorrectSequenceOrder(question) {
	const explicitOrder = getExplicitCorrectSequenceOrder(question);

	if (explicitOrder.length > 0) {
		return explicitOrder;
	}

	const items = getSequenceItems(question);
	const orderedItems = items.filter((item) => {
		return Number.isFinite(item?.correctIndex) || Number.isFinite(item?.correctPosition) || Number.isFinite(item?.order);
	});

	if (orderedItems.length > 0) {
		return [...orderedItems]
			.sort((firstItem, secondItem) => getSequenceSortIndex(firstItem) - getSequenceSortIndex(secondItem))
			.map((item) => item.id)
			.filter(Boolean);
	}

	return items.map((item) => item.id).filter(Boolean);
}

function getExplicitCorrectSequenceOrder(question) {
	let correctOrder = question?.correctOrder;

	if (correctOrder === null || correctOrder === undefined) {
		correctOrder = question?.correctSequence;
	}

	if (correctOrder === null || correctOrder === undefined) {
		correctOrder = question?.correctAnswer;
	}

	if (!Array.isArray(correctOrder)) {
		return [];
	}

	return correctOrder
		.map((entry) => getSequenceOrderEntryId(entry))
		.filter(Boolean);
}

function getSequenceOrderEntryId(entry) {
	if (typeof entry === "string") {
		return entry;
	}

	if (Number.isFinite(entry)) {
		return String(entry);
	}

	if (!isPlainObject(entry)) {
		return null;
	}

	if (entry.id !== null && entry.id !== undefined) {
		return entry.id;
	}

	if (entry.sequenceItemId !== null && entry.sequenceItemId !== undefined) {
		return entry.sequenceItemId;
	}

	if (entry.itemId !== null && entry.itemId !== undefined) {
		return entry.itemId;
	}

	if (entry.cardId !== null && entry.cardId !== undefined) {
		return entry.cardId;
	}

	return null;
}

function normalizeSequenceOrderAnswer(question, answer) {
	const correctOrder = getCorrectSequenceOrder(question);
	const itemIds = new Set(getSequenceItems(question).map((item) => item.id).filter(Boolean));
	let rawAnswer = answer;

	if (Array.isArray(answer?.sequence)) {
		rawAnswer = answer.sequence;
	}

	else if (Array.isArray(answer?.order)) {
		rawAnswer = answer.order;
	}

	let answerItemIds = [];

	if (Array.isArray(rawAnswer)) {
		answerItemIds = rawAnswer.map((entry) => getSequenceOrderEntryId(entry));
	}

	const usedItemIds = new Set();

	return correctOrder.map((_correctItemId, index) => {
		const itemId = answerItemIds[index];

		if (!itemId || usedItemIds.has(itemId)) {
			return null;
		}

		if (itemIds.size > 0 && !itemIds.has(itemId)) {
			return null;
		}

		usedItemIds.add(itemId);
		return itemId;
	});
}

function getSequenceSortIndex(item) {
	if (Number.isFinite(item?.correctIndex)) {
		return item.correctIndex;
	}

	if (Number.isFinite(item?.correctPosition)) {
		return item.correctPosition;
	}

	if (Number.isFinite(item?.order)) {
		return item.order;
	}

	return 0;
}

function getMatrixQuadrants(question) {
	if (Array.isArray(question?.matrix?.quadrants)) {
		return question.matrix.quadrants;
	}

	if (Array.isArray(question?.quadrants)) {
		return question.quadrants;
	}

	return [];
}

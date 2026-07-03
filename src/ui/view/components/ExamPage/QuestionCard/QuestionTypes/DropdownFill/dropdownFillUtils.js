// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DropdownFill/dropdownFillUtils.js

export function getDropdownFillOptions(question) {
	return sortByPosition(Array.isArray(question?.options) ? question.options : []);
}

export function getDropdownFillItems(question, answerOptionOrder = null) {
	return orderItemsByIndexOrder(
		sortByPosition(Array.isArray(question?.items) ? question.items : []),
		answerOptionOrder
	);
}

function getDropdownFillAnswer(answer) {
	if (!answer || typeof answer !== "object" || Array.isArray(answer)) {
		return {};
	}

	return answer;
}

export function getSelectedOptionId(answer, itemId) {
	const safeAnswer = getDropdownFillAnswer(answer);

	return safeAnswer[itemId] ?? "";
}

export function getOptionLabel(options, optionId) {
	const option = options.find((candidate) => candidate.id === optionId);

	return option?.label ?? optionId ?? "";
}

export function getDropdownFillItemResult(item, selectedOptionId, submitted) {
	if (!submitted) {
		return "default";
	}

	if (!selectedOptionId) {
		return "unanswered";
	}

	if (!item.correctOptionId) {
		return "default";
	}

	return selectedOptionId === item.correctOptionId ? "correct" : "wrong";
}

export function getDropdownFillStats(question, answer) {
	const items = getDropdownFillItems(question);
	const safeAnswer = getDropdownFillAnswer(answer);

	return items.reduce((stats, item) => {
		const selectedOptionId = safeAnswer[item.id];

		if (!selectedOptionId) {
			stats.unanswered += 1;
			return stats;
		}

		if (selectedOptionId === item.correctOptionId) {
			stats.correct += 1;
			return stats;
		}

		stats.wrong += 1;
		return stats;
	}, { correct: 0, wrong: 0, unanswered: 0 });
}

function orderItemsByIndexOrder(items, indexOrder) {
	if (!isValidIndexOrder(indexOrder, items.length)) {
		return items;
	}

	return indexOrder.map((index) => items[index]);
}

function isValidIndexOrder(indexOrder, itemCount) {
	if (!Array.isArray(indexOrder) || indexOrder.length !== itemCount) {
		return false;
	}

	const uniqueIndexes = new Set(indexOrder);

	return indexOrder.every((index) => {
		return Number.isInteger(index) && index >= 0 && index < itemCount;
	}) && uniqueIndexes.size === itemCount;
}

function sortByPosition(items) {
	return [...items].sort((firstItem, secondItem) => {
		return getPosition(firstItem) - getPosition(secondItem);
	});
}

function getPosition(item) {
	return Number.isFinite(item?.position) ? item.position : Number.MAX_SAFE_INTEGER;
}

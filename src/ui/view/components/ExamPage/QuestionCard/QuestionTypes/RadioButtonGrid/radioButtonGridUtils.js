// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/RadioButtonGrid/radioButtonGridUtils.js

export function getRadioButtonGridColumns(question) {
	return sortByPosition(Array.isArray(question?.columns) ? question.columns : []);
}

export function getRadioButtonGridRows(question, answerOptionOrder = null) {
	return orderItemsByIndexOrder(
		sortByPosition(Array.isArray(question?.rows) ? question.rows : []),
		answerOptionOrder
	);
}

function getRadioButtonGridAnswer(answer) {
	if (!answer || typeof answer !== "object" || Array.isArray(answer)) {
		return {};
	}

	return answer;
}

export function getSelectedColumnId(answer, rowId) {
	return getRadioButtonGridAnswer(answer)[rowId] ?? "";
}

export function getColumnLabel(columns, columnId) {
	return columns.find((column) => column.id === columnId)?.label ?? columnId;
}

export function getRadioButtonGridRowResult(row, selectedColumnId, submitted) {
	if (!submitted) {
		return selectedColumnId ? "answered" : "idle";
	}

	if (!selectedColumnId) {
		return "unanswered";
	}

	return selectedColumnId === row.correctColumnId ? "correct" : "wrong";
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

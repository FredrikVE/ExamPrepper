// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/RadioButtonGrid/radioButtonGridUtils.js

export function getRadioButtonGridColumns(question) {
	return Array.isArray(question?.columns) ? question.columns : [];
}

export function getRadioButtonGridRows(question) {
	return Array.isArray(question?.rows) ? question.rows : [];
}

export function getRadioButtonGridAnswer(answer) {
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

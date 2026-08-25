// src/model/algorithms/structuredAnswerGrading.js
export function isDropdownFillAnswerFullyCorrect(question, answer) {
	const items = getItems(question);
	const safeAnswer = normalizeDropdownFillAnswer(question, answer);

	if (items.length === 0) {
		return false;
	}

	return items.every((item) => {
		return safeAnswer[item.id] === item.correctOptionId;
	});
}

export function getDropdownFillQuestionScore(question, answer) {
	const items = getItems(question);
	const stats = getDropdownFillStats(question, answer);

	return calculatePartialScore(question.points, stats.correct, items.length);
}

export function getDropdownFillStats(question, answer) {
	const items = getItems(question);
	const safeAnswer = normalizeDropdownFillAnswer(question, answer);
	const stats = createEmptyStats();

	for (const item of items) {
		const selectedOptionId = safeAnswer[item.id];

		if (!selectedOptionId) {
			stats.unanswered += 1;
			continue;
		}

		if (selectedOptionId === item.correctOptionId) {
			stats.correct += 1;
			continue;
		}

		stats.wrong += 1;
	}

	return stats;
}

export function isWriteToFillMultipleBlankAnswerFullyCorrect(question, answer) {
	const items = getItems(question);

	if (items.length === 0) {
		return false;
	}

	const stats = getWriteToFillMultipleBlankStats(question, answer);

	return stats.correct === items.length;
}

export function getWriteToFillMultipleBlankQuestionScore(question, answer) {
	const items = getItems(question);
	const stats = getWriteToFillMultipleBlankStats(question, answer);

	return calculatePartialScore(question.points, stats.correct, items.length);
}

export function isRadioButtonGridAnswerFullyCorrect(question, answer) {
	const rows = getRows(question);
	const safeAnswer = normalizeRadioButtonGridAnswer(question, answer);

	if (rows.length === 0) {
		return false;
	}

	return rows.every((row) => {
		return safeAnswer[row.id] === row.correctColumnId;
	});
}

export function getRadioButtonGridQuestionScore(question, answer) {
	const rows = getRows(question);
	const stats = getRadioButtonGridStats(question, answer);

	return calculatePartialScore(question.points, stats.correct, rows.length);
}

export function getRadioButtonGridStats(question, answer) {
	const rows = getRows(question);
	const safeAnswer = normalizeRadioButtonGridAnswer(question, answer);
	const stats = createEmptyStats();

	for (const row of rows) {
		const selectedColumnId = safeAnswer[row.id];

		if (!selectedColumnId) {
			stats.unanswered += 1;
			continue;
		}

		if (selectedColumnId === row.correctColumnId) {
			stats.correct += 1;
			continue;
		}

		stats.wrong += 1;
	}

	return stats;
}

function getWriteToFillMultipleBlankStats(question, answer) {
	const safeAnswer = getSafeAnswer(answer);
	const optionLabelById = new Map(getOptions(question).map((option) => [option.id, option.label]));
	const stats = createEmptyStats();

	for (const item of getItems(question)) {
		const submittedValue = String(safeAnswer[item.id] ?? "");

		if (submittedValue.trim() === "") {
			stats.unanswered += 1;
			continue;
		}

		const expectedValue = optionLabelById.get(item.correctOptionId) ?? "";

		if (normalizeWrittenBlankValue(submittedValue) === normalizeWrittenBlankValue(expectedValue)) {
			stats.correct += 1;
		}

		else {
			stats.wrong += 1;
		}
	}

	return stats;
}

function normalizeWrittenBlankValue(value) {
	return String(value).normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

function normalizeDropdownFillAnswer(question, answer) {
	if (!isPlainObject(answer)) {
		return {};
	}

	const itemIds = new Set(getItems(question).map((item) => item.id));
	const optionIds = new Set(getOptions(question).map((option) => option.id));
	const normalizedAnswer = {};

	for (const itemId in answer) {
		const optionId = answer[itemId];

		if (!itemIds.has(itemId) || !optionIds.has(optionId)) {
			continue;
		}

		normalizedAnswer[itemId] = optionId;
	}

	return normalizedAnswer;
}

function normalizeRadioButtonGridAnswer(question, answer) {
	if (!isPlainObject(answer)) {
		return {};
	}

	const rowIds = new Set(getRows(question).map((row) => row.id));
	const columnIds = new Set(getColumns(question).map((column) => column.id));
	const normalizedAnswer = {};

	for (const rowId in answer) {
		const columnId = answer[rowId];

		if (!rowIds.has(rowId) || !columnIds.has(columnId)) {
			continue;
		}

		normalizedAnswer[rowId] = columnId;
	}

	return normalizedAnswer;
}

function getItems(question) {
	if (!Array.isArray(question?.items)) {
		return [];
	}

	return question.items;
}

function getOptions(question) {
	if (!Array.isArray(question?.options)) {
		return [];
	}

	return question.options;
}

function getRows(question) {
	if (!Array.isArray(question?.rows)) {
		return [];
	}

	return question.rows;
}

function getColumns(question) {
	if (!Array.isArray(question?.columns)) {
		return [];
	}

	return question.columns;
}

function getSafeAnswer(answer) {
	if (!isPlainObject(answer)) {
		return {};
	}

	return answer;
}

function createEmptyStats() {
	return {
		correct: 0,
		wrong: 0,
		unanswered: 0
	};
}

function calculatePartialScore(points, correctCount, totalCount) {
	if (totalCount === 0) {
		return 0;
	}

	const rawScore = points * (correctCount / totalCount);

	return Number(rawScore.toFixed(2));
}

function isPlainObject(value) {
	return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

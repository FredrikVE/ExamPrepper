// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/RadioButtonGrid/radioButtonGridViewState.js
import {
	getColumnLabel,
	getRadioButtonGridColumns,
	getRadioButtonGridRowResult,
	getRadioButtonGridRows,
	getSelectedColumnId
} from "./radioButtonGridUtils.js";

export const RADIO_GRID_OPTION_STATES = Object.freeze({
	IDLE: "idle",
	SELECTED: "selected",
	SELECTED_CORRECT: "selected-correct",
	SELECTED_WRONG: "selected-wrong",
	CORRECT_ANSWER_HINT: "correct-answer-hint"
});

export function createRadioButtonGridViewState({
	question,
	answer,
	answerOptionOrder,
	submitted,
	showAllFeedback,
	t
}) {
	const columns = getRadioButtonGridColumns(question);
	const feedbackMode = submitted && showAllFeedback;
	const disabled = Boolean(submitted);

	return {
		questionId: question.id,
		tableLabel: t.radioButtonGridTableLabel,
		statementHeaderLabel: t.radioButtonGridStatementHeader,
		rows: getRadioButtonGridRows(question, answerOptionOrder).map((row) => {
			return createRadioButtonGridRowViewState({
				question,
				row,
				columns,
				answer,
				disabled,
				feedbackMode,
				correctAnswerPrefix: t.radioButtonGridCorrectAnswer
			});
		})
	};
}

function createRadioButtonGridRowViewState({
	question,
	row,
	columns,
	answer,
	disabled,
	feedbackMode,
	correctAnswerPrefix
}) {
	const selectedColumnId = getSelectedColumnId(answer, row.id);
	const result = getRadioButtonGridRowResult(row, selectedColumnId, feedbackMode);
	const showCorrectAnswer = Boolean(feedbackMode && row.correctColumnId && selectedColumnId !== row.correctColumnId);

	return {
		id: row.id,
		text: row.text,
		result,
		rowClassName: `radio-grid-row radio-grid-row-${result}`,
		mobileCardClassName: `radio-grid-mobile-card radio-grid-row-${result}`,
		showCorrectAnswer,
		correctAnswerText: showCorrectAnswer
			? `${correctAnswerPrefix}: ${getColumnLabel(columns, row.correctColumnId)}`
			: "",
		options: columns.map((column) => {
			return createRadioButtonGridOptionViewState({
				questionId: question.id,
				row,
				column,
				selectedColumnId,
				disabled,
				feedbackMode,
				showCorrectAnswer
			});
		})
	};
}

function createRadioButtonGridOptionViewState({
	questionId,
	row,
	column,
	selectedColumnId,
	disabled,
	feedbackMode,
	showCorrectAnswer
}) {
	const checked = selectedColumnId === column.id;
	const correctAnswerChoice = showCorrectAnswer && row.correctColumnId === column.id;
	const visualState = getRadioButtonGridOptionVisualState({
		checked,
		correctAnswerChoice,
		correctColumnId: row.correctColumnId,
		columnId: column.id,
		feedbackMode,
		showCorrectAnswer
	});

	return {
		id: column.id,
		label: column.label,
		checked,
		disabled,
		correctAnswerChoice,
		visualState,
		desktopCellClassName: getDesktopCellClassName({ checked, correctAnswerChoice }),
		desktopChoiceClassName: getDesktopChoiceClassName({ correctAnswerChoice }),
		mobileOptionClassName: getMobileOptionClassName({ checked, correctAnswerChoice }),
		desktopInputId: `radio-grid-${questionId}-${row.id}-${column.id}`,
		desktopInputName: `radio-grid-${questionId}-${row.id}`,
		mobileInputId: `radio-grid-mobile-${questionId}-${row.id}-${column.id}`,
		mobileInputName: `radio-grid-mobile-${questionId}-${row.id}`,
		ariaLabel: `${row.text}: ${column.label}`
	};
}

function getRadioButtonGridOptionVisualState({
	checked,
	correctAnswerChoice,
	correctColumnId,
	columnId,
	feedbackMode,
	showCorrectAnswer
}) {
	if (checked && feedbackMode && correctColumnId === columnId) {
		return RADIO_GRID_OPTION_STATES.SELECTED_CORRECT;
	}

	if (checked && showCorrectAnswer) {
		return RADIO_GRID_OPTION_STATES.SELECTED_WRONG;
	}

	if (correctAnswerChoice) {
		return RADIO_GRID_OPTION_STATES.CORRECT_ANSWER_HINT;
	}

	if (checked) {
		return RADIO_GRID_OPTION_STATES.SELECTED;
	}

	return RADIO_GRID_OPTION_STATES.IDLE;
}

function getDesktopCellClassName({ checked, correctAnswerChoice }) {
	return joinClassNames([
		"radio-grid-cell",
		checked ? "radio-grid-cell-selected" : "",
		correctAnswerChoice ? "radio-grid-cell-correct-answer" : ""
	]);
}

function getDesktopChoiceClassName({ correctAnswerChoice }) {
	return joinClassNames([
		"radio-grid-choice",
		correctAnswerChoice ? "radio-grid-choice-correct-answer" : ""
	]);
}

function getMobileOptionClassName({ checked, correctAnswerChoice }) {
	return joinClassNames([
		"radio-grid-mobile-option",
		checked ? "radio-grid-mobile-option-selected" : "",
		correctAnswerChoice ? "radio-grid-mobile-option-correct-answer" : ""
	]);
}

function joinClassNames(classNames) {
	return classNames.filter(Boolean).join(" ");
}

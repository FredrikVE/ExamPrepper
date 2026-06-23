// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/RadioButtonGrid/RadioButtonGridQuestion.jsx
import FormattedText from "../../../../Shared/FormattedText.jsx";
import { getColumnLabel, getRadioButtonGridColumns, getRadioButtonGridRowResult, getRadioButtonGridRows, getSelectedColumnId } from "./radioButtonGridUtils.js";

export default function RadioButtonGridQuestion({ question, answer, submitted, showAllFeedback, onRadioButtonGridAnswer, t }) {
	const columns = getRadioButtonGridColumns(question);
	const rows = getRadioButtonGridRows(question);
	const feedbackMode = submitted && showAllFeedback;

	return (
		<div className="radio-grid-question">
			<div className="radio-grid-desktop" role="region" aria-label={t.radioButtonGridTableLabel}>
				<table className="radio-grid-table">
					<thead>
						<tr>
							<th scope="col" className="radio-grid-statement-header">{t.radioButtonGridStatementHeader}</th>
							{columns.map((column) => (
								<th key={column.id} scope="col">{column.label}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((row) => (
							<RadioGridTableRow
								key={row.id}
								question={question}
								row={row}
								columns={columns}
								answer={answer}
								disabled={submitted}
								feedbackMode={feedbackMode}
								onRadioButtonGridAnswer={onRadioButtonGridAnswer}
								t={t}
							/>
						))}
					</tbody>
				</table>
			</div>

			<div className="radio-grid-mobile">
				{rows.map((row) => (
					<RadioGridMobileRow
						key={row.id}
						question={question}
						row={row}
						columns={columns}
						answer={answer}
						disabled={submitted}
						feedbackMode={feedbackMode}
						onRadioButtonGridAnswer={onRadioButtonGridAnswer}
						t={t}
					/>
				))}
			</div>
		</div>
	);
}

function RadioGridTableRow({ question, row, columns, answer, disabled, feedbackMode, onRadioButtonGridAnswer, t }) {
	const selectedColumnId = getSelectedColumnId(answer, row.id);
	const result = getRadioButtonGridRowResult(row, selectedColumnId, feedbackMode);
	const shouldShowCorrectAnswer = feedbackMode && row.correctColumnId && selectedColumnId !== row.correctColumnId;

	return (
		<tr className={`radio-grid-row radio-grid-row-${result}`}>
			<th scope="row" className="radio-grid-row-text">
				<FormattedText text={row.text} />
				{shouldShowCorrectAnswer ? (
					<div className="radio-grid-correct-answer">
						{t.radioButtonGridCorrectAnswer}: {getColumnLabel(columns, row.correctColumnId)}
					</div>
				) : null}
			</th>
			{columns.map((column) => {
				const checked = selectedColumnId === column.id;
				const inputId = `radio-grid-${question.id}-${row.id}-${column.id}`;

				return (
					<td key={column.id} className={checked ? "radio-grid-cell radio-grid-cell-selected" : "radio-grid-cell"}>
						<label htmlFor={inputId} className="radio-grid-choice">
							<input
								id={inputId}
								type="radio"
								name={`radio-grid-${question.id}-${row.id}`}
								value={column.id}
								checked={checked}
								disabled={disabled}
								onChange={() => onRadioButtonGridAnswer(question.id, row.id, column.id)}
								aria-label={`${row.text}: ${column.label}`}
							/>
							<span className="radio-grid-choice-dot" aria-hidden="true" />
						</label>
					</td>
				);
			})}
		</tr>
	);
}

function RadioGridMobileRow({ question, row, columns, answer, disabled, feedbackMode, onRadioButtonGridAnswer, t }) {
	const selectedColumnId = getSelectedColumnId(answer, row.id);
	const result = getRadioButtonGridRowResult(row, selectedColumnId, feedbackMode);
	const shouldShowCorrectAnswer = feedbackMode && row.correctColumnId && selectedColumnId !== row.correctColumnId;

	return (
		<section className={`radio-grid-mobile-card radio-grid-row-${result}`}>
			<div className="radio-grid-mobile-statement">
				<FormattedText text={row.text} />
			</div>

			<div className="radio-grid-mobile-options" role="radiogroup" aria-label={row.text}>
				{columns.map((column) => {
					const checked = selectedColumnId === column.id;
					const inputId = `radio-grid-mobile-${question.id}-${row.id}-${column.id}`;

					return (
						<label key={column.id} htmlFor={inputId} className={checked ? "radio-grid-mobile-option radio-grid-mobile-option-selected" : "radio-grid-mobile-option"}>
							<input
								id={inputId}
								type="radio"
								name={`radio-grid-mobile-${question.id}-${row.id}`}
								value={column.id}
								checked={checked}
								disabled={disabled}
								onChange={() => onRadioButtonGridAnswer(question.id, row.id, column.id)}
							/>
							<span className="radio-grid-choice-dot" aria-hidden="true" />
							<span>{column.label}</span>
						</label>
					);
				})}
			</div>

			{shouldShowCorrectAnswer ? (
				<div className="radio-grid-correct-answer">
					{t.radioButtonGridCorrectAnswer}: {getColumnLabel(columns, row.correctColumnId)}
				</div>
			) : null}
		</section>
	);
}

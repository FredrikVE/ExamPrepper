// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/RadioButtonGrid/RadioGridDesktopTable.jsx
import RadioGridDesktopRow from "./RadioGridDesktopRow.jsx";

export default function RadioGridDesktopTable({ viewState, onRadioButtonGridAnswer }) {
	return (
		<div className="radio-grid-desktop" role="region" aria-label={viewState.tableLabel}>
			<table className="radio-grid-table">
				<thead>
					<tr>
						<th scope="col" className="radio-grid-statement-header">
							{viewState.statementHeaderLabel}
						</th>
						{viewState.rows[0]?.options.map((option) => (
							<th key={option.id} scope="col">
								{option.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{viewState.rows.map((row) => (
						<RadioGridDesktopRow
							key={row.id}
							row={row}
							onRadioButtonGridAnswer={onRadioButtonGridAnswer}
							questionId={viewState.questionId}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}

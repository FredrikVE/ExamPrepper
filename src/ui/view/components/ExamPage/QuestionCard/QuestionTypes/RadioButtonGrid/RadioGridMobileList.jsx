// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/RadioButtonGrid/RadioGridMobileList.jsx
import RadioGridMobileRow from "./RadioGridMobileRow.jsx";

export default function RadioGridMobileList({ viewState, onRadioButtonGridAnswer }) {
	return (
		<div className="radio-grid-mobile">
			{viewState.rows.map((row) => (
				<RadioGridMobileRow
					key={row.id}
					row={row}
					questionId={viewState.questionId}
					onRadioButtonGridAnswer={onRadioButtonGridAnswer}
				/>
			))}
		</div>
	);
}

// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/RadioButtonGrid/RadioGridDesktopRow.jsx
import FormattedText from "../../../../Shared/FormattedText.jsx";
import RadioGridDesktopOption from "./RadioGridDesktopOption.jsx";

export default function RadioGridDesktopRow({ row, questionId, onRadioButtonGridAnswer }) {
	return (
		<tr className={row.rowClassName}>
			<th scope="row" className="radio-grid-row-text">
				<FormattedText text={row.text} />
				{row.showCorrectAnswer ? (
					<div className="radio-grid-correct-answer">
						{row.correctAnswerText}
					</div>
				) : null}
			</th>

			{row.options.map((option) => (
				<RadioGridDesktopOption
					key={option.id}
					row={row}
					option={option}
					questionId={questionId}
					onRadioButtonGridAnswer={onRadioButtonGridAnswer}
				/>
			))}
		</tr>
	);
}

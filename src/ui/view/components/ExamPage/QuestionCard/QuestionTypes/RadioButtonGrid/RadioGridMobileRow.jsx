// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/RadioButtonGrid/RadioGridMobileRow.jsx
import FormattedText from "../../../../Shared/FormattedText.jsx";
import RadioGridMobileOption from "./RadioGridMobileOption.jsx";

export default function RadioGridMobileRow({ row, questionId, onRadioButtonGridAnswer }) {
	return (
		<section className={row.mobileCardClassName}>
			<div className="radio-grid-mobile-statement">
				<FormattedText text={row.text} />
			</div>

			<div className="radio-grid-mobile-options" role="radiogroup" aria-label={row.text}>
				{row.options.map((option) => (
					<RadioGridMobileOption
						key={option.id}
						row={row}
						option={option}
						questionId={questionId}
						onRadioButtonGridAnswer={onRadioButtonGridAnswer}
					/>
				))}
			</div>

			{row.showCorrectAnswer ? (
				<div className="radio-grid-correct-answer">
					{row.correctAnswerText}
				</div>
			) : null}
		</section>
	);
}

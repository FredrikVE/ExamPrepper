// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/RadioButtonGrid/RadioGridDesktopOption.jsx
export default function RadioGridDesktopOption({
	row,
	option,
	questionId,
	onRadioButtonGridAnswer
}) {
	return (
		<td className={option.desktopCellClassName} data-state={option.visualState}>
			<label
				htmlFor={option.desktopInputId}
				className={option.desktopChoiceClassName}
				data-state={option.visualState}
			>
				<input
					id={option.desktopInputId}
					type="radio"
					name={option.desktopInputName}
					value={option.id}
					checked={option.checked}
					disabled={option.disabled}
					onChange={() => onRadioButtonGridAnswer(questionId, row.id, option.id)}
					aria-label={option.ariaLabel}
				/>
				<span className="radio-grid-choice-dot" aria-hidden="true" />
			</label>
		</td>
	);
}

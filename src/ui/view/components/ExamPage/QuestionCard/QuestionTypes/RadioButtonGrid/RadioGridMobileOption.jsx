// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/RadioButtonGrid/RadioGridMobileOption.jsx
export default function RadioGridMobileOption({
	row,
	option,
	questionId,
	onRadioButtonGridAnswer
}) {
	return (
		<label
			htmlFor={option.mobileInputId}
			className={option.mobileOptionClassName}
			data-state={option.visualState}
		>
			<input
				id={option.mobileInputId}
				type="radio"
				name={option.mobileInputName}
				value={option.id}
				checked={option.checked}
				disabled={option.disabled}
				onChange={() => onRadioButtonGridAnswer(questionId, row.id, option.id)}
			/>
			<span className="radio-grid-choice-dot" aria-hidden="true" />
			<span>{option.label}</span>
		</label>
	);
}

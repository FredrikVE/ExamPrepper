// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DropdownFill/DropdownFillSelect.jsx

export default function DropdownFillSelect({ questionId, item, options, selectedOptionId, submitted, onDropdownFillAnswer, t }) {
	const selectId = `dropdown-fill-${questionId}-${item.id}`;

	const handleChange = (event) => {
		onDropdownFillAnswer(questionId, item.id, event.target.value);
	};

	const selectClassName = selectedOptionId
		? "dropdown-fill-select dropdown-fill-select-selected"
		: "dropdown-fill-select";

	return (
		<select
			id={selectId}
			className={selectClassName}
			value={selectedOptionId}
			disabled={submitted}
			aria-label={item.ariaLabel ?? t.dropdownFillSelectPlaceholder}
			onChange={handleChange}
		>
			<option value="">{t.dropdownFillSelectPlaceholder}</option>
			{options.map((option) => (
				<option key={option.id} value={option.id}>{option.label}</option>
			))}
		</select>
	);
}

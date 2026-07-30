//src/ui/view/components/QuestionCard/QuestionTypes/TapToFillMultipleBlank/TapToFillMultipleBlankQuestion.jsx
export default function TapToFillMultipleBlankQuestion({ question, answer, submitted, showAllFeedback, onMultipleBlankAnswer, t }) {
	const safeAnswer = answer && typeof answer === "object" && !Array.isArray(answer) ? answer : {};

	return (
		<div className="multiple-blank-question" aria-label={t.tapToFillMultipleBlankAriaLabel}>
			{question.items.map((item) => (
				<fieldset key={item.id} className="multiple-blank-item" disabled={submitted}>
					<legend>{item.beforeText} {item.afterText}</legend>
					<div className="multiple-blank-options">
						{question.options.map((option) => {
							const selected = safeAnswer[item.id] === option.id;
							const correct = showAllFeedback && option.id === item.correctOptionId;
							return <button key={option.id} type="button" className={selected ? "multiple-blank-option is-selected" : correct ? "multiple-blank-option is-correct" : "multiple-blank-option"} aria-pressed={selected} disabled={submitted} onClick={() => onMultipleBlankAnswer(question.id, item.id, option.id)}>{option.label}</button>;
						})}
					</div>
				</fieldset>
			))}
		</div>
	);
}

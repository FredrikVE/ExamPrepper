//src/ui/view/components/QuestionCard/QuestionTypes/WriteToFillMultipleBlank/WriteToFillMultipleBlankQuestion.jsx
export default function WriteToFillMultipleBlankQuestion({ question, answer, submitted, onMultipleBlankAnswer, t }) {
	const safeAnswer = answer && typeof answer === "object" && !Array.isArray(answer) ? answer : {};

	return (
		<div className="multiple-blank-question" aria-label={t.writeToFillMultipleBlankAriaLabel}>
			{question.items.map((item, index) => {
				const inputId = `${question.id}-${item.id}`;
				return (
					<div key={item.id} className="multiple-blank-item">
						<label htmlFor={inputId}>{item.beforeText} {item.afterText}</label>
						<input id={inputId} className="multiple-blank-input" type="text" value={String(safeAnswer[item.id] ?? "")} disabled={submitted} autoComplete="off" aria-label={t.writeToFillMultipleBlankInputLabel(index + 1)} onChange={(event) => onMultipleBlankAnswer(question.id, item.id, event.target.value)} />
					</div>
				);
			})}
		</div>
	);
}

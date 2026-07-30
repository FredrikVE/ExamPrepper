//src/ui/view/components/QuestionCard/QuestionTypes/WriteToFillMultipleBlank/WriteToFillMultipleBlankQuestion.jsx
import { createWriteToFillMultipleBlankViewState } from "../../../../../viewmodel/QuestionCard/WriteToFillMultipleBlank/writeToFillMultipleBlankState.js";

export default function WriteToFillMultipleBlankQuestion({ question, answer, submitted, onMultipleBlankAnswer, t }) {
	const viewState = createWriteToFillMultipleBlankViewState({ question, answer, t });

	return (
		<div className="write-multiple-blank" aria-label={t.writeToFillMultipleBlankAriaLabel}>
			{viewState.lines.map((line) => (
				<p key={line.id} className="write-multiple-blank__sentence">
					<span>{line.beforeText}</span>
					<input type="text" value={line.value} className={`write-multiple-blank__input write-multiple-blank__input--${line.inputSize}`} disabled={submitted} autoComplete="off" aria-label={line.accessibleLabel} onChange={(event) => onMultipleBlankAnswer(question.id, line.id, event.target.value)} />
					<span>{line.afterText}</span>
				</p>
			))}
		</div>
	);
}

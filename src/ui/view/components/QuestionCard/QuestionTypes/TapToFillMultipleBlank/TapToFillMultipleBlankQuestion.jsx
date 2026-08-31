//src/ui/view/components/QuestionCard/QuestionTypes/TapToFillMultipleBlank/TapToFillMultipleBlankQuestion.jsx
import { useState } from "react";
import { createTapToFillAnswerPreview, createTapToFillMultipleBlankViewState, findFirstEmptyTapToFillItemId, resolveTapToFillTargetItemId } from "../../../../../viewmodel/QuestionCard/TapToFillMultipleBlank/tapToFillMultipleBlankState.js";

export default function TapToFillMultipleBlankQuestion({ question, answer, submitted, showAllFeedback, onMultipleBlankAnswer, t }) {
	const [activeItemId, setActiveItemId] = useState(() => findFirstEmptyTapToFillItemId({ question, answer }));
	const viewState = createTapToFillMultipleBlankViewState({ question, answer, activeItemId });

	function handleBlankPressed(itemId, selectedOptionId) {
		if (submitted) return;
		if (selectedOptionId !== null) onMultipleBlankAnswer(question.id, itemId, null);
		setActiveItemId(itemId);
	}

	function handleOptionPressed(optionId) {
		if (submitted) return;
		const targetItemId = resolveTapToFillTargetItemId({ question, answer, activeItemId });
		if (targetItemId === null) return;
		const preview = createTapToFillAnswerPreview({ answer, itemId: targetItemId, optionId });
		for (const item of question.items) {
			if (item.id !== targetItemId && answer?.[item.id] === optionId) onMultipleBlankAnswer(question.id, item.id, null);
		}
		onMultipleBlankAnswer(question.id, targetItemId, optionId);
		setActiveItemId(findFirstEmptyTapToFillItemId({ question, answer: preview }));
	}

	return (
		<div className="tap-multiple-blank" aria-label={t.tapToFillMultipleBlankAriaLabel}>
			<div className="tap-multiple-blank__sentences">
				{viewState.lines.map((line) => (
					<p key={line.id} className="tap-multiple-blank__sentence">
						<span>{line.beforeText}</span>
						<button type="button" className={["tap-multiple-blank__blank", line.isActive ? "tap-multiple-blank__blank--active" : "", line.selectedOptionId !== null ? "tap-multiple-blank__blank--filled" : ""].join(" ").trim()} aria-label={t.tapToFillMultipleBlankInputLabel(line.index + 1)} aria-pressed={line.isActive} disabled={submitted} onClick={() => handleBlankPressed(line.id, line.selectedOptionId)}>{line.selectedLabel}</button>
						<span>{line.afterText}</span>
					</p>
				))}
			</div>

			<div className="tap-multiple-blank__divider" />

			<div className="tap-multiple-blank__options" aria-label={t.tapToFillMultipleBlankOptionsLabel}>
				{viewState.options.map((option) => (
					<button key={option.id} type="button" className={["tap-multiple-blank__option", showAllFeedback && option.isCorrect ? "tap-multiple-blank__option--correct" : ""].join(" ").trim()} disabled={submitted || option.isUsed} onClick={() => handleOptionPressed(option.id)}>{option.label}</button>
				))}
			</div>
		</div>
	);
}

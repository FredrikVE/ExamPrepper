// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DropdownFill/DropdownFillItem.jsx
import FormattedText from "../../../../Shared/FormattedText.jsx";
import DropdownFillSelect from "./DropdownFillSelect.jsx";
import { getDropdownFillItemResult, getOptionLabel, getSelectedOptionId } from "./dropdownFillUtils.js";

export default function DropdownFillItem({ question, item, options, answer, submitted, showAllFeedback, onDropdownFillAnswer, t }) {
	const selectedOptionId = getSelectedOptionId(answer, item.id);
	const result = getDropdownFillItemResult(item, selectedOptionId, submitted && showAllFeedback);
	const correctLabel = getOptionLabel(options, item.correctOptionId);
	const itemClassName = `dropdown-fill-item dropdown-fill-item-${result}`;
	const shouldShowCorrectAnswer = submitted && showAllFeedback && item.correctOptionId && selectedOptionId !== item.correctOptionId;

	return (
		<div className={itemClassName}>
			<div className="dropdown-fill-sentence">
				<span><FormattedText text={item.beforeText} /></span>
				<DropdownFillSelect
					questionId={question.id}
					item={item}
					options={options}
					selectedOptionId={selectedOptionId}
					submitted={submitted}
					onDropdownFillAnswer={onDropdownFillAnswer}
					t={t}
				/>
				<span><FormattedText text={item.afterText} /></span>
			</div>

			{submitted && showAllFeedback ? (
				<div className="dropdown-fill-feedback-row">
					<span className="dropdown-fill-feedback-pill">{getResultLabel(result, t)}</span>
					{shouldShowCorrectAnswer ? (
						<span className="dropdown-fill-correct-answer">
							{t.dropdownFillCorrectAnswer}: {correctLabel}
						</span>
					) : null}
				</div>
			) : null}
		</div>
	);
}

function getResultLabel(result, t) {
	if (result === "correct") return t.dropdownFillCorrect;
	if (result === "wrong") return t.dropdownFillWrong;
	if (result === "unanswered") return t.dropdownFillUnanswered;

	return t.dropdownFillAnswered;
}

// src/ui/view/components/ExamPage/QuestionCard/SelectableOption.jsx
import { QUESTION_TYPES } from "../../../../../constants/QuestionTypes.js";
import getOptionLetter from "../../../../../utils/answerutils/getOptionLetter.js";
import { getSelectableOptionClassName } from "./questionCardClassNames.js";

export default function SelectableOption({
    question,
    option,
    index,
    isSelected,
    submitted,
    onSingleAnswer,
    onToggleMultiAnswer
}) {
    const inputType = question.type === QUESTION_TYPES.SINGLE ? "radio" : "checkbox";

    const handleChange = () => {
        if (question.type === QUESTION_TYPES.SINGLE) {
            onSingleAnswer(question.id, index);
            return;
        }

        onToggleMultiAnswer(question.id, index);
    };

    return (
        <label
            className={`question-card-option ${getSelectableOptionClassName({ isSelected })} ${
                submitted ? "question-card-option-disabled" : ""
            }`}
        >
            <input
                type={inputType}
                disabled={submitted}
                checked={isSelected}
                onChange={handleChange}
                className="question-card-option-input"
            />

            <span className="question-card-option-choice-text">
                <span className="question-card-option-letter">
                    {getOptionLetter(index)}.
                </span>{" "}
                {option.text}
            </span>
        </label>
    );
}

import { getOptionLetter, getSelectableOptionClassName } from "./questionCardUtils.js";

export default function SelectableOption({
    question,
    option,
    index,
    isSelected,
    submitted,
    onSingleAnswer,
    onToggleMultiAnswer
}) {
    const inputType = question.type === "single" ? "radio" : "checkbox";

    const handleChange = () => {
        if (question.type === "single") {
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

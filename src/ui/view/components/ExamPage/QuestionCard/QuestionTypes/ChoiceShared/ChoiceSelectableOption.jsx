// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/ChoiceShared/ChoiceSelectableOption.jsx
import getOptionLetter from "./Utils/getOptionLetter.js";
import { getSelectableOptionClassName } from "../../Shared/Styling/questionCardClassNames.js";
import FormattedText from "../../../../Shared/FormattedText.jsx";

export default function ChoiceSelectableOption({ question, option, optionIndex, displayIndex, isSelected, submitted, inputType, onSingleAnswer, onToggleMultiAnswer }) {
    const handleChange = () => {
        if (inputType === "radio") {
            onSingleAnswer(question.id, optionIndex);
            return;
        }

        onToggleMultiAnswer(question.id, optionIndex);
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
                    {getOptionLetter(displayIndex)}.
                </span>{" "}
                <FormattedText text={option.text} />
            </span>
        </label>
    );
}

// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/ChoiceShared/ChoiceSelectableOption.jsx
import { QUESTION_TYPES } from "../../../../../../../constants/QuestionTypes.js";
import getOptionLetter from "./Utils/getOptionLetter.js";
import { getSelectableOptionClassName } from "../../Shared/Styling/questionCardClassNames.js";

export default function ChoiceSelectableOption({ question, option, optionIndex, displayIndex, isSelected, submitted, onSingleAnswer, onToggleMultiAnswer }) {
    const inputType = question.type === QUESTION_TYPES.SINGLE ? "radio" : "checkbox";

    const handleChange = () => {
        if (question.type === QUESTION_TYPES.SINGLE) {
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
                {option.text}
            </span>
        </label>
    );
}

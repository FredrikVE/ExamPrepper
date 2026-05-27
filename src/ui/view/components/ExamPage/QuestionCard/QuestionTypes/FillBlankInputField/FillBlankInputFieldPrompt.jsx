// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/FillBlankInputField/FillBlankInputFieldPrompt.jsx
import { QUESTION_CONFIG } from "../../../../../../../constants/QuestionConfig.js";
import { isInlineBlankPart, splitPromptByInlineBlank } from "./Utils/fillBlankPromptUtils.js";

export default function FillBlankInputFieldPrompt({ question, answerText, submitted, correct, onSingleAnswer, t }) {
    const parts = splitPromptByInlineBlank(question.prompt);
    let renderedInput = false;

    return parts.map((part, index) => {
        if (isInlineBlankPart(part) && !renderedInput) {
            renderedInput = true;

            return (
                <input
                    key={`blank-${index}`}
                    id={`question-${question.id}-answer`}
                    aria-label={t.questionAnswerLabel}
                    readOnly={submitted}
                    value={answerText}
                    maxLength={QUESTION_CONFIG.FILL_MAX_LENGTH}
                    onChange={submitted
                        ? undefined
                        : (event) => onSingleAnswer(question.id, event.target.value)
                    }
                    placeholder={t.questionInputPlaceholder}
                    className={getFillAnswerInputClassName({
                        baseClassName: "question-card-inline-input",
                        submitted,
                        correct
                    })}
                />
            );
        }

        return <span key={`text-${index}`}>{part}</span>;
    });
}

const getFillAnswerInputClassName = ({ baseClassName, submitted, correct }) => {
    if (!submitted) {
        return baseClassName;
    }

    return [
        baseClassName,
        "question-card-fill-input-feedback",
        correct
            ? "question-card-fill-input-feedback-correct"
            : "question-card-fill-input-feedback-wrong"
    ].join(" ");
};
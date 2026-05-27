// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/FillBlankInputField/FillBlankInputFieldInput.jsx
import { Edit3 } from "lucide-react";
import { QUESTION_CONFIG } from "../../../../../../../constants/QuestionConfig.js";
import FillBlankInputFieldMeta from "./FillBlankInputFieldMeta.jsx";

export default function FillBlankInputFieldInput({ question, answerText, submitted, correct, onSingleAnswer, t }) {
    const inputId = `question-${question.id}-answer`;

    return (
        <div className="question-card-answer-block">
            <label className="question-card-answer-label" htmlFor={inputId}>
                {t.questionAnswerLabel}
            </label>

            <div className="question-card-input-wrap">
                <input
                    id={inputId}
                    readOnly={submitted}
                    value={answerText}
                    maxLength={QUESTION_CONFIG.FILL_MAX_LENGTH}
                    onChange={submitted
                        ? undefined
                        : (event) => onSingleAnswer(question.id, event.target.value)
                    }
                    placeholder={t.questionInputPlaceholder}
                    className={getFillAnswerInputClassName({
                        baseClassName: "question-card-input",
                        submitted,
                        correct
                    })}
                />

                <span className="question-card-input-icon" aria-hidden="true">
                    <Edit3 />
                </span>
            </div>

            <FillBlankInputFieldMeta answerLength={answerText.length} t={t} />
        </div>
    );
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
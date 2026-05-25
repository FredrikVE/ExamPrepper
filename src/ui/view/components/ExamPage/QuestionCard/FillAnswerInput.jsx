import { Edit3 } from "lucide-react";
import { FILL_MAX_LENGTH } from "./constants.js";
import InputMeta from "./InputMeta.jsx";

export default function FillAnswerInput({ question, answerText, submitted, onSingleAnswer, t }) {
    const inputId = `question-${question.id}-answer`;

    return (
        <div className="question-card-answer-block">
            <label className="question-card-answer-label" htmlFor={inputId}>
                {t.questionAnswerLabel}
            </label>

            <div className="question-card-input-wrap">
                <input
                    id={inputId}
                    disabled={submitted}
                    value={answerText}
                    maxLength={FILL_MAX_LENGTH}
                    onChange={(event) => onSingleAnswer(question.id, event.target.value)}
                    placeholder={t.questionInputPlaceholder}
                    className="question-card-input"
                />
                <span className="question-card-input-icon" aria-hidden="true">
                    <Edit3 />
                </span>
            </div>

            <InputMeta answerLength={answerText.length} t={t} />
        </div>
    );
}

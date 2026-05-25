// src/ui/view/components/ExamPage/QuestionCard/PromptWithInlineAnswer.jsx
import { QUESTION_CONFIG } from "../../../../../constants/QuestionConfig.js";
import { isInlineBlankPart,splitPromptByInlineBlank } from "../../../../../utils/questionutils/fillPromptUtils.js";

export default function PromptWithInlineAnswer({ question, answerText, submitted, onSingleAnswer, t }) {
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
                    disabled={submitted}
                    value={answerText}
                    maxLength={QUESTION_CONFIG.FILL_MAX_LENGTH}
                    onChange={(event) => onSingleAnswer(question.id, event.target.value)}
                    placeholder={t.questionInputPlaceholder}
                    className="question-card-inline-input"
                />
            );
        }

        return <span key={`text-${index}`}>{part}</span>;
    });
}

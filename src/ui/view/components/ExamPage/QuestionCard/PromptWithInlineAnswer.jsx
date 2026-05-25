import { FILL_MAX_LENGTH, INLINE_FILL_BLANK_PATTERN, INLINE_FILL_SPLIT_PATTERN } from "./constants.js";

export default function PromptWithInlineAnswer({ question, answerText, submitted, onSingleAnswer, t }) {
    const parts = question.prompt.split(INLINE_FILL_SPLIT_PATTERN);
    let renderedInput = false;

    return parts.map((part, index) => {
        if (INLINE_FILL_BLANK_PATTERN.test(part) && !renderedInput) {
            renderedInput = true;

            return (
                <input
                    key={`blank-${index}`}
                    id={`question-${question.id}-answer`}
                    aria-label={t.questionAnswerLabel}
                    disabled={submitted}
                    value={answerText}
                    maxLength={FILL_MAX_LENGTH}
                    onChange={(event) => onSingleAnswer(question.id, event.target.value)}
                    placeholder={t.questionInputPlaceholder}
                    className="question-card-inline-input"
                />
            );
        }

        return <span key={`text-${index}`}>{part}</span>;
    });
}

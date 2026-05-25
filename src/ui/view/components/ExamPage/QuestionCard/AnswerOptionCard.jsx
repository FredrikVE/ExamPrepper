import { CheckCircle2, ChevronDown, XCircle } from "lucide-react";
import {
    getAnswerCardClassName,
    getExtendedExplanation,
    getOptionLetter
} from "./questionCardUtils.js";

export default function AnswerOptionCard({
    questionId,
    option,
    index,
    isSelected,
    isExpanded,
    onToggleExpanded,
    t
}) {
    const explanation = getExtendedExplanation(option);
    const hasExtended = explanation.length > 0;
    const expandedId = `question-${questionId}-option-${index}-extended`;
    const StatusIcon = option.correct ? CheckCircle2 : XCircle;

    return (
        <article
            className={`question-card-answer-card ${getAnswerCardClassName({
                correct: option.correct,
                isSelected
            })}`}
        >
            <div className="question-card-answer-card-left" aria-hidden="true">
                <span className="question-card-answer-letter">{getOptionLetter(index)}.</span>
                <StatusIcon className="question-card-answer-state-icon" />
            </div>

            <div className="question-card-answer-card-main">
                <div className="question-card-answer-card-header">
                    <AnswerOptionCopy option={option} />

                    <AnswerOptionActions
                        correct={option.correct}
                        hasExtended={hasExtended}
                        isExpanded={isExpanded}
                        expandedId={expandedId}
                        onToggleExpanded={onToggleExpanded}
                        StatusIcon={StatusIcon}
                        t={t}
                    />
                </div>

                {isSelected ? (
                    <div className="question-card-answer-selected-pill">
                        {t.feedbackOptionSelected}
                    </div>
                ) : null}

                {hasExtended && isExpanded ? (
                    <ExpandedExplanation id={expandedId} points={explanation} />
                ) : null}
            </div>
        </article>
    );
}

function AnswerOptionCopy({ option }) {
    return (
        <div className="question-card-answer-card-copy">
            <h4 className="question-card-answer-card-title">
                {option.text}
            </h4>
            <p className="question-card-answer-card-reason">
                {option.why}
            </p>
        </div>
    );
}

function AnswerOptionActions({
    correct,
    hasExtended,
    isExpanded,
    expandedId,
    onToggleExpanded,
    StatusIcon,
    t
}) {
    return (
        <div className="question-card-answer-card-actions">
            <AnswerStatusBadge correct={correct} StatusIcon={StatusIcon} t={t} />

            {hasExtended ? (
                <button
                    type="button"
                    className="question-card-answer-expand-button"
                    aria-expanded={isExpanded}
                    aria-controls={expandedId}
                    onClick={onToggleExpanded}
                >
                    {t.feedbackExtendedLabel}
                    <ChevronDown
                        className={`question-card-answer-expand-icon ${
                            isExpanded ? "question-card-answer-expand-icon-open" : ""
                        }`}
                    />
                </button>
            ) : null}
        </div>
    );
}

function AnswerStatusBadge({ correct, StatusIcon, t }) {
    return (
        <span
            className={`question-card-answer-badge ${
                correct
                    ? "question-card-answer-badge-correct"
                    : "question-card-answer-badge-wrong"
            }`}
        >
            <StatusIcon />
            {correct ? t.resultCorrect : t.resultWrong}
        </span>
    );
}

function ExpandedExplanation({ id, points }) {
    return (
        <div id={id} className="question-card-answer-extended">
            <ul className="question-card-answer-extended-list">
                {points.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
        </div>
    );
}

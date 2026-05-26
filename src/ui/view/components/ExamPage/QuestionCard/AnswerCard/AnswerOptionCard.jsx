// src/ui/view/components/ExamPage/QuestionCard/AnswerCard/AnswerOptionCard.jsx
import { Check, CheckCircle2, ChevronDown, X, XCircle } from "lucide-react";

export default function AnswerOptionCard({ questionId, option, index, isSelected, isExpanded, onToggleExpanded, t }) {
    const letter = getOptionLetter(index);
    const statusText = option.correct ? t?.resultCorrect ?? "Riktig" : t?.resultWrong ?? "Galt";

    const StatusIcon = option.correct ? CheckCircle2 : XCircle;
    const SelectedIcon = option.correct ? Check : X;

    const extendedPoints = getExtendedExplanationPoints(option);
    const hasExtended = extendedPoints.length > 0;

    const expandedId = `question-${questionId}-option-${index}-extended`;

    return (
        <article
            className={`question-card-answer-card ${getAnswerCardClassName({
                correct: option.correct,
                isSelected
            })}`}
        >
            <div className="question-card-answer-card-left" aria-hidden="true">
                <span className="question-card-answer-letter">
                    {letter}.
                </span>

                <span
                    className={`question-card-answer-marker ${
                        isSelected
                            ? "question-card-answer-marker-selected"
                            : option.correct
                                ? "question-card-answer-marker-correct"
                                : "question-card-answer-marker-wrong"
                    }`}
                >
                    {isSelected ? (
                        <SelectedIcon className="question-card-answer-marker-icon" />
                    ) : (
                        <StatusIcon className="question-card-answer-marker-icon" />
                    )}
                </span>
            </div>

            <div className="question-card-answer-card-main">
                <div className="question-card-answer-card-header">
                    <div className="question-card-answer-card-copy">
                        <h4 className="question-card-answer-card-title">
                            {option.text}
                        </h4>

                        {option.why ? (
                            <p className="question-card-answer-card-reason">
                                {option.why}
                            </p>
                        ) : null}
                    </div>

                    <AnswerOptionActions
                        option={option}
                        statusText={statusText}
                        StatusIcon={StatusIcon}
                        hasExtended={hasExtended}
                        isExpanded={isExpanded}
                        expandedId={expandedId}
                        onToggleExpanded={onToggleExpanded}
                        t={t}
                    />
                </div>

                {hasExtended && isExpanded ? (
                    <AnswerOptionExtendedPanel
                        expandedId={expandedId}
                        points={extendedPoints}
                    />
                ) : null}
            </div>
        </article>
    );
}

function AnswerOptionActions({ option, statusText, StatusIcon, hasExtended, isExpanded, expandedId, onToggleExpanded, t }) {
    return (
        <div className="question-card-answer-card-actions">
            <span
                className={`question-card-answer-badge ${
                    option.correct
                        ? "question-card-answer-badge-correct"
                        : "question-card-answer-badge-wrong"
                }`}
            >
                <StatusIcon />
                {statusText}
            </span>

            {hasExtended ? (
                <button
                    type="button"
                    className="question-card-answer-expand-button"
                    aria-expanded={isExpanded}
                    aria-controls={expandedId}
                    onClick={onToggleExpanded}
                >
                    {t?.feedbackExtendedLabel ?? "Utvidet forklaring"}

                    <ChevronDown
                        className={`question-card-answer-expand-icon ${
                            isExpanded
                                ? "question-card-answer-expand-icon-open"
                                : ""
                        }`}
                    />
                </button>
            ) : null}
        </div>
    );
}

function AnswerOptionExtendedPanel({ expandedId, points }) {
    return (
        <div id={expandedId} className="question-card-answer-extended">
            <ul className="question-card-answer-extended-list">
                {points.map((point, pointIndex) => (
                    <li key={pointIndex}>{point}</li>
                ))}
            </ul>
        </div>
    );
}

const getExtendedExplanationPoints = (option) => {
    return Array.isArray(option?.whyExtended) ? option.whyExtended : [];
};

const getOptionLetter = (index) => {
    return String.fromCharCode(65 + index);
};

const getAnswerCardClassName = ({ correct, isSelected }) => {
    const statusClassName = correct
        ? "question-card-answer-card-correct"
        : "question-card-answer-card-wrong";

    return `${statusClassName} ${
        isSelected ? "question-card-answer-card-selected" : ""
    }`;
};
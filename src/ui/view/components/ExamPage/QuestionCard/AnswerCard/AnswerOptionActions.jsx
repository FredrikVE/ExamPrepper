// src/ui/view/components/ExamPage/QuestionCard/AnswerCard/AnswerOptionActions.jsx
import { ChevronDown } from "lucide-react";
import { getAnswerBadgeClassName } from "../../../../../../utils/answerutils/answerOptionUtils/answerOptionCardUtils.js";

export default function AnswerOptionActions({ correct, statusText, StatusIcon, hasExtended, isExpanded, expandedId, onToggleExpanded, t }) {
    return (
        <div className="question-card-answer-card-actions">
            <span
                className={`question-card-answer-badge ${getAnswerBadgeClassName({
                    correct
                })}`}
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
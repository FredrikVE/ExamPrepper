// src/ui/view/components/ExamPage/QuestionCard/AnswerCard/AnswerOptionCard.jsx
import { CheckCircle2, XCircle } from "lucide-react";
import AnswerOptionActions from "./AnswerOptionActions.jsx";
import AnswerOptionExtendedPanel from "./AnswerOptionExtendedPanel.jsx";
import AnswerOptionMarker from "./AnswerOptionMarker.jsx";
import { getAnswerCardClassName, getExtendedExplanationPoints, getOptionLetter } from "../../../../../../utils/answerutils/answerOptionUtils/answerOptionCardUtils.js";

export default function AnswerOptionCard({ questionId, option, index, isSelected, isExpanded, onToggleExpanded, t }) {
    const letter = getOptionLetter(index);
    const statusText = option.correct
        ? t?.resultCorrect ?? "Riktig"
        : t?.resultWrong ?? "Feil";

    const StatusIcon = option.correct ? CheckCircle2 : XCircle;

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
            <AnswerOptionMarker
                letter={letter}
                correct={option.correct}
                isSelected={isSelected}
            />

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
                        correct={option.correct}
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
                        t={t}
                    />
                ) : null}
            </div>
        </article>
    );
}
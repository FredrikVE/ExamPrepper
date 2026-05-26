//src/ui/view/components/ExamPage/QuestionCard/AnswerCard/AnswerOptionMarker.jsx
import { Check, CheckCircle2, X, XCircle } from "lucide-react";
import { getAnswerMarkerClassName } from "../../../../../../utils/answerutils/answerOptionUtils/answerOptionCardUtils.js";

export default function AnswerOptionMarker({ letter, correct, isSelected }) {
    const StatusIcon = correct ? CheckCircle2 : XCircle;
    const SelectedIcon = correct ? Check : X;

    return (
        <div
            className="question-card-answer-card-left"
            aria-hidden="true"
        >
            <span className="question-card-answer-letter">
                {letter}.
            </span>

            <span
                className={`question-card-answer-marker ${getAnswerMarkerClassName({
                    correct,
                    isSelected
                })}`}
            >
                {isSelected ? (
                    <SelectedIcon className="question-card-answer-marker-icon" />
                ) : (
                    <StatusIcon className="question-card-answer-marker-icon" />
                )}
            </span>
        </div>
    );
}
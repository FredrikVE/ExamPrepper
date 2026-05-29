// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Feedback/SequenceOrderFeedbackSlot.jsx
import { CheckCircle2, XCircle } from "lucide-react";
import DragDropFeedbackExpandButton from "../../Shared/Feedback/DragDropFeedbackExpandButton.jsx";
import DragDropFeedbackExplanation from "../../Shared/Feedback/DragDropFeedbackExplanation.jsx";
import { getSequenceItemFeedback, getSequenceItemLabel } from "../Utils/sequenceOrderAnswerLogic.js";

export default function SequenceOrderFeedbackSlot(props) {
    const selectedSequenceItemId = props.safeAnswer[props.index];
    const correctSequenceItemId = props.correctOrder[props.index];
    const selectedSequenceItem = props.sequenceItemsById[selectedSequenceItemId];
    const correctSequenceItem = props.sequenceItemsById[correctSequenceItemId];
    const isCorrect = selectedSequenceItemId === correctSequenceItemId;
    const unanswered = !selectedSequenceItemId;
    const feedback = getSequenceItemFeedback(props.question, correctSequenceItemId);
    const selectedSequenceItemLabel = selectedSequenceItem ? getSequenceItemLabel(selectedSequenceItem) : props.t.dragDropUnanswered;
    const correctSequenceItemLabel = correctSequenceItem ? getSequenceItemLabel(correctSequenceItem) : correctSequenceItemId;
    const reason = isCorrect ? feedback.whyCorrect ?? feedback.why : feedback.whyWrong ?? feedback.why;
    const extendedPoints = Array.isArray(feedback.whyExtended) ? feedback.whyExtended : [];
    const extendedImages = Array.isArray(feedback.whyExtendedImages) ? feedback.whyExtendedImages : [];
    const showCorrectAnswer = !isCorrect && Boolean(correctSequenceItemLabel);
    const hasExplanation = Boolean(reason) || extendedPoints.length > 0 || extendedImages.length > 0 || showCorrectAnswer;

    return (
        <article className={getFeedbackSlotClassName({ isCorrect, unanswered })}>
            <div className="sequence-order-feedback-slot-main">
                <div className="sequence-order-feedback-slot-label-row">
                    {isCorrect ? (
                        <CheckCircle2 className="sequence-order-feedback-icon" aria-hidden="true" />
                    ) : (
                        <XCircle className="sequence-order-feedback-icon" aria-hidden="true" />
                    )}

                    <span className="sequence-order-feedback-slot-label">
                        {selectedSequenceItemLabel}
                    </span>
                </div>

                <div className="sequence-order-feedback-actions">
                    <span className="sequence-order-feedback-status">
                        {getFeedbackStatus({ isCorrect, unanswered, t: props.t })}
                    </span>

                    {hasExplanation ? (
                        <DragDropFeedbackExpandButton
                            isExpanded={props.isExpanded}
                            onToggleExpanded={props.onToggleExpanded}
                            showLabel={props.t.dragDropShowExplanation}
                            hideLabel={props.t.dragDropHideExplanation}
                        />
                    ) : null}
                </div>
            </div>

            {hasExplanation && props.isExpanded ? (
                <DragDropFeedbackExplanation
                    reason={reason}
                    extendedPoints={extendedPoints}
                    images={extendedImages}
                    showCorrectAnswer={showCorrectAnswer}
                    correctAnswerLabel={correctSequenceItemLabel}
                    correctAnswerPrefix={props.t.feedbackCorrectAnswerLabel}
                />
            ) : null}
        </article>
    );
}

function getFeedbackSlotClassName({ isCorrect, unanswered }) {
    let className = "sequence-order-feedback-slot";

    if (isCorrect) {
        className += " sequence-order-feedback-slot-correct";
    } else {
        className += " sequence-order-feedback-slot-wrong";
    }

    if (unanswered) {
        className += " sequence-order-feedback-slot-unanswered";
    }

    return className;
}

function getFeedbackStatus({ isCorrect, unanswered, t }) {
    if (unanswered) {
        return t.dragDropUnanswered;
    }

    if (isCorrect) {
        return t.resultCorrect;
    }

    return t.resultWrong;
}

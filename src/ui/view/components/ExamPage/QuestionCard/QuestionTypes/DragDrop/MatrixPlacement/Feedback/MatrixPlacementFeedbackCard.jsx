// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/Feedback/MatrixPlacementFeedbackCard.jsx
import { CheckCircle2, XCircle } from "lucide-react";
import DragDropFeedbackExpandButton from "../../Shared/Feedback/DragDropFeedbackExpandButton.jsx";
import DragDropFeedbackExplanation from "../../Shared/Feedback/DragDropFeedbackExplanation.jsx";
import { getCorrectQuadrantId, getItemFeedback, getItemLabel, getMatrixPlacementItemStatus, getQuadrantLabelById, getSelectedQuadrantId } from "../Utils/matrixPlacementAnswerLogic.js";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";

export default function MatrixPlacementFeedbackCard(props) {
    const status = getMatrixPlacementItemStatus(props.question, props.answer, props.item.id);
    const itemIsCorrect = status === "correct";
    const unanswered = status === "unanswered";
    const feedback = getItemFeedback(props.question, props.item.id);
    const correctQuadrantId = getCorrectQuadrantId(props.question, props.item.id);
    const selectedQuadrantId = getSelectedQuadrantId(props.answer, props.item.id);
    const correctQuadrantLabel = getQuadrantLabelById(props.question, correctQuadrantId);
    const selectedQuadrantLabel = getQuadrantLabelById(props.question, selectedQuadrantId);
    const reason = itemIsCorrect ? feedback.whyCorrect : feedback.whyWrong;
    const extendedPoints = Array.isArray(feedback.whyExtended) ? feedback.whyExtended : [];
    const extendedImages = Array.isArray(feedback.whyExtendedImages) ? feedback.whyExtendedImages : [];
    const showCorrectAnswer = !itemIsCorrect && Boolean(correctQuadrantLabel);
    const showSelectedAnswer = !unanswered && !itemIsCorrect && Boolean(selectedQuadrantLabel);
    const hasExplanation = Boolean(reason) || extendedPoints.length > 0 || extendedImages.length > 0 || showCorrectAnswer || showSelectedAnswer;

    return (
        <article className={getFeedbackCardClassName({
            itemIsCorrect,
            unanswered,
            isUserPlacementCard: props.isUserPlacementCard
        })}>
            <div className="matrix-placement-feedback-main">
                <div className="matrix-placement-feedback-title-row">
                    {itemIsCorrect ? (
                        <CheckCircle2 className="matrix-placement-feedback-icon" aria-hidden="true" />
                    ) : (
                        <XCircle className="matrix-placement-feedback-icon" aria-hidden="true" />
                    )}

                    <span className="matrix-placement-feedback-title">
                        <FormattedText text={getItemLabel(props.item)} />
                    </span>
                </div>

                <div className="matrix-placement-feedback-actions">
                    <span className="matrix-placement-feedback-status">
                        {getFeedbackStatus({ itemIsCorrect, unanswered, t: props.t })}
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
                <MatrixPlacementFeedbackExplanation
                    reason={reason}
                    extendedPoints={extendedPoints}
                    images={extendedImages}
                    showCorrectAnswer={showCorrectAnswer}
                    correctQuadrantLabel={correctQuadrantLabel}
                    showSelectedAnswer={showSelectedAnswer}
                    selectedQuadrantLabel={selectedQuadrantLabel}
                    t={props.t}
                />
            ) : null}
        </article>
    );
}

function MatrixPlacementFeedbackExplanation(props) {
    return (
        <div className="matrix-placement-feedback-explanation">
            {props.showSelectedAnswer ? (
                <p className="drag-drop-feedback-correct-answer matrix-placement-feedback-selected-answer">
                    <strong>{props.t.feedbackYourAnswerLabel}:</strong> <FormattedText text={props.selectedQuadrantLabel} />
                </p>
            ) : null}

            <DragDropFeedbackExplanation
                reason={props.reason}
                extendedPoints={props.extendedPoints}
                showCorrectAnswer={props.showCorrectAnswer}
                correctAnswerLabel={props.correctQuadrantLabel}
                correctAnswerPrefix={props.t.feedbackCorrectAnswerLabel}
            />
        </div>
    );
}

function getFeedbackCardClassName({ itemIsCorrect, unanswered, isUserPlacementCard }) {
    let className = "matrix-placement-feedback-card";

    if (itemIsCorrect) {
        className += " matrix-placement-feedback-card-correct";
    } else {
        className += " matrix-placement-feedback-card-wrong";
    }

    if (unanswered) {
        className += " matrix-placement-feedback-card-unanswered";
    }

    if (isUserPlacementCard) {
        className += " matrix-placement-feedback-card-user-placement";
    }

    return className;
}

function getFeedbackStatus({ itemIsCorrect, unanswered, t }) {
    if (unanswered) {
        return t.dragDropUnanswered;
    }

    if (itemIsCorrect) {
        return t.resultCorrect;
    }

    return t.resultWrong;
}

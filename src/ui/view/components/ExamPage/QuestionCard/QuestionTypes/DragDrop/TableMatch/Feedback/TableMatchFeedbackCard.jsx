//src/ui/view/components/ExamPage/QuestionCard/DragDrop/Feedback/TableMatchFeedbackCard.jsx
import { getTargetStatus } from "../Utils/tableMatchAnswerLogic.js";
import DragDropFeedbackExplanation from "../../Shared/Feedback/DragDropFeedbackExplanation.jsx";
import DragDropFeedbackExpandButton from "../../Shared/Feedback/DragDropFeedbackExpandButton.jsx";
import { getAnswerText, getExtendedPoints, getFeedbackCardClassName, getFeedbackReason, shouldShowCorrectAnswer } from "../Utils/tableMatchFeedbackCardView.js";

export default function TableMatchFeedbackCard(props) {
    const status = getTargetStatus({
        targetIsAnswered: props.targetIsAnswered,
        targetIsCorrect: props.targetIsCorrect,
        t: props.t
    });

    const reason = getFeedbackReason(props.target, props.targetIsCorrect);
    const extendedPoints = getExtendedPoints(props.target);
    const correctAnswerLabel = props.target.correctLabel ?? props.target.correctCardId;

    const showCorrectAnswer = shouldShowCorrectAnswer({
        targetIsCorrect: props.targetIsCorrect,
        correctAnswerLabel
    });

    const hasExplanation = Boolean(reason) || extendedPoints.length > 0 || showCorrectAnswer;

    let expandButton = null;
    if (hasExplanation) {
        expandButton = (
            <DragDropFeedbackExpandButton
                isExpanded={props.isExpanded}
                onToggleExpanded={props.onToggleExpanded}
                showLabel={props.t.dragDropShowExplanation}
                hideLabel={props.t.dragDropHideExplanation}
            />
        );
    }

    let explanation = null;
    if (hasExplanation && props.isExpanded) {
        explanation = (
            <DragDropFeedbackExplanation
                reason={reason}
                extendedPoints={extendedPoints}
                showCorrectAnswer={showCorrectAnswer}
                correctAnswerLabel={correctAnswerLabel}
                correctAnswerPrefix={props.t.feedbackCorrectAnswerLabel}
            />
        );
    }

    return (
        <article
            className={getFeedbackCardClassName({
                targetIsAnswered: props.targetIsAnswered,
                targetIsCorrect: props.targetIsCorrect
            })}
        >
            <div className="drag-drop-feedback-target-main">
                <div className="drag-drop-feedback-answer-title">
                    {getAnswerText({
                        selectedCard: props.selectedCard,
                        unansweredText: props.t.dragDropUnanswered
                    })}
                </div>

                <div className="drag-drop-feedback-actions">
                    <span className="drag-drop-feedback-status">
                        {status}
                    </span>

                    {expandButton}
                </div>
            </div>

            {explanation}
        </article>
    );
}
// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/CategorySort/Feedback/CategorySortFeedbackCard.jsx
import { CheckCircle2, XCircle } from "lucide-react";
import { getCategoryLabelById, getCorrectCategoryId, getItemFeedback, getItemLabel, isItemCorrectlyPlaced } from "../Utils/categorySortAnswerLogic.js";
import DragDropFeedbackExpandButton from "../../Shared/Feedback/DragDropFeedbackExpandButton.jsx";
import DragDropFeedbackExplanation from "../../Shared/Feedback/DragDropFeedbackExplanation.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";

export default function CategorySortFeedbackCard(props) {
    const correctCategoryId = getCorrectCategoryId(props.question, props.item.id);
    const correctCategoryLabel = getCategoryLabelById(props.question, correctCategoryId);
    const itemIsCorrect = !props.unanswered && isItemCorrectlyPlaced(props.question, props.category?.id, props.item.id);
    const feedback = getItemFeedback(props.question, props.item.id);
    const reason = itemIsCorrect
        ? feedback.whyCorrect
        : feedback.whyWrong;
    const extendedPoints = Array.isArray(feedback.whyExtended)
        ? feedback.whyExtended
        : [];
    const extendedImages = Array.isArray(feedback.whyExtendedImages)
        ? feedback.whyExtendedImages
        : [];
    const showCorrectAnswer = (props.unanswered || !itemIsCorrect) && Boolean(correctCategoryLabel);
    const hasExplanation = Boolean(reason) || extendedPoints.length > 0 || extendedImages.length > 0 || showCorrectAnswer;

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
                images={extendedImages}
                showCorrectAnswer={showCorrectAnswer}
                correctAnswerLabel={correctCategoryLabel}
                correctAnswerPrefix={props.t.feedbackCorrectAnswerLabel}
            />
        );
    }

    return (
        <article className={getFeedbackCardClassName({ itemIsCorrect, unanswered: props.unanswered })}>
            <div className="drag-categorize-feedback-main">
                <div className="drag-categorize-feedback-title-row">
                    {itemIsCorrect ? (
                        <CheckCircle2 className="drag-categorize-feedback-icon" aria-hidden="true" />
                    ) : (
                        <XCircle className="drag-categorize-feedback-icon" aria-hidden="true" />
                    )}

                    <span className="drag-categorize-feedback-title">
                        <FormattedText text={getItemLabel(props.item)} />
                    </span>
                </div>

                <div className="drag-categorize-feedback-actions">
                    <span className="drag-categorize-feedback-status">
                        {getFeedbackStatus({ itemIsCorrect, unanswered: props.unanswered, t: props.t })}
                    </span>

                    {expandButton}
                </div>
            </div>

            {explanation}
        </article>
    );
}

const getFeedbackCardClassName = ({ itemIsCorrect, unanswered }) => {
    let className = "drag-categorize-feedback-card";

    if (itemIsCorrect) {
        className += " drag-categorize-feedback-card-correct";
    } else {
        className += " drag-categorize-feedback-card-wrong";
    }

    if (unanswered) {
        className += " drag-categorize-feedback-card-unanswered";
    }

    return className;
};

const getFeedbackStatus = ({ itemIsCorrect, unanswered, t }) => {
    if (unanswered) {
        return t.dragDropUnanswered;
    }

    if (itemIsCorrect) {
        return t.resultCorrect;
    }

    return t.resultWrong;
};

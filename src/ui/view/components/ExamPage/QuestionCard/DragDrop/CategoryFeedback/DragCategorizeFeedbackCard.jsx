//src/ui/view/components/ExamPage/QuestionCard/DragDrop/CategoryFeedback/DragCategorizeFeedbackCard.jsx
import { CheckCircle2, XCircle } from "lucide-react";
import { getCategoryLabelById, getCorrectCategoryId, getItemFeedback, getItemLabel, isItemCorrectlyPlaced } from "../CategoryLogic/dragCategorizeAnswerLogic.js";
import DragDropFeedbackExpandButton from "../Feedback/DragDropFeedbackExpandButton.jsx";
import DragDropFeedbackExplanation from "../Feedback/DragDropFeedbackExplanation.jsx";

export default function DragCategorizeFeedbackCard(props) {
    const correctCategoryId = getCorrectCategoryId(props.question, props.item.id);
    const correctCategoryLabel = getCategoryLabelById(props.question, correctCategoryId);
    const itemIsCorrect = isItemCorrectlyPlaced(props.question, props.category.id, props.item.id);
    const feedback = getItemFeedback(props.question, props.item.id);
    const reason = itemIsCorrect
        ? feedback.whyCorrect
        : feedback.whyWrong;
    const extendedPoints = Array.isArray(feedback.whyExtended)
        ? feedback.whyExtended
        : [];
    const showCorrectAnswer = !itemIsCorrect && Boolean(correctCategoryLabel);
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
                correctAnswerLabel={correctCategoryLabel}
                correctAnswerPrefix={props.t.feedbackCorrectAnswerLabel}
            />
        );
    }

    return (
        <article className={getFeedbackCardClassName(itemIsCorrect)}>
            <div className="drag-categorize-feedback-main">
                <div className="drag-categorize-feedback-title-row">
                    {itemIsCorrect ? (
                        <CheckCircle2 className="drag-categorize-feedback-icon" aria-hidden="true" />
                    ) : (
                        <XCircle className="drag-categorize-feedback-icon" aria-hidden="true" />
                    )}

                    <span className="drag-categorize-feedback-title">
                        {getItemLabel(props.item)}
                    </span>
                </div>

                <div className="drag-categorize-feedback-actions">
                    <span className="drag-categorize-feedback-status">
                        {itemIsCorrect ? props.t.resultCorrect : props.t.resultWrong}
                    </span>

                    {expandButton}
                </div>
            </div>

            {explanation}
        </article>
    );
}

const getFeedbackCardClassName = (itemIsCorrect) => {
    let className = "drag-categorize-feedback-card";

    if (itemIsCorrect) {
        className += " drag-categorize-feedback-card-correct";
    } else {
        className += " drag-categorize-feedback-card-wrong";
    }

    return className;
};

//src/ui/view/components/ExamPage/QuestionCard/DragDrop/Feedback/dragDropFeedbackCardView.js
export const getFeedbackReason = (target, targetIsCorrect) => {
    if (targetIsCorrect) {
        return target.whyCorrect;
    }

    return target.whyWrong;
};

export const getExtendedPoints = (target) => {
    if (Array.isArray(target.whyExtended)) {
        return target.whyExtended;
    }

    return [];
};

export const getCorrectAnswerLabel = (target) => {
    if (target.correctLabel !== undefined && target.correctLabel !== null) {
        return target.correctLabel;
    }

    return target.correctCardId;
};

export const shouldShowCorrectAnswer = (props) => {
    if (props.targetIsCorrect) {
        return false;
    }

    if (props.correctAnswerLabel) {
        return true;
    }

    return false;
};

export const getAnswerText = (props) => {
    if (props.selectedCard) {
        return props.selectedCard.text;
    }

    return props.unansweredText;
};

export const getFeedbackCardClassName = (props) => {
    let className = "drag-drop-feedback-target";

    if (props.targetIsCorrect) {
        className += " drag-drop-feedback-target-correct";
    } else if (props.targetIsAnswered) {
        className += " drag-drop-feedback-target-wrong";
    } else {
        className += " drag-drop-feedback-target-unanswered";
    }

    return className;
};
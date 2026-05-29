// src/ui/view/components/ExamPage/QuestionCard/Shared/Utils/questionCardViewState.js
import { QUESTION_TYPES } from "../../../../../../../constants/QuestionTypes.js";
import { hasInlineFillBlank } from "../../QuestionTypes/FillBlankInputField/Utils/fillBlankPromptUtils.js";

export function isFillQuestion(question) {
    return question?.type === QUESTION_TYPES.FILL;
}

export function isDragDropQuestion(question) {
    return question?.type === QUESTION_TYPES.DRAG_DROP
        || question?.type === QUESTION_TYPES.DRAG_CATEGORIZE
        || question?.type === QUESTION_TYPES.MATRIX_PLACEMENT
        || question?.type === QUESTION_TYPES.SEQUENCE_ORDER;
}

export function isDragCategorizeQuestion(question) {
    return question?.type === QUESTION_TYPES.DRAG_CATEGORIZE;
}

export function isMatrixPlacementQuestion(question) {
    return question?.type === QUESTION_TYPES.MATRIX_PLACEMENT;
}

export function isSequenceOrderQuestion(question) {
    return question?.type === QUESTION_TYPES.SEQUENCE_ORDER;
}

export function getQuestionViewState({ question, submitted, showAllFeedback, correct }) {
    const fillQuestion = isFillQuestion(question);
    const dragDropQuestion = isDragDropQuestion(question);
    const inlineFillBlank = hasInlineFillBlank(question);
    const feedbackMode = Boolean(submitted && showAllFeedback);

    return {
        feedbackMode,
        hasInlineFillBlank: inlineFillBlank,
        shouldShowPrompt: !isMatrixPlacementQuestion(question),
        shouldShowFillInput: fillQuestion && !inlineFillBlank,
        shouldShowOptions: !fillQuestion && !dragDropQuestion,
        shouldShowDragDrop: dragDropQuestion,
        shouldShowDragCategorize: isDragCategorizeQuestion(question),
        shouldShowMatrixPlacement: isMatrixPlacementQuestion(question),
        shouldShowSequenceOrder: isSequenceOrderQuestion(question),
        shouldShowWarning: Boolean(submitted && !showAllFeedback && !correct),
        shouldShowFillFeedback: feedbackMode && fillQuestion,
        shouldShowSource: feedbackMode && !fillQuestion && Boolean(question?.source)
    };
}

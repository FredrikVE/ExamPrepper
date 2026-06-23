// src/ui/viewmodel/Utils/questionCardViewState.js
import { QUESTION_TYPES } from "../../../constants/QuestionTypes.js";

const INLINE_FILL_BLANK_PATTERN = /_{3,}/;

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

export function isDropdownFillQuestion(question) {
    return question?.type === QUESTION_TYPES.DROPDOWN_FILL;
}

export function hasInlineFillBlank(question) {
    return question?.type === QUESTION_TYPES.FILL && INLINE_FILL_BLANK_PATTERN.test(question?.prompt ?? "");
}

export function getQuestionTypeLabel(type, t) {
    if (type === QUESTION_TYPES.FILL) return t.questionTypeFill;
    if (type === QUESTION_TYPES.MULTI) return t.questionTypeMulti;
    if (type === QUESTION_TYPES.DRAG_DROP) return t.questionTypeDragDrop;
    if (type === QUESTION_TYPES.DRAG_CATEGORIZE) return t.questionTypeDragCategorize;
    if (type === QUESTION_TYPES.MATRIX_PLACEMENT) return t.questionTypeMatrixPlacement;
    if (type === QUESTION_TYPES.SEQUENCE_ORDER) return t.questionTypeSequenceOrder;
    if (type === QUESTION_TYPES.DROPDOWN_FILL) return t.questionTypeDropdownFill;
    return t.questionTypeSingle;
}

export function getQuestionViewState({ question, submitted, showAllFeedback, correct }) {
    const fillQuestion = isFillQuestion(question);
    const dragDropQuestion = isDragDropQuestion(question);
    const dropdownFillQuestion = isDropdownFillQuestion(question);
    const inlineFillBlank = hasInlineFillBlank(question);
    const feedbackMode = Boolean(submitted && showAllFeedback);
    const shouldShowOptions = !fillQuestion && !dragDropQuestion && !dropdownFillQuestion;
    const isSingleChoice = question?.type === QUESTION_TYPES.SINGLE;

    return {
        feedbackMode,
        hasInlineFillBlank: inlineFillBlank,
        shouldShowPrompt: !isMatrixPlacementQuestion(question),
        shouldShowOptions,
        shouldShowMultiOptions: shouldShowOptions && !isSingleChoice,
        shouldShowSingleOptions: shouldShowOptions && isSingleChoice,
        shouldShowDragDrop: dragDropQuestion,
        shouldShowDragCategorize: isDragCategorizeQuestion(question),
        shouldShowMatrixPlacement: isMatrixPlacementQuestion(question),
        shouldShowSequenceOrder: isSequenceOrderQuestion(question),
        shouldShowDropdownFill: dropdownFillQuestion,
        shouldShowWarning: Boolean(submitted && !showAllFeedback && !correct),
        shouldShowFillInput: fillQuestion && !inlineFillBlank,
        shouldShowFillFeedback: feedbackMode && fillQuestion,
        shouldShowSource: feedbackMode && !fillQuestion && Boolean(question?.source),
        inputType: isSingleChoice ? "radio" : "checkbox"
    };
}

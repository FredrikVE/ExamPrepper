import { INLINE_FILL_BLANK_PATTERN } from "./constants.js";

export function isFillQuestion(question) {
    return question?.type === "fill";
}

export function hasInlineFillBlank(question) {
    return isFillQuestion(question) && INLINE_FILL_BLANK_PATTERN.test(question.prompt);
}

export function getQuestionViewState({ question, submitted, showAllFeedback, correct }) {
    const fillQuestion = isFillQuestion(question);
    const inlineFillBlank = hasInlineFillBlank(question);
    const feedbackMode = Boolean(submitted && showAllFeedback);

    return {
        feedbackMode,
        hasInlineFillBlank: inlineFillBlank,
        shouldShowFillInput: fillQuestion && !inlineFillBlank,
        shouldShowOptions: !fillQuestion,
        shouldShowWarning: Boolean(submitted && !showAllFeedback && !correct),
        shouldShowFillFeedback: feedbackMode && fillQuestion,
        shouldShowSource: feedbackMode && !fillQuestion && Boolean(question.source)
    };
}

export function isOptionSelected(type, answer, index) {
    if (type === "single") {
        return answer === index;
    }

    return Array.isArray(answer) && answer.includes(index);
}

export function getQuestionTypeLabel(type, t) {
    if (type === "fill") return t.questionTypeFill;
    if (type === "multi") return t.questionTypeMulti;
    return t.questionTypeSingle;
}

export function getOptionLetter(index) {
    return String.fromCharCode(65 + index);
}

export function getSelectableOptionClassName({ isSelected }) {
    return isSelected ? "question-card-option-selected" : "question-card-option-default";
}

export function getAnswerCardClassName({ correct, isSelected }) {
    const statusClassName = correct
        ? "question-card-answer-card-correct"
        : "question-card-answer-card-wrong";

    return `${statusClassName} ${isSelected ? "question-card-answer-card-selected" : ""}`;
}

export function getExtendedExplanation(option) {
    return Array.isArray(option?.whyExtended) ? option.whyExtended : [];
}

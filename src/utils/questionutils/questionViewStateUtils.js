// src/utils/questionutils/questionViewStateUtils.js
import { QUESTION_TYPES } from "../../constants/QuestionTypes.js";
import { hasInlineFillBlank } from "./fillPromptUtils.js";

export function isFillQuestion(question) {
    return question?.type === QUESTION_TYPES.FILL;
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
        shouldShowSource: feedbackMode && !fillQuestion && Boolean(question?.source)
    };
}
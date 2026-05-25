// src/utils/questionutils/fillPromptUtils.js
import { QUESTION_TYPES } from "../../constants/QuestionTypes.js";

const INLINE_FILL_BLANK_PATTERN = /_{3,}/;
const INLINE_FILL_PART_PATTERN = /^_{3,}$/;
const INLINE_FILL_SPLIT_PATTERN = /(_{3,})/g;

export function hasInlineFillBlank(question) {
    return question?.type === QUESTION_TYPES.FILL && INLINE_FILL_BLANK_PATTERN.test(question?.prompt ?? "");
}

export function splitPromptByInlineBlank(prompt) {
    return String(prompt ?? "").split(INLINE_FILL_SPLIT_PATTERN);
}

export function isInlineBlankPart(promptPart) {
    return INLINE_FILL_PART_PATTERN.test(promptPart);
}
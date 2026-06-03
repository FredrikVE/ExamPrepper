// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/FillBlankInputField/Utils/fillBlankPromptUtils.js
const INLINE_FILL_PART_PATTERN = /^_{3,}$/;
const INLINE_FILL_SPLIT_PATTERN = /(_{3,})/g;

export function splitPromptByInlineBlank(prompt) {
    return String(prompt ?? "").split(INLINE_FILL_SPLIT_PATTERN);
}

export function isInlineBlankPart(promptPart) {
    return INLINE_FILL_PART_PATTERN.test(promptPart);
}

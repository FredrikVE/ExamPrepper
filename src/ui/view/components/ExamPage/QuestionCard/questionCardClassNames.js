// src/ui/view/components/ExamPage/QuestionCard/questionCardClassNames.js
export function getSelectableOptionClassName({ isSelected }) {
    return isSelected ? "question-card-option-selected" : "question-card-option-default";
}

export function getAnswerCardClassName({ correct, isSelected }) {
    const statusClassName = correct
        ? "question-card-answer-card-correct"
        : "question-card-answer-card-wrong";

    return `${statusClassName} ${isSelected ? "question-card-answer-card-selected" : ""}`.trim();
}

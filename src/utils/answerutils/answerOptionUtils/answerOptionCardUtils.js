//src/utils/answerutils/answerOptionUtils/answerOptionCardUtils.js
export const getExtendedExplanationPoints = (option) => {
    return Array.isArray(option?.whyExtended)
        ? option.whyExtended
        : [];
};

export const getOptionLetter = (index) => {
    return String.fromCharCode(65 + index);
};

export const getAnswerCardClassName = ({ correct, isSelected }) => {
    const statusClassName = correct
        ? "question-card-answer-card-correct"
        : "question-card-answer-card-wrong";

    return [
        statusClassName,
        isSelected ? "question-card-answer-card-selected" : ""
    ].filter(Boolean).join(" ");
};

export const getAnswerMarkerClassName = ({ correct, isSelected }) => {
    if (isSelected) {
        return "question-card-answer-marker-selected";
    }

    return correct
        ? "question-card-answer-marker-correct"
        : "question-card-answer-marker-wrong";
};

export const getAnswerBadgeClassName = ({ correct }) => {
    return correct
        ? "question-card-answer-badge-correct"
        : "question-card-answer-badge-wrong";
};
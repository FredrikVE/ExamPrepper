// src/ui/view/components/ExamPage/QuestionCard/AnswerCard/Utils/answerOptionCardView.js
export const getExtendedExplanationPoints = (option) => {
    return Array.isArray(option?.whyExtended)
        ? option.whyExtended
        : [];
};

export const getExtendedExplanationImage = (option) => {
    const image = option?.whyExtendedImage
        ?? option?.conceptImage
        ?? option?.extendedImage
        ?? option?.image;

    if (typeof image === "string") {
        const src = image.trim();

        return src
            ? { src, alt: option?.text ?? "" }
            : null;
    }

    if (!image || typeof image !== "object") {
        return null;
    }

    const src = typeof image.src === "string"
        ? image.src.trim()
        : "";

    if (!src) {
        return null;
    }

    return {
        src,
        alt: image.alt ?? image.title ?? option?.text ?? "",
        title: image.title,
        caption: image.caption
    };
};

export const hasExtendedExplanation = (option) => {
    return getExtendedExplanationPoints(option).length > 0
        || Boolean(getExtendedExplanationImage(option));
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

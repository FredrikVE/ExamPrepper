// src/ui/view/components/ExamPage/QuestionCard/AnswerCard/Utils/answerOptionCardView.js
export const getExtendedExplanationPoints = (option) => {
    return Array.isArray(option?.whyExtended)
        ? option.whyExtended
        : [];
};

export const getExtendedExplanationImages = (option) => {
    const images = Array.isArray(option?.whyExtendedImages)
        ? option.whyExtendedImages
        : [];

    return images
        .map((image) => normalizeImage(image, option))
        .filter(Boolean);
};

export const hasExtendedExplanation = (option) => {
    return getExtendedExplanationPoints(option).length > 0
        || getExtendedExplanationImages(option).length > 0;
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

function normalizeImage(image, option) {
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
        id: image.id,
        src,
        alt: image.alt ?? image.title ?? option?.text ?? "",
        title: image.title,
        caption: image.caption
    };
}

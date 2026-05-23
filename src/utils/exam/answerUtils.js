//src/utils/exam/answerUtils.js
export function normalizeAnswer(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[.!?,;:]/g, "")
        .replace(/\s+/g, " ");
}

export function getCorrectIndexes(question) {
    return question.options
        ?.map((option, index) => option.correct ? index : null)
        .filter((value) => value !== null) || [];
}

export function getAnswerLabel(question) {
    if (question.type === "fill") {
        return question.answerKey;
    }

    return question.options
        .map((option, index) => {
            if (!option.correct) return null;
            return `${String.fromCharCode(65 + index)}. ${option.text}`;
        })
        .filter(Boolean)
        .join(" | ");
}

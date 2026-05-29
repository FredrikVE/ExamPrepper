// src/ui/view/components/Footer/Utils/footerClassNames.js
export function getFooterDotClassName(isActive, submitted, isCorrect, dotDisplayMode = "normal") {
    const footerDotClassNames = ["exam-footer-dot"];

    if (dotDisplayMode === "filled-compact") {
        footerDotClassNames.push("exam-footer-dot-filled-compact");
    }

    if (dotDisplayMode === "compact") {
        footerDotClassNames.push("exam-footer-dot-compact");
    }

    if (isActive) {
        footerDotClassNames.push("exam-footer-dot-active");
    }

    if (submitted) {
        footerDotClassNames.push(isCorrect ? "exam-footer-dot-correct" : "exam-footer-dot-wrong");
    }

    return footerDotClassNames.join(" ");
}

export function getQuestionDotsClassName(shouldUseCompactDots, shouldUseResponsiveCompactDots) {
    const questionDotsClassNames = ["exam-footer-dots"];

    if (shouldUseCompactDots) {
        questionDotsClassNames.push("exam-footer-dots-compact-by-count");
    }

    if (shouldUseResponsiveCompactDots) {
        questionDotsClassNames.push("exam-footer-dots-responsive-compact");
    }

    return questionDotsClassNames.join(" ");
}
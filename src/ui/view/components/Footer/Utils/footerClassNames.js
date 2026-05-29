// src/ui/view/components/Footer/Utils/footerClassNames.js
export function getFooterDotClassName(isActive, submitted, isCorrect, variant = "normal") {
    const classes = ["exam-footer-dot"];

    if (variant === "filled-compact") {
        classes.push("exam-footer-dot-filled-compact");
    }

    if (variant === "compact") {
        classes.push("exam-footer-dot-compact");
    }

    if (isActive) {
        classes.push("exam-footer-dot-active");
    }

    if (submitted) {
        classes.push(isCorrect ? "exam-footer-dot-correct" : "exam-footer-dot-wrong");
    }

    return classes.join(" ");
}
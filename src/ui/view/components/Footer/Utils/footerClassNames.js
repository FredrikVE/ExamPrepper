// src/ui/view/components/Footer/Utils/footerClassNames.js
export function getFooterDotClassName(isActive, submitted, isCorrect) {
    const classes = ["exam-footer-dot"];

    if (isActive) {
        classes.push("exam-footer-dot-active");
    }

    if (submitted) {
        classes.push(isCorrect ? "exam-footer-dot-correct" : "exam-footer-dot-wrong");
    }

    return classes.join(" ");
}

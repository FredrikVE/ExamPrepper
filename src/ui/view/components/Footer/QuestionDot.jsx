// src/ui/view/components/Footer/QuestionDot.jsx
import { getFooterDotClassName } from "./Utils/footerClassNames.js";

export default function QuestionDot({ questionNumber, isActive, submitted, isCorrect, onClick, t, dotDisplayMode }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={getFooterDotClassName(isActive, submitted, isCorrect, dotDisplayMode)}
            aria-current={isActive ? "step" : undefined}
            aria-label={t.footerGoToQuestion(questionNumber)}
            title={t.footerGoToQuestion(questionNumber)}
            data-question-number={questionNumber}
        />
    );
}
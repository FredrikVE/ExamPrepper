// src/ui/view/components/ProgressPager/ProgressDot.jsx
import { getProgressDotClassName } from "./Utils/progressPagerClassNames.js";

export default function ProgressDot({ questionNumber, isActive, submitted, isCorrect, onClick, t, dotDisplayMode }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={getProgressDotClassName(isActive, submitted, isCorrect, dotDisplayMode)}
            aria-current={isActive ? "step" : undefined}
            aria-label={t.footerGoToQuestion(questionNumber)}
            title={t.footerGoToQuestion(questionNumber)}
            data-question-number={questionNumber}
        />
    );
}

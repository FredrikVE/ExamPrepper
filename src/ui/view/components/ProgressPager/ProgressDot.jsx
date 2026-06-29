// src/ui/view/components/ProgressPager/ProgressDot.jsx
import { getProgressDotClassName } from "./Utils/progressPagerClassNames.js";

export default function ProgressDot({
    entryNumber,
    isActive,
    submitted,
    isCorrect,
    onClick,
    goToEntryLabel,
    dotDisplayMode
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={getProgressDotClassName(isActive, submitted, isCorrect, dotDisplayMode)}
            aria-current={isActive ? "step" : undefined}
            aria-label={goToEntryLabel(entryNumber)}
            title={goToEntryLabel(entryNumber)}
            data-question-number={entryNumber}
        />
    );
}

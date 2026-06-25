// src/ui/view/components/FlipcardsPage/FlipcardDeck/QuickActions.jsx
import { Check, ChevronLeft, ChevronRight, RotateCcw, X } from "lucide-react";

export default function QuickActions({
    hasPrevious,
    hasNext,
    isSwipeCommandActive,
    labels,
    onPrevious,
    onNext,
    onPractice,
    onFlip,
    onMastered
}) {
    return (
        <div className="quick-actions" aria-label={labels.quickActionsLabel}>
            <button
                type="button"
                className="quick-action quick-action-secondary"
                onClick={onPrevious}
                disabled={!hasPrevious || isSwipeCommandActive}
            >
                <ChevronLeft aria-hidden="true" focusable="false" />
                <span>{labels.previousCardLabel}</span>
            </button>

            <button
                type="button"
                className="quick-action quick-action-practice"
                onClick={onPractice}
                disabled={isSwipeCommandActive}
            >
                <X aria-hidden="true" focusable="false" />
                <span>{labels.practiceCardLabel}</span>
            </button>

            <button
                type="button"
                className="quick-action quick-action-flip"
                onClick={onFlip}
                disabled={isSwipeCommandActive}
            >
                <RotateCcw aria-hidden="true" focusable="false" />
                <span>{labels.flipCardLabel}</span>
            </button>

            <button
                type="button"
                className="quick-action quick-action-mastered"
                onClick={onMastered}
                disabled={isSwipeCommandActive}
            >
                <Check aria-hidden="true" focusable="false" />
                <span>{labels.masteredCardLabel}</span>
            </button>

            <button
                type="button"
                className="quick-action quick-action-secondary"
                onClick={onNext}
                disabled={!hasNext || isSwipeCommandActive}
            >
                <span>{labels.nextCardLabel}</span>
                <ChevronRight aria-hidden="true" focusable="false" />
            </button>
        </div>
    );
}

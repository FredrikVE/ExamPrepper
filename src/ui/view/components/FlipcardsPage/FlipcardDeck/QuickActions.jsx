// src/ui/view/components/FlipcardsPage/FlipcardDeck/QuickActions.jsx
import { Check, ChevronLeft, ChevronRight, RotateCcw, Repeat } from "lucide-react";

export default function QuickActions({
    hasPrevious,
    hasNext,
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
                disabled={!hasPrevious}
            >
                <ChevronLeft aria-hidden="true" focusable="false" />
                <span>{labels.previousCardLabel}</span>
            </button>

            <button
                type="button"
                className="quick-action quick-action-practice"
                onClick={onPractice}
            >
                <Repeat aria-hidden="true" focusable="false" />
                <span>{labels.practiceCardLabel}</span>
            </button>

            <button
                type="button"
                className="quick-action quick-action-flip"
                onClick={onFlip}
            >
                <RotateCcw aria-hidden="true" focusable="false" />
                <span>{labels.flipCardLabel}</span>
            </button>

            <button
                type="button"
                className="quick-action quick-action-mastered"
                onClick={onMastered}
            >
                <Check aria-hidden="true" focusable="false" />
                <span>{labels.masteredCardLabel}</span>
            </button>

            <button
                type="button"
                className="quick-action quick-action-secondary"
                onClick={onNext}
                disabled={!hasNext}
            >
                <span>{labels.nextCardLabel}</span>
                <ChevronRight aria-hidden="true" focusable="false" />
            </button>
        </div>
    );
}

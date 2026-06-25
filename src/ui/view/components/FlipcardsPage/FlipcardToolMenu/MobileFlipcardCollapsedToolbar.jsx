// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/MobileFlipcardCollapsedToolbar.jsx
import { Check, ChevronLeft, ChevronRight, RotateCcw, Repeat } from "lucide-react";

export default function MobileFlipcardCollapsedToolbar({
    cardCount,
    activeIndex,
    hasPrevious,
    hasNext,
    isComplete,
    isSwipeCommandActive,
    progressModel,
    labels,
    onPrevious,
    onNext,
    onPractice,
    onFlip,
    onMastered
}) {
    const currentPosition = Math.min(activeIndex + 1, cardCount);
    const positionLabel = isComplete
        ? labels.completePositionLabel
        : labels.deckPositionLabel(currentPosition, cardCount);
    const cardActionsDisabled = isComplete || isSwipeCommandActive || cardCount === 0;

    return (
        <footer className="mobile-flipcard-toolbar" aria-label={labels.toolMenuLabel}>
            <div className="mobile-flipcard-toolbar-handle" aria-hidden="true">
                <span className="mobile-flipcard-toolbar-grip" />
            </div>

            <div className="mobile-flipcard-toolbar-summary">
                <span>{positionLabel}</span>
                <strong>{progressModel.progressLabel}</strong>
            </div>

            <div className="mobile-flipcard-toolbar-actions">
                <button
                    type="button"
                    className="mobile-flipcard-toolbar-action mobile-flipcard-toolbar-action-secondary"
                    aria-label={labels.previousCardLabel}
                    onClick={onPrevious}
                    disabled={!hasPrevious || isSwipeCommandActive}
                >
                    <ChevronLeft aria-hidden="true" focusable="false" />
                </button>

                <button
                    type="button"
                    className="mobile-flipcard-toolbar-action mobile-flipcard-toolbar-action-practice"
                    aria-label={labels.practiceCardLabel}
                    onClick={onPractice}
                    disabled={cardActionsDisabled}
                >
                    <Repeat aria-hidden="true" focusable="false" />
                </button>

                <button
                    type="button"
                    className="mobile-flipcard-toolbar-action mobile-flipcard-toolbar-action-flip"
                    aria-label={labels.flipCardLabel}
                    onClick={onFlip}
                    disabled={cardActionsDisabled}
                >
                    <RotateCcw aria-hidden="true" focusable="false" />
                </button>

                <button
                    type="button"
                    className="mobile-flipcard-toolbar-action mobile-flipcard-toolbar-action-mastered"
                    aria-label={labels.masteredCardLabel}
                    onClick={onMastered}
                    disabled={cardActionsDisabled}
                >
                    <Check aria-hidden="true" focusable="false" />
                </button>

                <button
                    type="button"
                    className="mobile-flipcard-toolbar-action mobile-flipcard-toolbar-action-secondary"
                    aria-label={labels.nextCardLabel}
                    onClick={onNext}
                    disabled={!hasNext || isSwipeCommandActive}
                >
                    <ChevronRight aria-hidden="true" focusable="false" />
                </button>
            </div>
        </footer>
    );
}

// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardToolPager.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";

function resolvePagerLabel({ activeIndex, cardCount, isComplete, labels }) {
    if (isComplete) {
        return labels.completePositionLabel;
    }

    return labels.deckPositionLabel(activeIndex + 1, cardCount);
}

export default function FlipcardToolPager({
    cardCount,
    activeIndex,
    hasPrevious,
    hasNext,
    isComplete,
    isSwipeCommandActive,
    labels,
    onPrevious,
    onNext
}) {
    const pagerLabel = resolvePagerLabel({ activeIndex, cardCount, isComplete, labels });

    return (
        <nav className="flipcard-tool-pager" aria-label={labels.toolMenuPagerLabel}>
            <button
                type="button"
                className="flipcard-tool-pager-button"
                onClick={onPrevious}
                disabled={!hasPrevious || isSwipeCommandActive}
                aria-label={labels.previousCardLabel}
            >
                <ChevronLeft aria-hidden="true" focusable="false" />
            </button>

            <div className="flipcard-tool-pager-status">
                <span>{labels.toolMenuCurrentCardLabel}</span>
                <strong>{pagerLabel}</strong>
            </div>

            <button
                type="button"
                className="flipcard-tool-pager-button"
                onClick={onNext}
                disabled={!hasNext || isSwipeCommandActive}
                aria-label={labels.nextCardLabel}
            >
                <ChevronRight aria-hidden="true" focusable="false" />
            </button>
        </nav>
    );
}

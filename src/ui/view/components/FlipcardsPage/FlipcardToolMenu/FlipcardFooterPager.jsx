// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardFooterPager.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import PagerButton from "../../ProgressPager/PagerButton.jsx";
import ProgressDots from "../../ProgressPager/ProgressDots.jsx";

function createQuestionDotEntries(cardCount, activeIndex) {
    const safeActiveIndex = Math.min(Math.max(activeIndex, 0), Math.max(cardCount - 1, 0));

    return Array.from({ length: cardCount }, (_item, index) => ({
        key: `flipcard-dot-${index}`,
        questionNumber: index + 1,
        questionIndex: index,
        isActive: index === safeActiveIndex,
        isCorrect: false
    }));
}

export default function FlipcardFooterPager({
    cardCount,
    activeIndex,
    hasPrevious,
    hasNext,
    isSwipeCommandActive,
    labels,
    onPrevious,
    onNext,
    onGoToCard
}) {
    const currentPosition = Math.min(activeIndex + 1, cardCount);
    const progressLabel = labels.deckPositionLabel(currentPosition, cardCount);
    const progressEntries = createQuestionDotEntries(cardCount, activeIndex);

    return (
        <div className="flipcard-footer-pager" aria-label={labels.toolMenuPagerLabel}>
            <PagerButton
                onClick={onPrevious}
                disabled={!hasPrevious || isSwipeCommandActive}
                variant="previous"
                icon={<ChevronLeft className="progress-pager-icon" aria-hidden="true" focusable="false" />}
                className="flipcard-footer-pager-button"
            >
                {labels.previousCardLabel}
            </PagerButton>

            <div className="flipcard-footer-pager-counter">
                <ProgressDots
                    entries={progressEntries}
                    compactEntries={progressEntries}
                    minimalCompactEntries={progressEntries}
                    shouldUseCompactDots={cardCount > 9}
                    shouldUseResponsiveCompactDots={true}
                    submitted={false}
                    onSelectEntry={onGoToCard}
                    dotsLabel={labels.toolMenuPagerLabel}
                    goToEntryLabel={labels.goToCardLabel}
                />
                <span className="flipcard-footer-pager-label">{progressLabel}</span>
            </div>

            <PagerButton
                onClick={onNext}
                disabled={!hasNext || isSwipeCommandActive}
                variant="next"
                icon={<ChevronRight className="progress-pager-icon" aria-hidden="true" focusable="false" />}
                className="flipcard-footer-pager-button"
            >
                {labels.nextCardLabel}
            </PagerButton>
        </div>
    );
}

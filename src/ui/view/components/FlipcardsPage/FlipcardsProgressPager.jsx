// src/ui/view/components/FlipcardsPage/FlipcardsProgressPager.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import PagerButton from "../ProgressPager/PagerButton.jsx";
import ProgressDots from "../ProgressPager/ProgressDots.jsx";
import ProgressPager from "../ProgressPager/ProgressPager.jsx";

function createFlipcardProgressEntries(cardCount, activeIndex) {
    const safeActiveIndex = Math.min(Math.max(activeIndex, 0), Math.max(cardCount - 1, 0));

    return Array.from({ length: cardCount }, (_item, index) => ({
        key: `flipcard-dot-${index}`,
        questionNumber: index + 1,
        questionIndex: index,
        isActive: index === safeActiveIndex,
        isCorrect: false
    }));
}

export default function FlipcardsProgressPager({
    cardCount,
    activeIndex,
    hasPrevious,
    hasNext,
    isSwipeCommandActive,
    labels,
    className,
    onPrevious,
    onNext,
    onGoToCard
}) {
    const currentPosition = Math.min(activeIndex + 1, cardCount);
    const progressLabel = labels.deckPositionLabel(currentPosition, cardCount);
    const progressEntries = createFlipcardProgressEntries(cardCount, activeIndex);
    const flipcardsProgressPagerClassName = `flipcards-progress-pager ${className}`.trim();

    return (
        <ProgressPager
            className={flipcardsProgressPagerClassName}
            containerClassName="flipcards-progress-pager-container"
            ariaLabel={labels.toolMenuPagerLabel}
            previousButton={(
                <PagerButton
                    onClick={onPrevious}
                    disabled={!hasPrevious || isSwipeCommandActive}
                    variant="previous"
                    icon={<ChevronLeft className="progress-pager-icon" aria-hidden="true" focusable="false" />}
                    className="flipcards-progress-pager-button"
                >
                    {labels.previousCardLabel}
                </PagerButton>
            )}
            counter={(
                <div className="flipcards-progress-pager-counter">
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
                    <span className="flipcards-progress-pager-label">{progressLabel}</span>
                </div>
            )}
            actionButton={(
                <PagerButton
                    onClick={onNext}
                    disabled={!hasNext || isSwipeCommandActive}
                    variant="next"
                    icon={<ChevronRight className="progress-pager-icon" aria-hidden="true" focusable="false" />}
                    className="flipcards-progress-pager-button"
                >
                    {labels.nextCardLabel}
                </PagerButton>
            )}
        />
    );
}

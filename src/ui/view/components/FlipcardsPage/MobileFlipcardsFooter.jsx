// src/ui/view/components/FlipcardsPage/MobileFlipcardsFooter.jsx
import FlipcardsProgressPager from "./FlipcardsProgressPager.jsx";
import MobileFlipcardSheetGrip from "./FlipcardToolMenu/MobileFlipcardSheetGrip.jsx";

export default function MobileFlipcardsFooter({
    expandButtonRef,
    isExpanded,
    onOpenExpandedMenu,
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
    return (
        <div className="flipcards-mobile-footer" role="region" aria-label={labels.toolMenuLabel}>
            <MobileFlipcardSheetGrip
                ref={expandButtonRef}
                isExpanded={isExpanded}
                onClick={onOpenExpandedMenu}
                label={labels.openToolMenuLabel}
            />

            <FlipcardsProgressPager
                cardCount={cardCount}
                activeIndex={activeIndex}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
                isSwipeCommandActive={isSwipeCommandActive}
                labels={labels}
                className="flipcards-progress-pager-mobile"
                onPrevious={onPrevious}
                onNext={onNext}
                onGoToCard={onGoToCard}
            />
        </div>
    );
}

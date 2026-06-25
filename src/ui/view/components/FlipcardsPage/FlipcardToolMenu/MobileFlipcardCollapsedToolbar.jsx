// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/MobileFlipcardCollapsedToolbar.jsx
import FlipcardFooterPager from "./FlipcardFooterPager.jsx";
import MobileFlipcardSheetGrip from "./MobileFlipcardSheetGrip.jsx";

export default function MobileFlipcardCollapsedToolbar({
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
        <footer className="mobile-flipcard-toolbar" aria-label={labels.toolMenuLabel}>
            <MobileFlipcardSheetGrip
                ref={expandButtonRef}
                isExpanded={isExpanded}
                onClick={onOpenExpandedMenu}
                label={labels.openToolMenuLabel}
            />

            <FlipcardFooterPager
                cardCount={cardCount}
                activeIndex={activeIndex}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
                isSwipeCommandActive={isSwipeCommandActive}
                labels={labels}
                onPrevious={onPrevious}
                onNext={onNext}
                onGoToCard={onGoToCard}
            />
        </footer>
    );
}

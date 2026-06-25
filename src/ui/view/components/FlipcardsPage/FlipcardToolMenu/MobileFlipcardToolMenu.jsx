// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/MobileFlipcardToolMenu.jsx
import { useRef } from "react";
import MobileFlipcardBottomSheet from "./MobileFlipcardBottomSheet.jsx";
import MobileFlipcardCollapsedToolbar from "./MobileFlipcardCollapsedToolbar.jsx";

export default function MobileFlipcardToolMenu({
    isExpanded,
    onExpandedChange,
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
    const expandButtonRef = useRef(null);

    return (
        <>
            <MobileFlipcardCollapsedToolbar
                expandButtonRef={expandButtonRef}
                isExpanded={isExpanded}
                onOpenExpandedMenu={onOpenExpandedMenu}
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

            <MobileFlipcardBottomSheet
                isOpen={isExpanded}
                onOpenChange={onExpandedChange}
                finalFocusRef={expandButtonRef}
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
        </>
    );
}

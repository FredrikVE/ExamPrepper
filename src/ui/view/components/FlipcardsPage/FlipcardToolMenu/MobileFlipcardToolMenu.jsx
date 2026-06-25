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
                isComplete={isComplete}
                isSwipeCommandActive={isSwipeCommandActive}
                progressModel={progressModel}
                labels={labels}
                onPrevious={onPrevious}
                onNext={onNext}
                onPractice={onPractice}
                onFlip={onFlip}
                onMastered={onMastered}
            />

            <MobileFlipcardBottomSheet
                isOpen={isExpanded}
                onOpenChange={onExpandedChange}
                finalFocusRef={expandButtonRef}
                cardCount={cardCount}
                activeIndex={activeIndex}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
                isComplete={isComplete}
                isSwipeCommandActive={isSwipeCommandActive}
                progressModel={progressModel}
                labels={labels}
                onPrevious={onPrevious}
                onNext={onNext}
                onPractice={onPractice}
                onFlip={onFlip}
                onMastered={onMastered}
            />
        </>
    );
}

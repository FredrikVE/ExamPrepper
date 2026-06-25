// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/MobileFlipcardToolMenu.jsx
import MobileFlipcardCollapsedToolbar from "./MobileFlipcardCollapsedToolbar.jsx";

export default function MobileFlipcardToolMenu({
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
    return (
        <MobileFlipcardCollapsedToolbar
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
    );
}

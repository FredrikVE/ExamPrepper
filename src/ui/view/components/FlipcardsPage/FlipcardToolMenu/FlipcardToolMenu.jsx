// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardToolMenu.jsx
import FlipcardToolMenuContent from "./FlipcardToolMenuContent.jsx";

export default function FlipcardToolMenu({
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
        <aside className="flipcard-tool-menu" aria-label={labels.toolMenuLabel}>
            <FlipcardToolMenuContent
                variant="inline"
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
        </aside>
    );
}

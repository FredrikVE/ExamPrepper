// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardToolMenuContent.jsx
import FlipcardToolGrid from "./FlipcardToolGrid.jsx";
import FlipcardToolMenuFooter from "./FlipcardToolMenuFooter.jsx";
import FlipcardToolMenuHeader from "./FlipcardToolMenuHeader.jsx";
import FlipcardToolPager from "./FlipcardToolPager.jsx";

export default function FlipcardToolMenuContent({
    variant,
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
    onMastered,
    onClose
}) {
    return (
        <div className="flipcard-tool-menu-content" data-variant={variant}>
            <FlipcardToolMenuHeader
                title={labels.toolMenuTitle}
                subtitle={labels.toolMenuSubtitle}
                progressLabel={progressModel.progressLabel}
                closeLabel={labels.closeToolMenuLabel}
                onClose={onClose}
            />

            <FlipcardToolPager
                cardCount={cardCount}
                activeIndex={activeIndex}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
                isComplete={isComplete}
                isSwipeCommandActive={isSwipeCommandActive}
                labels={labels}
                onPrevious={onPrevious}
                onNext={onNext}
            />

            <FlipcardToolGrid
                isComplete={isComplete}
                isSwipeCommandActive={isSwipeCommandActive}
                labels={labels}
                onPractice={onPractice}
                onFlip={onFlip}
                onMastered={onMastered}
            />

            <FlipcardToolMenuFooter
                progressModel={progressModel}
                labels={labels}
            />
        </div>
    );
}

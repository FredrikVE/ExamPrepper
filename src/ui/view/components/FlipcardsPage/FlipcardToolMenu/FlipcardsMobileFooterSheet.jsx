// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardsMobileFooterSheet.jsx
import { useCallback, useState } from "react";
import MobileBottomSheet from "../../MobileBottomSheet/MobileBottomSheet.jsx";
import ProgressPager from "../../ProgressPager/ProgressPager.jsx";
import MobileFlipcardDeckToolGrid from "./MobileFlipcardDeckToolGrid.jsx";

// Flipcards bruker samme dokkede MobileBottomSheet som select-sidene. Den delte
// ProgressPageren er peeken, verktøyrutenettet avdekkes når arket utvides.
export default function FlipcardsMobileFooterSheet({
    progressEntries,
    progressLabel,
    hasPrevious,
    hasNext,
    isSwipeCommandActive,
    deckToolItems,
    labels,
    onPrevious,
    onNext,
    onGoToCard,
    onDeckToolSelect
}) {
    const [isOpen, setIsOpen] = useState(false);

    const selectDeckTool = useCallback((deckToolKey) => {
        onDeckToolSelect(deckToolKey);
        setIsOpen(false);
    }, [onDeckToolSelect]);

    return (
        <div className="flipcards-footer-sheet">
            <MobileBottomSheet
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                finalFocusRef={null}
                contentId="flipcards-mobile-bottom-sheet"
                title={labels.toolMenuTitle}
                subtitle={labels.toolMenuSubtitle}
                openLabel={labels.openToolMenuLabel}
                closeLabel={labels.closeToolMenuLabel}
                peekLabel={labels.toolMenuLabel}
                hasPeek={true}
                popupClassName=""
                contentClassName="flipcards-mobile-bottom-sheet-content"
            >
                <ProgressPager
                    className="flipcards-progress-pager flipcards-progress-pager-mobile"
                    containerClassName="flipcards-progress-pager-container"
                    ariaLabel={labels.toolMenuPagerLabel}
                    previousLabel={labels.previousCardLabel}
                    previousDisabled={!hasPrevious || isSwipeCommandActive}
                    previousButtonClassName="flipcards-progress-pager-button"
                    onPrevious={onPrevious}
                    entries={progressEntries}
                    compactEntries={progressEntries}
                    minimalCompactEntries={progressEntries}
                    shouldUseCompactDots={progressEntries.length > 9}
                    shouldUseResponsiveCompactDots={true}
                    submitted={false}
                    onSelectEntry={onGoToCard}
                    dotsLabel={labels.toolMenuPagerLabel}
                    goToEntryLabel={labels.goToCardLabel}
                    counterLabel={progressLabel}
                    counterClassName="flipcards-progress-pager-counter"
                    counterLabelClassName="flipcards-progress-pager-label"
                    nextLabel={labels.nextCardLabel}
                    nextDisabled={!hasNext || isSwipeCommandActive}
                    nextButtonClassName="flipcards-progress-pager-button"
                    onNext={onNext}
                    hasActionButton={false}
                    actionButton={null}
                />

                <MobileFlipcardDeckToolGrid
                    labels={labels}
                    deckToolItems={deckToolItems}
                    onDeckToolSelect={selectDeckTool}
                />
            </MobileBottomSheet>
        </div>
    );
}

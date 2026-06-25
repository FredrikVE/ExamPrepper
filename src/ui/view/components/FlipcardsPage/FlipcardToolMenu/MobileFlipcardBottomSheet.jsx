// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/MobileFlipcardBottomSheet.jsx
import { Drawer } from "@base-ui/react/drawer";
import FlipcardFooterPager from "./FlipcardFooterPager.jsx";
import MobileFlipcardDeckToolGrid from "./MobileFlipcardDeckToolGrid.jsx";
import MobileFlipcardSheetGrip from "./MobileFlipcardSheetGrip.jsx";

export default function MobileFlipcardBottomSheet({
    isOpen,
    onOpenChange,
    finalFocusRef,
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
    const closeSheet = () => {
        onOpenChange(false);
    };

    return (
        <Drawer.Root
            open={isOpen}
            onOpenChange={onOpenChange}
            swipeDirection="down"
        >
            <Drawer.Portal>
                <Drawer.Backdrop className="mobile-flipcard-sheet-backdrop" />
                <Drawer.Viewport className="mobile-flipcard-sheet-viewport">
                    <Drawer.Popup
                        className="mobile-flipcard-sheet-popup"
                        finalFocus={finalFocusRef}
                    >
                        <Drawer.Content className="mobile-flipcard-sheet-content">
                            <Drawer.Title className="sr-only">
                                {labels.toolMenuTitle}
                            </Drawer.Title>
                            <Drawer.Description className="sr-only">
                                {labels.toolMenuSubtitle}
                            </Drawer.Description>

                            <MobileFlipcardSheetGrip
                                isExpanded={isOpen}
                                onClick={closeSheet}
                                label={labels.closeToolMenuLabel}
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

                            <MobileFlipcardDeckToolGrid labels={labels} />
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Portal>
        </Drawer.Root>
    );
}

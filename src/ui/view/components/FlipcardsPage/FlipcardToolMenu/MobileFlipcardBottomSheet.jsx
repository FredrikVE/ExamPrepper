// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/MobileFlipcardBottomSheet.jsx
import { Drawer } from "@base-ui/react/drawer";
import FlipcardToolMenuContent from "./FlipcardToolMenuContent.jsx";

export default function MobileFlipcardBottomSheet({
    isOpen,
    onOpenChange,
    finalFocusRef,
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
                        <div className="mobile-flipcard-sheet-grip" aria-hidden="true" />

                        <Drawer.Content className="mobile-flipcard-sheet-content">
                            <Drawer.Title className="sr-only">
                                {labels.toolMenuTitle}
                            </Drawer.Title>
                            <Drawer.Description className="sr-only">
                                {labels.toolMenuSubtitle}
                            </Drawer.Description>

                            <FlipcardToolMenuContent
                                variant="mobile-drawer"
                                closeComponent={Drawer.Close}
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
                                onClose={closeSheet}
                            />
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Portal>
        </Drawer.Root>
    );
}

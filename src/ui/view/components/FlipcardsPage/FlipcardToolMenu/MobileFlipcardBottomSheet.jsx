// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/MobileFlipcardBottomSheet.jsx
import { Drawer } from "@base-ui/react/drawer";
import FlipcardFooterPager from "./FlipcardFooterPager.jsx";
import MobileFlipcardDeckToolGrid from "./MobileFlipcardDeckToolGrid.jsx";
import MobileFlipcardSheetGrip from "./MobileFlipcardSheetGrip.jsx";

export default function MobileFlipcardBottomSheet(props) {
    const closeSheet = () => {
        props.onOpenChange(false);
    };

    const selectDeckTool = (deckToolKey) => {
        props.onDeckToolSelect(deckToolKey);
        closeSheet();
    };

    return (
        <Drawer.Root
            open={props.isOpen}
            onOpenChange={props.onOpenChange}
            swipeDirection="down"
        >
            <Drawer.Portal>
                <Drawer.Backdrop className="mobile-flipcard-sheet-backdrop" />
                <Drawer.Viewport className="mobile-flipcard-sheet-viewport">
                    <Drawer.Popup
                        className="mobile-flipcard-sheet-popup"
                        finalFocus={props.finalFocusRef}
                    >
                        <Drawer.Content className="mobile-flipcard-sheet-content">
                            <Drawer.Title className="sr-only">
                                {props.labels.toolMenuTitle}
                            </Drawer.Title>
                            <Drawer.Description className="sr-only">
                                {props.labels.toolMenuSubtitle}
                            </Drawer.Description>

                            <MobileFlipcardSheetGrip
                                isExpanded={props.isOpen}
                                onClick={closeSheet}
                                label={props.labels.closeToolMenuLabel}
                            />

                            <FlipcardFooterPager
                                cardCount={props.cardCount}
                                activeIndex={props.activeIndex}
                                hasPrevious={props.hasPrevious}
                                hasNext={props.hasNext}
                                isSwipeCommandActive={props.isSwipeCommandActive}
                                labels={props.labels}
                                onPrevious={props.onPrevious}
                                onNext={props.onNext}
                                onGoToCard={props.onGoToCard}
                            />

                            <MobileFlipcardDeckToolGrid
                                labels={props.labels}
                                activeDeckToolKey={props.activeDeckToolKey}
                                disabledDeckToolKeys={props.disabledDeckToolKeys}
                                onDeckToolSelect={selectDeckTool}
                            />
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Portal>
        </Drawer.Root>
    );
}

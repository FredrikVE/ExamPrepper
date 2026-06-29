// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/MobileFlipcardBottomSheet.jsx
import MobileBottomSheet from "../../MobileBottomSheet/MobileBottomSheet.jsx";
import MobileFlipcardDeckToolGrid from "./MobileFlipcardDeckToolGrid.jsx";

export default function MobileFlipcardBottomSheet(props) {
    const selectDeckTool = (deckToolKey) => {
        props.onDeckToolSelect(deckToolKey);
        props.onOpenChange(false);
    };

    return (
        <MobileBottomSheet
            isOpen={props.isOpen}
            onOpenChange={props.onOpenChange}
            finalFocusRef={props.finalFocusRef}
            contentId="flipcards-mobile-bottom-sheet"
            title={props.labels.toolMenuTitle}
            subtitle={props.labels.toolMenuSubtitle}
            closeLabel={props.labels.closeToolMenuLabel}
            popupClassName=""
            contentClassName=""
        >
            <MobileFlipcardDeckToolGrid
                labels={props.labels}
                deckToolItems={props.deckToolItems}
                onDeckToolSelect={selectDeckTool}
            />
        </MobileBottomSheet>
    );
}

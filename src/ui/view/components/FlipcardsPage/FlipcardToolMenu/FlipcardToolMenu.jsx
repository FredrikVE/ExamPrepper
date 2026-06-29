// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardToolMenu.jsx
import { PRESENTATION_MODE } from "../../../../presentation/presentationMode.js";
import DesktopFlipcardToolsPanel from "./DesktopFlipcardToolsPanel.jsx";
import MobileFlipcardBottomSheet from "./MobileFlipcardBottomSheet.jsx";

export default function FlipcardToolMenu(props) {
    if (props.presentationMode === PRESENTATION_MODE.DESKTOP) {
        return (
            <DesktopFlipcardToolsPanel
                isOpen={props.isDesktopMenuOpen}
                onOpenChange={props.onDesktopMenuOpenChange}
                labels={props.labels}
                deckToolItems={props.deckToolItems}
                onDeckToolSelect={props.onDeckToolSelect}
            />
        );
    }

    return (
        <MobileFlipcardBottomSheet
            isOpen={props.isMobileSheetOpen}
            onOpenChange={props.onMobileSheetOpenChange}
            finalFocusRef={props.mobileSheetFinalFocusRef}
            labels={props.labels}
            deckToolItems={props.deckToolItems}
            onDeckToolSelect={props.onDeckToolSelect}
        />
    );
}

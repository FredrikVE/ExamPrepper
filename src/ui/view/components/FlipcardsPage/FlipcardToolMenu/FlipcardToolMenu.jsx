// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardToolMenu.jsx
import { PRESENTATION_MODE } from "../../../../presentation/presentationMode.js";
import DesktopFlipcardToolsPanel from "./DesktopFlipcardToolsPanel.jsx";

// Desktop-popout for flipcards-verktøyene. Mobil håndteres av det dokkede
// FlipcardsMobileFooterSheet, ikke her.
export default function FlipcardToolMenu(props) {
    if (props.presentationMode !== PRESENTATION_MODE.DESKTOP) {
        return null;
    }

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

// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/DesktopFlipcardToolsPanel.jsx
import DesktopPopOutMenu, { DESKTOP_POP_OUT_MENU_VARIANTS } from "../../DesktopPopOutMenu/DesktopPopOutMenu.jsx";
import ToolCardGrid from "../../ToolCard/ToolCardGrid.jsx";
import { TOOL_CARD_SURFACES } from "../../ToolCard/toolCardSurfaces.js";

export default function DesktopFlipcardToolsPanel(props) {
    const selectDeckTool = (deckToolItem) => {
        props.onDeckToolSelect(deckToolItem.key);
        props.onOpenChange(false);
    };

    return (
        <DesktopPopOutMenu
            variant={DESKTOP_POP_OUT_MENU_VARIANTS.FLIPCARDS}
            isOpen={props.isOpen}
            onOpenChange={props.onOpenChange}
            openLabel={props.labels.openToolMenuLabel}
            closeLabel={props.labels.closeToolMenuLabel}
            title={props.labels.toolMenuTitle}
            subtitle={props.labels.toolMenuSubtitle}
            actionsLabel={props.labels.toolMenuActionsLabel}
        >
            <ToolCardGrid
                surface={TOOL_CARD_SURFACES.FLIPCARDS_DESKTOP}
                items={props.deckToolItems}
                ariaLabel={props.labels.toolMenuActionsLabel}
                onSelectItem={selectDeckTool}
            />
        </DesktopPopOutMenu>
    );
}

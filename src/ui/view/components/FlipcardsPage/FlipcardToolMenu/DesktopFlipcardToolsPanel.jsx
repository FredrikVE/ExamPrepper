// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/DesktopFlipcardToolsPanel.jsx
import { Dialog } from "@base-ui/react/dialog";
import { Menu } from "lucide-react";
import ToolCardGrid from "../../Shared/ToolCard/ToolCardGrid.jsx";
import { TOOL_CARD_SURFACES } from "../../Shared/ToolCard/toolCardSurfaces.js";

export default function DesktopFlipcardToolsPanel(props) {
    const selectDeckTool = (deckToolItem) => {
        props.onDeckToolSelect(deckToolItem.key);
        props.onOpenChange(false);
    };

    return (
        <Dialog.Root open={props.isOpen} onOpenChange={props.onOpenChange}>
            <Dialog.Trigger
                className="flipcard-desktop-tools-toggle"
                aria-label={props.isOpen ? props.labels.closeToolMenuLabel : props.labels.openToolMenuLabel}
            >
                <Menu aria-hidden="true" focusable="false" />
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Backdrop className="flipcard-desktop-tools-backdrop" />

                <Dialog.Popup className="flipcard-desktop-tools-panel">
                    <header className="flipcard-desktop-tools-header">
                        <Dialog.Title>{props.labels.toolMenuTitle}</Dialog.Title>
                        <Dialog.Description>{props.labels.toolMenuSubtitle}</Dialog.Description>
                    </header>

                    <ToolCardGrid
                        surface={TOOL_CARD_SURFACES.FLIPCARDS_DESKTOP}
                        items={props.deckToolItems}
                        ariaLabel={props.labels.toolMenuActionsLabel}
                        onSelectItem={selectDeckTool}
                    />
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

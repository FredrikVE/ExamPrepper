// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/DesktopFlipcardToolsPanel.jsx
import { Dialog } from "@base-ui/react/dialog";
import { Menu } from "lucide-react";
import FlipcardDeckToolButton from "./FlipcardDeckToolButton.jsx";

export default function DesktopFlipcardToolsPanel(props) {
    const selectDeckTool = (deckToolKey) => {
        props.onDeckToolSelect(deckToolKey);
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

                    <div className="flipcard-desktop-tools-grid" aria-label={props.labels.toolMenuActionsLabel}>
                        {props.deckToolItems.map((deckToolItem) => (
                            <FlipcardDeckToolButton
                                key={deckToolItem.key}
                                variant="desktop"
                                deckToolItem={deckToolItem}
                                onSelect={selectDeckTool}
                            />
                        ))}
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

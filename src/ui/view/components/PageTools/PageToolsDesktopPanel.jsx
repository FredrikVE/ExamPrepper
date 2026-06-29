// src/ui/view/components/PageTools/PageToolsDesktopPanel.jsx
import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Menu } from "lucide-react";
import ToolCardGrid from "../Shared/ToolCard/ToolCardGrid.jsx";
import { TOOL_CARD_SURFACES } from "../Shared/ToolCard/toolCardSurfaces.js";

export default function PageToolsDesktopPanel({ tools }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!tools) {
        return null;
    }

    const selectTool = (toolItem) => {
        if (!toolItem.onSelect) {
            return;
        }

        toolItem.onSelect();
        setIsOpen(false);
    };

    const hasHeader = Boolean(tools.title) || Boolean(tools.subtitle);

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger
                className="page-tools-desktop-toggle"
                aria-label={isOpen ? tools.closeLabel : tools.openLabel}
            >
                <Menu aria-hidden="true" focusable="false" />
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Backdrop className="page-tools-desktop-backdrop" />

                <Dialog.Popup
                    className="page-tools-desktop-panel"
                    aria-label={tools.title ? undefined : tools.actionsLabel}
                >
                    {hasHeader && (
                        <header className="page-tools-desktop-header">
                            {tools.title && <Dialog.Title>{tools.title}</Dialog.Title>}
                            {tools.subtitle && <Dialog.Description>{tools.subtitle}</Dialog.Description>}
                        </header>
                    )}

                    <ToolCardGrid
                        surface={TOOL_CARD_SURFACES.PAGE_TOOLS_DESKTOP}
                        items={tools.items}
                        ariaLabel={tools.actionsLabel}
                        onSelectItem={selectTool}
                    />
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

// src/ui/view/components/PageTools/PageToolsDesktopPanel.jsx
import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Menu } from "lucide-react";
import PageToolsCard from "./PageToolsCard.jsx";

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

                    <div className="page-tools-desktop-grid" aria-label={tools.actionsLabel}>
                        {tools.items.map((toolItem) => (
                            <PageToolsCard
                                key={toolItem.id}
                                surface="desktop"
                                toolItem={toolItem}
                                onSelect={selectTool}
                            />
                        ))}
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

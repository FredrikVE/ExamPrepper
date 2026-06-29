// src/ui/view/components/PageTools/PageToolsDesktopPanel.jsx
import { useState } from "react";
import DesktopPopOutMenu, { DESKTOP_POP_OUT_MENU_VARIANTS } from "../DesktopPopOutMenu/DesktopPopOutMenu.jsx";
import ToolCardGrid from "../ToolCard/ToolCardGrid.jsx";
import { TOOL_CARD_SURFACES } from "../ToolCard/toolCardSurfaces.js";

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

    return (
        <DesktopPopOutMenu
            variant={DESKTOP_POP_OUT_MENU_VARIANTS.PAGE_TOOLS}
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            openLabel={tools.openLabel}
            closeLabel={tools.closeLabel}
            title={tools.title}
            subtitle={tools.subtitle}
            actionsLabel={tools.actionsLabel}
        >
            <ToolCardGrid
                surface={TOOL_CARD_SURFACES.PAGE_TOOLS_DESKTOP}
                items={tools.items}
                ariaLabel={tools.actionsLabel}
                onSelectItem={selectTool}
            />
        </DesktopPopOutMenu>
    );
}

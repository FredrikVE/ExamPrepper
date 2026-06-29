// src/ui/view/components/PageTools/PageToolsMobileFooterSheet.jsx
import { useCallback, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ToolCardGrid from "../Shared/ToolCard/ToolCardGrid.jsx";
import { TOOL_CARD_SURFACES } from "../Shared/ToolCard/toolCardSurfaces.js";

export default function PageToolsMobileFooterSheet(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSheet = useCallback(() => {
        setIsOpen((wasOpen) => !wasOpen);
    }, []);

    const selectTool = useCallback((toolItem) => {
        if (!toolItem.onSelect) {
            return;
        }

        toolItem.onSelect();
        setIsOpen(false);
    }, []);

    if (!props.tools) {
        return props.children;
    }

    return (
        <div className="page-tools-mobile-footer-shell" data-open={isOpen ? "true" : "false"}>
            <button
                type="button"
                className="page-tools-mobile-trigger"
                aria-expanded={isOpen}
                aria-controls={`page-tools-mobile-panel-${props.tools.id}`}
                aria-label={isOpen ? props.tools.closeLabel : props.tools.openLabel}
                onClick={toggleSheet}
            >
                {isOpen ? <ChevronDown aria-hidden="true" focusable="false" /> : <ChevronUp aria-hidden="true" focusable="false" />}
                <span>{props.tools.mobileHandleLabel}</span>
            </button>

            <section
                id={`page-tools-mobile-panel-${props.tools.id}`}
                className="page-tools-mobile-panel"
                aria-label={props.tools.actionsLabel}
                hidden={!isOpen}
            >
                <ToolCardGrid
                    surface={TOOL_CARD_SURFACES.PAGE_TOOLS_MOBILE}
                    items={props.tools.items}
                    onSelectItem={selectTool}
                />
            </section>

            {props.children}
        </div>
    );
}

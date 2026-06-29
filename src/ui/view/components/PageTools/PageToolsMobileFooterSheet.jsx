// src/ui/view/components/PageTools/PageToolsMobileFooterSheet.jsx
import { useCallback, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import MobileBottomSheet from "../MobileBottomSheet/MobileBottomSheet.jsx";
import ToolCardGrid from "../Shared/ToolCard/ToolCardGrid.jsx";
import { TOOL_CARD_SURFACES } from "../Shared/ToolCard/toolCardSurfaces.js";

export default function PageToolsMobileFooterSheet(props) {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef(null);

    const closeSheet = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleSheet = useCallback(() => {
        setIsOpen((wasOpen) => !wasOpen);
    }, []);

    const selectTool = useCallback((toolItem) => {
        if (!toolItem.onSelect) {
            return;
        }

        toolItem.onSelect();
        closeSheet();
    }, [closeSheet]);

    if (!props.tools) {
        return props.children;
    }

    const sheetId = `page-tools-mobile-bottom-sheet-${props.tools.id}`;

    return (
        <div className="page-tools-mobile-footer-shell" data-open={isOpen ? "true" : "false"}>
            <button
                type="button"
                ref={triggerRef}
                className="page-tools-mobile-trigger"
                aria-expanded={isOpen}
                aria-controls={sheetId}
                aria-label={isOpen ? props.tools.closeLabel : props.tools.openLabel}
                onClick={toggleSheet}
            >
                {isOpen ? <ChevronDown aria-hidden="true" focusable="false" /> : <ChevronUp aria-hidden="true" focusable="false" />}
                <span>{props.tools.mobileHandleLabel}</span>
            </button>

            <MobileBottomSheet
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                finalFocusRef={triggerRef}
                contentId={sheetId}
                title={props.tools.actionsLabel}
                subtitle={props.tools.mobileHandleLabel}
                closeLabel={props.tools.closeLabel}
                popupClassName=""
                contentClassName=""
            >
                <ToolCardGrid
                    surface={TOOL_CARD_SURFACES.PAGE_TOOLS_MOBILE}
                    items={props.tools.items}
                    onSelectItem={selectTool}
                />
            </MobileBottomSheet>

            {props.children}
        </div>
    );
}

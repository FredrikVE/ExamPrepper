// src/ui/view/components/PageTools/PageToolsMobileFooterSheet.jsx
import { useCallback, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import MobileBottomSheet from "../MobileBottomSheet/MobileBottomSheet.jsx";
import ToolCardGrid from "../Shared/ToolCard/ToolCardGrid.jsx";
import { TOOL_CARD_SURFACES } from "../Shared/ToolCard/toolCardSurfaces.js";

export default function PageToolsMobileFooterSheet({ tools, renderControls, renderSearchContent, onCloseSheet }) {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef(null);

    const closeSheet = useCallback(() => {
        setIsOpen(false);
        onCloseSheet();
    }, [onCloseSheet]);

    const changeSheetOpen = useCallback((nextIsOpen) => {
        setIsOpen(nextIsOpen);

        if (!nextIsOpen) {
            onCloseSheet();
        }
    }, [onCloseSheet]);

    const toggleSheet = useCallback(() => {
        setIsOpen((wasOpen) => {
            const nextIsOpen = !wasOpen;

            if (!nextIsOpen) {
                onCloseSheet();
            }

            return nextIsOpen;
        });
    }, [onCloseSheet]);

    const selectTool = useCallback((toolItem) => {
        if (!toolItem.onSelect) {
            return;
        }

        toolItem.onSelect();
        closeSheet();
    }, [closeSheet]);

    if (!tools) {
        return (
            <div className="page-tools-mobile-inline-content">
                {renderSearchContent()}
                {renderControls()}
            </div>
        );
    }

    const sheetId = `page-tools-mobile-bottom-sheet-${tools.id}`;

    return (
        <div className="page-tools-mobile-footer-shell" data-open={isOpen ? "true" : "false"}>
            <button
                type="button"
                ref={triggerRef}
                className="page-tools-mobile-trigger"
                aria-expanded={isOpen}
                aria-controls={sheetId}
                aria-label={isOpen ? tools.closeLabel : tools.openLabel}
                onClick={toggleSheet}
            >
                {isOpen ? <ChevronDown aria-hidden="true" focusable="false" /> : <ChevronUp aria-hidden="true" focusable="false" />}
                <span>{tools.mobileHandleLabel}</span>
            </button>

            <div className="page-tools-mobile-inline-content">
                {renderSearchContent()}
                {renderControls()}
            </div>

            <MobileBottomSheet
                isOpen={isOpen}
                onOpenChange={changeSheetOpen}
                finalFocusRef={triggerRef}
                contentId={sheetId}
                title={tools.actionsLabel}
                subtitle={tools.mobileHandleLabel}
                closeLabel={tools.closeLabel}
                popupClassName=""
                contentClassName="page-tools-mobile-bottom-sheet-content"
            >
                <div className="page-tools-mobile-sheet-controls">
                    {renderControls()}
                </div>

                <div className="page-tools-mobile-sheet-search-content">
                    {renderSearchContent()}
                </div>

                <ToolCardGrid
                    surface={TOOL_CARD_SURFACES.PAGE_TOOLS_MOBILE}
                    items={tools.items}
                    onSelectItem={selectTool}
                />
            </MobileBottomSheet>
        </div>
    );
}

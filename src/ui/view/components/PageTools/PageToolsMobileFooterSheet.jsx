// src/ui/view/components/PageTools/PageToolsMobileFooterSheet.jsx
import { useCallback } from "react";
import DockedMobileBottomSheet from "../MobileBottomSheet/DockedMobileBottomSheet.jsx";
import ToolCardGrid from "../ToolCard/ToolCardGrid.jsx";
import { TOOL_CARD_SURFACES } from "../ToolCard/toolCardSurfaces.js";

export default function PageToolsMobileFooterSheet({ tools, renderControls, renderSearchContent, isSheetOpen, onOpenSheet, onSheetOpenChange }) {
    const closeSheet = useCallback(() => {
        onSheetOpenChange(false);
    }, [onSheetOpenChange]);

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
    const searchContent = renderSearchContent();

    return (
        <div className="page-tools-mobile-footer-shell" data-open={isSheetOpen ? "true" : "false"}>
            <div className="page-tools-mobile-inline-content">
                {renderSearchContent()}
                {renderControls()}
            </div>

            <DockedMobileBottomSheet
                isOpen={isSheetOpen}
                onOpenChange={onSheetOpenChange}
                contentId={sheetId}
                title={tools.actionsLabel}
                subtitle={tools.mobileHandleLabel}
                openLabel={tools.openLabel}
                closeLabel={tools.closeLabel}
                peekLabel={tools.mobileHandleLabel}
                popupClassName=""
                contentClassName="page-tools-mobile-bottom-sheet-content"
            >
                {/* Forslagslisten ligger FØR kontrollene slik at autocomplete vokser
                    oppover fra søkefeltet — samme rekkefølge som inline-varianten. */}
                <div className="page-tools-mobile-sheet-search-content">
                    {searchContent}
                </div>

                <div className="page-tools-mobile-sheet-controls" onFocusCapture={onOpenSheet} onPointerDownCapture={onOpenSheet}>
                    {renderControls()}
                </div>

                <ToolCardGrid
                    surface={TOOL_CARD_SURFACES.PAGE_TOOLS_MOBILE}
                    items={tools.items}
                    onSelectItem={selectTool}
                />
            </DockedMobileBottomSheet>
        </div>
    );
}

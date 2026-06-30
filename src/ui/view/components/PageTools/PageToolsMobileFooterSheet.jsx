// src/ui/view/components/PageTools/PageToolsMobileFooterSheet.jsx
import { useCallback, useState } from "react";
import MobileBottomSheet from "../MobileBottomSheet/MobileBottomSheet.jsx";
import ToolCardGrid from "../ToolCard/ToolCardGrid.jsx";
import { TOOL_CARD_SURFACES } from "../ToolCard/toolCardSurfaces.js";

export default function PageToolsMobileFooterSheet({ tools, renderControls, renderSearchContent, onCloseSheet }) {
    const [isOpen, setIsOpen] = useState(false);

    const openSheet = useCallback(() => {
        setIsOpen(true);
    }, []);

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
        <div className="page-tools-mobile-footer-shell" data-open={isOpen ? "true" : "false"}>
            <div className="page-tools-mobile-inline-content">
                {renderSearchContent()}
                {renderControls()}
            </div>

            <MobileBottomSheet
                isOpen={isOpen}
                onOpenChange={changeSheetOpen}
                finalFocusRef={null}
                contentId={sheetId}
                title={tools.actionsLabel}
                subtitle={tools.mobileHandleLabel}
                openLabel={tools.openLabel}
                closeLabel={tools.closeLabel}
                peekLabel={tools.mobileHandleLabel}
                hasPeek={true}
                popupClassName=""
                contentClassName="page-tools-mobile-bottom-sheet-content"
            >
                <div className="page-tools-mobile-sheet-controls" onFocusCapture={openSheet} onPointerDownCapture={openSheet}>
                    {renderControls()}
                </div>

                <div className="page-tools-mobile-sheet-search-content">
                    {searchContent}
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

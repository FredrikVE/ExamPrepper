// src/ui/view/components/PageTools/PageToolsMobileFooterSheet.jsx
import { useCallback } from "react";
import DockedMobileBottomSheet from "../MobileBottomSheet/DockedMobileBottomSheet.jsx";
import ToolCardGrid from "../ToolCard/ToolCardGrid.jsx";
import { TOOL_CARD_SURFACES } from "../ToolCard/toolCardSurfaces.js";

export default function PageToolsMobileFooterSheet(props) {
	const closeSheet = useCallback(() => {
		props.onSheetOpenChange(false);
	}, [props.onSheetOpenChange]);

	const selectTool = useCallback((toolItem) => {
		if (!toolItem.onSelect) {
			return;
		}

		toolItem.onSelect();
		closeSheet();
	}, [closeSheet]);

	if (!props.tools) {
		return (
			<div className="page-tools-mobile-inline-content">
				{props.renderSearchContent()}
				{props.renderControls()}
			</div>
		);
	}

	const sheetId = `page-tools-mobile-bottom-sheet-${props.tools.id}`;
	const peekContent = (
		<>
			<div className="page-tools-mobile-sheet-search-content">
				{props.renderSearchContent()}
			</div>

			<div className="page-tools-mobile-sheet-controls" onFocusCapture={props.onOpenSheet} onPointerDownCapture={props.onOpenSheet}>
				{props.renderControls()}
			</div>
		</>
	);
	const expandedContent = (
		<ToolCardGrid
			surface={TOOL_CARD_SURFACES.PAGE_TOOLS_MOBILE}
			items={props.tools.items}
			onSelectItem={selectTool}
		/>
	);

	return (
		<div className="page-tools-mobile-footer-shell">
			<div className="page-tools-mobile-inline-content">
				{props.renderSearchContent()}
				{props.renderControls()}
			</div>

			<DockedMobileBottomSheet
				isOpen={props.isSheetOpen}
				onOpenChange={props.onSheetOpenChange}
				contentId={sheetId}
				title={props.tools.actionsLabel}
				subtitle={props.tools.mobileHandleLabel}
				openLabel={props.tools.openLabel}
				closeLabel={props.tools.closeLabel}
				peekLabel={props.tools.mobileHandleLabel}
				peekContent={peekContent}
				expandedContent={expandedContent}
			/>
		</div>
	);
}

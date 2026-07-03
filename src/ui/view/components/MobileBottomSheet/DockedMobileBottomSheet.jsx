// src/ui/view/components/MobileBottomSheet/DockedMobileBottomSheet.jsx
import { useRef } from "react";
import { ChevronUp } from "lucide-react";
import useDockedSheetDragInteraction from "./useDockedSheetDragInteraction.js";

export default function DockedMobileBottomSheet({ isOpen, onOpenChange, contentId, title, subtitle, openLabel, closeLabel, peekLabel, popupClassName = "", contentClassName = "", children }) {
	const peekTriggerRef = useRef(null);
	const dragInteraction = useDockedSheetDragInteraction(isOpen, onOpenChange);
	const popupClass = `mobile-bottom-sheet-popup ${popupClassName}`.trim();
	const contentClass = `mobile-bottom-sheet-content ${contentClassName}`.trim();

	const toggleSheet = () => {
		if (dragInteraction.consumeDidDrag()) {
			return;
		}

		onOpenChange(!isOpen);
	};

	return (
		<div
			className="mobile-bottom-sheet-root"
			data-open={isOpen ? "true" : "false"}
			data-has-peek="true"
			data-dragging={dragInteraction.isDragging ? "true" : "false"}
			style={{ "--mobile-bottom-sheet-drag-offset": `${dragInteraction.dragOffsetY}px` }}
		>
			<section id={contentId} className={popupClass} aria-label={peekLabel} role="region">
				<div className={contentClass}>
					<h2 className="sr-only">
						{title}
					</h2>
					<p className="sr-only">
						{subtitle}
					</p>

					<button
						type="button"
						ref={peekTriggerRef}
						className="mobile-bottom-sheet-grip-control mobile-bottom-sheet-grip-control-docked"
						onClick={toggleSheet}
						onPointerDown={dragInteraction.startGripDrag}
						onPointerMove={dragInteraction.moveGripDrag}
						onPointerUp={dragInteraction.endGripDrag}
						onPointerCancel={dragInteraction.cancelGripDrag}
						aria-label={isOpen ? closeLabel : openLabel}
						aria-expanded={isOpen}
						aria-controls={contentId}
					>
						<ChevronUp className="mobile-bottom-sheet-grip-chevron" aria-hidden="true" focusable="false" />
					</button>

					{children}
				</div>
			</section>
		</div>
	);
}

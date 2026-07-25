// src/ui/view/components/MobileBottomSheet/DockedMobileBottomSheet.jsx
import { ChevronUp } from "lucide-react";
import useDockedSheetDragInteraction from "./useDockedSheetDragInteraction.js";

export default function DockedMobileBottomSheet(props) {
	const dragInteraction = useDockedSheetDragInteraction(props.isOpen, props.onOpenChange);
	const expandedContentId = `${props.contentId}-expanded`;

	const toggleSheet = () => {
		if (dragInteraction.consumeDidDrag()) {
			return;
		}

		props.onOpenChange(!props.isOpen);
	};

	return (
		<div
			className="mobile-bottom-sheet-root"
			data-open={props.isOpen ? "true" : "false"}
			data-dragging={dragInteraction.isDragging ? "true" : "false"}
			style={{ "--mobile-bottom-sheet-drag-offset": `${dragInteraction.dragOffsetY}px` }}
		>
			{!props.isOpen && props.dockedOverlayContent !== null ? (
				<div className="mobile-bottom-sheet-docked-overlay">
					{props.dockedOverlayContent}
				</div>
			) : null}

			<section id={props.contentId} className="mobile-bottom-sheet-popup" aria-label={props.peekLabel} role="region">
				<div className="mobile-bottom-sheet-content">
					<h2 className="sr-only">{props.title}</h2>
					<p className="sr-only">{props.subtitle}</p>

					<button
						type="button"
						className="mobile-bottom-sheet-grip-control"
						onClick={toggleSheet}
						onPointerDown={dragInteraction.startGripDrag}
						onPointerMove={dragInteraction.moveGripDrag}
						onPointerUp={dragInteraction.endGripDrag}
						onPointerCancel={dragInteraction.cancelGripDrag}
						aria-label={props.isOpen ? props.closeLabel : props.openLabel}
						aria-expanded={props.isOpen}
						aria-controls={expandedContentId}
					>
						<ChevronUp className="mobile-bottom-sheet-grip-chevron" aria-hidden="true" focusable="false" />
					</button>

					<div className="mobile-bottom-sheet-peek-content">
						{props.peekContent}
					</div>

					<div
						id={expandedContentId}
						className="mobile-bottom-sheet-expanded-content"
						aria-hidden={!props.isOpen}
						inert={!props.isOpen}
					>
						{props.expandedContent}
					</div>
				</div>
			</section>
		</div>
	);
}

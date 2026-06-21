// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/Shared/MobileDnd/MobileDragOverlay.jsx
import { DragOverlay } from "@dnd-kit/react";

export default function MobileDragOverlay(props) {
	return (
		<DragOverlay className="mobile-dnd-drag-overlay" dropAnimation={null}>
			{(dragSource) => props.children({
				dragSourceId: dragSource.id,
				dragSourceContext: dragSource.data
			})}
		</DragOverlay>
	);
}

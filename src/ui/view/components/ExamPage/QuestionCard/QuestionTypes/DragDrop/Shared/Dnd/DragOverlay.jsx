// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/Shared/Dnd/DragOverlay.jsx
import { DragOverlay as DndKitDragOverlay } from "@dnd-kit/react";

export default function DragOverlay(props) {
	return (
		<DndKitDragOverlay className="dnd-drag-overlay" dropAnimation={null}>
			{(source) => props.children({
				sourceId: source.id,
				sourceData: source.data
			})}
		</DndKitDragOverlay>
	);
}

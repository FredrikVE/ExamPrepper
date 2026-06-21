// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/Shared/MobileDnd/useMobileDndOperation.js
import { useDragOperation } from "@dnd-kit/react";

export default function useMobileDndOperation() {
	const dragOperation = useDragOperation();
	const dragSource = dragOperation.source;
	const dropTarget = dragOperation.target;

	return {
		dragSourceId: dragSource?.id ?? null,
		dropTargetId: dropTarget?.id ?? null,
		dragSourceContext: dragSource?.data ?? null,
		dropTargetContext: dropTarget?.data ?? null,
		hasDragSource: Boolean(dragSource)
	};
}

// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/Shared/MobileDnd/MobileDroppable.jsx
import { useDroppable } from "@dnd-kit/react";

export default function MobileDroppable(props) {
	const { droppable, isDropTarget, ref } = useDroppable({
		id: props.dropTargetId,
		accept: props.acceptedDragSourceType,
		data: props.dropTargetContext,
		disabled: props.disabled
	});

	return props.children({
		dropTarget: droppable,
		droppableRef: ref,
		isDropTarget
	});
}

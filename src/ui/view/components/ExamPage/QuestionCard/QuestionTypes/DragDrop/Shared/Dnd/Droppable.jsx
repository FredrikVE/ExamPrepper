// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/Shared/Dnd/Droppable.jsx
import { useDroppable } from "@dnd-kit/react";

export default function Droppable(props) {
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

// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/Shared/MobileDnd/MobileDraggable.jsx
import { useDraggable } from "@dnd-kit/react";

export default function MobileDraggable(props) {
	const {
		draggable,
		isDragging,
		isDropping,
		isDragSource,
		handleRef,
		ref
	} = useDraggable({
		id: props.dragSourceId,
		type: props.dragSourceType,
		data: props.dragSourceContext,
		disabled: props.disabled
	});

	return props.children({
		dragSource: draggable,
		draggableRef: ref,
		dragHandleRef: handleRef,
		isDragging,
		isDropping,
		isDragSource
	});
}

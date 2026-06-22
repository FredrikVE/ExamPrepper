// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/Shared/Dnd/Draggable.jsx
import { useDraggable } from "@dnd-kit/react";

export default function Draggable(props) {
	const {
		isDragging,
		handleRef,
		ref
	} = useDraggable({
		id: props.id,
		type: props.type,
		data: props.data,
		disabled: props.disabled
	});

	return props.children({
		ref,
		handleRef,
		isDragging
	});
}

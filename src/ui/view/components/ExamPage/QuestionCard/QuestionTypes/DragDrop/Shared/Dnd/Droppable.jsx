// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/Shared/Dnd/Droppable.jsx
import { useDroppable } from "@dnd-kit/react";

export default function Droppable(props) {
	const { isDropTarget, ref } = useDroppable({
		id: props.id,
		accept: props.accept,
		data: props.data,
		disabled: props.disabled
	});

	return props.children({
		ref,
		isDropTarget
	});
}

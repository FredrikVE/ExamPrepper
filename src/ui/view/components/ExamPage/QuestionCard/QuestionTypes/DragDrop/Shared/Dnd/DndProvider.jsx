// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/Shared/Dnd/DndProvider.jsx
import { DragDropProvider } from "@dnd-kit/react";

export default function DndProvider(props) {
	const handleDragEnd = (event) => {
		if (event.canceled) {
			return;
		}

		const dragSource = event.operation.source;
		const dropTarget = event.operation.target;

		if (!dragSource || !dropTarget) {
			return;
		}

		props.onDndDrop({
			dragSourceId: dragSource.id,
			dropTargetId: dropTarget.id,
			dragSourceContext: dragSource.data,
			dropTargetContext: dropTarget.data
		});
	};

	return (
		<DragDropProvider onDragEnd={handleDragEnd}>
			{props.children}
		</DragDropProvider>
	);
}

// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/Shared/MobileDnd/MobileDndProvider.jsx
import { DragDropProvider } from "@dnd-kit/react";

export default function MobileDndProvider(props) {
	const handleDragEnd = (event) => {
		if (event.canceled) {
			return;
		}

		const dragSource = event.operation.source;
		const dropTarget = event.operation.target;

		if (!dragSource || !dropTarget) {
			return;
		}

		props.onMobileDndDrop({
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

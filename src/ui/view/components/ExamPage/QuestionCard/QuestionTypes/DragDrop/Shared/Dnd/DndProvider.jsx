// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/Shared/Dnd/DndProvider.jsx
import { DragDropProvider } from "@dnd-kit/react";

export default function DndProvider(props) {
	const handleDragEnd = (event) => {
		if (event.canceled) {
			return;
		}

		const source = event.operation.source;
		const target = event.operation.target;

		if (!source || !target) {
			return;
		}

		props.onDrop({
			sourceId: source.id,
			targetId: target.id,
			sourceData: source.data,
			targetData: target.data
		});
	};

	return (
		<DragDropProvider onDragEnd={handleDragEnd}>
			{props.children}
		</DragDropProvider>
	);
}

// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/Shared/Dnd/useDndOperation.js
import { useDragOperation } from "@dnd-kit/react";

export default function useDndOperation() {
	const dragOperation = useDragOperation();
	const source = dragOperation.source;
	const target = dragOperation.target;

	return {
		sourceId: source?.id ?? null,
		targetId: target?.id ?? null,
		sourceData: source?.data ?? null,
		targetData: target?.data ?? null,
		hasSource: Boolean(source)
	};
}

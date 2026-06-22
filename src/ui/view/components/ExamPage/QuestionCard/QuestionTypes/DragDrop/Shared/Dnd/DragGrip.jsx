// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/Shared/Dnd/DragGrip.jsx
import { GripVertical } from "lucide-react";

export default function DragGrip(props) {
	return (
		<span
			className={props.className}
			aria-hidden="true"
			data-dnd-drag-affordance="true"
		>
			<GripVertical
				className="dnd-drag-grip-icon"
				size={20}
				strokeWidth={2.8}
				aria-hidden="true"
				focusable="false"
			/>
		</span>
	);
}

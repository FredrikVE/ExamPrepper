// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/Shared/Dnd/ClearButton.jsx
import { X } from "lucide-react";

export default function ClearButton(props) {
	const handlePointerDown = (event) => {
		event.stopPropagation();
	};

	const handleClick = (event) => {
		event.stopPropagation();
		props.onClear();
	};

	return (
		<button
			type="button"
			className={`dnd-clear-button ${props.className ?? ""}`.trim()}
			onPointerDown={handlePointerDown}
			onClick={handleClick}
			aria-label={props.label}
		>
			<X className="dnd-clear-button-icon" aria-hidden="true" focusable="false" />
		</button>
	);
}

// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Mobile/TableMatchMobilePlacedCard.jsx
import { X } from "lucide-react";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import DragGrip from "../../Shared/Dnd/DragGrip.jsx";

export default function TableMatchMobilePlacedCard(props) {
	const className = getClassName(props.isDragging);

	const handleClearClick = (event) => {
		event.stopPropagation();
		props.onClear();
	};

	const stopClearPointerDown = (event) => {
		event.stopPropagation();
	};

	return (
		<div
			ref={props.dndRef}
			className={className}
		>
			<span className="table-match-mobile-card-text">
				<FormattedText text={props.card.text} />
			</span>

			<DragGrip className="table-match-mobile-card-grip" />

			<button
				type="button"
				className="table-match-mobile-clear-button"
				onPointerDown={stopClearPointerDown}
				onClick={handleClearClick}
				aria-label={props.clearLabel}
			>
				<X aria-hidden="true" />
			</button>
		</div>
	);
}

const getClassName = (isDragging) => {
	let className = "table-match-mobile-card table-match-mobile-placed-card";

	if (isDragging) {
		className += " table-match-mobile-card-dragging";
	}

	return className;
};


// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Mobile/TableMatchMobilePlacedCard.jsx
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import DragGrip from "../../Shared/Dnd/DragGrip.jsx";
import ClearButton from "../../Shared/Dnd/ClearButton.jsx";

export default function TableMatchMobilePlacedCard(props) {
	const className = getClassName(props.isDragging);

	return (
		<div
			ref={props.dndRef}
			className={className}
		>
			<span className="table-match-mobile-card-text">
				<FormattedText text={props.card.text} />
			</span>

			<DragGrip className="table-match-mobile-card-grip" />

			<ClearButton
				className="table-match-mobile-clear-button"
				label={props.clearLabel}
				onClear={props.onClear}
			/>
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


// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Mobile/TableMatchMobilePlacedCard.jsx
import FormattedText from "../../../../../../Shared/FormattedText.jsx";

export default function TableMatchMobilePlacedCard(props) {
	const className = getClassName(props.isDragging);

	return (
		<div
			ref={props.draggableRef}
			className={className}
		>
			<span className="table-match-mobile-card-text">
				<FormattedText text={props.card.text} />
			</span>

			<MobileGripHandle />
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

const MobileGripHandle = () => {
	return (
		<span className="table-match-mobile-card-grip" aria-hidden="true">
			<span />
			<span />
			<span />
			<span />
			<span />
			<span />
		</span>
	);
};

// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Mobile/TableMatchMobileCard.jsx
import FormattedText from "../../../../../../Shared/FormattedText.jsx";

export default function TableMatchMobileCard(props) {
	const className = getClassName({
		isDragging: props.isDragging,
		isSelected: props.isSelected
	});

	return (
		<button
			type="button"
			className={className}
			onClick={props.onClick}
			onPointerDown={props.onPointerDown}
		>
			<span className="table-match-mobile-card-text">
				<FormattedText text={props.card.text} />
			</span>

			<MobileGripHandle />
		</button>
	);
}

const getClassName = ({ isDragging, isSelected }) => {
	let className = "table-match-mobile-card";

	if (isSelected) {
		className += " table-match-mobile-card-selected";
	}

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

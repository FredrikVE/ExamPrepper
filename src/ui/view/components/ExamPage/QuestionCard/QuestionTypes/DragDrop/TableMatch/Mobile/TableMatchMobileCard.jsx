// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Mobile/TableMatchMobileCard.jsx
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import Draggable from "../../Shared/Dnd/Draggable.jsx";
import DragGrip from "../../Shared/Dnd/DragGrip.jsx";

export default function TableMatchMobileCard(props) {
	return (
		<Draggable
			id={props.card.id}
			type={props.type}
			data={props.sourceData}
		>
			{({ ref: dndRef, isDragging }) => {
				const className = getClassName({
					isDragging,
					isSelected: props.isSelected
				});

				return (
					<button
						ref={dndRef}
						type="button"
						className={className}
						onClick={props.onClick}
					>
						<span className="table-match-mobile-card-text">
							<FormattedText text={props.card.text} />
						</span>

						<DragGrip className="table-match-mobile-card-grip" />
					</button>
				);
			}}
		</Draggable>
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


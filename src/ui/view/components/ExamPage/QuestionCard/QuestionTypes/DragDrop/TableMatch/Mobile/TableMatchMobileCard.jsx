// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Mobile/TableMatchMobileCard.jsx
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import MobileDraggable from "../../Shared/MobileDnd/MobileDraggable.jsx";
import MobileDragGrip from "../../Shared/MobileDnd/MobileDragGrip.jsx";

export default function TableMatchMobileCard(props) {
	return (
		<MobileDraggable
			dragSourceId={props.card.id}
			dragSourceType={props.dragSourceType}
			dragSourceContext={props.dragSourceContext}
		>
			{({ draggableRef, isDragging }) => {
				const className = getClassName({
					isDragging,
					isSelected: props.isSelected
				});

				return (
					<button
						ref={draggableRef}
						type="button"
						className={className}
						onClick={props.onClick}
					>
						<span className="table-match-mobile-card-text">
							<FormattedText text={props.card.text} />
						</span>

						<MobileDragGrip className="table-match-mobile-card-grip" />
					</button>
				);
			}}
		</MobileDraggable>
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


// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Mobile/TableMatchMobileTargetCard.jsx
import { X } from "lucide-react";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import MobileDraggable from "../../Shared/MobileDnd/MobileDraggable.jsx";
import MobileDroppable from "../../Shared/MobileDnd/MobileDroppable.jsx";
import TableMatchMobilePlacedCard from "./TableMatchMobilePlacedCard.jsx";

export default function TableMatchMobileTargetCard(props) {
	return (
		<MobileDroppable
			dropTargetId={props.target.id}
			acceptedDragSourceType={props.acceptedDragSourceType}
			dropTargetContext={{ target: props.target }}
		>
			{({ droppableRef, isDropTarget }) => (
				<TableMatchMobileTargetCardContent
					{...props}
					droppableRef={droppableRef}
					isDropTarget={isDropTarget}
				/>
			)}
		</MobileDroppable>
	);
}

function TableMatchMobileTargetCardContent(props) {
	const cardClassName = getCardClassName(props.isDropTarget);
	const targetClassName = getTargetClassName({
		hasSelectedCard: Boolean(props.selectedCard),
		hasActiveCard: props.hasActiveCard,
		isDropTarget: props.isDropTarget
	});

	const handleKeyDown = (event) => {
		const userPressedEnter = event.key === "Enter";
		const userPressedSpace = event.key === " ";

		if (!userPressedEnter && !userPressedSpace) {
			return;
		}

		event.preventDefault();
		props.onTargetClick();
	};

	return (
		<article
			ref={props.droppableRef}
			className={cardClassName}
			role="button"
			tabIndex={0}
			onClick={props.onTargetClick}
			onKeyDown={handleKeyDown}
			data-table-match-mobile-target-id={props.target.id}
			aria-label={`${props.t.dragDropDropHere}: ${props.target.description}`}
		>
			<div className="table-match-mobile-target-description">
				<FormattedText text={props.target.description} />
			</div>

			<div className={targetClassName}>
				{props.selectedCard ? (
					<div className="table-match-mobile-filled-target">
						<MobileDraggable
							dragSourceId={props.selectedCard.id}
							dragSourceType={props.acceptedDragSourceType}
							dragSourceContext={{ card: props.selectedCard, sourceTargetId: props.target.id }}
						>
							{({ draggableRef, isDragging }) => (
								<TableMatchMobilePlacedCard
									card={props.selectedCard}
									draggableRef={draggableRef}
									isDragging={isDragging}
								/>
							)}
						</MobileDraggable>

						<button
							type="button"
							className="table-match-mobile-clear-button"
							onClick={handleClearClick(props.onClear)}
							aria-label={props.t.dragDropClearAnswer}
						>
							<X aria-hidden="true" />
						</button>
					</div>
				) : (
					<span className="table-match-mobile-drop-label">
						{props.t.dragDropDropHere}
					</span>
				)}
			</div>
		</article>
	);
}

const handleClearClick = (onClear) => {
	return (event) => {
		event.stopPropagation();
		onClear();
	};
};

const getCardClassName = (isDropTarget) => {
	let className = "table-match-mobile-target-card";

	if (isDropTarget) {
		className += " table-match-mobile-target-card-over";
	}

	return className;
};

const getTargetClassName = ({ hasSelectedCard, hasActiveCard, isDropTarget }) => {
	let className = "table-match-mobile-drop-zone";

	if (hasSelectedCard) {
		className += " table-match-mobile-drop-zone-filled";
	}

	if (hasActiveCard) {
		className += " table-match-mobile-drop-zone-armed";
	}

	if (isDropTarget) {
		className += " table-match-mobile-drop-zone-over";
	}

	return className;
};

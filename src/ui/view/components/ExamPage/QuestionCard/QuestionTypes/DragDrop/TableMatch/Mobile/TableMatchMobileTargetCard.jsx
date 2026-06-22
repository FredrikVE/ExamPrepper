// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Mobile/TableMatchMobileTargetCard.jsx
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import Draggable from "../../Shared/Dnd/Draggable.jsx";
import Droppable from "../../Shared/Dnd/Droppable.jsx";
import TableMatchMobilePlacedCard from "./TableMatchMobilePlacedCard.jsx";

export default function TableMatchMobileTargetCard(props) {
	return (
		<Droppable
			id={props.target.id}
			accept={props.accept}
			data={{ target: props.target }}
		>
			{({ ref: dndRef, isDropTarget }) => (
				<TableMatchMobileTargetCardContent
					{...props}
					dndRef={dndRef}
					isDropTarget={isDropTarget}
				/>
			)}
		</Droppable>
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
			ref={props.dndRef}
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
						<Draggable
							id={props.selectedCard.id}
							type={props.accept}
							data={{ card: props.selectedCard, sourceTargetId: props.target.id }}
						>
							{({ ref: dndRef, isDragging }) => (
								<TableMatchMobilePlacedCard
									card={props.selectedCard}
									dndRef={dndRef}
									isDragging={isDragging}
									onClear={props.onClear}
									clearLabel={props.t.dragDropClearAnswer}
								/>
							)}
						</Draggable>
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

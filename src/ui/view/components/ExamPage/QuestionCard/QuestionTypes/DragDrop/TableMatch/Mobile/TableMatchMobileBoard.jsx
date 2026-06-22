// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Mobile/TableMatchMobileBoard.jsx
import DndProvider from "../../Shared/Dnd/DndProvider.jsx";
import DragOverlay from "../../Shared/Dnd/DragOverlay.jsx";
import Droppable from "../../Shared/Dnd/Droppable.jsx";
import useDndOperation from "../../Shared/Dnd/useDndOperation.js";
import TableMatchMobileCard from "./TableMatchMobileCard.jsx";
import TableMatchMobilePlacedCard from "./TableMatchMobilePlacedCard.jsx";
import TableMatchMobileTargetCard from "./TableMatchMobileTargetCard.jsx";

const TABLE_MATCH_MOBILE_CARD_TYPE = "table-match-mobile-card";
const TABLE_MATCH_MOBILE_CARD_BANK_DROP_TARGET_ID = "table-match-mobile-card-bank";

export default function TableMatchMobileBoard(props) {
	return (
		<DndProvider onDndDrop={handleDndDrop(props)}>
			<TableMatchMobileBoardContent {...props} />
		</DndProvider>
	);
}

function TableMatchMobileBoardContent(props) {
	const dndOperation = useDndOperation();
	const targets = Array.isArray(props.question?.targets)
		? props.question.targets
		: [];

	return (
		<section className="table-match-mobile-board" aria-label={props.t.dragDropCardBankTitle}>
			<div className="table-match-mobile-column table-match-mobile-terms-column">
				<h4 className="table-match-mobile-column-title">
					{props.t.dragDropCardBankTitle}
				</h4>

				<Droppable
					dropTargetId={TABLE_MATCH_MOBILE_CARD_BANK_DROP_TARGET_ID}
					acceptedDragSourceType={TABLE_MATCH_MOBILE_CARD_TYPE}
				>
					{({ droppableRef, isDropTarget }) => (
						<div
							ref={droppableRef}
							className={getCardListClassName(isDropTarget)}
							data-table-match-mobile-terms-list="true"
						>
							{props.cards.map((card) => (
								<TableMatchMobileCard
									key={card.id}
									card={card}
									dragSourceType={TABLE_MATCH_MOBILE_CARD_TYPE}
									dragSourceContext={{ card, sourceTargetId: null }}
									isSelected={props.selectedCardId === card.id}
									onClick={() => props.onCardSelect(card.id)}
								/>
							))}
						</div>
					)}
				</Droppable>
			</div>

			<div className="table-match-mobile-column table-match-mobile-targets-column">
				<h4 className="table-match-mobile-column-title">
					{props.t.dragDropDescriptionHeader}
				</h4>

				<div className="table-match-mobile-target-list">
					{targets.map((target) => {
						const selectedCardId = props.safeAnswer[target.id];
						const selectedCard = props.cardsById[selectedCardId];

						return (
							<TableMatchMobileTargetCard
								key={target.id}
								target={target}
								selectedCard={selectedCard}
								hasActiveCard={Boolean(props.selectedCardId) || dndOperation.hasDragSource}
								acceptedDragSourceType={TABLE_MATCH_MOBILE_CARD_TYPE}
								onTargetClick={() => props.onTargetClick(target.id)}
								onClear={() => props.onClearTarget(target.id)}
								t={props.t}
							/>
						);
					})}
				</div>
			</div>

			<DragOverlay>
				{({ dragSourceContext }) => {
					if (!dragSourceContext?.card) {
						return null;
					}

					return <TableMatchMobilePlacedCard card={dragSourceContext.card} />;
				}}
			</DragOverlay>
		</section>
	);
}

const handleDndDrop = (props) => {
	return ({ dragSourceId, dropTargetId, dragSourceContext }) => {
		if (dropTargetId === TABLE_MATCH_MOBILE_CARD_BANK_DROP_TARGET_ID) {
			if (dragSourceContext?.sourceTargetId) {
				props.onClearTarget(dragSourceContext.sourceTargetId);
			}

			return;
		}

		props.onCardDrop(dropTargetId, dragSourceId);

		if (props.selectedCardId) {
			props.onCardSelect(props.selectedCardId);
		}
	};
};

const getCardListClassName = (isDropTarget) => {
	let className = "table-match-mobile-card-list";

	if (isDropTarget) {
		className += " table-match-mobile-card-list-over";
	}

	return className;
};

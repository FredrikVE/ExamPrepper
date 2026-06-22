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
					id={TABLE_MATCH_MOBILE_CARD_BANK_DROP_TARGET_ID}
					accept={TABLE_MATCH_MOBILE_CARD_TYPE}
				>
					{({ ref: dndRef, isDropTarget }) => (
						<div
							ref={dndRef}
							className={getCardListClassName(isDropTarget)}
							data-table-match-mobile-terms-list="true"
						>
							{props.cards.map((card) => (
								<TableMatchMobileCard
									key={card.id}
									card={card}
									type={TABLE_MATCH_MOBILE_CARD_TYPE}
									data={{ card, sourceTargetId: null }}
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
								hasActiveCard={Boolean(props.selectedCardId) || dndOperation.hasSource}
								accept={TABLE_MATCH_MOBILE_CARD_TYPE}
								onTargetClick={() => props.onTargetClick(target.id)}
								onClear={() => props.onClearTarget(target.id)}
								t={props.t}
							/>
						);
					})}
				</div>
			</div>

			<DragOverlay>
				{({ sourceData }) => {
					if (!sourceData?.card) {
						return null;
					}

					return <TableMatchMobilePlacedCard card={sourceData.card} />;
				}}
			</DragOverlay>
		</section>
	);
}

const handleDndDrop = (props) => {
	return ({ sourceId, targetId, sourceData }) => {
		if (targetId === TABLE_MATCH_MOBILE_CARD_BANK_DROP_TARGET_ID) {
			if (sourceData?.sourceTargetId) {
				props.onClearTarget(sourceData.sourceTargetId);
			}

			return;
		}

		props.onCardDrop(targetId, sourceId);

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

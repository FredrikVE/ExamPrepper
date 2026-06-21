// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Mobile/TableMatchMobileBoard.jsx
import { createPortal } from "react-dom";
import TableMatchMobileCard from "./TableMatchMobileCard.jsx";
import TableMatchMobilePlacedCard from "./TableMatchMobilePlacedCard.jsx";
import TableMatchMobileTargetCard from "./TableMatchMobileTargetCard.jsx";
import useTableMatchMobileDrag from "./useTableMatchMobileDrag.js";

export default function TableMatchMobileBoard(props) {
	const { dragState, boardRef, startCardDrag } = useTableMatchMobileDrag({
		onCardDrop: props.onCardDrop,
		onCardSelect: props.onCardSelect,
		onClearTarget: props.onClearTarget,
		selectedCardId: props.selectedCardId
	});
	const targets = Array.isArray(props.question?.targets)
		? props.question.targets
		: [];

	return (
		<section ref={boardRef} className="table-match-mobile-board" aria-label={props.t.dragDropCardBankTitle}>
			<div className="table-match-mobile-column table-match-mobile-terms-column">
				<h4 className="table-match-mobile-column-title">
					{props.t.dragDropCardBankTitle}
				</h4>

				<div className="table-match-mobile-card-list" data-table-match-mobile-terms-list="true">
					{props.cards.map((card) => (
						<TableMatchMobileCard
							key={card.id}
							card={card}
							isDragging={dragState?.hasMoved && dragState.card.id === card.id}
							isSelected={props.selectedCardId === card.id}
							onClick={() => props.onCardSelect(card.id)}
							onPointerDown={startCardDrag(card, null)}
						/>
					))}
				</div>
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
								hasActiveCard={Boolean(props.selectedCardId) || Boolean(dragState?.hasMoved)}
								isDragOver={dragState?.overTargetId === target.id}
								onTargetClick={() => props.onTargetClick(target.id)}
								onClear={() => props.onClearTarget(target.id)}
								onPlacedCardPointerDown={selectedCard ? startCardDrag(selectedCard, target.id) : undefined}
								t={props.t}
							/>
						);
					})}
				</div>
			</div>

			{dragState?.hasMoved
				? createPortal(
					<div
						className="table-match-mobile-drag-layer"
						style={{
							left: `${dragState.x - dragState.offsetX}px`,
							top: `${dragState.y - dragState.offsetY}px`,
							width: `${dragState.width}px`,
							minHeight: `${dragState.height}px`
						}}
					>
						<TableMatchMobilePlacedCard card={dragState.card} />
					</div>,
					document.body
				)
				: null}
		</section>
	);
}

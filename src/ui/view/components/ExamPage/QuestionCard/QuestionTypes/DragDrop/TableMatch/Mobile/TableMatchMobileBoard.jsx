// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Mobile/TableMatchMobileBoard.jsx
import { useEffect, useRef, useState } from "react";
import TableMatchMobileCard from "./TableMatchMobileCard.jsx";
import TableMatchMobilePlacedCard from "./TableMatchMobilePlacedCard.jsx";
import TableMatchMobileTargetCard from "./TableMatchMobileTargetCard.jsx";

const DRAG_THRESHOLD_PX = 6;

export default function TableMatchMobileBoard(props) {
	const [dragState, setDragState] = useState(null);
	const dragStateRef = useRef(null);
	const callbacksRef = useRef({
		onCardDrop: props.onCardDrop,
		onCardSelect: props.onCardSelect,
		onClearTarget: props.onClearTarget
	});
	const targets = Array.isArray(props.question?.targets)
		? props.question.targets
		: [];

	useEffect(() => {
		dragStateRef.current = dragState;
	}, [dragState]);

	useEffect(() => {
		callbacksRef.current = {
			onCardDrop: props.onCardDrop,
			onCardSelect: props.onCardSelect,
			onClearTarget: props.onClearTarget
		};
	}, [props.onCardDrop, props.onCardSelect, props.onClearTarget]);

	useEffect(() => {
		if (!dragState?.pointerId) {
			return undefined;
		}

		const handlePointerMove = (event) => {
			const currentDragState = dragStateRef.current;

			if (!currentDragState || event.pointerId !== currentDragState.pointerId) {
				return;
			}

			event.preventDefault();

			const nextTargetId = getTargetIdAtPoint(event.clientX, event.clientY);
			const movedDistance = Math.hypot(
				event.clientX - currentDragState.startX,
				event.clientY - currentDragState.startY
			);

			setDragState({
				...currentDragState,
				x: event.clientX,
				y: event.clientY,
				hasMoved: currentDragState.hasMoved || movedDistance > DRAG_THRESHOLD_PX,
				overTargetId: nextTargetId
			});
		};

		const handlePointerUp = (event) => {
			const currentDragState = dragStateRef.current;

			if (!currentDragState || event.pointerId !== currentDragState.pointerId) {
				return;
			}

			event.preventDefault();

			const targetId = getTargetIdAtPoint(event.clientX, event.clientY);
			const isOverTermsList = getIsTermsListAtPoint(event.clientX, event.clientY);

			if (targetId && currentDragState.hasMoved) {
				callbacksRef.current.onCardDrop(targetId, currentDragState.card.id);
				clearSelectedCard(currentDragState.selectedCardIdAtStart);
			} else if (isOverTermsList && currentDragState.hasMoved && currentDragState.sourceTargetId) {
				callbacksRef.current.onClearTarget(currentDragState.sourceTargetId);
			} else if (!currentDragState.hasMoved) {
				callbacksRef.current.onCardSelect(currentDragState.card.id);
			}

			setDragState(null);
		};

		const handlePointerCancel = (event) => {
			const currentDragState = dragStateRef.current;

			if (!currentDragState || event.pointerId !== currentDragState.pointerId) {
				return;
			}

			setDragState(null);
		};

		window.addEventListener("pointermove", handlePointerMove, { passive: false });
		window.addEventListener("pointerup", handlePointerUp, { passive: false });
		window.addEventListener("pointercancel", handlePointerCancel);

		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("pointerup", handlePointerUp);
			window.removeEventListener("pointercancel", handlePointerCancel);
		};
	}, [dragState?.pointerId]);

	const startCardDrag = (card, sourceTargetId = null) => {
		return (event) => {
			if (event.button !== undefined && event.button !== 0) {
				return;
			}

			if (event.isPrimary === false) {
				return;
			}

			const cardRect = event.currentTarget.getBoundingClientRect();

			event.currentTarget.setPointerCapture?.(event.pointerId);
			event.preventDefault();

			setDragState({
				card,
				pointerId: event.pointerId,
				startX: event.clientX,
				startY: event.clientY,
				x: event.clientX,
				y: event.clientY,
				offsetX: event.clientX - cardRect.left,
				offsetY: event.clientY - cardRect.top,
				width: cardRect.width,
				height: cardRect.height,
				sourceTargetId,
				selectedCardIdAtStart: props.selectedCardId,
				hasMoved: false,
				overTargetId: null
			});
		};
	};


	const clearSelectedCard = (selectedCardIdAtStart) => {
		if (!selectedCardIdAtStart) {
			return;
		}

		callbacksRef.current.onCardSelect(selectedCardIdAtStart);
	};

	return (
		<section className="table-match-mobile-board" aria-label={props.t.dragDropCardBankTitle}>
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
							onPointerDown={startCardDrag(card)}
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

			{dragState?.hasMoved ? (
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
				</div>
			) : null}
		</section>
	);
}

const getTargetIdAtPoint = (clientX, clientY) => {
	const elementBelowPointer = document.elementFromPoint(clientX, clientY);
	const targetElement = elementBelowPointer?.closest("[data-table-match-mobile-target-id]");

	return targetElement?.dataset.tableMatchMobileTargetId ?? null;
};

const getIsTermsListAtPoint = (clientX, clientY) => {
	const elementBelowPointer = document.elementFromPoint(clientX, clientY);

	return Boolean(elementBelowPointer?.closest("[data-table-match-mobile-terms-list]"));
};

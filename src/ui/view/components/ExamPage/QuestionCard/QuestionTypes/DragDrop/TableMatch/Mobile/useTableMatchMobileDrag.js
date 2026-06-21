// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Mobile/useTableMatchMobileDrag.js
import { useEffect, useRef, useState } from "react";

const DRAG_THRESHOLD_PX = 6;
const EDGE_ZONE_PX = 76;
const MAX_AUTO_SCROLL_SPEED_PX = 16;

export default function useTableMatchMobileDrag(params) {
	const { onCardDrop, onCardSelect, onClearTarget, selectedCardId } = params;
	const [dragState, setDragState] = useState(null);
	const dragStateRef = useRef(null);
	const boardRef = useRef(null);
	const scrollContainerRef = useRef(null);
	const callbacksRef = useRef({ onCardDrop, onCardSelect, onClearTarget, selectedCardId });

	useEffect(() => {
		dragStateRef.current = dragState;
	}, [dragState]);

	useEffect(() => {
		callbacksRef.current = { onCardDrop, onCardSelect, onClearTarget, selectedCardId };
	}, [onCardDrop, onCardSelect, onClearTarget, selectedCardId]);

	useEffect(() => {
		if (!dragState?.pointerId) {
			return undefined;
		}

		let autoScrollFrameId = null;

		const handlePointerMove = (event) => {
			const currentDragState = dragStateRef.current;

			if (!currentDragState || event.pointerId !== currentDragState.pointerId) {
				return;
			}

			event.preventDefault();

			const movedDistance = Math.hypot(
				event.clientX - currentDragState.startX,
				event.clientY - currentDragState.startY
			);

			setDragState({
				...currentDragState,
				x: event.clientX,
				y: event.clientY,
				hasMoved: currentDragState.hasMoved || movedDistance > DRAG_THRESHOLD_PX,
				overTargetId: getTargetIdAtPoint(event.clientX, event.clientY)
			});
		};

		const handlePointerUp = (event) => {
			const currentDragState = dragStateRef.current;

			if (!currentDragState || event.pointerId !== currentDragState.pointerId) {
				return;
			}

			event.preventDefault();
			completeDrag(currentDragState, callbacksRef.current, event.clientX, event.clientY);
			setDragState(null);
		};

		const handlePointerCancel = (event) => {
			const currentDragState = dragStateRef.current;

			if (!currentDragState || event.pointerId !== currentDragState.pointerId) {
				return;
			}

			setDragState(null);
		};

		const runAutoScroll = () => {
			const currentDragState = dragStateRef.current;
			const scrollContainer = scrollContainerRef.current;

			if (currentDragState?.hasMoved && scrollContainer) {
				const containerRect = scrollContainer.getBoundingClientRect();
				const scrollDelta = computeAutoScrollDelta(
					currentDragState.y - containerRect.top,
					containerRect.bottom - currentDragState.y
				);

				if (scrollDelta !== 0) {
					scrollContainer.scrollTop += scrollDelta;

					const latestDragState = dragStateRef.current;
					const nextTargetId = getTargetIdAtPoint(currentDragState.x, currentDragState.y);

					if (latestDragState && nextTargetId !== latestDragState.overTargetId) {
						setDragState({
							...latestDragState,
							overTargetId: nextTargetId
						});
					}
				}
			}

			autoScrollFrameId = window.requestAnimationFrame(runAutoScroll);
		};

		window.addEventListener("pointermove", handlePointerMove, { passive: false });
		window.addEventListener("pointerup", handlePointerUp, { passive: false });
		window.addEventListener("pointercancel", handlePointerCancel);
		autoScrollFrameId = window.requestAnimationFrame(runAutoScroll);

		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("pointerup", handlePointerUp);
			window.removeEventListener("pointercancel", handlePointerCancel);
			window.cancelAnimationFrame(autoScrollFrameId);
		};
	}, [dragState?.pointerId]);

	const startCardDrag = (card, sourceTargetId) => {
		return (event) => {
			if (event.button !== undefined && event.button !== 0) {
				return;
			}

			if (event.isPrimary === false) {
				return;
			}

			const cardRect = event.currentTarget.getBoundingClientRect();

			scrollContainerRef.current = findScrollableAncestor(boardRef.current);
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
				selectedCardIdAtStart: callbacksRef.current.selectedCardId,
				hasMoved: false,
				overTargetId: null
			});
		};
	};

	return {
		dragState,
		boardRef,
		startCardDrag
	};
}

const completeDrag = (dragState, callbacks, clientX, clientY) => {
	const targetId = getTargetIdAtPoint(clientX, clientY);
	const isOverTermsList = getIsTermsListAtPoint(clientX, clientY);

	if (targetId && dragState.hasMoved) {
		callbacks.onCardDrop(targetId, dragState.card.id);
		clearSelectedCard(callbacks, dragState.selectedCardIdAtStart);
		return;
	}

	if (isOverTermsList && dragState.hasMoved && dragState.sourceTargetId) {
		callbacks.onClearTarget(dragState.sourceTargetId);
		clearSelectedCard(callbacks, dragState.selectedCardIdAtStart);
		return;
	}

	if (!dragState.hasMoved) {
		callbacks.onCardSelect(dragState.card.id);
	}
};

const clearSelectedCard = (callbacks, selectedCardIdAtStart) => {
	if (!selectedCardIdAtStart) {
		return;
	}

	callbacks.onCardSelect(selectedCardIdAtStart);
};

const computeAutoScrollDelta = (distanceFromTop, distanceFromBottom) => {
	if (distanceFromTop < EDGE_ZONE_PX) {
		const depth = EDGE_ZONE_PX - Math.max(distanceFromTop, 0);
		return -Math.min(MAX_AUTO_SCROLL_SPEED_PX, (depth / EDGE_ZONE_PX) * MAX_AUTO_SCROLL_SPEED_PX);
	}

	if (distanceFromBottom < EDGE_ZONE_PX) {
		const depth = EDGE_ZONE_PX - Math.max(distanceFromBottom, 0);
		return Math.min(MAX_AUTO_SCROLL_SPEED_PX, (depth / EDGE_ZONE_PX) * MAX_AUTO_SCROLL_SPEED_PX);
	}

	return 0;
};

const findScrollableAncestor = (element) => {
	let current = element?.parentElement ?? null;

	while (current) {
		const computedStyle = window.getComputedStyle(current);
		const isScrollable = computedStyle.overflowY === "auto" || computedStyle.overflowY === "scroll";

		if (isScrollable && current.scrollHeight > current.clientHeight) {
			return current;
		}

		current = current.parentElement;
	}

	return null;
};

const getTargetIdAtPoint = (clientX, clientY) => {
	const elementBelowPointer = document.elementFromPoint(clientX, clientY);
	const targetElement = elementBelowPointer?.closest("[data-table-match-mobile-target-id]");

	return targetElement?.dataset.tableMatchMobileTargetId ?? null;
};

const getIsTermsListAtPoint = (clientX, clientY) => {
	const elementBelowPointer = document.elementFromPoint(clientX, clientY);

	return Boolean(elementBelowPointer?.closest("[data-table-match-mobile-terms-list]"));
};

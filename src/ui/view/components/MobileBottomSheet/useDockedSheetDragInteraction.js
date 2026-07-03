// src/ui/view/components/MobileBottomSheet/useDockedSheetDragInteraction.js
import { useCallback, useRef, useState } from "react";

// Lokal interaksjonshook for det dokkede bunnarket. Pointer-drag på gripen
// oversettes til en vertikal offset mens brukeren drar, og åpne/lukke-
// beslutningen bobler opp via onOpenChange. Hooken eier kun visuell
// interaksjonsstate og opererer bare på verdier den mottar som parametere.

const DRAG_ACTIVATION_DISTANCE_PX = 6;
const DRAG_TOGGLE_THRESHOLD_PX = 72;

export default function useDockedSheetDragInteraction(isOpen, onOpenChange) {
	const dragStartClientYRef = useRef(null);
	const didDragRef = useRef(false);
	const [dragOffsetY, setDragOffsetY] = useState(0);
	const [isDragging, setIsDragging] = useState(false);

	const startGripDrag = useCallback((pointerEvent) => {
		if (!pointerEvent.isPrimary) {
			return;
		}

		dragStartClientYRef.current = pointerEvent.clientY;
		didDragRef.current = false;
		pointerEvent.currentTarget.setPointerCapture(pointerEvent.pointerId);
	}, []);

	const moveGripDrag = useCallback((pointerEvent) => {
		if (dragStartClientYRef.current === null) {
			return;
		}

		const deltaY = pointerEvent.clientY - dragStartClientYRef.current;

		if (!didDragRef.current && Math.abs(deltaY) < DRAG_ACTIVATION_DISTANCE_PX) {
			return;
		}

		didDragRef.current = true;
		setIsDragging(true);

		if (isOpen) {
			setDragOffsetY(Math.max(deltaY, 0));
			return;
		}

		setDragOffsetY(Math.min(deltaY, 0));
	}, [isOpen]);

	const endGripDrag = useCallback((pointerEvent) => {
		if (dragStartClientYRef.current === null) {
			return;
		}

		const deltaY = pointerEvent.clientY - dragStartClientYRef.current;
		dragStartClientYRef.current = null;
		setIsDragging(false);
		setDragOffsetY(0);

		if (!didDragRef.current) {
			return;
		}

		if (isOpen && deltaY > DRAG_TOGGLE_THRESHOLD_PX) {
			onOpenChange(false);
			return;
		}

		if (!isOpen && deltaY < -DRAG_TOGGLE_THRESHOLD_PX) {
			onOpenChange(true);
		}
	}, [isOpen, onOpenChange]);

	const cancelGripDrag = useCallback(() => {
		dragStartClientYRef.current = null;
		didDragRef.current = false;
		setIsDragging(false);
		setDragOffsetY(0);
	}, []);

	const consumeDidDrag = useCallback(() => {
		const didDrag = didDragRef.current;
		didDragRef.current = false;

		return didDrag;
	}, []);

	return {
		dragOffsetY,
		isDragging,
		startGripDrag,
		moveGripDrag,
		endGripDrag,
		cancelGripDrag,
		consumeDidDrag
	};
}

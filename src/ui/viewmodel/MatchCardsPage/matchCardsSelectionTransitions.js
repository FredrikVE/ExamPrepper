// src/ui/viewmodel/MatchCardsPage/matchCardsSelectionTransitions.js
import { MATCH_SLOT_STATUS } from "./matchCardsConstants.js";

export function isMatchingPair(firstSlot, secondSlot) {
	if (firstSlot.column === secondSlot.column) {
		return false;
	}

	return firstSlot.glossaryEntryKey === secondSlot.glossaryEntryKey;
}

export function selectMatchSlot(session, slotId) {
	const selectedSlot = findSlotById(session.slots, slotId);

	if (!selectedSlot || !canSelectSlot(selectedSlot)) {
		return session;
	}

	if (!session.selectedSlotId) {
		return selectFirstSlot(session, slotId);
	}

	if (session.selectedSlotId === slotId) {
		return session;
	}

	const previousSlot = findSlotById(session.slots, session.selectedSlotId);

	if (!previousSlot || isMatchedOrEmptySlot(previousSlot)) {
		return selectFirstSlot(session, slotId);
	}

	if (previousSlot.column === selectedSlot.column) {
		return moveSelection(session, previousSlot.slotId, slotId);
	}

	if (isMatchingPair(previousSlot, selectedSlot)) {
		return markPair(session, previousSlot.slotId, slotId, MATCH_SLOT_STATUS.SUCCESS);
	}

	return markPair(session, previousSlot.slotId, slotId, MATCH_SLOT_STATUS.WRONG);
}

const findSlotById = (slots, slotId) => {
	for (const slot of slots) {
		if (slot.slotId === slotId) {
			return slot;
		}
	}

	return null;
};

const canSelectSlot = (slot) => (
	slot.status === MATCH_SLOT_STATUS.IDLE || slot.status === MATCH_SLOT_STATUS.SELECTED
);

const isMatchedOrEmptySlot = (slot) => (
	slot.status === MATCH_SLOT_STATUS.SUCCESS
	|| slot.status === MATCH_SLOT_STATUS.FADING_OUT
	|| slot.status === MATCH_SLOT_STATUS.EMPTY
);

const selectFirstSlot = (session, slotId) => ({
	...session,
	selectedSlotId: slotId,
	slots: updateSlotStatuses(session.slots, [slotId], MATCH_SLOT_STATUS.SELECTED)
});

const moveSelection = (session, previousSlotId, nextSlotId) => ({
	...session,
	selectedSlotId: nextSlotId,
	slots: moveSelectedSlot(session.slots, previousSlotId, nextSlotId)
});

const markPair = (session, firstSlotId, secondSlotId, status) => ({
	...session,
	selectedSlotId: null,
	slots: updateSlotStatuses(session.slots, [firstSlotId, secondSlotId], status)
});

const updateSlotStatuses = (slots, slotIds, status) => {
	const updatedSlots = [];

	for (const slot of slots) {
		updatedSlots.push(slotIds.includes(slot.slotId)
			? { ...slot, status }
			: slot);
	}

	return updatedSlots;
};

const moveSelectedSlot = (slots, previousSlotId, nextSlotId) => {
	const updatedSlots = [];

	for (const slot of slots) {
		if (slot.slotId === previousSlotId) {
			updatedSlots.push({ ...slot, status: MATCH_SLOT_STATUS.IDLE });
		} else if (slot.slotId === nextSlotId) {
			updatedSlots.push({ ...slot, status: MATCH_SLOT_STATUS.SELECTED });
		} else {
			updatedSlots.push(slot);
		}
	}

	return updatedSlots;
};

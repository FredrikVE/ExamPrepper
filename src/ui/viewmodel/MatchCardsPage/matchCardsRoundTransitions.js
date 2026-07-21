// src/ui/viewmodel/MatchCardsPage/matchCardsRoundTransitions.js
import { MATCH_CARD_COLUMN, MATCH_SLOT_STATUS } from "./matchCardsConstants.js";

export function resetWrongSlots(session) {
	return updateSessionSlotStatus(session, MATCH_SLOT_STATUS.WRONG, MATCH_SLOT_STATUS.IDLE);
}

export function markSuccessfulSlotsForFadeOut(session) {
	return updateSessionSlotStatus(session, MATCH_SLOT_STATUS.SUCCESS, MATCH_SLOT_STATUS.FADING_OUT);
}

export function advanceMatchedPair(session) {
	const replacementPair = session.queuedPairs[0] ?? null;
	const remainingQueuedPairs = session.queuedPairs.slice(1);
	const slots = [];
	let didAdvancePair = false;

	for (const slot of session.slots) {
		if (!isReplaceableMatchedSlot(slot)) {
			slots.push(slot);
			continue;
		}

		didAdvancePair = true;
		slots.push(replacementPair
			? createReplacementSlot(slot, replacementPair)
			: createEmptySlot(slot));
	}

	if (!didAdvancePair) {
		return session;
	}

	const matchedPairCount = session.matchedPairCount + 1;

	return {
		...session,
		matchedPairCount,
		selectedSlotId: null,
		isRoundComplete: matchedPairCount >= session.roundPairCount,
		queuedPairs: remainingQueuedPairs,
		slots
	};
}

export function settleFadingInSlots(session) {
	return updateSessionSlotStatus(session, MATCH_SLOT_STATUS.FADING_IN, MATCH_SLOT_STATUS.IDLE);
}

const isReplaceableMatchedSlot = (slot) => (
	slot.status === MATCH_SLOT_STATUS.SUCCESS || slot.status === MATCH_SLOT_STATUS.FADING_OUT
);

const createReplacementSlot = (slot, pair) => ({
	slotId: slot.slotId,
	column: slot.column,
	glossaryEntryKey: pair.glossaryEntryKey,
	textByLanguage: slot.column === MATCH_CARD_COLUMN.TERM
		? pair.termTextByLanguage
		: pair.explanationTextByLanguage,
	status: MATCH_SLOT_STATUS.FADING_IN
});

const createEmptySlot = (slot) => ({
	slotId: slot.slotId,
	column: slot.column,
	glossaryEntryKey: null,
	textByLanguage: null,
	status: MATCH_SLOT_STATUS.EMPTY
});

const updateSessionSlotStatus = (session, currentStatus, nextStatus) => {
	const slots = [];

	for (const slot of session.slots) {
		slots.push(slot.status === currentStatus
			? { ...slot, status: nextStatus }
			: slot);
	}

	return {
		...session,
		slots
	};
};

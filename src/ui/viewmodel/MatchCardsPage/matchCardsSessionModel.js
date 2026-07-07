export const MATCH_CARD_COLUMN = Object.freeze({
	TERM: "term",
	EXPLANATION: "explanation"
});

export const MATCH_SLOT_STATUS = Object.freeze({
	IDLE: "IDLE",
	SELECTED: "SELECTED",
	SUCCESS: "SUCCESS",
	WRONG: "WRONG",
	FADING_OUT: "FADING_OUT",
	FADING_IN: "FADING_IN",
	EMPTY: "EMPTY"
});

function createSlot({ slotId, column, conceptKey, textByLanguage, status }) {
	return {
		slotId,
		column,
		conceptKey,
		textByLanguage,
		status
	};
}

function createTextByLanguage(textByLanguage) {
	return {
		no: textByLanguage.no,
		en: textByLanguage.en
	};
}

function createPairFromConcept(concept) {
	return {
		conceptKey: concept.conceptKey,
		termTextByLanguage: createTextByLanguage(concept.term),
		explanationTextByLanguage: createTextByLanguage(concept.explanation)
	};
}

function createPairsFromConcepts({ concepts }) {
	const pairs = [];

	for (const concept of concepts) {
		pairs.push(createPairFromConcept(concept));
	}

	return pairs;
}

function copyPairsUntilCount({ pairs, count }) {
	const copiedPairs = [];
	const cappedCount = Math.min(count, pairs.length);

	for (let index = 0; index < cappedCount; index += 1) {
		copiedPairs.push(pairs[index]);
	}

	return copiedPairs;
}

function copyPairsFromIndex({ pairs, startIndex }) {
	const copiedPairs = [];

	for (let index = startIndex; index < pairs.length; index += 1) {
		copiedPairs.push(pairs[index]);
	}

	return copiedPairs;
}

function createTermSlotContent(pair) {
	return {
		conceptKey: pair.conceptKey,
		textByLanguage: pair.termTextByLanguage
	};
}

function createExplanationSlotContent(pair) {
	return {
		conceptKey: pair.conceptKey,
		textByLanguage: pair.explanationTextByLanguage
	};
}

function createSlotContents({ activePairs, createContent }) {
	const contents = [];

	for (const pair of activePairs) {
		contents.push(createContent(pair));
	}

	return contents;
}

function createColumnSlots({ column, contents }) {
	const slots = [];

	for (let index = 0; index < contents.length; index += 1) {
		const content = contents[index];

		slots.push(createSlot({
			slotId: `${column}-${index}`,
			column,
			conceptKey: content.conceptKey,
			textByLanguage: content.textByLanguage,
			status: MATCH_SLOT_STATUS.IDLE
		}));
	}

	return slots;
}

function createSlotsForActivePairs({ activePairs, randomNumber }) {
	const termContents = createSlotContents({
		activePairs,
		createContent: createTermSlotContent
	});
	const explanationContents = createSlotContents({
		activePairs,
		createContent: createExplanationSlotContent
	});

	shuffleInPlace({
		items: termContents,
		randomNumber
	});
	shuffleInPlace({
		items: explanationContents,
		randomNumber
	});

	return [
		...createColumnSlots({
			column: MATCH_CARD_COLUMN.TERM,
			contents: termContents
		}),
		...createColumnSlots({
			column: MATCH_CARD_COLUMN.EXPLANATION,
			contents: explanationContents
		})
	];
}

function findSlotById({ slots, slotId }) {
	for (const slot of slots) {
		if (slot.slotId === slotId) {
			return slot;
		}
	}

	return null;
}

function canSelectSlot(slot) {
	return slot.status === MATCH_SLOT_STATUS.IDLE || slot.status === MATCH_SLOT_STATUS.SELECTED;
}

function updateSlotStatus({ slots, slotIds, status }) {
	const updatedSlots = [];

	for (const slot of slots) {
		if (slotIds.includes(slot.slotId)) {
			updatedSlots.push({
				...slot,
				status
			});
		} else {
			updatedSlots.push(slot);
		}
	}

	return updatedSlots;
}

function moveSelectedSlot({ slots, previousSlotId, nextSlotId }) {
	const updatedSlots = [];

	for (const slot of slots) {
		if (slot.slotId === previousSlotId) {
			updatedSlots.push({
				...slot,
				status: MATCH_SLOT_STATUS.IDLE
			});
		} else if (slot.slotId === nextSlotId) {
			updatedSlots.push({
				...slot,
				status: MATCH_SLOT_STATUS.SELECTED
			});
		} else {
			updatedSlots.push(slot);
		}
	}

	return updatedSlots;
}

function isMatchedOrEmptySlot(slot) {
	return slot.status === MATCH_SLOT_STATUS.SUCCESS
		|| slot.status === MATCH_SLOT_STATUS.FADING_OUT
		|| slot.status === MATCH_SLOT_STATUS.EMPTY;
}

function createReplacementSlot({ slot, pair }) {
	if (slot.column === MATCH_CARD_COLUMN.TERM) {
		return createSlot({
			slotId: slot.slotId,
			column: slot.column,
			conceptKey: pair.conceptKey,
			textByLanguage: pair.termTextByLanguage,
			status: MATCH_SLOT_STATUS.FADING_IN
		});
	}

	return createSlot({
		slotId: slot.slotId,
		column: slot.column,
		conceptKey: pair.conceptKey,
		textByLanguage: pair.explanationTextByLanguage,
		status: MATCH_SLOT_STATUS.FADING_IN
	});
}

function createEmptySlot(slot) {
	return createSlot({
		slotId: slot.slotId,
		column: slot.column,
		conceptKey: null,
		textByLanguage: null,
		status: MATCH_SLOT_STATUS.EMPTY
	});
}

function isReplaceableMatchedSlot(slot) {
	return slot.status === MATCH_SLOT_STATUS.SUCCESS || slot.status === MATCH_SLOT_STATUS.FADING_OUT;
}

function createReplacementModel({ queuedPairs }) {
	const replacementPair = queuedPairs[0] ?? null;
	const remainingQueuedPairs = [];

	for (let index = 1; index < queuedPairs.length; index += 1) {
		remainingQueuedPairs.push(queuedPairs[index]);
	}

	return {
		replacementPair,
		remainingQueuedPairs
	};
}

export function canStartMatchCardsSession({ concepts }) {
	return concepts.length >= 2;
}

export function shuffleInPlace({ items, randomNumber }) {
	for (let index = items.length - 1; index > 0; index -= 1) {
		const swapIndex = Math.floor(randomNumber() * (index + 1));
		const currentItem = items[index];

		items[index] = items[swapIndex];
		items[swapIndex] = currentItem;
	}

	return items;
}

export function isMatchingPair(firstSlot, secondSlot) {
	if (firstSlot.column === secondSlot.column) {
		return false;
	}

	return firstSlot.conceptKey === secondSlot.conceptKey;
}

export function createMatchCardsSession({
	concepts,
	roundPairCount,
	visiblePairCount,
	randomNumber
}) {
	const pairs = createPairsFromConcepts({
		concepts
	});

	shuffleInPlace({
		items: pairs,
		randomNumber
	});

	const actualRoundPairCount = Math.min(roundPairCount, pairs.length);
	const roundPairs = copyPairsUntilCount({
		pairs,
		count: actualRoundPairCount
	});
	const actualVisiblePairCount = Math.min(visiblePairCount, roundPairs.length);
	const activePairs = copyPairsUntilCount({
		pairs: roundPairs,
		count: actualVisiblePairCount
	});
	const queuedPairs = copyPairsFromIndex({
		pairs: roundPairs,
		startIndex: actualVisiblePairCount
	});

	return {
		roundPairCount: actualRoundPairCount,
		visiblePairCount: actualVisiblePairCount,
		matchedPairCount: 0,
		selectedSlotId: null,
		isRoundComplete: actualRoundPairCount === 0,
		queuedPairs,
		slots: createSlotsForActivePairs({
			activePairs,
			randomNumber
		})
	};
}

export function selectMatchSlot({ session, slotId }) {
	const selectedSlot = findSlotById({
		slots: session.slots,
		slotId
	});

	if (!selectedSlot || !canSelectSlot(selectedSlot)) {
		return session;
	}

	if (!session.selectedSlotId) {
		return {
			...session,
			selectedSlotId: slotId,
			slots: updateSlotStatus({
				slots: session.slots,
				slotIds: [slotId],
				status: MATCH_SLOT_STATUS.SELECTED
			})
		};
	}

	if (session.selectedSlotId === slotId) {
		return session;
	}

	const previousSlot = findSlotById({
		slots: session.slots,
		slotId: session.selectedSlotId
	});

	if (!previousSlot || isMatchedOrEmptySlot(previousSlot)) {
		return {
			...session,
			selectedSlotId: slotId,
			slots: updateSlotStatus({
				slots: session.slots,
				slotIds: [slotId],
				status: MATCH_SLOT_STATUS.SELECTED
			})
		};
	}

	if (previousSlot.column === selectedSlot.column) {
		return {
			...session,
			selectedSlotId: slotId,
			slots: moveSelectedSlot({
				slots: session.slots,
				previousSlotId: previousSlot.slotId,
				nextSlotId: slotId
			})
		};
	}

	if (isMatchingPair(previousSlot, selectedSlot)) {
		return {
			...session,
			selectedSlotId: null,
			slots: updateSlotStatus({
				slots: session.slots,
				slotIds: [previousSlot.slotId, selectedSlot.slotId],
				status: MATCH_SLOT_STATUS.SUCCESS
			})
		};
	}

	return {
		...session,
		selectedSlotId: null,
		slots: updateSlotStatus({
			slots: session.slots,
			slotIds: [previousSlot.slotId, selectedSlot.slotId],
			status: MATCH_SLOT_STATUS.WRONG
		})
	};
}

export function resetWrongSlots({ session }) {
	const slots = [];

	for (const slot of session.slots) {
		if (slot.status === MATCH_SLOT_STATUS.WRONG) {
			slots.push({
				...slot,
				status: MATCH_SLOT_STATUS.IDLE
			});
		} else {
			slots.push(slot);
		}
	}

	return {
		...session,
		slots
	};
}

export function markSuccessfulSlotsForFadeOut({ session }) {
	const slots = [];

	for (const slot of session.slots) {
		if (slot.status === MATCH_SLOT_STATUS.SUCCESS) {
			slots.push({
				...slot,
				status: MATCH_SLOT_STATUS.FADING_OUT
			});
		} else {
			slots.push(slot);
		}
	}

	return {
		...session,
		slots
	};
}

export function advanceMatchedPair({ session }) {
	const replacementModel = createReplacementModel({
		queuedPairs: session.queuedPairs
	});
	const slots = [];
	let didAdvancePair = false;

	for (const slot of session.slots) {
		if (!isReplaceableMatchedSlot(slot)) {
			slots.push(slot);
			continue;
		}

		didAdvancePair = true;

		if (replacementModel.replacementPair) {
			slots.push(createReplacementSlot({
				slot,
				pair: replacementModel.replacementPair
			}));
		} else {
			slots.push(createEmptySlot(slot));
		}
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
		queuedPairs: replacementModel.remainingQueuedPairs,
		slots
	};
}

export function settleFadingInSlots({ session }) {
	const slots = [];

	for (const slot of session.slots) {
		if (slot.status === MATCH_SLOT_STATUS.FADING_IN) {
			slots.push({
				...slot,
				status: MATCH_SLOT_STATUS.IDLE
			});
		} else {
			slots.push(slot);
		}
	}

	return {
		...session,
		slots
	};
}

// src/ui/viewmodel/MatchCardsPage/matchCardsSession.js
import { createPairsFromGlossaryEntries } from "./matchCardsPairModel.js";
import { createIdleSlotsForPairs } from "./matchCardsSlots.js";
import { shuffleInPlace } from "./shuffleInPlace.js";

export function canStartMatchCardsSession(glossaryEntries) {
	return glossaryEntries.length >= 2;
}

export function createMatchCardsSession({
	glossaryEntries,
	roundPairCount,
	visiblePairCount,
	randomNumber
}) {
	const pairs = createPairsFromGlossaryEntries(glossaryEntries);
	shuffleInPlace(pairs, randomNumber);

	const actualRoundPairCount = Math.min(roundPairCount, pairs.length);
	const roundPairs = pairs.slice(0, actualRoundPairCount);
	const actualVisiblePairCount = Math.min(visiblePairCount, roundPairs.length);
	const activePairs = roundPairs.slice(0, actualVisiblePairCount);
	const queuedPairs = roundPairs.slice(actualVisiblePairCount);

	return {
		roundPairCount: actualRoundPairCount,
		visiblePairCount: actualVisiblePairCount,
		matchedPairCount: 0,
		selectedSlotId: null,
		isRoundComplete: actualRoundPairCount === 0,
		queuedPairs,
		slots: createIdleSlotsForPairs(activePairs, randomNumber)
	};
}

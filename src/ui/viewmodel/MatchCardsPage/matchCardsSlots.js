// src/ui/viewmodel/MatchCardsPage/matchCardsSlots.js
import { MATCH_CARD_COLUMN, MATCH_SLOT_STATUS } from "./matchCardsConstants.js";
import { shuffleInPlace } from "./shuffleInPlace.js";

export function createIdleSlotsForPairs(activePairs, randomNumber) {
	const termContents = [];
	const explanationContents = [];

	for (const pair of activePairs) {
		termContents.push({
			glossaryEntryKey: pair.glossaryEntryKey,
			textByLanguage: pair.termTextByLanguage
		});
		explanationContents.push({
			glossaryEntryKey: pair.glossaryEntryKey,
			textByLanguage: pair.explanationTextByLanguage
		});
	}

	shuffleInPlace(termContents, randomNumber);
	shuffleInPlace(explanationContents, randomNumber);

	return [
		...createColumnSlots(MATCH_CARD_COLUMN.TERM, termContents),
		...createColumnSlots(MATCH_CARD_COLUMN.EXPLANATION, explanationContents)
	];
}

const createColumnSlots = (column, contents) => {
	const slots = [];

	for (let index = 0; index < contents.length; index += 1) {
		const content = contents[index];

		slots.push({
			slotId: `${column}-${index}`,
			column,
			glossaryEntryKey: content.glossaryEntryKey,
			textByLanguage: content.textByLanguage,
			status: MATCH_SLOT_STATUS.IDLE
		});
	}

	return slots;
};

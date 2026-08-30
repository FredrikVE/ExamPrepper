// src/ui/viewmodel/MatchCardsPage/matchCardsResultModel.js
import { MATCH_SLOT_STATUS } from "./matchCardsConstants.js";

export function createSuccessfulMatchResult(session) {
	const glossaryEntryKey = findSuccessfulGlossaryEntryKey(session.slots);

	if (glossaryEntryKey === null) {
		return null;
	}

	return {
		glossaryEntryKey,
		wrongAttemptCount: readWrongAttemptCount(session.wrongAttemptCounts, glossaryEntryKey)
	};
}

function findSuccessfulGlossaryEntryKey(slots) {
	for (const slot of slots) {
		if (slot.status === MATCH_SLOT_STATUS.SUCCESS && slot.glossaryEntryKey !== null) {
			return slot.glossaryEntryKey;
		}
	}

	return null;
}

function readWrongAttemptCount(wrongAttemptCounts, glossaryEntryKey) {
	const result = wrongAttemptCounts.find((item) => item.glossaryEntryKey === glossaryEntryKey);

	return result?.wrongAttemptCount ?? 0;
}

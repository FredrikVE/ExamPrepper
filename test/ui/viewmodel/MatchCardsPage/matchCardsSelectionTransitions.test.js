// test/ui/viewmodel/MatchCardsPage/matchCardsSelectionTransitions.test.js
import { describe, expect, test } from "@jest/globals";
import { MATCH_CARD_COLUMN, MATCH_SLOT_STATUS } from "../../../../src/ui/viewmodel/MatchCardsPage/matchCardsConstants.js";
import { createMatchCardsSession } from "../../../../src/ui/viewmodel/MatchCardsPage/matchCardsSession.js";
import { isMatchingPair, selectMatchSlot } from "../../../../src/ui/viewmodel/MatchCardsPage/matchCardsSelectionTransitions.js";
import { createGlossaryEntries, findSlot, keepOrderRandomNumber } from "./matchCardsTestFixtures.js";

describe("matchCardsSelectionTransitions", () => {
	test("matches only slots in opposite columns with the same glossaryEntry key", () => {
		const termSlot = {
			column: MATCH_CARD_COLUMN.TERM,
			glossaryEntryKey: "entry-a"
		};
		const matchingExplanationSlot = {
			column: MATCH_CARD_COLUMN.EXPLANATION,
			glossaryEntryKey: "entry-a"
		};
		const wrongExplanationSlot = {
			column: MATCH_CARD_COLUMN.EXPLANATION,
			glossaryEntryKey: "entry-b"
		};
		const sameColumnSlot = {
			column: MATCH_CARD_COLUMN.TERM,
			glossaryEntryKey: "entry-a"
		};

		expect(isMatchingPair(termSlot, matchingExplanationSlot)).toBe(true);
		expect(isMatchingPair(termSlot, wrongExplanationSlot)).toBe(false);
		expect(isMatchingPair(termSlot, sameColumnSlot)).toBe(false);
	});

	test("moves selection when the next selected slot is in the same column", () => {
		const session = createTestSession();
		const firstSelection = selectMatchSlot(session, "term-0");
		const secondSelection = selectMatchSlot(firstSelection, "term-1");

		expect(secondSelection.selectedSlotId).toBe("term-1");
		expect(findSlot(secondSelection.slots, "term-0").status).toBe(MATCH_SLOT_STATUS.IDLE);
		expect(findSlot(secondSelection.slots, "term-1").status).toBe(MATCH_SLOT_STATUS.SELECTED);
	});

	test("marks a wrong pair", () => {
		const session = createTestSession();
		const firstSelection = selectMatchSlot(session, "term-0");
		const wrongSelection = selectMatchSlot(firstSelection, "explanation-1");

		expect(wrongSelection.selectedSlotId).toBe(null);
		expect(findSlot(wrongSelection.slots, "term-0").status).toBe(MATCH_SLOT_STATUS.WRONG);
		expect(findSlot(wrongSelection.slots, "explanation-1").status).toBe(MATCH_SLOT_STATUS.WRONG);
	});

	test("marks a matching pair as success", () => {
		const session = createTestSession();
		const firstSelection = selectMatchSlot(session, "term-0");
		const successSelection = selectMatchSlot(firstSelection, "explanation-0");

		expect(successSelection.selectedSlotId).toBe(null);
		expect(findSlot(successSelection.slots, "term-0").status).toBe(MATCH_SLOT_STATUS.SUCCESS);
		expect(findSlot(successSelection.slots, "explanation-0").status).toBe(MATCH_SLOT_STATUS.SUCCESS);
	});
});

const createTestSession = () => createMatchCardsSession({
	glossaryEntries: createGlossaryEntries(),
	roundPairCount: 3,
	visiblePairCount: 2,
	randomNumber: keepOrderRandomNumber
});

import { describe, expect, test } from "@jest/globals";
import {
	advanceMatchedPair,
	canStartMatchCardsSession,
	createMatchCardsSession,
	isMatchingPair,
	markSuccessfulSlotsForFadeOut,
	MATCH_CARD_COLUMN,
	MATCH_SLOT_STATUS,
	resetWrongSlots,
	selectMatchSlot,
	settleFadingInSlots,
	shuffleInPlace
} from "../../../../src/ui/viewmodel/MatchCardsPage/matchCardsSessionModel.js";

function keepOrderRandomNumber() {
	return 0.999;
}

function reverseRandomNumber() {
	return 0;
}

function createGlossaryEntry({ glossaryEntryKey, termNo, termEn, explanationNo, explanationEn }) {
	return {
		glossaryEntryKey,
		term: {
			no: termNo,
			en: termEn
		},
		explanation: {
			no: explanationNo,
			en: explanationEn
		}
	};
}

function createGlossaryEntries() {
	return [
		createGlossaryEntry({
			glossaryEntryKey: "entry-a",
			termNo: "Begrep A",
			termEn: "Term A",
			explanationNo: "Forklaring A",
			explanationEn: "Explanation A"
		}),
		createGlossaryEntry({
			glossaryEntryKey: "entry-b",
			termNo: "Begrep B",
			termEn: "Term B",
			explanationNo: "Forklaring B",
			explanationEn: "Explanation B"
		}),
		createGlossaryEntry({
			glossaryEntryKey: "entry-c",
			termNo: "Begrep C",
			termEn: "Term C",
			explanationNo: "Forklaring C",
			explanationEn: "Explanation C"
		}),
		createGlossaryEntry({
			glossaryEntryKey: "entry-d",
			termNo: "Begrep D",
			termEn: "Term D",
			explanationNo: "Forklaring D",
			explanationEn: "Explanation D"
		})
	];
}

function findSlot(slots, slotId) {
	for (const slot of slots) {
		if (slot.slotId === slotId) {
			return slot;
		}
	}

	return null;
}

function findSlotByColumnAndGlossaryEntry({ slots, column, glossaryEntryKey }) {
	for (const slot of slots) {
		if (slot.column === column && slot.glossaryEntryKey === glossaryEntryKey) {
			return slot;
		}
	}

	return null;
}

describe("matchCardsSessionModel", () => {
	test("requires at least two glossary entries before starting", () => {
		expect(canStartMatchCardsSession({
			glossaryEntries: []
		})).toBe(false);
		expect(canStartMatchCardsSession({
			glossaryEntries: [createGlossaryEntries()[0]]
		})).toBe(false);
		expect(canStartMatchCardsSession({
			glossaryEntries: createGlossaryEntries().slice(0, 2)
		})).toBe(true);
	});

	test("shuffles in place with Fisher-Yates", () => {
		const items = ["a", "b", "c"];

		expect(shuffleInPlace({
			items,
			randomNumber: reverseRandomNumber
		})).toEqual(["b", "c", "a"]);
		expect(items).toEqual(["b", "c", "a"]);
	});

	test("creates a language-agnostic round with active slots and queued pairs", () => {
		const session = createMatchCardsSession({
			glossaryEntries: createGlossaryEntries(),
			roundPairCount: 3,
			visiblePairCount: 2,
			randomNumber: keepOrderRandomNumber
		});

		expect(session.roundPairCount).toBe(3);
		expect(session.visiblePairCount).toBe(2);
		expect(session.queuedPairs).toEqual([
			{
				glossaryEntryKey: "entry-c",
				termTextByLanguage: {
					no: "Begrep C",
					en: "Term C"
				},
				explanationTextByLanguage: {
					no: "Forklaring C",
					en: "Explanation C"
				}
			}
		]);
		expect(session.slots).toEqual([
			{
				slotId: "term-0",
				column: MATCH_CARD_COLUMN.TERM,
				glossaryEntryKey: "entry-a",
				textByLanguage: {
					no: "Begrep A",
					en: "Term A"
				},
				status: MATCH_SLOT_STATUS.IDLE
			},
			{
				slotId: "term-1",
				column: MATCH_CARD_COLUMN.TERM,
				glossaryEntryKey: "entry-b",
				textByLanguage: {
					no: "Begrep B",
					en: "Term B"
				},
				status: MATCH_SLOT_STATUS.IDLE
			},
			{
				slotId: "explanation-0",
				column: MATCH_CARD_COLUMN.EXPLANATION,
				glossaryEntryKey: "entry-a",
				textByLanguage: {
					no: "Forklaring A",
					en: "Explanation A"
				},
				status: MATCH_SLOT_STATUS.IDLE
			},
			{
				slotId: "explanation-1",
				column: MATCH_CARD_COLUMN.EXPLANATION,
				glossaryEntryKey: "entry-b",
				textByLanguage: {
					no: "Forklaring B",
					en: "Explanation B"
				},
				status: MATCH_SLOT_STATUS.IDLE
			}
		]);
	});

	test("degrades round size when the glossaryEntry pool is smaller than requested", () => {
		const session = createMatchCardsSession({
			glossaryEntries: createGlossaryEntries().slice(0, 2),
			roundPairCount: 6,
			visiblePairCount: 4,
			randomNumber: keepOrderRandomNumber
		});

		expect(session.roundPairCount).toBe(2);
		expect(session.visiblePairCount).toBe(2);
		expect(session.queuedPairs).toEqual([]);
		expect(session.slots).toHaveLength(4);
	});

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
		const session = createMatchCardsSession({
			glossaryEntries: createGlossaryEntries(),
			roundPairCount: 3,
			visiblePairCount: 2,
			randomNumber: keepOrderRandomNumber
		});
		const firstSelection = selectMatchSlot({
			session,
			slotId: "term-0"
		});
		const secondSelection = selectMatchSlot({
			session: firstSelection,
			slotId: "term-1"
		});

		expect(secondSelection.selectedSlotId).toBe("term-1");
		expect(findSlot(secondSelection.slots, "term-0").status).toBe(MATCH_SLOT_STATUS.IDLE);
		expect(findSlot(secondSelection.slots, "term-1").status).toBe(MATCH_SLOT_STATUS.SELECTED);
	});

	test("marks a wrong pair and resets it to idle", () => {
		const session = createMatchCardsSession({
			glossaryEntries: createGlossaryEntries(),
			roundPairCount: 3,
			visiblePairCount: 2,
			randomNumber: keepOrderRandomNumber
		});
		const firstSelection = selectMatchSlot({
			session,
			slotId: "term-0"
		});
		const wrongSelection = selectMatchSlot({
			session: firstSelection,
			slotId: "explanation-1"
		});
		const resetSession = resetWrongSlots({
			session: wrongSelection
		});

		expect(wrongSelection.selectedSlotId).toBe(null);
		expect(findSlot(wrongSelection.slots, "term-0").status).toBe(MATCH_SLOT_STATUS.WRONG);
		expect(findSlot(wrongSelection.slots, "explanation-1").status).toBe(MATCH_SLOT_STATUS.WRONG);
		expect(findSlot(resetSession.slots, "term-0").status).toBe(MATCH_SLOT_STATUS.IDLE);
		expect(findSlot(resetSession.slots, "explanation-1").status).toBe(MATCH_SLOT_STATUS.IDLE);
	});

	test("marks a matching pair as success", () => {
		const session = createMatchCardsSession({
			glossaryEntries: createGlossaryEntries(),
			roundPairCount: 3,
			visiblePairCount: 2,
			randomNumber: keepOrderRandomNumber
		});
		const firstSelection = selectMatchSlot({
			session,
			slotId: "term-0"
		});
		const successSelection = selectMatchSlot({
			session: firstSelection,
			slotId: "explanation-0"
		});

		expect(successSelection.selectedSlotId).toBe(null);
		expect(findSlot(successSelection.slots, "term-0").status).toBe(MATCH_SLOT_STATUS.SUCCESS);
		expect(findSlot(successSelection.slots, "explanation-0").status).toBe(MATCH_SLOT_STATUS.SUCCESS);
	});

	test("replaces a matched pair from the queue and settles fading slots", () => {
		const session = createMatchCardsSession({
			glossaryEntries: createGlossaryEntries(),
			roundPairCount: 3,
			visiblePairCount: 2,
			randomNumber: keepOrderRandomNumber
		});
		const firstSelection = selectMatchSlot({
			session,
			slotId: "term-0"
		});
		const successSelection = selectMatchSlot({
			session: firstSelection,
			slotId: "explanation-0"
		});
		const fadingOutSession = markSuccessfulSlotsForFadeOut({
			session: successSelection
		});
		const advancedSession = advanceMatchedPair({
			session: fadingOutSession
		});
		const settledSession = settleFadingInSlots({
			session: advancedSession
		});
		const replacementTermSlot = findSlotByColumnAndGlossaryEntry({
			slots: advancedSession.slots,
			column: MATCH_CARD_COLUMN.TERM,
			glossaryEntryKey: "entry-c"
		});
		const replacementExplanationSlot = findSlotByColumnAndGlossaryEntry({
			slots: advancedSession.slots,
			column: MATCH_CARD_COLUMN.EXPLANATION,
			glossaryEntryKey: "entry-c"
		});

		expect(advancedSession.matchedPairCount).toBe(1);
		expect(advancedSession.queuedPairs).toEqual([]);
		expect(replacementTermSlot.status).toBe(MATCH_SLOT_STATUS.FADING_IN);
		expect(replacementTermSlot.textByLanguage).toEqual({
			no: "Begrep C",
			en: "Term C"
		});
		expect(replacementExplanationSlot.status).toBe(MATCH_SLOT_STATUS.FADING_IN);
		expect(replacementExplanationSlot.textByLanguage).toEqual({
			no: "Forklaring C",
			en: "Explanation C"
		});
		expect(findSlot(settledSession.slots, replacementTermSlot.slotId).status).toBe(MATCH_SLOT_STATUS.IDLE);
		expect(findSlot(settledSession.slots, replacementExplanationSlot.slotId).status).toBe(MATCH_SLOT_STATUS.IDLE);
	});

	test("consumes only one queued pair when replacing matched slots", () => {
		const session = createMatchCardsSession({
			glossaryEntries: createGlossaryEntries(),
			roundPairCount: 4,
			visiblePairCount: 2,
			randomNumber: keepOrderRandomNumber
		});
		const firstSelection = selectMatchSlot({
			session,
			slotId: "term-0"
		});
		const successSelection = selectMatchSlot({
			session: firstSelection,
			slotId: "explanation-0"
		});
		const advancedSession = advanceMatchedPair({
			session: successSelection
		});
		const replacementTermSlot = findSlotByColumnAndGlossaryEntry({
			slots: advancedSession.slots,
			column: MATCH_CARD_COLUMN.TERM,
			glossaryEntryKey: "entry-c"
		});
		const replacementExplanationSlot = findSlotByColumnAndGlossaryEntry({
			slots: advancedSession.slots,
			column: MATCH_CARD_COLUMN.EXPLANATION,
			glossaryEntryKey: "entry-c"
		});

		expect(advancedSession.queuedPairs.map((pair) => pair.glossaryEntryKey)).toEqual(["entry-d"]);
		expect(replacementTermSlot.status).toBe(MATCH_SLOT_STATUS.FADING_IN);
		expect(replacementExplanationSlot.status).toBe(MATCH_SLOT_STATUS.FADING_IN);
	});

	test("keeps empty slots when the queue is exhausted", () => {
		const session = createMatchCardsSession({
			glossaryEntries: createGlossaryEntries().slice(0, 2),
			roundPairCount: 2,
			visiblePairCount: 2,
			randomNumber: keepOrderRandomNumber
		});
		const firstSelection = selectMatchSlot({
			session,
			slotId: "term-0"
		});
		const successSelection = selectMatchSlot({
			session: firstSelection,
			slotId: "explanation-0"
		});
		const advancedSession = advanceMatchedPair({
			session: successSelection
		});

		expect(advancedSession.slots).toHaveLength(4);
		expect(findSlot(advancedSession.slots, "term-0")).toEqual({
			slotId: "term-0",
			column: MATCH_CARD_COLUMN.TERM,
			glossaryEntryKey: null,
			textByLanguage: null,
			status: MATCH_SLOT_STATUS.EMPTY
		});
		expect(findSlot(advancedSession.slots, "explanation-0")).toEqual({
			slotId: "explanation-0",
			column: MATCH_CARD_COLUMN.EXPLANATION,
			glossaryEntryKey: null,
			textByLanguage: null,
			status: MATCH_SLOT_STATUS.EMPTY
		});
	});

	test("marks the round complete when all pairs are matched", () => {
		const session = {
			roundPairCount: 1,
			visiblePairCount: 1,
			matchedPairCount: 0,
			selectedSlotId: null,
			isRoundComplete: false,
			queuedPairs: [],
			slots: [
				{
					slotId: "term-0",
					column: MATCH_CARD_COLUMN.TERM,
					glossaryEntryKey: "entry-a",
					textByLanguage: {
						no: "Begrep A",
						en: "Term A"
					},
					status: MATCH_SLOT_STATUS.SUCCESS
				},
				{
					slotId: "explanation-0",
					column: MATCH_CARD_COLUMN.EXPLANATION,
					glossaryEntryKey: "entry-a",
					textByLanguage: {
						no: "Forklaring A",
						en: "Explanation A"
					},
					status: MATCH_SLOT_STATUS.SUCCESS
				}
			]
		};

		expect(advanceMatchedPair({
			session
		}).isRoundComplete).toBe(true);
	});
});

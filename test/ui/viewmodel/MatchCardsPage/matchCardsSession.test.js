// test/ui/viewmodel/MatchCardsPage/matchCardsSession.test.js
import { describe, expect, test } from "@jest/globals";
import { MATCH_CARD_COLUMN, MATCH_SLOT_STATUS } from "../../../../src/ui/viewmodel/MatchCardsPage/matchCardsConstants.js";
import { canStartMatchCardsSession, createMatchCardsSession } from "../../../../src/ui/viewmodel/MatchCardsPage/matchCardsSession.js";
import { shuffleInPlace } from "../../../../src/ui/viewmodel/MatchCardsPage/shuffleInPlace.js";
import { createGlossaryEntries, keepOrderRandomNumber, reverseRandomNumber } from "./matchCardsTestFixtures.js";

describe("matchCardsSession", () => {
	test("requires at least two glossary entries before starting", () => {
		expect(canStartMatchCardsSession([])).toBe(false);
		expect(canStartMatchCardsSession([createGlossaryEntries()[0]])).toBe(false);
		expect(canStartMatchCardsSession(createGlossaryEntries().slice(0, 2))).toBe(true);
	});

	test("shuffles in place with Fisher-Yates", () => {
		const items = ["a", "b", "c"];

		expect(shuffleInPlace(items, reverseRandomNumber)).toEqual(["b", "c", "a"]);
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
});

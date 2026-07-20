// test/ui/viewmodel/MatchCardsPage/matchCardsRoundTransitions.test.js
import { describe, expect, test } from "@jest/globals";
import { MATCH_CARD_COLUMN, MATCH_SLOT_STATUS } from "../../../../src/ui/viewmodel/MatchCardsPage/matchCardsConstants.js";
import { createMatchCardsSession } from "../../../../src/ui/viewmodel/MatchCardsPage/matchCardsSessionFactory.js";
import { selectMatchSlot } from "../../../../src/ui/viewmodel/MatchCardsPage/matchCardsSelectionTransitions.js";
import {
	advanceMatchedPair,
	markSuccessfulSlotsForFadeOut,
	resetWrongSlots,
	settleFadingInSlots
} from "../../../../src/ui/viewmodel/MatchCardsPage/matchCardsRoundTransitions.js";
import {
	createGlossaryEntries,
	findSlot,
	findSlotByColumnAndGlossaryEntry,
	keepOrderRandomNumber
} from "./matchCardsTestFixtures.js";

describe("matchCardsRoundTransitions", () => {
	test("resets wrong slots to idle", () => {
		const session = createSession(3, 2);
		const firstSelection = selectMatchSlot(session, "term-0");
		const wrongSelection = selectMatchSlot(firstSelection, "explanation-1");
		const resetSession = resetWrongSlots(wrongSelection);

		expect(findSlot(resetSession.slots, "term-0").status).toBe(MATCH_SLOT_STATUS.IDLE);
		expect(findSlot(resetSession.slots, "explanation-1").status).toBe(MATCH_SLOT_STATUS.IDLE);
	});

	test("replaces a matched pair from the queue and settles fading slots", () => {
		const successSelection = createSuccessSelection(3, 2);
		const fadingOutSession = markSuccessfulSlotsForFadeOut(successSelection);
		const advancedSession = advanceMatchedPair(fadingOutSession);
		const settledSession = settleFadingInSlots(advancedSession);
		const replacementTermSlot = findReplacementSlot(advancedSession, MATCH_CARD_COLUMN.TERM, "entry-c");
		const replacementExplanationSlot = findReplacementSlot(
			advancedSession,
			MATCH_CARD_COLUMN.EXPLANATION,
			"entry-c"
		);

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
		const successSelection = createSuccessSelection(4, 2);
		const advancedSession = advanceMatchedPair(successSelection);
		const replacementTermSlot = findReplacementSlot(advancedSession, MATCH_CARD_COLUMN.TERM, "entry-c");
		const replacementExplanationSlot = findReplacementSlot(
			advancedSession,
			MATCH_CARD_COLUMN.EXPLANATION,
			"entry-c"
		);

		expect(advancedSession.queuedPairs.map((pair) => pair.glossaryEntryKey)).toEqual(["entry-d"]);
		expect(replacementTermSlot.status).toBe(MATCH_SLOT_STATUS.FADING_IN);
		expect(replacementExplanationSlot.status).toBe(MATCH_SLOT_STATUS.FADING_IN);
	});

	test("keeps empty slots when the queue is exhausted", () => {
		const glossaryEntries = createGlossaryEntries().slice(0, 2);
		const session = createMatchCardsSession({
			glossaryEntries,
			roundPairCount: 2,
			visiblePairCount: 2,
			randomNumber: keepOrderRandomNumber
		});
		const firstSelection = selectMatchSlot(session, "term-0");
		const successSelection = selectMatchSlot(firstSelection, "explanation-0");
		const advancedSession = advanceMatchedPair(successSelection);

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
				createSuccessfulSlot("term-0", MATCH_CARD_COLUMN.TERM, "Begrep A", "Term A"),
				createSuccessfulSlot(
					"explanation-0",
					MATCH_CARD_COLUMN.EXPLANATION,
					"Forklaring A",
					"Explanation A"
				)
			]
		};

		expect(advanceMatchedPair(session).isRoundComplete).toBe(true);
	});
});

const createSession = (roundPairCount, visiblePairCount) => createMatchCardsSession({
	glossaryEntries: createGlossaryEntries(),
	roundPairCount,
	visiblePairCount,
	randomNumber: keepOrderRandomNumber
});

const createSuccessSelection = (roundPairCount, visiblePairCount) => {
	const session = createSession(roundPairCount, visiblePairCount);
	const firstSelection = selectMatchSlot(session, "term-0");

	return selectMatchSlot(firstSelection, "explanation-0");
};

const findReplacementSlot = (session, column, glossaryEntryKey) => findSlotByColumnAndGlossaryEntry({
	slots: session.slots,
	column,
	glossaryEntryKey
});

const createSuccessfulSlot = (slotId, column, textNo, textEn) => ({
	slotId,
	column,
	glossaryEntryKey: "entry-a",
	textByLanguage: {
		no: textNo,
		en: textEn
	},
	status: MATCH_SLOT_STATUS.SUCCESS
});

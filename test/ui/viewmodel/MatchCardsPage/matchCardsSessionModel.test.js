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

function createConcept({ conceptKey, termNo, termEn, explanationNo, explanationEn }) {
	return {
		conceptKey,
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

function createConcepts() {
	return [
		createConcept({
			conceptKey: "concept-a",
			termNo: "Begrep A",
			termEn: "Term A",
			explanationNo: "Forklaring A",
			explanationEn: "Explanation A"
		}),
		createConcept({
			conceptKey: "concept-b",
			termNo: "Begrep B",
			termEn: "Term B",
			explanationNo: "Forklaring B",
			explanationEn: "Explanation B"
		}),
		createConcept({
			conceptKey: "concept-c",
			termNo: "Begrep C",
			termEn: "Term C",
			explanationNo: "Forklaring C",
			explanationEn: "Explanation C"
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

function findSlotByColumnAndConcept({ slots, column, conceptKey }) {
	for (const slot of slots) {
		if (slot.column === column && slot.conceptKey === conceptKey) {
			return slot;
		}
	}

	return null;
}

describe("matchCardsSessionModel", () => {
	test("requires at least two concepts before starting", () => {
		expect(canStartMatchCardsSession({
			concepts: []
		})).toBe(false);
		expect(canStartMatchCardsSession({
			concepts: [createConcepts()[0]]
		})).toBe(false);
		expect(canStartMatchCardsSession({
			concepts: createConcepts().slice(0, 2)
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

	test("creates a localized round with active slots and queued pairs", () => {
		const session = createMatchCardsSession({
			concepts: createConcepts(),
			language: "en",
			roundPairCount: 3,
			visiblePairCount: 2,
			randomNumber: keepOrderRandomNumber
		});

		expect(session.roundPairCount).toBe(3);
		expect(session.visiblePairCount).toBe(2);
		expect(session.queuedPairs).toEqual([
			{
				conceptKey: "concept-c",
				termText: "Term C",
				explanationText: "Explanation C"
			}
		]);
		expect(session.slots).toEqual([
			{
				slotId: "term-0",
				column: MATCH_CARD_COLUMN.TERM,
				conceptKey: "concept-a",
				text: "Term A",
				status: MATCH_SLOT_STATUS.IDLE
			},
			{
				slotId: "term-1",
				column: MATCH_CARD_COLUMN.TERM,
				conceptKey: "concept-b",
				text: "Term B",
				status: MATCH_SLOT_STATUS.IDLE
			},
			{
				slotId: "explanation-0",
				column: MATCH_CARD_COLUMN.EXPLANATION,
				conceptKey: "concept-a",
				text: "Explanation A",
				status: MATCH_SLOT_STATUS.IDLE
			},
			{
				slotId: "explanation-1",
				column: MATCH_CARD_COLUMN.EXPLANATION,
				conceptKey: "concept-b",
				text: "Explanation B",
				status: MATCH_SLOT_STATUS.IDLE
			}
		]);
	});

	test("degrades round size when the concept pool is smaller than requested", () => {
		const session = createMatchCardsSession({
			concepts: createConcepts().slice(0, 2),
			language: "no",
			roundPairCount: 6,
			visiblePairCount: 4,
			randomNumber: keepOrderRandomNumber
		});

		expect(session.roundPairCount).toBe(2);
		expect(session.visiblePairCount).toBe(2);
		expect(session.queuedPairs).toEqual([]);
		expect(session.slots).toHaveLength(4);
	});

	test("matches only slots in opposite columns with the same concept key", () => {
		const termSlot = {
			column: MATCH_CARD_COLUMN.TERM,
			conceptKey: "concept-a"
		};
		const matchingExplanationSlot = {
			column: MATCH_CARD_COLUMN.EXPLANATION,
			conceptKey: "concept-a"
		};
		const wrongExplanationSlot = {
			column: MATCH_CARD_COLUMN.EXPLANATION,
			conceptKey: "concept-b"
		};
		const sameColumnSlot = {
			column: MATCH_CARD_COLUMN.TERM,
			conceptKey: "concept-a"
		};

		expect(isMatchingPair(termSlot, matchingExplanationSlot)).toBe(true);
		expect(isMatchingPair(termSlot, wrongExplanationSlot)).toBe(false);
		expect(isMatchingPair(termSlot, sameColumnSlot)).toBe(false);
	});

	test("moves selection when the next selected slot is in the same column", () => {
		const session = createMatchCardsSession({
			concepts: createConcepts(),
			language: "no",
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
			concepts: createConcepts(),
			language: "no",
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
			concepts: createConcepts(),
			language: "no",
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
			concepts: createConcepts(),
			language: "no",
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
		const replacementTermSlot = findSlotByColumnAndConcept({
			slots: advancedSession.slots,
			column: MATCH_CARD_COLUMN.TERM,
			conceptKey: "concept-c"
		});
		const replacementExplanationSlot = findSlotByColumnAndConcept({
			slots: advancedSession.slots,
			column: MATCH_CARD_COLUMN.EXPLANATION,
			conceptKey: "concept-c"
		});

		expect(advancedSession.matchedPairCount).toBe(1);
		expect(advancedSession.queuedPairs).toEqual([]);
		expect(replacementTermSlot.status).toBe(MATCH_SLOT_STATUS.FADING_IN);
		expect(replacementExplanationSlot.status).toBe(MATCH_SLOT_STATUS.FADING_IN);
		expect(findSlot(settledSession.slots, replacementTermSlot.slotId).status).toBe(MATCH_SLOT_STATUS.IDLE);
		expect(findSlot(settledSession.slots, replacementExplanationSlot.slotId).status).toBe(MATCH_SLOT_STATUS.IDLE);
	});

	test("keeps empty slots when the queue is exhausted", () => {
		const session = createMatchCardsSession({
			concepts: createConcepts().slice(0, 2),
			language: "no",
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
			conceptKey: null,
			text: null,
			status: MATCH_SLOT_STATUS.EMPTY
		});
		expect(findSlot(advancedSession.slots, "explanation-0")).toEqual({
			slotId: "explanation-0",
			column: MATCH_CARD_COLUMN.EXPLANATION,
			conceptKey: null,
			text: null,
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
					conceptKey: "concept-a",
					text: "Begrep A",
					status: MATCH_SLOT_STATUS.SUCCESS
				},
				{
					slotId: "explanation-0",
					column: MATCH_CARD_COLUMN.EXPLANATION,
					conceptKey: "concept-a",
					text: "Forklaring A",
					status: MATCH_SLOT_STATUS.SUCCESS
				}
			]
		};

		expect(advanceMatchedPair({
			session
		}).isRoundComplete).toBe(true);
	});
});

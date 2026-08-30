// test/ui/viewmodel/MatchCards/matchCardsResultModel.test.js
import { describe, expect, test } from "@jest/globals";
import { createSuccessfulMatchResult } from "../../../../src/ui/viewmodel/MatchCards/matchCardsResultModel.js";
import { resetWrongSlots } from "../../../../src/ui/viewmodel/MatchCards/matchCardsRoundTransitions.js";
import { selectMatchSlot } from "../../../../src/ui/viewmodel/MatchCards/matchCardsSelectionTransitions.js";
import { createMatchCardsSession } from "../../../../src/ui/viewmodel/MatchCards/matchCardsSession.js";
import { createGlossaryEntries, keepOrderRandomNumber } from "./matchCardsTestFixtures.js";

describe("matchCardsResultModel", () => {
	test("returns null before a pair is successfully matched", () => {
		const session = createTestSession();

		expect(createSuccessfulMatchResult(session)).toBe(null);
	});

	test("creates a result with the successful glossary key and accumulated wrong attempts", () => {
		const firstWrongSelection = selectMatchSlot(
			selectMatchSlot(createTestSession(), "term-0"),
			"explanation-1"
		);
		const resetSession = resetWrongSlots(firstWrongSelection);
		const successSelection = selectMatchSlot(
			selectMatchSlot(resetSession, "term-0"),
			"explanation-0"
		);

		expect(createSuccessfulMatchResult(successSelection)).toEqual({
			glossaryEntryKey: "entry-a",
			wrongAttemptCount: 1
		});
	});

	test("uses zero wrong attempts for a first-try match", () => {
		const session = createTestSession();
		const successSelection = selectMatchSlot(
			selectMatchSlot(session, "term-0"),
			"explanation-0"
		);

		expect(createSuccessfulMatchResult(successSelection)).toEqual({
			glossaryEntryKey: "entry-a",
			wrongAttemptCount: 0
		});
	});
});

const createTestSession = () => createMatchCardsSession({
	glossaryEntries: createGlossaryEntries(),
	roundPairCount: 3,
	visiblePairCount: 2,
	randomNumber: keepOrderRandomNumber
});

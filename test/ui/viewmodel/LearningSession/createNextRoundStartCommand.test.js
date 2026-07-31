//test/ui/viewmodel/LearningSession/createNextRoundStartCommand.test.js
import { describe, expect, test } from "@jest/globals";
import createNextRoundStartCommand from "../../../../src/ui/viewmodel/LearningSession/createNextRoundStartCommand.js";

describe("createNextRoundStartCommand", () => {
	test("keeps subject, module and language while advancing exactly one round", () => {
		expect(createNextRoundStartCommand({ subjectId: "subject-1", moduleId: "module-2", language: "no", currentRound: 1, nextRound: 2 })).toEqual({ subjectId: "subject-1", moduleId: "module-2", language: "no", round: 2 });
	});

	test.each([
		{ currentRound: 1, nextRound: 3 },
		{ currentRound: 3, nextRound: 1 },
		{ currentRound: 3, nextRound: 4 }
	])("rejects invalid round transitions: %j", ({ currentRound, nextRound }) => {
		expect(createNextRoundStartCommand({ subjectId: "subject-1", moduleId: "module-2", language: "no", currentRound, nextRound })).toBeNull();
	});
});

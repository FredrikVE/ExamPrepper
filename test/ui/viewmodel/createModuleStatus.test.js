//test/ui/viewmodel/createModuleStatus.test.js
import { describe, expect, test } from "@jest/globals";
import createModuleStatus from "../../../src/ui/viewmodel/LearningPath/createModuleStatus.js";

describe("createModuleStatus", () => {
	test.each([
		[{ masteryPercent: 0, isCurrent: false, isCompleted: false, isUnlocked: false }, "locked"],
		[{ masteryPercent: 100, isCurrent: false, isCompleted: true, isUnlocked: true }, "strong"],
		[{ masteryPercent: 0, isCurrent: true, isCompleted: false, isUnlocked: true }, "active"],
		[{ masteryPercent: 80, isCurrent: false, isCompleted: false, isUnlocked: true }, "strong"],
		[{ masteryPercent: 55, isCurrent: false, isCompleted: false, isUnlocked: true }, "medium"],
		[{ masteryPercent: 25, isCurrent: false, isCompleted: false, isUnlocked: true }, "weak"],
		[{ masteryPercent: 0, isCurrent: false, isCompleted: false, isUnlocked: true }, "notStarted"]
	])("returns a finished presentation status", (input, expected) => {
		expect(createModuleStatus(input).statusKey).toBe(expected);
	});
});

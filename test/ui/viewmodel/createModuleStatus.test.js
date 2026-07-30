//test/ui/viewmodel/createModuleStatus.test.js
import { describe, expect, test } from "@jest/globals";
import createModuleStatus from "../../../src/ui/viewmodel/LearningPath/createModuleStatus.js";

describe("createModuleStatus", () => {
	test.each([
		[{ masteryPercent: 0, isActive: false, isCompleted: false, isLocked: true }, "locked"],
		[{ masteryPercent: 100, isActive: false, isCompleted: true, isLocked: false }, "completed"],
		[{ masteryPercent: 0, isActive: true, isCompleted: false, isLocked: false }, "active"],
		[{ masteryPercent: 25, isActive: false, isCompleted: false, isLocked: false }, "progress"],
		[{ masteryPercent: 0, isActive: false, isCompleted: false, isLocked: false }, "notStarted"]
	])("returns a finished presentation status", (input, expected) => {
		expect(createModuleStatus(input).statusKey).toBe(expected);
	});
});

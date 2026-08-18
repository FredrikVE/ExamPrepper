//test/ui/viewmodel/createModuleStatus.test.js
import { describe, expect, test } from "@jest/globals";
import createModuleStatus from "../../../src/ui/viewmodel/LearningPath/createModuleStatus.js";

describe("createModuleStatus", () => {
	test.each([
		[{ completionPercent: 0, completedSessions: 0, isCurrent: false, isUnlocked: false }, "locked", "lock"],
		[{ completionPercent: 25, completedSessions: 1, isCurrent: true, isUnlocked: true }, "active", "play"],
		[{ completionPercent: 100, completedSessions: 4, isCurrent: false, isUnlocked: true }, "completed", "check"],
		[{ completionPercent: 25, completedSessions: 1, isCurrent: false, isUnlocked: true }, "progress", "trending"],
		[{ completionPercent: 0, completedSessions: 0, isCurrent: false, isUnlocked: true }, "notStarted", null]
	])("maps lifecycle facts to module status", (input, expectedStatus, expectedIcon) => {
		const result = createModuleStatus(input);

		expect(result.statusKey).toBe(expectedStatus);
		expect(result.iconKey).toBe(expectedIcon);
	});
});

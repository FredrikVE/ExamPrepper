//test/ui/viewmodel/createModuleStatus.test.js
import { describe, expect, test } from "@jest/globals";
import createModuleStatus from "../../../src/ui/viewmodel/LearningPath/createModuleStatus.js";

describe("createModuleStatus", () => {
	test.each([
		[{ completedRounds: 0, isCurrent: false, isUnlocked: false }, "locked", "lock"],
		[{ completedRounds: 1, isCurrent: true, isUnlocked: true }, "active", "play"],
		[{ completedRounds: 3, isCurrent: false, isUnlocked: true }, "completed", "check"],
		[{ completedRounds: 1, isCurrent: false, isUnlocked: true }, "progress", "trending"],
		[{ completedRounds: 0, isCurrent: false, isUnlocked: true }, "notStarted", null]
	])("maps lifecycle facts to module status", (input, expectedStatus, expectedIcon) => {
		const result = createModuleStatus(input);

		expect(result.statusKey).toBe(expectedStatus);
		expect(result.iconKey).toBe(expectedIcon);
	});
});

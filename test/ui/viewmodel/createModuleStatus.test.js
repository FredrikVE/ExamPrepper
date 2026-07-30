//test/ui/viewmodel/createModuleStatus.test.js
import { describe, expect, test } from "@jest/globals";
import createModuleStatus from "../../../src/ui/viewmodel/LearningPath/createModuleStatus.js";

describe("createModuleStatus", () => {
	test.each([
		[{ masteryPercent: 0, isCurrent: false, isUnlocked: false }, "locked", "lock"],
		[{ masteryPercent: 0, isCurrent: true, isUnlocked: true }, "active", "play"],
		[{ masteryPercent: 80, isCurrent: false, isUnlocked: true }, "strong", "check"],
		[{ masteryPercent: 55, isCurrent: false, isUnlocked: true }, "medium", "trending"],
		[{ masteryPercent: 49.67, isCurrent: false, isUnlocked: true }, "weak", "repeat"],
		[{ masteryPercent: 0, isCurrent: false, isUnlocked: true }, "notStarted", null]
	])("maps mastery to the prototype status and icon", (input, expectedStatus, expectedIcon) => {
		const result = createModuleStatus(input);

		expect(result.statusKey).toBe(expectedStatus);
		expect(result.iconKey).toBe(expectedIcon);
	});

	test("does not promote a low-mastery completed module to a green check", () => {
		const result = createModuleStatus({ masteryPercent: 49.67, isCurrent: false, isUnlocked: true });

		expect(result).toEqual({ statusKey: "weak", appearance: "weak", iconKey: "repeat" });
	});
});

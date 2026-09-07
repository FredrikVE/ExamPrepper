// test/ui/viewmodel/Shared/roundMasteryPercentage.test.js
import { describe, expect, test } from "@jest/globals";
import roundMasteryPercentage from "../../../../src/ui/viewmodel/Shared/roundMasteryPercentage.js";

describe("roundMasteryPercentage", () => {
	test("uses the same whole-percent presentation rule for LearningPath and Statistics mastery", () => {
		expect(roundMasteryPercentage(79.6)).toBe(80);
		expect(roundMasteryPercentage(79.4)).toBe(79);
		expect(roundMasteryPercentage(null)).toBeNull();
	});

	test("fails fast for invalid mastery percentages", () => {
		expect(() => roundMasteryPercentage(Number.NaN)).toThrow("Invalid mastery percentage");
	});
});

//test/ui/viewmodel/LearningPath/createMasteryAppearance.test.js
import { describe, expect, test } from "@jest/globals";
import createMasteryAppearance from "../../../../src/ui/viewmodel/LearningPath/createMasteryAppearance.js";

describe("createMasteryAppearance", () => {
	test.each([
		[0, "empty"],
		[1, "weak"],
		[54, "weak"],
		[55, "medium"],
		[79, "medium"],
		[80, "strong"],
		[100, "strong"]
	])("maps %s percent to %s", (percentage, expected) => {
		expect(createMasteryAppearance(percentage)).toBe(expected);
	});
});

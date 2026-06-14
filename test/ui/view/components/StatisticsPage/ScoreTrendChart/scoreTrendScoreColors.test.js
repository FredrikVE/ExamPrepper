// test/ui/view/components/StatisticsPage/ScoreTrendChart/scoreTrendScoreColors.test.js
import { describe, expect, test } from "@jest/globals";

import { getScoreColor } from "../../../../../../src/ui/view/components/StatisticsPage/ScoreTrendChart/scoreTrendScoreColors.js";

describe("getScoreColor", () => {
	test("returns the excellent color for scores from 90 and above", () => {
		expect(getScoreColor(90)).toBe("#20a83a");
		expect(getScoreColor(100)).toBe("#20a83a");
	});

	test("returns the strong color for scores from 70 to 89", () => {
		expect(getScoreColor(70)).toBe("#ff8a00");
		expect(getScoreColor(89)).toBe("#ff8a00");
	});

	test("returns the mid color for scores from 50 to 69", () => {
		expect(getScoreColor(50)).toBe("#7c3aed");
		expect(getScoreColor(69)).toBe("#7c3aed");
	});

	test("returns the building color for scores from 30 to 49", () => {
		expect(getScoreColor(30)).toBe("#12b6aa");
		expect(getScoreColor(49)).toBe("#12b6aa");
	});

	test("returns the low color for scores below 30", () => {
		expect(getScoreColor(0)).toBe("#1463ff");
		expect(getScoreColor(29)).toBe("#1463ff");
	});
});

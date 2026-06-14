// test/ui/view/components/StatisticsPage/ScoreTrendChart/scoreTrendScoreBands.test.js
import { describe, expect, test } from "@jest/globals";

import { getScoreBandClassName } from "../../../../../../src/ui/view/components/StatisticsPage/ScoreTrendChart/scoreTrendScoreBands.js";

describe("getScoreBandClassName", () => {
	test("returns the excellent class for scores from 90 and above", () => {
		expect(getScoreBandClassName(90)).toBe("statistics-trend-score-excellent");
		expect(getScoreBandClassName(100)).toBe("statistics-trend-score-excellent");
	});

	test("returns the strong class for scores from 70 to 89", () => {
		expect(getScoreBandClassName(70)).toBe("statistics-trend-score-strong");
		expect(getScoreBandClassName(89)).toBe("statistics-trend-score-strong");
	});

	test("returns the mid class for scores from 50 to 69", () => {
		expect(getScoreBandClassName(50)).toBe("statistics-trend-score-mid");
		expect(getScoreBandClassName(69)).toBe("statistics-trend-score-mid");
	});

	test("returns the building class for scores from 30 to 49", () => {
		expect(getScoreBandClassName(30)).toBe("statistics-trend-score-building");
		expect(getScoreBandClassName(49)).toBe("statistics-trend-score-building");
	});

	test("returns the low class for scores below 30", () => {
		expect(getScoreBandClassName(0)).toBe("statistics-trend-score-low");
		expect(getScoreBandClassName(29)).toBe("statistics-trend-score-low");
	});
});

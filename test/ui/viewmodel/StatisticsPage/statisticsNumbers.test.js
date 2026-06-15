// test/ui/viewmodel/StatisticsPage/statisticsNumbers.test.js
import { describe, expect, test } from "@jest/globals";
import { formatNumber, normalizeNumber, normalizeNullableNumber, normalizeNullablePercentagePoints, roundPercentage } from "../../../../src/ui/viewmodel/StatisticsPage/statisticsNumbers.js";

describe("statisticsNumbers", () => {
	test("normalizes numbers and backend number strings", () => {
		expect(normalizeNumber(3)).toBe(3);
		expect(normalizeNumber("3")).toBe(3);
		expect(normalizeNumber(null)).toBe(0);
		expect(normalizeNullableNumber("bad-data")).toBeNull();
	});

	test("normalizes percentage points", () => {
		expect(normalizeNullablePercentagePoints("74.44")).toBe(74.4);
		expect(normalizeNullablePercentagePoints(null)).toBeNull();
	});

	test("rounds and formats numbers", () => {
		expect(roundPercentage(81.25)).toBe(81.3);
		expect(formatNumber(81)).toBe("81");
		expect(formatNumber(81.25)).toBe("81.3");
	});
});

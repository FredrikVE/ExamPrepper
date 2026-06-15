// test/ui/viewmodel/StatisticsPage/normalizeStatisticsSummary.test.js
import { describe, expect, test } from "@jest/globals";
import { normalizeStatisticsSummary } from "../../../../src/ui/viewmodel/StatisticsPage/normalizeStatisticsSummary.js";

describe("normalizeStatisticsSummary", () => {
	test("normalizes missing statistics to safe defaults", () => {
		const result = normalizeStatisticsSummary(null);

		expect(result).toEqual({
			attemptCount: 0,
			averageScorePercentage: null,
			bestScorePercentage: null,
			totalCorrectAnswers: 0,
			totalQuestions: 0,
			uniqueExamCount: 0
		});
	});

	test("normalizes backend number strings", () => {
		const result = normalizeStatisticsSummary({
			attemptCount: "3",
			averageScorePercentage: "74.44",
			bestScorePercentage: "92",
			totalCorrectAnswers: "12",
			totalQuestions: "16",
			uniqueExamCount: "2"
		});

		expect(result).toEqual({
			attemptCount: 3,
			averageScorePercentage: 74.4,
			bestScorePercentage: 92,
			totalCorrectAnswers: 12,
			totalQuestions: 16,
			uniqueExamCount: 2
		});
	});
});

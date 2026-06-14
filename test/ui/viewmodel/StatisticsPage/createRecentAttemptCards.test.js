// test/ui/viewmodel/StatisticsPage/createRecentAttemptCards.test.js
import { describe, expect, test } from "@jest/globals";
import createStatisticsCopy from "../../../../src/ui/viewmodel/StatisticsPage/createStatisticsCopy.js";
import { createRecentAttemptCards } from "../../../../src/ui/viewmodel/StatisticsPage/createRecentAttemptCards.js";

const copy = createStatisticsCopy({
	statisticsAttemptScoreLabel: "Score",
	statisticsAttemptFallbackTitlePrefix: "Eksamen",
	statisticsAttemptPointUnit: "poeng"
});

const formatDate = (value) => value ? `dato:${value}` : null;

describe("createRecentAttemptCards", () => {
	test("returns empty list when recentAttempts is missing", () => {
		expect(createRecentAttemptCards(undefined, formatDate, copy)).toEqual([]);
	});

	test("creates card models for recent attempts", () => {
		const result = createRecentAttemptCards([
			{
				attemptId: "a1",
				examId: "exam-1",
				examTitle: "Full pensum",
				submittedAt: "2026-06-12",
				percentage: "81.25",
				scorePoints: "13",
				totalPoints: "16"
			},
			{
				attemptId: "a2",
				examId: "exam-2",
				submittedAt: null,
				percentage: null,
				scorePoints: null,
				totalPoints: null
			}
		], formatDate, copy);

		expect(result).toEqual([
			{
				id: "a1",
				examId: "exam-1",
				examTitle: "Full pensum",
				submittedAtLabel: "dato:2026-06-12",
				percentage: 81.3,
				percentageLabel: "81.3 %",
				pointsLabel: "13 / 16 poeng",
				scoreLabel: "Score",
				tone: "purple"
			},
			{
				id: "a2",
				examId: "exam-2",
				examTitle: "Eksamen exam-2",
				submittedAtLabel: "—",
				percentage: null,
				percentageLabel: "—",
				pointsLabel: "0 / 0 poeng",
				scoreLabel: "Score",
				tone: "orange"
			}
		]);
	});
});

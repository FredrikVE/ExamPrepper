// test/ui/viewmodel/StatisticsPage/createRecentAttemptCards.test.js
import { describe, expect, test } from "@jest/globals";
import createStatisticsTextModel from "../../../../src/ui/viewmodel/StatisticsPage/createStatisticsTextModel.js";
import { createRecentAttemptCards } from "../../../../src/ui/viewmodel/StatisticsPage/createRecentAttemptCards.js";

const text = createStatisticsTextModel({
	statisticsAttemptScoreLabel: "Score",
	statisticsAttemptFallbackTitlePrefix: "Eksamen",
	statisticsPracticeExamFallbackTitlePrefix: "Øveeksamen",
	statisticsDemoExamFallbackTitle: "Demoeksamen",
	statisticsAttemptPointUnit: "poeng",
	statisticsEmptyValueLabel: "—"
});

const formatDate = (value) => value ? `dato:${value}` : null;

describe("createRecentAttemptCards", () => {
	test("returns empty list when recentAttempts is missing", () => {
		expect(createRecentAttemptCards(undefined, formatDate, text)).toEqual([]);
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
		], formatDate, text);

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
				tone: "purple",
				iconKey: "bookOpen"
			},
			{
				id: "a2",
				examId: "exam-2",
				examTitle: "Eksamen 2",
				submittedAtLabel: "—",
				percentage: null,
				percentageLabel: "—",
				pointsLabel: "0 / 0 poeng",
				scoreLabel: "Score",
				tone: "orange",
				iconKey: "clipboardList"
			}
		]);
	});

	test("creates readable fallback titles from known exam id patterns", () => {
		const result = createRecentAttemptCards([
			{ attemptId: "a1", examId: "mock-exam-1-no", percentage: 80 },
			{ attemptId: "a2", examId: "in5431-demo-no", percentage: 70 },
			{ attemptId: "a3", examId: "unknown-file-name-no", percentage: 60 }
		], formatDate, text);

		expect(result.map((attempt) => attempt.examTitle)).toEqual([
			"Øveeksamen 1",
			"Demoeksamen",
			"Eksamen 3"
		]);
		expect(result.map((attempt) => attempt.iconKey)).toEqual([
			"bookOpen",
			"clipboardList",
			"fileText"
		]);
	});
});

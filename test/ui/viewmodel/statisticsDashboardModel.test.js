// test/ui/viewmodel/statisticsDashboardModel.test.js
import { describe, expect, test } from "@jest/globals";
import createStatisticsDashboardModel from "../../../src/ui/viewmodel/Utils/statisticsDashboardModel.js";

const attempts = [
	{
		id: "attempt-2",
		examId: "exam-b-no",
		lang: "no",
		scorePoints: 8,
		totalPoints: 10,
		percentage: "80.00",
		submittedAt: "2026-06-10T12:00:00.000Z",
		results: [
			{ questionId: "q1", isCorrect: true },
			{ questionId: "q2", isCorrect: true },
			{ questionId: "q3", isCorrect: false }
		]
	},
	{
		id: "attempt-1",
		examId: "exam-a-no",
		lang: "no",
		scorePoints: 6,
		totalPoints: 10,
		percentage: 60,
		submittedAt: "2026-06-01T12:00:00.000Z",
		results: [
			{ questionId: "q1", isCorrect: true },
			{ questionId: "q2", isCorrect: false }
		]
	},
	{
		id: "attempt-3",
		examId: "exam-a-no",
		lang: "no",
		scorePoints: 9,
		totalPoints: 10,
		percentage: 90,
		submittedAt: "2026-06-15T12:00:00.000Z",
		results: [
			{ questionId: "q1", isCorrect: true },
			{ questionId: "q2", isCorrect: true }
		]
	}
];

describe("createStatisticsDashboardModel", () => {
	test("derives KPI cards from attempts", () => {
		const model = createStatisticsDashboardModel(attempts, "no");

		expect(model.isStatisticsEmpty).toBe(false);
		expect(model.totals.attemptsCount).toBe(3);
		expect(model.totals.averagePercentage).toBe(76.7);
		expect(model.totals.correctAnswerCount).toBe(5);
		expect(model.totals.answeredQuestionCount).toBe(7);
		expect(model.totals.uniqueExamCount).toBe(2);

		expect(model.kpiCards).toEqual([
			expect.objectContaining({ id: "average-score", value: "76.7 %" }),
			expect.objectContaining({ id: "best-score", value: "90 %" }),
			expect.objectContaining({ id: "correct-answers", value: "5" }),
			expect.objectContaining({ id: "unique-exams", value: "2" })
		]);
	});

	test("sorts recent attempts newest first", () => {
		const model = createStatisticsDashboardModel(attempts, "no");

		expect(model.recentAttempts.map((attempt) => attempt.id)).toEqual([
			"attempt-3",
			"attempt-2",
			"attempt-1"
		]);
	});

	test("builds score trend chart oldest first", () => {
		const model = createStatisticsDashboardModel(attempts, "no");

		expect(model.scoreTrendChart.points).toEqual([
			expect.objectContaining({ id: "attempt-1", percentage: 60 }),
			expect.objectContaining({ id: "attempt-2", percentage: 80 }),
			expect.objectContaining({ id: "attempt-3", percentage: 90 })
		]);
		expect(model.scoreTrendChart.summary).toBe("De siste forsøkene dine er 60 %, 80 %, 90 %.");
	});

	test("builds hero improvement from first to latest attempt", () => {
		const model = createStatisticsDashboardModel(attempts, "no");

		expect(model.hero.title).toBe("Du har øvd 3 ganger");
		expect(model.hero.progressPercentage).toBe(76.7);
		expect(model.hero.trendLabel).toBe("+30 prosentpoeng siden første forsøk");
		expect(model.hero.trendDirection).toBe("positive");
	});

	test("returns safe empty model when attempts are missing", () => {
		const model = createStatisticsDashboardModel(null, "no");

		expect(model.isStatisticsEmpty).toBe(true);
		expect(model.statisticsAttempts).toEqual([]);
		expect(model.recentAttempts).toEqual([]);
		expect(model.scoreTrendChart.points).toEqual([]);
		expect(model.hero.title).toBe("Du har ingen forsøk ennå");
		expect(model.kpiCards.every((card) => card.value === "—")).toBe(true);
	});

	test("uses supplied static translation fragments when provided", () => {
		const model = createStatisticsDashboardModel([attempts[0]], "en", {
			statisticsHeroTitlePrefix: "Practised",
			statisticsHeroTitleUnitSingular: "round",
			statisticsHeroTitleUnitPlural: "rounds",
			statisticsKpiAverageScore: "Average score",
			statisticsAttemptFallbackTitlePrefix: "Exam"
		});

		expect(model.hero.title).toBe("Practised 1 round");
		expect(model.kpiCards[0].label).toBe("Average score");
		expect(model.statisticsAttempts[0].examTitle).toBe("Exam exam-b-no");
	});
});

// test/ui/viewmodel/createStatisticsDashboardModel.test.js
import { describe, expect, test } from "@jest/globals";
import createStatisticsTextModel from "../../../src/ui/viewmodel/StatisticsPage/createStatisticsTextModel.js";
import createStatisticsDashboardModel from "../../../src/ui/viewmodel/StatisticsPage/createStatisticsDashboardModel.js";

const translations = {
	selectStatistics: "Din statistikk",
	statisticsPageSubtitle: "Se utvikling.",
	statisticsLoadingTitle: "Laster statistikk...",
	statisticsLoadingBody: "Henter tall.",
	statisticsSignedOutTitle: "Logg inn",
	statisticsSignedOutBody: "Logg inn for statistikk.",
	statisticsHeroEmptyTitle: "Du har ingen forsøk ennå",
	statisticsHeroEmptyBody: "Lever en eksamen først.",
	statisticsErrorTitle: "Kunne ikke laste statistikk",
	statisticsRetryButton: "Prøv igjen",
	statisticsStartNewExamButton: "Start ny eksamen",
	statisticsHeroBody: "Du bygger kunnskap.",
	statisticsHeroNoTrend: "Lever flere eksamener.",
	statisticsKpiGridLabel: "Statistikk nøkkeltall",
	statisticsKpiAttemptCount: "Antall forsøk",
	statisticsKpiAverageScore: "Snittscore",
	statisticsKpiBestScore: "Beste score",
	statisticsKpiCorrectAnswers: "Riktige svar",
	statisticsKpiUniqueExams: "Eksamener øvd på",
	statisticsScoreTrendTitle: "Din læringsreise",
	statisticsScoreTrendSubtitle: "Siste 20 forsøk.",
	statisticsScoreTrendEmptySummary: "Ingen trend ennå.",
	statisticsRecentAttemptsTitle: "Siste forsøk",
	statisticsRecentAttemptsSubtitle: "Siste 5 forsøk.",
	statisticsRecentAttemptsEmpty: "Ingen forsøk.",
	statisticsRecommendedTitle: "Mest å hente nå",
	statisticsRecommendedBody: "Laveste score blant siste forsøk.",
	statisticsRecommendedBadge: "Anbefalt",
	statisticsWeeklyActivityTitle: "Aktivitet denne uken",
	statisticsWeeklyActivityTotalTimeCaption: "Totalt tid brukt",
	statisticsWeeklyActivityChangeSuffix: "fra forrige uke",
	statisticsWeeklyActivityNoComparisonLabel: "Ingen sammenligning ennå",
	statisticsWeeklyActivityNoChangeLabel: "Ingen endring fra forrige uke",
	statisticsWeeklyActivityNote: "Øv jevnlig.",
	statisticsWeekdayMonday: "Man",
	statisticsWeekdayTuesday: "Tir",
	statisticsWeekdayWednesday: "Ons",
	statisticsWeekdayThursday: "Tor",
	statisticsWeekdayFriday: "Fre",
	statisticsWeekdaySaturday: "Lør",
	statisticsWeekdaySunday: "Søn",
	statisticsActivityHourShort: "t",
	statisticsActivityMinuteShort: "min",
	statisticsAttemptScoreLabel: "Score",
	statisticsLoadErrorMessage: "Kunne ikke laste statistikken din.",
	statisticsEmptyValueLabel: "—",
	statisticsHeroTitlePrefix: "Du har øvd",
	statisticsHeroTitleUnitSingular: "gang",
	statisticsHeroTitleUnitPlural: "ganger",
	statisticsTrendPointLabel: "Forsøk",
	statisticsAttemptUnitSingular: "forsøk",
	statisticsAttemptUnitPlural: "forsøk",
	statisticsOfLabel: "av",
	statisticsQuestionUnitSingular: "spørsmål",
	statisticsQuestionUnitPlural: "spørsmål",
	statisticsExamUnitSingular: "eksamen",
	statisticsExamUnitPlural: "eksamener",
	statisticsAttemptFallbackTitlePrefix: "Eksamen",
	statisticsAttemptPointUnit: "poeng"
};

const text = createStatisticsTextModel(translations);
const formatDate = (value) => value ? `dato:${value}` : null;

describe("createStatisticsDashboardModel", () => {
	test("creates empty dashboard state without computing historical improvement", () => {
		const result = createStatisticsDashboardModel(null, formatDate, text);

		expect(result.isStatisticsEmpty).toBe(true);
		expect(result.hero).toEqual({
			title: "Du har ingen forsøk ennå",
			body: "Lever en eksamen først.",
			progressPercentage: 0,
			progressLabel: "Snittscore",
			meterClassName: "statistics-hero-meter",
			meterValueLabel: "—",
			meterDescription: "Snittscore"
		});
		expect(result.kpiGridLabel).toBe("Statistikk nøkkeltall");
		expect(result.kpiCards.map((card) => card.tone)).toEqual(["blue", "green", "purple", "orange"]);
		expect(result.kpiCards.every((card) => card.sparkline === null)).toBe(true);
	});

	test("normalizes backend statistics for the view", () => {
		const result = createStatisticsDashboardModel({
			attemptCount: "2",
			averageScorePercentage: "74.44",
			bestScorePercentage: 92,
			totalCorrectAnswers: "12",
			totalQuestions: "16",
			uniqueExamCount: "1",
			scoreTrend: [
				{
					attemptId: "a1",
					submittedAt: "2026-06-11T12:00:00.000Z",
					percentage: "70",
					scorePoints: "14",
					totalPoints: "20"
				},
				{
					attemptId: "a2",
					submittedAt: "2026-06-12T12:00:00.000Z",
					percentage: null,
					scorePoints: "0",
					totalPoints: "20"
				}
			],
			recentAttempts: [
				{
					attemptId: "a2",
					examId: "in5431-exam-1-no",
					submittedAt: "2026-06-12T12:00:00.000Z",
					percentage: "74.44",
					scorePoints: "12",
					totalPoints: "16"
				}
			],
			weeklyActivity: {
				totalMinutesThisWeek: "165",
				changePercentageFromPreviousWeek: "35",
				days: [
					{ key: "mon", label: "Man", totalMinutes: "35", attemptCount: "1" },
					{ key: "tue", label: "Tir", totalMinutes: "45", attemptCount: "1" },
					{ key: "wed", label: "Ons", totalMinutes: "55", attemptCount: "1" },
					{ key: "thu", label: "Tor", totalMinutes: "30", attemptCount: "1" }
				]
			}
		}, formatDate, text);

		expect(result.isStatisticsEmpty).toBe(false);
		expect(result.hero.meterValueLabel).toBe("74.4 %");
		expect(result.hero.meterClassName).toBe("statistics-hero-meter");
		expect(result.kpiCards.map((card) => card.value)).toEqual(["74.4 %", "92 %", "12", "1"]);
		expect(result.kpiCards.map((card) => card.tone)).toEqual(["blue", "green", "purple", "orange"]);
		expect(result.kpiCards.map((card) => card.sparkline)).toEqual([
			null,
			null,
			{ type: "bar", points: [14, 0] },
			null
		]);
		expect(result.scoreTrendChart.points).toHaveLength(1);
		expect(result.scoreTrendChart.points[0]).toMatchObject({
			id: "a1",
			name: "Forsøk 1",
			dateLabel: "dato:2026-06-11T12:00:00.000Z",
			percentageLabel: "70 %",
			scoreLabel: "14 / 20 poeng"
		});
		expect(result.recentAttempts[0]).toMatchObject({
			id: "a2",
			examTitle: "Eksamen in5431-exam-1-no",
			submittedAtLabel: "dato:2026-06-12T12:00:00.000Z",
			percentageLabel: "74.4 %",
			pointsLabel: "12 / 16 poeng",
			tone: "purple"
		});
		expect(result.recommendedExam).toEqual({
			examId: "in5431-exam-1-no",
			title: "Eksamen in5431-exam-1-no",
			body: "Laveste score blant siste forsøk.",
			badgeLabel: "Anbefalt"
		});
	});

	test("builds meaningful sparkline data per KPI from scoreTrend", () => {
		const result = createStatisticsDashboardModel({
			attemptCount: 3,
			averageScorePercentage: 60,
			bestScorePercentage: 80,
			totalCorrectAnswers: 10,
			totalQuestions: 20,
			uniqueExamCount: 1,
			scoreTrend: [
				{ attemptId: "a1", submittedAt: "2026-06-10", percentage: 40, scorePoints: 8, totalPoints: 20 },
				{ attemptId: "a2", submittedAt: "2026-06-11", percentage: 60, scorePoints: 12, totalPoints: 20 },
				{ attemptId: "a3", submittedAt: "2026-06-12", percentage: 80, scorePoints: 16, totalPoints: 20 }
			],
			recentAttempts: []
		}, formatDate, text);

		const sparklines = result.kpiCards.map((card) => card.sparkline);

		expect(sparklines[0]).toEqual({ type: "line", points: [40, 50, 60] });
		expect(sparklines[1]).toEqual({ type: "line", points: [40, 60, 80] });
		expect(sparklines[2]).toEqual({ type: "bar", points: [8, 12, 16] });
		expect(sparklines[3]).toBe(null);
	});
});

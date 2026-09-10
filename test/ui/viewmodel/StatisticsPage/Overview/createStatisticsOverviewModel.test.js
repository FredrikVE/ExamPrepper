// test/ui/viewmodel/StatisticsPage/Overview/createStatisticsOverviewModel.test.js
import { describe, expect, test } from "@jest/globals";
import { DEFAULT_STATISTICS_MASTERY_SCOPE, SORT_DIRECTION, STATISTICS_CHART_LAYOUT_MODES, STATISTICS_CHART_PERIODS, STATISTICS_HISTORY_SORT, STATISTICS_MASTERY_SCOPE_KINDS, STATISTICS_PERIODS } from "../../../../../src/constants/StatisticsContracts.js";
import { LANGUAGES } from "../../../../../src/i18n/translations.js";
import createStatisticsOverviewModel from "../../../../../src/ui/viewmodel/StatisticsPage/Overview/createStatisticsOverviewModel.js";

const SUBJECT = Object.freeze({ id: "in2120", name: "Objektorientert programmering", icon: "code" });

function createText() {
	return {
		developmentTitle: "Mastery development",
		createDevelopmentSubtitle: (scopeLabel) => `Development of ${scopeLabel}`,
		periodLabel: "Period",
		previousPeriodLabel: "Previous periods",
		nextPeriodLabel: "Next periods",
		periodOptions: [
			{ key: STATISTICS_CHART_PERIODS.TODAY, label: "Today" },
			{ key: STATISTICS_CHART_PERIODS.WEEK, label: "1 week" },
			{ key: STATISTICS_CHART_PERIODS.MONTH, label: "1 month" }
		],
		createPeriodRangeLabel: (startLabel, endLabel) => `${startLabel} – ${endLabel}`,
		weekdayShortLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		monthShortLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		dailyBestLabel: "Today's best",
		averageLabel: "Average",
		subjectMasteryLabel: "Overall mastery",
		createSubjectScopeLabel: (subjectName) => `${subjectName} overall`,
		progressLabel: "Progress",
		createProgressAttemptSummaryLabel: (count) => `Last ${count} attempts`,
		emptyValueLabel: "—",
		summaryLabel: "Summary",
		completedLabel: "Completed",
		completedUnitLabel: "attempts",
		createChartLabel: (scopeLabel) => `Chart ${scopeLabel}`,
		chartEmptyLabel: "No chart",
		chaptersTitle: "Chapters",
		chaptersSubtitle: "Chapter subtitle",
		masteryLabel: "Mastery",
		chaptersCarouselLabel: "Chapters",
		chaptersPreviousLabel: "Previous chapters",
		chaptersNextLabel: "Next chapters",
		chaptersShowAllLabel: "Show all chapters",
		chaptersShowLessLabel: "Show fewer chapters",
		historyTitle: "History",
		historySubtitle: "History subtitle",
		historyDateLabel: "Date",
		historyNameLabel: "Attempt",
		historyStatusLabel: "Status",
		historyScoreLabel: "Result",
		historyDetailsLabel: "Details",
		historyShowDetailsLabel: "Show details",
		historyHideDetailsLabel: "Hide details",
		historyStatusGoodLabel: "Good",
		historyStatusAttentionLabel: "Watch",
		historyStatusRiskLabel: "Risk",
		historyStatusNotAssessedLabel: "Not assessed",
		historyPointsLabel: "Points",
		historyCorrectAnswersLabel: "Correct answers",
		historyIncorrectAnswersLabel: "Incorrect answers",
		historyTimeUsedLabel: "Time used",
		historyShowLessLabel: "Show less",
		historyShowAllLabel: "Show all",
		historyPagerLabel: "History pages",
		historyPreviousPageLabel: "Previous",
		historyNextPageLabel: "Next",
		createPercentageLabel: (value) => value === null ? "—" : `${value} %`,
		createPercentagePointNumberLabel: (value) => `${value} %`,
		createPercentagePointUnitLabel: () => "pp",
		createPointsLabel: (score, total) => `${score}/${total}`,
		createCorrectCountLabel: (count) => `${count} correct`,
		createIncorrectCountLabel: (count) => `${count} incorrect`,
		createDurationSecondsLabel: (seconds) => `${seconds} s`,
		createGoToHistoryPageLabel: (page) => `Go to ${page}`,
		createHistoryPageCounterLabel: (page, count) => `${page}/${count}`
	};
}

function createDevelopmentPeriod(period, windowStartAt, masteryPercentage, progressPercentagePoints, progressEvidenceCount) {
	const pointOccurredAt = "2026-09-01T10:00:00.000Z";

	return {
		period,
		windowStartAt,
		windowEndAt: "2026-09-07T12:00:00.000Z",
		progressPercentagePoints,
		progressEvidenceCount,
		chartPoints: [{ key: `${period}-point`, occurredAt: pointOccurredAt, occurredAtEpochMs: Date.parse(pointOccurredAt), percentage: masteryPercentage, evidenceCount: 1 }]
	};
}

function createPeriods(masteryPercentage) {
	return [
		createDevelopmentPeriod(STATISTICS_PERIODS.WEEK, "2026-08-31T12:00:00.000Z", masteryPercentage, 5, 2),
		createDevelopmentPeriod(STATISTICS_PERIODS.MONTH, "2026-08-07T12:00:00.000Z", masteryPercentage, 10, 4),
		createDevelopmentPeriod(STATISTICS_PERIODS.THREE_MONTHS, "2026-06-07T12:00:00.000Z", masteryPercentage, 20, 7),
		createDevelopmentPeriod(STATISTICS_PERIODS.SIX_MONTHS, "2026-03-07T12:00:00.000Z", masteryPercentage, 20, 9),
		createDevelopmentPeriod(STATISTICS_PERIODS.YEAR, "2025-09-07T12:00:00.000Z", masteryPercentage, 20, 12),
		createDevelopmentPeriod(STATISTICS_PERIODS.ALL, "2025-01-10T12:00:00.000Z", masteryPercentage, masteryPercentage, 28)
	];
}

function createStatistics() {
	return {
		subjectId: "in2120",
		completedAttemptCount: 28,
		subjectMastery: { masteryPercentage: 23.4, performanceBand: "practice", developmentPeriods: createPeriods(23.4) },
		attempts: [
			{
				attemptId: "attempt-history",
				title: "Exam 1",
				submittedAt: "2026-09-01T10:00:00.000Z",
				submittedAtEpochMs: 1,
				percentage: 70,
				performanceBand: "progress",
				scorePoints: 7,
				totalPoints: 10,
				correctCount: 7,
				incorrectCount: 3,
				durationSeconds: 120
			}
		],
		chapters: [
			{
				topicAreaKey: "chapter-1",
				labelNo: "Kapittel 1",
				labelEn: "Chapter 1",
				iconKey: null,
				position: 1,
				masteryPercentage: 79.6,
				performanceBand: "understood",
				developmentPeriods: createPeriods(79.6)
			}
		]
	};
}

function createModel(statistics, period, masteryScope = DEFAULT_STATISTICS_MASTERY_SCOPE) {
	return createStatisticsOverviewModel({
		statistics,
		period,
		masteryScope,
		historySortKey: STATISTICS_HISTORY_SORT.DATE,
		historySortDirection: SORT_DIRECTION.DESC,
		historyExpanded: false,
		historyPage: 0,
		formatDate: (value) => value.slice(0, 10),
		language: LANGUAGES.NO,
		subject: SUBJECT,
		text: createText()
	});
}

describe("createStatisticsOverviewModel", () => {
	test("sentinel-banen validerer ikke backend-kontrakten", () => {
		expect(() => createModel(null, STATISTICS_PERIODS.WEEK)).not.toThrow();
	});

	test("defaults Development to the whole-subject mastery scope", () => {
		const model = createModel(createStatistics(), STATISTICS_PERIODS.THREE_MONTHS);

		expect(model.development.masteryValue).toBe("—");
		expect(model.development.masteryLabel).toBe("Today's best");
		expect(model.development.subtitle).toContain("Objektorientert programmering overall");
		expect(model.development.chartPoints[0]).toMatchObject({ key: "3m-point", value: 23.4, label: "2026-09-01", isLatest: true });
		expect(model.summary.progressNumberValue).toBe("20 %");
		expect(model.summary.progressAttemptSummaryLabel).toBe("Last 7 attempts");
		expect(model.chapters.items[0]).toMatchObject({ key: "subject", isSubject: true, isSelected: true, masteryPercentageLabel: "23 %", masteryLabel: "Overall mastery" });
		expect(model.chapters.items[1]).toMatchObject({ key: "chapter-1", isSubject: false, isSelected: false, masteryPercentageLabel: "80 %" });
	});

	test("switches Development and progress to the selected chapter scope", () => {
		const scope = { kind: STATISTICS_MASTERY_SCOPE_KINDS.TOPIC_AREA, topicAreaKey: "chapter-1" };
		const model = createModel(createStatistics(), STATISTICS_PERIODS.WEEK, scope);

		expect(model.development.masteryValue).toBe("—");
		expect(model.development.masteryLabel).toBe("Today's best");
		expect(model.development.subtitle).toContain("Kapittel 1");
		expect(model.development.chartPoints[0].value).toBe(79.6);
		expect(model.summary.progressAttemptSummaryLabel).toBe("Last 2 attempts");
		expect(model.chapters.items[0].isSelected).toBe(false);
		expect(model.chapters.items[1].isSelected).toBe(true);
	});

	test("I dag viser alle dagens punkter i tidsrekkefølge og beregner dagens beste og synlig gjennomsnitt", () => {
		const statistics = createStatistics();
		const week = statistics.subjectMastery.developmentPeriods.find((developmentPeriod) => developmentPeriod.period === STATISTICS_PERIODS.WEEK);
		const yesterdayAt = new Date(2026, 8, 8, 18, 0, 0, 0).toISOString();
		const todayAAt = new Date(2026, 8, 9, 9, 0, 0, 0).toISOString();
		const todayBAt = new Date(2026, 8, 9, 12, 0, 0, 0).toISOString();
		const todayCAt = new Date(2026, 8, 9, 15, 0, 0, 0).toISOString();
		week.windowEndAt = new Date(2026, 8, 9, 20, 0, 0, 0).toISOString();
		week.chartPoints = [
			{ key: "yesterday", occurredAt: yesterdayAt, occurredAtEpochMs: Date.parse(yesterdayAt), percentage: 30, evidenceCount: 1 },
			{ key: "today-a", occurredAt: todayAAt, occurredAtEpochMs: Date.parse(todayAAt), percentage: 40, evidenceCount: 1 },
			{ key: "today-b", occurredAt: todayBAt, occurredAtEpochMs: Date.parse(todayBAt), percentage: 70, evidenceCount: 1 },
			{ key: "today-c", occurredAt: todayCAt, occurredAtEpochMs: Date.parse(todayCAt), percentage: 55, evidenceCount: 1 }
		];

		const model = createModel(statistics, STATISTICS_CHART_PERIODS.TODAY);

		expect(model.development.period).toBe(STATISTICS_CHART_PERIODS.TODAY);
		expect(model.development.periodOptions.map((option) => option.key)).toEqual([STATISTICS_CHART_PERIODS.TODAY, STATISTICS_CHART_PERIODS.WEEK, STATISTICS_CHART_PERIODS.MONTH]);
		expect(model.development.chartLayoutMode).toBe(STATISTICS_CHART_LAYOUT_MODES.COMPACT);
		expect(model.development.chartPoints.map((point) => point.key)).toEqual(["today-a", "today-b", "today-c"]);
		expect(model.development.chartPoints.map((point) => point.positionPercent)).toEqual([0, 50, 100]);
		expect(model.development.chartAxisTicks.map((tick) => tick.label)).toEqual(["09:00", "12:00", "15:00"]);
		expect(model.development.masteryLabel).toBe("Today's best");
		expect(model.development.masteryValue).toBe("70 %");
		expect(model.development.averageValue).toBe("55 %");
		expect(model.summary.progressAttemptSummaryLabel).toBe("Last 3 attempts");
	});

	test("skjuler I dag uten dagens data og faller tilbake til 1 uke hvis I dag var valgt", () => {
		const statistics = createStatistics();
		const model = createModel(statistics, STATISTICS_CHART_PERIODS.TODAY);

		expect(model.development.period).toBe(STATISTICS_CHART_PERIODS.WEEK);
		expect(model.development.periodOptions.map((option) => option.key)).toEqual([STATISTICS_CHART_PERIODS.WEEK, STATISTICS_CHART_PERIODS.MONTH]);
		expect(model.development.chartPoints.map((point) => point.key)).toEqual(["1w-point"]);
	});

	test("1 uke pakker aktive dager sammen og beholder bare tomme dager etter siste datapunkt", () => {
		const statistics = createStatistics();
		const week = statistics.subjectMastery.developmentPeriods.find((developmentPeriod) => developmentPeriod.period === STATISTICS_PERIODS.WEEK);
		week.windowEndAt = "2026-09-13T18:00:00.000Z";
		week.chartPoints = [
			{ key: "wed", occurredAt: "2026-09-09T10:00:00.000Z", occurredAtEpochMs: Date.parse("2026-09-09T10:00:00.000Z"), percentage: 35, evidenceCount: 1 },
			{ key: "fri-a", occurredAt: "2026-09-11T09:00:00.000Z", occurredAtEpochMs: Date.parse("2026-09-11T09:00:00.000Z"), percentage: 50, evidenceCount: 1 },
			{ key: "fri-best", occurredAt: "2026-09-11T12:00:00.000Z", occurredAtEpochMs: Date.parse("2026-09-11T12:00:00.000Z"), percentage: 80, evidenceCount: 1 },
			{ key: "fri-later", occurredAt: "2026-09-11T15:00:00.000Z", occurredAtEpochMs: Date.parse("2026-09-11T15:00:00.000Z"), percentage: 65, evidenceCount: 1 }
		];

		const model = createModel(statistics, STATISTICS_CHART_PERIODS.WEEK);

		expect(model.development.chartLayoutMode).toBe(STATISTICS_CHART_LAYOUT_MODES.COMPACT);
		expect(model.development.chartPoints.map((point) => point.key)).toEqual(["wed", "fri-best"]);
		expect(model.development.chartPoints[0].positionPercent).toBe(0);
		expect(model.development.chartPoints[1].positionPercent).toBeCloseTo(100 / 3);
		expect(model.development.chartAxisTicks.map((tick) => tick.label)).toEqual(["Wed", "Fri", "Sat", "Sun"]);
		expect(model.development.chartAxisTicks[0].positionPercent).toBe(0);
		expect(model.development.chartAxisTicks[1].positionPercent).toBeCloseTo(100 / 3);
		expect(model.development.chartAxisTicks[2].positionPercent).toBeCloseTo(200 / 3);
		expect(model.development.chartAxisTicks[3].positionPercent).toBe(100);
		expect(model.development.averageValue).toBe("58 %");
		expect(model.development.masteryValue).toBe("—");
	});

	test("1 mnd viser bare dagens beste resultat per aktiv kalenderdag i kompakte slots", () => {
		const statistics = createStatistics();
		const month = statistics.subjectMastery.developmentPeriods.find((developmentPeriod) => developmentPeriod.period === STATISTICS_PERIODS.MONTH);
		month.windowStartAt = "2026-08-10T10:00:00.000Z";
		month.windowEndAt = "2026-09-10T10:00:00.000Z";
		month.chartPoints = [
			{ key: "month-sep-07", occurredAt: "2026-09-07T10:00:00.000Z", occurredAtEpochMs: Date.parse("2026-09-07T10:00:00.000Z"), percentage: 10, evidenceCount: 1 },
			{ key: "month-sep-09-a", occurredAt: "2026-09-09T09:00:00.000Z", occurredAtEpochMs: Date.parse("2026-09-09T09:00:00.000Z"), percentage: 28, evidenceCount: 1 },
			{ key: "month-sep-09-best", occurredAt: "2026-09-09T12:00:00.000Z", occurredAtEpochMs: Date.parse("2026-09-09T12:00:00.000Z"), percentage: 90, evidenceCount: 1 },
			{ key: "month-sep-09-later", occurredAt: "2026-09-09T15:00:00.000Z", occurredAtEpochMs: Date.parse("2026-09-09T15:00:00.000Z"), percentage: 63, evidenceCount: 1 },
			{ key: "month-sep-10", occurredAt: "2026-09-10T10:00:00.000Z", occurredAtEpochMs: Date.parse("2026-09-10T10:00:00.000Z"), percentage: 100, evidenceCount: 1 }
		];

		const model = createModel(statistics, STATISTICS_PERIODS.MONTH);

		expect(model.development.chartLayoutMode).toBe(STATISTICS_CHART_LAYOUT_MODES.COMPACT);
		expect(model.development.chartPoints.map((point) => point.key)).toEqual(["month-sep-07", "month-sep-09-best", "month-sep-10"]);
		expect(model.development.chartPoints.map((point) => point.value)).toEqual([10, 90, 100]);
		expect(model.development.chartAxisTicks.map((tick) => tick.label)).toEqual(["2026-09-07", "2026-09-09", "2026-09-10"]);
		expect(model.development.chartPoints.map((point) => point.positionPercent)).toEqual([0, 50, 100]);
		expect(model.development.averageValue).toBe("67 %");
	});

	test("3 mnd, 6 mnd og 1 år bruker kalenderens månedsakse i stedet for å strekke første og siste datapunkt", () => {
		const statistics = createStatistics();
		const windows = [
			{ period: STATISTICS_CHART_PERIODS.THREE_MONTHS, start: "2026-06-10T10:00:00.000Z", expectedLabels: ["Jul", "Aug", "Sep"] },
			{ period: STATISTICS_CHART_PERIODS.SIX_MONTHS, start: "2026-03-10T10:00:00.000Z", expectedLabels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"] },
			{ period: STATISTICS_CHART_PERIODS.YEAR, start: "2025-09-10T10:00:00.000Z", expectedLabels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"] }
		];

		for (const window of windows) {
			const metrics = statistics.subjectMastery.developmentPeriods.find((developmentPeriod) => developmentPeriod.period === window.period);
			metrics.windowStartAt = window.start;
			metrics.windowEndAt = "2026-09-10T10:00:00.000Z";
			metrics.chartPoints = [
				{ key: `${window.period}-sep-07`, occurredAt: "2026-09-07T10:00:00.000Z", occurredAtEpochMs: Date.parse("2026-09-07T10:00:00.000Z"), percentage: 10, evidenceCount: 1 },
				{ key: `${window.period}-sep-09`, occurredAt: "2026-09-09T10:00:00.000Z", occurredAtEpochMs: Date.parse("2026-09-09T10:00:00.000Z"), percentage: 90, evidenceCount: 1 },
				{ key: `${window.period}-sep-10`, occurredAt: "2026-09-10T10:00:00.000Z", occurredAtEpochMs: Date.parse("2026-09-10T10:00:00.000Z"), percentage: 100, evidenceCount: 1 }
			];

			const model = createModel(statistics, window.period);

			expect(model.development.chartAxisTicks.map((tick) => tick.label)).toEqual(window.expectedLabels);
			expect(model.development.chartPoints.map((point) => point.key)).toEqual([`${window.period}-sep-07`, `${window.period}-sep-09`, `${window.period}-sep-10`]);
			expect(model.development.chartPoints[0].positionPercent).toBeGreaterThan(95);
			expect(model.development.chartPoints[2].positionPercent).toBe(100);
		}
	});

	test("Alt viser alle datapunkter sekvensielt uten tomrom mellom manglende datoer", () => {
		const statistics = createStatistics();
		const allMetrics = statistics.subjectMastery.developmentPeriods.find((developmentPeriod) => developmentPeriod.period === STATISTICS_PERIODS.ALL);
		allMetrics.windowStartAt = "2026-09-07T10:00:00.000Z";
		allMetrics.windowEndAt = "2026-09-10T10:00:00.000Z";
		allMetrics.chartPoints = [
			{ key: "all-sep-07", occurredAt: "2026-09-07T10:00:00.000Z", occurredAtEpochMs: Date.parse("2026-09-07T10:00:00.000Z"), percentage: 10, evidenceCount: 1 },
			{ key: "all-sep-09", occurredAt: "2026-09-09T10:00:00.000Z", occurredAtEpochMs: Date.parse("2026-09-09T10:00:00.000Z"), percentage: 90, evidenceCount: 1 },
			{ key: "all-sep-10", occurredAt: "2026-09-10T10:00:00.000Z", occurredAtEpochMs: Date.parse("2026-09-10T10:00:00.000Z"), percentage: 100, evidenceCount: 1 }
		];

		const model = createModel(statistics, STATISTICS_PERIODS.ALL);

		expect(model.development.chartLayoutMode).toBe(STATISTICS_CHART_LAYOUT_MODES.SEQUENCE);
		expect(model.development.chartPoints.map((point) => point.key)).toEqual(["all-sep-07", "all-sep-09", "all-sep-10"]);
		expect(model.development.chartPoints.map((point) => point.positionPercent)).toEqual([0, 50, 100]);
		expect(model.development.chartAxisTicks.map((tick) => tick.label)).toEqual(["2026-09-07", "2026-09-09", "2026-09-10"]);
		expect(model.development.averageValue).toBe("67 %");
	});
	test("keeps attempt history independent from the selected mastery scope", () => {
		const scope = { kind: STATISTICS_MASTERY_SCOPE_KINDS.TOPIC_AREA, topicAreaKey: "chapter-1" };
		const model = createModel(createStatistics(), STATISTICS_PERIODS.WEEK, scope);

		expect(model.history.items[0].attemptId).toBe("attempt-history");
		expect(model.history.items[0].statusLabel).toBe("Watch");
	});

	test("fails fast when the selected topic-area scope is absent from loaded Statistics", () => {
		const scope = { kind: STATISTICS_MASTERY_SCOPE_KINDS.TOPIC_AREA, topicAreaKey: "missing" };

		expect(() => createModel(createStatistics(), STATISTICS_PERIODS.WEEK, scope)).toThrow("Missing Statistics mastery scope missing");
	});

	test("bevarer utviklings- og kapittelevidens uten exam attempts", () => {
		const statistics = createStatistics();
		statistics.attempts = [];
		statistics.completedAttemptCount = 0;
		const model = createModel(statistics, STATISTICS_PERIODS.WEEK);

		expect(model.development.hasEvidence).toBe(true);
		expect(model.chapters.hasEvidence).toBe(true);
		expect(model.development.masteryValue).toBe("—");
		expect(model.summary.completedValue).toBe("0");
	});

	test("kapittelevidens leser rå kapitler og ignorerer fag-scope sin nullsemantikk", () => {
		const statistics = createStatistics();
		statistics.subjectMastery.masteryPercentage = 0;
		statistics.chapters[0].masteryPercentage = null;
		const model = createModel(statistics, STATISTICS_PERIODS.WEEK);

		expect(model.chapters.hasEvidence).toBe(false);
	});

	test("lastet Statistics uten ALL-periode feiler høyt", () => {
		const statistics = createStatistics();
		statistics.subjectMastery.developmentPeriods = statistics.subjectMastery.developmentPeriods.filter((developmentPeriod) => developmentPeriod.period !== STATISTICS_PERIODS.ALL);

		expect(() => createModel(statistics, STATISTICS_PERIODS.WEEK)).toThrow("Missing Statistics development period all");
	});
});

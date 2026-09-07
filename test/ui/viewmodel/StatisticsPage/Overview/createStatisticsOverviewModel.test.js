// test/ui/viewmodel/StatisticsPage/Overview/createStatisticsOverviewModel.test.js
import { describe, expect, test } from "@jest/globals";
import { LANGUAGES } from "../../../../../src/i18n/translations.js";
import { SORT_DIRECTION, STATISTICS_HISTORY_SORT, STATISTICS_PERIODS } from "../../../../../src/constants/StatisticsContracts.js";
import createStatisticsOverviewModel from "../../../../../src/ui/viewmodel/StatisticsPage/Overview/createStatisticsOverviewModel.js";

function createText() {
	return {
		developmentTitle: "Development",
		developmentSubtitle: "Development subtitle",
		periodLabel: "Period",
		previousPeriodLabel: "Previous periods",
		nextPeriodLabel: "Next periods",
		periodOptions: [],
		createPeriodRangeLabel: (startLabel, endLabel) => `${startLabel} – ${endLabel}`,
		averageScoreLabel: "Average",
		progressLabel: "Progress",
		createProgressAttemptContextLabel: (count) => `(last ${count} attempts)`,
		emptyValueLabel: "—",
		summaryLabel: "Summary",
		completedLabel: "Completed",
		completedUnitLabel: "attempts",
		chartLabel: "Chart",
		chartEmptyLabel: "No chart",
		chaptersTitle: "Chapters",
		chaptersSubtitle: "Chapter subtitle",
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
		createPercentageLabel: (value) => {
			if (value === null) {
				return "—";
			}

			return `${value} %`;
		},
		createPercentagePointShortLabel: (value) => `${createSignedNumberLabel(value)} pp`,
		createPercentagePointNumberLabel: (value) => `${createSignedNumberLabel(value)} %`,
		createPercentagePointUnitLabel: () => "pp",
		createEvidenceCountLabel: (count) => `${count} attempts`,
		createPointsLabel: (score, total) => `${score}/${total}`,
		createCorrectCountLabel: (count) => `${count} correct`,
		createIncorrectCountLabel: (count) => `${count} incorrect`,
		createDurationSecondsLabel: (seconds) => `${seconds} s`,
		createGoToHistoryPageLabel: (page) => `Go to ${page}`,
		createHistoryPageCounterLabel: (page, count) => `${page}/${count}`
	};
}


function createSignedNumberLabel(value) {
	if (value > 0) {
		return `+${value}`;
	}

	return String(value);
}

function createStatistics() {
	return {
		subjectId: "in2120",
		completedAttemptCount: 28,
		developmentPeriods: [
			createDevelopmentPeriod(STATISTICS_PERIODS.WEEK, "2026-08-31T12:00:00.000Z", 90, 5, 2, []),
			createDevelopmentPeriod(STATISTICS_PERIODS.MONTH, "2026-08-07T12:00:00.000Z", 80, 10, 4, []),
			createDevelopmentPeriod(
				STATISTICS_PERIODS.THREE_MONTHS,
				"2026-06-07T12:00:00.000Z",
				70,
				20,
				7,
				[{ attemptId: "attempt-chart", submittedAt: "2026-09-01T10:00:00.000Z", submittedAtEpochMs: 1, percentage: 70 }]
			),
			createDevelopmentPeriod(STATISTICS_PERIODS.SIX_MONTHS, "2026-03-07T12:00:00.000Z", 60, 15, 9, []),
			createDevelopmentPeriod(STATISTICS_PERIODS.YEAR, "2025-09-07T12:00:00.000Z", 50, 10, 12, []),
			createDevelopmentPeriod(STATISTICS_PERIODS.ALL, "2025-01-10T12:00:00.000Z", 40, 5, 28, [])
		],
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
				scorePercentage: 80,
				performanceBand: "understood",
				evidenceCount: 4
			}
		]
	};
}

function createDevelopmentPeriod(period, windowStartAt, averageScorePercentage, progressPercentagePoints, progressAttemptCount, chartPoints) {
	return {
		period,
		windowStartAt,
		windowEndAt: "2026-09-07T12:00:00.000Z",
		averageScorePercentage,
		progressPercentagePoints,
		progressAttemptCount,
		chartPoints
	};
}

function createModel(statistics, period) {
	return createStatisticsOverviewModel({
		statistics,
		period,
		historySortKey: STATISTICS_HISTORY_SORT.DATE,
		historySortDirection: SORT_DIRECTION.DESC,
		historyExpanded: false,
		historyPage: 0,
		formatDate: (value) => value.slice(0, 10),
		language: LANGUAGES.NO,
		text: createText()
	});
}

describe("createStatisticsOverviewModel", () => {
	test("presents the backend-computed selected development period without recalculating it", () => {
		const model = createModel(createStatistics(), STATISTICS_PERIODS.THREE_MONTHS);

		expect(model.development.averageScoreValue).toBe("70 %");
		expect(model.development.progressValue).toBe("+20 pp");
		expect(model.development.progressAttemptContextLabel).toBe("(last 7 attempts)");
		expect(model.development.chartPoints).toEqual([
			{ key: "attempt-chart", value: 70, label: "2026-09-01", valueLabel: "70 %", isLatest: true }
		]);
		expect(model.development.chartAxisStartLabel).toBe("2026-06-07");
		expect(model.development.chartAxisEndLabel).toBe("2026-09-07");
		expect(model.development.periodRangeLabel).toBe("2026-06-07 – 2026-09-07");
		expect(model.summary.completedValue).toBe("28");
		expect(model.summary.progressNumberValue).toBe("+20 %");
		expect(model.summary.progressUnitLabel).toBe("pp");
		expect(model.summary.hasProgress).toBe(true);
	});

	test("switches the complete Development presentation to the selected backend zoom period", () => {
		const statistics = createStatistics();
		const week = createModel(statistics, STATISTICS_PERIODS.WEEK);
		const year = createModel(statistics, STATISTICS_PERIODS.YEAR);

		expect(week.development.period).toBe(STATISTICS_PERIODS.WEEK);
		expect(week.development.averageScoreValue).toBe("90 %");
		expect(week.development.progressValue).toBe("+5 pp");
		expect(week.development.progressAttemptContextLabel).toBe("(last 2 attempts)");
		expect(week.development.periodRangeLabel).toBe("2026-08-31 – 2026-09-07");
		expect(year.development.period).toBe(STATISTICS_PERIODS.YEAR);
		expect(year.development.averageScoreValue).toBe("50 %");
		expect(year.development.progressValue).toBe("+10 pp");
		expect(year.development.progressAttemptContextLabel).toBe("(last 12 attempts)");
		expect(year.development.periodRangeLabel).toBe("2025-09-07 – 2026-09-07");
	});

	test("passes backend performance bands through the presentation boundary", () => {
		const model = createModel(createStatistics(), STATISTICS_PERIODS.THREE_MONTHS);

		expect(model.chapters.items[0].performanceBand).toBe("understood");
		expect(model.chapters.items[0].performanceTone).toBe("positive");
		expect(model.history.items[0].performanceBand).toBe("progress");
		expect(model.history.items[0].statusLabel).toBe("Watch");
		expect(model.history.items[0].statusTone).toBe("warning");
	});

	test("fails fast when loaded Statistics data omits the selected backend period", () => {
		const statistics = createStatistics();
		statistics.developmentPeriods = statistics.developmentPeriods.filter((developmentPeriod) => developmentPeriod.period !== STATISTICS_PERIODS.THREE_MONTHS);

		expect(() => createModel(statistics, STATISTICS_PERIODS.THREE_MONTHS)).toThrow("Missing Statistics development period 3m");
	});

	test("creates an empty presentation only while no Statistics resource is loaded", () => {
		const model = createModel(null, STATISTICS_PERIODS.THREE_MONTHS);

		expect(model.isEmpty).toBe(true);
		expect(model.development.averageScoreValue).toBe("—");
		expect(model.summary.completedValue).toBe("0");
		expect(model.summary.progressNumberValue).toBe("—");
		expect(model.summary.progressUnitLabel).toBe("");
		expect(model.summary.hasProgress).toBe(false);
		expect(model.development.chartPoints).toEqual([]);
		expect(model.development.periodRangeLabel).toBe("");
	});
});

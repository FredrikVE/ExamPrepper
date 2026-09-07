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
		periodOptions: [],
		averageScoreLabel: "Average",
		progressLabel: "Progress",
		summaryLabel: "Summary",
		completedLabel: "Completed",
		chartLabel: "Chart",
		chartEmptyLabel: "No chart",
		chaptersTitle: "Chapters",
		chaptersSubtitle: "Chapter subtitle",
		historyTitle: "History",
		historySubtitle: "History subtitle",
		historyDateLabel: "Date",
		historyNameLabel: "Name",
		historyScoreLabel: "Score",
		historyShowLessLabel: "Show less",
		historyShowAllLabel: "Show all",
		historyPagerLabel: "History pages",
		historyPreviousPageLabel: "Previous",
		historyNextPageLabel: "Next",
		createPercentageLabel: (value) => value === null ? "—" : `${value} %`,
		createPercentagePointLabel: (value) => `${value} pp`,
		createEvidenceCountLabel: (count) => `${count} attempts`,
		createPointsLabel: (score, total) => `${score}/${total}`,
		createCorrectCountLabel: (count) => `${count} correct`,
		createIncorrectCountLabel: (count) => `${count} incorrect`,
		createDurationSecondsLabel: (seconds) => `${seconds} s`,
		createGoToHistoryPageLabel: (page) => `Go to ${page}`,
		createHistoryPageCounterLabel: (page, count) => `${page}/${count}`
	};
}

function createStatistics() {
	return {
		subjectId: "in2120",
		completedAttemptCount: 28,
		developmentPeriods: [
			{ period: STATISTICS_PERIODS.WEEK, averageScorePercentage: 90, progressPercentagePoints: 5, chartPoints: [] },
			{ period: STATISTICS_PERIODS.MONTH, averageScorePercentage: 80, progressPercentagePoints: 10, chartPoints: [] },
			{
				period: STATISTICS_PERIODS.THREE_MONTHS,
				averageScorePercentage: 70,
				progressPercentagePoints: 20,
				chartPoints: [{ attemptId: "attempt-chart", submittedAt: "2026-09-01T10:00:00.000Z", submittedAtEpochMs: 1, percentage: 70 }]
			},
			{ period: STATISTICS_PERIODS.SIX_MONTHS, averageScorePercentage: 60, progressPercentagePoints: 15, chartPoints: [] },
			{ period: STATISTICS_PERIODS.YEAR, averageScorePercentage: 50, progressPercentagePoints: 10, chartPoints: [] },
			{ period: STATISTICS_PERIODS.ALL, averageScorePercentage: 40, progressPercentagePoints: 5, chartPoints: [] }
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
		expect(model.development.progressValue).toBe("20 pp");
		expect(model.development.chartPoints).toEqual([
			{ key: "attempt-chart", value: 70, label: "2026-09-01", valueLabel: "70 %" }
		]);
		expect(model.summary.completedValue).toBe("28");
	});

	test("passes backend performance bands through the presentation boundary", () => {
		const model = createModel(createStatistics(), STATISTICS_PERIODS.THREE_MONTHS);

		expect(model.chapters.items[0].performanceBand).toBe("understood");
		expect(model.history.items[0].performanceBand).toBe("progress");
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
		expect(model.development.chartPoints).toEqual([]);
	});
});

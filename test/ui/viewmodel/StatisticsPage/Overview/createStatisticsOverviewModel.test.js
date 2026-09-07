// test/ui/viewmodel/StatisticsPage/Overview/createStatisticsOverviewModel.test.js
import { describe, expect, test } from "@jest/globals";
import { DEFAULT_STATISTICS_MASTERY_SCOPE, SORT_DIRECTION, STATISTICS_HISTORY_SORT, STATISTICS_MASTERY_SCOPE_KINDS, STATISTICS_PERIODS } from "../../../../../src/constants/StatisticsContracts.js";
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
		periodOptions: [],
		createPeriodRangeLabel: (startLabel, endLabel) => `${startLabel} – ${endLabel}`,
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
	return {
		period,
		windowStartAt,
		windowEndAt: "2026-09-07T12:00:00.000Z",
		progressPercentagePoints,
		progressEvidenceCount,
		chartPoints: [{ key: `${period}-point`, occurredAt: "2026-09-01T10:00:00.000Z", occurredAtEpochMs: 1, percentage: masteryPercentage, evidenceCount: 1 }]
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
	test("defaults Development to the whole-subject mastery scope", () => {
		const model = createModel(createStatistics(), STATISTICS_PERIODS.THREE_MONTHS);

		expect(model.development.masteryValue).toBe("23 %");
		expect(model.development.masteryLabel).toBe("Overall mastery");
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

		expect(model.development.masteryValue).toBe("80 %");
		expect(model.development.masteryLabel).toBe("Mastery");
		expect(model.development.subtitle).toContain("Kapittel 1");
		expect(model.development.chartPoints[0].value).toBe(79.6);
		expect(model.summary.progressAttemptSummaryLabel).toBe("Last 2 attempts");
		expect(model.chapters.items[0].isSelected).toBe(false);
		expect(model.chapters.items[1].isSelected).toBe(true);
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

	test("does not treat a subject with mastery chapters but no exam attempts as empty", () => {
		const statistics = createStatistics();
		statistics.attempts = [];
		statistics.completedAttemptCount = 0;
		const model = createModel(statistics, STATISTICS_PERIODS.WEEK);

		expect(model.isEmpty).toBe(false);
		expect(model.development.masteryValue).toBe("23 %");
		expect(model.summary.completedValue).toBe("0");
	});
});

// test/ui/viewmodel/StatisticsPage/Overview/createStatisticsHistoryModel.test.js
import { describe, expect, test } from "@jest/globals";
import { ASSESSMENT_BANDS } from "../../../../../src/constants/AssessmentBands.js";
import { SORT_DIRECTION, STATISTICS_HISTORY_SORT } from "../../../../../src/constants/StatisticsContracts.js";
import createStatisticsHistoryModel from "../../../../../src/ui/viewmodel/StatisticsPage/Overview/createStatisticsHistoryModel.js";

const text = {
	historyStatusGoodLabel: "Good",
	historyStatusAttentionLabel: "Watch",
	historyStatusRiskLabel: "Risk",
	historyStatusNotAssessedLabel: "Not assessed",
	historyShowDetailsLabel: "Show details",
	historyHideDetailsLabel: "Hide details",
	historyScoreLabel: "Result",
	historyPointsLabel: "Points",
	historyCorrectAnswersLabel: "Correct",
	historyIncorrectAnswersLabel: "Incorrect",
	historyTimeUsedLabel: "Time",
	createPercentageLabel: (value) => {
		if (value === null) {
			return "—";
		}

		return `${value} %`;
	},
	createPointsLabel: (score, total) => `${score}/${total}`,
	createCorrectCountLabel: (count) => `${count} correct`,
	createIncorrectCountLabel: (count) => `${count} incorrect`,
	createDurationSecondsLabel: (seconds) => `${seconds} s`
};

function createAttempt(index) {
	return {
		attemptId: `attempt-${index}`,
		title: `Attempt ${index}`,
		submittedAt: `2026-09-${String(index).padStart(2, "0")}T12:00:00.000Z`,
		submittedAtEpochMs: index,
		percentage: index,
		performanceBand: ASSESSMENT_BANDS.PROGRESS,
		scorePoints: index,
		totalPoints: 100,
		correctCount: index,
		incorrectCount: 0,
		durationSeconds: index
	};
}

describe("createStatisticsHistoryModel", () => {
	test("shows three rows while collapsed and pages by ten when expanded", () => {
		const attempts = Array.from({ length: 12 }, (_value, index) => createAttempt(index + 1));
		const collapsed = createStatisticsHistoryModel({ attempts, sortKey: STATISTICS_HISTORY_SORT.DATE, sortDirection: SORT_DIRECTION.DESC, expanded: false, page: 0, formatDate: (value) => value, text });
		const expanded = createStatisticsHistoryModel({ attempts, sortKey: STATISTICS_HISTORY_SORT.DATE, sortDirection: SORT_DIRECTION.DESC, expanded: true, page: 1, formatDate: (value) => value, text });

		expect(collapsed.items).toHaveLength(3);
		expect(collapsed.showExpansionToggle).toBe(true);
		expect(collapsed.canToggleExpanded).toBe(true);
		expect(expanded.items).toHaveLength(2);
		expect(expanded.pageCount).toBe(2);
	});

	test("shows the history footer for sparse history without enabling a fake expansion", () => {
		const attempts = [createAttempt(1), createAttempt(2)];
		const model = createStatisticsHistoryModel({ attempts, sortKey: STATISTICS_HISTORY_SORT.DATE, sortDirection: SORT_DIRECTION.DESC, expanded: false, page: 0, formatDate: (value) => value, text });

		expect(model.items).toHaveLength(2);
		expect(model.showExpansionToggle).toBe(true);
		expect(model.canToggleExpanded).toBe(false);
	});

	test("maps backend performance bands to Statistics presentation without score thresholds", () => {
		const attempt = createAttempt(1);
		attempt.performanceBand = ASSESSMENT_BANDS.UNDERSTOOD;
		const model = createStatisticsHistoryModel({ attempts: [attempt], sortKey: STATISTICS_HISTORY_SORT.DATE, sortDirection: SORT_DIRECTION.DESC, expanded: false, page: 0, formatDate: (value) => value, text });

		expect(model.items[0].statusLabel).toBe("Good");
		expect(model.items[0].statusTone).toBe("positive");
		expect(model.items[0].detailMetrics).toHaveLength(5);
	});
});

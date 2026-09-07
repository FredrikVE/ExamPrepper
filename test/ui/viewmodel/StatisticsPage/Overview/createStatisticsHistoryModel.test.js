import { describe, expect, test } from "@jest/globals";
import { SORT_DIRECTION, STATISTICS_HISTORY_SORT } from "../../../../../src/constants/StatisticsContracts.js";
import createStatisticsHistoryModel from "../../../../../src/ui/viewmodel/StatisticsPage/Overview/createStatisticsHistoryModel.js";

const text = {
	createPercentageLabel: (value) => value === null ? "—" : `${value} %`,
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
		const collapsed = createStatisticsHistoryModel({
			attempts,
			sortKey: STATISTICS_HISTORY_SORT.DATE,
			sortDirection: SORT_DIRECTION.DESC,
			expanded: false,
			page: 0,
			formatDate: (value) => value,
			text
		});
		const expanded = createStatisticsHistoryModel({
			attempts,
			sortKey: STATISTICS_HISTORY_SORT.DATE,
			sortDirection: SORT_DIRECTION.DESC,
			expanded: true,
			page: 1,
			formatDate: (value) => value,
			text
		});

		expect(collapsed.items).toHaveLength(3);
		expect(collapsed.canToggleExpanded).toBe(true);
		expect(expanded.items).toHaveLength(2);
		expect(expanded.pageCount).toBe(2);
	});
});

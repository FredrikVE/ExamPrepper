// test/ui/viewmodel/StatisticsPage/Overview/statisticsHistoryComparators.test.js
import { describe, expect, test } from "@jest/globals";
import { SORT_DIRECTION, STATISTICS_HISTORY_SORT } from "../../../../../src/constants/StatisticsContracts.js";
import { createStatisticsHistoryComparator } from "../../../../../src/ui/viewmodel/StatisticsPage/Overview/statisticsHistoryComparators.js";

function createAttempt({ attemptId, title, submittedAtEpochMs, percentage }) {
	return { attemptId, title, submittedAtEpochMs, percentage };
}

describe("createStatisticsHistoryComparator", () => {
	test("keeps null percentages last for both score directions", () => {
		const attempts = [
			createAttempt({ attemptId: "b", title: "B", submittedAtEpochMs: 2, percentage: null }),
			createAttempt({ attemptId: "a", title: "A", submittedAtEpochMs: 1, percentage: 60 }),
			createAttempt({ attemptId: "c", title: "C", submittedAtEpochMs: 3, percentage: 80 })
		];

		const ascending = [...attempts].sort(createStatisticsHistoryComparator({ sortKey: STATISTICS_HISTORY_SORT.SCORE, sortDirection: SORT_DIRECTION.ASC }));
		const descending = [...attempts].sort(createStatisticsHistoryComparator({ sortKey: STATISTICS_HISTORY_SORT.SCORE, sortDirection: SORT_DIRECTION.DESC }));

		expect(ascending.map((attempt) => attempt.percentage)).toEqual([60, 80, null]);
		expect(descending.map((attempt) => attempt.percentage)).toEqual([80, 60, null]);
	});

	test("uses submitted time and lexical attempt id as deterministic tie breakers", () => {
		const attempts = [
			createAttempt({ attemptId: "b", title: "Lik", submittedAtEpochMs: 10, percentage: 50 }),
			createAttempt({ attemptId: "a", title: "Lik", submittedAtEpochMs: 10, percentage: 50 }),
			createAttempt({ attemptId: "c", title: "Lik", submittedAtEpochMs: 20, percentage: 50 })
		];

		const result = [...attempts].sort(createStatisticsHistoryComparator({ sortKey: STATISTICS_HISTORY_SORT.NAME, sortDirection: SORT_DIRECTION.ASC }));

		expect(result.map((attempt) => attempt.attemptId)).toEqual(["c", "a", "b"]);
	});
	test("sorts the status column by backend score evidence without recreating thresholds", () => {
		const attempts = [
			createAttempt({ attemptId: "low", title: "Low", submittedAtEpochMs: 1, percentage: 20 }),
			createAttempt({ attemptId: "high", title: "High", submittedAtEpochMs: 2, percentage: 90 }),
			createAttempt({ attemptId: "mid", title: "Mid", submittedAtEpochMs: 3, percentage: 60 })
		];
		const result = [...attempts].sort(createStatisticsHistoryComparator({ sortKey: STATISTICS_HISTORY_SORT.STATUS, sortDirection: SORT_DIRECTION.DESC }));

		expect(result.map((attempt) => attempt.attemptId)).toEqual(["high", "mid", "low"]);
	});

});

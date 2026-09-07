import { describe, expect, test } from "@jest/globals";
import { STATISTICS_PERIODS } from "../../../../../src/constants/StatisticsContracts.js";
import createStatisticsDevelopmentModel from "../../../../../src/ui/viewmodel/StatisticsPage/Overview/createStatisticsDevelopmentModel.js";

const NOW_EPOCH_MS = Date.parse("2026-09-06T12:00:00.000Z");

function createAttempt({ attemptId, submittedAt, percentage }) {
	return {
		attemptId,
		submittedAt,
		submittedAtEpochMs: Date.parse(submittedAt),
		percentage
	};
}

describe("createStatisticsDevelopmentModel", () => {
	test("filters only development by period and returns chart points oldest-first", () => {
		const attempts = [
			createAttempt({ attemptId: "new", submittedAt: "2026-09-01T12:00:00.000Z", percentage: 80 }),
			createAttempt({ attemptId: "middle", submittedAt: "2026-08-20T12:00:00.000Z", percentage: 60 }),
			createAttempt({ attemptId: "old", submittedAt: "2026-01-01T12:00:00.000Z", percentage: 40 })
		];

		const result = createStatisticsDevelopmentModel({
			attempts,
			period: STATISTICS_PERIODS.MONTH,
			nowEpochMs: NOW_EPOCH_MS,
			formatDate: (value) => value.slice(0, 10)
		});

		expect(result.averageScorePercentage).toBe(70);
		expect(result.progressPercentagePoints).toBeNull();
		expect(result.chartPoints.map((point) => point.key)).toEqual(["middle", "new"]);
	});

	test("ignores unmeasurable attempts instead of treating null as zero", () => {
		const attempts = [
			createAttempt({ attemptId: "measurable", submittedAt: "2026-09-01T12:00:00.000Z", percentage: 75 }),
			createAttempt({ attemptId: "unmeasurable", submittedAt: "2026-08-31T12:00:00.000Z", percentage: null })
		];

		const result = createStatisticsDevelopmentModel({
			attempts,
			period: STATISTICS_PERIODS.ALL,
			nowEpochMs: NOW_EPOCH_MS,
			formatDate: (value) => value
		});

		expect(result.averageScorePercentage).toBe(75);
		expect(result.chartPoints).toHaveLength(1);
	});
});

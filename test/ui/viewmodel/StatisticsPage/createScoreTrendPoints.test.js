// test/ui/viewmodel/StatisticsPage/createScoreTrendPoints.test.js
import { describe, expect, test } from "@jest/globals";
import createStatisticsCopy from "../../../../src/ui/viewmodel/StatisticsPage/createStatisticsCopy.js";
import { createScoreTrendPoints } from "../../../../src/ui/viewmodel/StatisticsPage/createScoreTrendPoints.js";

const copy = createStatisticsCopy({
	statisticsTrendPointLabel: "Forsøk",
	statisticsAttemptPointUnit: "poeng",
	statisticsEmptyValueLabel: "—"
});

const formatDate = (value) => value ? `dato:${value}` : null;

describe("createScoreTrendPoints", () => {
	test("returns empty list when scoreTrend is missing", () => {
		expect(createScoreTrendPoints(null, formatDate, copy)).toEqual([]);
	});

	test("creates chart-ready trend points", () => {
		const result = createScoreTrendPoints([
			null,
			{
				attemptId: "a1",
				submittedAt: "2026-06-12",
				percentage: "74.44",
				scorePoints: "12",
				totalPoints: "16"
			}
		], formatDate, copy);

		expect(result).toEqual([
			{
				id: "a1",
				name: "Forsøk 1",
				dateLabel: "dato:2026-06-12",
				percentage: 74.4,
				scorePoints: 12,
				percentageLabel: "74.4 %",
				scoreLabel: "12 / 16 poeng"
			}
		]);
	});
});

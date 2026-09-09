// test/ui/viewmodel/StatisticsPage/statisticsViewToggle.test.js
import { describe, expect, test } from "@jest/globals";
import { STATISTICS_VIEW_IDS, createStatisticsViewToggleModel, selectStatisticsView } from "../../../../src/ui/viewmodel/StatisticsPage/statisticsViewToggle.js";

const TEXT = Object.freeze({
	viewToggleOverviewLabel: "Oversikt",
	viewToggleInsightsLabel: "Innsikt",
	viewToggleAriaLabel: "Statistikkvisning",
	viewToggleBackLabel: "Tilbake til statistikkvisninger"
});

describe("statisticsViewToggle", () => {
	test("keeps Overview active and Insights visibly locked", () => {
		const model = createStatisticsViewToggleModel(TEXT);

		expect(model.activeEntryId).toBe(STATISTICS_VIEW_IDS.OVERVIEW);
		expect(model.entries).toEqual([
			{ id: STATISTICS_VIEW_IDS.OVERVIEW, label: "Oversikt", isDisabled: false },
			{ id: STATISTICS_VIEW_IDS.INSIGHTS, label: "Innsikt", isDisabled: true }
		]);
		expect(model.mobileItems[0].isActive).toBe(true);
		expect(model.mobileItems[1].isActive).toBe(false);
		expect(model.mobileItems[1].isDisabled).toBe(true);
	});

	test("accepts reselecting Overview and ignores the visibly locked Insights view", () => {
		expect(() => selectStatisticsView(STATISTICS_VIEW_IDS.OVERVIEW)).not.toThrow();
		expect(() => selectStatisticsView(STATISTICS_VIEW_IDS.INSIGHTS)).not.toThrow();
		expect(() => selectStatisticsView("unknown")).toThrow("Unknown statistics view");
	});
});

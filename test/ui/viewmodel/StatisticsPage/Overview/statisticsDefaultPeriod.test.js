// test/ui/viewmodel/StatisticsPage/Overview/statisticsDefaultPeriod.test.js
import { DEFAULT_STATISTICS_PERIOD, STATISTICS_PERIODS } from "../../../../../src/constants/StatisticsContracts.js";

describe("Statistics default period", () => {
	it("defaults Development to one week", () => {
		expect(DEFAULT_STATISTICS_PERIOD).toBe(STATISTICS_PERIODS.WEEK);
	});
});

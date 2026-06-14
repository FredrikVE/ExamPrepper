// test/ui/viewmodel/StatisticsPage/createWeeklyActivityModel.test.js
import { describe, expect, test } from "@jest/globals";
import createStatisticsCopy from "../../../../src/ui/viewmodel/StatisticsPage/createStatisticsCopy.js";
import { createWeeklyActivityModel } from "../../../../src/ui/viewmodel/StatisticsPage/createWeeklyActivityModel.js";

const copy = createStatisticsCopy({
	statisticsWeeklyActivityTitle: "Aktivitet denne uken",
	statisticsWeeklyActivityTotalTimeCaption: "Totalt tid brukt",
	statisticsWeeklyActivityChangeSuffix: "fra forrige uke",
	statisticsWeeklyActivityNoComparisonLabel: "Ingen sammenligning ennå",
	statisticsWeeklyActivityNoChangeLabel: "Ingen endring fra forrige uke",
	statisticsWeeklyActivityNote: "Øv jevnlig.",
	statisticsWeekdayMonday: "Man",
	statisticsWeekdayTuesday: "Tir",
	statisticsWeekdayWednesday: "Ons",
	statisticsWeekdayThursday: "Tor",
	statisticsWeekdayFriday: "Fre",
	statisticsWeekdaySaturday: "Lør",
	statisticsWeekdaySunday: "Søn",
	statisticsActivityHourShort: "t",
	statisticsActivityMinuteShort: "min",
	statisticsEmptyValueLabel: "—"
});

describe("createWeeklyActivityModel", () => {
	test("creates a weekly activity model from backend data", () => {
		const result = createWeeklyActivityModel({
			totalMinutesThisWeek: "165",
			changePercentageFromPreviousWeek: "35",
			days: [
				{ key: "mon", label: "Man", totalMinutes: "35", attemptCount: "1" },
				{ key: "tue", label: "Tir", totalMinutes: 45, attemptCount: 1 },
				{ key: "wed", label: "Ons", totalMinutes: 55, attemptCount: 1 },
				{ key: "thu", label: "Tor", totalMinutes: 30, attemptCount: 1 }
			]
		}, copy);

		expect(result.title).toBe("Aktivitet denne uken");
		expect(result.totalTimeLabel).toBe("2 t 45 min");
		expect(result.totalTimeCaption).toBe("Totalt tid brukt");
		expect(result.changeLabel).toBe("+35 % fra forrige uke");
		expect(result.changeTone).toBe("positive");
		expect(result.days).toHaveLength(7);
		expect(result.days[0]).toMatchObject({
			key: "mon",
			label: "Man",
			totalMinutes: 35,
			attemptCount: 1,
			tone: "blue",
			barHeight: "64%"
		});
		expect(result.days[2].barHeight).toBe("100%");
		expect(result.days[6]).toMatchObject({
			key: "sun",
			label: "Søn",
			totalMinutes: 0,
			attemptCount: 0,
			tone: "neutral",
			barHeight: "4px"
		});
	});

	test("creates safe empty activity when backend data is missing", () => {
		const result = createWeeklyActivityModel(null, copy);

		expect(result.totalTimeLabel).toBe("0 min");
		expect(result.changeLabel).toBe("Ingen sammenligning ennå");
		expect(result.changeTone).toBe("neutral");
		expect(result.days.every((day) => day.totalMinutes === 0)).toBe(true);
		expect(result.days.every((day) => day.barHeight === "4px")).toBe(true);
	});

	test("marks lower activity as negative", () => {
		const result = createWeeklyActivityModel({
			totalMinutesThisWeek: 20,
			changePercentageFromPreviousWeek: -12.5,
			days: []
		}, copy);

		expect(result.changeLabel).toBe("-12.5 % fra forrige uke");
		expect(result.changeTone).toBe("negative");
	});
});

// test/ui/viewmodel/StatisticsPage/createStatisticsTextModel.test.js
import { describe, expect, test } from "@jest/globals";
import { LANGUAGES, translations } from "../../../../src/i18n/translations.js";
import createStatisticsTextModel from "../../../../src/ui/viewmodel/StatisticsPage/createStatisticsTextModel.js";

describe("createStatisticsTextModel", () => {
	test("formats the progress KPI with percent sign while keeping percentage-point semantics in the unit", () => {
		const text = createStatisticsTextModel(translations[LANGUAGES.NO]);

		expect(text.createPercentagePointNumberLabel(44.4)).toBe("44.4 %");
		expect(text.createPercentagePointNumberLabel(-12.3)).toBe("-12.3 %");
		expect(text.createPercentagePointUnitLabel(44.4)).toBe("prosentpoeng");
	});

	test("formats the dynamic progress attempt context", () => {
		const no = createStatisticsTextModel(translations[LANGUAGES.NO]);
		const en = createStatisticsTextModel(translations[LANGUAGES.EN]);

		expect(no.createProgressAttemptContextLabel(7)).toBe("(siste 7 forsøk)");
		expect(no.createProgressAttemptSummaryLabel(7)).toBe("Siste 7 forsøk");
		expect(en.createProgressAttemptContextLabel(1)).toBe("(last 1 attempt)");
		expect(en.createProgressAttemptContextLabel(7)).toBe("(last 7 attempts)");
		expect(en.createProgressAttemptSummaryLabel(1)).toBe("Last 1 attempt");
		expect(en.createProgressAttemptSummaryLabel(7)).toBe("Last 7 attempts");
	});

	test("uses compact period labels for the chart control", () => {
		const text = createStatisticsTextModel(translations[LANGUAGES.NO]);

		expect(text.periodOptions.map((option) => option.label)).toEqual(["1 uke", "1 mnd", "3 mnd", "6 mnd", "1 år", "Alt"]);
	});
});

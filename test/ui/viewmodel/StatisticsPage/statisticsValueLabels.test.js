// test/ui/viewmodel/StatisticsPage/statisticsValueLabels.test.js
import { describe, expect, test } from "@jest/globals";
import { createPercentageLabel, createPointsLabel } from "../../../../src/ui/viewmodel/StatisticsPage/statisticsValueLabels.js";

const text = {
	emptyValueLabel: "—",
	createAttemptPointsLabel(scorePoints, totalPoints) {
		return `${scorePoints} / ${totalPoints} poeng`;
	}
};

describe("statisticsValueLabels", () => {
	test("creates percentage labels", () => {
		expect(createPercentageLabel(null, text)).toBe("—");
		expect(createPercentageLabel(74.4, text)).toBe("74.4 %");
		expect(createPercentageLabel(81, text)).toBe("81 %");
	});

	test("creates points labels", () => {
		expect(createPointsLabel("13", "16", text)).toBe("13 / 16 poeng");
		expect(createPointsLabel(null, null, text)).toBe("0 / 0 poeng");
	});
});

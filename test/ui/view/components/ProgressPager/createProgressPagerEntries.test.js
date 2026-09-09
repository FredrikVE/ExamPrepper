import { describe, expect, test } from "@jest/globals";
import createProgressPagerEntries from "../../../../../src/ui/view/components/ProgressPager/createProgressPagerEntries.js";

describe("createProgressPagerEntries", () => {
	test("creates neutral generic entry indexes and numbers", () => {
		const result = createProgressPagerEntries({
			count: 3,
			activeIndex: 1,
			keyPrefix: "history-page",
			resolveIsCorrect: () => false
		});

		expect(result).toEqual([
			{ key: "history-page-0", entryNumber: 1, entryIndex: 0, isActive: false, isCorrect: false },
			{ key: "history-page-1", entryNumber: 2, entryIndex: 1, isActive: true, isCorrect: false },
			{ key: "history-page-2", entryNumber: 3, entryIndex: 2, isActive: false, isCorrect: false }
		]);
	});
});

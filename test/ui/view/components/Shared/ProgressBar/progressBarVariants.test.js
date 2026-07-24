// test/ui/view/components/Shared/ProgressBar/progressBarVariants.test.js
import { describe, expect, test } from "@jest/globals";
import { getProgressBarClassName, PROGRESS_BAR_VARIANTS } from "../../../../../../src/ui/view/components/Shared/ProgressBar/progressBarVariants.js";

describe("getProgressBarClassName", () => {
	test("returns the header variant class", () => {
		expect(getProgressBarClassName(PROGRESS_BAR_VARIANTS.HEADER)).toBe("progress-bar progress-bar--header");
	});

	test("fails for an unknown variant", () => {
		expect(() => getProgressBarClassName("missing")).toThrow("Unknown ProgressBar variant: missing");
	});
});

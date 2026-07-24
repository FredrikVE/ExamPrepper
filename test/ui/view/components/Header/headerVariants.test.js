// test/ui/view/components/Header/headerVariants.test.js
import { describe, expect, test } from "@jest/globals";
import { createHeaderClassName, HEADER_APPEARANCES, HEADER_LAYOUTS } from "../../../../../src/ui/view/components/Header/headerVariants.js";

describe("createHeaderClassName", () => {
	test("combines explicit appearance and layout classes", () => {
		expect(createHeaderClassName(HEADER_APPEARANCES.DEFAULT, HEADER_LAYOUTS.EXAM_PROGRESS)).toBe(
			"scaffold-header scaffold-header--appearance-default scaffold-header--layout-exam-progress"
		);
	});

	test("fails for an unknown appearance", () => {
		expect(() => createHeaderClassName("missing", HEADER_LAYOUTS.DEFAULT)).toThrow("Unknown Header appearance: missing");
	});

	test("fails for an unknown layout", () => {
		expect(() => createHeaderClassName(HEADER_APPEARANCES.DEFAULT, "missing")).toThrow("Unknown Header layout: missing");
	});
});

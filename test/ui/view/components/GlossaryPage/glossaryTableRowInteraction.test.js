// test/ui/view/components/GlossaryPage/glossaryTableRowInteraction.test.js
import { describe, expect, jest, test } from "@jest/globals";
import { isInteractiveGlossaryTableRowTarget } from "../../../../../src/ui/view/components/GlossaryPage/GlossaryPanel/glossaryTableRowInteraction.js";

describe("Glossary table row interaction", () => {
	test("keeps row activation available for noninteractive content", () => {
		const target = { closest: jest.fn(() => null) };

		expect(isInteractiveGlossaryTableRowTarget(target)).toBe(false);
	});

	test("keeps nested controls from activating the row", () => {
		const target = { closest: jest.fn(() => ({ tagName: "BUTTON" })) };

		expect(isInteractiveGlossaryTableRowTarget(target)).toBe(true);
	});
});

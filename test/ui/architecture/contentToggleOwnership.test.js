// test/ui/architecture/contentToggleOwnership.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const VIEWMODEL_PATHS = [
	path.resolve("src/ui/viewmodel/LearningContentSelectPageViewModel.js"),
	path.resolve("src/ui/viewmodel/GlossaryPageViewModel.js")
];

describe("content toggle derivation ownership", () => {
	test("derives mobile toggle items through the shared model", () => {
		for (const filePath of VIEWMODEL_PATHS) {
			const source = fs.readFileSync(filePath, "utf8");
			expect(source).toContain("createMobileToggleButtonItems");
			expect(source).not.toContain("for (const item of NAV_ITEMS.mobileToggleButtonItems)");
			expect(source).not.toContain("function findMobileToggleEntry");
		}
	});
});

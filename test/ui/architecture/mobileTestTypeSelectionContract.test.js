// test/ui/architecture/mobileTestTypeSelectionContract.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const headerPath = path.resolve(
	"src/ui/view/components/LearningContentHeader/LearningContentHeader.jsx"
);
const pagePath = path.resolve("src/ui/view/pages/LearningContentSelectPage.jsx");

describe("responsive test type selection contract", () => {
	test("provides explicit active-entry identities to desktop and mobile", () => {
		const headerSource = fs.readFileSync(headerPath, "utf8");
		const pageSource = fs.readFileSync(pagePath, "utf8");

		expect(headerSource).toContain(
			"activeEntryId={props.activeEntryId}"
		);
		expect(headerSource).toContain(
			"mobileActiveEntryId={props.mobileActiveEntryId}"
		);
		expect(pageSource).toContain(
			"activeEntryId={viewModel.desktopActiveEntryId}"
		);
		expect(pageSource).toContain(
			"mobileActiveEntryId={viewModel.mobileActiveEntryId}"
		);
	});
});

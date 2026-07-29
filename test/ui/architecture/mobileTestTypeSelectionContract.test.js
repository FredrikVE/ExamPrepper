// test/ui/architecture/mobileTestTypeSelectionContract.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const headerPath = path.resolve(
	"src/ui/view/components/LearningContentHeader/LearningContentHeader.jsx"
);
const pagePath = path.resolve("src/ui/view/pages/LearningContentSelectPage.jsx");
const glossaryPagePath = path.resolve("src/ui/view/pages/GlossaryPage.jsx");
const appPath = path.resolve("src/App.jsx");
const glossaryViewModelPath = path.resolve("src/ui/viewmodel/GlossaryPageViewModel.js");
const toggleButtonRowPath = path.resolve("src/ui/view/components/ToggleButtonRow/ToggleButtonRow.jsx");

describe("responsive test type selection contract", () => {
	test("provides explicit active-entry identities to desktop and mobile", () => {
		const headerSource = fs.readFileSync(headerPath, "utf8");
		const pageSource = fs.readFileSync(pagePath, "utf8");
		const glossaryPageSource = fs.readFileSync(glossaryPagePath, "utf8");

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
		expect(glossaryPageSource).toContain(
			"mobileActiveEntryId={viewModel.mobileActiveEntryId}"
		);
	});

	test("requires the complete mobile contract without fallbacks or optional defaults", () => {
		const glossaryViewModelSource = fs.readFileSync(glossaryViewModelPath, "utf8");
		const toggleButtonRowSource = fs.readFileSync(toggleButtonRowPath, "utf8");

		expect(glossaryViewModelSource).not.toContain("expandedMobileToggleButtonGroupId = null");
		expect(glossaryViewModelSource).not.toContain("onOpenMobileToggleButtonGroup = null");
		expect(glossaryViewModelSource).not.toContain("onCloseMobileToggleButtonGroup = null");
		expect(toggleButtonRowSource).not.toContain("mobileActiveEntryId ??");
	});

	test("keeps mobile disclosure state shared across select and glossary routes", () => {
		const pageSource = fs.readFileSync(pagePath, "utf8");
		const glossaryPageSource = fs.readFileSync(glossaryPagePath, "utf8");
		const appSource = fs.readFileSync(appPath, "utf8");

		for (const source of [pageSource, glossaryPageSource]) {
			expect(source).toContain(
				"expandedMobileToggleButtonGroupId={viewModel.expandedMobileToggleButtonGroupId}"
			);
			expect(source).toContain(
				"onOpenMobileToggleButtonGroup={viewModel.openMobileToggleButtonGroup}"
			);
			expect(source).toContain(
				"onCloseMobileToggleButtonGroup={viewModel.closeMobileToggleButtonGroup}"
			);
		}

		expect(appSource).toContain(
			"expandedMobileToggleButtonGroupId={learningContentSelectPageViewModel.expandedMobileToggleButtonGroupId}"
		);
	});

});

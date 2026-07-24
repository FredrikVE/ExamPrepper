// test/ui/architecture/headerArchitecture.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const PROJECT_ROOT = process.cwd();
const HEADER_SOURCE_PATH = path.join(PROJECT_ROOT, "src", "ui", "view", "components", "Header", "Header.jsx");
const HEADER_STYLE_ROOT = path.join(PROJECT_ROOT, "src", "ui", "style", "Header");
const PAGE_ROOT = path.join(PROJECT_ROOT, "src", "ui", "view", "pages");
const PAGE_STYLE_NAMES = ["ExamPage", "FlipcardsPage", "GlossaryPage", "LearningContentSelectPage", "MatchCardsPage", "StatisticsPage", "SubjectSelectPage"];
const HEADER_PAGE_NAMES = ["ExamPage.jsx", "FlipcardsPage.jsx", "GlossaryPage.jsx", "LearningContentSelectPage.jsx", "MatchCardsPage.jsx", "StatisticsPage.jsx", "SubjectSelectPage.jsx"];

function readCssTree(directoryPath) {
	let cssSource = "";

	for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
		const entryPath = path.join(directoryPath, entry.name);

		if (entry.isDirectory()) {
			cssSource += readCssTree(entryPath);
			continue;
		}

		if (path.extname(entry.name) === ".css") {
			cssSource += fs.readFileSync(entryPath, "utf8");
		}
	}

	return cssSource;
}

describe("Header architecture", () => {
	test("keeps Header free of feature-component imports", () => {
		const headerSource = fs.readFileSync(HEADER_SOURCE_PATH, "utf8");

		expect(headerSource).not.toContain("PageToolsDesktopPanel");
		expect(headerSource).not.toContain("ProgressBar");
	});

	test("keeps ProgressBar selectors outside Header CSS", () => {
		expect(readCssTree(HEADER_STYLE_ROOT)).not.toContain(".progress-bar");
	});

	test("requires every Header page to select appearance, layout and slots", () => {
		for (const pageName of HEADER_PAGE_NAMES) {
			const pageSource = fs.readFileSync(path.join(PAGE_ROOT, pageName), "utf8");

			expect(pageSource).toContain("appearance={HEADER_APPEARANCES.");
			expect(pageSource).toContain("layout={HEADER_LAYOUTS.");
			expect(pageSource).toContain("backContract={viewModel.backContract}");
			expect(pageSource).toContain("heading={");
			expect(pageSource).toContain("tools={");
			expect(pageSource).toContain("trailing={");
		}
	});

	test("keeps Header selectors out of Page CSS", () => {
		for (const pageStyleName of PAGE_STYLE_NAMES) {
			const pageCss = readCssTree(path.join(PROJECT_ROOT, "src", "ui", "style", pageStyleName));

			expect(pageCss).not.toContain(".scaffold-header");
		}
	});

	test("uses canonical Header for Statistics", () => {
		const statisticsPageSource = fs.readFileSync(path.join(PAGE_ROOT, "StatisticsPage.jsx"), "utf8");
		const statisticsCss = readCssTree(path.join(PROJECT_ROOT, "src", "ui", "style", "StatisticsPage"));

		expect(statisticsPageSource).toContain("<Header");
		expect(statisticsPageSource).toContain("<HeaderTitle");
		expect(statisticsPageSource).toContain("statistics-start-button--desktop");
		expect(statisticsPageSource).toContain("statistics-start-button--mobile");
		expect(statisticsCss).not.toContain(".statistics-page-header");
	});

	test("preserves the actions slot", () => {
		const headerSource = fs.readFileSync(HEADER_SOURCE_PATH, "utf8");

		expect(headerSource).toContain('className="scaffold-header__actions"');
	});
});

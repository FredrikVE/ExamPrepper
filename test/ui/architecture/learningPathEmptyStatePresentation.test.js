//test/ui/architecture/learningPathEmptyStatePresentation.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const LEARNING_PATH_PAGE_SOURCE = path.resolve("src/ui/view/pages/LearningPathPage.jsx");
const LEARNING_PATH_PAGE_CSS = path.resolve("src/ui/style/LearningPathPage/learning-path.css");

function extractCssRule(source, selector) {
	const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const match = source.match(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`));
	return match === null ? null : match[1];
}

describe("LearningPath empty-state presentation", () => {
	test("keeps LearningContentHeader and ToggleButtonRow outside the workspace state boundary", () => {
		const source = fs.readFileSync(LEARNING_PATH_PAGE_SOURCE, "utf8");
		const contentHeaderIndex = source.indexOf("<LearningContentHeader");
		const workspaceStateIndex = source.indexOf("<WorkspaceState");

		expect(contentHeaderIndex).toBeGreaterThan(-1);
		expect(workspaceStateIndex).toBeGreaterThan(contentHeaderIndex);
		expect(source).toContain('<div className="learning-path-page-state-content">');
	});

	test("keeps the shared LearningContentHeader outside the narrow roadmap geometry", () => {
		const source = fs.readFileSync(LEARNING_PATH_PAGE_SOURCE, "utf8");
		const css = fs.readFileSync(LEARNING_PATH_PAGE_CSS, "utf8");
		const pageShellIndex = source.indexOf('<div className="learning-path-page">');
		const contentHeaderIndex = source.indexOf("<LearningContentHeader");
		const narrowContentIndex = source.indexOf('<div className="learning-path-page-content">');
		const pageRule = extractCssRule(css, ".learning-path-page");
		const narrowContentRule = extractCssRule(css, ".learning-path-page-content");

		expect(pageShellIndex).toBeGreaterThan(-1);
		expect(contentHeaderIndex).toBeGreaterThan(pageShellIndex);
		expect(narrowContentIndex).toBeGreaterThan(contentHeaderIndex);
		expect(pageRule).not.toBeNull();
		expect(pageRule).toMatch(/width:\s*100%/);
		expect(pageRule).toMatch(/min-width:\s*0/);
		expect(narrowContentRule).not.toBeNull();
		expect(narrowContentRule).toMatch(/width:\s*min\(100%,\s*950px\)/);
	});
});

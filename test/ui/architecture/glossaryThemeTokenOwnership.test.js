// test/ui/architecture/glossaryThemeTokenOwnership.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const GLOSSARY_STYLE_PATHS = [
	path.resolve("src/ui/style/GlossaryPage/page.css"),
	path.resolve("src/ui/style/GlossaryPage/table.css"),
	path.resolve("src/ui/style/GlossaryPage/mastery.css"),
	path.resolve("src/ui/style/GlossaryPage/responsive.css"),
	path.resolve("src/ui/style/GlossaryPage/DetailModal/modal-shell.css"),
	path.resolve("src/ui/style/GlossaryPage/DetailModal/modal-content.css"),
	path.resolve("src/ui/style/GlossaryPage/DetailModal/modal-network.css"),
	path.resolve("src/ui/style/GlossaryPage/DetailModal/modal-relations.css"),
	path.resolve("src/ui/style/GlossaryPage/DetailModal/modal-navigation.css")
];
const TOKENS_PATH = path.resolve("src/ui/style/Tokens.css");
const MASTERY_SCALE_COMPONENT_PATH = path.resolve("src/ui/view/components/GlossaryPage/Mastery/GlossaryMasteryScale.jsx");
const GLOSSARY_TABLE_COMPONENT_PATHS = [
	path.resolve("src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryTable.jsx"),
	path.resolve("src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryTableRow.jsx")
];
const GLOSSARY_DETAIL_COMPONENT_PATHS = [
	path.resolve("src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailGraph.jsx"),
	path.resolve("src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailHeader.jsx"),
	path.resolve("src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailNavigation.jsx"),
	path.resolve("src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailRelations.jsx"),
	path.resolve("src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailSheet.jsx")
];

const readSource = (filePath) => fs.readFileSync(filePath, "utf8");
const removeMaskLines = (source) => source.split("\n").filter((line) => line.includes("mask-image:") === false).join("\n");

function readGlossaryStyles() {
	return GLOSSARY_STYLE_PATHS.map(readSource).join("\n");
}

describe("Glossary theme token ownership", () => {
	test("keeps theme switching in Tokens.css instead of GlossaryPage styles", () => {
		const glossaryStyles = readGlossaryStyles();
		const tokens = readSource(TOKENS_PATH);

		expect(tokens).toContain(":root {");
		expect(tokens).toContain(".dark {");
		expect(glossaryStyles).not.toMatch(/\.dark\b/);
	});


	test("keeps the full-desktop TopicAreaPanel width in Tokens.css", () => {
		const pageStyles = readSource(path.resolve("src/ui/style/GlossaryPage/page.css"));
		const responsiveStyles = readSource(path.resolve("src/ui/style/GlossaryPage/responsive.css"));
		const tokens = readSource(TOKENS_PATH);

		expect(tokens).toContain("--glossary-topic-area-panel-width: clamp(280px, 20vw, 300px);");
		expect(pageStyles).toContain("grid-template-columns: var(--glossary-topic-area-panel-width) minmax(0, 1fr);");
		expect(pageStyles).not.toContain("--glossary-sidebar-width");
		expect(responsiveStyles).not.toContain("--glossary-sidebar-width");
	});

	test("keeps Glossary table density and scrollbar geometry in Tokens.css", () => {
		const pageStyles = readSource(path.resolve("src/ui/style/GlossaryPage/page.css"));
		const responsiveStyles = readSource(path.resolve("src/ui/style/GlossaryPage/responsive.css"));
		const tableStyles = readSource(path.resolve("src/ui/style/GlossaryPage/table.css"));
		const tokens = readSource(TOKENS_PATH);

		for (const token of [
			"--glossary-table-mastery-column-width: clamp(118px, 9vw, 132px);",
			"--glossary-table-mastery-column-width-compact: clamp(112px, 12vw, 124px);",
			"--glossary-table-scrollbar-size: 10px;"
		]) {
			expect(tokens).toContain(token);
		}

		expect(pageStyles).toContain("--glossary-mastery-column-width: var(--glossary-table-mastery-column-width);");
		expect(responsiveStyles).toContain("--glossary-mastery-column-width: var(--glossary-table-mastery-column-width-compact);");
		expect(tableStyles).toContain("width: var(--glossary-table-scrollbar-size);");
		expect(tableStyles).toContain("height: var(--glossary-table-scrollbar-size);");
		expect(tableStyles).toContain("scrollbar-width: auto;");
		expect(tableStyles).toContain("touch-action: pan-y;");
		expect(tableStyles).toContain("-webkit-overflow-scrolling: touch;");
	});

	test("keeps Glossary mastery icon geometry in Tokens.css and GlossaryPage CSS", () => {
		const masteryScaleComponent = readSource(MASTERY_SCALE_COMPONENT_PATH);
		const masteryStyles = readSource(path.resolve("src/ui/style/GlossaryPage/mastery.css"));
		const tokens = readSource(TOKENS_PATH);

		expect(tokens).toContain("--glossary-mastery-selected-mark-size: 12px;");
		expect(tokens).toContain("--glossary-mastery-selected-mark-stroke-width: 2.5;");
		expect(masteryStyles).toContain("width: var(--glossary-mastery-selected-mark-size);");
		expect(masteryStyles).toContain("height: var(--glossary-mastery-selected-mark-size);");
		expect(masteryStyles).toContain("stroke-width: var(--glossary-mastery-selected-mark-stroke-width);");
		expect(masteryScaleComponent).not.toMatch(/\b(?:size|strokeWidth|style)=\{/);
	});

	test("keeps Glossary table icon geometry in Tokens.css and GlossaryPage CSS", () => {
		const tableComponents = GLOSSARY_TABLE_COMPONENT_PATHS.map(readSource).join("\n");
		const tableStyles = readSource(path.resolve("src/ui/style/GlossaryPage/table.css"));
		const tokens = readSource(TOKENS_PATH);

		for (const token of [
			"--glossary-table-sort-icon-size: 16px;",
			"--glossary-table-sort-icon-stroke-width: 2;",
			"--glossary-table-detail-icon-size: 19px;",
			"--glossary-table-detail-icon-stroke-width: 2.25;"
		]) {
			expect(tokens).toContain(token);
		}

		expect(tableStyles).toContain("width: var(--glossary-table-sort-icon-size);");
		expect(tableStyles).toContain("stroke-width: var(--glossary-table-sort-icon-stroke-width);");
		expect(tableStyles).toContain("width: var(--glossary-table-detail-icon-size);");
		expect(tableStyles).toContain("stroke-width: var(--glossary-table-detail-icon-stroke-width);");
		expect(tableComponents).not.toMatch(/\b(?:size|strokeWidth|style)=\{/);
	});

	test("keeps Glossary detail icon geometry and visual styling out of JSX", () => {
		const detailComponents = GLOSSARY_DETAIL_COMPONENT_PATHS.map(readSource).join("\n");
		const glossaryStyles = readGlossaryStyles();
		const tokens = readSource(TOKENS_PATH);

		for (const token of [
			"--glossary-detail-section-icon-size: 21px;",
			"--glossary-detail-trail-back-icon-size: 15px;",
			"--glossary-detail-close-icon-size: 22px;",
			"--glossary-detail-navigation-icon-size: 18px;",
			"--glossary-detail-relations-toggle-icon-size: 18px;",
			"--glossary-detail-surface-bg:"
		]) {
			expect(tokens).toContain(token);
		}

		expect(glossaryStyles).toContain("var(--glossary-detail-section-icon-size)");
		expect(glossaryStyles).toContain("var(--glossary-detail-navigation-icon-size)");
		expect(glossaryStyles).toContain("var(--glossary-detail-surface-bg)");
		expect(detailComponents).not.toMatch(/\b(?:size|strokeWidth|style)=\{/);
	});

	test("keeps Glossary relation row surfaces in Tokens.css", () => {
		const relationStyles = readSource(path.resolve("src/ui/style/GlossaryPage/DetailModal/modal-relations.css"));
		const tokens = readSource(TOKENS_PATH);

		expect(tokens).toContain("--glossary-detail-row-alt-bg:");
		expect(tokens).toContain("--glossary-detail-row-hover-bg:");
		expect(relationStyles).toContain("background: var(--glossary-detail-row-alt-bg);");
		expect(relationStyles).toContain("background: var(--glossary-detail-row-hover-bg);");
	});

	test("does not copy rendered prototype palette literals into glossary styles", () => {
		const glossaryStyles = removeMaskLines(readGlossaryStyles());

		expect(glossaryStyles).not.toMatch(/#[0-9a-f]{3,8}\b/i);
		expect(glossaryStyles).not.toMatch(/\brgba?\s*\(/i);
	});

	test("uses semantic theme tokens for glossary text, surfaces and accent styling", () => {
		const glossaryStyles = readGlossaryStyles();

		for (const token of [
			"--text-main",
			"--text-muted",
			"--text-soft",
			"--panel-bg",
			"--panel-strong",
			"--line",
			"--accent",
			"--accent-gradient",
			"--shadow-card",
			"--glossary-table-sticky-cell-bg"
		]) {
			expect(glossaryStyles).toContain(`var(${token})`);
		}
	});
});

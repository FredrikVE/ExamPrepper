// test/ui/architecture/glossaryThemeTokenOwnership.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const GLOSSARY_STYLE_PATHS = [
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

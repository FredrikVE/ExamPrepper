// test/ui/architecture/glossaryThemeTokenOwnership.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const GLOSSARY_STYLE_PATHS = [
	path.resolve("src/ui/style/GlossaryPage/table.css"),
	path.resolve("src/ui/style/GlossaryPage/concept-network.css"),
	path.resolve("src/ui/style/GlossaryPage/DetailModal/modal-shell.css"),
	path.resolve("src/ui/style/GlossaryPage/DetailModal/modal-content.css"),
	path.resolve("src/ui/style/GlossaryPage/DetailModal/modal-network.css"),
	path.resolve("src/ui/style/GlossaryPage/DetailModal/modal-relations.css"),
	path.resolve("src/ui/style/GlossaryPage/DetailModal/modal-navigation.css")
];
const TOKENS_PATH = path.resolve("src/ui/style/Tokens.css");

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
			"--shadow-card"
		]) {
			expect(glossaryStyles).toContain(`var(${token})`);
		}
	});
});

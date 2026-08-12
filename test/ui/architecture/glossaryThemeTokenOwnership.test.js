// test/ui/architecture/glossaryThemeTokenOwnership.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const TABLE_STYLE_PATH = path.resolve("src/ui/style/GlossaryPage/table.css");
const NETWORK_STYLE_PATH = path.resolve("src/ui/style/GlossaryPage/concept-network.css");
const TOKENS_PATH = path.resolve("src/ui/style/Tokens.css");

const readSource = (filePath) => fs.readFileSync(filePath, "utf8");
const removeMaskLines = (source) => source.split("\n").filter((line) => line.includes("mask-image:") === false).join("\n");

describe("Glossary theme token ownership", () => {
	test("keeps theme switching in Tokens.css instead of GlossaryPage styles", () => {
		const glossaryStyles = [TABLE_STYLE_PATH, NETWORK_STYLE_PATH].map(readSource).join("\n");
		const tokens = readSource(TOKENS_PATH);

		expect(tokens).toContain(":root {");
		expect(tokens).toContain(".dark {");
		expect(glossaryStyles).not.toMatch(/\.dark\b/);
	});

	test("does not copy rendered prototype palette literals into glossary table or network styles", () => {
		const glossaryStyles = removeMaskLines([TABLE_STYLE_PATH, NETWORK_STYLE_PATH].map(readSource).join("\n"));

		expect(glossaryStyles).not.toMatch(/#[0-9a-f]{3,8}\b/i);
		expect(glossaryStyles).not.toMatch(/\brgba?\s*\(/i);
	});

	test("uses semantic theme tokens for glossary text, surfaces and accent styling", () => {
		const glossaryStyles = [TABLE_STYLE_PATH, NETWORK_STYLE_PATH].map(readSource).join("\n");

		for (const token of ["--text-main", "--text-muted", "--text-soft", "--panel-bg", "--panel-strong", "--line", "--accent", "--accent-gradient", "--shadow-card"]) {
			expect(glossaryStyles).toContain(`var(${token})`);
		}
	});
});

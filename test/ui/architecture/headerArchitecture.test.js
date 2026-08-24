// test/ui/architecture/headerArchitecture.test.js
import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import { describe, expect, test } from "@jest/globals";

const HEADER_DIRECTORY = path.resolve("src/ui/view/components/Header");
const HEADER_PATH = path.join(HEADER_DIRECTORY, "Header.jsx");
const PAGE_DIRECTORY = path.resolve("src/ui/view/pages");

function readImports(filePath) {
	const ast = parse(fs.readFileSync(filePath, "utf8"), {
		sourceType: "module",
		plugins: ["jsx"]
	});

	return ast.program.body.filter((node) => node.type === "ImportDeclaration");
}

function resolveImport(filePath, source) {
	if (!source.startsWith(".")) {
		return source;
	}

	return path.resolve(path.dirname(filePath), source);
}

describe("Header architecture", () => {
	test("keeps canonical Header free of feature-component dependencies", () => {
		for (const importNode of readImports(HEADER_PATH)) {
			const importedPath = resolveImport(HEADER_PATH, importNode.source.value);

			if (typeof importedPath !== "string" || !path.isAbsolute(importedPath)) {
				continue;
			}

			expect(importedPath.startsWith(`${HEADER_DIRECTORY}${path.sep}`)).toBe(true);
		}
	});

	test("uses the canonical Header module wherever pages import Header", () => {
		let headerImporterCount = 0;

		for (const entry of fs.readdirSync(PAGE_DIRECTORY, { withFileTypes: true })) {
			if (!entry.isFile() || !entry.name.endsWith(".jsx")) {
				continue;
			}

			const pagePath = path.join(PAGE_DIRECTORY, entry.name);

			for (const importNode of readImports(pagePath)) {
				const defaultImport = importNode.specifiers.find((specifier) => specifier.type === "ImportDefaultSpecifier");

				if (defaultImport?.local.name !== "Header") {
					continue;
				}

				headerImporterCount += 1;
				expect(resolveImport(pagePath, importNode.source.value)).toBe(HEADER_PATH);
			}
		}

		expect(headerImporterCount).toBeGreaterThan(0);
	});
});

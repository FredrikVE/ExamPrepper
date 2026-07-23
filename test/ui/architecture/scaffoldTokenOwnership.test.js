// test/ui/architecture/scaffoldTokenOwnership.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const STYLE_ROOT = path.join(process.cwd(), "src", "ui", "style");
const SCAFFOLD_FILE = path.join(STYLE_ROOT, "WorkspaceScaffold", "workspace-scaffold.css");

const collectCssFiles = (directory) => {
	const collected = [];
	const entries = fs.readdirSync(directory, { withFileTypes: true });

	for (const entry of entries) {
		const entryPath = path.join(directory, entry.name);

		if (entry.isDirectory()) {
			collected.push(...collectCssFiles(entryPath));
			continue;
		}

		if (entry.name.endsWith(".css")) {
			collected.push(entryPath);
		}
	}

	return collected;
};

const stripComments = (source) => {
	return source.replace(/\/\*[\s\S]*?\*\//g, "");
};

const readScaffoldRootBlock = () => {
	const source = stripComments(fs.readFileSync(SCAFFOLD_FILE, "utf8"));
	const start = source.indexOf(".workspace-scaffold {");
	const end = source.indexOf("}", start);

	return source.slice(start, end);
};

describe("scaffold token ownership", () => {
	const cssFiles = collectCssFiles(STYLE_ROOT);

	test("hver --scaffold-* som konsumeres er deklarert på .workspace-scaffold", () => {
		const declared = new Set();
		const rootBlock = readScaffoldRootBlock();

		for (const match of rootBlock.matchAll(/(--scaffold-[a-z0-9-]+)\s*:/g)) {
			declared.add(match[1]);
		}

		const consumed = new Set();

		for (const file of cssFiles) {
			const source = stripComments(fs.readFileSync(file, "utf8"));

			for (const match of source.matchAll(/var\(\s*(--scaffold-[a-z0-9-]+)/g)) {
				consumed.add(match[1]);
			}
		}

		const undeclared = [];

		for (const token of consumed) {
			if (declared.has(token)) {
				continue;
			}

			undeclared.push(token);
		}

		expect(undeclared).toEqual([]);
	});

	test("ingen konsument bruker fallback på --scaffold-*", () => {
		const offenders = [];

		for (const file of cssFiles) {
			const source = stripComments(fs.readFileSync(file, "utf8"));

			if (/var\(\s*--scaffold-[a-z0-9-]+\s*,/.test(source) === false) {
				continue;
			}

			offenders.push(path.relative(process.cwd(), file));
		}

		expect(offenders).toEqual([]);
	});

	test("select-sidene overstyrer ikke scaffoldets egne body-properties som søskenklasse", () => {
		const scaffoldOwned = ["overflow-x", "overflow-y", "overscroll-behavior", "scrollbar-width", "flex"];
		const offenders = [];
		const selectScrollBlock = /\.(?:subject|exam)-select-scroll\s*\{([^}]*)\}/g;

		for (const file of cssFiles) {
			const source = stripComments(fs.readFileSync(file, "utf8"));

			for (const match of source.matchAll(selectScrollBlock)) {
				for (const property of scaffoldOwned) {
					if (match[1].includes(`${property}:`) === false) {
						continue;
					}

					offenders.push(`${path.relative(process.cwd(), file)}: ${property}`);
				}
			}
		}

		expect(offenders).toEqual([]);
	});
});

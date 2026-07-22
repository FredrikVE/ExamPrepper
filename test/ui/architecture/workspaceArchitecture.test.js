// test/ui/architecture/workspaceArchitecture.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const PROJECT_ROOT = process.cwd();
const SOURCE_ROOT = path.join(PROJECT_ROOT, "src");
const PAGE_ROOT = path.join(SOURCE_ROOT, "ui", "view", "pages");
const COMPONENT_ROOT = path.join(SOURCE_ROOT, "ui", "view", "components");
const SOURCE_EXTENSIONS = new Set([".js", ".jsx"]);
const IMPORT_SOURCE_PATTERN = /(?:import|export)\s+(?:[\s\S]*?\s+from\s+)?["']([^"']+)["']/g;

const listSourceFiles = (directoryPath) => {
	const entries = fs.readdirSync(directoryPath, { withFileTypes: true });
	const sourceFiles = [];

	for (const entry of entries) {
		const entryPath = path.join(directoryPath, entry.name);

		if (entry.isDirectory()) {
			sourceFiles.push(...listSourceFiles(entryPath));
			continue;
		}

		if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
			sourceFiles.push(entryPath);
		}
	}

	return sourceFiles;
};

const findImportsFromSource = (sourceFragment, directoryPath) => {
	const matchingImports = [];

	for (const sourceFilePath of listSourceFiles(directoryPath)) {
		const sourceText = fs.readFileSync(sourceFilePath, "utf8");
		const importMatches = sourceText.matchAll(IMPORT_SOURCE_PATTERN);

		for (const importMatch of importMatches) {
			if (importMatch[1].includes(sourceFragment)) {
				matchingImports.push({
					filePath: path.relative(PROJECT_ROOT, sourceFilePath),
					importSource: importMatch[1]
				});
			}
		}
	}

	return matchingImports;
};

const findFilesNamed = (fileName, directoryPath) => (
	listSourceFiles(directoryPath).filter((sourceFilePath) => path.basename(sourceFilePath) === fileName)
);

describe("workspace architecture", () => {
	test("has exactly one WorkspaceScaffold implementation", () => {
		const workspaceScaffoldFiles = findFilesNamed("WorkspaceScaffold.jsx", COMPONENT_ROOT);

		expect(workspaceScaffoldFiles).toHaveLength(1);
	});

	test("does not keep or import the old scaffolds", () => {
		const selectPageScaffoldPath = path.join(COMPONENT_ROOT, "SelectPageScaffold", "SelectPageScaffold.jsx");
		const workSpaceScaffoldPath = path.join(COMPONENT_ROOT, "Shared", "WorkSpaceScaffold", "WorkSpaceScaffold.jsx");

		expect(findImportsFromSource("SelectPageScaffold", SOURCE_ROOT)).toEqual([]);
		expect(findImportsFromSource("WorkSpaceScaffold", SOURCE_ROOT)).toEqual([]);
		expect(fs.existsSync(selectPageScaffoldPath)).toBe(false);
		expect(fs.existsSync(workSpaceScaffoldPath)).toBe(false);
	});

	test("keeps LOAD_STATUS inside the ViewModel load-state boundary", () => {
		const viewLoadStatusImports = findImportsFromSource("loadStatus", path.join(SOURCE_ROOT, "ui", "view"));
		const legacyLoadStatusPath = path.join(SOURCE_ROOT, "ui", "loadStatus");

		expect(viewLoadStatusImports).toEqual([]);
		expect(fs.existsSync(legacyLoadStatusPath)).toBe(false);
	});

	test("uses WorkspaceState as the only page-level state boundary", () => {
		const workspaceMessageImports = findImportsFromSource("WorkspaceMessage", SOURCE_ROOT);
		const pageSource = listSourceFiles(PAGE_ROOT)
			.map((pagePath) => fs.readFileSync(pagePath, "utf8"))
			.join("\n");

		expect(workspaceMessageImports).toEqual([]);
		expect(pageSource).not.toContain("pageStatus");
		expect(pageSource).not.toContain("isPageStateBlocking");
	});

	test("routes every page scaffold import to WorkspaceScaffold", () => {
		const pageScaffoldImports = findImportsFromSource("Scaffold", PAGE_ROOT);

		expect(pageScaffoldImports.every(({ importSource }) => importSource.endsWith("/WorkspaceScaffold.jsx"))).toBe(true);
	});

	test("shares one LearningContentHeader between learning-content pages", () => {
		const learningContentHeaderFiles = findFilesNamed("LearningContentHeader.jsx", COMPONENT_ROOT);
		const learningContentHeaderImports = findImportsFromSource("LearningContentHeader", PAGE_ROOT);

		expect(learningContentHeaderFiles).toHaveLength(1);
		expect(learningContentHeaderImports.map(({ filePath }) => filePath).sort()).toEqual([
			"src/ui/view/pages/GlossaryPage.jsx",
			"src/ui/view/pages/LearningContentSelectPage.jsx"
		]);
	});
});

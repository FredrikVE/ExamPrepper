// test/ui/architecture/toggleButtonRowArchitecture.test.js
import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import { describe, expect, test } from "@jest/globals";
import postcss from "postcss";

const SOURCE_ROOT = path.resolve("src");
const COMPONENT_DIRECTORY = path.resolve("src/ui/view/components/ToggleButtonRow");
const FACADE_PATH = path.join(COMPONENT_DIRECTORY, "ToggleButtonRow.jsx");
const DESKTOP_PATH = path.join(COMPONENT_DIRECTORY, "ToggleButtonRowDesktop.jsx");
const MOBILE_PATH = path.join(COMPONENT_DIRECTORY, "ToggleButtonRowMobile.jsx");
const INTERACTION_PATH = path.join(COMPONENT_DIRECTORY, "useToggleButtonRowMobile.js");
const STYLE_DIRECTORY = path.resolve("src/ui/style/ToggleButtonRow");
const STYLE_INDEX_PATH = path.join(STYLE_DIRECTORY, "index.css");
const MOBILE_STYLE_PATH = path.join(STYLE_DIRECTORY, "toggle-button-row-mobile.css");
const APP_STYLE_PATH = path.resolve("src/ui/style/App.css");

function collectFiles(directoryPath, extensions) {
	const filePaths = [];

	for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
		const entryPath = path.join(directoryPath, entry.name);

		if (entry.isDirectory()) {
			filePaths.push(...collectFiles(entryPath, extensions));
			continue;
		}

		if (extensions.has(path.extname(entry.name))) {
			filePaths.push(entryPath);
		}
	}

	return filePaths;
}

function readSource(filePath) {
	return fs.readFileSync(filePath, "utf8");
}

function parseModule(filePath) {
	return parse(readSource(filePath), {
		sourceType: "module",
		plugins: filePath.endsWith(".jsx") ? ["jsx"] : []
	});
}

function collectImports(filePath) {
	const imports = [];

	for (const node of parseModule(filePath).program.body) {
		if (node.type === "ImportDeclaration") {
			imports.push(node.source.value);
		}
	}

	return imports;
}

function resolveImportPath(importerPath, importPath) {
	if (!importPath.startsWith(".")) {
		return null;
	}

	return path.resolve(path.dirname(importerPath), importPath);
}

describe("ToggleButtonRow architecture", () => {
	test("keeps the responsive facade as the only public component entry", () => {
		const sourceFiles = collectFiles(SOURCE_ROOT, new Set([".js", ".jsx"]));
		const externalVariantImporters = [];
		const externalFacadeImporters = [];

		for (const sourceFile of sourceFiles) {
			if (sourceFile.startsWith(COMPONENT_DIRECTORY + path.sep)) {
				continue;
			}

			for (const importPath of collectImports(sourceFile)) {
				const resolvedPath = resolveImportPath(sourceFile, importPath);

				if (resolvedPath === DESKTOP_PATH || resolvedPath === MOBILE_PATH) {
					externalVariantImporters.push(sourceFile);
				}

				if (resolvedPath === FACADE_PATH) {
					externalFacadeImporters.push(sourceFile);
				}
			}
		}

		expect(externalVariantImporters).toEqual([]);
		expect(externalFacadeImporters).toEqual([
			path.resolve("src/ui/view/components/LearningContentHeader/LearningContentHeader.jsx")
		]);
	});

	test("keeps presentation-mode selection in the facade", () => {
		const facadeSource = readSource(FACADE_PATH);
		const desktopSource = readSource(DESKTOP_PATH);
		const mobileSource = readSource(MOBILE_PATH);

		expect(facadeSource).toContain("usePresentationMode()");
		expect(facadeSource).toContain("PRESENTATION_MODE.MOBILE");
		expect(facadeSource).toContain("<ToggleButtonRowDesktop");
		expect(facadeSource).toContain("<ToggleButtonRowMobile");
		expect(facadeSource).toContain("props.mobileActiveEntryId ?? props.activeEntryId");
		expect(desktopSource).not.toContain("usePresentationMode");
		expect(mobileSource).not.toContain("usePresentationMode");
	});

	test("keeps variants and interaction logic free of higher-layer dependencies", () => {
		const forbiddenFragments = [
			"navigation.js",
			"viewmodel/",
			"model/",
			"dependencies.js"
		];

		for (const filePath of [DESKTOP_PATH, MOBILE_PATH, INTERACTION_PATH]) {
			const imports = collectImports(filePath);

			for (const importPath of imports) {
				for (const forbiddenFragment of forbiddenFragments) {
					expect(importPath).not.toContain(forbiddenFragment);
				}
			}
		}
	});

	test("preserves desktop semantics and uses disclosure-appropriate mobile semantics", () => {
		const desktopSource = readSource(DESKTOP_PATH);
		const mobileSource = readSource(MOBILE_PATH);

		expect(desktopSource).toContain('className="toggle-button-row"');
		expect(desktopSource).toContain('role="tablist"');
		expect(desktopSource).toContain('role="tab"');
		expect(desktopSource).toContain("aria-selected={isActive}");
		expect(mobileSource).toContain('role="group"');
		expect(mobileSource).toContain("aria-current={");
		expect(mobileSource).toContain("interaction.backButtonRef");
		expect(mobileSource).not.toContain("<nav");
		expect(mobileSource).not.toContain("aria-expanded");
	});

	test("uses the component CSS entry point without theme or breakpoint drift", () => {
		const styleIndexSource = readSource(STYLE_INDEX_PATH).trim().split("\n");
		const mobileStyleSource = readSource(MOBILE_STYLE_PATH);
		const mobileStyleRoot = postcss.parse(mobileStyleSource, { from: MOBILE_STYLE_PATH });
		const viewportQueries = [];

		mobileStyleRoot.walkAtRules("media", (rule) => {
			if (rule.params.includes("width")) {
				viewportQueries.push(rule.params);
			}
		});

		expect(readSource(APP_STYLE_PATH)).toContain('@import "./ToggleButtonRow/index.css";');
		expect(styleIndexSource).toEqual([
			'@import "./toggle-button-row-desktop.css";',
			'@import "./toggle-button-row-mobile.css";'
		]);
		expect(mobileStyleSource).not.toContain(".dark");
		expect(mobileStyleSource).not.toMatch(/#[0-9a-f]{3,8}\b/i);
		expect(mobileStyleSource).not.toMatch(/rgba?\(/i);
		expect(viewportQueries).toEqual([]);
	});
});

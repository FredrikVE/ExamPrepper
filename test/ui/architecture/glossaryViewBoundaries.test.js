// test/ui/architecture/glossaryViewBoundaries.test.js
import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import { describe, expect, test } from "@jest/globals";

const UI_ROOT = path.resolve("src/ui");
const GLOSSARY_PAGE_VIEWMODEL_PATH = path.resolve("src/ui/viewmodel/GlossaryPageViewModel.js");
const GLOSSARY_RELATIONS_COMPONENT_PATH = path.resolve("src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailRelations.jsx");
const GLOSSARY_INTERACTION_BINDINGS_PATH = path.resolve("src/ui/viewmodel/GlossaryPage/glossaryInteractionBindings.js");
const GLOSSARY_PANEL_STYLE_PATH = path.resolve("src/ui/style/GlossaryPage/glossary-panel.css");
const GLOSSARY_PAGE_STYLE_PATH = path.resolve("src/ui/style/GlossaryPage/page.css");
const GLOSSARY_RESPONSIVE_STYLE_PATH = path.resolve("src/ui/style/GlossaryPage/responsive.css");
const GLOSSARY_TABLE_STYLE_PATH = path.resolve("src/ui/style/GlossaryPage/table.css");
const GLOSSARY_VIEW_ROOTS = [
	path.resolve("src/ui/view/pages/GlossaryPage.jsx"),
	path.resolve("src/ui/view/components/GlossaryPage")
];
const PRIVATE_GLOSSARY_MODULES = new Set([
	path.resolve("src/ui/viewmodel/GlossaryPage/useGlossarySearchModel.js"),
	path.resolve("src/ui/viewmodel/GlossaryPage/useGlossaryDetailModel.js"),
	path.resolve("src/ui/viewmodel/GlossaryPage/useGlossaryTopicAreaSelectionModel.js"),
	path.resolve("src/ui/viewmodel/GlossaryPage/useGlossaryPageResources.js"),
	path.resolve("src/ui/viewmodel/GlossaryPage/glossaryPageDerivations.js"),
	path.resolve("src/ui/viewmodel/GlossaryPage/glossaryInteractionBindings.js")
]);
const VIEW_OWNED_REACT_HOOKS = new Set(["useState", "useEffect", "useRef", "useMemo", "useCallback"]);
const FORBIDDEN_VISUALIZATION_PACKAGES = new Set(["reactflow", "react-flow", "@xyflow/react", "recharts"]);
const FORBIDDEN_GLOSSARY_PRESENTATION_PATHS = new Set([
	path.resolve("src/ui/presentation/usePresentationMode.js"),
	path.resolve("src/ui/presentation/presentationMode.js"),
	path.resolve("src/ui/presentation/useAppShellMode.js"),
	path.resolve("src/ui/presentation/appShellMode.js")
]);

function collectSourceFiles(targetPath) {
	const stats = fs.statSync(targetPath);

	if (stats.isFile()) {
		return [targetPath];
	}

	const files = [];

	for (const entry of fs.readdirSync(targetPath, { withFileTypes: true })) {
		const entryPath = path.join(targetPath, entry.name);

		if (entry.isDirectory()) {
			files.push(...collectSourceFiles(entryPath));
		}

		else if (entry.name.endsWith(".js") || entry.name.endsWith(".jsx")) {
			files.push(entryPath);
		}
	}

	return files;
}

function collectCssFiles(directoryPath) {
	const files = [];

	for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
		const entryPath = path.join(directoryPath, entry.name);

		if (entry.isDirectory()) {
			files.push(...collectCssFiles(entryPath));
		}

		else if (entry.name.endsWith(".css")) {
			files.push(entryPath);
		}
	}

	return files;
}

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

	const resolvedPath = path.resolve(path.dirname(filePath), source);

	if (path.extname(resolvedPath)) {
		return resolvedPath;
	}

	return `${resolvedPath}.js`;
}

describe("Glossary view boundaries", () => {
	test("keeps private Glossary modules behind GlossaryPageViewModel", () => {
		const importersByPrivateModule = new Map();

		for (const privateModulePath of PRIVATE_GLOSSARY_MODULES) {
			importersByPrivateModule.set(privateModulePath, []);
		}

		for (const filePath of collectSourceFiles(UI_ROOT)) {
			for (const importNode of readImports(filePath)) {
				const importedPath = resolveImport(filePath, importNode.source.value);

				if (PRIVATE_GLOSSARY_MODULES.has(importedPath)) {
					importersByPrivateModule.get(importedPath).push(filePath);
				}
			}
		}

		for (const importers of importersByPrivateModule.values()) {
			expect(importers).toEqual([GLOSSARY_PAGE_VIEWMODEL_PATH]);
		}
	});

	test("keeps DOM and CSS presentation out of Glossary interaction bindings", () => {
		const source = fs.readFileSync(GLOSSARY_INTERACTION_BINDINGS_PATH, "utf8");

		expect(source).not.toContain("className");
		expect(source).not.toContain("ariaSort");
		expect(source).not.toContain("sortIconKind");
		expect(source).not.toContain(".closest(");
	});

	test("keeps feature state and effects out of Glossary views", () => {
		for (const glossaryRoot of GLOSSARY_VIEW_ROOTS) {
			for (const filePath of collectSourceFiles(glossaryRoot)) {
				for (const importNode of readImports(filePath)) {
					if (importNode.source.value !== "react") {
						continue;
					}

					const importedNames = importNode.specifiers
						.filter((specifier) => specifier.type === "ImportSpecifier")
						.map((specifier) => specifier.imported.name);

					for (const importedName of importedNames) {
						expect(VIEW_OWNED_REACT_HOOKS.has(importedName)).toBe(false);
					}
				}
			}
		}
	});

	test("keeps shell and viewport presentation state out of the Glossary feature", () => {
		const glossaryFiles = [
			GLOSSARY_PAGE_VIEWMODEL_PATH,
			...GLOSSARY_VIEW_ROOTS.flatMap((root) => collectSourceFiles(root))
		];

		for (const filePath of glossaryFiles) {
			for (const importNode of readImports(filePath)) {
				const importedPath = resolveImport(filePath, importNode.source.value);
				expect(FORBIDDEN_GLOSSARY_PRESENTATION_PATHS.has(importedPath)).toBe(false);
			}
		}
	});

	test("shows the Glossary panel heading only when TopicAreaPanel is hidden", () => {
		const panelStyles = fs.readFileSync(GLOSSARY_PANEL_STYLE_PATH, "utf8");
		const responsiveStyles = fs.readFileSync(GLOSSARY_RESPONSIVE_STYLE_PATH, "utf8");

		expect(panelStyles).toMatch(/\.glossary-panel-heading\s*\{[^}]*display:\s*none;/s);
		expect(responsiveStyles).toMatch(/@media \(max-width: 1320px\)[\s\S]*?\.glossary-topic-area-panel\s*\{[^}]*display:\s*none;/);
		expect(responsiveStyles).toMatch(/@media \(max-width: 1320px\)[\s\S]*?\.glossary-panel-heading\s*\{[^}]*display:\s*flex;/);
	});

	test("centers mastery badges without specificity overrides", () => {
		const tableStyles = fs.readFileSync(GLOSSARY_TABLE_STYLE_PATH, "utf8");

		expect(tableStyles).toMatch(/\.glossary-table \.glossary-table__mastery-header,[\s\S]*?\.glossary-table \.glossary-table__mastery-cell\s*\{[^}]*text-align:\s*center;/);
		expect(tableStyles).toMatch(/\.glossary-table \.glossary-table__mastery-cell\s*\{[^}]*vertical-align:\s*middle;/);
	});

	test("customizes scaffold scrolling only through canonical scaffold hooks", () => {
		const pageStyles = fs.readFileSync(GLOSSARY_PAGE_STYLE_PATH, "utf8");
		const responsiveStyles = fs.readFileSync(GLOSSARY_RESPONSIVE_STYLE_PATH, "utf8");

		expect(pageStyles).not.toContain(".workspace-scaffold-body");
		expect(responsiveStyles).not.toContain(".workspace-scaffold-body");
		expect(pageStyles).toContain("--scaffold-body-overflow-x: clip;");
		expect(pageStyles).toContain("--scaffold-body-overflow-y: clip;");
		expect(responsiveStyles).toContain("--scaffold-body-overflow-x: hidden;");
		expect(responsiveStyles).toContain("--scaffold-body-overflow-y: auto;");
	});

	test("keeps Glossary styles free of important specificity overrides", () => {
		const glossaryStyleRoot = path.resolve("src/ui/style/GlossaryPage");
		const offenders = [];

		for (const filePath of collectCssFiles(glossaryStyleRoot)) {
			if (fs.readFileSync(filePath, "utf8").includes("!important")) {
				offenders.push(path.relative(process.cwd(), filePath));
			}
		}

		expect(offenders).toEqual([]);
	});

	test("keeps relation disclosure body and controller persistent in the DOM contract", () => {
		const source = fs.readFileSync(GLOSSARY_RELATIONS_COMPONENT_PATH, "utf8");

		expect(source).toContain("id={model.contentId}");
		expect(source).toContain("hidden={!model.isExpanded}");
		expect(source).toContain("aria-controls={model.contentId}");
		expect(source).not.toContain("display.toggle");
	});

	test("keeps visualization-library dependencies out of the Glossary feature", () => {
		const glossaryFiles = [
			GLOSSARY_PAGE_VIEWMODEL_PATH,
			...GLOSSARY_VIEW_ROOTS.flatMap((root) => collectSourceFiles(root))
		];

		for (const filePath of glossaryFiles) {
			for (const importNode of readImports(filePath)) {
				expect(FORBIDDEN_VISUALIZATION_PACKAGES.has(importNode.source.value)).toBe(false);
			}
		}
	});
});

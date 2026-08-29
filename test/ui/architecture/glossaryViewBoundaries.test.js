// test/ui/architecture/glossaryViewBoundaries.test.js
import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import { describe, expect, test } from "@jest/globals";

const UI_ROOT = path.resolve("src/ui");
const GLOSSARY_PAGE_VIEWMODEL_PATH = path.resolve("src/ui/viewmodel/GlossaryPageViewModel.js");
const GLOSSARY_RELATIONS_COMPONENT_PATH = path.resolve("src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailRelations.jsx");
const GLOSSARY_PANEL_STYLE_PATH = path.resolve("src/ui/style/GlossaryPage/glossary-panel.css");
const GLOSSARY_PAGE_STYLE_PATH = path.resolve("src/ui/style/GlossaryPage/page.css");
const GLOSSARY_RESPONSIVE_STYLE_PATH = path.resolve("src/ui/style/GlossaryPage/responsive.css");
const GLOSSARY_VIEW_ROOTS = [
	path.resolve("src/ui/view/pages/GlossaryPage.jsx"),
	path.resolve("src/ui/view/components/GlossaryPage")
];
const PRIVATE_GLOSSARY_HOOKS = new Set([
	path.resolve("src/ui/viewmodel/GlossaryPage/useGlossarySearchModel.js"),
	path.resolve("src/ui/viewmodel/GlossaryPage/useGlossaryDetailModel.js"),
	path.resolve("src/ui/viewmodel/GlossaryPage/useGlossaryTopicAreaSelectionModel.js")
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
	test("keeps private Glossary hooks behind GlossaryPageViewModel", () => {
		const importersByPrivateHook = new Map();

		for (const privateHookPath of PRIVATE_GLOSSARY_HOOKS) {
			importersByPrivateHook.set(privateHookPath, []);
		}

		for (const filePath of collectSourceFiles(UI_ROOT)) {
			for (const importNode of readImports(filePath)) {
				const importedPath = resolveImport(filePath, importNode.source.value);

				if (PRIVATE_GLOSSARY_HOOKS.has(importedPath)) {
					importersByPrivateHook.get(importedPath).push(filePath);
				}
			}
		}

		for (const importers of importersByPrivateHook.values()) {
			expect(importers).toEqual([GLOSSARY_PAGE_VIEWMODEL_PATH]);
		}
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

	test("keeps WorkspaceScaffold as the Glossary scroll owner across responsive transitions", () => {
		const pageStyles = fs.readFileSync(GLOSSARY_PAGE_STYLE_PATH, "utf8");
		const responsiveStyles = fs.readFileSync(GLOSSARY_RESPONSIVE_STYLE_PATH, "utf8");

		expect(pageStyles).not.toMatch(/\.glossary-workspace \.workspace-scaffold-body\s*\{[^}]*overflow(?:-[xy])?:/s);
		expect(responsiveStyles).not.toMatch(/\.glossary-workspace \.workspace-scaffold-body\s*\{[^}]*overflow(?:-[xy])?:/s);
		expect(responsiveStyles).toMatch(/@media \(max-width: 932px\)[\s\S]*?\.glossary-table-scroll\s*\{[^}]*height:\s*auto;[^}]*flex:\s*none;[^}]*overflow:\s*visible;[^}]*overscroll-behavior-y:\s*auto;[^}]*touch-action:\s*auto;/);
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

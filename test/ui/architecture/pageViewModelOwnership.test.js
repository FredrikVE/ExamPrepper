//test/ui/architecture/pageViewModelOwnership.test.js
import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import { describe, expect, test } from "@jest/globals";

const APP_PATH = path.resolve("src/App.jsx");
const PAGE_ROOT = path.resolve("src/ui/view/pages");
const COMPONENT_ROOT = path.resolve("src/ui/view/components");
const EXAM_PAGE_PATH = path.join(PAGE_ROOT, "ExamPage.jsx");
const EXAM_PAGE_COMPONENT_DIRECTORY = path.join(COMPONENT_ROOT, "ExamPage");
const EXAM_PAGE_VIEW_MODEL_PATH = path.resolve("src/ui/viewmodel/ExamPageViewModel.js");
const SUBJECT_CATALOG_PATH = path.resolve("src/ui/viewmodel/SubjectCatalog/useSubjectCatalogModel.js");
const FUTURE_PAGE_COMPONENT_DIRECTORIES = [
	path.join(COMPONENT_ROOT, "LearningPathPage"),
	path.join(COMPONENT_ROOT, "LearningSessionPage")
];
const SOURCE_EXTENSIONS = new Set([".js", ".jsx"]);
const FORBIDDEN_IMPORT_FRAGMENTS = ["viewmodel/", "model/", "navigation.js"];
const DOMAIN_STATE_NAME_PATTERN = /(answer|attempt|module|progress|question|result|score|session)/i;

function collectFiles(directoryPath) {
	if (!fs.existsSync(directoryPath)) {
		return [];
	}

	const files = [];

	for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
		const entryPath = path.join(directoryPath, entry.name);

		if (entry.isDirectory()) {
			files.push(...collectFiles(entryPath));
			continue;
		}

		if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
			files.push(entryPath);
		}
	}

	return files;
}

function parseModule(filePath) {
	return parse(fs.readFileSync(filePath, "utf8"), {
		sourceType: "module",
		plugins: filePath.endsWith(".jsx") ? ["jsx"] : []
	});
}

function visitNode(node, visitor) {
	if (node === null || typeof node !== "object") {
		return;
	}

	visitor(node);

	for (const value of Object.values(node)) {
		if (Array.isArray(value)) {
			for (const child of value) {
				visitNode(child, visitor);
			}
			continue;
		}

		visitNode(value, visitor);
	}
}

function getPropertyName(node) {
	if (node.type === "Identifier") {
		return node.name;
	}

	if (node.type === "StringLiteral") {
		return node.value;
	}

	return null;
}

function objectPatternHasProperty(pattern, propertyName) {
	if (pattern.type !== "ObjectPattern") {
		return false;
	}

	return pattern.properties.some((property) => {
		return property.type === "ObjectProperty" && getPropertyName(property.key) === propertyName;
	});
}

function collectImportSources(ast) {
	const sources = [];

	for (const node of ast.program.body) {
		if (node.type === "ImportDeclaration") {
			sources.push(node.source.value);
		}
	}

	return sources;
}

function collectViewModelPropFindings(filePath) {
	const findings = [];
	const ast = parseModule(filePath);

	visitNode(ast, (node) => {
		if (node.type === "JSXAttribute" && node.name.name === "viewModel") {
			findings.push({ filePath: path.relative(process.cwd(), filePath), line: node.loc.start.line });
			return;
		}

		if (!["FunctionDeclaration", "FunctionExpression", "ArrowFunctionExpression"].includes(node.type)) {
			return;
		}

		const firstParameter = node.params[0];

		if (firstParameter && objectPatternHasProperty(firstParameter, "viewModel")) {
			findings.push({ filePath: path.relative(process.cwd(), filePath), line: firstParameter.loc.start.line });
			return;
		}

		if (!firstParameter || firstParameter.type !== "Identifier") {
			return;
		}

		visitNode(node.body, (child) => {
			if (child.type === "MemberExpression" && child.object.type === "Identifier" && child.object.name === firstParameter.name && getPropertyName(child.property) === "viewModel") {
				findings.push({ filePath: path.relative(process.cwd(), filePath), line: child.loc.start.line });
			}

			if (child.type === "VariableDeclarator" && child.init?.type === "Identifier" && child.init.name === firstParameter.name && objectPatternHasProperty(child.id, "viewModel")) {
				findings.push({ filePath: path.relative(process.cwd(), filePath), line: child.loc.start.line });
			}
		});
	});

	return findings;
}

function findQuestionCardOpeningElement(ast) {
	let result = null;

	visitNode(ast, (node) => {
		if (node.type === "JSXOpeningElement" && node.name.type === "JSXIdentifier" && node.name.name === "QuestionCard") {
			result = node;
		}
	});

	return result;
}

function isViewModelMemberExpression(node, propertyName) {
	return node?.type === "MemberExpression" && node.object.type === "Identifier" && node.object.name === "viewModel" && getPropertyName(node.property) === propertyName;
}

function collectQuestionCardModelKeys() {
	const keys = [];
	const ast = parseModule(EXAM_PAGE_VIEW_MODEL_PATH);

	visitNode(ast, (node) => {
		if (node.type !== "VariableDeclarator" || node.id.type !== "Identifier" || node.id.name !== "questionCardModel") {
			return;
		}

		visitNode(node.init, (child) => {
			if (child.type === "ObjectProperty") {
				keys.push(getPropertyName(child.key));
			}
		});
	});

	return keys;
}

function collectFutureOwnershipFindings(directoryPath) {
	const findings = [];

	for (const filePath of collectFiles(directoryPath)) {
		const ast = parseModule(filePath);
		const relativePath = path.relative(process.cwd(), filePath);

		for (const importSource of collectImportSources(ast)) {
			if (FORBIDDEN_IMPORT_FRAGMENTS.some((fragment) => importSource.includes(fragment)) || importSource.includes("UseCase")) {
				findings.push({ filePath: relativePath, kind: "forbidden-import", value: importSource });
			}
		}

		visitNode(ast, (node) => {
			if (node.type === "CallExpression" && node.callee.type === "Identifier" && node.callee.name === "fetch") {
				findings.push({ filePath: relativePath, kind: "fetch-call", line: node.loc.start.line });
			}

			if (node.type === "CallExpression" && node.callee.type === "MemberExpression" && getPropertyName(node.callee.property) === "execute") {
				findings.push({ filePath: relativePath, kind: "use-case-call", line: node.loc.start.line });
			}

			if (node.type !== "VariableDeclarator" || node.id.type !== "ArrayPattern" || node.init?.type !== "CallExpression") {
				return;
			}

			const hookName = node.init.callee.type === "Identifier" ? node.init.callee.name : null;
			const stateName = node.id.elements[0]?.type === "Identifier" ? node.id.elements[0].name : "";

			if (["useState", "useReducer"].includes(hookName) && DOMAIN_STATE_NAME_PATTERN.test(stateName)) {
				findings.push({ filePath: relativePath, kind: "domain-state", line: node.loc.start.line, value: stateName });
			}
		});
	}

	return findings;
}

describe("Page ViewModel ownership", () => {
	test("keeps SubjectCatalog independent of SubjectSelect page internals", () => {
		const subjectCatalogSource = fs.readFileSync(SUBJECT_CATALOG_PATH, "utf8");

		expect(subjectCatalogSource).not.toContain("../SubjectSelectPage/");
	});

	test("mounts SubjectSelect and LearningContentSelect ViewModels inside screen wrappers", () => {
		const appSource = fs.readFileSync(APP_PATH, "utf8");

		expect(appSource).toContain("function SubjectSelectPageWrapper(props)");
		expect(appSource).toContain("function LearningContentSelectPageWrapper(props)");
		expect(appSource).toContain("<SubjectSelectPageWrapper");
		expect(appSource).toContain("<LearningContentSelectPageWrapper");
		expect(appSource).not.toContain("const subjectSelectPageViewModel = useSubjectSelectPageViewModel");
		expect(appSource).not.toContain("const learningContentSelectPageViewModel = useLearningContentSelectPageViewModel");
	});

	test("allows the ExamPage composition root to receive its ViewModel", () => {
		const ast = parseModule(EXAM_PAGE_PATH);
		const defaultExport = ast.program.body.find((node) => node.type === "ExportDefaultDeclaration");

		expect(defaultExport.declaration.type).toBe("FunctionDeclaration");
		expect(objectPatternHasProperty(defaultExport.declaration.params[0], "viewModel")).toBe(true);
	});

	test("keeps ExamPage feature components free of Page ViewModels and higher-layer imports", () => {
		const viewModelPropFindings = [];
		const forbiddenImports = [];

		for (const filePath of collectFiles(EXAM_PAGE_COMPONENT_DIRECTORY)) {
			viewModelPropFindings.push(...collectViewModelPropFindings(filePath));

			for (const importSource of collectImportSources(parseModule(filePath))) {
				if (FORBIDDEN_IMPORT_FRAGMENTS.some((fragment) => importSource.includes(fragment))) {
					forbiddenImports.push({ filePath: path.relative(process.cwd(), filePath), importSource });
				}
			}
		}

		expect(viewModelPropFindings).toEqual([]);
		expect(forbiddenImports).toEqual([]);
	});

	test("binds QuestionCard identity separately from its presentation model", () => {
		const openingElement = findQuestionCardOpeningElement(parseModule(EXAM_PAGE_PATH));
		const keyAttribute = openingElement.attributes.find((attribute) => attribute.type === "JSXAttribute" && attribute.name.name === "key");
		const modelSpread = openingElement.attributes.find((attribute) => attribute.type === "JSXSpreadAttribute");

		expect(isViewModelMemberExpression(keyAttribute.value.expression, "currentQuestionRenderKey")).toBe(true);
		expect(isViewModelMemberExpression(modelSpread.argument, "questionCardModel")).toBe(true);
		expect(collectQuestionCardModelKeys()).not.toContain("key");
	});

	test("automatically gates LearningPath and LearningSession feature-component ownership", () => {
		const findings = [];

		for (const directoryPath of FUTURE_PAGE_COMPONENT_DIRECTORIES) {
			for (const filePath of collectFiles(directoryPath)) {
				findings.push(...collectViewModelPropFindings(filePath));
			}

			findings.push(...collectFutureOwnershipFindings(directoryPath));
		}

		expect(findings).toEqual([]);
	});
});

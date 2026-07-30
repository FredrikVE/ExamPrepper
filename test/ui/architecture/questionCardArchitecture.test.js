//test/ui/architecture/questionCardArchitecture.test.js
import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import { describe, expect, test } from "@jest/globals";
import postcss from "postcss";
import { QUESTION_TYPES } from "../../../src/constants/QuestionTypes.js";

const SOURCE_ROOT = path.resolve("src");
const COMPONENT_ROOT = path.resolve("src/ui/view/components");
const PAGE_ROOT = path.resolve("src/ui/view/pages");
const QUESTION_CARD_DIRECTORY = path.join(COMPONENT_ROOT, "QuestionCard");
const QUESTION_CARD_PUBLIC_ENTRY = path.join(QUESTION_CARD_DIRECTORY, "QuestionCard.jsx");
const EXAM_PAGE_PATH = path.join(PAGE_ROOT, "ExamPage.jsx");
const EXAM_PAGE_CONTENT_PATH = path.join(COMPONENT_ROOT, "ExamPage", "ExamPageContent.jsx");
const EXAM_PAGE_VIEW_MODEL_PATH = path.resolve("src/ui/viewmodel/ExamPageViewModel.js");
const STYLE_ROOT = path.resolve("src/ui/style");
const APP_STYLE_PATH = path.join(STYLE_ROOT, "App.css");
const QUESTION_CARD_STYLE_ENTRY = path.join(STYLE_ROOT, "QuestionCard", "index.css");
const SOURCE_EXTENSIONS = new Set([".js", ".jsx"]);
const TRANSFORM_ANSWERS_PATH = path.resolve("src/ui/viewmodel/Utils/transformAnswersForApi.js");
const RAW_QUESTION_TYPE_VALUES = new Set(Object.values(QUESTION_TYPES));

function collectFiles(directoryPath, extensions) {
	const files = [];

	for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
		const entryPath = path.join(directoryPath, entry.name);

		if (entry.isDirectory()) {
			files.push(...collectFiles(entryPath, extensions));
			continue;
		}

		if (extensions.has(path.extname(entry.name))) {
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

function collectImports(filePath) {
	const imports = [];

	for (const node of parseModule(filePath).program.body) {
		if (node.type === "ImportDeclaration") {
			imports.push(node.source.value);
		}
	}

	return imports;
}

function resolveImportPath(importerPath, importSource) {
	if (!importSource.startsWith(".")) {
		return null;
	}

	return path.resolve(path.dirname(importerPath), importSource);
}

function isInsideDirectory(filePath, directoryPath) {
	return filePath === directoryPath || filePath.startsWith(directoryPath + path.sep);
}

function isPageOwnedComponent(filePath) {
	if (isInsideDirectory(filePath, PAGE_ROOT)) {
		return true;
	}

	if (!isInsideDirectory(filePath, COMPONENT_ROOT)) {
		return false;
	}

	const relativePath = path.relative(COMPONENT_ROOT, filePath);
	const ownerDirectory = relativePath.split(path.sep)[0];
	return ownerDirectory.endsWith("Page");
}

function collectCssImports(filePath) {
	const imports = [];
	const root = postcss.parse(fs.readFileSync(filePath, "utf8"), { from: filePath });

	root.walkAtRules("import", (rule) => {
		const match = rule.params.match(/^["']([^"']+)["']/);

		if (match !== null) {
			imports.push(match[1]);
		}
	});

	return imports;
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

function getStringValue(node) {
	if (node !== null && node.type === "StringLiteral") {
		return node.value;
	}

	return null;
}

function getMemberPropertyName(node) {
	if (node.type !== "MemberExpression") {
		return null;
	}

	if (!node.computed && node.property.type === "Identifier") {
		return node.property.name;
	}

	return getStringValue(node.property);
}

function isQuestionTypeReference(node) {
	return node !== null && node.type === "MemberExpression" && node.object.type === "Identifier" && node.object.name === "question" && getMemberPropertyName(node) === "type";
}

function collectRawQuestionTypeDecisions() {
	const findings = [];
	const files = collectFiles(QUESTION_CARD_DIRECTORY, SOURCE_EXTENSIONS);
	files.push(TRANSFORM_ANSWERS_PATH);

	for (const filePath of files) {
		visitNode(parseModule(filePath), (node) => {
			if (node.type === "BinaryExpression" && ["==", "===", "!=", "!=="].includes(node.operator)) {
				const leftValue = getStringValue(node.left);
				const rightValue = getStringValue(node.right);
				const value = isQuestionTypeReference(node.left) ? rightValue : leftValue;
				const comparesQuestionType = isQuestionTypeReference(node.left) || isQuestionTypeReference(node.right);

				if (comparesQuestionType && RAW_QUESTION_TYPE_VALUES.has(value)) {
					findings.push({
						filePath: path.relative(process.cwd(), filePath),
						kind: "comparison",
						line: node.loc.start.line,
						value
					});
				}
			}

			if (node.type === "SwitchStatement" && isQuestionTypeReference(node.discriminant)) {
				for (const switchCase of node.cases) {
					const value = getStringValue(switchCase.test);

					if (RAW_QUESTION_TYPE_VALUES.has(value)) {
						findings.push({
							filePath: path.relative(process.cwd(), filePath),
							kind: "switch-case",
							line: switchCase.loc.start.line,
							value
						});
					}
				}
			}

			if (node.type === "VariableDeclarator" && node.id.type === "Identifier" && /question|renderer|type/i.test(node.id.name) && node.init !== null && node.init.type === "ObjectExpression") {
				for (const property of node.init.properties) {
					if (property.type !== "ObjectProperty") {
						continue;
					}

					const keyValue = property.key.type === "Identifier" ? property.key.name : getStringValue(property.key);
					const value = getStringValue(property.value);
					const rawValue = RAW_QUESTION_TYPE_VALUES.has(keyValue) ? keyValue : value;

					if (RAW_QUESTION_TYPE_VALUES.has(rawValue)) {
						findings.push({
							filePath: path.relative(process.cwd(), filePath),
							kind: "local-type-map",
							line: property.loc.start.line,
							value: rawValue
						});
					}
				}
			}
		});
	}

	return findings;
}

describe("QuestionCard architecture", () => {
	test("exposes QuestionCard.jsx as the only public component entry", () => {
		const invalidImports = [];

		for (const sourceFile of collectFiles(SOURCE_ROOT, SOURCE_EXTENSIONS)) {
			if (isInsideDirectory(sourceFile, QUESTION_CARD_DIRECTORY)) {
				continue;
			}

			for (const importSource of collectImports(sourceFile)) {
				const resolvedPath = resolveImportPath(sourceFile, importSource);

				if (resolvedPath === null || !isInsideDirectory(resolvedPath, QUESTION_CARD_DIRECTORY)) {
					continue;
				}

				if (resolvedPath !== QUESTION_CARD_PUBLIC_ENTRY) {
					invalidImports.push({
						filePath: path.relative(process.cwd(), sourceFile),
						importSource
					});
				}
			}
		}

		expect(invalidImports).toEqual([]);
	});

	test("does not depend on page-owned components", () => {
		const invalidImports = [];

		for (const sourceFile of collectFiles(QUESTION_CARD_DIRECTORY, SOURCE_EXTENSIONS)) {
			for (const importSource of collectImports(sourceFile)) {
				const resolvedPath = resolveImportPath(sourceFile, importSource);

				if (resolvedPath !== null && isPageOwnedComponent(resolvedPath)) {
					invalidImports.push({
						filePath: path.relative(process.cwd(), sourceFile),
						importSource
					});
				}
			}
		}

		expect(invalidImports).toEqual([]);
	});

	test("loads QuestionCard CSS from App.css only", () => {
		let appImportCount = 0;
		const invalidImporters = [];

		for (const styleFile of collectFiles(STYLE_ROOT, new Set([".css"]))) {
			for (const importSource of collectCssImports(styleFile)) {
				if (!importSource.startsWith(".")) {
					continue;
				}

				const resolvedPath = path.resolve(path.dirname(styleFile), importSource);

				if (resolvedPath !== QUESTION_CARD_STYLE_ENTRY) {
					continue;
				}

				if (styleFile === APP_STYLE_PATH) {
					appImportCount += 1;
					continue;
				}

				invalidImporters.push(path.relative(process.cwd(), styleFile));
			}
		}

		expect(appImportCount).toBe(1);
		expect(invalidImporters).toEqual([]);
	});

	test("uses QUESTION_TYPES for question type decisions", () => {
		expect(collectRawQuestionTypeDecisions()).toEqual([]);
	});

	test("keeps ExamPage on the public QuestionCard facade", () => {
		const questionCardImports = [];

		for (const importSource of collectImports(EXAM_PAGE_PATH)) {
			const resolvedPath = resolveImportPath(EXAM_PAGE_PATH, importSource);

			if (resolvedPath !== null && isInsideDirectory(resolvedPath, QUESTION_CARD_DIRECTORY)) {
				questionCardImports.push(resolvedPath);
			}
		}

		expect(questionCardImports).toEqual([QUESTION_CARD_PUBLIC_ENTRY]);
	});

	test("renders QuestionCard directly from a null-safe ViewModel model", () => {
		const examPageSource = fs.readFileSync(EXAM_PAGE_PATH, "utf8");
		const examPageViewModelSource = fs.readFileSync(EXAM_PAGE_VIEW_MODEL_PATH, "utf8");

		expect(fs.existsSync(EXAM_PAGE_CONTENT_PATH)).toBe(false);
		expect(examPageSource).toContain("viewModel.questionCardModel !== null");
		expect(examPageSource).toContain("<QuestionCard key={viewModel.currentQuestionRenderKey} {...viewModel.questionCardModel} />");
		expect(examPageSource).not.toContain("answers[");
		expect(examPageSource).not.toContain("ExamPageContent");
		expect(examPageViewModelSource).toContain("const questionCardModel = currentQuestion === null ? null : {");
		expect(examPageViewModelSource).toContain("answer: answers[currentQuestion.id] ?? null");
		expect(examPageViewModelSource).toContain("questionCardModel,");
	});
});

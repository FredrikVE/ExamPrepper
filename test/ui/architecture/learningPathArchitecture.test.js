//test/ui/architecture/learningPathArchitecture.test.js
import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import { describe, expect, test } from "@jest/globals";

const PAGE_FILES = ["LearningPathPage.jsx", "LearningSessionPage.jsx"];
const FEATURE_DIRECTORIES = ["LearningPathPage", "LearningSessionPage"];

function collectFiles(directory) {
	const files = [];
	for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
		const entryPath = path.join(directory, entry.name);
		if (entry.isDirectory()) files.push(...collectFiles(entryPath));
		else if ([".js", ".jsx"].includes(path.extname(entry.name))) files.push(entryPath);
	}
	return files;
}

function importSources(filePath) {
	const ast = parse(fs.readFileSync(filePath, "utf8"), { sourceType: "module", plugins: filePath.endsWith(".jsx") ? ["jsx"] : [] });
	return ast.program.body.filter((node) => node.type === "ImportDeclaration").map((node) => node.source.value);
}

describe("LearningPath architecture", () => {
	test("keeps contract tests and fixtures under test", () => {
		expect(fs.existsSync(path.resolve("contracts"))).toBe(false);
		expect(fs.existsSync(path.resolve("test/contracts"))).toBe(true);
		expect(fs.existsSync(path.resolve("test/fixtures/grading/question-grading-fixtures.json"))).toBe(true);
		expect(fs.existsSync(path.resolve("test/fixtures/learning-path/learning-path-response.json"))).toBe(true);
	});

	test("keeps model imports out of Pages", () => {
		for (const fileName of PAGE_FILES) {
			const sources = importSources(path.resolve("src/ui/view/pages", fileName));
			expect(sources.some((source) => source.includes("/model/") || source.includes("/viewmodel/"))).toBe(false);
		}
	});

	test("keeps Page ViewModels out of feature and Atomic components", () => {
		for (const directoryName of FEATURE_DIRECTORIES) {
			for (const filePath of collectFiles(path.resolve("src/ui/view/components", directoryName))) {
				const source = fs.readFileSync(filePath, "utf8");
				expect(source).not.toMatch(/\bviewModel\b/);
				expect(importSources(filePath).some((entry) => entry.includes("viewmodel/") || entry.includes("model/") || entry.includes("navigation.js"))).toBe(false);
			}
		}
	});

	test("binds LearningSession QuestionCard identity outside its presentation model", () => {
		const pageSource = fs.readFileSync(path.resolve("src/ui/view/pages/LearningSessionPage.jsx"), "utf8");
		const viewModelSource = fs.readFileSync(path.resolve("src/ui/viewmodel/LearningSessionPageViewModel.js"), "utf8");
		expect(pageSource).toContain("key={viewModel.currentQuestionRenderKey}");
		expect(viewModelSource).not.toMatch(/questionCardModel[^;]*\bkey\s*:/s);
	});

	test("keeps module status and session answer state in ViewModels", () => {
		const pathComponents = collectFiles(path.resolve("src/ui/view/components/LearningPathPage")).map((filePath) => fs.readFileSync(filePath, "utf8")).join("\n");
		const sessionComponents = collectFiles(path.resolve("src/ui/view/components/LearningSessionPage")).map((filePath) => fs.readFileSync(filePath, "utf8")).join("\n");
		expect(pathComponents).not.toMatch(/createModuleStatus|masteryPercent\s*[<>=]/);
		expect(sessionComponents).not.toMatch(/useState|useReducer|answersBySessionQuestionId|resultsBySessionQuestionId/);
	});
});

// test/ui/architecture/viewModelPropsStyle.test.js
import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import { describe, expect, test } from "@jest/globals";

const PUBLIC_VIEW_MODEL_FILES = [
	"src/ui/viewmodel/AppNavigationViewModel.js",
	"src/ui/viewmodel/ExamPageViewModel.js",
	"src/ui/viewmodel/FlipcardsPageViewModel.js",
	"src/ui/viewmodel/GlossaryPageViewModel.js",
	"src/ui/viewmodel/LearningContentSelectPageViewModel.js",
	"src/ui/viewmodel/LearningPathPageViewModel.js",
	"src/ui/viewmodel/LearningSessionPageViewModel.js",
	"src/ui/viewmodel/MatchCardsPageViewModel.js",
	"src/ui/viewmodel/StatisticsPageViewModel.js",
	"src/ui/viewmodel/SubjectCatalog/useSubjectCatalogModel.js",
	"src/ui/viewmodel/SubjectSelectPageViewModel.js"
];

function parseModule(filePath) {
	return parse(fs.readFileSync(filePath, "utf8"), {
		sourceType: "module"
	});
}

function readDefaultExportedFunction(filePath) {
	const ast = parseModule(filePath);
	const defaultExport = ast.program.body.find((node) => node.type === "ExportDefaultDeclaration");

	if (defaultExport?.declaration.type !== "FunctionDeclaration") {
		throw new Error(`Expected ${filePath} to default-export a function declaration`);
	}

	return defaultExport.declaration;
}

function visitAst(node, visitor) {
	if (node === null || typeof node !== "object") {
		return;
	}

	visitor(node);

	for (const value of Object.values(node)) {
		if (Array.isArray(value)) {
			for (const child of value) {
				visitAst(child, visitor);
			}
			continue;
		}

		visitAst(value, visitor);
	}
}

function collectPropsDestructuring(functionNode) {
	const destructuringNodes = [];

	visitAst(functionNode.body, (node) => {
		if (
			node.type === "VariableDeclarator"
			&& node.id.type === "ObjectPattern"
			&& node.init?.type === "Identifier"
			&& node.init.name === "props"
		) {
			destructuringNodes.push(node);
		}
	});

	return destructuringNodes;
}

describe("public ViewModel props style", () => {
	test.each(PUBLIC_VIEW_MODEL_FILES)("keeps %s on an explicit props boundary", (relativeFilePath) => {
		const filePath = path.resolve(relativeFilePath);
		const viewModelFunction = readDefaultExportedFunction(filePath);

		expect(viewModelFunction.params).toHaveLength(1);
		expect(viewModelFunction.params[0]).toMatchObject({
			type: "Identifier",
			name: "props"
		});
		expect(collectPropsDestructuring(viewModelFunction)).toHaveLength(0);
	});
});

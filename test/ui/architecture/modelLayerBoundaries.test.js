// test/ui/architecture/modelLayerBoundaries.test.js
import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import { describe, expect, test } from "@jest/globals";

const sourceRoot = path.resolve("src");
const viewModelRoot = path.join(sourceRoot, "ui/viewmodel");
const domainRoot = path.join(sourceRoot, "model/domain");
const repositoryRoot = path.join(sourceRoot, "model/repositories");

function collectSourceFiles(directoryPath) {
	const files = [];

	for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
		const entryPath = path.join(directoryPath, entry.name);

		if (entry.isDirectory()) {
			files.push(...collectSourceFiles(entryPath));
			continue;
		}

		if (entry.name.endsWith(".js") || entry.name.endsWith(".jsx")) {
			files.push(entryPath);
		}
	}

	return files;
}

function readImports(filePath) {
	const source = fs.readFileSync(filePath, "utf8");
	const ast = parse(source, {
		sourceType: "module",
		plugins: filePath.endsWith(".jsx") ? ["jsx"] : []
	});
	const imports = [];

	for (const node of ast.program.body) {
		if (node.type === "ImportDeclaration") {
			imports.push(node.source.value);
		}
	}

	return imports;
}

function findForbiddenImports(directoryPath, forbiddenSegments) {
	const violations = [];

	for (const filePath of collectSourceFiles(directoryPath)) {
		for (const importSource of readImports(filePath)) {
			if (forbiddenSegments.some((segment) => importSource.includes(segment))) {
				violations.push(`${path.relative(sourceRoot, filePath)} -> ${importSource}`);
			}
		}
	}

	return violations;
}

describe("model layer boundaries", () => {
	test("keeps repository implementations flat", () => {
		const repositoryDirectories = fs.readdirSync(repositoryRoot, { withFileTypes: true })
			.filter((entry) => entry.isDirectory())
			.map((entry) => entry.name);

		expect(repositoryDirectories).toEqual([]);
	});

	test("keeps domain limited to Use Cases", () => {
		const nonUseCaseFiles = collectSourceFiles(domainRoot)
			.filter((filePath) => !path.basename(filePath).endsWith("UseCase.js"))
			.map((filePath) => path.relative(domainRoot, filePath));

		expect(nonUseCaseFiles).toEqual([]);
	});

	test("keeps ViewModels behind Use Cases instead of Repository or DataSource imports", () => {
		expect(findForbiddenImports(viewModelRoot, ["model/repositories/", "model/datasource/"])).toEqual([]);
	});

	test("keeps domain Use Cases above the DataSource layer", () => {
		expect(findForbiddenImports(domainRoot, ["model/datasource/", "../datasource/", "../../datasource/"])).toEqual([]);
	});
});

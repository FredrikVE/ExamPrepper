// test/ui/architecture/dataSourceNaming.test.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "@babel/parser";
import { describe, expect, test } from "@jest/globals";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const dataSourceDirectory = path.resolve(testDirectory, "../../../src/model/datasource");

function getPublicFeatureMethods(filePath) {
	const source = fs.readFileSync(filePath, "utf8");
	const ast = parse(source, { sourceType: "module" });
	const methods = [];

	for (const node of ast.program.body) {
		if (node.type !== "ExportDefaultDeclaration" || node.declaration?.type !== "ClassDeclaration") {
			continue;
		}

		for (const member of node.declaration.body.body) {
			if (member.type !== "ClassMethod" || member.kind === "constructor") {
				continue;
			}

			if (member.key.type === "Identifier") {
				methods.push(member.key.name);
			}
		}
	}

	return methods;
}

describe("DataSource naming", () => {
	test("does not use the redundant Api prefix", () => {
		const prefixedFiles = fs.readdirSync(dataSourceDirectory)
			.filter((fileName) => fileName.endsWith("DataSource.js"))
			.filter((fileName) => fileName.startsWith("Api"));

		expect(prefixedFiles).toEqual([]);
	});

	test("uses fetch prefix for public concrete DataSource feature methods", () => {
		const violations = [];

		for (const fileName of fs.readdirSync(dataSourceDirectory)) {
			if (!fileName.endsWith("DataSource.js") || fileName === "DataSource.js") {
				continue;
			}

			const filePath = path.join(dataSourceDirectory, fileName);
			for (const methodName of getPublicFeatureMethods(filePath)) {
				if (!methodName.startsWith("fetch")) {
					violations.push(`${fileName}:${methodName}`);
				}
			}
		}

		expect(violations).toEqual([]);
	});
});

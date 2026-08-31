import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import { describe, expect, test } from "@jest/globals";

const GLOSSARY_RENDERER_PATHS = [
	path.resolve("src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryTableRow.jsx")
];

function parseModule(filePath) {
	return parse(fs.readFileSync(filePath, "utf8"), {
		sourceType: "module",
		plugins: ["jsx"]
	});
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

function readFormattedTextUsage(filePath) {
	let importsCanonicalRenderer = false;
	const textProperties = new Set();

	visitAst(parseModule(filePath), (node) => {
		if (node.type === "ImportDeclaration" && node.source.value === "../../Shared/FormattedText.jsx") {
			importsCanonicalRenderer = node.specifiers.some((specifier) => specifier.local.name === "FormattedText");
			return;
		}

		if (node.type !== "JSXOpeningElement" || node.name.type !== "JSXIdentifier" || node.name.name !== "FormattedText") {
			return;
		}

		const textAttribute = node.attributes.find((attribute) => attribute.type === "JSXAttribute" && attribute.name.name === "text");
		const expression = textAttribute?.value?.expression;

		if (
			expression?.type === "MemberExpression"
			&& expression.object.type === "Identifier"
			&& expression.object.name === "row"
			&& expression.property.type === "Identifier"
		) {
			textProperties.add(expression.property.name);
		}
	});

	return {
		importsCanonicalRenderer,
		textProperties
	};
}

describe("Glossary formatted-text rendering", () => {
	test("renders glossary terms and explanations through the canonical markdown-like renderer", () => {
		for (const rendererPath of GLOSSARY_RENDERER_PATHS) {
			const usage = readFormattedTextUsage(rendererPath);

			expect(usage.importsCanonicalRenderer).toBe(true);
			expect(usage.textProperties).toEqual(new Set(["term", "explanation"]));
		}
	});
});

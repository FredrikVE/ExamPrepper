import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";
import { parse } from "@babel/parser";
import postcss from "postcss";
import selectorParser from "postcss-selector-parser";

const PAGES_DIRECTORY = path.resolve("src/ui/view/pages");
const SCAFFOLD_PATH = path.resolve("src/ui/view/components/WorkspaceScaffold/WorkspaceScaffold.jsx");
const STYLE_DIRECTORIES = [
	path.resolve("src/ui/style/SubjectSelectPage"),
	path.resolve("src/ui/style/LearningContentSelectPage")
];

function collectFiles(directory, extension) {
	const entries = fs.readdirSync(directory, { withFileTypes: true });
	const files = [];

	for (const entry of entries) {
		const entryPath = path.join(directory, entry.name);
		if (entry.isDirectory()) {
			files.push(...collectFiles(entryPath, extension));
			continue;
		}

		if (entry.name.endsWith(extension)) {
			files.push(entryPath);
		}
	}

	return files;
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

function parseJsx(filePath) {
	return parse(fs.readFileSync(filePath, "utf8"), {
		sourceType: "module",
		plugins: ["jsx"]
	});
}

function findWorkspaceScaffoldAttributes() {
	const consumers = [];

	for (const filePath of collectFiles(PAGES_DIRECTORY, ".jsx")) {
		visitNode(parseJsx(filePath), (node) => {
			if (node.type !== "JSXOpeningElement" || node.name.type !== "JSXIdentifier" || node.name.name !== "WorkspaceScaffold") {
				return;
			}

			consumers.push({
				filePath,
				attributeNames: node.attributes
					.filter((attribute) => attribute.type === "JSXAttribute")
					.map((attribute) => attribute.name.name)
			});
		});
	}

	return consumers;
}

function collectCssRules() {
	const rules = [];

	for (const directory of STYLE_DIRECTORIES) {
		for (const filePath of collectFiles(directory, ".css")) {
			const root = postcss.parse(fs.readFileSync(filePath, "utf8"), { from: filePath });
			root.walkRules((rule) => {
				const selectors = [];
				selectorParser((selectorRoot) => {
					selectorRoot.each((selector) => selectors.push(selector.toString()));
				}).processSync(rule.selector);
				rules.push({ filePath, selectors, declarations: rule.nodes.filter((node) => node.type === "decl").map((node) => node.prop) });
			});
		}
	}

	return rules;
}

describe("WorkspaceScaffold content contract", () => {
	test("does not expose or consume a dynamic content class escape hatch", () => {
		const consumers = findWorkspaceScaffoldAttributes();
		expect(consumers).toHaveLength(7);

		for (const consumer of consumers) {
			expect(consumer.attributeNames).not.toContain("contentClassName");
		}

		const scaffoldSource = fs.readFileSync(SCAFFOLD_PATH, "utf8");
		expect(scaffoldSource).not.toContain("contentClassName");
		expect(scaffoldSource).toContain('className="workspace-scaffold-body"');
	});

	test("keeps page-specific padding on wrappers inside children", () => {
		const rules = collectCssRules();
		const pageContentRules = rules.filter((rule) => rule.selectors.some((selector) => selector.includes("subject-select-page-content") || selector.includes("learning-content-select-page-content")));
		expect(pageContentRules.length).toBeGreaterThan(0);

		for (const rule of pageContentRules) {
			for (const property of rule.declarations) {
				expect(["padding", "padding-top"]).toContain(property);
			}
		}

		for (const rule of rules) {
			expect(rule.selectors).not.toContain(".subject-select-scroll");
			expect(rule.selectors).not.toContain(".exam-select-scroll");
		}
	});

	test("does not teach the scaffold implementation about page names", () => {
		const scaffoldSource = fs.readFileSync(SCAFFOLD_PATH, "utf8");
		expect(scaffoldSource).not.toMatch(/subject|exam|statistics|glossary|flipcard|matchcard/i);
	});
});

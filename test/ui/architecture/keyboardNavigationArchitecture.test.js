// test/ui/architecture/keyboardNavigationArchitecture.test.js
import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import { describe, expect, test } from "@jest/globals";

const SOURCE_DIRECTORY = path.resolve("src");
const KEYBOARD_NAVIGATION_DIRECTORY = path.resolve("src/ui/view/KeyboardNavigation");
const KEYBOARD_SHORTCUTS_PATH = path.join(KEYBOARD_NAVIGATION_DIRECTORY, "useKeyboardShortcuts.js");
const REQUIRED_SHORTCUT_OPTIONS = ["isEnabled", "onKeyDown"];

function collectSourceFiles(directory) {
	const files = [];

	for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
		const entryPath = path.join(directory, entry.name);
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

function parseModule(filePath) {
	return parse(fs.readFileSync(filePath, "utf8"), {
		sourceType: "module",
		plugins: filePath.endsWith(".jsx") ? ["jsx"] : []
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

function toProjectPath(filePath) {
	return path.relative(process.cwd(), filePath).split(path.sep).join("/");
}

function collectGlobalKeydownLifecycleCalls(filePath) {
	const calls = [];

	visitAst(parseModule(filePath), (node) => {
		if (
			node.type !== "CallExpression"
			|| node.callee.type !== "MemberExpression"
			|| node.callee.computed
			|| node.callee.object.type !== "Identifier"
			|| !["window", "document"].includes(node.callee.object.name)
			|| node.callee.property.type !== "Identifier"
			|| !["addEventListener", "removeEventListener"].includes(node.callee.property.name)
			|| node.arguments[0]?.type !== "StringLiteral"
			|| node.arguments[0].value !== "keydown"
		) {
			return;
		}

		calls.push({
			filePath: toProjectPath(filePath),
			target: node.callee.object.name,
			method: node.callee.property.name
		});
	});

	return calls;
}

function collectShortcutHookLocalNames(ast, filePath) {
	const localNames = new Set();

	for (const node of ast.program.body) {
		if (node.type !== "ImportDeclaration" || !node.source.value.startsWith(".")) {
			continue;
		}

		const importPath = path.resolve(path.dirname(filePath), node.source.value);
		if (importPath !== KEYBOARD_SHORTCUTS_PATH) {
			continue;
		}

		for (const specifier of node.specifiers) {
			if (specifier.type === "ImportDefaultSpecifier") {
				localNames.add(specifier.local.name);
			}
		}
	}

	return localNames;
}

function collectUseKeyboardShortcutsCalls(filePath) {
	const ast = parseModule(filePath);
	const localNames = collectShortcutHookLocalNames(ast, filePath);
	const calls = [];

	visitAst(ast, (node) => {
		if (
			node.type === "CallExpression"
			&& node.callee.type === "Identifier"
			&& localNames.has(node.callee.name)
		) {
			calls.push(node);
		}
	});

	return calls;
}

function collectObjectPropertyNames(objectExpression) {
	return new Set(objectExpression.properties.flatMap((property) => {
		if (property.type !== "ObjectProperty" || property.computed || property.key.type !== "Identifier") {
			return [];
		}

		return [property.key.name];
	}));
}

function hasDefaultParameter(functionDeclaration) {
	let hasDefault = false;

	for (const parameter of functionDeclaration.params) {
		visitAst(parameter, (node) => {
			if (node.type === "AssignmentPattern") {
				hasDefault = true;
			}
		});
	}

	return hasDefault;
}

function collectExportedFunctionDefaultViolations(filePath) {
	const violations = [];

	for (const node of parseModule(filePath).program.body) {
		if (
			(node.type !== "ExportDefaultDeclaration" && node.type !== "ExportNamedDeclaration")
			|| node.declaration?.type !== "FunctionDeclaration"
		) {
			continue;
		}

		if (hasDefaultParameter(node.declaration)) {
			violations.push(node.declaration.id?.name ?? "default export");
		}
	}

	return violations;
}

describe("keyboard navigation architecture", () => {
	test("keeps global keydown listener lifecycle in the canonical hook", () => {
		const calls = collectSourceFiles(SOURCE_DIRECTORY)
			.flatMap(collectGlobalKeydownLifecycleCalls)
			.sort((left, right) => left.method.localeCompare(right.method));

		expect(calls).toEqual([
			{
				filePath: toProjectPath(KEYBOARD_SHORTCUTS_PATH),
				target: "window",
				method: "addEventListener"
			},
			{
				filePath: toProjectPath(KEYBOARD_SHORTCUTS_PATH),
				target: "window",
				method: "removeEventListener"
			}
		]);
	});

	test("requires every useKeyboardShortcuts consumer to pass the complete contract", () => {
		const calls = [];
		const violations = [];

		for (const filePath of collectSourceFiles(SOURCE_DIRECTORY)) {
			for (const call of collectUseKeyboardShortcutsCalls(filePath)) {
				calls.push(filePath);
				const options = call.arguments[0];
				if (call.arguments.length !== 1 || options?.type !== "ObjectExpression") {
					violations.push(toProjectPath(filePath));
					continue;
				}

				const propertyNames = collectObjectPropertyNames(options);
				if (REQUIRED_SHORTCUT_OPTIONS.some((name) => !propertyNames.has(name))) {
					violations.push(toProjectPath(filePath));
				}
			}
		}

		expect(calls.length).toBeGreaterThan(0);
		expect(violations).toEqual([]);
	});

	test("keeps exported KeyboardNavigation contracts free of parameter defaults", () => {
		const violations = collectSourceFiles(KEYBOARD_NAVIGATION_DIRECTORY).flatMap((filePath) => {
			return collectExportedFunctionDefaultViolations(filePath).map((exportName) => ({
				filePath: toProjectPath(filePath),
				exportName
			}));
		});

		expect(violations).toEqual([]);
	});
});

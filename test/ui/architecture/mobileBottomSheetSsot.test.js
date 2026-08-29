import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import { describe, expect, test } from "@jest/globals";
import postcss from "postcss";

const TOKENS_PATH = path.resolve("src/ui/style/Tokens.css");
const MOBILE_BOTTOM_SHEET_DIRECTORY = path.resolve("src/ui/style/MobileBottomSheet");
const MOBILE_BOTTOM_SHEET_PATH = path.join(MOBILE_BOTTOM_SHEET_DIRECTORY, "mobile-bottom-sheet.css");
const DOCKED_SHEET_PATH = path.resolve("src/ui/view/components/MobileBottomSheet/DockedMobileBottomSheet.jsx");
const LEGACY_MODAL_SHEET_PATH = path.resolve("src/ui/view/components/MobileBottomSheet/MobileBottomSheet.jsx");
const STYLE_DIRECTORY = path.resolve("src/ui/style");
const CONSUMER_PATHS = [
	path.resolve("src/ui/view/components/PageTools/PageToolsMobileFooterSheet.jsx"),
	path.resolve("src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardsMobileFooterSheet.jsx")
];

function collectFiles(directory, extension) {
	const files = [];

	for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
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

function readDeclaration(filePath, selector, property) {
	const root = postcss.parse(fs.readFileSync(filePath, "utf8"), { from: filePath });
	let value = null;

	root.walkRules((rule) => {
		if (rule.selector !== selector) {
			return;
		}

		rule.walkDecls(property, (declaration) => {
			value = declaration.value;
		});
	});

	return value;
}

function readRootCustomProperty(property) {
	return readDeclaration(TOKENS_PATH, ":root", property);
}

function parseJsxFile(filePath) {
	return parse(fs.readFileSync(filePath, "utf8"), {
		sourceType: "module",
		plugins: ["jsx"]
	});
}

function visitAst(node, visitor) {
	if (!node || typeof node !== "object") {
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

function collectDockedSheetAttributes(filePath) {
	const attributeSets = [];

	visitAst(parseJsxFile(filePath), (node) => {
		if (
			node.type !== "JSXOpeningElement"
			|| node.name.type !== "JSXIdentifier"
			|| node.name.name !== "DockedMobileBottomSheet"
		) {
			return;
		}

		const names = new Set();

		for (const attribute of node.attributes) {
			if (attribute.type === "JSXAttribute" && attribute.name.type === "JSXIdentifier") {
				names.add(attribute.name.name);
			}
		}

		attributeSets.push({ names, selfClosing: node.selfClosing });
	});

	return attributeSets;
}

function collectClassElementAttributes(filePath, className) {
	const matches = [];

	visitAst(parseJsxFile(filePath), (node) => {
		if (node.type !== "JSXElement") {
			return;
		}

		const classAttribute = node.openingElement.attributes.find((attribute) => (
			attribute.type === "JSXAttribute"
			&& attribute.name.type === "JSXIdentifier"
			&& attribute.name.name === "className"
			&& attribute.value?.type === "StringLiteral"
			&& attribute.value.value === className
		));

		if (classAttribute === undefined) {
			return;
		}

		const attributeNames = new Set();

		for (const attribute of node.openingElement.attributes) {
			if (attribute.type === "JSXAttribute" && attribute.name.type === "JSXIdentifier") {
				attributeNames.add(attribute.name.name);
			}
		}

		matches.push({ node, attributeNames });
	});

	return matches;
}

function containsIdentifierCall(ast, identifierName) {
	let found = false;

	visitAst(ast, (node) => {
		if (
			node.type === "CallExpression"
			&& node.callee.type === "Identifier"
			&& node.callee.name === identifierName
		) {
			found = true;
		}
	});

	return found;
}

function containsJsxAttribute(ast, attributeName) {
	let found = false;

	visitAst(ast, (node) => {
		if (
			node.type === "JSXAttribute"
			&& node.name.type === "JSXIdentifier"
			&& node.name.name === attributeName
		) {
			found = true;
		}
	});

	return found;
}

function containsPropsMember(node, propertyName) {
	let found = false;

	visitAst(node, (candidate) => {
		if (
			candidate.type === "MemberExpression"
			&& candidate.computed === false
			&& candidate.object.type === "Identifier"
			&& candidate.object.name === "props"
			&& candidate.property.type === "Identifier"
			&& candidate.property.name === propertyName
		) {
			found = true;
		}
	});

	return found;
}

describe("DockedMobileBottomSheet SSOT", () => {
	test("owns the canonical docked geometry and safe-area contract", () => {
		expect(readRootCustomProperty("--mobile-sheet-peek-height")).toBe("144px");
		expect(readRootCustomProperty("--mobile-sheet-grip-height")).toBe("28px");
		expect(readRootCustomProperty("--mobile-sheet-content-max-width")).toBe("560px");
		expect(readRootCustomProperty("--mobile-sheet-content-end-clearance")).toContain("env(safe-area-inset-bottom)");
		expect(readRootCustomProperty("--mobile-sheet-top-clearance")).toContain("var(--mobile-topbar-height)");
		expect(readRootCustomProperty("--mobile-sheet-top-clearance")).toContain("var(--space-2)");
		expect(readRootCustomProperty("--mobile-sheet-scroll-reserve")).toContain("var(--mobile-sheet-peek-height)");
		expect(readRootCustomProperty("--mobile-sheet-scroll-reserve")).toContain("var(--mobile-sheet-scroll-clearance)");

		const transform = readDeclaration(MOBILE_BOTTOM_SHEET_PATH, ".mobile-bottom-sheet-popup", "transform");
		const rootPosition = readDeclaration(MOBILE_BOTTOM_SHEET_PATH, ".mobile-bottom-sheet-root", "position");
		const rootLayer = readDeclaration(MOBILE_BOTTOM_SHEET_PATH, ".mobile-bottom-sheet-root", "z-index");
		const popupHeight = readDeclaration(MOBILE_BOTTOM_SHEET_PATH, ".mobile-bottom-sheet-popup", "height");

		expect(transform).toContain("var(--mobile-sheet-peek-height)");
		expect(transform).toContain("env(safe-area-inset-bottom)");
		expect(rootPosition).toBe("fixed");
		expect(rootLayer).toBe("var(--z-docked-mobile-sheet)");
		expect(popupHeight).toContain("var(--mobile-sheet-top-clearance)");
	});

	test("owns peek, docked overlay, expanded visibility, accessibility and scrolling", () => {
		const peekElements = collectClassElementAttributes(DOCKED_SHEET_PATH, "mobile-bottom-sheet-peek-content");
		const dockedOverlayElements = collectClassElementAttributes(DOCKED_SHEET_PATH, "mobile-bottom-sheet-docked-overlay");
		const expandedElements = collectClassElementAttributes(DOCKED_SHEET_PATH, "mobile-bottom-sheet-expanded-content");

		expect(peekElements).toHaveLength(1);
		expect(dockedOverlayElements).toHaveLength(1);
		expect(expandedElements).toHaveLength(1);
		expect(containsPropsMember(peekElements[0].node, "peekContent")).toBe(true);
		expect(containsPropsMember(dockedOverlayElements[0].node, "dockedOverlayContent")).toBe(true);
		expect(containsPropsMember(expandedElements[0].node, "expandedContent")).toBe(true);
		expect(expandedElements[0].attributeNames.has("aria-hidden")).toBe(true);
		expect(expandedElements[0].attributeNames.has("inert")).toBe(true);

		expect(readDeclaration(MOBILE_BOTTOM_SHEET_PATH, ".mobile-bottom-sheet-docked-overlay", "position")).toBe("absolute");
		expect(readDeclaration(MOBILE_BOTTOM_SHEET_PATH, ".mobile-bottom-sheet-docked-overlay", "bottom")).toContain("var(--mobile-sheet-peek-height)");
		expect(readDeclaration(MOBILE_BOTTOM_SHEET_PATH, ".mobile-bottom-sheet-docked-overlay", "pointer-events")).toBe("auto");
		expect(readDeclaration(MOBILE_BOTTOM_SHEET_PATH, ".mobile-bottom-sheet-expanded-content", "visibility")).toBe("hidden");
		expect(readDeclaration(MOBILE_BOTTOM_SHEET_PATH, ".mobile-bottom-sheet-expanded-content", "overflow-y")).toBe("auto");
		expect(readDeclaration(
			MOBILE_BOTTOM_SHEET_PATH,
			'.mobile-bottom-sheet-root[data-open="true"] .mobile-bottom-sheet-expanded-content',
			"visibility"
		)).toBe("visible");
	});

	test("requires every feature consumer to use the canonical slots", () => {
		for (const filePath of CONSUMER_PATHS) {
			const attributeSets = collectDockedSheetAttributes(filePath);

			expect(attributeSets).toHaveLength(1);
			expect(attributeSets[0].selfClosing).toBe(true);
			expect(attributeSets[0].names.has("peekContent")).toBe(true);
			expect(attributeSets[0].names.has("dockedOverlayContent")).toBe(true);
			expect(attributeSets[0].names.has("expandedContent")).toBe(true);
			expect(attributeSets[0].names.has("popupClassName")).toBe(false);
			expect(attributeSets[0].names.has("contentClassName")).toBe(false);
		}
	});

	test("keeps search and filter interaction independent from the open sheet state", () => {
		const pageToolsAst = parseJsxFile(CONSUMER_PATHS[0]);
		const glossaryAst = parseJsxFile(CONSUMER_PATHS[1]);

		expect(containsPropsMember(pageToolsAst, "onOpenSheet")).toBe(false);
		expect(containsJsxAttribute(pageToolsAst, "onFocusCapture")).toBe(false);
		expect(containsJsxAttribute(pageToolsAst, "onPointerDownCapture")).toBe(false);
		expect(containsIdentifierCall(glossaryAst, "setIsOpen")).toBe(false);
		expect(containsJsxAttribute(glossaryAst, "onPointerDownCapture")).toBe(false);
	});

	test("keeps shared internals out of feature CSS", () => {
		const offenders = [];

		for (const filePath of collectFiles(STYLE_DIRECTORY, ".css")) {
			if (filePath.startsWith(`${MOBILE_BOTTOM_SHEET_DIRECTORY}${path.sep}`)) {
				continue;
			}

			const root = postcss.parse(fs.readFileSync(filePath, "utf8"), { from: filePath });

			root.walkRules((rule) => {
				if (rule.selector.includes(".mobile-bottom-sheet-")) {
					offenders.push(`${path.relative(process.cwd(), filePath)}: ${rule.selector}`);
				}
			});
		}

		expect(offenders).toEqual([]);
	});

	test("does not retain competing implementations or local collapsed-height overrides", () => {
		const collapsedHeightOffenders = [];

		for (const filePath of collectFiles(path.resolve("src"), ".css")) {
			if (fs.readFileSync(filePath, "utf8").includes("--mobile-bottom-sheet-collapsed-visible-height")) {
				collapsedHeightOffenders.push(path.relative(process.cwd(), filePath));
			}
		}

		expect(fs.existsSync(LEGACY_MODAL_SHEET_PATH)).toBe(false);
		expect(collapsedHeightOffenders).toEqual([]);
	});
});

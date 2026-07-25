import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import { describe, expect, test } from "@jest/globals";

const GLOSSARY_PANEL_PATH = path.resolve("src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryPanel.jsx");
const GLOSSARY_VIEW_MODEL_PATH = path.resolve("src/ui/viewmodel/GlossaryPageViewModel.js");

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

function isGlossaryPanelHeadingElement(node) {
	return node?.type === "JSXElement"
		&& node.openingElement.name.type === "JSXIdentifier"
		&& node.openingElement.name.name === "GlossaryPanelHeading";
}

describe("Glossary desktop summary ownership", () => {
	test("keeps the table heading on mobile only", () => {
		let hasMobileHeadingConditional = false;

		visitAst(parseModule(GLOSSARY_PANEL_PATH), (node) => {
			if (
				node.type === "ConditionalExpression"
				&& node.test.type === "Identifier"
				&& node.test.name === "isMobile"
				&& isGlossaryPanelHeadingElement(node.consequent)
			) {
				hasMobileHeadingConditional = true;
			}
		});

		expect(hasMobileHeadingConditional).toBe(true);
	});

	test("uses the all-chapters navigation card for the desktop title and entry summary", () => {
		const source = fs.readFileSync(GLOSSARY_VIEW_MODEL_PATH, "utf8");

		expect(source).toContain("allTopicAreas: t.glossaryPageAllChaptersHeading");
		expect(source).toContain("chapterSubtitle: t.glossaryPageChapterSubtitle");
		expect(source).not.toContain("glossaryPageSelectAllChaptersLabel");
		expect(source).not.toContain("glossaryPageAllChaptersSelectedSummary");
	});
});

//test/ui/view/components/GlossaryPage/glossaryDesktopPanelLayout.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";
import postcss from "postcss";
import selectorParser from "postcss-selector-parser";

const PAGE_STYLE_PATH = path.resolve("src/ui/style/GlossaryPage/page.css");
const PANEL_STYLE_PATH = path.resolve("src/ui/style/GlossaryPage/glossary-panel.css");
const TOPIC_AREA_STYLE_PATH = path.resolve("src/ui/style/GlossaryPage/topic-area-panel.css");
const TABLE_STYLE_PATH = path.resolve("src/ui/style/GlossaryPage/table.css");
const RESPONSIVE_STYLE_PATH = path.resolve("src/ui/style/GlossaryPage/responsive.css");

function parseStyle(filePath) {
	return postcss.parse(fs.readFileSync(filePath, "utf8"), { from: filePath });
}

function collectSelectors(rule) {
	const selectors = [];

	selectorParser((root) => {
		root.each((selector) => selectors.push(selector.toString().trim()));
	}).processSync(rule.selector);

	return selectors;
}

function findRule(root, selector, mediaQuery) {
	let matchedRule = null;

	root.walkRules((rule) => {
		if (matchedRule !== null || collectSelectors(rule).includes(selector) === false) {
			return;
		}

		if (mediaQuery === null) {
			if (rule.parent.type === "root") {
				matchedRule = rule;
			}
			return;
		}

		if (rule.parent.type === "atrule" && rule.parent.name === "media" && rule.parent.params === mediaQuery) {
			matchedRule = rule;
		}
	});

	return matchedRule;
}

function readDeclarations(root, selector, mediaQuery = null) {
	const rule = findRule(root, selector, mediaQuery);
	if (rule === null) {
		return {};
	}

	const declarations = {};
	rule.walkDecls((declaration) => {
		declarations[declaration.prop] = declaration.value;
	});
	return declarations;
}

describe("Glossary desktop panel layout", () => {
	test("renders the topic navigation and glossary table inside one shared workspace card", () => {
		const pageRoot = parseStyle(PAGE_STYLE_PATH);
		const content = readDeclarations(pageRoot, ".glossary-page__content");
		const topicCard = readDeclarations(pageRoot, ".glossary-topic-area-panel");
		const glossaryCard = readDeclarations(pageRoot, ".glossary-panel");

		expect(content.gap).toBe("0");
		expect(content.border).toBe("1px solid var(--line-strong)");
		expect(content["border-radius"]).toBe("var(--radius-lg)");
		expect(content.background).toContain("var(--panel-bg)");
		expect(content["box-shadow"]).toContain("var(--shadow-card)");

		for (const card of [topicCard, glossaryCard]) {
			expect(card.border).toBe("0");
			expect(card["border-radius"]).toBe("0");
			expect(card.background).toBe("transparent");
			expect(card["box-shadow"]).toBe("none");
		}
	});

	test("uses the chapter divider and inset table frame from the prototype", () => {
		const panel = readDeclarations(parseStyle(PANEL_STYLE_PATH), ".glossary-panel");
		const topicPanel = readDeclarations(parseStyle(TOPIC_AREA_STYLE_PATH), ".glossary-topic-area-panel");
		const tableScroll = readDeclarations(parseStyle(TABLE_STYLE_PATH), ".glossary-table-scroll");

		expect(panel.height).toBe("100%");
		expect(panel.padding).toBe("18px 14px 14px");
		expect(topicPanel["border-right"]).toBe("1px solid var(--line)");
		expect(tableScroll.height).toBe("100%");
		expect(tableScroll.border).toBe("1px solid var(--line)");
		expect(tableScroll["border-radius"]).toBe("14px");
	});

	test("gives the desktop table a wide explanation column and fixed importance column", () => {
		const pageRoot = parseStyle(PAGE_STYLE_PATH);
		const tableRoot = parseStyle(TABLE_STYLE_PATH);
		const workspace = readDeclarations(pageRoot, ".glossary-workspace");
		const content = readDeclarations(pageRoot, ".glossary-page__content");
		const table = readDeclarations(tableRoot, ".glossary-table");
		const termColumn = readDeclarations(tableRoot, ".glossary-table__term-column");
		const explanationColumn = readDeclarations(tableRoot, ".glossary-table__explanation-column");
		const importanceColumn = readDeclarations(tableRoot, ".glossary-table__importance-column");
		const cell = readDeclarations(tableRoot, ".glossary-table th");

		expect(content["max-width"]).toBe("1480px");
		expect(workspace["--glossary-term-column-width"]).toBe("27%");
		expect(workspace["--glossary-importance-column-width"]).toBe("106px");
		expect(termColumn.width).toBe("var(--glossary-term-column-width)");
		expect(explanationColumn.width).toBe("auto");
		expect(importanceColumn.width).toBe("var(--glossary-importance-column-width)");
		expect(table["table-layout"]).toBe("fixed");
		expect(cell["min-width"]).toBe("0");
		expect(cell["overflow-wrap"]).toBe("anywhere");
		expect(cell["word-break"]).toBe("normal");
		expect(cell.hyphens).toBe("auto");
		expect(cell.padding).toBe("13px 16px");
	});

	test("keeps the mobile glossary surface unframed", () => {
		const mobilePanel = readDeclarations(parseStyle(RESPONSIVE_STYLE_PATH), ".glossary-panel", "(max-width: 932px)");

		expect(mobilePanel.border).toBe("0");
		expect(mobilePanel["border-radius"]).toBe("0");
		expect(mobilePanel.background).toBe("transparent");
		expect(mobilePanel["box-shadow"]).toBe("none");
	});
});

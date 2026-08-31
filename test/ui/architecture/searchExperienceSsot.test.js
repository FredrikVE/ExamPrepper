import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import { describe, expect, test } from "@jest/globals";
import postcss from "postcss";

const SEARCH_COMPONENT_DIRECTORY = path.resolve("src/ui/view/components/Search");
const SEARCH_BACKDROP_PATH = path.join(SEARCH_COMPONENT_DIRECTORY, "SearchBackdrop.jsx");
const SEARCH_SUGGESTION_LIST_PATH = path.join(SEARCH_COMPONENT_DIRECTORY, "SearchSuggestionList.jsx");
const SEARCH_FILTER_FIELD_PATH = path.join(SEARCH_COMPONENT_DIRECTORY, "SearchFilterField.jsx");
const LEGACY_GLOSSARY_SEARCH_FIELD_PATH = path.resolve("src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossarySearchField.jsx");
const GLOSSARY_SEARCH_PANEL_PATH = path.resolve("src/ui/view/components/GlossaryPage/GlossarySearchPanel.jsx");
const GLOSSARY_SEARCH_MODEL_PATH = path.resolve("src/ui/viewmodel/GlossaryPage/glossarySearchModel.js");
const SEARCH_SUGGESTION_CONTRACT_PATH = path.resolve("src/ui/viewmodel/Search/searchSuggestionContract.js");
const SHARED_SEARCH_SHEET_STYLE_PATH = path.resolve("src/ui/style/Search/search-sheet.css");
const GLOSSARY_FOOTER_STYLE_PATH = path.resolve("src/ui/style/GlossaryPage/GlossaryFooter/glossary-footer.css");
const GLOSSARY_VIEW_MODEL_PATH = path.resolve("src/ui/viewmodel/GlossaryPageViewModel.js");
const GLOSSARY_TABLE_MODEL_PATH = path.resolve("src/ui/viewmodel/GlossaryPage/glossaryTableModel.js");
const LEGACY_GLOSSARY_HIGHLIGHT_PATH = path.resolve("src/ui/view/components/GlossaryPage/Shared/HighlightedText.jsx");
const LEGACY_GLOSSARY_SEARCH_LIST_PATH = path.resolve("src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossaryTopicAreaSearchList.jsx");
const PAGE_PATHS = [
	path.resolve("src/ui/view/pages/SubjectSelectPage.jsx"),
	path.resolve("src/ui/view/pages/LearningContentSelectPage.jsx"),
	path.resolve("src/ui/view/pages/GlossaryPage.jsx")
];

function readSource(filePath) {
	return fs.readFileSync(filePath, "utf8");
}

function readCssDeclarations(filePath, selector, property) {
	const root = postcss.parse(readSource(filePath), { from: filePath });
	const values = [];

	root.walkRules((rule) => {
		if (rule.selector !== selector) {
			return;
		}

		rule.walkDecls(property, (declaration) => {
			values.push(declaration.value);
		});
	});

	return values;
}

function parseModule(filePath) {
	return parse(readSource(filePath), {
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

function collectImportedNames(filePath, importPath) {
	const names = new Set();

	visitAst(parseModule(filePath), (node) => {
		if (node.type !== "ImportDeclaration" || node.source.value !== importPath) {
			return;
		}

		for (const specifier of node.specifiers) {
			names.add(specifier.local.name);
		}
	});

	return names;
}

function containsJsxElement(filePath, elementName) {
	let found = false;

	visitAst(parseModule(filePath), (node) => {
		if (
			node.type === "JSXOpeningElement"
			&& node.name.type === "JSXIdentifier"
			&& node.name.name === elementName
		) {
			found = true;
		}
	});

	return found;
}

describe("search experience SSOT", () => {
	test("uses one canonical blur backdrop across search pages", () => {
		expect(fs.existsSync(SEARCH_BACKDROP_PATH)).toBe(true);

		for (const pagePath of PAGE_PATHS) {
			const imports = collectImportedNames(pagePath, "../components/Search/SearchBackdrop.jsx");

			expect(imports.has("SearchBackdrop")).toBe(true);
			expect(containsJsxElement(pagePath, "SearchBackdrop")).toBe(true);
			expect(readSource(pagePath)).not.toContain('className="search-backdrop search-backdrop-visible"');
		}
	});

	test("uses one canonical search/filter field for standard search and Glossary autocomplete", () => {
		const sharedFieldSource = readSource(SEARCH_FILTER_FIELD_PATH);
		const glossarySearchImports = collectImportedNames(GLOSSARY_SEARCH_PANEL_PATH, "../Search/SearchFilterField.jsx");

		expect(fs.existsSync(LEGACY_GLOSSARY_SEARCH_FIELD_PATH)).toBe(false);
		expect(sharedFieldSource).toContain("props.clearAction");
		expect(sharedFieldSource).toContain("props.autocomplete");
		expect(sharedFieldSource).toContain('role={autocomplete === null ? null : "combobox"}');
		expect(sharedFieldSource).toContain('aria-autocomplete={autocomplete === null ? null : "list"}');
		expect(sharedFieldSource).toContain('event.key === "ArrowDown"');
		expect(sharedFieldSource).toContain('event.key === "Enter"');
		expect(glossarySearchImports.has("SearchFilterField")).toBe(true);
		expect(containsJsxElement(GLOSSARY_SEARCH_PANEL_PATH, "SearchFilterField")).toBe(true);
	});

	test("uses the shared six-result contract and shared popup height on Glossary", () => {
		const suggestionContractSource = readSource(SEARCH_SUGGESTION_CONTRACT_PATH);
		const glossaryModelSource = readSource(GLOSSARY_SEARCH_MODEL_PATH);
		const sharedMaxHeights = readCssDeclarations(SHARED_SEARCH_SHEET_STYLE_PATH, ".search-sheet-list", "max-height");
		const glossaryMaxHeights = readCssDeclarations(GLOSSARY_FOOTER_STYLE_PATH, ".glossary-search-footer .search-sheet-list", "max-height");

		expect(suggestionContractSource).toContain("SEARCH_SUGGESTION_LIMIT = 6");
		expect(glossaryModelSource).toContain("SEARCH_SUGGESTION_LIMIT");
		expect(glossaryModelSource).not.toContain("GLOSSARY_AUTOCOMPLETE_LIMIT");
		expect(sharedMaxHeights).toContain("min(46vh, 520px)");
		expect(glossaryMaxHeights).toEqual([]);
	});

	test("keeps listbox mechanics in the shared suggestion renderer", () => {
		const source = readSource(SEARCH_SUGGESTION_LIST_PATH);

		expect(source).toContain('role="listbox"');
		expect(source).toContain('role="option"');
		expect(source).toContain("activeSuggestionId");
		expect(source).toContain("metaLabel");
	});

	test("keeps autocomplete ranking and chapter filtering in the Glossary ViewModel layer", () => {
		const modelSource = readSource(GLOSSARY_SEARCH_MODEL_PATH);
		const viewModelSource = readSource(GLOSSARY_VIEW_MODEL_PATH);

		expect(modelSource).toContain("GLOSSARY_AUTOCOMPLETE_MIN_LENGTH = 1");
		expect(modelSource).toContain("createGlossaryAutocompleteSuggestions");
		expect(viewModelSource).toContain("chapterFilterOptions");
		expect(viewModelSource).toContain("selectGlossaryChapterFilter");
		expect(viewModelSource).not.toContain("GLOSSARY_SEARCH_SCOPES");
		expect(fs.existsSync(LEGACY_GLOSSARY_SEARCH_LIST_PATH)).toBe(false);
	});
	test("keeps draft autocomplete input separate from committed glossary content", () => {
		const modelSource = readSource(GLOSSARY_SEARCH_MODEL_PATH);
		const viewModelSource = readSource(GLOSSARY_VIEW_MODEL_PATH);
		const tableModelSource = readSource(GLOSSARY_TABLE_MODEL_PATH);

		expect(modelSource).not.toContain("filterEntriesBySearchTerm");
		expect(modelSource).not.toContain("countEntryMatchesByTopicArea");
		expect(viewModelSource).toContain("searchNarrowedGlossaryEntryKey");
		expect(viewModelSource).not.toContain("searchSummaryLabel");
		expect(viewModelSource).not.toContain("filterEntriesByNormalizedSearchTerm");
		expect(tableModelSource).not.toContain("normalizedSearchTerm");
		expect(fs.existsSync(LEGACY_GLOSSARY_HIGHLIGHT_PATH)).toBe(false);
	});

});

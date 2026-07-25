import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import { describe, expect, test } from "@jest/globals";

const SEARCH_COMPONENT_DIRECTORY = path.resolve("src/ui/view/components/Search");
const SEARCH_BACKDROP_PATH = path.join(SEARCH_COMPONENT_DIRECTORY, "SearchBackdrop.jsx");
const SEARCH_SUGGESTION_LIST_PATH = path.join(SEARCH_COMPONENT_DIRECTORY, "SearchSuggestionList.jsx");
const GLOSSARY_SEARCH_FIELD_PATH = path.resolve("src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossarySearchField.jsx");
const GLOSSARY_SEARCH_MODEL_PATH = path.resolve("src/ui/viewmodel/GlossaryPage/glossarySearchModel.js");
const GLOSSARY_VIEW_MODEL_PATH = path.resolve("src/ui/viewmodel/GlossaryPageViewModel.js");
const LEGACY_GLOSSARY_SEARCH_LIST_PATH = path.resolve("src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossaryTopicAreaSearchList.jsx");
const PAGE_PATHS = [
	path.resolve("src/ui/view/pages/SubjectSelectPage.jsx"),
	path.resolve("src/ui/view/pages/LearningContentSelectPage.jsx"),
	path.resolve("src/ui/view/pages/GlossaryPage.jsx")
];

function readSource(filePath) {
	return fs.readFileSync(filePath, "utf8");
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

	test("keeps the Glossary field on the shared search primitives", () => {
		const source = readSource(GLOSSARY_SEARCH_FIELD_PATH);

		expect(source).toContain('from "../../Search/SearchField.jsx"');
		expect(source).toContain('from "../../Search/SearchFilterControl.jsx"');
		expect(source).toContain('className="search-filter-field glossary-search-field"');
		expect(source).toContain('role="combobox"');
		expect(source).toContain('aria-autocomplete="list"');
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
});

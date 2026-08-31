import { beforeEach, describe, expect, jest, test } from "@jest/globals";

const stateValues = [];
const stateSetters = [];

const useState = jest.fn((initialValue) => {
	const defaultValue = typeof initialValue === "function" ? initialValue() : initialValue;
	const value = stateValues.length > 0 ? stateValues.shift() : defaultValue;
	const setter = jest.fn();

	stateSetters.push(setter);

	return [value, setter];
});

const useMemo = jest.fn((factory) => factory());
const useCallback = jest.fn((callback) => callback);

jest.unstable_mockModule("react", () => ({
	useCallback,
	useMemo,
	useState
}));

const { default: useSearchSheetModel } = await import("../../../../src/ui/viewmodel/Search/useSearchSheetModel.js");
const { SEARCH_SUGGESTION_LIMIT } = await import("../../../../src/ui/viewmodel/Search/searchSuggestionContract.js");

describe("useSearchSheetModel", () => {
	beforeEach(() => {
		stateValues.length = 0;
		stateSetters.length = 0;
		useState.mockClear();
		useMemo.mockClear();
		useCallback.mockClear();
	});

	test("returns default search sheet state", () => {
		const viewModel = useSearchSheetModel({
			defaultFilterValue: "all"
		});

		expect(SEARCH_SUGGESTION_LIMIT).toBe(6);
		expect(viewModel.searchTerm).toBe("");
		expect(viewModel.filterValue).toBe("all");
		expect(viewModel.isSearchSheetOpen).toBe(false);
		expect(viewModel.isSearchSuggestionsMode).toBe(true);
		expect(viewModel.isFilterOptionsMode).toBe(false);
		expect(viewModel.isFooterSheetOpen).toBe(false);
		expect(viewModel.isFooterOpen).toBe(false);
	});

	test("toggles open filter options without changing the footer sheet state", () => {
		stateValues.push("", "all", true, "filterOptions", true);

		const viewModel = useSearchSheetModel({
			defaultFilterValue: "all"
		});

		viewModel.openFilterOptions();

		expect(stateSetters[0]).toHaveBeenCalledWith("");
		expect(stateSetters[2]).toHaveBeenCalledWith(false);
		expect(stateSetters[3]).toHaveBeenCalledWith("searchSuggestions");
		expect(stateSetters[4]).not.toHaveBeenCalled();
	});

	test("opens search suggestions without expanding the footer sheet", () => {
		const viewModel = useSearchSheetModel({
			defaultFilterValue: "all"
		});

		viewModel.openSearchSuggestions();

		expect(stateSetters[2]).toHaveBeenCalledWith(true);
		expect(stateSetters[3]).toHaveBeenCalledWith("searchSuggestions");
		expect(stateSetters[4]).not.toHaveBeenCalled();
	});

	test("opens filter options without expanding the footer sheet", () => {
		const viewModel = useSearchSheetModel({
			defaultFilterValue: "all"
		});

		viewModel.openFilterOptions();

		expect(stateSetters[2]).toHaveBeenCalledWith(true);
		expect(stateSetters[3]).toHaveBeenCalledWith("filterOptions");
		expect(stateSetters[4]).not.toHaveBeenCalled();
	});

	test("changes the search term without expanding the footer sheet", () => {
		const viewModel = useSearchSheetModel({
			defaultFilterValue: "all"
		});

		viewModel.changeSearchTerm("security");

		expect(stateSetters[0]).toHaveBeenCalledWith("security");
		expect(stateSetters[2]).toHaveBeenCalledWith(true);
		expect(stateSetters[3]).toHaveBeenCalledWith("searchSuggestions");
		expect(stateSetters[4]).not.toHaveBeenCalled();
	});

	test("closing the footer sheet preserves active search content for docked use", () => {
		stateValues.push("term", "all", true, "searchSuggestions", true);

		const viewModel = useSearchSheetModel({
			defaultFilterValue: "all"
		});

		viewModel.changeFooterSheetOpen(false);

		expect(stateSetters[4]).toHaveBeenCalledWith(false);
		expect(stateSetters[0]).not.toHaveBeenCalled();
		expect(stateSetters[2]).not.toHaveBeenCalled();
		expect(stateSetters[3]).not.toHaveBeenCalled();
	});

	test("closing search content preserves the footer sheet state", () => {
		stateValues.push("term", "all", true, "searchSuggestions", true);

		const viewModel = useSearchSheetModel({
			defaultFilterValue: "all"
		});

		viewModel.closeSearchSheet();

		expect(stateSetters[0]).toHaveBeenCalledWith("");
		expect(stateSetters[2]).toHaveBeenCalledWith(false);
		expect(stateSetters[3]).toHaveBeenCalledWith("searchSuggestions");
		expect(stateSetters[4]).not.toHaveBeenCalled();
	});

	test("selects a filter option without expanding the footer sheet", () => {
		const viewModel = useSearchSheetModel({
			defaultFilterValue: "all"
		});

		viewModel.selectFilterOption("faculty");

		expect(stateSetters[1]).toHaveBeenCalledWith("faculty");
		expect(stateSetters[2]).toHaveBeenCalledWith(true);
		expect(stateSetters[3]).toHaveBeenCalledWith("searchSuggestions");
		expect(stateSetters[4]).not.toHaveBeenCalled();
	});

	test("keeps the footer presentation active while docked search content is open", () => {
		stateValues.push("term", "all", true, "searchSuggestions", false);

		const viewModel = useSearchSheetModel({
			defaultFilterValue: "all"
		});

		expect(viewModel.isFooterSheetOpen).toBe(false);
		expect(viewModel.isSearchSheetOpen).toBe(true);
		expect(viewModel.isFooterOpen).toBe(true);
	});
});

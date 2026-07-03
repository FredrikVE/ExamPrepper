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

const useEffect = jest.fn((effect) => {
	return effect();
});

const useMemo = jest.fn((factory) => factory());
const useCallback = jest.fn((callback) => callback);

jest.unstable_mockModule("react", () => ({
	useCallback,
	useEffect,
	useMemo,
	useState
}));

const {
	SEARCH_SUGGESTION_LIMIT,
	default: useSearchSheetModel
} = await import("../../../../src/ui/viewmodel/Search/useSearchSheetModel.js");

describe("useSearchSheetModel", () => {
	beforeEach(() => {
		stateValues.length = 0;
		stateSetters.length = 0;
		useState.mockClear();
		useEffect.mockClear();
		useMemo.mockClear();
		useCallback.mockClear();
	});

	test("returns default search sheet state", () => {
		const viewModel = useSearchSheetModel({
			isActive: true,
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

	test("closes the sheet when the owner page becomes inactive", () => {
		useSearchSheetModel({
			isActive: false,
			defaultFilterValue: "all"
		});

		expect(stateSetters[0]).toHaveBeenCalledWith("");
		expect(stateSetters[2]).toHaveBeenCalledWith(false);
		expect(stateSetters[3]).toHaveBeenCalledWith("searchSuggestions");
		expect(stateSetters[4]).toHaveBeenCalledWith(false);
	});

	test("toggles an already-open filter options sheet closed", () => {
		stateValues.push("", "all", true, "filterOptions", true);

		const viewModel = useSearchSheetModel({
			isActive: true,
			defaultFilterValue: "all"
		});

		viewModel.openFilterOptions();

		expect(stateSetters[0]).toHaveBeenCalledWith("");
		expect(stateSetters[2]).toHaveBeenCalledWith(false);
		expect(stateSetters[3]).toHaveBeenCalledWith("searchSuggestions");
		expect(stateSetters[4]).toHaveBeenCalledWith(false);
	});

	test("opens the controlled footer sheet with search suggestions", () => {
		const viewModel = useSearchSheetModel({
			isActive: true,
			defaultFilterValue: "all"
		});

		viewModel.openSearchSuggestions();

		expect(stateSetters[4]).toHaveBeenCalledWith(true);
		expect(stateSetters[2]).toHaveBeenCalledWith(true);
		expect(stateSetters[3]).toHaveBeenCalledWith("searchSuggestions");
	});

	test("closing the controlled footer sheet also closes search content", () => {
		stateValues.push("term", "all", true, "searchSuggestions", true);

		const viewModel = useSearchSheetModel({
			isActive: true,
			defaultFilterValue: "all"
		});

		viewModel.changeFooterSheetOpen(false);

		expect(stateSetters[4]).toHaveBeenCalledWith(false);
		expect(stateSetters[0]).toHaveBeenCalledWith("");
		expect(stateSetters[2]).toHaveBeenCalledWith(false);
		expect(stateSetters[3]).toHaveBeenCalledWith("searchSuggestions");
	});

	test("selects a filter option and returns to search suggestions mode", () => {
		const viewModel = useSearchSheetModel({
			isActive: true,
			defaultFilterValue: "all"
		});

		viewModel.selectFilterOption("faculty");

		expect(stateSetters[1]).toHaveBeenCalledWith("faculty");
		expect(stateSetters[4]).toHaveBeenCalledWith(true);
		expect(stateSetters[2]).toHaveBeenCalledWith(true);
		expect(stateSetters[3]).toHaveBeenCalledWith("searchSuggestions");
	});
});

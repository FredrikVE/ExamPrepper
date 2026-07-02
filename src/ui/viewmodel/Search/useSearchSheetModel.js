// src/ui/viewmodel/Search/useSearchSheetModel.js
import { useCallback, useEffect, useMemo, useState } from "react";

const SEARCH_SHEET_MODES = {
	SEARCH_SUGGESTIONS: "searchSuggestions",
	FILTER_OPTIONS: "filterOptions"
};

export const SEARCH_SUGGESTION_LIMIT = 6;

export default function useSearchSheetModel({ isActive, defaultFilterValue }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterValue, setFilterValue] = useState(defaultFilterValue);
	const [isSearchSheetOpen, setIsSearchSheetOpen] = useState(false);
	const [searchSheetMode, setSearchSheetMode] = useState(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);

	const isSearchSuggestionsMode = searchSheetMode === SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS;
	const isFilterOptionsMode = searchSheetMode === SEARCH_SHEET_MODES.FILTER_OPTIONS;

	const closeSearchSheet = useCallback(() => {
		setSearchTerm("");
		setIsSearchSheetOpen(false);
		setSearchSheetMode(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);
	}, []);

	useEffect(() => {
		if (!isActive) {
			closeSearchSheet();
		}
	}, [isActive, closeSearchSheet]);

	const openSearchSuggestions = useCallback(() => {
		setIsSearchSheetOpen(true);
		setSearchSheetMode(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);
	}, []);

	const openFilterOptions = useCallback(() => {
		if (isSearchSheetOpen && isFilterOptionsMode) {
			closeSearchSheet();
			return;
		}

		setIsSearchSheetOpen(true);
		setSearchSheetMode(SEARCH_SHEET_MODES.FILTER_OPTIONS);
	}, [closeSearchSheet, isFilterOptionsMode, isSearchSheetOpen]);

	const changeSearchTerm = useCallback((nextSearchTerm) => {
		setSearchTerm(nextSearchTerm);
		setIsSearchSheetOpen(true);
		setSearchSheetMode(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);
	}, []);

	const changeFilterValue = useCallback((nextFilterValue) => {
		closeSearchSheet();
		setFilterValue(nextFilterValue);
	}, [closeSearchSheet]);

	const selectFilterOption = useCallback((nextFilterValue) => {
		setFilterValue(nextFilterValue);
		setIsSearchSheetOpen(true);
		setSearchSheetMode(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);
	}, []);

	return useMemo(() => ({
		searchTerm,
		filterValue,
		isSearchSheetOpen,
		isSearchSuggestionsMode,
		isFilterOptionsMode,
		changeSearchTerm,
		changeFilterValue,
		selectFilterOption,
		openSearchSuggestions,
		openFilterOptions,
		closeSearchSheet
	}), [
		changeFilterValue,
		changeSearchTerm,
		closeSearchSheet,
		filterValue,
		isFilterOptionsMode,
		isSearchSheetOpen,
		isSearchSuggestionsMode,
		openFilterOptions,
		openSearchSuggestions,
		searchTerm,
		selectFilterOption
	]);
}

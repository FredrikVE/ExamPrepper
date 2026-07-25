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
	const [isFooterSheetOpen, setIsFooterSheetOpen] = useState(false);

	const isSearchSuggestionsMode = searchSheetMode === SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS;
	const isFilterOptionsMode = searchSheetMode === SEARCH_SHEET_MODES.FILTER_OPTIONS;
	const isFooterOpen = isSearchSheetOpen || isFooterSheetOpen;

	const closeSearchSheet = useCallback(() => {
		setSearchTerm("");
		setIsSearchSheetOpen(false);
		setSearchSheetMode(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);
	}, []);

	const resetSearchSheet = useCallback((nextFilterValue = defaultFilterValue) => {
		setSearchTerm("");
		setFilterValue(nextFilterValue);
		setIsSearchSheetOpen(false);
		setSearchSheetMode(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);
		setIsFooterSheetOpen(false);
	}, [defaultFilterValue]);

	const changeFooterSheetOpen = useCallback((nextIsOpen) => {
		setIsFooterSheetOpen(nextIsOpen);
	}, []);

	useEffect(() => {
		if (!isActive) {
			closeSearchSheet();
			setIsFooterSheetOpen(false);
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
		isFooterSheetOpen,
		isFooterOpen,
		changeSearchTerm,
		changeFilterValue,
		resetSearchSheet,
		selectFilterOption,
		openSearchSuggestions,
		openFilterOptions,
		changeFooterSheetOpen,
		closeSearchSheet
	}), [
		changeFilterValue,
		changeSearchTerm,
		changeFooterSheetOpen,
		closeSearchSheet,
		filterValue,
		isFilterOptionsMode,
		isFooterOpen,
		isFooterSheetOpen,
		isSearchSheetOpen,
		isSearchSuggestionsMode,
		openFilterOptions,
		openSearchSuggestions,
		resetSearchSheet,
		searchTerm,
		selectFilterOption
	]);
}

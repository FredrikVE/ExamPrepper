// src/ui/viewmodel/SubjectSelectPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { ALL_FACULTIES, buildSubjectFaculties, filterSubjects, findSubjectById } from "./SubjectSelectPage/subjectSelectPageFilters.js";

const SEARCH_SHEET_MODES = {
	SEARCH_SUGGESTIONS: "searchSuggestions",
	FILTER_OPTIONS: "filterOptions"
};

const SEARCH_SUGGESTION_LIMIT = 6;

export default function useSubjectSelectPageViewModel(getAvailableSubjectsUseCase, language, t, selectedSubjectId, onSelectSubject, isActive) {
	const [subjects, setSubjects] = useState([]);
	const [subjectsLoading, setSubjectsLoading] = useState(true);
	const [subjectsLoadError, setSubjectsLoadError] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [faculty, setFaculty] = useState(ALL_FACULTIES);
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const [isSearchSheetOpen, setIsSearchSheetOpen] = useState(false);
	const [searchSheetMode, setSearchSheetMode] = useState(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);

	useEffect(() => {
		let cancelled = false;

		async function loadSubjects() {
			try {
				setSubjectsLoading(true);
				setSubjectsLoadError(null);

				const loadedSubjects = await getAvailableSubjectsUseCase.execute({
					language
				});

				if (!cancelled) {
					setSubjects(loadedSubjects);
				}
			} catch (error) {
				console.error("Feil ved henting av fag:", error);

				if (!cancelled) {
					setSubjects([]);
					setSubjectsLoadError(t.subjectErrorMessage);
				}
			} finally {
				if (!cancelled) {
					setSubjectsLoading(false);
				}
			}
		}

		loadSubjects();

		return () => {
			cancelled = true;
		};
	}, [getAvailableSubjectsUseCase, language, t.subjectErrorMessage]);

	const selectedSubject = useMemo(() => {
		return findSubjectById(subjects, selectedSubjectId);
	}, [subjects, selectedSubjectId]);

	const faculties = useMemo(() => {
		return buildSubjectFaculties(subjects);
	}, [subjects]);

	const filteredSubjects = useMemo(() => {
		return filterSubjects(subjects, searchTerm, faculty);
	}, [subjects, searchTerm, faculty]);

	const searchSuggestions = useMemo(() => {
		return filteredSubjects.slice(0, SEARCH_SUGGESTION_LIMIT).map((subject) => ({
			id: subject.id,
			label: subject.name,
			code: subject.code
		}));
	}, [filteredSubjects]);

	const facultyFilterOptions = useMemo(() => {
		return [
			{
				id: ALL_FACULTIES,
				value: ALL_FACULTIES,
				label: t.subjectAllFaculties
			},
			...faculties.map((facultyOption) => ({
				id: facultyOption,
				value: facultyOption,
				label: facultyOption
			}))
		];
	}, [faculties, t.subjectAllFaculties]);

	const isSearchSuggestionsMode = searchSheetMode === SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS;
	const isFilterOptionsMode = searchSheetMode === SEARCH_SHEET_MODES.FILTER_OPTIONS;

	const facultyLabel = useMemo(() => {
		return faculty === ALL_FACULTIES ? t.filterAllLabel : faculty;
	}, [faculty, t.filterAllLabel]);

	const closeSubjectSearchSheet = useCallback(() => {
		setIsSearchFocused(false);
		setIsSearchSheetOpen(false);
		setSearchSheetMode(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);
	}, []);

	const closeSearch = closeSubjectSearchSheet;

	useEffect(() => {
		if (!isActive) {
			closeSearch();
		}
	}, [isActive, closeSearch]);

	const openSubjectSearchSuggestions = useCallback(() => {
		setIsSearchFocused(true);
		setIsSearchSheetOpen(true);
		setSearchSheetMode(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);
	}, []);

	const openSubjectFacultyOptions = useCallback(() => {
		setIsSearchFocused(false);
		setIsSearchSheetOpen(true);
		setSearchSheetMode(SEARCH_SHEET_MODES.FILTER_OPTIONS);
	}, []);

	const changeSubjectSearchTerm = useCallback((nextSearchTerm) => {
		setSearchTerm(nextSearchTerm);
		setIsSearchFocused(true);
		setIsSearchSheetOpen(true);
		setSearchSheetMode(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);
	}, []);

	const changeSearchTerm = changeSubjectSearchTerm;

	const changeFaculty = useCallback((nextFaculty) => {
		closeSubjectSearchSheet();
		setFaculty(nextFaculty);
	}, [closeSubjectSearchSheet]);

	const selectFacultyFilterOption = useCallback((nextFaculty) => {
		setIsSearchFocused(false);
		setFaculty(nextFaculty);
		setIsSearchSheetOpen(true);
		setSearchSheetMode(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);
	}, []);

	const focusSearch = openSubjectSearchSuggestions;

	const blurSearch = closeSubjectSearchSheet;

	const selectSubject = useCallback((subjectId) => {
		closeSubjectSearchSheet();
		onSelectSubject(subjectId);
	}, [closeSubjectSearchSheet, onSelectSubject]);

	return {
		// Data
		subjects,
		selectedSubject,
		filteredSubjects,
		faculties,
		subjectsLoading,
		subjectsLoadError,

		// Tekster
		t,
		loadingTitle: t.subjectLoadingMessage,
		loadingAriaLabel: t.subjectLoadingMessage,
		errorTitle: t.errorPrefix,
		errorAriaLabel: t.subjectErrorMessage,
		emptyTitle: t.subjectEmptyMessage,
		emptyDescription: "",
		searchCloseLabel: t.searchCloseLabel,

		// Filter-verdier
		searchTerm,
		faculty,
		facultyLabel,
		isSearchFocused,
		isSearchSheetOpen,
		isSearchSuggestionsMode,
		isFilterOptionsMode,
		searchSuggestions,
		facultyFilterOptions,

		// Handlers
		changeSearchTerm,
		changeSubjectSearchTerm,
		changeFaculty,
		selectFacultyFilterOption,
		focusSearch,
		openSubjectSearchSuggestions,
		openSubjectFacultyOptions,
		blurSearch,
		closeSearch,
		closeSubjectSearchSheet,
		selectSubject
	};
}

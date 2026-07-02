// src/ui/viewmodel/SubjectSelectPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { getPageToolGroup, getSubjectSelectWorkspaceActionToolItems } from "../../navigation/pageTools.js";
import { NAV_SCREENS } from "../../navigation/navGraph.js";
import createWorkspaceToolsModel from "./Utils/createWorkspaceToolsModel.js";
import { ALL_FACULTIES, buildSubjectFaculties, filterSubjects, findSubjectById } from "./SubjectSelectPage/subjectSelectPageFilters.js";

const SEARCH_SHEET_MODES = {
	SEARCH_SUGGESTIONS: "searchSuggestions",
	FILTER_OPTIONS: "filterOptions"
};

const SEARCH_SUGGESTION_LIMIT = 6;

export default function useSubjectSelectPageViewModel(getAvailableSubjectsUseCase, language, t, selectedSubjectId, onSelectSubject, isActive, onChangeScreen) {
	const [subjects, setSubjects] = useState([]);
	const [subjectsLoading, setSubjectsLoading] = useState(true);
	const [subjectsLoadError, setSubjectsLoadError] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [faculty, setFaculty] = useState(ALL_FACULTIES);
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
		setSearchTerm("");
		setIsSearchSheetOpen(false);
		setSearchSheetMode(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);
	}, []);

	useEffect(() => {
		if (!isActive) {
			closeSubjectSearchSheet();
		}
	}, [isActive, closeSubjectSearchSheet]);

	const openSubjectSearchSuggestions = useCallback(() => {
		setIsSearchSheetOpen(true);
		setSearchSheetMode(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);
	}, []);

	const openSubjectFacultyOptions = useCallback(() => {
		if (isSearchSheetOpen && isFilterOptionsMode) {
			closeSubjectSearchSheet();
			return;
		}

		setIsSearchSheetOpen(true);
		setSearchSheetMode(SEARCH_SHEET_MODES.FILTER_OPTIONS);
	}, [closeSubjectSearchSheet, isFilterOptionsMode, isSearchSheetOpen]);

	const changeSubjectSearchTerm = useCallback((nextSearchTerm) => {
		setSearchTerm(nextSearchTerm);
		setIsSearchSheetOpen(true);
		setSearchSheetMode(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);
	}, []);

	const changeFaculty = useCallback((nextFaculty) => {
		closeSubjectSearchSheet();
		setFaculty(nextFaculty);
	}, [closeSubjectSearchSheet]);

	const selectFacultyFilterOption = useCallback((nextFaculty) => {
		setFaculty(nextFaculty);
		setIsSearchSheetOpen(true);
		setSearchSheetMode(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);
	}, []);

	const selectSubject = useCallback((subjectId) => {
		closeSubjectSearchSheet();
		onSelectSubject(subjectId);
	}, [closeSubjectSearchSheet, onSelectSubject]);

	const pageTools = useMemo(() => {
		return createWorkspaceToolsModel({
			pageToolGroup: getPageToolGroup(NAV_SCREENS.SUBJECTS),
			t,
			navToolItems: [],
			workspaceActionToolItems: getSubjectSelectWorkspaceActionToolItems(),
			hasSelectedSubject: Boolean(selectedSubjectId),
			onChangeScreen
		});
	}, [onChangeScreen, selectedSubjectId, t]);

	return {
		// Data
		subjects,
		selectedSubject,
		filteredSubjects,
		faculties,
		subjectsLoading,
		subjectsLoadError,
		pageTools,

		// Navigasjon
		showBackButton: false,
		backLabel: t.sidebarBack,
		navigationLabel: t.sidebarMobileNavigation,
		onBack: null,

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
		isSearchSheetOpen,
		isSearchSuggestionsMode,
		isFilterOptionsMode,
		searchSuggestions,
		facultyFilterOptions,

		// Handlers
		changeSubjectSearchTerm,
		changeFaculty,
		selectFacultyFilterOption,
		openSubjectSearchSuggestions,
		openSubjectFacultyOptions,
		closeSubjectSearchSheet,
		selectSubject
	};
}

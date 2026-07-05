// src/ui/viewmodel/SubjectSelectPageViewModel.js
import { useCallback, useMemo } from "react";
import { getPageToolGroup, getSubjectSelectWorkspaceActionToolItems } from "../../navigation/pageTools.js";
import { NAV_SCREENS } from "../../navigation/navGraph.js";
import createWorkspaceToolsModel from "./Utils/createWorkspaceToolsModel.js";
import useLoadModel from "./load/useLoadModel.js";
import useSearchSheetModel, { SEARCH_SUGGESTION_LIMIT } from "./Search/useSearchSheetModel.js";
import { ALL_FACULTIES, buildSubjectFaculties, filterSubjects, findSubjectById } from "./SubjectSelectPage/subjectSelectPageFilters.js";

function noteSubjectsLoaded() {}

export default function useSubjectSelectPageViewModel(getAvailableSubjectsUseCase, language, t, selectedSubjectId, onSelectSubject, isActive, onChangeScreen) {
	const executeSubjectLoad = useCallback(() => {
		return getAvailableSubjectsUseCase.execute({
			language
		});
	}, [getAvailableSubjectsUseCase, language]);

	const subjectLoad = useLoadModel({
		execute: executeSubjectLoad,
		emptyData: [],
		errorFallbackMessage: t.subjectErrorMessage,
		onLoaded: noteSubjectsLoaded
	});
	const subjects = subjectLoad.data;
	const subjectSearchSheet = useSearchSheetModel({
		isActive,
		defaultFilterValue: ALL_FACULTIES
	});
	const {
		searchTerm,
		filterValue: faculty,
		isSearchSheetOpen,
		isSearchSuggestionsMode,
		isFilterOptionsMode,
		isFooterSheetOpen,
		isFooterOpen,
		changeSearchTerm: changeSubjectSearchTerm,
		changeFilterValue: changeFaculty,
		selectFilterOption: selectFacultyFilterOption,
		openSearchSuggestions: openSubjectSearchSuggestions,
		openFilterOptions: openSubjectFacultyOptions,
		openFooterSheet: openSubjectFooterSheet,
		changeFooterSheetOpen: changeSubjectFooterSheetOpen,
		closeSearchSheet: closeSubjectSearchSheet
	} = subjectSearchSheet;

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

	const facultyLabel = useMemo(() => {
		return faculty === ALL_FACULTIES ? t.filterAllLabel : faculty;
	}, [faculty, t.filterAllLabel]);

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
		pageStatus: subjectLoad.status,
		pageErrorMessage: subjectLoad.error,
		pageTools,

		// Navigasjon
		showBackButton: false,
		backLabel: t.sidebarBack,
		navigationLabel: t.sidebarMobileNavigation,
		onBack: null,

		// Tekster
		t,
		loadingTitle: t.subjectLoadingMessage,
		errorTitle: t.errorPrefix,
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
		isFooterSheetOpen,
		isFooterOpen,
		searchSuggestions,
		facultyFilterOptions,

		// Handlers
		changeSubjectSearchTerm,
		changeFaculty,
		selectFacultyFilterOption,
		openSubjectSearchSuggestions,
		openSubjectFacultyOptions,
		openSubjectFooterSheet,
		changeSubjectFooterSheetOpen,
		closeSubjectSearchSheet,
		selectSubject
	};
}

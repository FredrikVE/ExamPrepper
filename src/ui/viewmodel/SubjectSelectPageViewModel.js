// src/ui/viewmodel/SubjectSelectPageViewModel.js
import { useCallback, useMemo } from "react";
import { NAV_ITEMS, NAV_SCREENS } from "../../navigation/navigation.js";
import createWorkspaceToolsModel from "./Utils/createWorkspaceToolsModel.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import useSearchSheetModel from "./Search/useSearchSheetModel.js";
import { SEARCH_SUGGESTION_LIMIT } from "./Search/searchSuggestionContract.js";
import { ALL_FACULTIES, buildSubjectFaculties, filterSubjects } from "./SubjectSelectPage/subjectSelectPageFilters.js";


export default function useSubjectSelectPageViewModel({ subjects, loadStatus, loadError, t, onSelectSubject, backContract }) {
	const subjectSearchSheet = useSearchSheetModel({
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
		changeFooterSheetOpen: changeSubjectFooterSheetOpen,
		closeSearchSheet: closeSubjectSearchSheet
	} = subjectSearchSheet;

	const faculties = useMemo(() => {
		return buildSubjectFaculties(subjects);
	}, [subjects]);

	const filteredSubjects = useMemo(() => {
		return filterSubjects(subjects, searchTerm, faculty);
	}, [subjects, searchTerm, faculty]);

	const workspaceState = createWorkspaceState({
		loadStatus,
		isEmpty: filteredSubjects.length === 0,
		labels: {
			loading: t.subjectLoadingMessage,
			errorTitle: t.errorPrefix,
			errorBody: loadError,
			emptyTitle: subjects.length === 0 ? t.subjectSwitcherEmptyLabel : t.subjectEmptyMessage,
			emptyBody: ""
		},
		errorAction: null
	});

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
		changeSubjectFooterSheetOpen(false);
		onSelectSubject(subjectId);
	}, [changeSubjectFooterSheetOpen, closeSubjectSearchSheet, onSelectSubject]);

	const pageTools = useMemo(() => {
		return createWorkspaceToolsModel({
			pageToolGroup: NAV_ITEMS.popOutMenuItems[NAV_SCREENS.SUBJECTS],
			t,
			topicAreaToolItems: [],
			activeTopicAreaKey: null
		});
	}, [t]);

	return {
		// Data
		subjects,
		filteredSubjects,
		faculties,
		workspaceState,
		pageTools,

		// Navigasjon
		backContract,

		// Tekster
		t,
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
		changeSubjectFooterSheetOpen,
		closeSubjectSearchSheet,
		selectSubject
	};
}

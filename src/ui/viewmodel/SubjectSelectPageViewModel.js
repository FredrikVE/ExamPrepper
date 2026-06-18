// src/ui/viewmodel/SubjectSelectPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { ALL_FACULTIES, buildSubjectFaculties, filterSubjects, findSubjectById } from "./SubjectSelectPage/subjectSelectPageFilters.js";

export default function useSubjectSelectPageViewModel(getAvailableSubjectsUseCase, language, t, selectedSubjectId, onSelectSubject) {
	const [subjects, setSubjects] = useState([]);
	const [subjectsLoading, setSubjectsLoading] = useState(true);
	const [subjectsLoadError, setSubjectsLoadError] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [faculty, setFaculty] = useState(ALL_FACULTIES);
	const [isSearchFocused, setIsSearchFocused] = useState(false);

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

	const changeSearchTerm = useCallback((nextSearchTerm) => {
		setSearchTerm(nextSearchTerm);
	}, []);

	const changeFaculty = useCallback((nextFaculty) => {
		setFaculty(nextFaculty);
	}, []);

	const focusSearch = useCallback(() => {
		setIsSearchFocused(true);
	}, []);

	const blurSearch = useCallback(() => {
		setIsSearchFocused(false);
	}, []);

	const selectSubject = useCallback((subjectId) => {
		onSelectSubject(subjectId);
	}, [onSelectSubject]);

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

		// Filter-verdier
		searchTerm,
		faculty,
		isSearchFocused,

		// Handlers
		changeSearchTerm,
		changeFaculty,
		focusSearch,
		blurSearch,
		selectSubject
	};
}

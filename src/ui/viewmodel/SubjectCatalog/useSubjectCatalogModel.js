// src/ui/viewmodel/SubjectCatalog/useSubjectCatalogModel.js
import { useCallback } from "react";
import { LOAD_STATUS } from "../LoadState/loadStatus.js";
import useLoadModel from "../LoadState/useLoadModel.js";

const SUBJECT_SWITCHER_KINDS = Object.freeze({
	LOADING: "loading",
	ERROR: "error",
	EMPTY: "empty",
	UNSELECTED: "unselected",
	READY: "ready"
});

export default function useSubjectCatalogModel({ getAvailableSubjectsUseCase, language, selectedSubjectId, t }) {
	const executeLoad = useCallback(() => {
		return getAvailableSubjectsUseCase.execute({ language });
	}, [getAvailableSubjectsUseCase, language]);

	const loadModel = useLoadModel({
		execute: executeLoad,
		emptyData: [],
		errorMessage: t.subjectErrorMessage,
		resourceKey: language,
		isEnabled: true,
		onLoaded: null
	});

	const selectedSubject = findSubjectById(
		loadModel.data,
		selectedSubjectId
	);
	const subjectSwitcher = createSubjectSwitcherModel({
		loadStatus: loadModel.status,
		subjects: loadModel.data,
		selectedSubject,
		labels: {
			loading: t.subjectLoadingMessage,
			error: t.subjectErrorMessage,
			empty: t.subjectSwitcherEmptyLabel,
			unselected: t.subjectSwitcherSelectLabel
		}
	});

	return {
		subjects: loadModel.data,
		selectedSubject,
		subjectSwitcher,
		loadStatus: loadModel.status,
		errorMessage: loadModel.error
	};
}

function findSubjectById(subjects, subjectId) {
	if (!subjectId) {
		return null;
	}

	for (const subject of subjects) {
		if (subject.id === subjectId) {
			return subject;
		}
	}

	return null;
}

function createSubjectSwitcherModel({ loadStatus, subjects, selectedSubject, labels }) {
	switch (loadStatus) {
		case LOAD_STATUS.LOADING:
			return {
				kind: SUBJECT_SWITCHER_KINDS.LOADING,
				subjects: [],
				currentSubject: null,
				label: labels.loading,
				canOpen: false
			};

		case LOAD_STATUS.ERROR:
			return {
				kind: SUBJECT_SWITCHER_KINDS.ERROR,
				subjects: [],
				currentSubject: null,
				label: labels.error,
				canOpen: false
			};

		case LOAD_STATUS.READY:
			if (subjects.length === 0) {
				return {
					kind: SUBJECT_SWITCHER_KINDS.EMPTY,
					subjects: [],
					currentSubject: null,
					label: labels.empty,
					canOpen: false
				};
			}

			if (selectedSubject === null) {
				return {
					kind: SUBJECT_SWITCHER_KINDS.UNSELECTED,
					subjects,
					currentSubject: null,
					label: labels.unselected,
					canOpen: true
				};
			}

			return {
				kind: SUBJECT_SWITCHER_KINDS.READY,
				subjects,
				currentSubject: selectedSubject,
				label: selectedSubject.name,
				canOpen: true
			};

		default:
			throw new Error(`Unknown subject load status: ${String(loadStatus)}`);
	}
}

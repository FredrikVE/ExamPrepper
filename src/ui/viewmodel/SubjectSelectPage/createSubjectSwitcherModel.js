// src/ui/viewmodel/SubjectSelectPage/createSubjectSwitcherModel.js
import { LOAD_STATUS } from "../LoadState/loadStatus.js";

export const SUBJECT_SWITCHER_KINDS = {
	LOADING: "loading",
	ERROR: "error",
	EMPTY: "empty",
	UNSELECTED: "unselected",
	READY: "ready"
};

export function createSubjectSwitcherModel({ loadStatus, subjects, selectedSubject, labels }) {
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

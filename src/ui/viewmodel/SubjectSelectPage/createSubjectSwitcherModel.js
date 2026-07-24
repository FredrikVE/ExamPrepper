import { LOAD_STATUS } from "../LoadState/loadStatus.js";

export function createSubjectSwitcherModel(subjects, selectedSubject, loadStatus, loadError, labels) {
	switch (loadStatus) {
		case LOAD_STATUS.LOADING:
			return {
				kind: "loading",
				subjects: [],
				currentSubject: null,
				label: labels.loading,
				canOpen: false
			};

		case LOAD_STATUS.ERROR:
			return {
				kind: "error",
				subjects: [],
				currentSubject: null,
				label: loadError,
				canOpen: false
			};

		case LOAD_STATUS.READY:
			if (selectedSubject === null) {
				return {
					kind: "empty",
					subjects,
					currentSubject: null,
					label: labels.empty,
					canOpen: subjects.length > 0
				};
			}

			return {
				kind: "ready",
				subjects,
				currentSubject: selectedSubject,
				label: selectedSubject.name,
				canOpen: true
			};

		default:
			throw new Error(`Ukjent load status: ${String(loadStatus)}`);
	}
}

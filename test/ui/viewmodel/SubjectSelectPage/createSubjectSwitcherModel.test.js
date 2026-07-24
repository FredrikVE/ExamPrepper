// test/ui/viewmodel/SubjectSelectPage/createSubjectSwitcherModel.test.js
import { describe, expect, test } from "@jest/globals";
import { LOAD_STATUS } from "../../../../src/ui/viewmodel/LoadState/loadStatus.js";
import { createSubjectSwitcherModel, SUBJECT_SWITCHER_KINDS } from "../../../../src/ui/viewmodel/SubjectSelectPage/createSubjectSwitcherModel.js";

const labels = {
	loading: "Laster fag",
	error: "Kunne ikke laste fag",
	empty: "Ingen fag",
	unselected: "Velg fag"
};

const subjects = [
	{
		id: "subject-1",
		code: "IN1000",
		name: "Introduksjon til programmering",
		icon: "code"
	}
];

function createModel({ loadStatus, availableSubjects, selectedSubject }) {
	return createSubjectSwitcherModel({
		loadStatus,
		subjects: availableSubjects,
		selectedSubject,
		labels
	});
}

describe("createSubjectSwitcherModel", () => {
	test("returns the complete loading shape", () => {
		expect(createModel({ loadStatus: LOAD_STATUS.LOADING, availableSubjects: subjects, selectedSubject: null })).toEqual({
			kind: SUBJECT_SWITCHER_KINDS.LOADING,
			subjects: [],
			currentSubject: null,
			label: labels.loading,
			canOpen: false
		});
	});

	test("returns the complete error shape", () => {
		expect(createModel({ loadStatus: LOAD_STATUS.ERROR, availableSubjects: subjects, selectedSubject: subjects[0] })).toEqual({
			kind: SUBJECT_SWITCHER_KINDS.ERROR,
			subjects: [],
			currentSubject: null,
			label: labels.error,
			canOpen: false
		});
	});

	test("returns empty only when no subjects exist", () => {
		expect(createModel({ loadStatus: LOAD_STATUS.READY, availableSubjects: [], selectedSubject: null })).toEqual({
			kind: SUBJECT_SWITCHER_KINDS.EMPTY,
			subjects: [],
			currentSubject: null,
			label: labels.empty,
			canOpen: false
		});
	});

	test("returns unselected when subjects exist without a selection", () => {
		expect(createModel({ loadStatus: LOAD_STATUS.READY, availableSubjects: subjects, selectedSubject: null })).toEqual({
			kind: SUBJECT_SWITCHER_KINDS.UNSELECTED,
			subjects,
			currentSubject: null,
			label: labels.unselected,
			canOpen: true
		});
	});

	test("returns the selected real subject", () => {
		expect(createModel({ loadStatus: LOAD_STATUS.READY, availableSubjects: subjects, selectedSubject: subjects[0] })).toEqual({
			kind: SUBJECT_SWITCHER_KINDS.READY,
			subjects,
			currentSubject: subjects[0],
			label: subjects[0].name,
			canOpen: true
		});
	});

	test("throws for an unknown load status", () => {
		expect(() => createModel({ loadStatus: "missing", availableSubjects: subjects, selectedSubject: null })).toThrow("Unknown subject load status: missing");
	});
});

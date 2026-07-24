import { describe, expect, test } from "@jest/globals";
import { LOAD_STATUS } from "../../../../src/ui/viewmodel/LoadState/loadStatus.js";
import { createSubjectSwitcherModel } from "../../../../src/ui/viewmodel/SubjectSelectPage/createSubjectSwitcherModel.js";

const labels = {
	loading: "Laster fag",
	empty: "Ingen fag"
};

const subjects = [
	{
		id: "subject-1",
		code: "IN1000",
		name: "Introduksjon til programmering",
		icon: "code"
	}
];

describe("createSubjectSwitcherModel", () => {
	test("returns the shared loading state", () => {
		expect(createSubjectSwitcherModel(subjects, null, LOAD_STATUS.LOADING, null, labels)).toEqual({
			kind: "loading",
			subjects: [],
			currentSubject: null,
			label: "Laster fag",
			canOpen: false
		});
	});

	test("returns the shared error state", () => {
		expect(createSubjectSwitcherModel(subjects, subjects[0], LOAD_STATUS.ERROR, "Kunne ikke laste fag", labels)).toEqual({
			kind: "error",
			subjects: [],
			currentSubject: null,
			label: "Kunne ikke laste fag",
			canOpen: false
		});
	});

	test("returns Ingen fag without creating a fake subject", () => {
		expect(createSubjectSwitcherModel([], null, LOAD_STATUS.READY, null, labels)).toEqual({
			kind: "empty",
			subjects: [],
			currentSubject: null,
			label: "Ingen fag",
			canOpen: false
		});
	});

	test("allows selecting a subject when subjects exist but none is selected", () => {
		expect(createSubjectSwitcherModel(subjects, null, LOAD_STATUS.READY, null, labels)).toEqual({
			kind: "empty",
			subjects,
			currentSubject: null,
			label: "Ingen fag",
			canOpen: true
		});
	});

	test("returns the selected real subject", () => {
		expect(createSubjectSwitcherModel(subjects, subjects[0], LOAD_STATUS.READY, null, labels)).toEqual({
			kind: "ready",
			subjects,
			currentSubject: subjects[0],
			label: subjects[0].name,
			canOpen: true
		});
	});
});

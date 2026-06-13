// test/ui/viewmodel/subjectSelectPageFilters.test.js
import { describe, expect, test } from "@jest/globals";
import {
	ALL_FACULTIES,
	buildSubjectFaculties,
	filterSubjects,
	findSubjectById
} from "../../../src/ui/viewmodel/SubjectSelectPage/subjectSelectPageFilters.js";

const subjects = [
	{
		id: "in5431",
		code: "IN5431",
		name: "IT and Management",
		description: "Digitalisering og styring",
		faculty: "Informatikk"
	},
	{
		id: "jur1000",
		code: "JUR1000",
		name: "Juridisk metode",
		description: "Rett og metode",
		faculty: "Jus"
	},
	{
		id: "in2000",
		code: "IN2000",
		name: "Software Engineering",
		description: "Systemutvikling",
		faculty: "Informatikk"
	},
	{
		id: "exphil",
		code: "EXPHIL",
		name: "Examen philosophicum",
		description: "Filosofi",
		faculty: null
	}
];

describe("subjectSelectPageFilters", () => {
	test("finds selected subject by id", () => {
		expect(findSubjectById(subjects, "jur1000")).toEqual(subjects[1]);
	});

	test("returns null when selected subject id is missing", () => {
		expect(findSubjectById(subjects, null)).toBeNull();
		expect(findSubjectById(subjects, "missing")).toBeNull();
	});

	test("builds unique faculty options and skips empty values", () => {
		expect(buildSubjectFaculties(subjects)).toEqual([
			"Informatikk",
			"Jus"
		]);
	});

	test("filters subjects by code, name and description", () => {
		expect(filterSubjects(subjects, "in5431", ALL_FACULTIES)).toEqual([subjects[0]]);
		expect(filterSubjects(subjects, "metode", ALL_FACULTIES)).toEqual([subjects[1]]);
		expect(filterSubjects(subjects, "system", ALL_FACULTIES)).toEqual([subjects[2]]);
	});

	test("filters subjects by faculty", () => {
		expect(filterSubjects(subjects, "", "Informatikk")).toEqual([
			subjects[0],
			subjects[2]
		]);
	});

	test("combines search and faculty filters", () => {
		expect(filterSubjects(subjects, "in", "Jus")).toEqual([]);
		expect(filterSubjects(subjects, "jur", "Jus")).toEqual([subjects[1]]);
	});
});

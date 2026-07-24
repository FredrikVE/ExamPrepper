import normalizeSearchTerm from "../Utils/normalizeSearchTerm.js";

// src/ui/viewmodel/SubjectSelectPage/subjectSelectPageFilters.js
export const ALL_FACULTIES = "all";

export function findSubjectById(subjects, subjectId) {
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

export function buildSubjectFaculties(subjects) {
	const faculties = [];

	for (const subject of subjects) {
		if (!subject.faculty) {
			continue;
		}

		if (faculties.includes(subject.faculty)) {
			continue;
		}

		faculties.push(subject.faculty);
	}

	return faculties;
}

export function filterSubjects(subjects, searchTerm, faculty) {
	const filteredSubjects = [];
	const normalizedSearchTerm = normalizeSearchTerm(searchTerm);

	for (const subject of subjects) {
		if (!subjectMatchesFaculty(subject, faculty)) {
			continue;
		}

		if (!subjectMatchesSearchTerm(subject, normalizedSearchTerm)) {
			continue;
		}

		filteredSubjects.push(subject);
	}

	return filteredSubjects;
}

function subjectMatchesFaculty(subject, faculty) {
	return faculty === ALL_FACULTIES || subject.faculty === faculty;
}

function subjectMatchesSearchTerm(subject, normalizedSearchTerm) {
	if (!normalizedSearchTerm) {
		return true;
	}

	if (subject.code?.toLowerCase().includes(normalizedSearchTerm)) {
		return true;
	}

	if (subject.name?.toLowerCase().includes(normalizedSearchTerm)) {
		return true;
	}

	if (subject.description?.toLowerCase().includes(normalizedSearchTerm)) {
		return true;
	}

	return false;
}

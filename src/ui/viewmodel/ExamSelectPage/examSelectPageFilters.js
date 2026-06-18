// src/ui/viewmodel/ExamSelectPage/examSelectPageFilters.js
export const ALL_CATEGORIES = "all";

export function buildExamCategories(exams) {
	const categories = [];

	for (const exam of exams) {
		const category = exam.modeLabel;

		if (!category) {
			continue;
		}

		if (categories.includes(category)) {
			continue;
		}

		categories.push(category);
	}

	return categories;
}

export function filterExams(exams, searchTerm, category) {
	const normalizedSearchTerm = searchTerm.trim().toLowerCase();
	const filteredExams = [];

	for (const exam of exams) {
		if (!examMatchesCategory(exam, category)) {
			continue;
		}

		if (!examMatchesSearchTerm(exam, normalizedSearchTerm)) {
			continue;
		}

		filteredExams.push(exam);
	}

	return filteredExams;
}

function examMatchesCategory(exam, category) {
	return category === ALL_CATEGORIES || exam.modeLabel === category;
}

function examMatchesSearchTerm(exam, normalizedSearchTerm) {
	if (!normalizedSearchTerm) {
		return true;
	}

	if (exam.title?.toLowerCase().includes(normalizedSearchTerm)) {
		return true;
	}

	if (exam.description?.toLowerCase().includes(normalizedSearchTerm)) {
		return true;
	}

	if (exam.modeLabel?.toLowerCase().includes(normalizedSearchTerm)) {
		return true;
	}

	return false;
}

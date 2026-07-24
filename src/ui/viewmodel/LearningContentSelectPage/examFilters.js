import normalizeSearchTerm from "../Utils/normalizeSearchTerm.js";
// src/ui/viewmodel/LearningContentSelectPage/examFilters.js
import { ALL_TOPIC_AREAS } from "../../../model/domain/utils/topicAreaFilters.js";

export { ALL_TOPIC_AREAS };

export function filterExams(exams, searchTerm, topicAreaKey) {
	const normalizedSearchTerm = normalizeSearchTerm(searchTerm);
	const filteredExams = [];

	for (const exam of exams) {
		if (!examMatchesTopicArea(exam, topicAreaKey)) {
			continue;
		}

		if (!examMatchesSearchTerm(exam, normalizedSearchTerm)) {
			continue;
		}

		filteredExams.push(exam);
	}

	return filteredExams;
}

function examMatchesTopicArea(exam, topicAreaKey) {
	if (topicAreaKey === ALL_TOPIC_AREAS) {
		return true;
	}

	if (!Array.isArray(exam.topicAreaKeys)) {
		return false;
	}

	return exam.topicAreaKeys.includes(topicAreaKey);
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

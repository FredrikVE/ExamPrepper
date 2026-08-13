// src/ui/viewmodel/LearningContentSelectPage/testSetFilters.js
import { ALL_TOPIC_AREAS } from "../../../model/domain/utils/topicAreaFilters.js";
import normalizeSearchTerm from "../Utils/normalizeSearchTerm.js";

export function filterTestSets(testSets, searchTerm, topicAreaKey) {
	const normalizedSearchTerm = normalizeSearchTerm(searchTerm);
	const filteredTestSets = [];

	for (const testSet of testSets) {
		if (!testSetMatchesTopicArea(testSet, topicAreaKey)) {
			continue;
		}

		if (!testSetMatchesSearchTerm(testSet, normalizedSearchTerm)) {
			continue;
		}

		filteredTestSets.push(testSet);
	}

	return filteredTestSets;
}

function testSetMatchesTopicArea(testSet, topicAreaKey) {
	if (topicAreaKey === ALL_TOPIC_AREAS) {
		return true;
	}

	if (!Array.isArray(testSet.topicAreaKeys)) {
		return false;
	}

	return testSet.topicAreaKeys.includes(topicAreaKey);
}

function testSetMatchesSearchTerm(testSet, normalizedSearchTerm) {
	if (!normalizedSearchTerm) {
		return true;
	}

	if (testSet.title?.toLowerCase().includes(normalizedSearchTerm)) {
		return true;
	}

	if (testSet.description?.toLowerCase().includes(normalizedSearchTerm)) {
		return true;
	}

	if (testSet.modeLabel?.toLowerCase().includes(normalizedSearchTerm)) {
		return true;
	}

	return false;
}

// src/ui/viewmodel/LearningContentSelectPage/createLearningContentSelectPageHeading.js
import { LEARNING_CONTENT_ENTRIES, LEARNING_CONTENT_TYPES } from "../../../navigation/learningContent.js";

function createLearningContentSelectTitle(t, activeContentType) {
	const activeEntry = findLearningContentEntry(activeContentType);

	if (activeEntry) {
		const title = t[activeEntry.titleKey];

		if (title) {
			return title;
		}
	}

	return t.selectExamsTitle;
}

function createLearningContentSelectSubtitle(t, selectedSubject, activeContentType) {
	const activeEntry = findLearningContentEntry(activeContentType);

	if (!selectedSubject?.code) {
		return getSubtitleFallback(t, activeEntry);
	}

	const subtitleFactory = t[activeEntry?.subtitleKey];

	if (typeof subtitleFactory === "function") {
		return subtitleFactory(selectedSubject.code);
	}

	return t.selectSubtitle(selectedSubject.code);
}

function getSubtitleFallback(t, activeEntry) {
	const fallback = t[activeEntry?.subtitleFallbackKey];

	if (fallback) {
		return fallback;
	}

	return t.selectSubtitleFallback;
}

function findLearningContentEntry(activeContentType) {
	for (const entry of LEARNING_CONTENT_ENTRIES) {
		if (entry.id === activeContentType) {
			return entry;
		}
	}

	for (const entry of LEARNING_CONTENT_ENTRIES) {
		if (entry.id === LEARNING_CONTENT_TYPES.EXAMS) {
			return entry;
		}
	}

	return null;
}

export default function createLearningContentSelectPageHeading(t, selectedSubject, activeContentType) {
	return {
		title: createLearningContentSelectTitle(t, activeContentType),
		subtitle: createLearningContentSelectSubtitle(t, selectedSubject, activeContentType)
	};
}

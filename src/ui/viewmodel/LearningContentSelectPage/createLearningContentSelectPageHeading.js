// src/ui/viewmodel/LearningContentSelectPage/createLearningContentSelectPageHeading.js
import { LEARNING_CONTENT_TYPES, NAV_ITEMS } from "../../../navigation/navigation.js";

function createLearningContentSelectTitle(t, activeContentType) {
	const activeEntry = findLearningContentEntry(activeContentType);
	const title = t[activeEntry.titleKey];

	return title || t.selectExamsTitle;
}

function createLearningContentSelectSubtitle(t, selectedSubject, activeContentType) {
	const activeEntry = findLearningContentEntry(activeContentType);

	if (!selectedSubject || !selectedSubject.code) {
		return getSubtitleFallback(t, activeEntry);
	}

	const subtitleFactory = t[activeEntry.subtitleKey];

	if (typeof subtitleFactory === "function") {
		return subtitleFactory(selectedSubject.code);
	}

	return t.selectSubtitle(selectedSubject.code);
}

function getSubtitleFallback(t, activeEntry) {
	return t[activeEntry.subtitleFallbackKey] || t.selectSubtitleFallback;
}

function findLearningContentEntry(activeContentType) {
	for (const entry of NAV_ITEMS.toggleButtonItems) {
		if (entry.id === activeContentType) {
			return entry;
		}
	}

	for (const entry of NAV_ITEMS.toggleButtonItems) {
		if (entry.id === LEARNING_CONTENT_TYPES.EXAMS) {
			return entry;
		}
	}

	throw new Error("Mangler konfigurasjon for eksamensinnhold");
}

export default function createLearningContentSelectPageHeading(t, selectedSubject, activeContentType) {
	return {
		title: createLearningContentSelectTitle(t, activeContentType),
		subtitle: createLearningContentSelectSubtitle(t, selectedSubject, activeContentType)
	};
}

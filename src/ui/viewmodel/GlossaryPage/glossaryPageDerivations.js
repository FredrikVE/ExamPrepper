// src/ui/viewmodel/GlossaryPage/glossaryPageDerivations.js
import { ALL_TOPIC_AREAS } from "../../../constants/TopicAreas.js";
import { LOAD_STATUS } from "../LoadState/loadStatus.js";
import { resolveLocalizedText } from "./resolveLocalizedText.js";

export function createGlossaryEntryByKey(entries) {
	const entryByKey = new Map();
	for (const entry of entries) {
		entryByKey.set(entry.glossaryEntryKey, entry);
	}
	return entryByKey;
}

export function createGlossaryPageSubtitle(t, selectedSubject) {
	if (!selectedSubject?.code) {
		return t.glossaryPageSubtitleFallback;
	}

	return t.glossaryPageSubtitle(selectedSubject.code);
}

export function localizeGlossaryEntries(glossaryEntries, language) {
	return glossaryEntries.map((glossaryEntry) => ({
		glossaryEntryKey: glossaryEntry.glossaryEntryKey,
		topicAreaKey: glossaryEntry.topicAreaKey,
		term: resolveLocalizedText(glossaryEntry.term, language),
		explanation: resolveLocalizedText(glossaryEntry.explanation, language),
		position: glossaryEntry.position,
		directNeighborCount: glossaryEntry.directNeighborCount,
		directNeighborGlossaryKeys: glossaryEntry.directNeighborGlossaryKeys,
		mastery: glossaryEntry.mastery
	}));
}

export function groupGlossaryEntriesByTopicAreaKey(localizedEntries) {
	const entriesByTopicAreaKey = new Map();

	for (const localizedEntry of localizedEntries) {
		if (!entriesByTopicAreaKey.has(localizedEntry.topicAreaKey)) {
			entriesByTopicAreaKey.set(localizedEntry.topicAreaKey, []);
		}

		entriesByTopicAreaKey.get(localizedEntry.topicAreaKey).push(localizedEntry);
	}

	for (const topicAreaEntries of entriesByTopicAreaKey.values()) {
		topicAreaEntries.sort(compareGlossaryEntries);
	}

	return entriesByTopicAreaKey;
}

function compareGlossaryEntries(leftEntry, rightEntry) {
	const positionDifference = leftEntry.position - rightEntry.position;

	if (positionDifference !== 0) {
		return positionDifference;
	}

	return leftEntry.glossaryEntryKey.localeCompare(rightEntry.glossaryEntryKey);
}

export function createTopicAreaByKey(topicAreas) {
	return new Map(topicAreas.map((topicArea) => [topicArea.key, topicArea]));
}

export function createTopicAreaReferenceByKey(topicAreas, createChapterReference) {
	return new Map(topicAreas.map((topicArea) => [
		topicArea.key,
		createChapterReference(topicArea.position)
	]));
}

export function resolveSelectedTopicAreaKeys({ selectedTopicAreaKeys, topicAreas, initialTopicAreaKey }) {
	const validTopicAreaKeys = new Set(topicAreas.map((topicArea) => topicArea.key));

	if (selectedTopicAreaKeys === null) {
		if (validTopicAreaKeys.has(initialTopicAreaKey)) {
			return new Set([initialTopicAreaKey]);
		}

		return validTopicAreaKeys;
	}

	const resolvedTopicAreaKeys = new Set();

	for (const topicAreaKey of selectedTopicAreaKeys) {
		if (validTopicAreaKeys.has(topicAreaKey)) {
			resolvedTopicAreaKeys.add(topicAreaKey);
		}
	}

	return resolvedTopicAreaKeys.size === 0
		? validTopicAreaKeys
		: resolvedTopicAreaKeys;
}

export function createAllTopicAreaKeySet(topicAreas) {
	return new Set(topicAreas.map((topicArea) => topicArea.key));
}

export function collectSelectedTopicAreaEntries({ topicAreas, selectedTopicAreaKeys, entriesByTopicAreaKey }) {
	const selectedEntries = [];

	for (const topicArea of topicAreas) {
		if (!selectedTopicAreaKeys.has(topicArea.key)) {
			continue;
		}

		const topicAreaEntries = entriesByTopicAreaKey.get(topicArea.key) ?? [];
		selectedEntries.push(...topicAreaEntries);
	}

	return selectedEntries;
}

export function selectGlossaryEntriesForPresentation(selectedEntries, searchNarrowedGlossaryEntryKey) {
	if (searchNarrowedGlossaryEntryKey === null) {
		return selectedEntries;
	}

	const selectedEntry = selectedEntries.find((entry) => entry.glossaryEntryKey === searchNarrowedGlossaryEntryKey);

	return selectedEntry === undefined ? selectedEntries : [selectedEntry];
}

export function createGlossaryPanelHeading({ topicAreaByKey, selectedTopicAreaKeys, isAllTopicAreasSelected, visibleEntryCount, t }) {
	if (isAllTopicAreasSelected) {
		return {
			title: t.glossaryPageAllChaptersHeading,
			subtitle: t.glossaryPageChapterSubtitle(visibleEntryCount)
		};
	}

	if (selectedTopicAreaKeys.size === 1) {
		const selectedTopicAreaKey = selectedTopicAreaKeys.values().next().value;
		const selectedTopicArea = topicAreaByKey.get(selectedTopicAreaKey);

		return {
			title: selectedTopicArea?.label ?? t.glossaryPageSelectedChaptersHeading(1),
			subtitle: t.glossaryPageChapterSubtitle(visibleEntryCount)
		};
	}

	return {
		title: t.glossaryPageSelectedChaptersHeading(selectedTopicAreaKeys.size),
		subtitle: t.glossaryPageChapterSubtitle(visibleEntryCount)
	};
}

export function resolveSearchKeyboardIndex({ searchKeyboardIndex, suggestionCount, isAutocompleteOpen }) {
	if (!isAutocompleteOpen || suggestionCount === 0) {
		return -1;
	}

	if (searchKeyboardIndex < 0 || searchKeyboardIndex >= suggestionCount) {
		return 0;
	}

	return searchKeyboardIndex;
}

export function resolveSelectedChapterFilterValue({ selectedTopicAreaKeys, topicAreaCount }) {
	if (selectedTopicAreaKeys.size === topicAreaCount) {
		return ALL_TOPIC_AREAS;
	}

	if (selectedTopicAreaKeys.size === 1) {
		return selectedTopicAreaKeys.values().next().value;
	}

	return null;
}

export function resolveChapterFilterLabel({ selectedChapterFilterValue, selectedTopicAreaCount, topicAreaByKey, t }) {
	if (selectedChapterFilterValue === ALL_TOPIC_AREAS) {
		return t.glossaryPageAllChaptersHeading;
	}

	if (selectedChapterFilterValue !== null) {
		return topicAreaByKey.get(selectedChapterFilterValue)?.label
			?? t.glossaryPageSelectedChaptersHeading(1);
	}

	return t.glossaryPageSelectedChaptersHeading(selectedTopicAreaCount);
}

export function resolvePageEmptyStateKind({ pageStatus, topicAreas, localizedEntries }) {
	if (pageStatus !== LOAD_STATUS.READY) {
		return null;
	}

	if (topicAreas.length === 0) {
		return "no-topic-areas";
	}

	if (localizedEntries.length === 0) {
		return "no-glossary-entries";
	}

	return null;
}

export function resolveGlossaryPanelEmptyStateKind(selectedEntryCount) {
	return selectedEntryCount === 0 ? "no-entries-in-selection" : null;
}

export function createGlossaryEmptyState({ emptyStateKind, t }) {
	if (emptyStateKind === "no-topic-areas") {
		return {
			kind: emptyStateKind,
			title: t.glossaryPageNoTopicAreasTitle,
			body: t.glossaryPageNoTopicAreasBody
		};
	}

	if (emptyStateKind === "no-glossary-entries") {
		return {
			kind: emptyStateKind,
			title: t.glossaryPageNoEntriesTitle,
			body: t.glossaryPageNoEntriesBody
		};
	}

	if (emptyStateKind === "no-entries-in-selection") {
		return {
			kind: emptyStateKind,
			title: t.glossaryPageNoEntriesInSelectionTitle,
			body: t.glossaryPageNoEntriesInSelectionBody
		};
	}

	return null;
}

export const calculateNextSearchKeyboardIndex = ({ previousIndex, direction, suggestionCount }) => {
	if (previousIndex < 0) {
		return direction > 0 ? 0 : suggestionCount - 1;
	}

	return (previousIndex + direction + suggestionCount) % suggestionCount;
};

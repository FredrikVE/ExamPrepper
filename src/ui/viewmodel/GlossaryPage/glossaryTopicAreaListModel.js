// src/ui/viewmodel/GlossaryPage/glossaryTopicAreaListModel.js
export const GLOSSARY_TOPIC_AREA_LIST_ID = "glossary-topic-area-list";

export function createGlossaryTopicAreaListItems({
	topicAreas,
	entriesByTopicAreaKey,
	matchCountsByTopicAreaKey,
	normalizedSearchTerm,
	labels
}) {
	const isSearching = normalizedSearchTerm.length > 0;
	const topicAreaListItems = [];

	for (const topicArea of topicAreas) {
		const entries = entriesByTopicAreaKey.get(topicArea.key) ?? [];
		const entryCount = entries.length;
		const matchCount = matchCountsByTopicAreaKey.get(topicArea.key) ?? 0;
		const matchesTopicAreaLabel = isSearching
			&& topicArea.label.toLowerCase().includes(normalizedSearchTerm);

		if (isSearching && !matchesTopicAreaLabel && matchCount === 0) {
			continue;
		}

		const showsAllEntries = !isSearching || matchesTopicAreaLabel;

		topicAreaListItems.push({
			id: createGlossaryTopicAreaOptionId(topicArea.key),
			topicAreaKey: topicArea.key,
			label: topicArea.label,
			iconKey: topicArea.iconKey,
			position: topicArea.position,
			entryCount,
			matchCount,
			matchCountLabel: isSearching && matchCount > 0
				? labels.chapterMatchCount(matchCount)
				: null,
			subtitle: isSearching && !showsAllEntries
				? labels.chapterSearchSubtitle(matchCount)
				: labels.chapterSubtitle(entryCount),
			matchesTopicAreaLabel,
			showsAllEntries
		});
	}

	return topicAreaListItems;
}

export function applyGlossaryTopicAreaInteractionState({
	topicAreaListItems,
	activeTopicAreaKey,
	searchKeyboardIndex
}) {
	return topicAreaListItems.map((topicAreaListItem, topicAreaIndex) => ({
		...topicAreaListItem,
		isActive: topicAreaListItem.topicAreaKey === activeTopicAreaKey,
		isKeyboardTarget: topicAreaIndex === searchKeyboardIndex
	}));
}

export function createGlossaryTopicAreaOptionId(topicAreaKey) {
	return `glossary-topic-area-option-${encodeURIComponent(topicAreaKey)}`;
}

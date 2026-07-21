// src/ui/viewmodel/GlossaryPage/glossaryTopicAreaListModel.js
import { ALL_TOPIC_AREAS } from "../../../model/domain/utils/topicAreaFilters.js";

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
			showsAllEntries,
			isAllTopicAreas: false
		});
	}

	return topicAreaListItems;
}

export function createGlossaryAllTopicAreaListItem({
	topicAreaCount,
	selectedTopicAreaCount,
	entryCount,
	isSelected,
	labels
}) {
	return {
		id: createGlossaryTopicAreaOptionId(ALL_TOPIC_AREAS),
		topicAreaKey: ALL_TOPIC_AREAS,
		label: labels.allTopicAreas,
		subtitle: isSelected
			? labels.allTopicAreasSelected(topicAreaCount)
			: labels.topicAreaSelection(selectedTopicAreaCount, topicAreaCount),
		eyebrow: isSelected
			? labels.allTopicAreasEyebrow
			: labels.topicAreaSelectionEyebrow,
		iconKey: "book-open",
		position: 0,
		entryCount,
		matchCount: 0,
		matchCountLabel: null,
		matchesTopicAreaLabel: false,
		showsAllEntries: true,
		isAllTopicAreas: true,
		isSelected,
		isActive: isSelected,
		isKeyboardTarget: false,
		showsSelectionControl: false
	};
}

export function applyGlossaryTopicAreaInteractionState({
	topicAreaListItems,
	selectedTopicAreaKeys,
	searchKeyboardIndex,
	showsSelectionControls
}) {
	return topicAreaListItems.map((topicAreaListItem, topicAreaIndex) => {
		const isSelected = selectedTopicAreaKeys.has(topicAreaListItem.topicAreaKey);

		return {
			...topicAreaListItem,
			isSelected,
			isActive: showsSelectionControls && isSelected,
			isKeyboardTarget: topicAreaIndex === searchKeyboardIndex,
			showsSelectionControl: showsSelectionControls
		};
	});
}

export function createGlossaryTopicAreaOptionId(topicAreaKey) {
	return `glossary-topic-area-option-${encodeURIComponent(topicAreaKey)}`;
}

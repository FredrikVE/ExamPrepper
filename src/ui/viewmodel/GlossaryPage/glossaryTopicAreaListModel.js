import { CONTENT_ICON_KEYS } from "../../../constants/ContentIconKeys.js";
import { ALL_TOPIC_AREAS } from "../../../constants/TopicAreas.js";

export const GLOSSARY_TOPIC_AREA_LIST_ID = "glossary-topic-area-list";

export function createGlossaryTopicAreaListItems({ topicAreas, entriesByTopicAreaKey, labels }) {
	const topicAreaListItems = [];

	for (const topicArea of topicAreas) {
		const entries = entriesByTopicAreaKey.get(topicArea.key) ?? [];
		const entryCount = entries.length;

		topicAreaListItems.push({
			id: createGlossaryTopicAreaOptionId(topicArea.key),
			topicAreaKey: topicArea.key,
			label: topicArea.label,
			iconKey: topicArea.iconKey,
			position: topicArea.position,
			entryCount,
			subtitle: labels.chapterSubtitle(entryCount),
			isAllTopicAreas: false
		});
	}

	return topicAreaListItems;
}

export function createGlossaryAllTopicAreaListItem({ entryCount, isSelected, labels }) {
	return {
		id: createGlossaryTopicAreaOptionId(ALL_TOPIC_AREAS),
		topicAreaKey: ALL_TOPIC_AREAS,
		label: labels.allTopicAreas,
		subtitle: labels.chapterSubtitle(entryCount),
		eyebrow: null,
		iconKey: CONTENT_ICON_KEYS.BOOK_OPEN,
		position: 0,
		entryCount,
		isAllTopicAreas: true,
		isSelected,
		isActive: isSelected,
		isKeyboardTarget: false,
		showsSelectionControl: false
	};
}

export function applyGlossaryTopicAreaInteractionState({ topicAreaListItems, selectedTopicAreaKeys, searchKeyboardIndex, showsSelectionControls }) {
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

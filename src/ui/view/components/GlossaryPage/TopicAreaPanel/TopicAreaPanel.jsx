// src/ui/view/components/GlossaryPage/TopicAreaPanel/TopicAreaPanel.jsx
import GlossaryTopicAreaNavigationList from "./GlossaryTopicAreaNavigationList.jsx";
import GlossaryTopicAreaSearchList from "./GlossaryTopicAreaSearchList.jsx";

export default function TopicAreaPanel({
	isSearching,
	topicAreaListId,
	allTopicAreaListItem,
	topicAreaListItems,
	topicAreaListAriaLabel,
	onSelectTopicArea
}) {
	return (
		<aside className="glossary-topic-area-panel" aria-label={topicAreaListAriaLabel}>
			{isSearching ? (
				<GlossaryTopicAreaSearchList
					listId={topicAreaListId}
					ariaLabel={topicAreaListAriaLabel}
					allTopicAreaListItem={allTopicAreaListItem}
					items={topicAreaListItems}
					onSelectTopicArea={onSelectTopicArea}
				/>
			) : (
				<GlossaryTopicAreaNavigationList
					ariaLabel={topicAreaListAriaLabel}
					allTopicAreaListItem={allTopicAreaListItem}
					items={topicAreaListItems}
					onSelectTopicArea={onSelectTopicArea}
				/>
			)}
		</aside>
	);
}

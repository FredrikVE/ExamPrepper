// src/ui/view/components/GlossaryPage/TopicAreaPanel/TopicAreaPanel.jsx
import GlossaryTopicAreaNavigationList from "./GlossaryTopicAreaNavigationList.jsx";

export default function TopicAreaPanel({ allTopicAreaListItem, topicAreaListItems, topicAreaListAriaLabel }) {
	return (
		<aside className="glossary-topic-area-panel" aria-label={topicAreaListAriaLabel}>
			<GlossaryTopicAreaNavigationList
				ariaLabel={topicAreaListAriaLabel}
				allTopicAreaListItem={allTopicAreaListItem}
				items={topicAreaListItems}
			/>
		</aside>
	);
}

// src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossaryTopicAreaNavigationList.jsx
import GlossaryTopicAreaButton from "./GlossaryTopicAreaButton.jsx";

export default function GlossaryTopicAreaNavigationList({ ariaLabel, items, activeTopicAreaKey, onSelectTopicArea }) {
	return (
		<nav className="glossary-topic-area-navigation" aria-label={ariaLabel}>
			<div className="glossary-topic-area-list" role="tablist" aria-label={ariaLabel}>
				{items.map((item) => (
					<GlossaryTopicAreaButton
						key={item.topicAreaKey}
						item={item}
						role="tab"
						isSelected={item.topicAreaKey === activeTopicAreaKey}
						onSelectTopicArea={onSelectTopicArea}
					/>
				))}
			</div>
		</nav>
	);
}

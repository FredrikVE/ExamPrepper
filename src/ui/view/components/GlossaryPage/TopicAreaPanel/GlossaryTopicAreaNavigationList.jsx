// src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossaryTopicAreaNavigationList.jsx
import GlossaryTopicAreaButton from "./GlossaryTopicAreaButton.jsx";

export default function GlossaryTopicAreaNavigationList({ ariaLabel, allTopicAreaListItem, items, onSelectTopicArea }) {
	return (
		<nav className="glossary-topic-area-navigation" aria-label={ariaLabel}>
			<div className="glossary-topic-area-list" role="group" aria-label={ariaLabel}>
				<GlossaryTopicAreaButton
					item={allTopicAreaListItem}
					usesOptionSemantics={false}
					onSelectTopicArea={onSelectTopicArea}
				/>
				{items.map((item) => (
					<GlossaryTopicAreaButton
						key={item.topicAreaKey}
						item={item}
						usesOptionSemantics={false}
						onSelectTopicArea={onSelectTopicArea}
					/>
				))}
			</div>
		</nav>
	);
}

// src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossaryTopicAreaNavigationList.jsx
import GlossaryTopicAreaButton from "./GlossaryTopicAreaButton.jsx";

export default function GlossaryTopicAreaNavigationList({ model, actions }) {
	return (
		<nav className="glossary-topic-area-navigation" aria-label={model.ariaLabel}>
			<div className="glossary-topic-area-list" role="tablist" aria-label={model.ariaLabel}>
				{model.items.map((item) => (
					<GlossaryTopicAreaButton
						key={item.topicAreaKey}
						item={item}
						role="tab"
						isSelected={item.topicAreaKey === model.activeTopicAreaKey}
						onSelectTopicArea={actions.onSelectTopicArea}
					/>
				))}
			</div>
		</nav>
	);
}

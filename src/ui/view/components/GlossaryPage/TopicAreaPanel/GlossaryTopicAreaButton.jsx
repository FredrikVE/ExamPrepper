// src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossaryTopicAreaButton.jsx
import TopicAreaListItem from "./TopicAreaListItem.jsx";

export default function GlossaryTopicAreaButton({ item, usesOptionSemantics, onSelectTopicArea }) {
	return (
		<button
			id={item.id}
			type="button"
			className="glossary-topic-area-button"
			role={usesOptionSemantics ? "option" : undefined}
			aria-selected={usesOptionSemantics ? item.isSelected : undefined}
			aria-pressed={usesOptionSemantics ? undefined : item.isSelected}
			data-active={item.isActive ? "true" : "false"}
			data-all-topic-areas={item.isAllTopicAreas ? "true" : "false"}
			data-keyboard-target={item.isKeyboardTarget ? "true" : "false"}
			data-shows-selection-control={item.showsSelectionControl ? "true" : "false"}
			onClick={() => onSelectTopicArea(item.topicAreaKey)}
		>
			<TopicAreaListItem item={item} />
		</button>
	);
}

// src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossaryTopicAreaButton.jsx
import TopicAreaListItem from "./TopicAreaListItem.jsx";

export default function GlossaryTopicAreaButton({ item, role, isSelected, onSelectTopicArea }) {
	return (
		<button
			id={item.id}
			type="button"
			className="glossary-topic-area-button"
			role={role}
			aria-selected={isSelected}
			data-active={item.isActive ? "true" : "false"}
			data-keyboard-target={item.isKeyboardTarget ? "true" : "false"}
			onClick={() => onSelectTopicArea(item.topicAreaKey)}
		>
			<TopicAreaListItem item={item} />
		</button>
	);
}

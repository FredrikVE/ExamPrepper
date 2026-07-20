// src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossaryTopicAreaSearchList.jsx
import TopicAreaListItem from "./TopicAreaListItem.jsx";

export default function GlossaryTopicAreaSearchList({
	topicAreaListItems,
	listId,
	ariaLabel,
	onSelectTopicArea
}) {
	const options = [];

	for (const item of topicAreaListItems) {
		options.push(
			<button
				key={item.topicAreaKey}
				id={item.id}
				type="button"
				className="toggle-button-row-button"
				role="option"
				aria-selected={item.isKeyboardTarget}
				data-active={item.isActive ? "true" : "false"}
				data-keyboard-target={item.isKeyboardTarget ? "true" : "false"}
				onClick={() => onSelectTopicArea(item.topicAreaKey)}
			>
				<TopicAreaListItem item={item} />
			</button>
		);
	}

	return (
		<div
			id={listId}
			className="toggle-button-row glossary-topic-area-search-list"
			role="listbox"
			aria-label={ariaLabel}
		>
			{options}
		</div>
	);
}

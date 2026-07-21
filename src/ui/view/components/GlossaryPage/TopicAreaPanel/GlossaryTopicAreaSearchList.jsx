// src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossaryTopicAreaSearchList.jsx
import GlossaryTopicAreaButton from "./GlossaryTopicAreaButton.jsx";

export default function GlossaryTopicAreaSearchList({ listId, ariaLabel, items, onSelectTopicArea }) {
	return (
		<div id={listId} className="glossary-topic-area-list glossary-topic-area-list--search" role="listbox" aria-label={ariaLabel}>
			{items.map((item) => (
				<GlossaryTopicAreaButton
					key={item.topicAreaKey}
					item={item}
					role="option"
					isSelected={item.isKeyboardTarget}
					onSelectTopicArea={onSelectTopicArea}
				/>
			))}
		</div>
	);
}

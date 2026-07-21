// src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossaryTopicAreaSearchList.jsx
import GlossaryTopicAreaButton from "./GlossaryTopicAreaButton.jsx";

export default function GlossaryTopicAreaSearchList({ model, actions }) {
	return (
		<div
			id={model.listId}
			className="glossary-topic-area-list glossary-topic-area-list--search"
			role="listbox"
			aria-label={model.ariaLabel}
		>
			{model.items.map((item) => (
				<GlossaryTopicAreaButton
					key={item.topicAreaKey}
					item={item}
					role="option"
					isSelected={item.isKeyboardTarget}
					onSelectTopicArea={actions.onSelectTopicArea}
				/>
			))}
		</div>
	);
}

// src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossaryTopicAreaSearchList.jsx
import GlossaryTopicAreaButton from "./GlossaryTopicAreaButton.jsx";

export default function GlossaryTopicAreaSearchList({ listId, ariaLabel, allTopicAreaListItem, items, onSelectTopicArea }) {
	return (
		<div
			id={listId}
			className="glossary-topic-area-list glossary-topic-area-list--search"
			role="listbox"
			aria-label={ariaLabel}
			aria-multiselectable="true"
		>
			<GlossaryTopicAreaButton
				item={allTopicAreaListItem}
				usesOptionSemantics={true}
				onSelectTopicArea={onSelectTopicArea}
			/>
			{items.map((item) => (
				<GlossaryTopicAreaButton
					key={item.topicAreaKey}
					item={item}
					usesOptionSemantics={true}
					onSelectTopicArea={onSelectTopicArea}
				/>
			))}
		</div>
	);
}

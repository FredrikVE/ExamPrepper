// src/ui/view/components/GlossaryPage/TopicAreaPanel/TopicAreaPanel.jsx
import ToggleButtonRow from "../../ToggleButtonRow/ToggleButtonRow.jsx";
import GlossarySearchField from "./GlossarySearchField.jsx";
import GlossaryTopicAreaSearchList from "./GlossaryTopicAreaSearchList.jsx";
import TopicAreaListItem from "./TopicAreaListItem.jsx";

const TOPIC_AREA_LIST_ID = "glossary-topic-area-list";

export default function TopicAreaPanel(props) {
	const activeTopicAreaKey = resolveActiveTopicAreaKey(props.topicAreaListItems);
	const toggleEntries = createTopicAreaToggleEntries(props.topicAreaListItems);

	return (
		<aside className="glossary-topic-area-panel" aria-label={props.searchPlaceholder}>
			<GlossarySearchField
				searchTerm={props.searchTerm}
				searchPlaceholder={props.searchPlaceholder}
				searchClearLabel={props.searchClearLabel}
				searchKeyboardHint={props.searchKeyboardHint}
				searchSummaryLabel={props.searchSummaryLabel}
				isSearching={props.isSearching}
				isSearchComboboxActive={props.isSearchComboboxActive}
				searchActiveDescendantId={props.searchActiveDescendantId}
				controlledListId={TOPIC_AREA_LIST_ID}
				onSearchTermChange={props.onSearchTermChange}
				onClearSearch={props.onClearSearch}
				onMoveSearchSelectionDown={props.onMoveSearchSelectionDown}
				onMoveSearchSelectionUp={props.onMoveSearchSelectionUp}
				onOpenSearchKeyboardSelection={props.onOpenSearchKeyboardSelection}
			/>

			{props.isSearching ? (
				<GlossaryTopicAreaSearchList
					topicAreaListItems={props.topicAreaListItems}
					listId={TOPIC_AREA_LIST_ID}
					ariaLabel={props.navigationLabel}
					onSelectTopicArea={props.onSelectTopicArea}
				/>
			) : (
				<nav className="glossary-topic-area-navigation" aria-label={props.navigationLabel}>
					<ToggleButtonRow
						entries={toggleEntries}
						activeEntryId={activeTopicAreaKey}
						onSelectEntry={props.onSelectTopicArea}
						ariaLabel={props.navigationLabel}
					/>
				</nav>
			)}
		</aside>
	);
}

const createTopicAreaToggleEntries = (topicAreaListItems) => {
	const toggleEntries = [];

	for (const item of topicAreaListItems) {
		toggleEntries.push({
			id: item.topicAreaKey,
			label: <TopicAreaListItem item={item} />,
			isDisabled: false
		});
	}

	return toggleEntries;
};

const resolveActiveTopicAreaKey = (topicAreaListItems) => {
	for (const item of topicAreaListItems) {
		if (item.isActive) {
			return item.topicAreaKey;
		}
	}

	return null;
};

// src/ui/view/components/GlossaryPage/TopicAreaPanel/TopicAreaPanel.jsx
import ToggleButtonRow from "../../ToggleButtonRow/ToggleButtonRow.jsx";
import GlossarySearchField from "./GlossarySearchField.jsx";
import TopicAreaListItem from "./TopicAreaListItem.jsx";

const TOPIC_AREA_LIST_ID = "glossary-topic-area-list";

export default function TopicAreaPanel(props) {
	const toggleEntries = props.topicAreaListItems.map((item) => ({
		...item,
		id: item.topicAreaKey,
		elementId: item.id
	}));

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

			<nav className="glossary-topic-area-navigation" aria-label={props.navigationLabel}>
				<ToggleButtonRow
					entries={toggleEntries}
					activeEntryId={props.topicAreaListItems.find((item) => item.isActive)?.topicAreaKey ?? null}
					onSelectEntry={props.onSelectTopicArea}
					ariaLabel={props.navigationLabel}
					className="glossary-topic-area-list"
					containerId={TOPIC_AREA_LIST_ID}
					semanticMode={props.isSearchComboboxActive ? "listbox" : "navigation"}
					renderEntry={(item) => <TopicAreaListItem item={item} />}
				/>
			</nav>
		</aside>
	);
}

// src/ui/view/components/GlossaryPage/TopicAreaPanel/TopicAreaPanel.jsx
import GlossarySearchField from "./GlossarySearchField.jsx";
import TopicAreaListItem from "./TopicAreaListItem.jsx";

const TOPIC_AREA_LIST_ID = "glossary-topic-area-list";

export default function TopicAreaPanel(props) {
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
				<div
					id={TOPIC_AREA_LIST_ID}
					className="glossary-topic-area-list"
					role={props.isSearchComboboxActive ? "listbox" : undefined}
				>
					{props.topicAreaListItems.map((topicAreaListItem) => (
						<TopicAreaListItem
							key={topicAreaListItem.topicAreaKey}
							item={topicAreaListItem}
							usesOptionSemantics={props.isSearchComboboxActive}
							onSelect={props.onSelectTopicArea}
						/>
					))}
				</div>
			</nav>
		</aside>
	);
}

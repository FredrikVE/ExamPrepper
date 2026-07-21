// src/ui/view/components/GlossaryPage/TopicAreaPanel/TopicAreaPanel.jsx
import GlossarySearchField from "./GlossarySearchField.jsx";
import GlossaryTopicAreaNavigationList from "./GlossaryTopicAreaNavigationList.jsx";
import GlossaryTopicAreaSearchList from "./GlossaryTopicAreaSearchList.jsx";

export default function TopicAreaPanel({
	searchTerm,
	searchPlaceholder,
	searchClearLabel,
	searchKeyboardHint,
	searchSummaryLabel,
	isSearching,
	isSearchComboboxActive,
	searchActiveDescendantId,
	topicAreaListId,
	topicAreaListItems,
	activeTopicAreaKey,
	topicAreaListAriaLabel,
	onSearchTermChange,
	onClearSearch,
	onMoveSearchSelectionDown,
	onMoveSearchSelectionUp,
	onOpenSearchKeyboardSelection,
	onSelectTopicArea
}) {
	return (
		<aside className="glossary-topic-area-panel" aria-label={searchPlaceholder}>
			<GlossarySearchField
				searchTerm={searchTerm}
				searchPlaceholder={searchPlaceholder}
				searchClearLabel={searchClearLabel}
				searchKeyboardHint={searchKeyboardHint}
				searchSummaryLabel={searchSummaryLabel}
				isSearching={isSearching}
				isSearchComboboxActive={isSearchComboboxActive}
				searchActiveDescendantId={searchActiveDescendantId}
				topicAreaListId={topicAreaListId}
				onSearchTermChange={onSearchTermChange}
				onClearSearch={onClearSearch}
				onMoveSearchSelectionDown={onMoveSearchSelectionDown}
				onMoveSearchSelectionUp={onMoveSearchSelectionUp}
				onOpenSearchKeyboardSelection={onOpenSearchKeyboardSelection}
			/>

			{isSearching ? (
				<GlossaryTopicAreaSearchList
					listId={topicAreaListId}
					ariaLabel={topicAreaListAriaLabel}
					items={topicAreaListItems}
					onSelectTopicArea={onSelectTopicArea}
				/>
			) : (
				<GlossaryTopicAreaNavigationList
					ariaLabel={topicAreaListAriaLabel}
					items={topicAreaListItems}
					activeTopicAreaKey={activeTopicAreaKey}
					onSelectTopicArea={onSelectTopicArea}
				/>
			)}
		</aside>
	);
}

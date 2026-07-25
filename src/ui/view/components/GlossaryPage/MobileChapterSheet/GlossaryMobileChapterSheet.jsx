// src/ui/view/components/GlossaryPage/MobileChapterSheet/GlossaryMobileChapterSheet.jsx
import { useState } from "react";
import DockedMobileBottomSheet from "../../MobileBottomSheet/DockedMobileBottomSheet.jsx";
import SearchSheetBody from "../../Search/SearchSheetBody.jsx";
import GlossarySearchField from "../TopicAreaPanel/GlossarySearchField.jsx";
import GlossaryTopicAreaNavigationList from "../TopicAreaPanel/GlossaryTopicAreaNavigationList.jsx";

export default function GlossaryMobileChapterSheet(props) {
	const [isOpen, setIsOpen] = useState(false);
	const hasSearchContent = props.isSearchFilterOptionsOpen
		? props.chapterFilterOptions.length > 0
		: props.autocompleteSuggestions.length > 0;
	const searchContent = props.isSearchPopupOpen && hasSearchContent ? (
		<SearchSheetBody
			isFilterOptionsMode={props.isSearchFilterOptionsOpen}
			searchSuggestions={props.autocompleteSuggestions}
			suggestionListId={props.autocompleteListId}
			suggestionListAriaLabel={props.searchSuggestionListAriaLabel}
			activeSuggestionId={props.searchActiveDescendantId}
			filterOptions={props.chapterFilterOptions}
			selectedFilterValue={props.chapterFilterValue}
			onSelectSearchSuggestion={props.onSelectSearchSuggestion}
			onSelectFilterOption={props.onSelectFilterOption}
		/>
	) : null;
	const peekContent = (
		<div className="glossary-mobile-chapter-sheet__search">
			<GlossarySearchField
				searchTerm={props.searchTerm}
				searchPlaceholder={props.searchPlaceholder}
				searchLabel={props.searchLabel}
				searchClearLabel={props.searchClearLabel}
				searchKeyboardHint={props.searchKeyboardHint}
				searchSummaryLabel={props.searchSummaryLabel}
				chapterFilterLabel={props.chapterFilterLabel}
				searchFilterAriaLabel={props.searchFilterAriaLabel}
				isSearchFilterOptionsOpen={props.isSearchFilterOptionsOpen}
				isSearching={props.isSearching}
				isSearchPopupOpen={props.isSearchPopupOpen}
				isSearchAutocompleteActive={props.isSearchAutocompleteActive}
				searchActiveDescendantId={props.searchActiveDescendantId}
				autocompleteListId={props.autocompleteListId}
				onSearchTermChange={props.onSearchTermChange}
				onFocusSearch={props.onFocusSearch}
				onClearSearch={props.onClearSearch}
				onRequestClose={props.onRequestClose}
				onOpenFilterOptions={props.onOpenFilterOptions}
				onMoveSearchSelectionDown={props.onMoveSearchSelectionDown}
				onMoveSearchSelectionUp={props.onMoveSearchSelectionUp}
				onOpenSearchKeyboardSelection={props.onOpenSearchKeyboardSelection}
			/>
		</div>
	);
	const dockedOverlayContent = isOpen ? null : searchContent;
	const expandedContent = isOpen && searchContent !== null ? (
		<div className="glossary-mobile-chapter-sheet__body">
			{searchContent}
		</div>
	) : (
		<div className="glossary-mobile-chapter-sheet__body">
			<GlossaryTopicAreaNavigationList
				ariaLabel={props.topicAreaListAriaLabel}
				allTopicAreaListItem={props.allTopicAreaListItem}
				items={props.topicAreaListItems}
				onSelectTopicArea={props.onSelectTopicArea}
			/>
		</div>
	);

	return (
		<div className="glossary-mobile-chapter-sheet" data-open={isOpen ? "true" : "false"}>
			<DockedMobileBottomSheet
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				contentId="glossary-mobile-chapter-sheet"
				title={props.sheetTitle}
				subtitle={props.sheetSubtitle}
				openLabel={props.sheetOpenLabel}
				closeLabel={props.sheetCloseLabel}
				peekLabel={props.sheetTitle}
				peekContent={peekContent}
				dockedOverlayContent={dockedOverlayContent}
				expandedContent={expandedContent}
			/>
		</div>
	);
}

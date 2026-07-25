// src/ui/view/components/GlossaryPage/MobileChapterSheet/GlossaryMobileChapterSheet.jsx
import { useState } from "react";
import DockedMobileBottomSheet from "../../MobileBottomSheet/DockedMobileBottomSheet.jsx";
import SearchSheetBody from "../../Search/SearchSheetBody.jsx";
import SearchFilterField from "../../Search/SearchFilterField.jsx";
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
			<SearchFilterField
				className={null}
				searchTerm={props.searchTerm}
				searchPlaceholder={props.searchPlaceholder}
				searchLabel={props.searchLabel}
				onSearchTermChange={props.onSearchTermChange}
				onFocusSearch={props.onFocusSearch}
				onRequestClose={props.onRequestClose}
				filterButtonLabel={props.chapterFilterLabel}
				filterButtonAriaLabel={props.searchFilterAriaLabel}
				isFilterOptionsOpen={props.isSearchFilterOptionsOpen}
				onOpenFilterOptions={props.onOpenFilterOptions}
				clearAction={props.isSearching ? {
					label: props.searchClearLabel,
					onClear: props.onClearSearch
				} : null}
				autocomplete={{
					isActive: props.isSearchAutocompleteActive,
					isPopupOpen: props.isSearchPopupOpen,
					listId: props.autocompleteListId,
					activeDescendantId: props.searchActiveDescendantId,
					descriptionId: "glossary-mobile-search-meta",
					keyboardHint: isOpen ? props.searchKeyboardHint : null,
					onMoveDown: props.onMoveSearchSelectionDown,
					onMoveUp: props.onMoveSearchSelectionUp,
					onSelectActive: props.onOpenSearchKeyboardSelection
				}}
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

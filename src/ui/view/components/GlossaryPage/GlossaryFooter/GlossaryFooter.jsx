// src/ui/view/components/GlossaryPage/GlossaryFooter/GlossaryFooter.jsx
import Footer from "../../Footer/Footer.jsx";
import SearchFilterField from "../../Search/SearchFilterField.jsx";
import SearchSheetBody from "../../Search/SearchSheetBody.jsx";
import GlossaryMobileChapterSheet from "../MobileChapterSheet/GlossaryMobileChapterSheet.jsx";

export default function GlossaryFooter(props) {
	const hasSearchContent = props.isSearchFilterOptionsOpen
		? props.chapterFilterOptions.length > 0
		: props.autocompleteSuggestions.length > 0;
	const desktopSearchContent = !props.isMobile && props.isSearchPopupOpen && hasSearchContent ? (
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

	return (
		<Footer
			isOpen={!props.isMobile && props.isSearchPopupOpen}
			className="glossary-search-footer"
			openClassName="glossary-search-footer--popup-open"
		>
			{props.isMobile ? (
				<GlossaryMobileChapterSheet
					searchTerm={props.searchTerm}
					searchPlaceholder={props.searchPlaceholder}
					searchLabel={props.searchLabel}
					searchClearLabel={props.searchClearLabel}
					searchKeyboardHint={props.searchKeyboardHint}
					searchSuggestionListAriaLabel={props.searchSuggestionListAriaLabel}
					chapterFilterValue={props.chapterFilterValue}
					chapterFilterLabel={props.chapterFilterLabel}
					searchFilterAriaLabel={props.searchFilterAriaLabel}
					chapterFilterOptions={props.chapterFilterOptions}
					isSearchPopupOpen={props.isSearchPopupOpen}
					isSearchFilterOptionsOpen={props.isSearchFilterOptionsOpen}
					isSearchAutocompleteActive={props.isSearchAutocompleteActive}
					isSearching={props.isSearching}
					autocompleteSuggestions={props.autocompleteSuggestions}
					autocompleteListId={props.autocompleteListId}
					searchActiveDescendantId={props.searchActiveDescendantId}
					allTopicAreaListItem={props.allTopicAreaListItem}
					topicAreaListItems={props.topicAreaListItems}
					topicAreaListAriaLabel={props.topicAreaListAriaLabel}
					sheetTitle={props.sheetTitle}
					sheetSubtitle={props.sheetSubtitle}
					sheetOpenLabel={props.sheetOpenLabel}
					sheetCloseLabel={props.sheetCloseLabel}
					onSearchTermChange={props.onSearchTermChange}
					onFocusSearch={props.onFocusSearch}
					onClearSearch={props.onClearSearch}
					onRequestClose={props.onRequestClose}
					onOpenFilterOptions={props.onOpenFilterOptions}
					onSelectFilterOption={props.onSelectFilterOption}
					onSelectSearchSuggestion={props.onSelectSearchSuggestion}
					onMoveSearchSelectionDown={props.onMoveSearchSelectionDown}
					onMoveSearchSelectionUp={props.onMoveSearchSelectionUp}
					onOpenSearchKeyboardSelection={props.onOpenSearchKeyboardSelection}
					onSelectTopicArea={props.onSelectTopicArea}
				/>
			) : (
				<div className="glossary-search-footer__content">
					{desktopSearchContent}

					<div className="glossary-search-footer__controls">
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
								descriptionId: "glossary-desktop-search-meta",
								keyboardHint: props.searchKeyboardHint,
								onMoveDown: props.onMoveSearchSelectionDown,
								onMoveUp: props.onMoveSearchSelectionUp,
								onSelectActive: props.onOpenSearchKeyboardSelection
							}}
						/>
					</div>
				</div>
			)}
		</Footer>
	);
}

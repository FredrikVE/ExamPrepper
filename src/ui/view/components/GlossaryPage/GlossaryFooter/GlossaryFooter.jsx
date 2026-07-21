// src/ui/view/components/GlossaryPage/GlossaryFooter/GlossaryFooter.jsx
import Footer from "../../Footer/Footer.jsx";
import FilterOptionList from "../../Search/FilterOptionList.jsx";
import GlossaryMobileChapterSheet from "../MobileChapterSheet/GlossaryMobileChapterSheet.jsx";
import GlossarySearchField from "../TopicAreaPanel/GlossarySearchField.jsx";

export default function GlossaryFooter({
	isMobile,
	searchTerm,
	searchPlaceholder,
	searchLabel,
	searchClearLabel,
	searchKeyboardHint,
	searchSummaryLabel,
	searchScope,
	searchScopeLabel,
	searchScopeAriaLabel,
	searchScopeOptions,
	isSearchFilterOptionsOpen,
	isSearching,
	isSearchComboboxActive,
	searchActiveDescendantId,
	topicAreaListId,
	allTopicAreaListItem,
	topicAreaListItems,
	topicAreaListAriaLabel,
	sheetTitle,
	sheetSubtitle,
	sheetOpenLabel,
	sheetCloseLabel,
	onSearchTermChange,
	onFocusSearch,
	onClearSearch,
	onOpenFilterOptions,
	onCloseFilterOptions,
	onSelectFilterOption,
	onMoveSearchSelectionDown,
	onMoveSearchSelectionUp,
	onOpenSearchKeyboardSelection,
	onSelectTopicArea
}) {
	return (
		<Footer
			isOpen={!isMobile && isSearchFilterOptionsOpen}
			className="glossary-search-footer"
			openClassName="glossary-search-footer--filter-open"
		>
			{isMobile ? (
				<GlossaryMobileChapterSheet
					searchTerm={searchTerm}
					searchPlaceholder={searchPlaceholder}
					searchLabel={searchLabel}
					searchClearLabel={searchClearLabel}
					searchKeyboardHint={searchKeyboardHint}
					searchSummaryLabel={searchSummaryLabel}
					searchScope={searchScope}
					searchScopeLabel={searchScopeLabel}
					searchScopeAriaLabel={searchScopeAriaLabel}
					searchScopeOptions={searchScopeOptions}
					isSearchFilterOptionsOpen={isSearchFilterOptionsOpen}
					isSearching={isSearching}
					isSearchComboboxActive={isSearchComboboxActive}
					searchActiveDescendantId={searchActiveDescendantId}
					allTopicAreaListItem={allTopicAreaListItem}
					topicAreaListItems={topicAreaListItems}
					topicAreaListAriaLabel={topicAreaListAriaLabel}
					sheetTitle={sheetTitle}
					sheetSubtitle={sheetSubtitle}
					sheetOpenLabel={sheetOpenLabel}
					sheetCloseLabel={sheetCloseLabel}
					onSearchTermChange={onSearchTermChange}
					onFocusSearch={onFocusSearch}
					onClearSearch={onClearSearch}
					onOpenFilterOptions={onOpenFilterOptions}
					onCloseFilterOptions={onCloseFilterOptions}
					onSelectFilterOption={onSelectFilterOption}
					onMoveSearchSelectionDown={onMoveSearchSelectionDown}
					onMoveSearchSelectionUp={onMoveSearchSelectionUp}
					onOpenSearchKeyboardSelection={onOpenSearchKeyboardSelection}
					onSelectTopicArea={onSelectTopicArea}
				/>
			) : (
				<div className="glossary-search-footer__content">
					{isSearchFilterOptionsOpen ? (
						<FilterOptionList
							filterOptions={searchScopeOptions}
							selectedFilterValue={searchScope}
							onSelectFilterOption={onSelectFilterOption}
						/>
					) : null}

					<div className="glossary-search-footer__controls">
						<GlossarySearchField
							searchTerm={searchTerm}
							searchPlaceholder={searchPlaceholder}
							searchLabel={searchLabel}
							searchClearLabel={searchClearLabel}
							searchKeyboardHint={searchKeyboardHint}
							searchSummaryLabel={searchSummaryLabel}
							searchScopeLabel={searchScopeLabel}
							searchScopeAriaLabel={searchScopeAriaLabel}
							isSearchFilterOptionsOpen={isSearchFilterOptionsOpen}
							isSearching={isSearching}
							isSearchComboboxActive={isSearchComboboxActive}
							searchActiveDescendantId={searchActiveDescendantId}
							topicAreaListId={topicAreaListId}
							onSearchTermChange={onSearchTermChange}
							onFocusSearch={onFocusSearch}
							onClearSearch={onClearSearch}
							onOpenFilterOptions={onOpenFilterOptions}
							onMoveSearchSelectionDown={onMoveSearchSelectionDown}
							onMoveSearchSelectionUp={onMoveSearchSelectionUp}
							onOpenSearchKeyboardSelection={onOpenSearchKeyboardSelection}
						/>
					</div>
				</div>
			)}
		</Footer>
	);
}

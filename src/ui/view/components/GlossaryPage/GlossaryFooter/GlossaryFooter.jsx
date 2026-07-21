// src/ui/view/components/GlossaryPage/GlossaryFooter/GlossaryFooter.jsx
import Footer from "../../Footer/Footer.jsx";
import GlossaryMobileChapterSheet from "../MobileChapterSheet/GlossaryMobileChapterSheet.jsx";
import GlossarySearchField from "../TopicAreaPanel/GlossarySearchField.jsx";

export default function GlossaryFooter({
	isMobile,
	searchTerm,
	searchPlaceholder,
	searchClearLabel,
	searchKeyboardHint,
	searchSummaryLabel,
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
	onClearSearch,
	onMoveSearchSelectionDown,
	onMoveSearchSelectionUp,
	onOpenSearchKeyboardSelection,
	onSelectTopicArea
}) {
	return (
		<Footer isOpen={false} className="glossary-search-footer" openClassName="">
			{isMobile ? (
				<GlossaryMobileChapterSheet
					searchTerm={searchTerm}
					searchPlaceholder={searchPlaceholder}
					searchClearLabel={searchClearLabel}
					searchKeyboardHint={searchKeyboardHint}
					searchSummaryLabel={searchSummaryLabel}
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
					onClearSearch={onClearSearch}
					onMoveSearchSelectionDown={onMoveSearchSelectionDown}
					onMoveSearchSelectionUp={onMoveSearchSelectionUp}
					onOpenSearchKeyboardSelection={onOpenSearchKeyboardSelection}
					onSelectTopicArea={onSelectTopicArea}
				/>
			) : (
				<div className="glossary-search-footer__controls">
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
				</div>
			)}
		</Footer>
	);
}

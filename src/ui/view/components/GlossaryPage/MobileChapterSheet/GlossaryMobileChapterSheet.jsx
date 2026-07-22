// src/ui/view/components/GlossaryPage/MobileChapterSheet/GlossaryMobileChapterSheet.jsx
import { useState } from "react";
import DockedMobileBottomSheet from "../../MobileBottomSheet/DockedMobileBottomSheet.jsx";
import FilterOptionList from "../../Search/FilterOptionList.jsx";
import GlossarySearchField from "../TopicAreaPanel/GlossarySearchField.jsx";
import GlossaryTopicAreaNavigationList from "../TopicAreaPanel/GlossaryTopicAreaNavigationList.jsx";
import GlossaryTopicAreaSearchList from "../TopicAreaPanel/GlossaryTopicAreaSearchList.jsx";

const MOBILE_TOPIC_AREA_LIST_ID = "glossary-mobile-topic-area-list";

export default function GlossaryMobileChapterSheet({
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
	const [isOpen, setIsOpen] = useState(false);

	const openSheet = () => {
		setIsOpen(true);
	};

	const focusSearch = () => {
		setIsOpen(true);
		onFocusSearch();
	};

	const changeSearchTerm = (nextSearchTerm) => {
		setIsOpen(true);
		onSearchTermChange(nextSearchTerm);
	};

	const openFilterOptions = () => {
		setIsOpen(true);
		onOpenFilterOptions();
	};

	const changeSheetOpen = (nextIsOpen) => {
		setIsOpen(nextIsOpen);

		if (!nextIsOpen) {
			onCloseFilterOptions();
		}
	};

	return (
		<div className="glossary-mobile-chapter-sheet">
			<DockedMobileBottomSheet
				isOpen={isOpen}
				onOpenChange={changeSheetOpen}
				contentId="glossary-mobile-chapter-sheet"
				title={sheetTitle}
				subtitle={sheetSubtitle}
				openLabel={sheetOpenLabel}
				closeLabel={sheetCloseLabel}
				peekLabel={sheetTitle}
				popupClassName="glossary-mobile-chapter-sheet__popup"
				contentClassName="glossary-mobile-chapter-sheet__content"
			>
				<div
					className="glossary-mobile-chapter-sheet__search"
					onPointerDownCapture={openSheet}
				>
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
						isSearchComboboxActive={isOpen && !isSearchFilterOptionsOpen && isSearchComboboxActive}
						searchActiveDescendantId={isOpen && !isSearchFilterOptionsOpen ? searchActiveDescendantId : null}
						topicAreaListId={MOBILE_TOPIC_AREA_LIST_ID}
						onSearchTermChange={changeSearchTerm}
						onFocusSearch={focusSearch}
						onClearSearch={onClearSearch}
						onOpenFilterOptions={openFilterOptions}
						onMoveSearchSelectionDown={onMoveSearchSelectionDown}
						onMoveSearchSelectionUp={onMoveSearchSelectionUp}
						onOpenSearchKeyboardSelection={onOpenSearchKeyboardSelection}
					/>
				</div>

				<div className="glossary-mobile-chapter-sheet__body" aria-hidden={!isOpen} inert={!isOpen}>
					{isSearchFilterOptionsOpen ? (
						<FilterOptionList
							filterOptions={searchScopeOptions}
							selectedFilterValue={searchScope}
							onSelectFilterOption={onSelectFilterOption}
						/>
					) : isSearching ? (
						<GlossaryTopicAreaSearchList
							listId={MOBILE_TOPIC_AREA_LIST_ID}
							ariaLabel={topicAreaListAriaLabel}
							allTopicAreaListItem={allTopicAreaListItem}
							items={topicAreaListItems}
							onSelectTopicArea={onSelectTopicArea}
						/>
					) : (
						<GlossaryTopicAreaNavigationList
							ariaLabel={topicAreaListAriaLabel}
							allTopicAreaListItem={allTopicAreaListItem}
							items={topicAreaListItems}
							onSelectTopicArea={onSelectTopicArea}
						/>
					)}
				</div>
			</DockedMobileBottomSheet>
		</div>
	);
}

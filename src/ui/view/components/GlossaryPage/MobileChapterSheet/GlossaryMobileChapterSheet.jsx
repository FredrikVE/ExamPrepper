// src/ui/view/components/GlossaryPage/MobileChapterSheet/GlossaryMobileChapterSheet.jsx
import { useState } from "react";
import DockedMobileBottomSheet from "../../MobileBottomSheet/DockedMobileBottomSheet.jsx";
import FilterOptionList from "../../Search/FilterOptionList.jsx";
import GlossarySearchField from "../TopicAreaPanel/GlossarySearchField.jsx";
import GlossaryTopicAreaNavigationList from "../TopicAreaPanel/GlossaryTopicAreaNavigationList.jsx";
import GlossaryTopicAreaSearchList from "../TopicAreaPanel/GlossaryTopicAreaSearchList.jsx";

const MOBILE_TOPIC_AREA_LIST_ID = "glossary-mobile-topic-area-list";

export default function GlossaryMobileChapterSheet(props) {
	const [isOpen, setIsOpen] = useState(false);

	const openSheet = () => {
		setIsOpen(true);
	};

	const focusSearch = () => {
		setIsOpen(true);
		props.onFocusSearch();
	};

	const changeSearchTerm = (nextSearchTerm) => {
		setIsOpen(true);
		props.onSearchTermChange(nextSearchTerm);
	};

	const openFilterOptions = () => {
		setIsOpen(true);
		props.onOpenFilterOptions();
	};

	const changeSheetOpen = (nextIsOpen) => {
		setIsOpen(nextIsOpen);

		if (!nextIsOpen) {
			props.onCloseFilterOptions();
		}
	};

	const peekContent = (
		<div className="glossary-mobile-chapter-sheet__search" onPointerDownCapture={openSheet}>
			<GlossarySearchField
				searchTerm={props.searchTerm}
				searchPlaceholder={props.searchPlaceholder}
				searchLabel={props.searchLabel}
				searchClearLabel={props.searchClearLabel}
				searchKeyboardHint={props.searchKeyboardHint}
				searchSummaryLabel={props.searchSummaryLabel}
				searchScopeLabel={props.searchScopeLabel}
				searchScopeAriaLabel={props.searchScopeAriaLabel}
				isSearchFilterOptionsOpen={props.isSearchFilterOptionsOpen}
				isSearching={props.isSearching}
				isSearchComboboxActive={isOpen && !props.isSearchFilterOptionsOpen && props.isSearchComboboxActive}
				searchActiveDescendantId={isOpen && !props.isSearchFilterOptionsOpen ? props.searchActiveDescendantId : null}
				topicAreaListId={MOBILE_TOPIC_AREA_LIST_ID}
				onSearchTermChange={changeSearchTerm}
				onFocusSearch={focusSearch}
				onClearSearch={props.onClearSearch}
				onOpenFilterOptions={openFilterOptions}
				onMoveSearchSelectionDown={props.onMoveSearchSelectionDown}
				onMoveSearchSelectionUp={props.onMoveSearchSelectionUp}
				onOpenSearchKeyboardSelection={props.onOpenSearchKeyboardSelection}
			/>
		</div>
	);
	const expandedContent = (
		<div className="glossary-mobile-chapter-sheet__body">
			{props.isSearchFilterOptionsOpen ? (
				<FilterOptionList
					filterOptions={props.searchScopeOptions}
					selectedFilterValue={props.searchScope}
					onSelectFilterOption={props.onSelectFilterOption}
				/>
			) : props.isSearching ? (
				<GlossaryTopicAreaSearchList
					listId={MOBILE_TOPIC_AREA_LIST_ID}
					ariaLabel={props.topicAreaListAriaLabel}
					allTopicAreaListItem={props.allTopicAreaListItem}
					items={props.topicAreaListItems}
					onSelectTopicArea={props.onSelectTopicArea}
				/>
			) : (
				<GlossaryTopicAreaNavigationList
					ariaLabel={props.topicAreaListAriaLabel}
					allTopicAreaListItem={props.allTopicAreaListItem}
					items={props.topicAreaListItems}
					onSelectTopicArea={props.onSelectTopicArea}
				/>
			)}
		</div>
	);

	return (
		<div className="glossary-mobile-chapter-sheet" data-open={isOpen ? "true" : "false"}>
			<DockedMobileBottomSheet
				isOpen={isOpen}
				onOpenChange={changeSheetOpen}
				contentId="glossary-mobile-chapter-sheet"
				title={props.sheetTitle}
				subtitle={props.sheetSubtitle}
				openLabel={props.sheetOpenLabel}
				closeLabel={props.sheetCloseLabel}
				peekLabel={props.sheetTitle}
				peekContent={peekContent}
				expandedContent={expandedContent}
			/>
		</div>
	);
}

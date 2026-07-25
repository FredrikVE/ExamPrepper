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
	const searchResults = props.isSearchFilterOptionsOpen ? (
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
				searchScopeLabel={props.searchScopeLabel}
				searchScopeAriaLabel={props.searchScopeAriaLabel}
				isSearchFilterOptionsOpen={props.isSearchFilterOptionsOpen}
				isSearching={props.isSearching}
				isSearchComboboxActive={!props.isSearchFilterOptionsOpen && props.isSearchComboboxActive}
				searchActiveDescendantId={!props.isSearchFilterOptionsOpen ? props.searchActiveDescendantId : null}
				topicAreaListId={!props.isSearchFilterOptionsOpen ? MOBILE_TOPIC_AREA_LIST_ID : null}
				onSearchTermChange={props.onSearchTermChange}
				onFocusSearch={props.onFocusSearch}
				onClearSearch={props.onClearSearch}
				onOpenFilterOptions={props.onOpenFilterOptions}
				onMoveSearchSelectionDown={props.onMoveSearchSelectionDown}
				onMoveSearchSelectionUp={props.onMoveSearchSelectionUp}
				onOpenSearchKeyboardSelection={props.onOpenSearchKeyboardSelection}
			/>
		</div>
	);
	const dockedOverlayContent = isOpen ? null : searchResults;
	const expandedContent = isOpen && searchResults !== null ? (
		<div className="glossary-mobile-chapter-sheet__body">
			{searchResults}
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

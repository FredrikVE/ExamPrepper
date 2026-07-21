// src/ui/view/components/GlossaryPage/MobileChapterSheet/GlossaryMobileChapterSheet.jsx
import { useState } from "react";
import DockedMobileBottomSheet from "../../MobileBottomSheet/DockedMobileBottomSheet.jsx";
import GlossarySearchField from "../TopicAreaPanel/GlossarySearchField.jsx";
import GlossaryTopicAreaNavigationList from "../TopicAreaPanel/GlossaryTopicAreaNavigationList.jsx";
import GlossaryTopicAreaSearchList from "../TopicAreaPanel/GlossaryTopicAreaSearchList.jsx";

const MOBILE_TOPIC_AREA_LIST_ID = "glossary-mobile-topic-area-list";

export default function GlossaryMobileChapterSheet({
	searchTerm,
	searchPlaceholder,
	searchClearLabel,
	searchKeyboardHint,
	searchSummaryLabel,
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
	onClearSearch,
	onMoveSearchSelectionDown,
	onMoveSearchSelectionUp,
	onOpenSearchKeyboardSelection,
	onSelectTopicArea
}) {
	const [isOpen, setIsOpen] = useState(false);

	const openSheet = () => {
		setIsOpen(true);
	};

	const changeSearchTerm = (nextSearchTerm) => {
		setIsOpen(true);
		onSearchTermChange(nextSearchTerm);
	};

	return (
		<div className="glossary-mobile-chapter-sheet">
			<DockedMobileBottomSheet
				isOpen={isOpen}
				onOpenChange={setIsOpen}
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
					onFocusCapture={openSheet}
					onPointerDownCapture={openSheet}
				>
					<GlossarySearchField
						searchTerm={searchTerm}
						searchPlaceholder={searchPlaceholder}
						searchClearLabel={searchClearLabel}
						searchKeyboardHint={searchKeyboardHint}
						searchSummaryLabel={searchSummaryLabel}
						isSearching={isSearching}
						isSearchComboboxActive={isOpen && isSearchComboboxActive}
						searchActiveDescendantId={isOpen ? searchActiveDescendantId : null}
						topicAreaListId={MOBILE_TOPIC_AREA_LIST_ID}
						onSearchTermChange={changeSearchTerm}
						onClearSearch={onClearSearch}
						onMoveSearchSelectionDown={onMoveSearchSelectionDown}
						onMoveSearchSelectionUp={onMoveSearchSelectionUp}
						onOpenSearchKeyboardSelection={onOpenSearchKeyboardSelection}
					/>
				</div>

				<div className="glossary-mobile-chapter-sheet__body" aria-hidden={!isOpen} inert={!isOpen}>
					{isSearching ? (
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

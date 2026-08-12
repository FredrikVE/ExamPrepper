// src/ui/view/components/GlossaryPage/MobileChapterSheet/GlossaryMobileChapterSheet.jsx
import DockedMobileBottomSheet from "../../MobileBottomSheet/DockedMobileBottomSheet.jsx";
import GlossarySearchPanel, { GlossarySearchPopup } from "../GlossarySearchPanel.jsx";
import GlossaryTopicAreaNavigationList from "../TopicAreaPanel/GlossaryTopicAreaNavigationList.jsx";

export default function GlossaryMobileChapterSheet({ isOpen, onOpenChange, search, searchKeyboardHint, allTopicAreaListItem, topicAreaListItems, topicAreaListAriaLabel, sheetTitle, sheetSubtitle, sheetOpenLabel, sheetCloseLabel }) {
	const searchContent = search.hasPopupContent ? <GlossarySearchPopup search={search} /> : null;
	const peekContent = (
		<div className="glossary-mobile-chapter-sheet__search">
			<GlossarySearchPanel search={search} descriptionId="glossary-mobile-search-meta" keyboardHint={searchKeyboardHint} />
		</div>
	);
	const dockedOverlayContent = isOpen ? null : searchContent;
	const expandedContent = isOpen && searchContent !== null ? (
		<div className="glossary-mobile-chapter-sheet__body">{searchContent}</div>
	) : (
		<div className="glossary-mobile-chapter-sheet__body">
			<GlossaryTopicAreaNavigationList ariaLabel={topicAreaListAriaLabel} allTopicAreaListItem={allTopicAreaListItem} items={topicAreaListItems} />
		</div>
	);

	return (
		<div className="glossary-mobile-chapter-sheet" data-open={isOpen ? "true" : "false"}>
			<DockedMobileBottomSheet isOpen={isOpen} onOpenChange={onOpenChange} contentId="glossary-mobile-chapter-sheet" title={sheetTitle} subtitle={sheetSubtitle} openLabel={sheetOpenLabel} closeLabel={sheetCloseLabel} peekLabel={sheetTitle} peekContent={peekContent} dockedOverlayContent={dockedOverlayContent} expandedContent={expandedContent} />
		</div>
	);
}

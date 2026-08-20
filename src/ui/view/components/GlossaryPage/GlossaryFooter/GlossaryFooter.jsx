// src/ui/view/components/GlossaryPage/GlossaryFooter/GlossaryFooter.jsx
import Footer from "../../Footer/Footer.jsx";
import GlossarySearchPanel, { GlossarySearchPopup } from "../GlossarySearchPanel.jsx";
import GlossaryMobileChapterSheet from "../MobileChapterSheet/GlossaryMobileChapterSheet.jsx";

export default function GlossaryFooter({ usesCompactShell, search, mobileSearchKeyboardHint, allTopicAreaListItem, topicAreaListItems, topicAreaListAriaLabel, sheetTitle, sheetSubtitle, sheetOpenLabel, sheetCloseLabel, isMobileChapterSheetOpen, onMobileChapterSheetOpenChange }) {
	return (
		<Footer isOpen={!usesCompactShell && search.isPopupOpen} className="glossary-search-footer" openClassName="glossary-search-footer--popup-open">
			{usesCompactShell ? (
				<GlossaryMobileChapterSheet
					isOpen={isMobileChapterSheetOpen}
					onOpenChange={onMobileChapterSheetOpenChange}
					search={search}
					searchKeyboardHint={mobileSearchKeyboardHint}
					allTopicAreaListItem={allTopicAreaListItem}
					topicAreaListItems={topicAreaListItems}
					topicAreaListAriaLabel={topicAreaListAriaLabel}
					sheetTitle={sheetTitle}
					sheetSubtitle={sheetSubtitle}
					sheetOpenLabel={sheetOpenLabel}
					sheetCloseLabel={sheetCloseLabel}
				/>
			) : (
				<div className="glossary-search-footer__content">
					<GlossarySearchPopup search={search} />
					<div className="glossary-search-footer__controls">
						<GlossarySearchPanel search={search} descriptionId="glossary-desktop-search-meta" keyboardHint={search.keyboardHint} />
					</div>
				</div>
			)}
		</Footer>
	);
}

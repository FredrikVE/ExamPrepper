// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardsMobileFooterSheet.jsx
import { useCallback, useState } from "react";
import MobileBottomSheet from "../../MobileBottomSheet/MobileBottomSheet.jsx";
import ProgressPager from "../../ProgressPager/ProgressPager.jsx";
import MobileFlipcardDeckToolGrid from "./MobileFlipcardDeckToolGrid.jsx";

// Flipcards bruker samme dokkede MobileBottomSheet som select-sidene. Den delte
// ProgressPageren er peeken, verktøyrutenettet avdekkes først når arket utvides.
export default function FlipcardsMobileFooterSheet(props) {
	const [isOpen, setIsOpen] = useState(false);

	const changeSheetOpen = useCallback((nextIsOpen) => {
		setIsOpen(nextIsOpen);
	}, []);

	const selectDeckTool = useCallback((deckToolKey) => {
		props.onDeckToolSelect(deckToolKey);
		setIsOpen(false);
	}, [props.onDeckToolSelect]);

	return (
		<div className="flipcards-footer-sheet" data-open={isOpen ? "true" : "false"}>
			<MobileBottomSheet
				isOpen={isOpen}
				onOpenChange={changeSheetOpen}
				finalFocusRef={null}
				contentId="flipcards-mobile-bottom-sheet"
				title={props.labels.toolMenuTitle}
				subtitle={props.labels.toolMenuSubtitle}
				openLabel={props.labels.openToolMenuLabel}
				closeLabel={props.labels.closeToolMenuLabel}
				peekLabel={props.labels.toolMenuLabel}
				hasPeek={true}
				popupClassName=""
				contentClassName="flipcards-mobile-bottom-sheet-content"
			>
				<ProgressPager
					className="flipcards-progress-pager flipcards-progress-pager-mobile"
					containerClassName="flipcards-progress-pager-container"
					ariaLabel={props.labels.toolMenuPagerLabel}
					previousLabel={props.labels.previousCardLabel}
					previousDisabled={!props.hasPrevious || props.isSwipeCommandActive}
					previousButtonClassName="flipcards-progress-pager-button"
					onPrevious={props.onPrevious}
					entries={props.progressEntries}
					compactEntries={props.progressEntries}
					minimalCompactEntries={props.progressEntries}
					shouldUseCompactDots={props.progressEntries.length > 9}
					shouldUseResponsiveCompactDots={true}
					submitted={false}
					onSelectEntry={props.onGoToCard}
					dotsLabel={props.labels.toolMenuPagerLabel}
					goToEntryLabel={props.labels.goToCardLabel}
					counterLabel={props.progressLabel}
					counterClassName="flipcards-progress-pager-counter"
					counterLabelClassName="flipcards-progress-pager-label"
					nextLabel={props.labels.nextCardLabel}
					nextDisabled={!props.hasNext || props.isSwipeCommandActive}
					nextButtonClassName="flipcards-progress-pager-button"
					onNext={props.onNext}
					hasActionButton={false}
					actionButton={null}
				/>

				{isOpen && (
					<MobileFlipcardDeckToolGrid
						labels={props.labels}
						deckToolItems={props.deckToolItems}
						onDeckToolSelect={selectDeckTool}
					/>
				)}
			</MobileBottomSheet>
		</div>
	);
}

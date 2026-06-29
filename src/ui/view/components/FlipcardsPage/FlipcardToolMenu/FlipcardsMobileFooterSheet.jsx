// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardsMobileFooterSheet.jsx
import { useCallback, useState } from "react";
import MobileBottomSheet from "../../MobileBottomSheet/MobileBottomSheet.jsx";
import FlipcardsProgressPager from "../FlipcardsProgressPager.jsx";
import MobileFlipcardDeckToolGrid from "./MobileFlipcardDeckToolGrid.jsx";

// Flipcards bruker samme dokkede MobileBottomSheet som select-sidene. Pageren er
// peeken (synlig i kollapset tilstand), verktøyrutenettet avdekkes når arket
// utvides. Samme overflate på to høyder — ikke en peek + en egen modal popup.
export default function FlipcardsMobileFooterSheet({
	cardCount,
	activeIndex,
	hasPrevious,
	hasNext,
	isSwipeCommandActive,
	deckToolItems,
	labels,
	onPrevious,
	onNext,
	onGoToCard,
	onDeckToolSelect
}) {
	const [isOpen, setIsOpen] = useState(false);

	const selectDeckTool = useCallback((deckToolKey) => {
		onDeckToolSelect(deckToolKey);
		setIsOpen(false);
	}, [onDeckToolSelect]);

	return (
		<div className="flipcards-footer-sheet">
			<MobileBottomSheet
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				finalFocusRef={null}
				contentId="flipcards-mobile-bottom-sheet"
				title={labels.toolMenuTitle}
				subtitle={labels.toolMenuSubtitle}
				openLabel={labels.openToolMenuLabel}
				closeLabel={labels.closeToolMenuLabel}
				peekLabel={labels.toolMenuLabel}
				hasPeek={true}
				popupClassName=""
				contentClassName="flipcards-mobile-bottom-sheet-content"
			>
				<FlipcardsProgressPager
					cardCount={cardCount}
					activeIndex={activeIndex}
					hasPrevious={hasPrevious}
					hasNext={hasNext}
					isSwipeCommandActive={isSwipeCommandActive}
					labels={labels}
					className="flipcards-progress-pager-mobile"
					onPrevious={onPrevious}
					onNext={onNext}
					onGoToCard={onGoToCard}
				/>

				<MobileFlipcardDeckToolGrid
					labels={labels}
					deckToolItems={deckToolItems}
					onDeckToolSelect={selectDeckTool}
				/>
			</MobileBottomSheet>
		</div>
	);
}

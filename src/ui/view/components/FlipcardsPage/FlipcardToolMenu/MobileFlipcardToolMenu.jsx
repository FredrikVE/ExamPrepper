// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/MobileFlipcardToolMenu.jsx
import { useRef } from "react";
import MobileFlipcardBottomSheet from "./MobileFlipcardBottomSheet.jsx";
import MobileFlipcardCollapsedToolbar from "./MobileFlipcardCollapsedToolbar.jsx";

export default function MobileFlipcardToolMenu(props) {
    const expandButtonRef = useRef(null);

    return (
        <>
            <MobileFlipcardCollapsedToolbar
                expandButtonRef={expandButtonRef}
                isExpanded={props.isExpanded}
                onOpenExpandedMenu={props.onOpenExpandedMenu}
                cardCount={props.cardCount}
                activeIndex={props.activeIndex}
                hasPrevious={props.hasPrevious}
                hasNext={props.hasNext}
                isSwipeCommandActive={props.isSwipeCommandActive}
                labels={props.labels}
                onPrevious={props.onPrevious}
                onNext={props.onNext}
                onGoToCard={props.onGoToCard}
            />

            <MobileFlipcardBottomSheet
                isOpen={props.isExpanded}
                onOpenChange={props.onExpandedChange}
                finalFocusRef={expandButtonRef}
                cardCount={props.cardCount}
                activeIndex={props.activeIndex}
                hasPrevious={props.hasPrevious}
                hasNext={props.hasNext}
                isSwipeCommandActive={props.isSwipeCommandActive}
                labels={props.labels}
                deckToolItems={props.deckToolItems}
                onPrevious={props.onPrevious}
                onNext={props.onNext}
                onGoToCard={props.onGoToCard}
                onDeckToolSelect={props.onDeckToolSelect}
            />
        </>
    );
}

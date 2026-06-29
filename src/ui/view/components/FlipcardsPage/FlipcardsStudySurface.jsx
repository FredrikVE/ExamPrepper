// src/ui/view/components/FlipcardsPage/FlipcardsStudySurface.jsx
import { useEffect, useRef, useState } from "react";
import { PRESENTATION_MODE } from "../../../presentation/presentationMode.js";
import { useFlipcardDeck } from "./FlipcardDeck/useFlipcardDeck.js";
import FlipcardDeck from "./FlipcardDeck/FlipcardDeck.jsx";
import FlipcardsProgressPager from "./FlipcardsProgressPager.jsx";
import MobileFlipcardsFooter from "./MobileFlipcardsFooter.jsx";
import FlipcardToolMenu from "./FlipcardToolMenu/FlipcardToolMenu.jsx";
import useFlipcardToolMenu from "./FlipcardToolMenu/useFlipcardToolMenu.js";

export default function FlipcardsStudySurface(props) {
    const [isDesktopToolsPanelOpen, setIsDesktopToolsPanelOpen] = useState(false);
    const mobileToolsTriggerRef = useRef(null);
    const presentationMode = props.presentationMode;
    const {
        isDesktopMenuOpen,
        closeDesktopMenu,
        setDesktopMenuOpen,
        isMobileSheetOpen,
        openMobileSheet,
        closeMobileSheet,
        setMobileSheetOpen
    } = useFlipcardToolMenu();

    const deck = useFlipcardDeck(props.cards.length, props.visibleDeckKey);
    const activeCard = props.cards[deck.activeIndex] ?? null;

    useEffect(() => {
        if (presentationMode !== PRESENTATION_MODE.DESKTOP) {
            closeDesktopMenu();
        }

        if (presentationMode !== PRESENTATION_MODE.MOBILE) {
            closeMobileSheet();
        }
    }, [closeDesktopMenu, closeMobileSheet, presentationMode]);

    useEffect(() => {
        setIsDesktopToolsPanelOpen(presentationMode === PRESENTATION_MODE.DESKTOP && isDesktopMenuOpen);
    }, [isDesktopMenuOpen, presentationMode]);

    const restartSession = () => {
        props.onResetProgress();
        deck.restartDeck();
    };

    const selectDeckTool = (deckToolKey) => {
        props.onSelectDeckTool(deckToolKey);
        deck.restartDeck();
    };

    const completeAsMastered = () => {
        if (!activeCard) {
            return;
        }

        props.onCardMastered(activeCard.id);
        deck.goToNext();
    };

    const completeForPractice = () => {
        if (!activeCard) {
            return;
        }

        props.onCardForPractice(activeCard.id);
        deck.goToNext();
    };

    const studySurfaceClassName = isDesktopToolsPanelOpen
        ? "flipcards-study-surface flipcards-study-surface-desktop-tools-open"
        : "flipcards-study-surface";

    const progressPager = (
        <FlipcardsProgressPager
            cardCount={props.cards.length}
            activeIndex={deck.activeIndex}
            hasPrevious={deck.hasPrevious}
            hasNext={deck.hasNext}
            isSwipeCommandActive={deck.isSwipeCommandActive}
            labels={props.labels}
            className="flipcards-progress-pager-deck"
            onPrevious={deck.goToPrevious}
            onNext={deck.goToNext}
            onGoToCard={deck.goToCard}
        />
    );

    return (
        <section className={studySurfaceClassName} aria-label={props.labels.studySurfaceLabel}>
            <div className="flipcards-study-body">
                <FlipcardDeck
                    cards={props.cards}
                    deck={deck}
                    labels={props.labels}
                    progressModel={props.progressModel}
                    footerPager={progressPager}
                    onPractice={completeForPractice}
                    onMastered={completeAsMastered}
                    onRestart={restartSession}
                />

                <FlipcardToolMenu
                    presentationMode={presentationMode}
                    isDesktopMenuOpen={isDesktopMenuOpen}
                    onDesktopMenuOpenChange={setDesktopMenuOpen}
                    isMobileSheetOpen={isMobileSheetOpen}
                    onMobileSheetOpenChange={setMobileSheetOpen}
                    mobileSheetFinalFocusRef={mobileToolsTriggerRef}
                    labels={props.labels}
                    deckToolItems={props.deckToolItems}
                    onDeckToolSelect={selectDeckTool}
                />
            </div>

            <MobileFlipcardsFooter
                expandButtonRef={mobileToolsTriggerRef}
                isExpanded={isMobileSheetOpen}
                onOpenExpandedMenu={openMobileSheet}
                cardCount={props.cards.length}
                activeIndex={deck.activeIndex}
                hasPrevious={deck.hasPrevious}
                hasNext={deck.hasNext}
                isSwipeCommandActive={deck.isSwipeCommandActive}
                labels={props.labels}
                onPrevious={deck.goToPrevious}
                onNext={deck.goToNext}
                onGoToCard={deck.goToCard}
            />
        </section>
    );
}

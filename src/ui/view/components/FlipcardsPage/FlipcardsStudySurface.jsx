// src/ui/view/components/FlipcardsPage/FlipcardsStudySurface.jsx
import { useCallback, useEffect, useState } from "react";
import { PRESENTATION_MODE } from "../../../presentation/presentationMode.js";
import { useFlipcardDeck } from "./FlipcardDeck/useFlipcardDeck.js";
import FlipcardDeck from "./FlipcardDeck/FlipcardDeck.jsx";
import FlipcardToolMenu from "./FlipcardToolMenu/FlipcardToolMenu.jsx";
import FlipcardsMobileFooterSheet from "./FlipcardToolMenu/FlipcardsMobileFooterSheet.jsx";
import useFlipcardToolMenu from "./FlipcardToolMenu/useFlipcardToolMenu.js";
import ProgressPager from "../ProgressPager/ProgressPager.jsx";
import createProgressPagerEntries from "../ProgressPager/createProgressPagerEntries.js";
import shouldHandleFlipcardKeyboardShortcut from "./FlipcardDeck/shouldHandleFlipcardKeyboardShortcut.js";

const resolveFlipcardProgressCorrectness = () => false;

export default function FlipcardsStudySurface(props) {
    const [isDesktopToolsPanelOpen, setIsDesktopToolsPanelOpen] = useState(false);
    const presentationMode = props.presentationMode;
    const { isDesktopMenuOpen, closeDesktopMenu, setDesktopMenuOpen } = useFlipcardToolMenu();

    const deck = useFlipcardDeck(props.cards.length, props.visibleDeckKey);
    const activeCard = props.cards[deck.activeIndex] ?? null;
    const currentPosition = Math.min(deck.activeIndex + 1, props.cards.length);
    const progressLabel = props.labels.deckPositionLabel(currentPosition, props.cards.length);
    const progressEntries = createProgressPagerEntries({
        count: props.cards.length,
        activeIndex: deck.activeIndex,
        keyPrefix: "flipcard-dot",
        resolveIsCorrect: resolveFlipcardProgressCorrectness
    });

    useEffect(() => {
        if (presentationMode !== PRESENTATION_MODE.DESKTOP) {
            closeDesktopMenu();
        }
    }, [closeDesktopMenu, presentationMode]);

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

    const handleFlipcardKeyboardShortcut = useCallback((event) => {
        if (!shouldHandleFlipcardKeyboardShortcut(event)) {
            return;
        }

        if (props.cards.length === 0 || deck.isComplete || deck.isSwipeCommandActive) {
            return;
        }

        if (event.key === "ArrowLeft" && deck.hasPrevious) {
            event.preventDefault();
            deck.goToPrevious();
            return;
        }

        if (event.key === "ArrowRight" && deck.hasNext) {
            event.preventDefault();
            deck.goToNext();
            return;
        }

        if (event.key === "Enter") {
            event.preventDefault();
            deck.flipActiveCard();
        }
    }, [props.cards.length, deck.isComplete, deck.isSwipeCommandActive, deck.hasPrevious, deck.hasNext, deck.goToPrevious, deck.goToNext, deck.flipActiveCard]);

    useEffect(() => {
        window.addEventListener("keydown", handleFlipcardKeyboardShortcut);

        return () => window.removeEventListener("keydown", handleFlipcardKeyboardShortcut);
    }, [handleFlipcardKeyboardShortcut]);

    const studySurfaceClassName = isDesktopToolsPanelOpen
        ? "flipcards-study-surface flipcards-study-surface-desktop-tools-open"
        : "flipcards-study-surface";

    const progressPager = (
        <ProgressPager
            className="flipcards-progress-pager flipcards-progress-pager-deck"
            containerClassName="flipcards-progress-pager-container"
            ariaLabel={props.labels.toolMenuPagerLabel}
            previousLabel={props.labels.previousCardLabel}
            previousDisabled={!deck.hasPrevious || deck.isSwipeCommandActive}
            previousButtonClassName="flipcards-progress-pager-button"
            onPrevious={deck.goToPrevious}
            entries={progressEntries}
            compactEntries={progressEntries}
            minimalCompactEntries={progressEntries}
            shouldUseCompactDots={props.cards.length > 9}
            shouldUseResponsiveCompactDots={true}
            submitted={false}
            onSelectEntry={deck.goToCard}
            dotsLabel={props.labels.toolMenuPagerLabel}
            goToEntryLabel={props.labels.goToCardLabel}
            counterLabel={progressLabel}
            counterClassName="flipcards-progress-pager-counter"
            counterLabelClassName="flipcards-progress-pager-label"
            nextLabel={props.labels.nextCardLabel}
            nextDisabled={!deck.hasNext || deck.isSwipeCommandActive}
            nextButtonClassName="flipcards-progress-pager-button"
            onNext={deck.goToNext}
            hasActionButton={false}
            actionButton={null}
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
                    labels={props.labels}
                    deckToolItems={props.deckToolItems}
                    onDeckToolSelect={selectDeckTool}
                />
            </div>

            <FlipcardsMobileFooterSheet
                progressEntries={progressEntries}
                progressLabel={progressLabel}
                hasPrevious={deck.hasPrevious}
                hasNext={deck.hasNext}
                isSwipeCommandActive={deck.isSwipeCommandActive}
                deckToolItems={props.deckToolItems}
                labels={props.labels}
                onPrevious={deck.goToPrevious}
                onNext={deck.goToNext}
                onGoToCard={deck.goToCard}
                onDeckToolSelect={selectDeckTool}
            />
        </section>
    );
}

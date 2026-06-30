// src/ui/view/components/FlipcardsPage/FlipcardsStudySurface.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import { PRESENTATION_MODE } from "../../../presentation/presentationMode.js";
import { useFlipcardSwipeInteraction } from "./FlipcardDeck/useFlipcardSwipeInteraction.js";
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
    const {
        activeSwipeCommand,
        isSwipeCommandActive,
        requestPracticeSwipe,
        requestMasteredSwipe,
        clearActiveSwipeCommand
    } = useFlipcardSwipeInteraction(props.visibleDeckKey);

    const progressEntries = useMemo(() => {
        return createProgressPagerEntries({
            count: props.cards.length,
            activeIndex: props.activeCardIndex,
            keyPrefix: "flipcard-dot",
            resolveIsCorrect: resolveFlipcardProgressCorrectness
        });
    }, [props.activeCardIndex, props.cards.length]);

    useEffect(() => {
        if (presentationMode !== PRESENTATION_MODE.DESKTOP) {
            closeDesktopMenu();
        }
    }, [closeDesktopMenu, presentationMode]);

    useEffect(() => {
        setIsDesktopToolsPanelOpen(presentationMode === PRESENTATION_MODE.DESKTOP && isDesktopMenuOpen);
    }, [isDesktopMenuOpen, presentationMode]);

    const restartSession = useCallback(() => {
        clearActiveSwipeCommand();
        props.onRestartSession();
    }, [clearActiveSwipeCommand, props]);

    const selectDeckTool = useCallback((deckToolKey) => {
        clearActiveSwipeCommand();
        props.onSelectDeckTool(deckToolKey);
    }, [clearActiveSwipeCommand, props]);

    const completeAsMastered = useCallback(() => {
        if (!props.activeCard) {
            return;
        }

        clearActiveSwipeCommand();
        props.onCompleteAsMastered(props.activeCard.id);
    }, [clearActiveSwipeCommand, props]);

    const completeForPractice = useCallback(() => {
        if (!props.activeCard) {
            return;
        }

        clearActiveSwipeCommand();
        props.onCompleteForPractice(props.activeCard.id);
    }, [clearActiveSwipeCommand, props]);

    const handleFlipcardKeyboardShortcut = useCallback((event) => {
        if (!shouldHandleFlipcardKeyboardShortcut(event)) {
            return;
        }

        if (props.cards.length === 0 || props.isDeckComplete || isSwipeCommandActive) {
            return;
        }

        if (event.key === "ArrowLeft" && props.hasPreviousCard) {
            event.preventDefault();
            props.onGoToPreviousCard();
            return;
        }

        if (event.key === "ArrowRight" && props.hasNextCard) {
            event.preventDefault();
            props.onGoToNextCard();
            return;
        }

        if (event.key === "Enter") {
            event.preventDefault();
            props.onToggleActiveCard();
        }
    }, [
        isSwipeCommandActive,
        props.cards.length,
        props.hasNextCard,
        props.hasPreviousCard,
        props.isDeckComplete,
        props.onGoToNextCard,
        props.onGoToPreviousCard,
        props.onToggleActiveCard
    ]);

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
            previousDisabled={!props.hasPreviousCard || isSwipeCommandActive}
            previousButtonClassName="flipcards-progress-pager-button"
            onPrevious={props.onGoToPreviousCard}
            entries={progressEntries}
            compactEntries={progressEntries}
            minimalCompactEntries={progressEntries}
            shouldUseCompactDots={props.cards.length > 9}
            shouldUseResponsiveCompactDots={true}
            submitted={false}
            onSelectEntry={props.onGoToCard}
            dotsLabel={props.labels.toolMenuPagerLabel}
            goToEntryLabel={props.labels.goToCardLabel}
            counterLabel={props.activeCardPositionLabel}
            counterClassName="flipcards-progress-pager-counter"
            counterLabelClassName="flipcards-progress-pager-label"
            nextLabel={props.labels.nextCardLabel}
            nextDisabled={!props.hasNextCard || isSwipeCommandActive}
            nextButtonClassName="flipcards-progress-pager-button"
            onNext={props.onGoToNextCard}
            hasActionButton={false}
            actionButton={null}
        />
    );

    return (
        <section className={studySurfaceClassName} aria-label={props.labels.studySurfaceLabel}>
            <div className="flipcards-study-body">
                <FlipcardDeck
                    cards={props.cards}
                    activeCard={props.activeCard}
                    activeCardIndex={props.activeCardIndex}
                    isActiveCardFlipped={props.isActiveCardFlipped}
                    isDeckComplete={props.isDeckComplete}
                    hasPreviousCard={props.hasPreviousCard}
                    hasNextCard={props.hasNextCard}
                    activeSwipeCommand={activeSwipeCommand}
                    isSwipeCommandActive={isSwipeCommandActive}
                    labels={props.labels}
                    progressModel={props.progressModel}
                    footerPager={progressPager}
                    onGoToPreviousCard={props.onGoToPreviousCard}
                    onGoToNextCard={props.onGoToNextCard}
                    onToggleActiveCard={props.onToggleActiveCard}
                    onRequestPracticeSwipe={requestPracticeSwipe}
                    onRequestMasteredSwipe={requestMasteredSwipe}
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
                progressLabel={props.activeCardPositionLabel}
                hasPrevious={props.hasPreviousCard}
                hasNext={props.hasNextCard}
                isSwipeCommandActive={isSwipeCommandActive}
                deckToolItems={props.deckToolItems}
                labels={props.labels}
                onPrevious={props.onGoToPreviousCard}
                onNext={props.onGoToNextCard}
                onGoToCard={props.onGoToCard}
                onDeckToolSelect={selectDeckTool}
            />
        </section>
    );
}

// src/ui/view/components/FlipcardsPage/FlipcardsStudySurface.jsx
import { useState } from "react";
import { useFlipcardDeck } from "./FlipcardDeck/useFlipcardDeck.js";
import FlipcardDeck from "./FlipcardDeck/FlipcardDeck.jsx";
import FlipcardToolMenu from "./FlipcardToolMenu/FlipcardToolMenu.jsx";

export default function FlipcardsStudySurface({
    cards,
    deckKey,
    progressModel,
    labels,
    desktopToolActions,
    onCardMastered,
    onCardForPractice,
    onResetProgress
}) {
    const deck = useFlipcardDeck(cards.length, deckKey);
    const [isDesktopToolsPanelOpen, setIsDesktopToolsPanelOpen] = useState(false);
    const activeCard = cards[deck.activeIndex] ?? null;

    const restartSession = () => {
        onResetProgress();
        deck.restartDeck();
    };

    const completeAsMastered = () => {
        if (!activeCard) {
            return;
        }

        onCardMastered(activeCard.id);
        deck.goToNext();
    };

    const completeForPractice = () => {
        if (!activeCard) {
            return;
        }

        onCardForPractice(activeCard.id);
        deck.goToNext();
    };

    const studySurfaceClassName = isDesktopToolsPanelOpen
        ? "flipcards-study-surface flipcards-study-surface-desktop-tools-open"
        : "flipcards-study-surface";

    return (
        <section className={studySurfaceClassName} aria-label={labels.studySurfaceLabel}>
            <div className="flipcards-study-body">
                <FlipcardDeck
                    cards={cards}
                    deck={deck}
                    labels={labels}
                    progressModel={progressModel}
                    onPractice={completeForPractice}
                    onMastered={completeAsMastered}
                    onRestart={restartSession}
                />

                <FlipcardToolMenu
                    cardCount={cards.length}
                    activeIndex={deck.activeIndex}
                    hasPrevious={deck.hasPrevious}
                    hasNext={deck.hasNext}
                    isComplete={deck.isComplete}
                    isSwipeCommandActive={deck.isSwipeCommandActive}
                    progressModel={progressModel}
                    labels={labels}
                    desktopToolActions={desktopToolActions}
                    onPrevious={deck.goToPrevious}
                    onNext={deck.goToNext}
                    onGoToCard={deck.goToCard}
                    onPractice={deck.requestSwipeLeft}
                    onFlip={deck.flipActiveCard}
                    onMastered={deck.requestSwipeRight}
                    onDesktopToolsOpenChange={setIsDesktopToolsPanelOpen}
                />
            </div>
        </section>
    );
}

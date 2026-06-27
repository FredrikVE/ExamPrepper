// src/ui/view/components/FlipcardsPage/FlipcardsStudySurface.jsx
import { useState } from "react";
import { useFlipcardDeck } from "./FlipcardDeck/useFlipcardDeck.js";
import FlipcardDeck from "./FlipcardDeck/FlipcardDeck.jsx";
import FlipcardToolMenu from "./FlipcardToolMenu/FlipcardToolMenu.jsx";

export default function FlipcardsStudySurface(props) {
    const [isDesktopToolsPanelOpen, setIsDesktopToolsPanelOpen] = useState(false);

    const deck = useFlipcardDeck(props.cards.length, props.visibleDeckKey);
    const activeCard = props.cards[deck.activeIndex] ?? null;

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

    return (
        <section className={studySurfaceClassName} aria-label={props.labels.studySurfaceLabel}>
            <div className="flipcards-study-body">
                <FlipcardDeck
                    cards={props.cards}
                    deck={deck}
                    labels={props.labels}
                    progressModel={props.progressModel}
                    onPractice={completeForPractice}
                    onMastered={completeAsMastered}
                    onRestart={restartSession}
                />

                <FlipcardToolMenu
                    cardCount={props.cards.length}
                    activeIndex={deck.activeIndex}
                    hasPrevious={deck.hasPrevious}
                    hasNext={deck.hasNext}
                    isSwipeCommandActive={deck.isSwipeCommandActive}
                    labels={props.labels}
                    deckToolItems={props.deckToolItems}
                    onPrevious={deck.goToPrevious}
                    onNext={deck.goToNext}
                    onGoToCard={deck.goToCard}
                    onDeckToolSelect={selectDeckTool}
                    onDesktopToolsOpenChange={setIsDesktopToolsPanelOpen}
                />
            </div>
        </section>
    );
}

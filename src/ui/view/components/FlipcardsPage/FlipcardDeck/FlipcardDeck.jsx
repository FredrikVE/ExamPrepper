// src/ui/view/components/FlipcardsPage/FlipcardDeck/FlipcardDeck.jsx
import CardStack from "./CardStack.jsx";
import Flipcard from "./Flipcard.jsx";
import QuickActions from "./QuickActions.jsx";

export default function FlipcardDeck({
    cards,
    deck,
    labels,
    progressModel,
    onPractice,
    onMastered,
    onRestart
}) {
    if (cards.length === 0) {
        return (
            <section className="flipcard-deck flipcard-deck-state" aria-label={labels.deckLabel}>
                <h2>{labels.emptyDeckTitle}</h2>
            </section>
        );
    }

    if (deck.isComplete) {
        return (
            <section className="flipcard-deck flipcard-deck-state" aria-label={labels.deckLabel}>
                <h2>{labels.completeTitle}</h2>
                <p>{progressModel.completeBody}</p>
                <div className="flipcard-complete-stats" aria-label={labels.completeStatsLabel}>
                    <span>{labels.completedCardsLabel(progressModel.completedCount, progressModel.totalCardCount)}</span>
                    <span>{labels.masteredCardsLabel(progressModel.masteredCount)}</span>
                    <span>{labels.practiceCardsLabel(progressModel.practiceCount)}</span>
                </div>
                <div className="flipcard-deck-state-actions">
                    <button
                        type="button"
                        className="flipcards-secondary-action"
                        onClick={deck.goToPrevious}
                        disabled={!deck.hasPrevious}
                    >
                        {labels.previousCardLabel}
                    </button>
                    <button
                        type="button"
                        className="flipcards-primary-action"
                        onClick={onRestart}
                    >
                        {labels.restartDeckLabel}
                    </button>
                </div>
            </section>
        );
    }

    const activeCard = cards[deck.activeIndex];

    return (
        <section className="flipcard-deck" aria-label={labels.deckLabel}>
            <div className="flipcard-stage">
                <div className="flipcard-stage-glow" aria-hidden="true" />

                <CardStack
                    cardCount={cards.length}
                    activeIndex={deck.activeIndex}
                />

                <Flipcard
                    key={activeCard.id}
                    term={activeCard.term}
                    definition={activeCard.definition}
                    isFlipped={deck.isFlipped}
                    label={labels.activeCardLabel(deck.activeIndex + 1, cards.length)}
                    labels={labels}
                    swipeCommand={deck.swipeCommand}
                    hasPrevious={deck.hasPrevious}
                    hasNext={deck.hasNext}
                    onPrevious={deck.goToPrevious}
                    onNext={deck.goToNext}
                    onSwipePractice={onPractice}
                    onSwipeMastered={onMastered}
                />
            </div>

            <QuickActions
                hasPrevious={deck.hasPrevious}
                hasNext={deck.hasNext}
                isSwipeCommandActive={deck.isSwipeCommandActive}
                labels={labels}
                onPrevious={deck.goToPrevious}
                onNext={deck.goToNext}
                onPractice={deck.requestSwipeLeft}
                onFlip={deck.flipActiveCard}
                onMastered={deck.requestSwipeRight}
            />
        </section>
    );
}

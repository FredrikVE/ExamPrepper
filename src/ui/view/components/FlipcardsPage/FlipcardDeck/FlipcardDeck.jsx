// src/ui/view/components/FlipcardsPage/FlipcardDeck/FlipcardDeck.jsx
import CardStack from "./CardStack.jsx";
import Flipcard from "./Flipcard.jsx";
import QuickActions from "./QuickActions.jsx";

export default function FlipcardDeck({
    cards,
    deck,
    labels,
    masteredCount,
    practiceCount,
    onPractice,
    onMastered
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
                <p>{labels.completeBody(masteredCount, practiceCount)}</p>
                <button
                    type="button"
                    className="flipcards-secondary-action"
                    onClick={deck.goToPrevious}
                    disabled={!deck.hasPrevious}
                >
                    {labels.previousCardLabel}
                </button>
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
                    term={activeCard.term}
                    definition={activeCard.definition}
                    isFlipped={deck.isFlipped}
                    label={labels.activeCardLabel(deck.activeIndex + 1, cards.length)}
                />
            </div>

            <QuickActions
                hasPrevious={deck.hasPrevious}
                hasNext={deck.hasNext}
                labels={labels}
                onPrevious={deck.goToPrevious}
                onNext={deck.goToNext}
                onPractice={onPractice}
                onFlip={deck.flipActiveCard}
                onMastered={onMastered}
            />
        </section>
    );
}

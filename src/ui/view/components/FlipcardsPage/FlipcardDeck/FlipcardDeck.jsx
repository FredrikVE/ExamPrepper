// src/ui/view/components/FlipcardsPage/FlipcardDeck/FlipcardDeck.jsx
import CardStack from "./CardStack.jsx";
import Flipcard from "./Flipcard.jsx";
import QuickActions from "./QuickActions.jsx";

export default function FlipcardDeck({
    cards,
    activeCard,
    activeCardIndex,
    isActiveCardFlipped,
    isDeckComplete,
    hasPreviousCard,
    hasNextCard,
    activeSwipeCommand,
    isSwipeCommandActive,
    labels,
    progressModel,
    footerPager,
    onGoToPreviousCard,
    onGoToNextCard,
    onToggleActiveCard,
    onRequestPracticeSwipe,
    onRequestMasteredSwipe,
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

    if (isDeckComplete) {
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
                        onClick={onGoToPreviousCard}
                        disabled={!hasPreviousCard}
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

    if (!activeCard) {
        return null;
    }

    return (
        <section className="flipcard-deck" aria-label={labels.deckLabel}>
            <div className="flipcard-stage">
                <div className="flipcard-stage-glow" aria-hidden="true" />

                <CardStack
                    cardCount={cards.length}
                    activeIndex={activeCardIndex}
                />

                <Flipcard
                    key={activeCard.id}
                    term={activeCard.term}
                    definition={activeCard.definition}
                    isFlipped={isActiveCardFlipped}
                    label={labels.activeCardLabel(activeCardIndex + 1, cards.length)}
                    labels={labels}
                    swipeCommand={activeSwipeCommand}
                    hasPrevious={hasPreviousCard}
                    hasNext={hasNextCard}
                    onPrevious={onGoToPreviousCard}
                    onNext={onGoToNextCard}
                    onSwipePractice={onPractice}
                    onSwipeMastered={onMastered}
                />
            </div>

            <QuickActions
                isSwipeCommandActive={isSwipeCommandActive}
                labels={labels}
                onPractice={onRequestPracticeSwipe}
                onFlip={onToggleActiveCard}
                onMastered={onRequestMasteredSwipe}
            />

            <div className="flipcard-deck-progress-pager">
                {footerPager}
            </div>
        </section>
    );
}

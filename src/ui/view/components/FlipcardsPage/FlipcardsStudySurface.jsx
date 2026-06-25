// src/ui/view/components/FlipcardsPage/FlipcardsStudySurface.jsx
import { useFlipcardDeck } from "./FlipcardDeck/useFlipcardDeck.js";
import FlipcardDeck from "./FlipcardDeck/FlipcardDeck.jsx";

export default function FlipcardsStudySurface({
    cards,
    deckKey,
    progressModel,
    labels,
    onCardMastered,
    onCardForPractice,
    onResetProgress
}) {
    const deck = useFlipcardDeck(cards.length, deckKey);
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

    const deckPositionLabel = deck.isComplete
        ? labels.completePositionLabel
        : labels.deckPositionLabel(deck.activeIndex + 1, cards.length);

    return (
        <section className="flipcards-study-surface" aria-label={labels.studySurfaceLabel}>
            <div className="flipcards-study-header">
                <div>
                    <p className="flipcards-study-kicker">{labels.studyKicker}</p>
                    <h1>{labels.studyTitle}</h1>
                </div>

                <div className="flipcards-study-progress" aria-label={labels.progressSummaryLabel}>
                    <span>{deckPositionLabel}</span>
                    <strong>{progressModel.progressLabel}</strong>
                </div>
            </div>

            <FlipcardDeck
                cards={cards}
                deck={deck}
                labels={labels}
                progressModel={progressModel}
                onPractice={completeForPractice}
                onMastered={completeAsMastered}
                onRestart={restartSession}
            />
        </section>
    );
}

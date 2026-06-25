// src/ui/view/components/FlipcardsPage/FlipcardDeck/CardStack.jsx
const STACK_CARD_COUNT = 3;

export default function CardStack({ cardCount, activeIndex }) {
    const remainingCardCount = Math.max(cardCount - activeIndex - 1, 0);
    const visibleStackCount = Math.min(remainingCardCount, STACK_CARD_COUNT);

    if (visibleStackCount === 0) {
        return null;
    }

    return (
        <div className="card-stack" aria-hidden="true">
            {Array.from({ length: visibleStackCount }, (_, index) => (
                <span
                    key={index}
                    className={`card-stack-card card-stack-card-${index + 1}`}
                />
            ))}
        </div>
    );
}

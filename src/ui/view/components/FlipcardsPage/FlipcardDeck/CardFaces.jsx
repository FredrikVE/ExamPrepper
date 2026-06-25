// src/ui/view/components/FlipcardsPage/FlipcardDeck/CardFaces.jsx
function getInnerClassName(isFlipped) {
    if (isFlipped) {
        return "card-faces-inner card-faces-inner-flipped";
    }

    return "card-faces-inner";
}

export default function CardFaces({ term, definition, isFlipped }) {
    const innerClassName = getInnerClassName(isFlipped);

    return (
        <div className="card-faces">
            <div className={innerClassName}>
                <div className="card-face card-face-front" aria-hidden={isFlipped}>
                    <span className="flip-title">{term}</span>
                </div>

                <div className="card-face card-face-back" aria-hidden={!isFlipped}>
                    <span className="flip-definition">{definition}</span>
                </div>
            </div>
        </div>
    );
}

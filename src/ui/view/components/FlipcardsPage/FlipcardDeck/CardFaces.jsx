// src/ui/view/components/FlipcardsPage/FlipcardDeck/CardFaces.jsx
function getInnerClassName(isFlipped) {
    if (isFlipped) {
        return "card-faces-inner card-faces-inner-flipped";
    }

    return "card-faces-inner";
}

function getTitleClassName(term) {
    const compactTerm = String(term).replace(/\s+/g, "");

    if (compactTerm.length >= 18) {
        return "flip-title flip-title-extra-long";
    }

    if (compactTerm.length >= 13) {
        return "flip-title flip-title-long";
    }

    return "flip-title";
}

export default function CardFaces({ term, definition, isFlipped }) {
    const innerClassName = getInnerClassName(isFlipped);
    const titleClassName = getTitleClassName(term);

    return (
        <div className="card-faces">
            <div className={innerClassName}>
                <div className="card-face card-face-front" aria-hidden={isFlipped}>
                    <span className={titleClassName}>{term}</span>
                </div>

                <div className="card-face card-face-back" aria-hidden={!isFlipped}>
                    <span className="flip-definition">{definition}</span>
                </div>
            </div>
        </div>
    );
}

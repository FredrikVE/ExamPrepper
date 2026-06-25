// src/ui/view/components/FlipcardsPage/FlipcardDeck/Flipcard.jsx
import CardFaces from "./CardFaces.jsx";

export default function Flipcard({ term, definition, isFlipped, label }) {
    return (
        <article className="flipcard" aria-label={label}>
            <CardFaces
                term={term}
                definition={definition}
                isFlipped={isFlipped}
            />
        </article>
    );
}

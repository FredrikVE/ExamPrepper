import { ChevronRight, Clock3, GalleryHorizontalEnd } from "lucide-react";

export default function FlashcardDeckCard({ deck, index, eyebrowLabel, cardCountLabel, cardUnitLabel, minuteLabel, onSelectDeck }) {
    const accentIndex = index % 6 + 1;
    const titleId = `flashcard-deck-card-title-${deck.key}`;
    const descriptionId = `flashcard-deck-card-description-${deck.key}`;

    return (
        <article className={`exam-select-card exam-select-card-${accentIndex}`}>
            <button
                type="button"
                className="exam-select-card-action"
                onClick={() => onSelectDeck(deck.topicAreaKey)}
                aria-labelledby={`${titleId} ${descriptionId}`}
            />

            <div className="exam-select-card-main-row">
                <div className="exam-select-card-icon-wrapper" aria-hidden="true">
                    <GalleryHorizontalEnd className="exam-select-card-icon" />
                </div>

                <div className="exam-select-card-copy">
                    <p className="exam-select-card-eyebrow">
                        {eyebrowLabel}
                    </p>

                    <h2 id={titleId} className="exam-select-card-title">
                        {deck.title}
                    </h2>

                    <p id={descriptionId} className="exam-select-card-description">
                        {cardCountLabel(deck.cardCount)}
                    </p>
                </div>
            </div>

            <div className="exam-select-card-footer">
                <div className="exam-select-card-meta">
                    <GalleryHorizontalEnd className="exam-select-card-meta-icon" />
                    <div>
                        <strong>{deck.cardCount}</strong>
                        <span>{cardUnitLabel}</span>
                    </div>
                </div>

                <div className="exam-select-card-footer-divider" aria-hidden="true" />

                <div className="exam-select-card-meta">
                    <Clock3 className="exam-select-card-meta-icon" />
                    <div>
                        <strong>{deck.estimatedMinutes}</strong>
                        <span>{minuteLabel}</span>
                    </div>
                </div>

                <span className="exam-select-card-arrow" aria-hidden="true">
                    <ChevronRight className="exam-select-card-arrow-icon" />
                </span>
            </div>
        </article>
    );
}

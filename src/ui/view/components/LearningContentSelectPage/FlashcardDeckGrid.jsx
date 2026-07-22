import FlashcardDeckCard from "./FlashcardDeckCard.jsx";

export default function FlashcardDeckGrid(props) {
	const deckCards = [];

	for (let index = 0; index < props.decks.length; index += 1) {
		const deck = props.decks[index];

		deckCards.push(
			<FlashcardDeckCard
				key={deck.key}
				deck={deck}
				index={index}
				eyebrowLabel={props.eyebrowLabel}
				cardCountLabel={props.cardCountLabel}
				cardUnitLabel={props.cardUnitLabel}
				minuteLabel={props.minuteLabel}
				onSelectDeck={props.onSelectDeck}
			/>
		);
	}

	return (
		<section className="exam-select-grid">
			{deckCards}
		</section>
	);
}

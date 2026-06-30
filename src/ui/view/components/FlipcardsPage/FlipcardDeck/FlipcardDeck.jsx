// src/ui/view/components/FlipcardsPage/FlipcardDeck/FlipcardDeck.jsx
import CardStack from "./CardStack.jsx";
import Flipcard from "./Flipcard.jsx";
import QuickActions from "./QuickActions.jsx";

export default function FlipcardDeck(props) {
	if (props.cards.length === 0) {
		return (
			<section className="flipcard-deck flipcard-deck-state" aria-label={props.labels.deckLabel}>
				<h2>{props.labels.emptyDeckTitle}</h2>
			</section>
		);
	}

	if (props.isDeckComplete) {
		return (
			<section className="flipcard-deck flipcard-deck-state" aria-label={props.labels.deckLabel}>
				<h2>{props.labels.completeTitle}</h2>
				<p>{props.progressModel.completeBody}</p>
				<div className="flipcard-complete-stats" aria-label={props.labels.completeStatsLabel}>
					<span>{props.labels.completedCardsLabel(props.progressModel.completedCount, props.progressModel.totalCardCount)}</span>
					<span>{props.labels.masteredCardsLabel(props.progressModel.masteredCount)}</span>
					<span>{props.labels.practiceCardsLabel(props.progressModel.practiceCount)}</span>
				</div>
				<div className="flipcard-deck-state-actions">
					<button
						type="button"
						className="flipcards-secondary-action"
						onClick={props.onGoToPreviousCard}
						disabled={!props.hasPreviousCard}
					>
						{props.labels.previousCardLabel}
					</button>
					<button
						type="button"
						className="flipcards-primary-action"
						onClick={props.onRestart}
					>
						{props.labels.restartDeckLabel}
					</button>
				</div>
			</section>
		);
	}

	if (!props.activeCard) {
		return null;
	}

	return (
		<section className="flipcard-deck" aria-label={props.labels.deckLabel}>
			<div className="flipcard-stage">
				<div className="flipcard-stage-glow" aria-hidden="true" />

				<CardStack
					nextCard={props.nextCard}
				/>

				<Flipcard
					key={props.activeCard.id}
					cardId={props.activeCard.id}
					term={props.activeCard.term}
					definition={props.activeCard.definition}
					isFlipped={props.isActiveCardFlipped}
					label={props.labels.activeCardLabel(props.activeCardIndex + 1, props.cards.length)}
					labels={props.labels}
					swipeCommand={props.activeSwipeCommand}
					isSwipeCommandActive={props.isSwipeCommandActive}
					onRequestPracticeSwipe={props.onRequestPracticeSwipe}
					onRequestMasteredSwipe={props.onRequestMasteredSwipe}
					onSwipePractice={props.onPractice}
					onSwipeMastered={props.onMastered}
				/>
			</div>

			<QuickActions
				isSwipeCommandActive={props.isSwipeCommandActive}
				labels={props.labels}
				onPractice={props.onRequestPracticeSwipe}
				onFlip={props.onToggleActiveCard}
				onMastered={props.onRequestMasteredSwipe}
			/>

		</section>
	);
}

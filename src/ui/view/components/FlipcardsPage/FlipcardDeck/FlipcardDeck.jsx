// src/ui/view/components/FlipcardsPage/FlipcardDeck/FlipcardDeck.jsx
import CardStack from "./CardStack.jsx";
import CompleteState from "./CompleteState.jsx";
import Flipcard from "./Flipcard.jsx";
import FeedbackToast from "./FeedbackToast.jsx";
import QuickActions from "./QuickActions.jsx";
import { useFlipcardHoverPreviewInteraction } from "./useFlipcardHoverPreviewInteraction.js";

export default function FlipcardDeck(props) {
	const activeCardId = props.activeCard ? props.activeCard.id : null;
	const hoverPreview = useFlipcardHoverPreviewInteraction({
		activeCardId,
		isDisabled: props.isSwipeCommandActive || props.isActiveCardFlipped || props.isDeckComplete || props.cards.length === 0
	});

	if (props.cards.length === 0) {
		return (
			<section className="flipcard-deck flipcard-deck-state" aria-label={props.labels.deckLabel}>
				<h2>{props.labels.emptyDeckTitle}</h2>
			</section>
		);
	}

	if (props.isDeckComplete) {
		return (
			<CompleteState
				labels={props.labels}
				progressModel={props.progressModel}
				hasPreviousCard={props.hasPreviousCard}
				onGoToPreviousCard={props.onGoToPreviousCard}
				onRestart={props.onRestart}
			/>
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
					isHoverPreviewActive={hoverPreview.isHoverPreviewActive}
					isHoverBorderReady={hoverPreview.isHoverBorderReady}
					swipeCommand={props.activeSwipeCommand}
					isSwipeCommandActive={props.isSwipeCommandActive}
					onRequestPracticeSwipe={props.onRequestPracticeSwipe}
					onRequestMasteredSwipe={props.onRequestMasteredSwipe}
					onSwipePractice={props.onPractice}
					onSwipeMastered={props.onMastered}
					onSwipeFeedback={props.onSwipeFeedback}
					onToggleCard={props.onToggleActiveCard}
				/>

				<FeedbackToast
					message={props.feedbackToastMessage}
					isVisible={props.isFeedbackToastVisible}
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

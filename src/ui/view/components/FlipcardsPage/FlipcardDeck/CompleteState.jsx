// src/ui/view/components/FlipcardsPage/FlipcardDeck/CompleteState.jsx
export default function CompleteState(props) {
	return (
		<section className="flipcard-deck flipcard-deck-complete" aria-label={props.labels.deckLabel}>
			<div className="flipcard-complete-stage">
				<div className="flipcard-complete-glow" aria-hidden="true" />

				<div className="flipcard-complete-card">
					<div className="flipcard-complete-orb" aria-hidden="true">
						✓
					</div>

					<p className="flipcard-complete-eyebrow">
						{props.labels.completePositionLabel}
					</p>

					<h2>{props.labels.completeTitle}</h2>
					<p className="flipcard-complete-body">{props.progressModel.completeBody}</p>

					<div className="flipcard-complete-stats" aria-label={props.labels.completeStatsLabel}>
						<span>{props.labels.completedCardsLabel(props.progressModel.completedCount, props.progressModel.totalCardCount)}</span>
						<span>{props.labels.masteredCardsLabel(props.progressModel.masteredCount)}</span>
						<span>{props.labels.practiceCardsLabel(props.progressModel.practiceCount)}</span>
					</div>

					<div className="flipcard-complete-actions">
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
				</div>
			</div>
		</section>
	);
}

import MatchCard from "./MatchCard.jsx";

export default function MatchCardsGrid({
	termSlots,
	explanationSlots,
	labels,
	boardStyle,
	isInteractionLocked,
	onSelectSlot
}) {
	return (
		<section className="matchcards-board" style={boardStyle} aria-label={labels.pageTitle}>
			<MatchCardsColumn
				slots={termSlots}
				labels={labels}
				isInteractionLocked={isInteractionLocked}
				onSelectSlot={onSelectSlot}
			/>

			<MatchCardsColumn
				slots={explanationSlots}
				labels={labels}
				isInteractionLocked={isInteractionLocked}
				onSelectSlot={onSelectSlot}
			/>
		</section>
	);
}

function MatchCardsColumn({ slots, labels, isInteractionLocked, onSelectSlot }) {
	return (
		<div className="matchcards-column">
			<div className="matchcards-column-slots">
				{slots.map((slot) => (
					<MatchCard
						key={slot.slotId}
						slot={slot}
						labels={labels}
						isInteractionLocked={isInteractionLocked}
						onSelectSlot={onSelectSlot}
					/>
				))}
			</div>
		</div>
	);
}

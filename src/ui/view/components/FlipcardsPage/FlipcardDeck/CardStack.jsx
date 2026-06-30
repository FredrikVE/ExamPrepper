// src/ui/view/components/FlipcardsPage/FlipcardDeck/CardStack.jsx
export default function CardStack(props) {
	if (!props.nextCard) {
		return null;
	}

	return (
		<div className="card-stack" aria-hidden="true">
			<div className="card-stack-card">
				<span className="card-stack-title">{props.nextCard.term}</span>
			</div>
		</div>
	);
}

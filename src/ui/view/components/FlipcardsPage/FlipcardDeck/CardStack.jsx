// src/ui/view/components/FlipcardsPage/FlipcardDeck/CardStack.jsx
import FlipcardTerm from "./FlipcardTerm.jsx";

export default function CardStack(props) {
	if (!props.nextCard) {
		return null;
	}

	return (
		<div className="card-stack" aria-hidden="true">
			<div className="card-stack-card">
				<FlipcardTerm className="card-stack-title" presentation={props.nextCard.termPresentation} />
			</div>
		</div>
	);
}

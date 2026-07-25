// src/ui/view/components/FlipcardsPage/FlipcardDeck/CardFaces.jsx
import FlipcardTerm from "./FlipcardTerm.jsx";

function getInnerClassName(isFlipped) {
	if (isFlipped) {
		return "card-faces-inner card-faces-inner-flipped";
	}

	return "card-faces-inner";
}

function getTitleClassName(termPresentation) {
	const compactTerm = termPresentation.primaryText.replace(/\s|\u00AD/gu, "");

	if (compactTerm.length >= 18) {
		return "flip-title flip-title-extra-long";
	}

	if (compactTerm.length >= 13) {
		return "flip-title flip-title-long";
	}

	return "flip-title";
}

export default function CardFaces(props) {
	const innerClassName = getInnerClassName(props.isFlipped);
	const titleClassName = getTitleClassName(props.termPresentation);

	return (
		<div className="card-faces">
			<div className={innerClassName}>
				<div className="card-face card-face-front" aria-hidden={props.isFlipped}>
					<FlipcardTerm className={titleClassName} presentation={props.termPresentation} />
				</div>

				<div className="card-face card-face-back" aria-hidden={!props.isFlipped}>
					<span className="flip-definition">{props.definition}</span>
				</div>
			</div>
		</div>
	);
}

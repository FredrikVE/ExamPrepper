// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Mobile/TableMatchMobileTargetCard.jsx
import { X } from "lucide-react";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import TableMatchMobilePlacedCard from "./TableMatchMobilePlacedCard.jsx";

export default function TableMatchMobileTargetCard(props) {
	const cardClassName = getCardClassName(props.isDragOver);
	const targetClassName = getTargetClassName({
		hasSelectedCard: Boolean(props.selectedCard),
		hasActiveCard: props.hasActiveCard,
		isDragOver: props.isDragOver
	});

	const handleKeyDown = (event) => {
		const userPressedEnter = event.key === "Enter";
		const userPressedSpace = event.key === " ";

		if (!userPressedEnter && !userPressedSpace) {
			return;
		}

		event.preventDefault();
		props.onTargetClick();
	};

	return (
		<article
			className={cardClassName}
			role="button"
			tabIndex={0}
			onClick={props.onTargetClick}
			onKeyDown={handleKeyDown}
			data-table-match-mobile-target-id={props.target.id}
			aria-label={`${props.t.dragDropDropHere}: ${props.target.description}`}
		>
			<div className="table-match-mobile-target-description">
				<FormattedText text={props.target.description} />
			</div>

			<div className={targetClassName}>
				{props.selectedCard ? (
					<div className="table-match-mobile-filled-target">
						<TableMatchMobilePlacedCard
							card={props.selectedCard}
							onPointerDown={props.onPlacedCardPointerDown}
						/>

						<button
							type="button"
							className="table-match-mobile-clear-button"
							onClick={handleClearClick(props.onClear)}
							aria-label={props.t.dragDropClearAnswer}
						>
							<X aria-hidden="true" />
						</button>
					</div>
				) : (
					<span className="table-match-mobile-drop-label">
						{props.t.dragDropDropHere}
					</span>
				)}
			</div>
		</article>
	);
}

const handleClearClick = (onClear) => {
	return (event) => {
		event.stopPropagation();
		onClear();
	};
};

const getCardClassName = (isDragOver) => {
	let className = "table-match-mobile-target-card";

	if (isDragOver) {
		className += " table-match-mobile-target-card-over";
	}

	return className;
};

const getTargetClassName = ({ hasSelectedCard, hasActiveCard, isDragOver }) => {
	let className = "table-match-mobile-drop-zone";

	if (hasSelectedCard) {
		className += " table-match-mobile-drop-zone-filled";
	}

	if (hasActiveCard) {
		className += " table-match-mobile-drop-zone-armed";
	}

	if (isDragOver) {
		className += " table-match-mobile-drop-zone-over";
	}

	return className;
};

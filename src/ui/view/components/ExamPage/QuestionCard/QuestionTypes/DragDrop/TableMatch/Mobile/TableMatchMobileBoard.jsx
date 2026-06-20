// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Mobile/TableMatchMobileBoard.jsx
import TableMatchMobileCard from "./TableMatchMobileCard.jsx";
import TableMatchMobileTargetCard from "./TableMatchMobileTargetCard.jsx";

export default function TableMatchMobileBoard(props) {
	const targets = Array.isArray(props.question?.targets)
		? props.question.targets
		: [];

	return (
		<section className="table-match-mobile-board" aria-label={props.t.dragDropCardBankTitle}>
			<div className="table-match-mobile-column table-match-mobile-terms-column">
				<h4 className="table-match-mobile-column-title">
					{props.t.dragDropCardBankTitle}
				</h4>

				<div className="table-match-mobile-card-list">
					{props.cards.map((card) => (
						<TableMatchMobileCard
							key={card.id}
							card={card}
							isSelected={props.selectedCardId === card.id}
							onSelect={() => props.onCardSelect(card.id)}
						/>
					))}
				</div>
			</div>

			<div className="table-match-mobile-column table-match-mobile-targets-column">
				<h4 className="table-match-mobile-column-title">
					{props.t.dragDropDescriptionHeader}
				</h4>

				<div className="table-match-mobile-target-list">
					{targets.map((target) => {
						const selectedCardId = props.safeAnswer[target.id];
						const selectedCard = props.cardsById[selectedCardId];

						return (
							<TableMatchMobileTargetCard
								key={target.id}
								target={target}
								selectedCard={selectedCard}
								hasActiveCard={Boolean(props.selectedCardId)}
								onTargetClick={() => props.onTargetClick(target.id)}
								onClear={() => props.onClearTarget(target.id)}
								t={props.t}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}

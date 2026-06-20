// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Mobile/TableMatchMobilePlacedCard.jsx
import FormattedText from "../../../../../../Shared/FormattedText.jsx";

export default function TableMatchMobilePlacedCard(props) {
	return (
		<div className="table-match-mobile-card table-match-mobile-placed-card">
			<span className="table-match-mobile-card-text">
				<FormattedText text={props.card.text} />
			</span>

			<MobileGripHandle />
		</div>
	);
}

const MobileGripHandle = () => {
	return (
		<span className="table-match-mobile-card-grip" aria-hidden="true">
			<span />
			<span />
			<span />
			<span />
			<span />
			<span />
		</span>
	);
};

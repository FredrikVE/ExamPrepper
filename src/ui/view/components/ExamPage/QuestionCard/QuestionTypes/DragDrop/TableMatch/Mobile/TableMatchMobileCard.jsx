// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Mobile/TableMatchMobileCard.jsx
import FormattedText from "../../../../../../Shared/FormattedText.jsx";

export default function TableMatchMobileCard(props) {
	const className = props.isSelected
		? "table-match-mobile-card table-match-mobile-card-selected"
		: "table-match-mobile-card";

	return (
		<button
			type="button"
			className={className}
			onClick={props.onSelect}
		>
			<span className="table-match-mobile-card-text">
				<FormattedText text={props.card.text} />
			</span>

			<MobileGripHandle />
		</button>
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

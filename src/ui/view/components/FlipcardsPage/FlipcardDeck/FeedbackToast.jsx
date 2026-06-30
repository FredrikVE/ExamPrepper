// src/ui/view/components/FlipcardsPage/FlipcardDeck/FeedbackToast.jsx
function getFeedbackToastClassName(isVisible) {
	return isVisible
		? "flipcard-feedback-toast flipcard-feedback-toast-visible"
		: "flipcard-feedback-toast";
}

export default function FeedbackToast(props) {
	return (
		<div
			className={getFeedbackToastClassName(props.isVisible)}
			role="status"
			aria-live="polite"
			aria-atomic="true"
		>
			{props.message}
		</div>
	);
}

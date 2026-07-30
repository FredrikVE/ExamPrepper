//src/ui/view/components/LearningPathPage/ContinuePanel.jsx
export default function ContinuePanel({ isVisible, title, body, buttonLabel, isButtonDisabled, onStartPressed }) {
	if (!isVisible) {
		return null;
	}

	return (
		<section className="learning-path-continue-panel" aria-labelledby="learning-path-continue-title">
			<div>
				<h2 id="learning-path-continue-title">{title}</h2>
				<p>{body}</p>
			</div>
			<button type="button" disabled={isButtonDisabled} onClick={onStartPressed}>{buttonLabel}</button>
		</section>
	);
}

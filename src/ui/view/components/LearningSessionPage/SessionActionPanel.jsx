//src/ui/view/components/LearningSessionPage/SessionActionPanel.jsx
export default function SessionActionPanel({ feedbackAppearance, feedbackTitle, feedbackBody, primaryLabel, primaryAppearance, isPrimaryDisabled, onPrimaryPressed }) {
	return (
		<section className={`learning-session-action-panel learning-session-action-panel--${feedbackAppearance}`} aria-live="polite">
			<div>
				{feedbackTitle === null ? null : <h2>{feedbackTitle}</h2>}
				{feedbackBody === null ? null : <p>{feedbackBody}</p>}
			</div>
			<button className={`learning-session-primary learning-session-primary--${primaryAppearance}`} type="button" disabled={isPrimaryDisabled} onClick={onPrimaryPressed}>{primaryLabel}</button>
		</section>
	);
}

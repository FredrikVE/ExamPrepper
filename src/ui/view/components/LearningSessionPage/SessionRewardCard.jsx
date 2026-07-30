//src/ui/view/components/LearningSessionPage/SessionRewardCard.jsx
export default function SessionRewardCard({ title, body, dismissLabel, onDismiss }) {
	return (
		<section className="learning-session-reward" role="dialog" aria-modal="true" aria-labelledby="learning-session-reward-title">
			<h2 id="learning-session-reward-title">{title}</h2>
			<p>{body}</p>
			<button type="button" onClick={onDismiss}>{dismissLabel}</button>
		</section>
	);
}

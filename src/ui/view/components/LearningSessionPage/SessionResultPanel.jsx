//src/ui/view/components/LearningSessionPage/SessionResultPanel.jsx
export default function SessionResultPanel({ title, score, moduleProgress, backLabel, onBack }) {
	return (
		<section className="learning-session-result" aria-labelledby="learning-session-result-title">
			<h2 id="learning-session-result-title">{title}</h2>
			<p>{score.earnedPoints} / {score.availablePoints} · {score.percentage}%</p>
			<p>{moduleProgress.masteryPercent}%</p>
			<button type="button" onClick={onBack}>{backLabel}</button>
		</section>
	);
}

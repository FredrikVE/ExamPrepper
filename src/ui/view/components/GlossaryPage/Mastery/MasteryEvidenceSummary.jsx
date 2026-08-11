// src/ui/view/components/GlossaryPage/Mastery/MasteryEvidenceSummary.jsx
import MasteryBadge from "./MasteryBadge.jsx";

export default function MasteryEvidenceSummary({ mastery }) {
	return (
		<div className="glossary-mastery-summary">
			<div className="glossary-mastery-summary__header">
				<MasteryBadge mastery={mastery} />
				<span className="glossary-mastery-summary__score">{mastery.scoreLabel}</span>
			</div>
			<span className="glossary-mastery-summary__counts">{mastery.correctIncorrectLabel}</span>
			<div className="glossary-mastery-summary__difficulty" aria-label={mastery.correctIncorrectLabel}>
				{mastery.difficultyItems.map((item) => (
					<span key={item.label} className="glossary-mastery-summary__difficulty-item">
						{item.label}: {item.correctCount}✓ {item.incorrectCount}×
					</span>
				))}
			</div>
			<span className="glossary-mastery-summary__last-practiced">{mastery.lastPracticedLabel}</span>
		</div>
	);
}

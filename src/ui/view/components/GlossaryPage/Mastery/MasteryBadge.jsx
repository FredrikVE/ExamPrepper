// src/ui/view/components/GlossaryPage/Mastery/MasteryBadge.jsx
export default function MasteryBadge({ mastery }) {
	return (
		<span className="glossary-mastery-badge" data-mastery-status={mastery.status}>
			{mastery.statusLabel}
		</span>
	);
}

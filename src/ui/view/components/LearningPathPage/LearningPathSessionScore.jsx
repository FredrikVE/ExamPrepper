// src/ui/view/components/LearningPathPage/LearningPathSessionScore.jsx
const RADIUS = 15.9155;

export default function LearningPathSessionScore({ model }) {
	return (
		<span className={`learning-path-session-score learning-path-session-score--${model.appearance}`} role="img" aria-label={model.accessibleLabel}>
			<svg className="learning-path-session-score__ring" viewBox="0 0 36 36" aria-hidden="true">
				<circle className="learning-path-session-score__background" cx="18" cy="18" r={RADIUS} />
				<circle className="learning-path-session-score__value" cx="18" cy="18" r={RADIUS} strokeDasharray={`${model.percentage} 100`} />
			</svg>
			<span>{model.displayValue}</span>
		</span>
	);
}

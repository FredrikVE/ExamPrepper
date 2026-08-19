//src/ui/view/components/LearningPathPage/LearningPathMasteryRing.jsx
const RADIUS = 15.9155;

export default function LearningPathMasteryRing({ model }) {
	return (
		<div className={`learning-path-mastery-ring learning-path-mastery-ring--${model.appearance}`} role="img" aria-label={model.accessibleLabel}>
			<svg viewBox="0 0 36 36" aria-hidden="true">
				<circle className="learning-path-mastery-ring__background" cx="18" cy="18" r={RADIUS} />
				<circle className="learning-path-mastery-ring__value" cx="18" cy="18" r={RADIUS} strokeDasharray={`${model.percentage} 100`} />
			</svg>
			<span>{model.displayValue}</span>
		</div>
	);
}

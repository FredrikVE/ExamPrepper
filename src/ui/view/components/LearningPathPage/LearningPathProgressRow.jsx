// src/ui/view/components/LearningPathPage/LearningPathProgressRow.jsx
export default function LearningPathProgressRow({ model }) {
	return (
		<span className={`learning-path-progress-row learning-path-progress-row--${model.appearance}`}>
			<span className="learning-path-progress-row__label">{model.label}</span>
			<span className="learning-path-progress-row__track" aria-hidden="true"><span style={{ width: `${model.percentage}%` }} /></span>
			<span className="learning-path-progress-row__value">{model.displayValue}</span>
		</span>
	);
}

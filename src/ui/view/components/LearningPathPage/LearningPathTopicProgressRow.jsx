//src/ui/view/components/LearningPathPage/LearningPathTopicProgressRow.jsx
export default function LearningPathTopicProgressRow({ model }) {
	const percentage = model.percentage ?? 0;
	return (
		<div className={`learning-path-topic-progress learning-path-topic-progress--${model.appearance}`}>
			<span className="learning-path-topic-progress__dot" aria-hidden="true" />
			<span className="learning-path-topic-progress__label">{model.label}</span>
			<span className="learning-path-topic-progress__track" aria-hidden="true"><span style={{ width: `${percentage}%` }} /></span>
			<span className="learning-path-topic-progress__value">{model.percentageLabel}</span>
		</div>
	);
}

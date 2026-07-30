//src/ui/view/components/LearningPathPage/LearningPathNode.jsx
import LearningPathStatusIcon from "./LearningPathIcons.jsx";

export default function LearningPathNode({ model }) {
	return (
		<div className={`learning-path-node learning-path-node--${model.appearance}`} role="img" aria-label={model.label} aria-current={model.isCurrentStep ? "step" : undefined}>
			<LearningPathStatusIcon iconKey={model.iconKey} fallbackValue={model.value} />
		</div>
	);
}

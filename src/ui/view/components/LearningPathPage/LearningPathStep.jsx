//src/ui/view/components/LearningPathPage/LearningPathStep.jsx
import LearningPathModuleCard from "./LearningPathModuleCard.jsx";
import LearningPathModuleDetail from "./LearningPathModuleDetail.jsx";
import LearningPathNode from "./LearningPathNode.jsx";

export default function LearningPathStep({ model, onModuleToggle, onActionPressed, registerModuleElement }) {
	return (
		<div ref={(element) => registerModuleElement(model.id, element)} className={`learning-path-step learning-path-step--${model.appearance}`} data-learning-path-module-id={model.id}>
			<div className="learning-path-step__node"><LearningPathNode model={model.nodeModel} /></div>
			<LearningPathModuleCard model={model.cardModel} onPressed={() => onModuleToggle(model.id)} />
			{model.detailModel === null ? null : <LearningPathModuleDetail model={model.detailModel} onActionPressed={onActionPressed} />}
		</div>
	);
}

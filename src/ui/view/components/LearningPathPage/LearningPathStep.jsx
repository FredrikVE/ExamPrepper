// src/ui/view/components/LearningPathPage/LearningPathStep.jsx
import LearningPathModuleCard from "./LearningPathModuleCard.jsx";
import LearningPathModuleDetail from "./LearningPathModuleDetail.jsx";
import LearningPathNode from "./LearningPathNode.jsx";

export default function LearningPathStep(props) {
	const { model, onModuleToggle, onActionPressed, onChapterTestSelected, registerModuleElement } = props;

	const registerElement = (element) => {
		registerModuleElement(model.id, element);
	};

	const toggleModule = () => {
		onModuleToggle(model.id);
	};

	let detail = null;

	if (model.detailModel !== null) {
		detail = (
			<LearningPathModuleDetail
				model={model.detailModel}
				onActionPressed={onActionPressed}
				onChapterTestSelected={onChapterTestSelected}
			/>
		);
	}

	return (
		<div
			ref={registerElement}
			className={`learning-path-step learning-path-step--${model.appearance}`}
			data-learning-path-module-id={model.id}
		>
			<div className="learning-path-step__node">
				<LearningPathNode model={model.nodeModel} />
			</div>

			<LearningPathModuleCard
				model={model.cardModel}
				onPressed={toggleModule}
			/>

			{detail}
		</div>
	);
}

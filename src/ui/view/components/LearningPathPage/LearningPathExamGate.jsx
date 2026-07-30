//src/ui/view/components/LearningPathPage/LearningPathExamGate.jsx
import { ChevronRight } from "lucide-react";
import LearningPathNode from "./LearningPathNode.jsx";

export default function LearningPathExamGate({ model }) {
	return (
		<div className={`learning-path-step learning-path-step--exam learning-path-step--${model.appearance}`}>
			<div className="learning-path-step__node"><LearningPathNode model={model.nodeModel} /></div>
			<div className={`learning-path-exam-gate learning-path-exam-gate--${model.appearance}`} aria-disabled={model.cardModel.isDisabled}>
				<span>
					<span className="learning-path-module-card__eyebrow">{model.cardModel.eyebrow}</span>
					<strong className="learning-path-module-card__title">{model.cardModel.title}</strong>
					<span className="learning-path-module-card__status">{model.cardModel.statusLabel}</span>
				</span>
				<ChevronRight aria-hidden="true" />
			</div>
		</div>
	);
}

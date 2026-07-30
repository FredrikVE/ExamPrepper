//src/ui/view/components/LearningPathPage/LearningPathModuleDetail.jsx
import { ArrowRight } from "lucide-react";
import LearningPathTopicProgressRow from "./LearningPathTopicProgressRow.jsx";

export default function LearningPathModuleDetail({ model, onStartPressed }) {
	return (
		<section className="learning-path-module-detail" aria-labelledby={model.headingId}>
			<h3 id={model.headingId}>{model.heading}</h3>
			{model.description === null ? null : <p className="learning-path-module-detail__description">{model.description}</p>}
			<div className="learning-path-module-detail__topics">
				{model.topics.map((topic) => <LearningPathTopicProgressRow key={topic.key} model={topic} />)}
			</div>
			<div className="learning-path-module-detail__actions">
				<button type="button" className="learning-path-module-detail__start" disabled={model.actionModel.isDisabled} onClick={onStartPressed}>
					<span>{model.actionModel.isStarting ? "…" : model.actionModel.label}</span>
					<ArrowRight aria-hidden="true" />
				</button>
			</div>
		</section>
	);
}

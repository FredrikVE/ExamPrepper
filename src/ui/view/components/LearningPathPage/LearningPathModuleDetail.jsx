// src/ui/view/components/LearningPathPage/LearningPathModuleDetail.jsx
import { ArrowRight } from "lucide-react";
import LearningPathProgressRow from "./LearningPathProgressRow.jsx";
import LearningPathSection from "./LearningPathSection.jsx";

export default function LearningPathModuleDetail({ model, onActionPressed, onChapterTestSelected }) {
	return (
		<section className="learning-path-module-detail" aria-labelledby={model.headingId}>
			<h3 id={model.headingId}>{model.heading}</h3>
			<LearningPathProgressRow model={model.progressModel} />
			<h3 className="learning-path-module-detail__sections-heading">{model.sectionsHeading}</h3>
			{model.description === null ? null : <p className="learning-path-module-detail__description">{model.description}</p>}
			<div className="learning-path-module-detail__sections">{model.sections.map((section) => <LearningPathSection key={section.id} model={section} onActionPressed={onActionPressed} onChapterTestSelected={onChapterTestSelected} />)}</div>
			{model.actionModel === null ? null : (
				<div className="learning-path-module-detail__actions">
					<button type="button" className="learning-path-module-detail__start" disabled={model.actionModel.isDisabled} onClick={() => onActionPressed(model.actionModel)}>
						<span>{model.actionModel.isPending ? "…" : model.actionModel.label}</span><ArrowRight aria-hidden="true" />
					</button>
				</div>
			)}
		</section>
	);
}

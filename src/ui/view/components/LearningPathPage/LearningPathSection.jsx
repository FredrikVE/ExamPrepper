// src/ui/view/components/LearningPathPage/LearningPathSection.jsx
import { ArrowRight } from "lucide-react";
import LearningPathChapterTestNode from "./LearningPathChapterTestNode.jsx";
import LearningPathSessionNode from "./LearningPathSessionNode.jsx";

export default function LearningPathSection({ model, onActionPressed, onChapterTestSelected }) {
	return (
		<section className="learning-path-section" aria-labelledby={`learning-path-section-${model.id}`}>
			<div className="learning-path-section__heading">
				<div><span>{model.eyebrow}</span><h4 id={`learning-path-section-${model.id}`}>{model.label}</h4></div>
				<small>{model.progressLabel}</small>
			</div>
			<ul className="learning-path-section__sessions">{model.sessions.map((session) => <LearningPathSessionNode key={session.planKey} model={session} onSelected={onActionPressed} />)}</ul>
			{model.actionModel === null ? null : (
				<button type="button" className="learning-path-section__action" disabled={model.actionModel.isDisabled} onClick={() => onActionPressed(model.actionModel)}>
					<span>{model.actionModel.isPending ? "…" : model.actionModel.label}</span><ArrowRight aria-hidden="true" />
				</button>
			)}
			{model.chapterTests.length === 0 ? null : <div className="learning-path-section__tests">{model.chapterTests.map((test) => <LearningPathChapterTestNode key={test.id} model={test} onSelected={onChapterTestSelected} />)}</div>}
		</section>
	);
}

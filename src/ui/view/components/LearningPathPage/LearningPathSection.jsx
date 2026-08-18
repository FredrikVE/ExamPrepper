import LearningPathChapterTestNode from "./LearningPathChapterTestNode.jsx";
import LearningPathSessionNode from "./LearningPathSessionNode.jsx";

export default function LearningPathSection({ model, onChapterTestSelected }) {
	return (
		<section className="learning-path-section" aria-labelledby={`learning-path-section-${model.id}`}>
			<div className="learning-path-section__heading">
				<div><span>{model.eyebrow}</span><h4 id={`learning-path-section-${model.id}`}>{model.label}</h4></div>
				<small>{model.progressLabel}</small>
			</div>
			<ul className="learning-path-section__sessions">{model.sessions.map((session) => <LearningPathSessionNode key={session.planKey} model={session} />)}</ul>
			{model.chapterTests.length === 0 ? null : <div className="learning-path-section__tests">{model.chapterTests.map((test) => <LearningPathChapterTestNode key={test.baseId} model={test} onSelected={onChapterTestSelected} />)}</div>}
		</section>
	);
}

//src/ui/view/components/LearningPathPage/LearningPathRoadmap.jsx
import LearningPathExamGate from "./LearningPathExamGate.jsx";
import LearningPathStep from "./LearningPathStep.jsx";

export default function LearningPathRoadmap({ model, onModuleToggle, onStartModule, registerModuleElement }) {
	return (
		<section className="learning-path-roadmap" aria-label={model.accessibleLabel}>
			{model.entries.map((entry) => entry.kind === "examGate"
				? <LearningPathExamGate key={entry.id} model={entry} />
				: <LearningPathStep key={entry.id} model={entry} onModuleToggle={onModuleToggle} onStartModule={onStartModule} registerModuleElement={registerModuleElement} />)}
		</section>
	);
}

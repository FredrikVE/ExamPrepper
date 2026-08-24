// src/ui/view/components/LearningPathPage/LearningPathRoadmap.jsx
import LearningPathExamGate from "./LearningPathExamGate.jsx";
import LearningPathStep from "./LearningPathStep.jsx";

export default function LearningPathRoadmap(props) {
	const { model, onModuleToggle, onActionPressed, onChapterTestSelected, registerModuleElement } = props;

	return (
		<section className="learning-path-roadmap" aria-label={model.accessibleLabel}>
			{model.entries.map((entry) => {
				if (entry.kind === "examGate") {
					return (
						<LearningPathExamGate
							key={entry.id}
							model={entry}
						/>
					);
				}

				return (
					<LearningPathStep
						key={entry.id}
						model={entry}
						onModuleToggle={onModuleToggle}
						onActionPressed={onActionPressed}
						onChapterTestSelected={onChapterTestSelected}
						registerModuleElement={registerModuleElement}
					/>
				);
			})}
		</section>
	);
}

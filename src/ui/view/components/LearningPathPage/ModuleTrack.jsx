//src/ui/view/components/LearningPathPage/ModuleTrack.jsx
import ModuleCard from "./ModuleCard.jsx";

export default function ModuleTrack({ modules, onModulePressed, onStartPressed, registerModuleElement }) {
	return (
		<section className="learning-path-module-track" aria-label="Learning modules">
			{modules.map((model) => (
				<ModuleCard key={model.id} model={model} onModulePressed={onModulePressed} onStartPressed={onStartPressed} registerModuleElement={registerModuleElement} />
			))}
		</section>
	);
}

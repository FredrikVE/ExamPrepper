//src/ui/view/components/LearningPathPage/ModuleCard.jsx
export default function ModuleCard({ model, onModulePressed, onStartPressed, registerModuleElement }) {
	return (
		<article ref={(element) => registerModuleElement(model.id, element)} className={`learning-path-module-card learning-path-module-card--${model.statusAppearance}`}>
			<button type="button" className="learning-path-module-summary" aria-expanded={model.isExpanded} onClick={() => onModulePressed(model.id)}>
				<span className="learning-path-module-position">{model.position}</span>
				<span className="learning-path-module-heading">
					<strong>{model.title}</strong>
					<span>{model.statusLabel}</span>
				</span>
				<span>{model.masteryLabel}</span>
			</button>
			{model.isExpanded ? (
				<div className="learning-path-module-details">
					{model.description === null ? null : <p>{model.description}</p>}
					<ul>{model.topicLabels.map((label) => <li key={label}>{label}</li>)}</ul>
					<p>{model.roundLabel}</p>
					<button type="button" disabled={model.isStartDisabled} onClick={() => onStartPressed(model.id)}>{model.isStarting ? "…" : model.startLabel}</button>
				</div>
			) : null}
		</article>
	);
}

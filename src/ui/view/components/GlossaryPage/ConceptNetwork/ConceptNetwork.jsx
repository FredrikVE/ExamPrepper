// src/ui/view/components/GlossaryPage/ConceptNetwork/ConceptNetwork.jsx
import MasteryBadge from "../Mastery/MasteryBadge.jsx";

const CENTER_POSITION = Object.freeze({ x: 50, y: 50 });
const NEIGHBOR_POSITIONS = Object.freeze([
	Object.freeze({ x: 50, y: 12 }),
	Object.freeze({ x: 77, y: 23 }),
	Object.freeze({ x: 86, y: 50 }),
	Object.freeze({ x: 77, y: 77 }),
	Object.freeze({ x: 50, y: 88 }),
	Object.freeze({ x: 23, y: 77 }),
	Object.freeze({ x: 14, y: 50 }),
	Object.freeze({ x: 23, y: 23 })
]);

export default function ConceptNetwork({ model, title, instructions, closeLabel, onSelectConcept, onClose }) {
	if (model === null) {
		return null;
	}

	const positionByKey = createPositionByKey(model);
	const visibleRelations = model.relations.filter((relation) => {
		return positionByKey.has(relation.sourceGlossaryKey)
			&& positionByKey.has(relation.targetGlossaryKey);
	});

	return (
		<section className="concept-network" aria-labelledby="concept-network-title">
			<header className="concept-network__header">
				<div>
					<h3 id="concept-network-title">{title}</h3>
					<p>{instructions}</p>
				</div>
				<button type="button" className="concept-network__close" onClick={onClose}>
					{closeLabel}
				</button>
			</header>

			<div className="concept-network__canvas">
				<svg className="concept-network__edges" viewBox="0 0 100 100" aria-hidden="true" preserveAspectRatio="none">
					<defs>
						<marker id="concept-network-arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
							<path d="M 0 0 L 5 2.5 L 0 5 z" />
						</marker>
					</defs>
					{visibleRelations.map((relation) => {
						const source = positionByKey.get(relation.sourceGlossaryKey);
						const target = positionByKey.get(relation.targetGlossaryKey);

						return (
							<line
								key={`${relation.sourceGlossaryKey}:${relation.type}:${relation.targetGlossaryKey}`}
								x1={source.x}
								y1={source.y}
								x2={target.x}
								y2={target.y}
								className="concept-network__edge"
								data-relation-type={relation.type}
								markerEnd={relation.isDirectional ? "url(#concept-network-arrow)" : undefined}
							/>
						);
					})}
				</svg>

				<NetworkNode node={model.center} position={CENTER_POSITION} isCenter={true} onSelectConcept={onSelectConcept} />
				{model.nodes.map((node, index) => (
					<NetworkNode
						key={node.glossaryEntryKey}
						node={node}
						position={NEIGHBOR_POSITIONS[index]}
						isCenter={false}
						onSelectConcept={onSelectConcept}
					/>
				))}
			</div>

			<ul className="concept-network__relation-list" aria-label={title}>
				{visibleRelations.map((relation) => (
					<li key={`${relation.sourceGlossaryKey}:${relation.type}:${relation.targetGlossaryKey}:label`}>
						<span>{resolveNodeTerm(model, relation.sourceGlossaryKey)}</span>
						<strong>{relation.label}</strong>
						<span>{resolveNodeTerm(model, relation.targetGlossaryKey)}</span>
					</li>
				))}
			</ul>
		</section>
	);
}

function NetworkNode({ node, position, isCenter, onSelectConcept }) {
	const className = isCenter
		? "concept-network__node concept-network__node--center"
		: "concept-network__node";

	return (
		<button
			type="button"
			className={className}
			data-mastery-status={node.mastery.status}
			style={{ left: `${position.x}%`, top: `${position.y}%` }}
			onClick={() => onSelectConcept(node.glossaryEntryKey)}
			disabled={isCenter}
		>
			<strong>{node.term}</strong>
			<span>{node.chapterLabel}</span>
			<MasteryBadge mastery={node.mastery} />
		</button>
	);
}

function createPositionByKey(model) {
	const positionByKey = new Map();
	positionByKey.set(model.center.glossaryEntryKey, CENTER_POSITION);

	for (let index = 0; index < model.nodes.length && index < NEIGHBOR_POSITIONS.length; index += 1) {
		positionByKey.set(model.nodes[index].glossaryEntryKey, NEIGHBOR_POSITIONS[index]);
	}

	return positionByKey;
}

function resolveNodeTerm(model, glossaryEntryKey) {
	if (model.center.glossaryEntryKey === glossaryEntryKey) {
		return model.center.term;
	}

	for (const node of model.nodes) {
		if (node.glossaryEntryKey === glossaryEntryKey) {
			return node.term;
		}
	}

	return glossaryEntryKey;
}

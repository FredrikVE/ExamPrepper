// src/ui/view/components/GlossaryPage/ConceptNetwork/ConceptNetwork.jsx
import MasteryBadge from "../Mastery/MasteryBadge.jsx";

export default function ConceptNetwork({ model, title, instructions, centerLabel, emptyLabel, directAssociationLabel, secondaryAssociationLabel }) {
	if (model === null) {
		return null;
	}

	return (
		<section className="concept-network" aria-labelledby={`concept-network-title-${model.center.glossaryEntryKey}`}>
			<header className="concept-network__header">
				<div>
					<h3 id={`concept-network-title-${model.center.glossaryEntryKey}`}>{title}</h3>
					<p>{instructions}</p>
				</div>
			</header>

			{model.nodes.length === 0 ? (
				<div className="concept-network__empty" role="status">
					{emptyLabel}
				</div>
			) : (
				<>
					<div className="concept-network__canvas">
						<svg className="concept-network__edges" viewBox="0 0 100 100" aria-hidden="true" focusable="false" preserveAspectRatio="none">
							<defs>
								<marker id="concept-network-arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
									<path d="M 0 0 L 5 2.5 L 0 5 z" />
								</marker>
							</defs>
							{model.edges.map((edge) => (
								<line
									key={edge.key}
									x1={edge.sourcePosition.x}
									y1={edge.sourcePosition.y}
									x2={edge.targetPosition.x}
									y2={edge.targetPosition.y}
									className="concept-network__edge"
									data-edge-role={edge.edgeRole}
									data-relation-type={edge.relationType}
									markerEnd={edge.markerEnd}
								/>
							))}
						</svg>

						<NetworkNode node={model.center} centerLabel={centerLabel} />
						{model.nodes.map((node) => <NetworkNode key={node.glossaryEntryKey} node={node} centerLabel={centerLabel} />)}
					</div>

					<div className="concept-network__legend" aria-hidden="true">
						<span className="concept-network__legend-item">
							<span className="concept-network__legend-line" />
							<span>{directAssociationLabel}</span>
						</span>
						{model.hasSecondaryEdges ? (
							<span className="concept-network__legend-item">
								<span className="concept-network__legend-line concept-network__legend-line--secondary" />
								<span>{secondaryAssociationLabel}</span>
							</span>
						) : null}
					</div>
				</>
			)}

			<ul className="concept-network__relation-list" aria-label={title}>
				{model.relationItems.map((relationItem) => (
					<li key={`${relationItem.key}:label`}>
						<span>{relationItem.sourceTerm}</span>
						<strong>{relationItem.label}</strong>
						<span>{relationItem.targetTerm}</span>
					</li>
				))}
			</ul>
		</section>
	);
}

function NetworkNode({ node, centerLabel }) {
	if (node.kind === "CENTER") {
		return (
			<div className={node.className} data-mastery-status={node.mastery.status} style={node.style} aria-hidden="true">
				<span className="concept-network__node-meta">{centerLabel}</span>
				<strong>{node.term}</strong>
				<span>{node.chapterLabel}</span>
				<MasteryBadge mastery={node.mastery} />
			</div>
		);
	}

	return (
		<button
			type="button"
			className={node.className}
			data-mastery-status={node.mastery.status}
			style={node.style}
			onClick={node.onActivate}
		>
			<strong>{node.term}</strong>
			<span>{node.chapterLabel}</span>
			<MasteryBadge mastery={node.mastery} />
		</button>
	);
}

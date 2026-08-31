// src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailGraph.jsx
import { Network } from "lucide-react";
import { GLOSSARY_NETWORK_DISPLAY_KIND } from "../../../../viewmodel/GlossaryPage/glossaryNetworkModel.js";

export default function GlossaryDetailGraph({ model, isInteractive }) {
	return (
		<section className="glossary-detail-modal__graph-card">
			<h3 className="glossary-detail__section-heading">
				<Network className="glossary-detail-modal__section-icon" aria-hidden="true" />
				<span>{model.heading}</span>
			</h3>

			<GraphContent
				model={model}
				isInteractive={isInteractive}
			/>
		</section>
	);
}

function GraphContent({ model, isInteractive }) {
	if (model.display.kind === GLOSSARY_NETWORK_DISPLAY_KIND.LOADING) {
		return (
			<p className="glossary-detail-modal__graph-status" role="status">
				{model.display.message}
			</p>
		);
	}

	if (model.display.kind === GLOSSARY_NETWORK_DISPLAY_KIND.ERROR) {
		return (
			<p className="glossary-detail-modal__graph-status" role="alert">
				{model.display.message}
			</p>
		);
	}

	const graph = model.display.detailGraph;

	if (graph.nodes.length === 0) {
		return (
			<div className="glossary-detail-modal__graph-empty" role="status">
				{model.display.emptyLabel}
			</div>
		);
	}

	return (
		<>
			<div className="glossary-detail-modal__graph-canvas">
				<svg
					className="glossary-detail-modal__graph-edges"
					viewBox="0 0 100 100"
					preserveAspectRatio="none"
					aria-hidden="true"
					focusable="false"
				>
					{graph.edges.map((edge) => (
						<line
							key={edge.key}
							x1={edge.sourcePosition.x}
							y1={edge.sourcePosition.y}
							x2={edge.targetPosition.x}
							y2={edge.targetPosition.y}
							className="glossary-detail-modal__graph-edge"
							data-edge-role={edge.edgeRole}
							data-relation-type={edge.relationType}
						/>
					))}
				</svg>

				<svg className="glossary-detail-modal__graph-nodes">
					<GraphNodeAnchor position={graph.center.position}>
						<div
							className="glossary-detail-modal__graph-node glossary-detail-modal__graph-node--center"
							aria-hidden="true"
						>
							<span className="glossary-detail-modal__graph-node-meta">
								{model.display.centerLabel}
							</span>
							<strong>{graph.center.term}</strong>
							<span className="glossary-detail-modal__graph-node-chapter">
								{graph.center.chapterLabel}
							</span>
						</div>
					</GraphNodeAnchor>

					{graph.nodes.map((node) => (
						<GraphNodeAnchor key={node.glossaryEntryKey} position={node.position}>
							<GraphNode node={node} isInteractive={isInteractive} />
						</GraphNodeAnchor>
					))}
				</svg>
			</div>

			<ul className="sr-only" aria-label={model.heading}>
				{graph.relationItems.map((relationItem) => (
					<li key={`${relationItem.key}:detail-summary`}>
						<span>{relationItem.sourceTerm}</span>
						<strong>{relationItem.label}</strong>
						<span>{relationItem.targetTerm}</span>
					</li>
				))}
			</ul>
		</>
	);
}

function GraphNodeAnchor({ position, children }) {
	return (
		<foreignObject
			className="glossary-detail-modal__graph-node-anchor"
			x={`${position.x}%`}
			y={`${position.y}%`}
		>
			{children}
		</foreignObject>
	);
}

function GraphNode({ node, isInteractive }) {
	const content = (
		<>
			<strong>{node.term}</strong>
			<span className="glossary-detail-modal__graph-node-chapter">
				{node.chapterLabel}
			</span>
		</>
	);

	if (!isInteractive) {
		return (
			<div className="glossary-detail-modal__graph-node">
				{content}
			</div>
		);
	}

	return (
		<button
			type="button"
			className="glossary-detail-modal__graph-node"
			onClick={node.onActivate}
		>
			{content}
		</button>
	);
}

// src/ui/viewmodel/GlossaryPage/glossaryNetworkModel.js
import { LOAD_STATUS } from "../LoadState/loadStatus.js";
import { createGlossaryMasteryPresentation } from "./glossaryMasteryModel.js";

export const GLOSSARY_NETWORK_DISPLAY_KIND = Object.freeze({
	HIDDEN: "hidden",
	LOADING: "loading",
	ERROR: "error",
	CONTENT: "content"
});

const CENTER_POSITION = Object.freeze({ x: 50, y: 50 });
const NEIGHBOR_POSITIONS = Object.freeze([
	Object.freeze({ x: 50, y: 13 }),
	Object.freeze({ x: 77, y: 24 }),
	Object.freeze({ x: 86, y: 50 }),
	Object.freeze({ x: 77, y: 76 }),
	Object.freeze({ x: 50, y: 87 }),
	Object.freeze({ x: 23, y: 76 }),
	Object.freeze({ x: 14, y: 50 }),
	Object.freeze({ x: 23, y: 24 })
]);

export function createGlossaryNetworkPresentation({ network, language, topicAreaReferenceByKey, formatDate, t }) {
	if (network === null) {
		return null;
	}

	const center = createNetworkNode(network.center, CENTER_POSITION, true, language, topicAreaReferenceByKey, formatDate, t);
	const nodes = [];
	const neighborLimit = Math.min(network.limit, NEIGHBOR_POSITIONS.length);
	for (let index = 0; index < network.nodes.length && index < neighborLimit; index += 1) {
		nodes.push(createNetworkNode(
			network.nodes[index],
			NEIGHBOR_POSITIONS[index],
			false,
			language,
			topicAreaReferenceByKey,
			formatDate,
			t
		));
	}

	const visibleNodeByKey = createVisibleNodeByKey(center, nodes);
	const edges = [];
	const relationItems = [];
	let hasSecondaryEdges = false;

	for (const relation of network.relations) {
		const source = visibleNodeByKey.get(relation.sourceGlossaryKey);
		const target = visibleNodeByKey.get(relation.targetGlossaryKey);
		if (!source || !target) {
			continue;
		}

		const edgeRole = relation.sourceGlossaryKey === center.glossaryEntryKey || relation.targetGlossaryKey === center.glossaryEntryKey
			? "DIRECT"
			: "SECONDARY";
		const isDirectional = relation.type === "prerequisite" || relation.type === "part-of";
		const key = `${relation.sourceGlossaryKey}:${relation.type}:${relation.targetGlossaryKey}`;

		edges.push({
			key,
			sourcePosition: source.position,
			targetPosition: target.position,
			edgeRole,
			relationType: relation.type,
			isDirectional,
			markerEnd: isDirectional ? "url(#concept-network-arrow)" : undefined
		});
		relationItems.push({
			key,
			sourceTerm: source.term,
			label: resolveRelationLabel(relation.type, t),
			targetTerm: target.term
		});

		if (edgeRole === "SECONDARY") {
			hasSecondaryEdges = true;
		}
	}

	return {
		center,
		nodes,
		edges,
		relationItems,
		hasSecondaryEdges,
		limit: network.limit,
		depth: network.depth
	};
}

export function createGlossaryNetworkDisplay({ expandedGlossaryEntryKey, loadStatus, network, error }) {
	if (expandedGlossaryEntryKey === null) {
		return Object.freeze({ kind: GLOSSARY_NETWORK_DISPLAY_KIND.HIDDEN });
	}

	if (loadStatus === LOAD_STATUS.LOADING) {
		return Object.freeze({ kind: GLOSSARY_NETWORK_DISPLAY_KIND.LOADING });
	}

	if (loadStatus === LOAD_STATUS.ERROR) {
		return Object.freeze({
			kind: GLOSSARY_NETWORK_DISPLAY_KIND.ERROR,
			message: error
		});
	}

	if (network === null) {
		throw new Error("Glossary network load is ready without network data.");
	}

	return Object.freeze({
		kind: GLOSSARY_NETWORK_DISPLAY_KIND.CONTENT,
		model: network
	});
}

function createVisibleNodeByKey(center, nodes) {
	const nodeByKey = new Map([[center.glossaryEntryKey, center]]);
	for (const node of nodes) {
		nodeByKey.set(node.glossaryEntryKey, node);
	}
	return nodeByKey;
}

function createNetworkNode(concept, position, isCenter, language, topicAreaReferenceByKey, formatDate, t) {
	return {
		kind: isCenter ? "CENTER" : "NEIGHBOR",
		className: isCenter ? "concept-network__node concept-network__node--center" : "concept-network__node",
		style: { left: `${position.x}%`, top: `${position.y}%` },
		glossaryEntryKey: concept.glossaryEntryKey,
		topicAreaKey: concept.topicAreaKey,
		term: resolveLocalizedText(concept.term, language),
		chapterLabel: topicAreaReferenceByKey.get(concept.topicAreaKey) ?? "",
		mastery: createGlossaryMasteryPresentation(concept.mastery, formatDate, t),
		position
	};
}

function resolveRelationLabel(type, t) {
	if (type === "contrasts-with") {
		return t.glossaryPageRelationContrastsWithLabel;
	}
	if (type === "prerequisite") {
		return t.glossaryPageRelationPrerequisiteLabel;
	}
	if (type === "part-of") {
		return t.glossaryPageRelationPartOfLabel;
	}
	return t.glossaryPageRelationRelatedLabel;
}

function resolveLocalizedText(localizedText, language) {
	return localizedText?.[language]
		?? localizedText?.no
		?? localizedText?.en
		?? "";
}

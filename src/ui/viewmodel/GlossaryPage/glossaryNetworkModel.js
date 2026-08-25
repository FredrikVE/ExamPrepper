// src/ui/viewmodel/GlossaryPage/glossaryNetworkModel.js
import { DIRECTED_GLOSSARY_RELATION_TYPES, GLOSSARY_RELATION_TYPE } from "../../../constants/GlossaryContracts.js";
import { resolveLocalizedText } from "./resolveLocalizedText.js";
import { LOAD_STATUS } from "../LoadState/loadStatus.js";
import { requireTopicAreaReference } from "./glossaryLookups.js";
import { createGlossaryMasteryPresentation } from "./glossaryMasteryModel.js";

export const GLOSSARY_NETWORK_DISPLAY_KIND = Object.freeze({
	HIDDEN: "hidden",
	LOADING: "loading",
	ERROR: "error",
	CONTENT: "content"
});

export const GLOSSARY_NETWORK_NODE_KIND = Object.freeze({
	CENTER: "CENTER",
	NEIGHBOR: "NEIGHBOR"
});

export const GLOSSARY_NETWORK_EDGE_ROLE = Object.freeze({
	DIRECT: "DIRECT",
	SECONDARY: "SECONDARY"
});

const RELATION_LABEL_KEY = Object.freeze({
	[GLOSSARY_RELATION_TYPE.RELATED]: "glossaryPageRelationRelatedLabel",
	[GLOSSARY_RELATION_TYPE.CONTRASTS_WITH]: "glossaryPageRelationContrastsWithLabel",
	[GLOSSARY_RELATION_TYPE.PREREQUISITE]: "glossaryPageRelationPrerequisiteLabel",
	[GLOSSARY_RELATION_TYPE.PART_OF]: "glossaryPageRelationPartOfLabel"
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

export function createGlossaryNetworkPresentation({ network, language, topicAreaReferenceByKey, t }) {
	if (network === null) {
		return null;
	}

	const center = createNetworkNode(network.center, CENTER_POSITION, true, language, topicAreaReferenceByKey, t);
	const nodes = [];
	for (let index = 0; index < network.nodes.length && index < NEIGHBOR_POSITIONS.length; index += 1) {
		nodes.push(createNetworkNode(network.nodes[index], NEIGHBOR_POSITIONS[index], false, language, topicAreaReferenceByKey, t));
	}

	const visibleNodeByKey = createVisibleNodeByKey(center, nodes);
	const edges = [];
	const relationItems = [];
	let hasSecondaryEdges = false;

	for (const relation of network.relations) {
		const source = visibleNodeByKey.get(relation.sourceGlossaryKey);
		const target = visibleNodeByKey.get(relation.targetGlossaryKey);
		if (source === undefined || target === undefined) {
			continue;
		}

		const edgeRole = relation.sourceGlossaryKey === center.glossaryEntryKey || relation.targetGlossaryKey === center.glossaryEntryKey
			? GLOSSARY_NETWORK_EDGE_ROLE.DIRECT
			: GLOSSARY_NETWORK_EDGE_ROLE.SECONDARY;
		const isDirectional = DIRECTED_GLOSSARY_RELATION_TYPES.includes(relation.type);
		const key = `${relation.sourceGlossaryKey}:${relation.type}:${relation.targetGlossaryKey}`;

		edges.push({
			key,
			sourcePosition: source.position,
			targetPosition: target.position,
			edgeRole,
			relationType: relation.type,
			isDirectional
		});
		relationItems.push({
			key,
			sourceTerm: source.term,
			label: resolveRelationLabel(relation.type, t),
			targetTerm: target.term
		});

		if (edgeRole === GLOSSARY_NETWORK_EDGE_ROLE.SECONDARY) {
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
		return Object.freeze({ kind: GLOSSARY_NETWORK_DISPLAY_KIND.ERROR, message: error });
	}

	if (network === null) {
		throw new Error("Glossary network load is ready without network data.");
	}

	return Object.freeze({ kind: GLOSSARY_NETWORK_DISPLAY_KIND.CONTENT, model: network });
}

function createVisibleNodeByKey(center, nodes) {
	const nodeByKey = new Map([[center.glossaryEntryKey, center]]);
	for (const node of nodes) {
		nodeByKey.set(node.glossaryEntryKey, node);
	}
	return nodeByKey;
}

function createNetworkNode(concept, position, isCenter, language, topicAreaReferenceByKey, t) {
	return {
		kind: isCenter ? GLOSSARY_NETWORK_NODE_KIND.CENTER : GLOSSARY_NETWORK_NODE_KIND.NEIGHBOR,
		className: isCenter ? "concept-network__node concept-network__node--center" : "concept-network__node",
		style: { left: `${position.x}%`, top: `${position.y}%` },
		glossaryEntryKey: concept.glossaryEntryKey,
		topicAreaKey: concept.topicAreaKey,
		term: resolveLocalizedText(concept.term, language),
		chapterLabel: requireTopicAreaReference(topicAreaReferenceByKey, concept.topicAreaKey),
		mastery: createGlossaryMasteryPresentation(concept.mastery, t),
		position
	};
}

function resolveRelationLabel(type, t) {
	const labelKey = RELATION_LABEL_KEY[type];
	if (labelKey === undefined) {
		throw new Error(`Unknown glossary relation type: ${String(type)}`);
	}
	return t[labelKey];
}

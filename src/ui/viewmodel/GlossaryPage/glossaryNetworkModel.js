// src/ui/viewmodel/GlossaryPage/glossaryNetworkModel.js
import { createGlossaryMasteryPresentation } from "./glossaryMasteryModel.js";

export function createGlossaryNetworkPresentation({ network, language, topicAreaReferenceByKey, formatDate, t }) {
	if (network === null) {
		return null;
	}

	const nodes = [];
	const neighborLimit = Math.min(network.limit, 8);
	for (let index = 0; index < network.nodes.length && index < neighborLimit; index += 1) {
		nodes.push(createNetworkNode(network.nodes[index], language, topicAreaReferenceByKey, formatDate, t));
	}

	const relations = [];
	for (const relation of network.relations) {
		relations.push({
			...relation,
			label: resolveRelationLabel(relation.type, t),
			isDirectional: relation.type === "prerequisite" || relation.type === "part-of"
		});
	}

	return {
		center: createNetworkNode(network.center, language, topicAreaReferenceByKey, formatDate, t),
		nodes,
		relations,
		limit: network.limit,
		depth: network.depth
	};
}

function createNetworkNode(concept, language, topicAreaReferenceByKey, formatDate, t) {
	return {
		glossaryEntryKey: concept.glossaryEntryKey,
		term: resolveLocalizedText(concept.term, language),
		chapterLabel: topicAreaReferenceByKey.get(concept.topicAreaKey) ?? "",
		mastery: createGlossaryMasteryPresentation(concept.mastery, formatDate, t)
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

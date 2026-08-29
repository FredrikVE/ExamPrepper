// src/ui/viewmodel/GlossaryPage/glossaryDetailModel.js
import { createGlossaryDetailGraphPresentation } from "./glossaryDetailGraphModel.js";
import { createGlossaryDetailNavigationPresentation } from "./glossaryDetailNavigationModel.js";
import { createGlossaryMasteryPresentation } from "./glossaryMasteryModel.js";
import { requireGlossaryEntry, requireTopicArea, requireTopicAreaReference } from "./glossaryLookups.js";
import { GLOSSARY_NETWORK_DISPLAY_KIND, resolveGlossaryRelationLabel } from "./glossaryNetworkModel.js";

export function createGlossaryDetailPresentation(params) {
	if (params.activeGlossaryEntryKey === null) {
		return null;
	}

	if (typeof params.areRelationsExpanded !== "boolean") {
		throw new Error("Glossary detail relation expansion state must be boolean.");
	}

	const activeEntry = requireGlossaryEntry(params.localizedEntryByKey, params.activeGlossaryEntryKey, "active detail entry");
	const topicArea = requireTopicArea(params.topicAreaByKey, activeEntry.topicAreaKey);
	const topicAreaReference = requireTopicAreaReference(params.topicAreaReferenceByKey, activeEntry.topicAreaKey);
	const associations = createAssociationPresentations(activeEntry, params.localizedEntryByKey);
	const associationLabel = associations.length === 1
		? params.t.glossaryPageSingleAssociationLabel
		: params.t.glossaryPageMultipleAssociationsLabel(associations.length);
	const detailNavigation = createGlossaryDetailNavigationPresentation({
		activeGlossaryEntryKey: params.activeGlossaryEntryKey,
		visibleGlossaryEntryKeys: params.visibleGlossaryEntryKeys,
		trailKeys: params.trailKeys,
		localizedEntryByKey: params.localizedEntryByKey,
		t: params.t
	});
	const networkDisplay = createGlossaryDetailNetworkPresentation({
		networkDisplay: params.networkDisplay,
		directAssociationCount: associations.length,
		t: params.t
	});
	const relations = createGlossaryDetailRelationsPresentation({
		activeEntry,
		localizedEntryByKey: params.localizedEntryByKey,
		networkDisplay: params.networkDisplay,
		areRelationsExpanded: params.areRelationsExpanded,
		t: params.t
	});

	return {
		header: {
			title: activeEntry.term,
			subtitle: params.t.glossaryPageDetailSubtitle(topicAreaReference, topicArea.label, associationLabel),
			closeLabel: params.t.glossaryPageDetailCloseLabel,
			trailBack: detailNavigation.trailBack
		},
		explanation: {
			heading: params.t.glossaryPageDetailExplanationHeading,
			text: activeEntry.explanation
		},
		network: {
			heading: params.t.glossaryPageDetailNetworkHeading,
			display: networkDisplay
		},
		associations: {
			heading: params.t.glossaryPageAssociatedWithLabel,
			emptyLabel: params.t.glossaryPageNoAssociationsLabel,
			items: associations
		},
		mastery: createGlossaryMasteryPresentation(activeEntry.mastery, params.t),
		relations,
		navigation: {
			ariaLabel: params.t.glossaryPageDetailNavigationAriaLabel,
			positionLabel: detailNavigation.sequence.positionLabel,
			previous: detailNavigation.sequence.previous,
			next: detailNavigation.sequence.next
		}
	};
}

function createAssociationPresentations(activeEntry, localizedEntryByKey) {
	const associations = [];

	for (const glossaryEntryKey of activeEntry.directNeighborGlossaryKeys) {
		const neighbor = requireGlossaryEntry(localizedEntryByKey, glossaryEntryKey, "detail association");
		associations.push({
			glossaryEntryKey,
			label: neighbor.term
		});
	}

	return associations;
}

function createGlossaryDetailNetworkPresentation(params) {
	if (params.networkDisplay.kind === GLOSSARY_NETWORK_DISPLAY_KIND.LOADING) {
		return {
			kind: GLOSSARY_NETWORK_DISPLAY_KIND.LOADING,
			message: params.t.glossaryPageNetworkLoadingLabel
		};
	}

	if (params.networkDisplay.kind === GLOSSARY_NETWORK_DISPLAY_KIND.ERROR) {
		return {
			kind: GLOSSARY_NETWORK_DISPLAY_KIND.ERROR,
			message: params.networkDisplay.message
		};
	}

	if (params.networkDisplay.kind !== GLOSSARY_NETWORK_DISPLAY_KIND.CONTENT) {
		throw new Error(`Glossary detail requires a visible network state, received: ${params.networkDisplay.kind}`);
	}

	const overflowCount = Math.max(0, params.directAssociationCount - params.networkDisplay.model.nodes.length);
	return {
		kind: GLOSSARY_NETWORK_DISPLAY_KIND.CONTENT,
		model: params.networkDisplay.model,
		detailGraph: createGlossaryDetailGraphPresentation(params.networkDisplay.model),
		instructions: null,
		centerLabel: params.t.glossaryPageNetworkCenterLabel,
		emptyLabel: params.t.glossaryPageNetworkEmptyLabel,
		directAssociationLabel: params.t.glossaryPageNetworkDirectAssociationLabel,
		secondaryAssociationLabel: params.t.glossaryPageNetworkSecondaryAssociationLabel,
		limitNote: overflowCount > 0 ? params.t.glossaryPageNetworkLimitLabel(overflowCount) : null
	};
}

function createGlossaryDetailRelationsPresentation(params) {
	let display;

	if (params.networkDisplay.kind === GLOSSARY_NETWORK_DISPLAY_KIND.LOADING) {
		display = {
			kind: GLOSSARY_NETWORK_DISPLAY_KIND.LOADING,
			message: params.t.glossaryPageDetailRelationsLoadingLabel
		};
	}

	else if (params.networkDisplay.kind === GLOSSARY_NETWORK_DISPLAY_KIND.ERROR) {
		display = {
			kind: GLOSSARY_NETWORK_DISPLAY_KIND.ERROR,
			message: params.networkDisplay.message
		};
	}

	else if (params.networkDisplay.kind === GLOSSARY_NETWORK_DISPLAY_KIND.CONTENT) {
		display = createGlossaryDetailRelationsContentPresentation(params);
	}

	else {
		throw new Error(`Glossary detail relations require a visible network state, received: ${params.networkDisplay.kind}`);
	}

	return {
		ariaLabel: params.t.glossaryPageDetailRelationsHeading,
		contentId: `glossary-detail-relations-${params.activeEntry.glossaryEntryKey}`,
		contentHeading: params.t.glossaryPageDetailRelatedConceptsHeading,
		openLabel: params.t.glossaryPageDetailRelationsOpenLabel,
		closeLabel: params.t.glossaryPageDetailRelationsCloseLabel,
		isExpanded: params.areRelationsExpanded,
		display
	};
}

function createGlossaryDetailRelationsContentPresentation(params) {
	const relationByNeighborKey = new Map();

	for (const relation of params.networkDisplay.model.directRelations) {
		const neighborGlossaryEntryKey = resolveDirectRelationNeighborKey(
			relation,
			params.activeEntry.glossaryEntryKey
		);

		if (relationByNeighborKey.has(neighborGlossaryEntryKey)) {
			throw new Error(`Multiple direct glossary relations found for neighbor: ${neighborGlossaryEntryKey}`);
		}

		relationByNeighborKey.set(neighborGlossaryEntryKey, relation);
	}

	const items = [];

	for (const neighborGlossaryEntryKey of params.activeEntry.directNeighborGlossaryKeys) {
		const relation = relationByNeighborKey.get(neighborGlossaryEntryKey);

		if (relation === undefined) {
			throw new Error(`Missing direct glossary relation for neighbor: ${neighborGlossaryEntryKey}`);
		}

		const neighbor = requireGlossaryEntry(
			params.localizedEntryByKey,
			neighborGlossaryEntryKey,
			"detail relation"
		);

		items.push({
			glossaryEntryKey: neighborGlossaryEntryKey,
			label: neighbor.term,
			relationType: relation.type,
			relationLabel: resolveGlossaryRelationLabel(relation.type, params.t),
			sourceGlossaryEntryKey: relation.sourceGlossaryKey,
			targetGlossaryEntryKey: relation.targetGlossaryKey
		});
	}

	if (relationByNeighborKey.size !== items.length) {
		throw new Error("Glossary detail direct relations do not match overview associations.");
	}

	return {
		kind: GLOSSARY_NETWORK_DISPLAY_KIND.CONTENT,
		emptyLabel: params.t.glossaryPageDetailRelationsEmptyLabel,
		items
	};
}

function resolveDirectRelationNeighborKey(relation, activeGlossaryEntryKey) {
	if (relation.sourceGlossaryKey === activeGlossaryEntryKey) {
		return relation.targetGlossaryKey;
	}

	if (relation.targetGlossaryKey === activeGlossaryEntryKey) {
		return relation.sourceGlossaryKey;
	}

	throw new Error(
		`Direct glossary relation does not reference active entry: ${activeGlossaryEntryKey}`
	);
}

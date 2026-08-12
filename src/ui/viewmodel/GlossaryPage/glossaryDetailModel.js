// src/ui/viewmodel/GlossaryPage/glossaryDetailModel.js
import { createGlossaryDetailNavigationPresentation } from "./glossaryDetailNavigationModel.js";
import { requireGlossaryEntry, requireTopicArea, requireTopicAreaReference } from "./glossaryLookups.js";
import { GLOSSARY_NETWORK_DISPLAY_KIND } from "./glossaryNetworkModel.js";

export function createGlossaryDetailPresentation(params) {
	if (params.activeGlossaryEntryKey === null) {
		return null;
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
			display: createGlossaryDetailNetworkPresentation({
				networkDisplay: params.networkDisplay,
				directAssociationCount: associations.length,
				t: params.t
			})
		},
		associations: {
			heading: params.t.glossaryPageAssociatedWithLabel,
			emptyLabel: params.t.glossaryPageNoAssociationsLabel,
			items: associations
		},
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
		instructions: null,
		centerLabel: params.t.glossaryPageNetworkCenterLabel,
		emptyLabel: params.t.glossaryPageNetworkEmptyLabel,
		directAssociationLabel: params.t.glossaryPageNetworkDirectAssociationLabel,
		secondaryAssociationLabel: params.t.glossaryPageNetworkSecondaryAssociationLabel,
		limitNote: overflowCount > 0 ? params.t.glossaryPageNetworkLimitLabel(overflowCount) : null
	};
}

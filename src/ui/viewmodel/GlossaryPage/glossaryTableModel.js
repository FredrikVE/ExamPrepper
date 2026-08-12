// src/ui/viewmodel/GlossaryPage/glossaryTableModel.js
import { GLOSSARY_NETWORK_DISPLAY_KIND } from "./glossaryNetworkModel.js";

export const GLOSSARY_TABLE_SORT_KEYS = Object.freeze({
	TERM: "TERM",
	DIRECT_NEIGHBOR_COUNT: "DIRECT_NEIGHBOR_COUNT"
});

export const GLOSSARY_TABLE_SORT_DIRECTIONS = Object.freeze({
	ASCENDING: "ASCENDING",
	DESCENDING: "DESCENDING"
});

export function createGlossaryTableRows({ localizedEntries, localizedEntryByKey, topicAreaReferenceByKey, expandedGlossaryEntryKey, networkDisplay, t }) {
	return localizedEntries.map((localizedEntry) => {
		const isExpanded = localizedEntry.glossaryEntryKey === expandedGlossaryEntryKey;
		const directNeighbors = createDirectNeighborPresentations(localizedEntry, localizedEntryByKey);
		const associationLabel = localizedEntry.directNeighborCount === 1
			? t.glossaryPageSingleAssociationLabel
			: t.glossaryPageMultipleAssociationsLabel(localizedEntry.directNeighborCount);
		const detailsId = `glossary-details-${localizedEntry.glossaryEntryKey}`;

		return {
			glossaryEntryKey: localizedEntry.glossaryEntryKey,
			topicAreaKey: localizedEntry.topicAreaKey,
			topicAreaReference: topicAreaReferenceByKey.get(localizedEntry.topicAreaKey) ?? "",
			term: localizedEntry.term,
			explanation: localizedEntry.explanation,
			directNeighborCount: localizedEntry.directNeighborCount,
			directNeighborGlossaryKeys: localizedEntry.directNeighborGlossaryKeys,
			directNeighbors,
			isExpanded,
			detailsId,
			disclosureLabel: isExpanded
				? t.glossaryPageHideAssociationsLabel(associationLabel, localizedEntry.term)
				: t.glossaryPageShowAssociationsLabel(associationLabel, localizedEntry.term),
			details: isExpanded
				? createGlossaryTableDetailsPresentation({
					detailsId,
					directNeighbors,
					networkDisplay,
					t
				})
				: null
		};
	});
}

export function sortGlossaryTableRows({ rows, sortKey, sortDirection, language }) {
	if (sortKey === null) {
		return rows;
	}

	if (sortKey !== GLOSSARY_TABLE_SORT_KEYS.TERM && sortKey !== GLOSSARY_TABLE_SORT_KEYS.DIRECT_NEIGHBOR_COUNT) {
		throw new Error(`Unknown glossary table sort key: ${String(sortKey)}`);
	}

	if (sortDirection !== GLOSSARY_TABLE_SORT_DIRECTIONS.ASCENDING && sortDirection !== GLOSSARY_TABLE_SORT_DIRECTIONS.DESCENDING) {
		throw new Error(`Unknown glossary table sort direction: ${String(sortDirection)}`);
	}

	const locale = language === "no" ? "nb-NO" : language;
	const direction = sortDirection === GLOSSARY_TABLE_SORT_DIRECTIONS.DESCENDING ? -1 : 1;

	return rows
		.map((row, originalIndex) => ({ row, originalIndex }))
		.sort((left, right) => {
			let comparison = compareRows(left.row, right.row, sortKey, locale);
			if (comparison === 0) {
				comparison = compareTerms(left.row.term, right.row.term, locale);
			}
			if (comparison === 0) {
				comparison = left.originalIndex - right.originalIndex;
			}
			return comparison * direction;
		})
		.map(({ row }) => row);
}

function createGlossaryTableDetailsPresentation({ detailsId, directNeighbors, networkDisplay, t }) {
	return {
		id: detailsId,
		associationsHeading: t.glossaryPageAssociatedWithLabel,
		directNeighbors,
		emptyAssociationsLabel: t.glossaryPageNoAssociationsLabel,
		network: createInlineNetworkPresentation({
			networkDisplay,
			directNeighborCount: directNeighbors.length,
			t
		})
	};
}

function createInlineNetworkPresentation({ networkDisplay, directNeighborCount, t }) {
	if (networkDisplay.kind === GLOSSARY_NETWORK_DISPLAY_KIND.LOADING) {
		return {
			kind: GLOSSARY_NETWORK_DISPLAY_KIND.LOADING,
			title: t.glossaryPageNetworkInlineTitle,
			message: t.glossaryPageNetworkLoadingLabel
		};
	}

	if (networkDisplay.kind === GLOSSARY_NETWORK_DISPLAY_KIND.ERROR) {
		return {
			kind: GLOSSARY_NETWORK_DISPLAY_KIND.ERROR,
			title: t.glossaryPageNetworkInlineTitle,
			message: networkDisplay.message
		};
	}

	if (networkDisplay.kind !== GLOSSARY_NETWORK_DISPLAY_KIND.CONTENT) {
		throw new Error(`Expanded glossary row requires a visible network state, received: ${networkDisplay.kind}`);
	}

	const overflowCount = Math.max(0, directNeighborCount - networkDisplay.model.nodes.length);
	return {
		kind: GLOSSARY_NETWORK_DISPLAY_KIND.CONTENT,
		model: networkDisplay.model,
		title: t.glossaryPageNetworkInlineTitle,
		instructions: t.glossaryPageNetworkInlineInstructions,
		centerLabel: t.glossaryPageNetworkCenterLabel,
		emptyLabel: t.glossaryPageNetworkEmptyLabel,
		directAssociationLabel: t.glossaryPageNetworkDirectAssociationLabel,
		secondaryAssociationLabel: t.glossaryPageNetworkSecondaryAssociationLabel,
		limitNote: overflowCount > 0 ? t.glossaryPageNetworkLimitLabel(overflowCount) : null
	};
}

function createDirectNeighborPresentations(localizedEntry, localizedEntryByKey) {
	const directNeighbors = [];
	for (const glossaryEntryKey of localizedEntry.directNeighborGlossaryKeys) {
		const neighbor = localizedEntryByKey.get(glossaryEntryKey);
		if (!neighbor) {
			throw new Error(`Missing glossary overview entry for direct neighbor: ${glossaryEntryKey}`);
		}

		directNeighbors.push({
			glossaryEntryKey,
			term: neighbor.term
		});
	}

	return directNeighbors;
}

function compareRows(left, right, sortKey, locale) {
	if (sortKey === GLOSSARY_TABLE_SORT_KEYS.DIRECT_NEIGHBOR_COUNT) {
		return left.directNeighborCount - right.directNeighborCount;
	}

	return compareTerms(left.term, right.term, locale);
}

function compareTerms(leftTerm, rightTerm, locale) {
	return leftTerm.localeCompare(rightTerm, locale, {
		numeric: true,
		sensitivity: "base"
	});
}

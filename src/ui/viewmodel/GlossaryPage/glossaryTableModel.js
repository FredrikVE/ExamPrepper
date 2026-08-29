// src/ui/viewmodel/GlossaryPage/glossaryTableModel.js
import { requireTopicAreaReference } from "./glossaryLookups.js";
import { createDirectNeighborLevelPresentation } from "./directNeighborLevelModel.js";
import { createGlossaryMasteryPresentation } from "./glossaryMasteryModel.js";

export const GLOSSARY_TABLE_SORT_KEYS = Object.freeze({
	TERM: "TERM",
	DIRECT_NEIGHBOR_COUNT: "DIRECT_NEIGHBOR_COUNT"
});

export const GLOSSARY_TABLE_SORT_DIRECTIONS = Object.freeze({
	ASCENDING: "ASCENDING",
	DESCENDING: "DESCENDING"
});


export function createGlossaryTableRows({ localizedEntries, topicAreaReferenceByKey, expandedGlossaryEntryKey, t }) {
	const rows = [];

	for (const localizedEntry of localizedEntries) {
		const isExpanded = localizedEntry.glossaryEntryKey === expandedGlossaryEntryKey;
		const associationLabel = localizedEntry.directNeighborCount === 1
			? t.glossaryPageSingleAssociationLabel
			: t.glossaryPageMultipleAssociationsLabel(localizedEntry.directNeighborCount);

		rows.push({
			glossaryEntryKey: localizedEntry.glossaryEntryKey,
			topicAreaKey: localizedEntry.topicAreaKey,
			topicAreaReference: requireTopicAreaReference(topicAreaReferenceByKey, localizedEntry.topicAreaKey),
			term: localizedEntry.term,
			explanation: localizedEntry.explanation,
			directNeighborCount: localizedEntry.directNeighborCount,
			directNeighborLevel: createDirectNeighborLevelPresentation({ directNeighborCount: localizedEntry.directNeighborCount, ariaLabel: associationLabel }),
			mastery: createGlossaryMasteryPresentation(localizedEntry.mastery, t),
			isExpanded,
			detailsId: `glossary-details-${localizedEntry.glossaryEntryKey}`,
			disclosureLabel: isExpanded
				? t.glossaryPageHideAssociationsLabel(associationLabel, localizedEntry.term)
				: t.glossaryPageShowAssociationsLabel(associationLabel, localizedEntry.term),
			detailTriggerLabel: t.glossaryPageOpenDetailLabel(localizedEntry.term)
		});
	}

	return rows;
}

export function sortGlossaryTableRows({ rows, sortKey, sortDirection, language }) {
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

function compareRows(left, right, sortKey, locale) {
	if (sortKey === GLOSSARY_TABLE_SORT_KEYS.DIRECT_NEIGHBOR_COUNT) {
		return left.directNeighborCount - right.directNeighborCount;
	}
	return compareTerms(left.term, right.term, locale);
}

function compareTerms(leftTerm, rightTerm, locale) {
	return leftTerm.localeCompare(rightTerm, locale, { numeric: true, sensitivity: "base" });
}

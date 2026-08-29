// src/ui/viewmodel/GlossaryPage/glossaryTableModel.js
import { requireTopicAreaReference } from "./glossaryLookups.js";
import { createDirectNeighborLevelPresentation } from "./directNeighborLevelModel.js";
import { createGlossaryMasteryPresentation, getGlossaryMasterySortRank } from "./glossaryMasteryModel.js";

export const GLOSSARY_TABLE_SORT_KEYS = Object.freeze({
	TERM: "TERM",
	EXPLANATION_LENGTH: "EXPLANATION_LENGTH",
	DIRECT_NEIGHBOR_COUNT: "DIRECT_NEIGHBOR_COUNT",
	MASTERY: "MASTERY"
});

export const GLOSSARY_TABLE_SORT_DIRECTIONS = Object.freeze({
	ASCENDING: "ASCENDING",
	DESCENDING: "DESCENDING"
});

export function getInitialGlossaryTableSortDirection(sortKey) {
	assertGlossaryTableSortKey(sortKey);

	if (sortKey === GLOSSARY_TABLE_SORT_KEYS.TERM) {
		return GLOSSARY_TABLE_SORT_DIRECTIONS.ASCENDING;
	}

	return GLOSSARY_TABLE_SORT_DIRECTIONS.DESCENDING;
}

export function createGlossaryTableRows({ localizedEntries, topicAreaReferenceByKey, t }) {
	const rows = [];

	for (const localizedEntry of localizedEntries) {
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
			detailTriggerLabel: t.glossaryPageOpenDetailLabel(localizedEntry.term)
		});
	}

	return rows;
}

export function sortGlossaryTableRows({ rows, sortKey, sortDirection, language }) {
	assertGlossaryTableSortKey(sortKey);
	if (sortDirection !== GLOSSARY_TABLE_SORT_DIRECTIONS.ASCENDING && sortDirection !== GLOSSARY_TABLE_SORT_DIRECTIONS.DESCENDING) {
		throw new Error(`Unknown glossary table sort direction: ${String(sortDirection)}`);
	}

	const locale = language === "no" ? "nb-NO" : language;
	const direction = sortDirection === GLOSSARY_TABLE_SORT_DIRECTIONS.DESCENDING ? -1 : 1;

	return rows
		.map((row, originalIndex) => ({ row, originalIndex }))
		.sort((left, right) => {
			const missingMasteryComparison = compareMissingMastery(left.row, right.row, sortKey);
			if (missingMasteryComparison !== 0) {
				return missingMasteryComparison;
			}

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

function assertGlossaryTableSortKey(sortKey) {
	if (!Object.values(GLOSSARY_TABLE_SORT_KEYS).includes(sortKey)) {
		throw new Error(`Unknown glossary table sort key: ${String(sortKey)}`);
	}
}

function compareRows(left, right, sortKey, locale) {
	if (sortKey === GLOSSARY_TABLE_SORT_KEYS.EXPLANATION_LENGTH) {
		return measureExplanationLength(left.explanation) - measureExplanationLength(right.explanation);
	}

	if (sortKey === GLOSSARY_TABLE_SORT_KEYS.DIRECT_NEIGHBOR_COUNT) {
		return left.directNeighborCount - right.directNeighborCount;
	}

	if (sortKey === GLOSSARY_TABLE_SORT_KEYS.MASTERY) {
		if (!left.mastery.isAssessed && !right.mastery.isAssessed) {
			return 0;
		}

		return compareMasteryStatus(left.mastery.status, right.mastery.status);
	}

	return compareTerms(left.term, right.term, locale);
}

function compareMissingMastery(left, right, sortKey) {
	if (sortKey !== GLOSSARY_TABLE_SORT_KEYS.MASTERY) {
		return 0;
	}

	const leftIsAssessed = left.mastery.isAssessed;
	const rightIsAssessed = right.mastery.isAssessed;

	if (leftIsAssessed === rightIsAssessed) {
		return 0;
	}

	if (!leftIsAssessed) {
		return 1;
	}

	return -1;
}

function compareMasteryStatus(leftStatus, rightStatus) {
	return getGlossaryMasterySortRank(leftStatus) - getGlossaryMasterySortRank(rightStatus);
}

function measureExplanationLength(explanation) {
	return Array.from(explanation.trim()).length;
}

function compareTerms(leftTerm, rightTerm, locale) {
	return leftTerm.localeCompare(rightTerm, locale, { numeric: true, sensitivity: "base" });
}

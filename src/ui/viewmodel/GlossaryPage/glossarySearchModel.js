import normalizeSearchTerm from "../Utils/normalizeSearchTerm.js";
import { SEARCH_SUGGESTION_LIMIT } from "../Search/searchSuggestionContract.js";

// src/ui/viewmodel/GlossaryPage/glossarySearchModel.js
export const GLOSSARY_AUTOCOMPLETE_MIN_LENGTH = 1;
export const GLOSSARY_AUTOCOMPLETE_LIST_ID = "glossary-search-suggestions";

export function createGlossaryAutocompleteSuggestions(params) {
	if (params.normalizedSearchTerm.length < GLOSSARY_AUTOCOMPLETE_MIN_LENGTH) {
		return [];
	}

	const rankedEntries = [];

	for (const localizedEntry of params.localizedEntries) {
		if (!params.selectedTopicAreaKeys.has(localizedEntry.topicAreaKey)) {
			continue;
		}

		const normalizedTerm = normalizeSearchTerm(localizedEntry.term);
		const rank = resolveAutocompleteRank(normalizedTerm, params.normalizedSearchTerm);

		if (rank === null) {
			continue;
		}

		rankedEntries.push({
			localizedEntry,
			normalizedTerm,
			rank
		});
	}

	rankedEntries.sort(compareAutocompleteEntries);

	const suggestions = [];

	for (const rankedEntry of rankedEntries) {
		if (suggestions.length >= SEARCH_SUGGESTION_LIMIT) {
			break;
		}

		const localizedEntry = rankedEntry.localizedEntry;

		suggestions.push({
			id: localizedEntry.glossaryEntryKey,
			optionId: createGlossaryAutocompleteOptionId(localizedEntry.glossaryEntryKey),
			label: localizedEntry.term,
			metaLabel: params.topicAreaReferenceByKey.get(localizedEntry.topicAreaKey) ?? null,
			topicAreaKey: localizedEntry.topicAreaKey
		});
	}

	return suggestions;
}

export function createGlossaryAutocompleteOptionId(glossaryEntryKey) {
	return `glossary-search-option-${encodeURIComponent(glossaryEntryKey)}`;
}

function resolveAutocompleteRank(normalizedTerm, normalizedSearchTerm) {
	if (normalizedTerm === normalizedSearchTerm) {
		return 0;
	}

	if (normalizedTerm.startsWith(normalizedSearchTerm)) {
		return 1;
	}

	const words = normalizedTerm.split(/\s+/u);

	for (const word of words) {
		if (word.startsWith(normalizedSearchTerm)) {
			return 2;
		}
	}

	if (normalizedTerm.includes(normalizedSearchTerm)) {
		return 3;
	}

	return null;
}

function compareAutocompleteEntries(leftEntry, rightEntry) {
	const rankDifference = leftEntry.rank - rightEntry.rank;

	if (rankDifference !== 0) {
		return rankDifference;
	}

	const lengthDifference = leftEntry.normalizedTerm.length - rightEntry.normalizedTerm.length;

	if (lengthDifference !== 0) {
		return lengthDifference;
	}

	const termDifference = leftEntry.normalizedTerm.localeCompare(rightEntry.normalizedTerm);

	if (termDifference !== 0) {
		return termDifference;
	}

	return leftEntry.localizedEntry.glossaryEntryKey.localeCompare(rightEntry.localizedEntry.glossaryEntryKey);
}

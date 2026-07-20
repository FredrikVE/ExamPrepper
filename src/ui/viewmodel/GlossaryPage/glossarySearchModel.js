// src/ui/viewmodel/GlossaryPage/glossarySearchModel.js
export function normalizeSearchTerm(searchTerm) {
    return searchTerm.trim().toLowerCase();
}

export function entryMatchesSearchTerm(localizedEntry, normalizedSearchTerm) {
    if (!normalizedSearchTerm) {
        return true;
    }

    return localizedEntry.term.toLowerCase().includes(normalizedSearchTerm)
        || localizedEntry.explanation.toLowerCase().includes(normalizedSearchTerm);
}

export function filterEntriesBySearchTerm(localizedEntries, searchTerm) {
    const normalizedSearchTerm = normalizeSearchTerm(searchTerm);

    return localizedEntries.filter((localizedEntry) => (
        entryMatchesSearchTerm(localizedEntry, normalizedSearchTerm)
    ));
}

export function countEntryMatchesByTopicArea(localizedEntries, searchTerm) {
    const normalizedSearchTerm = normalizeSearchTerm(searchTerm);
    const matchCountsByTopicAreaKey = new Map();

    for (const localizedEntry of localizedEntries) {
        if (!entryMatchesSearchTerm(localizedEntry, normalizedSearchTerm)) {
            continue;
        }

        const previousMatchCount = matchCountsByTopicAreaKey.get(localizedEntry.topicAreaKey) ?? 0;
        matchCountsByTopicAreaKey.set(localizedEntry.topicAreaKey, previousMatchCount + 1);
    }

    return matchCountsByTopicAreaKey;
}

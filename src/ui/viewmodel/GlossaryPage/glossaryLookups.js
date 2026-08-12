// src/ui/viewmodel/GlossaryPage/glossaryLookups.js
export function requireGlossaryEntry(localizedEntryByKey, glossaryEntryKey, role) {
	const localizedEntry = localizedEntryByKey.get(glossaryEntryKey);

	if (localizedEntry === undefined) {
		throw new Error(`Missing glossary overview entry for ${role}: ${glossaryEntryKey}`);
	}

	return localizedEntry;
}

export function requireTopicArea(topicAreaByKey, topicAreaKey) {
	const topicArea = topicAreaByKey.get(topicAreaKey);

	if (topicArea === undefined) {
		throw new Error(`Missing topic area for glossary presentation: ${topicAreaKey}`);
	}

	return topicArea;
}

export function requireTopicAreaReference(topicAreaReferenceByKey, topicAreaKey) {
	const topicAreaReference = topicAreaReferenceByKey.get(topicAreaKey);

	if (topicAreaReference === undefined) {
		throw new Error(`Missing topic area reference for glossary presentation: ${topicAreaKey}`);
	}

	return topicAreaReference;
}

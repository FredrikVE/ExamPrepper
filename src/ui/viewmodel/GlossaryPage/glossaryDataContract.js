// src/ui/viewmodel/GlossaryPage/glossaryDataContract.js
export function assertGlossaryEntriesReferenceKnownTopicAreas({ localizedEntries, topicAreas }) {
	const validTopicAreaKeys = new Set();
	for (const topicArea of topicAreas) {
		validTopicAreaKeys.add(topicArea.key);
	}

	const orphanedGlossaryEntryKeys = [];
	for (const localizedEntry of localizedEntries) {
		if (!validTopicAreaKeys.has(localizedEntry.topicAreaKey)) {
			orphanedGlossaryEntryKeys.push(localizedEntry.glossaryEntryKey);
		}
	}

	if (orphanedGlossaryEntryKeys.length > 0) {
		throw new Error(`Glossary entries reference unknown topic areas: ${orphanedGlossaryEntryKeys.join(", ")}`);
	}
}

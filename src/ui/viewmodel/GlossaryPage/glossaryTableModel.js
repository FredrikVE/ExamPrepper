// src/ui/viewmodel/GlossaryPage/glossaryTableModel.js
export function createGlossaryTableRows({ localizedEntries, topicAreaReferenceByKey }) {
	return localizedEntries.map((localizedEntry) => ({
		glossaryEntryKey: localizedEntry.glossaryEntryKey,
		topicAreaKey: localizedEntry.topicAreaKey,
		topicAreaReference: topicAreaReferenceByKey.get(localizedEntry.topicAreaKey) ?? "",
		term: localizedEntry.term,
		explanation: localizedEntry.explanation
	}));
}

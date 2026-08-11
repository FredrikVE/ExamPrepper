// src/ui/viewmodel/GlossaryPage/glossaryTableModel.js
import { createGlossaryMasteryPresentation } from "./glossaryMasteryModel.js";

export function createGlossaryTableRows({ localizedEntries, topicAreaReferenceByKey, formatDate, t }) {
	return localizedEntries.map((localizedEntry) => ({
		glossaryEntryKey: localizedEntry.glossaryEntryKey,
		topicAreaKey: localizedEntry.topicAreaKey,
		topicAreaReference: topicAreaReferenceByKey.get(localizedEntry.topicAreaKey) ?? "",
		term: localizedEntry.term,
		explanation: localizedEntry.explanation,
		mastery: createGlossaryMasteryPresentation(localizedEntry.mastery, formatDate, t)
	}));
}

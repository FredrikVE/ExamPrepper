// src/ui/viewmodel/FlipcardsPage/glossaryEntryFlipcardModel.js
export function createFlipcardsFromGlossaryEntries(glossaryEntries, language) {
	const flipcards = [];

	for (const glossaryEntry of glossaryEntries) {
		flipcards.push({
			id: glossaryEntry.glossaryEntryKey,
			term: resolveLocalizedGlossaryEntryText(glossaryEntry.term, language),
			definition: resolveLocalizedGlossaryEntryText(glossaryEntry.explanation, language),
			topicAreaKey: glossaryEntry.topicAreaKey
		});
	}

	return flipcards;
}

const resolveLocalizedGlossaryEntryText = (value, language) => {
	if (typeof value === "string") {
		return value;
	}

	return value?.[language] ?? value?.no ?? "";
};

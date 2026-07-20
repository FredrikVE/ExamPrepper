// src/ui/viewmodel/MatchCardsPage/matchCardsPairModel.js
export function createPairsFromGlossaryEntries(glossaryEntries) {
	const pairs = [];

	for (const glossaryEntry of glossaryEntries) {
		pairs.push(createPairFromGlossaryEntry(glossaryEntry));
	}

	return pairs;
}

const createPairFromGlossaryEntry = (glossaryEntry) => ({
	glossaryEntryKey: glossaryEntry.glossaryEntryKey,
	termTextByLanguage: copyTextByLanguage(glossaryEntry.term),
	explanationTextByLanguage: copyTextByLanguage(glossaryEntry.explanation)
});

const copyTextByLanguage = (textByLanguage) => ({
	no: textByLanguage.no,
	en: textByLanguage.en
});

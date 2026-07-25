// src/ui/viewmodel/FlipcardsPage/glossaryEntryFlipcardModel.js
import createFlipcardTermPresentation from "./createFlipcardTermPresentation.js";
import { createNorwegianCompoundLexicon } from "./norwegianCompoundSegmentation.js";

export function createFlipcardsFromGlossaryEntries(glossaryEntries, language) {
	const baseFlipcards = [];
	const terms = [];
	const supportingTexts = [];

	for (const glossaryEntry of glossaryEntries) {
		const term = resolveLocalizedGlossaryEntryText(glossaryEntry.term, language);
		const definition = resolveLocalizedGlossaryEntryText(glossaryEntry.explanation, language);

		baseFlipcards.push({
			id: glossaryEntry.glossaryEntryKey,
			term,
			definition,
			topicAreaKey: glossaryEntry.topicAreaKey
		});
		terms.push(term);
		supportingTexts.push(definition);
	}

	const compoundLexicon = language === "no"
		? createNorwegianCompoundLexicon({
			terms,
			supportingTexts
		})
		: null;
	const flipcards = [];

	for (const baseFlipcard of baseFlipcards) {
		flipcards.push({
			...baseFlipcard,
			termPresentation: createFlipcardTermPresentation(baseFlipcard.term, compoundLexicon)
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

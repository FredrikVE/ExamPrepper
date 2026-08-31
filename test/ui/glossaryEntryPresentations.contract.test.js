// test/ui/glossaryEntryPresentations.contract.test.js
import { describe, expect, test } from "@jest/globals";
import { createGlossaryTableRows } from "../../src/ui/viewmodel/GlossaryPage/glossaryTableModel.js";
import { createFlipcardsFromGlossaryEntries } from "../../src/ui/viewmodel/FlipcardsPage/glossaryEntryFlipcardModel.js";
import { createPairsFromGlossaryEntries } from "../../src/ui/viewmodel/MatchCards/matchCardsPairModel.js";

const glossaryEntry = Object.freeze({
	id: "zero-trust",
	glossaryEntryKey: "zero-trust",
	topicAreaKey: "security-architecture",
	term: Object.freeze({
		no: "Nulltillit",
		en: "Zero trust"
	}),
	explanation: Object.freeze({
		no: "Ingen forespørsel får tillit uten eksplisitt verifisering.",
		en: "No request is trusted without explicit verification."
	}),
	position: 1,
	directNeighborCount: 0,
	directNeighborGlossaryKeys: []
});

const createLocalizedGlossaryEntry = (entry, language) => ({
	glossaryEntryKey: entry.glossaryEntryKey,
	topicAreaKey: entry.topicAreaKey,
	term: entry.term[language],
	explanation: entry.explanation[language],
	position: entry.position,
	directNeighborCount: entry.directNeighborCount,
	directNeighborGlossaryKeys: entry.directNeighborGlossaryKeys,
	mastery: null
});

describe("GlossaryEntry presentation contract", () => {
	test("preserves one glossary entry key and texts across all three presentations", () => {
		const flipcard = createFlipcardsFromGlossaryEntries([glossaryEntry], "no")[0];
		const matchPair = createPairsFromGlossaryEntries([glossaryEntry])[0];
		const localizedGlossaryEntry = createLocalizedGlossaryEntry(glossaryEntry, "no");
		const tableRow = createGlossaryTableRows({
			localizedEntries: [localizedGlossaryEntry],
			localizedEntryByKey: new Map([[glossaryEntry.glossaryEntryKey, localizedGlossaryEntry]]),
			topicAreaReferenceByKey: new Map([[
				"security-architecture",
				"Kapittel 1"
			]]),
			t: {
				glossaryPageSingleAssociationLabel: "1 assosiert begrep",
				glossaryPageMultipleAssociationsLabel: (count) => `${count} assosierte begreper`,
				glossaryPageOpenDetailLabel: (term) => `Åpne detaljvisning for ${term}`,
				glossaryPageMasteryNotAssessedLabel: "Ikke vurdert",
				glossaryPageMasteryPracticeLabel: "Øve mer",
				glossaryPageMasteryProgressLabel: "Underveis",
				glossaryPageMasteryUnderstoodLabel: "Forstått",
				glossaryPageMasteryAriaLabel: (statusLabel) => `Vurdering: ${statusLabel}`
			}
		})[0];

		expect(flipcard).toEqual({
			id: glossaryEntry.glossaryEntryKey,
			term: glossaryEntry.term.no,
			definition: glossaryEntry.explanation.no,
			topicAreaKey: glossaryEntry.topicAreaKey,
			termPresentation: {
				primaryText: glossaryEntry.term.no,
				parentheticalText: null
			}
		});

		expect(matchPair).toEqual({
			glossaryEntryKey: glossaryEntry.glossaryEntryKey,
			termTextByLanguage: glossaryEntry.term,
			explanationTextByLanguage: glossaryEntry.explanation
		});

		expect(tableRow.glossaryEntryKey).toBe(glossaryEntry.glossaryEntryKey);
		expect(tableRow.topicAreaKey).toBe(glossaryEntry.topicAreaKey);
		expect(tableRow.topicAreaReference).toBe("Kapittel 1");
		expect(tableRow.term).toBe(glossaryEntry.term.no);
		expect(tableRow.explanation).toBe(glossaryEntry.explanation.no);
	});
});

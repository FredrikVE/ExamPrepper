// test/ui/glossaryEntryPresentations.contract.test.js
import { describe, expect, test } from "@jest/globals";
import { createGlossaryTableRows } from "../../src/ui/viewmodel/GlossaryPage/glossaryTableModel.js";
import { createFlipcardsFromGlossaryEntries } from "../../src/ui/viewmodel/FlipcardsPage/glossaryEntryFlipcardModel.js";
import { createPairsFromGlossaryEntries } from "../../src/ui/viewmodel/MatchCardsPage/matchCardsPairModel.js";

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
	position: 1
});

const createLocalizedGlossaryEntry = (entry, language) => ({
	glossaryEntryKey: entry.glossaryEntryKey,
	topicAreaKey: entry.topicAreaKey,
	term: entry.term[language],
	explanation: entry.explanation[language],
	position: entry.position
});

const joinSegments = (segments) => segments.map((segment) => segment.text).join("");

describe("GlossaryEntry presentation contract", () => {
	test("preserves one glossary entry key and texts across all three presentations", () => {
		const flipcard = createFlipcardsFromGlossaryEntries([glossaryEntry], "no")[0];
		const matchPair = createPairsFromGlossaryEntries([glossaryEntry])[0];
		const tableRow = createGlossaryTableRows({
			localizedEntries: [createLocalizedGlossaryEntry(glossaryEntry, "no")],
			normalizedSearchTerm: "tillit",
			topicAreaReferenceByKey: new Map([[
				"security-architecture",
				"Kapittel 1"
			]])
		})[0];

		expect(flipcard).toEqual({
			id: glossaryEntry.glossaryEntryKey,
			term: glossaryEntry.term.no,
			definition: glossaryEntry.explanation.no,
			topicAreaKey: glossaryEntry.topicAreaKey
		});

		expect(matchPair).toEqual({
			glossaryEntryKey: glossaryEntry.glossaryEntryKey,
			termTextByLanguage: glossaryEntry.term,
			explanationTextByLanguage: glossaryEntry.explanation
		});

		expect(tableRow.glossaryEntryKey).toBe(glossaryEntry.glossaryEntryKey);
		expect(tableRow.topicAreaKey).toBe(glossaryEntry.topicAreaKey);
		expect(tableRow.topicAreaReference).toBe("Kapittel 1");
		expect(joinSegments(tableRow.termSegments)).toBe(glossaryEntry.term.no);
		expect(joinSegments(tableRow.explanationSegments)).toBe(glossaryEntry.explanation.no);
	});
});

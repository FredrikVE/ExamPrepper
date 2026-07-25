// test/ui/viewmodel/FlipcardsPage/norwegianCompoundSegmentation.test.js
import { describe, expect, test } from "@jest/globals";
import { createNorwegianCompoundLexicon, insertNorwegianCompoundBreaks } from "../../../../src/ui/viewmodel/FlipcardsPage/norwegianCompoundSegmentation.js";

const SOFT_HYPHEN = "\u00AD";

function createCompoundLexicon() {
	return createNorwegianCompoundLexicon({
		terms: [
			"Dekryptering",
			"Kryptering",
			"Blokkchiffer",
			"Strømchiffer",
			"Postkvantekrypto",
			"Kryptografi",
			"Kryptosystem",
			"Fremoverhemmelighold",
			"Meldingsautentisering",
			"Informasjonssikkerhet",
			"Tilgangskontroll"
		],
		supportingTexts: [
			"blokk strøm chiffer kvante fremover hemmelighold melding autentisering informasjon sikkerhet tilgang kontroll"
		]
	});
}

describe("Norwegian compound segmentation", () => {
	test("derives reusable compound parts from the complete deck vocabulary", () => {
		const lexicon = createCompoundLexicon();

		expect(insertNorwegianCompoundBreaks("Blokkchiffer", lexicon)).toBe(`Blokk${SOFT_HYPHEN}chiffer`);
		expect(insertNorwegianCompoundBreaks("Strømchiffer", lexicon)).toBe(`Strøm${SOFT_HYPHEN}chiffer`);
		expect(insertNorwegianCompoundBreaks("Postkvantekrypto", lexicon)).toBe(`Postkvante${SOFT_HYPHEN}krypto`);
		expect(insertNorwegianCompoundBreaks("Fremoverhemmelighold", lexicon)).toBe(`Fremover${SOFT_HYPHEN}hemmelighold`);
	});

	test("keeps linking letters on the first compound segment", () => {
		const lexicon = createCompoundLexicon();

		expect(insertNorwegianCompoundBreaks("Meldingsautentisering", lexicon)).toBe(`Meldings${SOFT_HYPHEN}autentisering`);
		expect(insertNorwegianCompoundBreaks("Informasjonssikkerhet", lexicon)).toBe(`Informasjons${SOFT_HYPHEN}sikkerhet`);
		expect(insertNorwegianCompoundBreaks("Tilgangskontroll", lexicon)).toBe(`Tilgangs${SOFT_HYPHEN}kontroll`);
	});

	test("supports productive prefixes without a term-specific rule", () => {
		const lexicon = createCompoundLexicon();

		expect(insertNorwegianCompoundBreaks("Dekryptering", lexicon)).toBe(`De${SOFT_HYPHEN}kryptering`);
	});

	test("does not create a break when the corpus cannot support a compound analysis", () => {
		const lexicon = createCompoundLexicon();

		expect(insertNorwegianCompoundBreaks("Kryptering", lexicon)).toBe("Kryptering");
		expect(insertNorwegianCompoundBreaks("Konsistens", lexicon)).toBe("Konsistens");
		expect(insertNorwegianCompoundBreaks("MAC O(n)", lexicon)).toBe("MAC O(n)");
	});
});

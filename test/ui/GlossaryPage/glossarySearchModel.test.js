// test/ui/GlossaryPage/glossarySearchModel.test.js
import { describe, expect, test } from "@jest/globals";
import { GLOSSARY_SEARCH_SCOPES, countEntryMatchesByTopicArea, countEntryMatchesByTopicAreaForNormalizedSearchTerm, doesGlossarySearchScopeIncludeChapters, doesGlossarySearchScopeIncludeTerms, entryMatchesSearchTerm, filterEntriesByNormalizedSearchTerm, filterEntriesBySearchTerm } from "../../../src/ui/viewmodel/GlossaryPage/glossarySearchModel.js";
import normalizeSearchTerm from "../../../src/ui/viewmodel/Utils/normalizeSearchTerm.js";

const localizedEntries = [
    {
        glossaryEntryKey: "asymmetric-cryptography",
        topicAreaKey: "cryptography",
        term: "Asymmetrisk kryptografi",
        explanation: "Bruker et offentlig og et privat nøkkelpar."
    },
    {
        glossaryEntryKey: "access-control",
        topicAreaKey: "security-models",
        term: "Tilgangskontroll",
        explanation: "Styrer hvem som får lese eller endre en ressurs."
    },
    {
        glossaryEntryKey: "threat-model",
        topicAreaKey: "security-models",
        term: "Trusselmodell",
        explanation: "Beskriver angripere, mål og mulige angrepsflater."
    },
    {
        glossaryEntryKey: "isolation",
        topicAreaKey: "operating-systems",
        term: "Isolasjon",
        explanation: "Skiller prosesser i særskilte minneområder."
    }
];

describe("glossarySearchModel", () => {

    test("defines all as the combined chapter and term scope", () => {
        expect(doesGlossarySearchScopeIncludeTerms(GLOSSARY_SEARCH_SCOPES.ALL)).toBe(true);
        expect(doesGlossarySearchScopeIncludeChapters(GLOSSARY_SEARCH_SCOPES.ALL)).toBe(true);
        expect(doesGlossarySearchScopeIncludeTerms(GLOSSARY_SEARCH_SCOPES.CHAPTERS)).toBe(false);
        expect(doesGlossarySearchScopeIncludeChapters(GLOSSARY_SEARCH_SCOPES.TERMS)).toBe(false);
    });

    test("normalizes surrounding whitespace and casing", () => {
        expect(normalizeSearchTerm("  KRYPTOGRAFI  ")).toBe("kryptografi");
    });

    test("matches localized terms without case sensitivity", () => {
        expect(entryMatchesSearchTerm(localizedEntries[0], "asymmetrisk")).toBe(true);
        expect(filterEntriesBySearchTerm(localizedEntries, "TILGANG")).toEqual([
            localizedEntries[1]
        ]);
    });

    test("matches localized explanations", () => {
        expect(filterEntriesBySearchTerm(localizedEntries, "angrepsflater")).toEqual([
            localizedEntries[2]
        ]);
    });

    test("uses normalized variants without repeating normalization", () => {
        expect(filterEntriesByNormalizedSearchTerm(localizedEntries, "tilgang")).toEqual([
            localizedEntries[1]
        ]);
        expect(countEntryMatchesByTopicAreaForNormalizedSearchTerm(localizedEntries, "trussel")).toEqual(new Map([
            ["security-models", 1]
        ]));
    });

    test("returns all entries and counts for an empty search term", () => {
        expect(filterEntriesBySearchTerm(localizedEntries, "   ")).toEqual(localizedEntries);
        expect(countEntryMatchesByTopicArea(localizedEntries, "   ")).toEqual(new Map([
            ["cryptography", 1],
            ["security-models", 2],
            ["operating-systems", 1]
        ]));
    });

    test("counts matching entries per topic area", () => {
        expect(countEntryMatchesByTopicArea(localizedEntries, "e")).toEqual(new Map([
            ["cryptography", 1],
            ["security-models", 2],
            ["operating-systems", 1]
        ]));
    });

    test("supports Norwegian letters", () => {
        expect(filterEntriesBySearchTerm(localizedEntries, "nøkkelpar")).toEqual([
            localizedEntries[0]
        ]);
        expect(filterEntriesBySearchTerm(localizedEntries, "får lese")).toEqual([
            localizedEntries[1]
        ]);
        expect(filterEntriesBySearchTerm(localizedEntries, "mål og")).toEqual([
            localizedEntries[2]
        ]);
        expect(filterEntriesBySearchTerm(localizedEntries, "særskilte")).toEqual([
            localizedEntries[3]
        ]);
    });

    test("returns no entries and no counts when the search has no matches", () => {
        expect(filterEntriesBySearchTerm(localizedEntries, "kvantefysikk")).toEqual([]);
        expect(countEntryMatchesByTopicArea(localizedEntries, "kvantefysikk")).toEqual(new Map());
    });
});

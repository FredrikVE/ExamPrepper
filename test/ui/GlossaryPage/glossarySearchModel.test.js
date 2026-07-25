// test/ui/GlossaryPage/glossarySearchModel.test.js
import { describe, expect, test } from "@jest/globals";
import { GLOSSARY_AUTOCOMPLETE_LIMIT, GLOSSARY_AUTOCOMPLETE_MIN_LENGTH, countEntryMatchesByTopicArea, countEntryMatchesByTopicAreaForNormalizedSearchTerm, createGlossaryAutocompleteOptionId, createGlossaryAutocompleteSuggestions, entryMatchesSearchTerm, filterEntriesByNormalizedSearchTerm, filterEntriesBySearchTerm } from "../../../src/ui/viewmodel/GlossaryPage/glossarySearchModel.js";
import normalizeSearchTerm from "../../../src/ui/viewmodel/Utils/normalizeSearchTerm.js";

const localizedEntries = [
	{
		glossaryEntryKey: "access-control",
		topicAreaKey: "security-models",
		term: "Tilgangskontroll",
		explanation: "Styrer hvem som får lese eller endre en ressurs."
	},
	{
		glossaryEntryKey: "control-plane",
		topicAreaKey: "networking",
		term: "Kontrollplan",
		explanation: "Planlegger hvordan trafikk skal flyte."
	},
	{
		glossaryEntryKey: "flow-control",
		topicAreaKey: "networking",
		term: "Flytkontroll",
		explanation: "Regulerer datamengden mellom endepunkter."
	},
	{
		glossaryEntryKey: "control",
		topicAreaKey: "security-models",
		term: "Kontroll",
		explanation: "Et sikkerhetstiltak."
	},
	{
		glossaryEntryKey: "threat-model",
		topicAreaKey: "security-models",
		term: "Trusselmodell",
		explanation: "Beskriver angripere og angrepsflater."
	}
];

const topicAreaReferenceByKey = new Map([
	["security-models", "Kapittel 1"],
	["networking", "Kapittel 2"]
]);

describe("glossarySearchModel", () => {
	test("normalizes surrounding whitespace and casing", () => {
		expect(normalizeSearchTerm("  KONTROLL  ")).toBe("kontroll");
	});

	test("searches terms without treating explanations as terms", () => {
		expect(entryMatchesSearchTerm(localizedEntries[0], "tilgang")).toBe(true);
		expect(filterEntriesBySearchTerm(localizedEntries, "angrepsflater")).toEqual([]);
		expect(filterEntriesBySearchTerm(localizedEntries, "FLYTKONTROLL")).toEqual([
			localizedEntries[2]
		]);
	});

	test("uses normalized variants without repeating normalization", () => {
		expect(filterEntriesByNormalizedSearchTerm(localizedEntries, "kontroll")).toEqual([
			localizedEntries[0],
			localizedEntries[1],
			localizedEntries[2],
			localizedEntries[3]
		]);
		expect(countEntryMatchesByTopicAreaForNormalizedSearchTerm(localizedEntries, "kontroll")).toEqual(new Map([
			["security-models", 2],
			["networking", 2]
		]));
	});

	test("returns all entries and counts for an empty search term", () => {
		expect(filterEntriesBySearchTerm(localizedEntries, "   ")).toEqual(localizedEntries);
		expect(countEntryMatchesByTopicArea(localizedEntries, "   ")).toEqual(new Map([
			["security-models", 3],
			["networking", 2]
		]));
	});

	test("exposes autocomplete from the first normalized character", () => {
		expect(GLOSSARY_AUTOCOMPLETE_MIN_LENGTH).toBe(1);
		expect(createGlossaryAutocompleteSuggestions({
			localizedEntries,
			selectedTopicAreaKeys: new Set(["security-models", "networking"]),
			normalizedSearchTerm: "k",
			topicAreaReferenceByKey
		}).map((suggestion) => suggestion.id)).toEqual([
			"control",
			"control-plane",
			"flow-control",
			"access-control"
		]);
		expect(createGlossaryAutocompleteSuggestions({
			localizedEntries,
			selectedTopicAreaKeys: new Set(["security-models", "networking"]),
			normalizedSearchTerm: "",
			topicAreaReferenceByKey
		})).toEqual([]);
	});

	test("ranks exact, leading, word-leading and contained matches", () => {
		const suggestions = createGlossaryAutocompleteSuggestions({
			localizedEntries,
			selectedTopicAreaKeys: new Set(["security-models", "networking"]),
			normalizedSearchTerm: "kontroll",
			topicAreaReferenceByKey
		});

		expect(suggestions.map((suggestion) => suggestion.id)).toEqual([
			"control",
			"control-plane",
			"flow-control",
			"access-control"
		]);
		expect(suggestions[0]).toEqual({
			id: "control",
			optionId: createGlossaryAutocompleteOptionId("control"),
			label: "Kontroll",
			metaLabel: "Kapittel 1",
			topicAreaKey: "security-models"
		});
	});

	test("limits suggestions to selected chapters and the shared result limit", () => {
		const manyEntries = [];

		for (let index = 0; index < GLOSSARY_AUTOCOMPLETE_LIMIT + 4; index += 1) {
			manyEntries.push({
				glossaryEntryKey: `network-${index}`,
				topicAreaKey: index % 2 === 0 ? "networking" : "security-models",
				term: `Nettverk ${index}`,
				explanation: ""
			});
		}

		const suggestions = createGlossaryAutocompleteSuggestions({
			localizedEntries: manyEntries,
			selectedTopicAreaKeys: new Set(["networking"]),
			normalizedSearchTerm: "nett",
			topicAreaReferenceByKey
		});

		expect(suggestions.length).toBeLessThanOrEqual(GLOSSARY_AUTOCOMPLETE_LIMIT);
		expect(suggestions.every((suggestion) => suggestion.topicAreaKey === "networking")).toBe(true);
	});

	test("returns no entries and no counts when the search has no matches", () => {
		expect(filterEntriesBySearchTerm(localizedEntries, "kvantefysikk")).toEqual([]);
		expect(countEntryMatchesByTopicArea(localizedEntries, "kvantefysikk")).toEqual(new Map());
	});
});

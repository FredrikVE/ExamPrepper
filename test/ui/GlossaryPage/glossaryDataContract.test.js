// test/ui/GlossaryPage/glossaryDataContract.test.js
import { describe, expect, test } from "@jest/globals";
import { assertGlossaryEntriesReferenceKnownTopicAreas } from "../../../src/ui/viewmodel/GlossaryPage/glossaryDataContract.js";

describe("glossary data contract", () => {
	test("accepts entries that reference known topic areas", () => {
		expect(() => assertGlossaryEntriesReferenceKnownTopicAreas({
			localizedEntries: [{ glossaryEntryKey: "known", topicAreaKey: "topic-1" }],
			topicAreas: [{ key: "topic-1" }]
		})).not.toThrow();
	});

	test("throws when an entry references an unknown topic area", () => {
		expect(() => assertGlossaryEntriesReferenceKnownTopicAreas({
			localizedEntries: [{ glossaryEntryKey: "ghost-term", topicAreaKey: "ghost-topic" }],
			topicAreas: [{ key: "topic-1" }]
		})).toThrow("Glossary entries reference unknown topic areas: ghost-term");
	});
});

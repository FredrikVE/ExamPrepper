// test/ui/GlossaryPage/glossaryTableModel.test.js
import { describe, expect, test } from "@jest/globals";
import { createGlossaryTableRows } from "../../../src/ui/viewmodel/GlossaryPage/glossaryTableModel.js";

const t = Object.freeze({
	glossaryPageSingleAssociationLabel: "1 assosiert begrep",
	glossaryPageMultipleAssociationsLabel: (count) => `${count} assosierte begreper`,
	glossaryPageShowAssociationsLabel: (associationLabel, term) => `Vis ${associationLabel} for ${term}`,
	glossaryPageHideAssociationsLabel: (associationLabel, term) => `Skjul ${associationLabel} for ${term}`,
	glossaryPageOpenDetailLabel: (term) => `Åpne detaljvisning for ${term}`
});

describe("glossaryTableModel", () => {
	test.each([
		[0, 0],
		[1, 1],
		[2, 2],
		[3, 2],
		[4, 3],
		[5, 3],
		[6, 4],
		[7, 4],
		[20, 4]
	])("maps %i direct neighbors to importance presentation level %i", (directNeighborCount, expectedLevel) => {
		const rows = createGlossaryTableRows(createTableModelInput(directNeighborCount));

		expect(rows[0].importance).toEqual({
			value: directNeighborCount,
			level: expectedLevel,
			ariaLabel: directNeighborCount === 1
				? "1 assosiert begrep"
				: `${directNeighborCount} assosierte begreper`
		});
	});
	test("prepares a semantic desktop detail-trigger label without changing mobile disclosure data", () => {
		const rows = createGlossaryTableRows(createTableModelInput(2));

		expect(rows[0].detailTriggerLabel).toBe("Åpne detaljvisning for Aktivt begrep");
		expect(rows[0].disclosureLabel).toBe("Vis 2 assosierte begreper for Aktivt begrep");
		expect(rows[0].details).toBeNull();
	});

});

function createTableModelInput(directNeighborCount) {
	const glossaryEntry = createGlossaryEntry("active", "Aktivt begrep", directNeighborCount);
	const localizedEntryByKey = new Map([[glossaryEntry.glossaryEntryKey, glossaryEntry]]);

	for (let index = 0; index < directNeighborCount; index += 1) {
		const neighbor = createGlossaryEntry(`neighbor-${index + 1}`, `Nabo ${index + 1}`, 0);
		glossaryEntry.directNeighborGlossaryKeys.push(neighbor.glossaryEntryKey);
		localizedEntryByKey.set(neighbor.glossaryEntryKey, neighbor);
	}

	return {
		localizedEntries: [glossaryEntry],
		localizedEntryByKey,
		topicAreaReferenceByKey: new Map([[glossaryEntry.topicAreaKey, "Kapittel 1"]]),
		expandedGlossaryEntryKey: null,
		networkDisplay: { kind: "hidden" },
		t
	};
}

function createGlossaryEntry(glossaryEntryKey, term, directNeighborCount) {
	return {
		glossaryEntryKey,
		topicAreaKey: "topic-1",
		term,
		explanation: `${term} forklaring`,
		directNeighborCount,
		directNeighborGlossaryKeys: []
	};
}

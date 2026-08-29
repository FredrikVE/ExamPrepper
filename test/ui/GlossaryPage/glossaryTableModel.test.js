// test/ui/GlossaryPage/glossaryTableModel.test.js
import { describe, expect, test } from "@jest/globals";
import { createGlossaryTableRows } from "../../../src/ui/viewmodel/GlossaryPage/glossaryTableModel.js";

const t = Object.freeze({
	glossaryPageSingleAssociationLabel: "1 assosiert begrep",
	glossaryPageMultipleAssociationsLabel: (count) => `${count} assosierte begreper`,
	glossaryPageOpenDetailLabel: (term) => `Åpne detaljvisning for ${term}`,
	glossaryPageMasteryNotAssessedLabel: "Ikke vurdert",
	glossaryPageMasteryPracticeLabel: "Øve mer",
	glossaryPageMasteryProgressLabel: "Underveis",
	glossaryPageMasteryUnderstoodLabel: "Forstått",
	glossaryPageMasteryAriaLabel: (statusLabel) => `Vurdering: ${statusLabel}`
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
	])("maps %i direct neighbors to direct-neighbor presentation level %i", (directNeighborCount, expectedLevel) => {
		const rows = createGlossaryTableRows(createTableModelInput(directNeighborCount));

		expect(rows[0].directNeighborLevel).toEqual({
			value: directNeighborCount,
			level: expectedLevel,
			ariaLabel: directNeighborCount === 1
				? "1 assosiert begrep"
				: `${directNeighborCount} assosierte begreper`
		});
	});
	test("preserves backend mastery as read-only row presentation", () => {
		const input = createTableModelInput(2);
		input.localizedEntries[0].mastery = { status: "progress" };
		const rows = createGlossaryTableRows(input);

		expect(rows[0].mastery).toEqual({
			status: "progress",
			statusLabel: "Underveis",
			ariaLabel: "Vurdering: Underveis",
			isAssessed: true,
			scaleItems: [
				{ status: "practice", label: "Øve mer", isActive: false },
				{ status: "progress", label: "Underveis", isActive: true },
				{ status: "understood", label: "Forstått", isActive: false }
			]
		});
	});

	test("prepares the canonical detail-trigger label without mobile disclosure state", () => {
		const rows = createGlossaryTableRows(createTableModelInput(2));

		expect(rows[0].detailTriggerLabel).toBe("Åpne detaljvisning for Aktivt begrep");
		expect(rows[0]).not.toHaveProperty("isExpanded");
		expect(rows[0]).not.toHaveProperty("detailsId");
		expect(rows[0]).not.toHaveProperty("disclosureLabel");
	});

});

function createTableModelInput(directNeighborCount) {
	const glossaryEntry = createGlossaryEntry("active", "Aktivt begrep", directNeighborCount);
	for (let index = 0; index < directNeighborCount; index += 1) {
		const neighbor = createGlossaryEntry(`neighbor-${index + 1}`, `Nabo ${index + 1}`, 0);
		glossaryEntry.directNeighborGlossaryKeys.push(neighbor.glossaryEntryKey);
	}

	return {
		localizedEntries: [glossaryEntry],
		topicAreaReferenceByKey: new Map([[glossaryEntry.topicAreaKey, "Kapittel 1"]]),
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
		directNeighborGlossaryKeys: [],
		mastery: null
	};
}

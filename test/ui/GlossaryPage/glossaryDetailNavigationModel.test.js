import { describe, expect, test } from "@jest/globals";
import { createGlossaryDetailNavigationPresentation } from "../../../src/ui/viewmodel/GlossaryPage/glossaryDetailNavigationModel.js";

const t = Object.freeze({
	glossaryPageDetailBackLabel: (term) => `Tilbake til ${term}`,
	glossaryPageDetailPositionLabel: (position, total) => `${position} av ${total}`,
	glossaryPageDetailOutsideSelectionLabel: "Utenfor utvalget",
	glossaryPageDetailPreviousLabel: "Forrige",
	glossaryPageDetailNextLabel: "Neste"
});

const visibleGlossaryEntryKeys = ["aes", "tls", "pki", "hash"];
const localizedEntryByKey = new Map([
	["aes", createGlossaryEntry("aes", "AES")],
	["tls", createGlossaryEntry("tls", "TLS")],
	["pki", createGlossaryEntry("pki", "PKI")],
	["hash", createGlossaryEntry("hash", "Hash")],
	["mac", createGlossaryEntry("mac", "MAC")],
	["hmac", createGlossaryEntry("hmac", "HMAC")]
]);

describe("glossaryDetailNavigationModel", () => {
	test("maps the first visible entry to the beginning of the sequence", () => {
		expect(createGlossaryDetailNavigationPresentation(createNavigationInput({
			activeGlossaryEntryKey: "aes",
			trailKeys: []
		}))).toEqual({
			trailBack: null,
			sequence: {
				isInSequence: true,
				positionLabel: "1 av 4",
				previous: {
					targetGlossaryEntryKey: null,
					isDisabled: true,
					label: "Forrige"
				},
				next: {
					targetGlossaryEntryKey: "tls",
					isDisabled: false,
					label: "Neste"
				}
			}
		});
	});

	test("maps a middle visible entry to its sequence neighbors", () => {
		const presentation = createGlossaryDetailNavigationPresentation(createNavigationInput({
			activeGlossaryEntryKey: "pki",
			trailKeys: []
		}));

		expect(presentation.sequence).toEqual({
			isInSequence: true,
			positionLabel: "3 av 4",
			previous: {
				targetGlossaryEntryKey: "tls",
				isDisabled: false,
				label: "Forrige"
			},
			next: {
				targetGlossaryEntryKey: "hash",
				isDisabled: false,
				label: "Neste"
			}
		});
		expect(presentation.trailBack).toBeNull();
	});

	test("disables sequence navigation outside the visible selection while keeping trail back", () => {
		const presentation = createGlossaryDetailNavigationPresentation(createNavigationInput({
			activeGlossaryEntryKey: "mac",
			trailKeys: ["aes"]
		}));

		expect(presentation).toEqual({
			trailBack: {
				targetGlossaryEntryKey: "aes",
				label: "Tilbake til AES"
			},
			sequence: {
				isInSequence: false,
				positionLabel: "Utenfor utvalget",
				previous: {
					targetGlossaryEntryKey: null,
					isDisabled: true,
					label: "Forrige"
				},
				next: {
					targetGlossaryEntryKey: null,
					isDisabled: true,
					label: "Neste"
				}
			}
		});
	});

	test("uses the last trail entry as the trail-back target", () => {
		const presentation = createGlossaryDetailNavigationPresentation(createNavigationInput({
			activeGlossaryEntryKey: "hmac",
			trailKeys: ["aes", "mac"]
		}));

		expect(presentation.trailBack).toEqual({
			targetGlossaryEntryKey: "mac",
			label: "Tilbake til MAC"
		});
	});

	test("keeps sequence navigation available when an explored entry is also visible", () => {
		const presentation = createGlossaryDetailNavigationPresentation(createNavigationInput({
			activeGlossaryEntryKey: "tls",
			trailKeys: ["aes"]
		}));

		expect(presentation.trailBack).toEqual({
			targetGlossaryEntryKey: "aes",
			label: "Tilbake til AES"
		});
		expect(presentation.sequence).toEqual({
			isInSequence: true,
			positionLabel: "2 av 4",
			previous: {
				targetGlossaryEntryKey: "aes",
				isDisabled: false,
				label: "Forrige"
			},
			next: {
				targetGlossaryEntryKey: "pki",
				isDisabled: false,
				label: "Neste"
			}
		});
	});

	test("throws when the trail references an unknown glossary entry", () => {
		expect(() => createGlossaryDetailNavigationPresentation(createNavigationInput({
			activeGlossaryEntryKey: "mac",
			trailKeys: ["missing-entry"]
		}))).toThrow("Missing glossary overview entry for detail navigation trail: missing-entry");
	});
});

function createNavigationInput({ activeGlossaryEntryKey, trailKeys }) {
	return {
		activeGlossaryEntryKey,
		visibleGlossaryEntryKeys,
		trailKeys,
		localizedEntryByKey,
		t
	};
}

function createGlossaryEntry(glossaryEntryKey, term) {
	return {
		glossaryEntryKey,
		term
	};
}

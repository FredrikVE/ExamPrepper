import { describe, expect, test } from "@jest/globals";
import { createGlossaryDetailPresentation } from "../../../src/ui/viewmodel/GlossaryPage/glossaryDetailModel.js";

const t = Object.freeze({
	glossaryPageSingleAssociationLabel: "1 assosiert begrep",
	glossaryPageMultipleAssociationsLabel: (count) => `${count} assosierte begreper`,
	glossaryPageAssociatedWithLabel: "Assosiert med",
	glossaryPageNoAssociationsLabel: "Ingen assosierte begreper er lagt til.",
	glossaryPageNetworkCenterLabel: "Valgt begrep",
	glossaryPageNetworkEmptyLabel: "Ingen koblinger er tilgjengelige for dette begrepet.",
	glossaryPageNetworkLoadingLabel: "Laster sammenhengsgraf …",
	glossaryPageNetworkDirectAssociationLabel: "Direkte assosiasjon",
	glossaryPageNetworkSecondaryAssociationLabel: "Kobling mellom relaterte begreper",
	glossaryPageNetworkLimitLabel: (count) => `${count} skjulte koblinger`,
	glossaryPageDetailBackLabel: (term) => `Tilbake til ${term}`,
	glossaryPageDetailPositionLabel: (position, total) => `${position} av ${total}`,
	glossaryPageDetailOutsideSelectionLabel: "Utenfor utvalget",
	glossaryPageDetailPreviousLabel: "Forrige",
	glossaryPageDetailNextLabel: "Neste",
	glossaryPageDetailSubtitle: (chapterReference, chapterLabel, associationLabel) => `${chapterReference} · ${chapterLabel} · ${associationLabel}`,
	glossaryPageDetailCloseLabel: "Lukk detaljvisningen",
	glossaryPageDetailExplanationHeading: "Forklaring",
	glossaryPageDetailNetworkHeading: "Plass i pensum",
	glossaryPageDetailNavigationAriaLabel: "Naviger mellom begreper"
});

const activeEntry = Object.freeze({
	glossaryEntryKey: "aes",
	topicAreaKey: "cryptography",
	term: "AES",
	explanation: "Advanced Encryption Standard er en symmetrisk blokkchifferstandard.",
	directNeighborGlossaryKeys: ["mac", "hash"]
});

const localizedEntryByKey = new Map([
	["aes", activeEntry],
	["mac", createGlossaryEntry("mac", "MAC")],
	["hash", createGlossaryEntry("hash", "Hash")],
	["tls", createGlossaryEntry("tls", "TLS")]
]);
const topicAreaByKey = new Map([["cryptography", { key: "cryptography", label: "Kryptografi" }]]);
const topicAreaReferenceByKey = new Map([["cryptography", "Kapittel 2"]]);

const networkModel = Object.freeze({
	nodes: Object.freeze([
		Object.freeze({ glossaryEntryKey: "mac" }),
		Object.freeze({ glossaryEntryKey: "hash" })
	])
});

const contentNetworkDisplay = Object.freeze({
	kind: "content",
	model: networkModel
});

describe("glossaryDetailModel", () => {
	test("returns no detail presentation without an active entry", () => {
		expect(createGlossaryDetailPresentation(createDetailInput({
			activeGlossaryEntryKey: null,
			networkDisplay: { kind: "hidden" },
			trailKeys: []
		}))).toBeNull();
	});

	test("builds a complete detail presentation for the active glossary entry", () => {
		const presentation = createGlossaryDetailPresentation(createDetailInput({
			activeGlossaryEntryKey: "aes",
			networkDisplay: contentNetworkDisplay,
			trailKeys: []
		}));

		expect(presentation.header).toEqual({
			title: "AES",
			subtitle: "Kapittel 2 · Kryptografi · 2 assosierte begreper",
			closeLabel: "Lukk detaljvisningen",
			trailBack: null
		});
		expect(presentation.explanation).toEqual({
			heading: "Forklaring",
			text: activeEntry.explanation
		});
		expect(presentation.associations).toEqual({
			heading: "Assosiert med",
			emptyLabel: "Ingen assosierte begreper er lagt til.",
			items: [
				{ glossaryEntryKey: "mac", label: "MAC" },
				{ glossaryEntryKey: "hash", label: "Hash" }
			]
		});
		expect(presentation.navigation).toEqual({
			ariaLabel: "Naviger mellom begreper",
			positionLabel: "1 av 2",
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
		});
		expect(presentation.network).toEqual({
			heading: "Plass i pensum",
			display: {
				kind: "content",
				model: networkModel,
				instructions: null,
				centerLabel: "Valgt begrep",
				emptyLabel: "Ingen koblinger er tilgjengelige for dette begrepet.",
				directAssociationLabel: "Direkte assosiasjon",
				secondaryAssociationLabel: "Kobling mellom relaterte begreper",
				limitNote: null
			}
		});
	});

	test("keeps exploration trail navigation when the active entry is outside the visible sequence", () => {
		const presentation = createGlossaryDetailPresentation(createDetailInput({
			activeGlossaryEntryKey: "mac",
			networkDisplay: contentNetworkDisplay,
			trailKeys: ["aes"]
		}));

		expect(presentation.header.trailBack).toEqual({
			targetGlossaryEntryKey: "aes",
			label: "Tilbake til AES"
		});
		expect(presentation.navigation.positionLabel).toBe("Utenfor utvalget");
		expect(presentation.navigation.previous.isDisabled).toBe(true);
		expect(presentation.navigation.next.isDisabled).toBe(true);
	});

	test("maps loading and error network states without inventing network content", () => {
		const loadingPresentation = createGlossaryDetailPresentation(createDetailInput({
			activeGlossaryEntryKey: "aes",
			networkDisplay: { kind: "loading" },
			trailKeys: []
		}));
		const errorPresentation = createGlossaryDetailPresentation(createDetailInput({
			activeGlossaryEntryKey: "aes",
			networkDisplay: { kind: "error", message: "Kunne ikke laste grafen." },
			trailKeys: []
		}));

		expect(loadingPresentation.network.display).toEqual({
			kind: "loading",
			message: "Laster sammenhengsgraf …"
		});
		expect(errorPresentation.network.display).toEqual({
			kind: "error",
			message: "Kunne ikke laste grafen."
		});
	});

	test("adds a graph limit note from the active entry association count", () => {
		const input = createDetailInput({
			activeGlossaryEntryKey: "aes",
			networkDisplay: {
				kind: "content",
				model: { nodes: [{ glossaryEntryKey: "mac" }] }
			},
			trailKeys: []
		});
		const presentation = createGlossaryDetailPresentation(input);

		expect(presentation.network.display.limitNote).toBe("1 skjulte koblinger");
	});

	test("throws when an active entry references a missing association", () => {
		const incompleteEntryByKey = new Map([["aes", activeEntry], ["mac", localizedEntryByKey.get("mac")]]);
		const input = createDetailInput({
			activeGlossaryEntryKey: "aes",
			networkDisplay: contentNetworkDisplay,
			trailKeys: []
		});
		input.localizedEntryByKey = incompleteEntryByKey;

		expect(() => createGlossaryDetailPresentation(input)).toThrow("Missing glossary overview entry for detail association: hash");
	});

	test("throws when an active detail entry receives a hidden network state", () => {
		expect(() => createGlossaryDetailPresentation(createDetailInput({
			activeGlossaryEntryKey: "aes",
			networkDisplay: { kind: "hidden" },
			trailKeys: []
		}))).toThrow("Glossary detail requires a visible network state, received: hidden");
	});
});

function createDetailInput({ activeGlossaryEntryKey, networkDisplay, trailKeys }) {
	return {
		activeGlossaryEntryKey,
		localizedEntryByKey,
		topicAreaByKey,
		topicAreaReferenceByKey,
		networkDisplay,
		visibleGlossaryEntryKeys: ["aes", "tls"],
		trailKeys,
		t
	};
}

function createGlossaryEntry(glossaryEntryKey, term) {
	return {
		glossaryEntryKey,
		topicAreaKey: "cryptography",
		term,
		explanation: `${term} forklaring`,
		directNeighborGlossaryKeys: []
	};
}

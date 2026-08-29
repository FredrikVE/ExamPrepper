import { describe, expect, test } from "@jest/globals";
import { GLOSSARY_NETWORK_EDGE_ROLE, GLOSSARY_RELATION_TYPE } from "../../../src/constants/GlossaryContracts.js";
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
	glossaryPageDetailRelationsHeading: "Relasjoner",
	glossaryPageDetailRelationsLoadingLabel: "Laster relasjoner …",
	glossaryPageDetailRelationsEmptyLabel: "Ingen relasjoner er lagt til ennå.",
	glossaryPageDetailRelationsShowAllLabel: (count) => `Vis alle ${count} relasjoner`,
	glossaryPageDetailRelationsShowLessLabel: "Vis færre relasjoner",
	glossaryPageDetailNavigationAriaLabel: "Naviger mellom begreper",
	glossaryPageRelationRelatedLabel: "Relatert",
	glossaryPageRelationContrastsWithLabel: "Kontrast",
	glossaryPageRelationPrerequisiteLabel: "Forutsetning",
	glossaryPageRelationPartOfLabel: "Del av"
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
	["mac", createGlossaryEntry("mac", "MAC", ["aes"])],
	["hash", createGlossaryEntry("hash", "Hash")],
	["tls", createGlossaryEntry("tls", "TLS")]
]);
const topicAreaByKey = new Map([["cryptography", { key: "cryptography", label: "Kryptografi" }]]);
const topicAreaReferenceByKey = new Map([["cryptography", "Kapittel 2"]]);

const networkModel = Object.freeze({
	center: Object.freeze({
		glossaryEntryKey: "aes",
		term: "AES",
		chapterLabel: "Kapittel 2"
	}),
	nodes: Object.freeze([
		Object.freeze({ glossaryEntryKey: "mac", term: "MAC", chapterLabel: "Kapittel 2" }),
		Object.freeze({ glossaryEntryKey: "hash", term: "Hash", chapterLabel: "Kapittel 2" })
	]),
	edges: Object.freeze([
		Object.freeze({
			key: "aes:contrasts-with:mac",
			sourceGlossaryEntryKey: "aes",
			targetGlossaryEntryKey: "mac",
			edgeRole: GLOSSARY_NETWORK_EDGE_ROLE.DIRECT,
			relationType: GLOSSARY_RELATION_TYPE.CONTRASTS_WITH
		}),
		Object.freeze({
			key: "hash:prerequisite:aes",
			sourceGlossaryEntryKey: "hash",
			targetGlossaryEntryKey: "aes",
			edgeRole: GLOSSARY_NETWORK_EDGE_ROLE.DIRECT,
			relationType: GLOSSARY_RELATION_TYPE.PREREQUISITE
		})
	]),
	relationItems: Object.freeze([]),
	directRelations: Object.freeze([
		Object.freeze({
			subjectId: "in2120",
			sourceGlossaryKey: "aes",
			targetGlossaryKey: "mac",
			type: GLOSSARY_RELATION_TYPE.CONTRASTS_WITH
		}),
		Object.freeze({
			subjectId: "in2120",
			sourceGlossaryKey: "hash",
			targetGlossaryKey: "aes",
			type: GLOSSARY_RELATION_TYPE.PREREQUISITE
		})
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

	test("builds desktop network and typed relation presentation for the active glossary entry", () => {
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
		expect(presentation.relations).toEqual({
			heading: "Relasjoner",
			count: 2,
			display: {
				kind: "content",
				emptyLabel: "Ingen relasjoner er lagt til ennå.",
				items: [
					{
						glossaryEntryKey: "mac",
						label: "MAC",
						relationType: GLOSSARY_RELATION_TYPE.CONTRASTS_WITH,
						relationLabel: "Kontrast",
						sourceGlossaryEntryKey: "aes",
						targetGlossaryEntryKey: "mac"
					},
					{
						glossaryEntryKey: "hash",
						label: "Hash",
						relationType: GLOSSARY_RELATION_TYPE.PREREQUISITE,
						relationLabel: "Forutsetning",
						sourceGlossaryEntryKey: "hash",
						targetGlossaryEntryKey: "aes"
					}
				],
				toggle: null
			}
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
		expect(presentation.network.display).toMatchObject({
			kind: "content",
			model: networkModel,
			instructions: null,
			centerLabel: "Valgt begrep",
			emptyLabel: "Ingen koblinger er tilgjengelige for dette begrepet.",
			directAssociationLabel: "Direkte assosiasjon",
			secondaryAssociationLabel: "Kobling mellom relaterte begreper",
			limitNote: null
		});
		expect(presentation.network.display.detailGraph).toMatchObject({
			center: { glossaryEntryKey: "aes", term: "AES" },
			nodes: [
				{ glossaryEntryKey: "mac", term: "MAC" },
				{ glossaryEntryKey: "hash", term: "Hash" }
			],
			edges: [
				{ key: "aes:contrasts-with:mac", edgeRole: GLOSSARY_NETWORK_EDGE_ROLE.DIRECT },
				{ key: "hash:prerequisite:aes", edgeRole: GLOSSARY_NETWORK_EDGE_ROLE.DIRECT }
			]
		});
	});

	test("keeps exploration trail navigation when the active entry is outside the visible sequence", () => {
		const macNetworkModel = createSingleRelationNetworkModel("mac", "aes");
		const presentation = createGlossaryDetailPresentation(createDetailInput({
			activeGlossaryEntryKey: "mac",
			networkDisplay: { kind: "content", model: macNetworkModel },
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

	test("maps loading and error states for both graph and relation presentation", () => {
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
		expect(loadingPresentation.relations).toEqual({
			heading: "Relasjoner",
			count: 2,
			display: {
				kind: "loading",
				message: "Laster relasjoner …"
			}
		});
		expect(errorPresentation.network.display).toEqual({
			kind: "error",
			message: "Kunne ikke laste grafen."
		});
		expect(errorPresentation.relations.display).toEqual({
			kind: "error",
			message: "Kunne ikke laste grafen."
		});
	});

	test("adds a graph limit note from the active entry association count", () => {
		const limitedNetworkModel = {
			...networkModel,
			nodes: [networkModel.nodes[0]],
			edges: [networkModel.edges[0]]
		};
		const presentation = createGlossaryDetailPresentation(createDetailInput({
			activeGlossaryEntryKey: "aes",
			networkDisplay: { kind: "content", model: limitedNetworkModel },
			trailKeys: []
		}));

		expect(presentation.network.display.limitNote).toBe("1 skjulte koblinger");
	});

	test("collapses a large relation presentation to four rows", () => {
		const presentation = createGlossaryDetailPresentation(
			createDetailInputWithRelationCount({
				relationCount: 19,
				areRelationsExpanded: false
			})
		);

		expect(presentation.relations.count).toBe(19);
		expect(presentation.relations.display.items).toHaveLength(4);
		expect(presentation.relations.display.toggle).toEqual({
			isExpanded: false,
			label: "Vis alle 19 relasjoner"
		});
	});

	test("shows every relation when the relation presentation is expanded", () => {
		const presentation = createGlossaryDetailPresentation(
			createDetailInputWithRelationCount({
				relationCount: 19,
				areRelationsExpanded: true
			})
		);

		expect(presentation.relations.display.items).toHaveLength(19);
		expect(presentation.relations.display.toggle).toEqual({
			isExpanded: true,
			label: "Vis færre relasjoner"
		});
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

	test("throws when direct relation data does not cover every overview association", () => {
		const input = createDetailInput({
			activeGlossaryEntryKey: "aes",
			networkDisplay: {
				kind: "content",
				model: {
					...networkModel,
					directRelations: [networkModel.directRelations[0]]
				}
			},
			trailKeys: []
		});

		expect(() => createGlossaryDetailPresentation(input)).toThrow(
			"Missing direct glossary relation for neighbor: hash"
		);
	});

	test("throws when a direct relation does not reference the active entry", () => {
		const input = createDetailInput({
			activeGlossaryEntryKey: "aes",
			networkDisplay: {
				kind: "content",
				model: {
					...networkModel,
					directRelations: [{
						subjectId: "in2120",
						sourceGlossaryKey: "mac",
						targetGlossaryKey: "hash",
						type: GLOSSARY_RELATION_TYPE.RELATED
					}]
				}
			},
			trailKeys: []
		});

		expect(() => createGlossaryDetailPresentation(input)).toThrow(
			"Direct glossary relation does not reference active entry: aes"
		);
	});

	test("requires explicit relation expansion state for an active detail", () => {
		const input = createDetailInput({
			activeGlossaryEntryKey: "aes",
			networkDisplay: contentNetworkDisplay,
			trailKeys: []
		});
		delete input.areRelationsExpanded;

		expect(() => createGlossaryDetailPresentation(input)).toThrow(
			"Glossary detail relation expansion state must be boolean."
		);
	});

	test("throws when an active detail entry receives a hidden network state", () => {
		expect(() => createGlossaryDetailPresentation(createDetailInput({
			activeGlossaryEntryKey: "aes",
			networkDisplay: { kind: "hidden" },
			trailKeys: []
		}))).toThrow("Glossary detail requires a visible network state, received: hidden");
	});
});

function createDetailInput({
	activeGlossaryEntryKey,
	networkDisplay,
	trailKeys,
	areRelationsExpanded = false
}) {
	return {
		activeGlossaryEntryKey,
		localizedEntryByKey,
		topicAreaByKey,
		topicAreaReferenceByKey,
		networkDisplay,
		visibleGlossaryEntryKeys: ["aes", "tls"],
		trailKeys,
		areRelationsExpanded,
		t
	};
}

function createDetailInputWithRelationCount({ relationCount, areRelationsExpanded }) {
	const neighborKeys = Array.from({ length: relationCount }, (_value, index) => `neighbor-${index + 1}`);
	const active = {
		...activeEntry,
		directNeighborGlossaryKeys: neighborKeys
	};
	const entryByKey = new Map([["aes", active], ["tls", localizedEntryByKey.get("tls")]]);
	const directRelations = [];
	const nodes = [];
	const edges = [];

	for (let index = 0; index < neighborKeys.length; index += 1) {
		const glossaryEntryKey = neighborKeys[index];
		entryByKey.set(glossaryEntryKey, createGlossaryEntry(glossaryEntryKey, `Neighbor ${index + 1}`));
		directRelations.push({
			subjectId: "in2120",
			sourceGlossaryKey: "aes",
			targetGlossaryKey: glossaryEntryKey,
			type: GLOSSARY_RELATION_TYPE.RELATED
		});

		if (index < 8) {
			nodes.push({
				glossaryEntryKey,
				term: `Neighbor ${index + 1}`,
				chapterLabel: "Kapittel 2"
			});
			edges.push({
				key: `aes:related:${glossaryEntryKey}`,
				sourceGlossaryEntryKey: "aes",
				targetGlossaryEntryKey: glossaryEntryKey,
				edgeRole: GLOSSARY_NETWORK_EDGE_ROLE.DIRECT,
				relationType: GLOSSARY_RELATION_TYPE.RELATED
			});
		}
	}

	return {
		activeGlossaryEntryKey: "aes",
		localizedEntryByKey: entryByKey,
		topicAreaByKey,
		topicAreaReferenceByKey,
		networkDisplay: {
			kind: "content",
			model: {
				center: networkModel.center,
				nodes,
				edges,
				relationItems: [],
				directRelations
			}
		},
		visibleGlossaryEntryKeys: ["aes", "tls"],
		trailKeys: [],
		areRelationsExpanded,
		t
	};
}

function createSingleRelationNetworkModel(centerKey, neighborKey) {
	const centerEntry = localizedEntryByKey.get(centerKey);
	const neighborEntry = localizedEntryByKey.get(neighborKey);
	const relation = {
		subjectId: "in2120",
		sourceGlossaryKey: centerKey,
		targetGlossaryKey: neighborKey,
		type: GLOSSARY_RELATION_TYPE.RELATED
	};

	return {
		center: {
			glossaryEntryKey: centerKey,
			term: centerEntry.term,
			chapterLabel: "Kapittel 2"
		},
		nodes: [{
			glossaryEntryKey: neighborKey,
			term: neighborEntry.term,
			chapterLabel: "Kapittel 2"
		}],
		edges: [{
			key: `${centerKey}:related:${neighborKey}`,
			sourceGlossaryEntryKey: centerKey,
			targetGlossaryEntryKey: neighborKey,
			edgeRole: GLOSSARY_NETWORK_EDGE_ROLE.DIRECT,
			relationType: GLOSSARY_RELATION_TYPE.RELATED
		}],
		relationItems: [],
		directRelations: [relation]
	};
}

function createGlossaryEntry(glossaryEntryKey, term, directNeighborGlossaryKeys = []) {
	return {
		glossaryEntryKey,
		topicAreaKey: "cryptography",
		term,
		explanation: `${term} forklaring`,
		directNeighborGlossaryKeys
	};
}

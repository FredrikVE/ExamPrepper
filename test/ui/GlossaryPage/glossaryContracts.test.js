// test/ui/GlossaryPage/glossaryContracts.test.js
import { describe, expect, test } from "@jest/globals";
import { CONCEPT_MASTERY_STATUS } from "../../../src/constants/ConceptMasteryStatus.js";
import { GLOSSARY_NETWORK_EDGE_ROLE } from "../../../src/constants/GlossaryNetworkEdgeRole.js";
import { GLOSSARY_RELATION_TYPE } from "../../../src/constants/GlossaryRelationType.js";
import { resolveLocalizedText } from "../../../src/ui/viewmodel/GlossaryPage/resolveLocalizedText.js";
import { createGlossaryMasteryPresentation } from "../../../src/ui/viewmodel/GlossaryPage/glossaryMasteryModel.js";
import { createGlossaryNetworkPresentation } from "../../../src/ui/viewmodel/GlossaryPage/glossaryNetworkModel.js";

const t = Object.freeze({
	glossaryPageMasteryNotAssessedLabel: "Ikke vurdert",
	glossaryPageMasteryPracticeLabel: "Øv mer",
	glossaryPageMasteryProgressLabel: "På vei",
	glossaryPageMasteryUnderstoodLabel: "Forstått",
	glossaryPageMasteryAriaLabel: (statusLabel) => `Vurdering: ${statusLabel}`,
	glossaryPageMasteryNoScoreLabel: "Ingen score",
	glossaryPageMasteryCorrectIncorrectLabel: (correct, incorrect) => `${correct}/${incorrect}`,
	glossaryPageMasteryScoreLabel: (score) => `${score}%`,
	glossaryPageMasteryNeverPracticedLabel: "Aldri",
	glossaryPageMasteryLastPracticedLabel: (date) => date,
	glossaryPageDifficultyEasyLabel: "Lett",
	glossaryPageDifficultyMediumLabel: "Middels",
	glossaryPageDifficultyHardLabel: "Vanskelig",
	glossaryPageRelationRelatedLabel: "relatert",
	glossaryPageRelationContrastsWithLabel: "kontrasterer",
	glossaryPageRelationPrerequisiteLabel: "forutsetning",
	glossaryPageRelationPartOfLabel: "del av"
});

describe("glossary contracts", () => {
	test("resolves only the requested localized text", () => {
		expect(resolveLocalizedText({ no: "Norsk", en: "English" }, "no")).toBe("Norsk");
		expect(() => resolveLocalizedText({ no: "Norsk", en: "English" }, "sv")).toThrow("Missing localized text for language: sv");
	});

	test("throws on unknown mastery status instead of falling back", () => {
		expect(() => createGlossaryMasteryPresentation(createMastery("mastered"), t)).toThrow("Unknown mastery status: mastered");
	});

	test("keeps every registered mastery status mapped", () => {
		for (const status of Object.values(CONCEPT_MASTERY_STATUS)) {
			expect(createGlossaryMasteryPresentation(createMastery(status), t).statusLabel).toEqual(expect.any(String));
		}
	});

	test("maps absent backend mastery to an explicit read-only not-assessed presentation", () => {
		expect(createGlossaryMasteryPresentation(null, t)).toEqual({
			status: CONCEPT_MASTERY_STATUS.NOT_ASSESSED,
			statusLabel: "Ikke vurdert",
			ariaLabel: "Vurdering: Ikke vurdert",
			isAssessed: false,
			scaleItems: [
				{ status: CONCEPT_MASTERY_STATUS.PRACTICE, label: "Øv mer", isActive: false },
				{ status: CONCEPT_MASTERY_STATUS.PROGRESS, label: "På vei", isActive: false },
				{ status: CONCEPT_MASTERY_STATUS.UNDERSTOOD, label: "Forstått", isActive: false }
			]
		});
	});

	test("throws on unknown relation type instead of labelling it related", () => {
		expect(() => createGlossaryNetworkPresentation(createNetworkInput("contradicts"))).toThrow("Unknown glossary relation type: contradicts");
	});

	test("keeps every registered relation type mapped", () => {
		for (const relationType of Object.values(GLOSSARY_RELATION_TYPE)) {
			expect(() => createGlossaryNetworkPresentation(createNetworkInput(relationType))).not.toThrow();
		}
	});

	test("consumes network edge role from the backend contract instead of inferring it", () => {
		const presentation = createGlossaryNetworkPresentation(
			createNetworkInput(GLOSSARY_RELATION_TYPE.RELATED, GLOSSARY_NETWORK_EDGE_ROLE.SECONDARY)
		);

		expect(presentation.edges[0].edgeRole).toBe(GLOSSARY_NETWORK_EDGE_ROLE.SECONDARY);
		expect(presentation.hasSecondaryEdges).toBe(true);
	});
});

function createMastery(status) {
	return {
		status,
		score: null,
		evidenceCount: 0,
		correctCount: 0,
		incorrectCount: 0,
		easyCorrect: 0,
		easyIncorrect: 0,
		mediumCorrect: 0,
		mediumIncorrect: 0,
		hardCorrect: 0,
		hardIncorrect: 0,
		lastEvidenceAt: null,
		policyVersion: 1
	};
}

function createNetworkInput(relationType, edgeRole = GLOSSARY_NETWORK_EDGE_ROLE.DIRECT) {
	return {
		network: {
			center: createConcept("center"),
			nodes: [createConcept("neighbor")],
			relations: [{ sourceGlossaryKey: "center", targetGlossaryKey: "neighbor", type: relationType, role: edgeRole }],
			directRelations: [{ sourceGlossaryKey: "center", targetGlossaryKey: "neighbor", type: relationType }],
			limit: 8,
			depth: 1
		},
		language: "no",
		topicAreaReferenceByKey: new Map([["topic-1", "1"]]),
		t
	};
}

function createConcept(glossaryEntryKey) {
	return {
		glossaryEntryKey,
		topicAreaKey: "topic-1",
		term: { no: glossaryEntryKey, en: glossaryEntryKey },
		explanation: { no: "Forklaring", en: "Explanation" },
		position: 1,
		mastery: null
	};
}

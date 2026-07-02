import { describe, expect, test } from "@jest/globals";
import { NAV_GRAPH, NAV_SCREENS, createAppBackContract, hasBackNavigation, resolveBackNavigation, resolveScreenEntry } from "../../src/navigation/navGraph.js";

const WITH_SUBJECT_AND_EXAM = {
	selectedSubjectId: "in5431",
	selectedExamId: "in5431-h25"
};

const WITH_SUBJECT_ONLY = {
	selectedSubjectId: "in5431",
	selectedExamId: null
};

const WITHOUT_SELECTION = {
	selectedSubjectId: null,
	selectedExamId: null
};

describe("navGraph", () => {
	test("declares graph nodes only for renderable navigation screens", () => {
		expect(Object.keys(NAV_GRAPH)).toEqual([
			NAV_SCREENS.SUBJECTS,
			NAV_SCREENS.SELECT,
			NAV_SCREENS.EXAM,
			NAV_SCREENS.FLIPCARDS,
			NAV_SCREENS.OVERVIEW
		]);
		expect(NAV_GRAPH[NAV_SCREENS.NOTES]).toBeUndefined();
		expect(NAV_GRAPH[NAV_SCREENS.SETTINGS]).toBeUndefined();
	});

	test.each([
		[
			"SUBJECTS nullstiller fag og eksamen",
			NAV_SCREENS.SUBJECTS,
			WITH_SUBJECT_AND_EXAM,
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null }
		],
		[
			"SELECT med fag beholder fag og nullstiller eksamen",
			NAV_SCREENS.SELECT,
			WITH_SUBJECT_AND_EXAM,
			{ screen: NAV_SCREENS.SELECT, selectedSubjectId: "in5431", selectedExamId: null }
		],
		[
			"SELECT uten fag faller tilbake til SUBJECTS",
			NAV_SCREENS.SELECT,
			WITHOUT_SELECTION,
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null }
		],
		[
			"EXAM med valgt eksamen beholder fag og eksamen",
			NAV_SCREENS.EXAM,
			WITH_SUBJECT_AND_EXAM,
			{ screen: NAV_SCREENS.EXAM, selectedSubjectId: "in5431", selectedExamId: "in5431-h25" }
		],
		[
			"EXAM uten valgt eksamen avvises",
			NAV_SCREENS.EXAM,
			WITH_SUBJECT_ONLY,
			null
		],
		[
			"FLIPCARDS med fag beholder fag og nullstiller eksamen",
			NAV_SCREENS.FLIPCARDS,
			WITH_SUBJECT_AND_EXAM,
			{ screen: NAV_SCREENS.FLIPCARDS, selectedSubjectId: "in5431", selectedExamId: null }
		],
		[
			"FLIPCARDS uten fag faller tilbake til SUBJECTS",
			NAV_SCREENS.FLIPCARDS,
			WITHOUT_SELECTION,
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null }
		],
		[
			"OVERVIEW uten fag er tillatt og nullstiller eksamen",
			NAV_SCREENS.OVERVIEW,
			WITHOUT_SELECTION,
			{ screen: NAV_SCREENS.OVERVIEW, selectedSubjectId: null, selectedExamId: null }
		],
		[
			"ukjent skjerm avvises",
			"finnes-ikke",
			WITH_SUBJECT_AND_EXAM,
			null
		]
	])("resolveScreenEntry: %s", (_, nextScreen, navState, expected) => {
		expect(resolveScreenEntry(nextScreen, navState)).toEqual(expected);
	});

	test.each([
		[
			"SUBJECTS har ingen back",
			{ activeScreen: NAV_SCREENS.SUBJECTS, ...WITH_SUBJECT_AND_EXAM },
			null
		],
		[
			"SELECT går tilbake til SUBJECTS og nullstiller alt",
			{ activeScreen: NAV_SCREENS.SELECT, ...WITH_SUBJECT_AND_EXAM },
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null }
		],
		[
			"EXAM med fag går tilbake til SELECT og nullstiller eksamen",
			{ activeScreen: NAV_SCREENS.EXAM, ...WITH_SUBJECT_AND_EXAM },
			{ screen: NAV_SCREENS.SELECT, selectedSubjectId: "in5431", selectedExamId: null }
		],
		[
			"EXAM uten fag faller tilbake til SUBJECTS",
			{ activeScreen: NAV_SCREENS.EXAM, selectedSubjectId: null, selectedExamId: "in5431-h25" },
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null }
		],
		[
			"FLIPCARDS med fag går tilbake til SELECT",
			{ activeScreen: NAV_SCREENS.FLIPCARDS, ...WITH_SUBJECT_AND_EXAM },
			{ screen: NAV_SCREENS.SELECT, selectedSubjectId: "in5431", selectedExamId: null }
		],
		[
			"FLIPCARDS uten fag faller tilbake til SUBJECTS",
			{ activeScreen: NAV_SCREENS.FLIPCARDS, selectedSubjectId: null, selectedExamId: null },
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null }
		],
		[
			"OVERVIEW med fag går tilbake til SELECT",
			{ activeScreen: NAV_SCREENS.OVERVIEW, ...WITH_SUBJECT_AND_EXAM },
			{ screen: NAV_SCREENS.SELECT, selectedSubjectId: "in5431", selectedExamId: null }
		],
		[
			"OVERVIEW uten fag faller tilbake til SUBJECTS via SELECT-guard",
			{ activeScreen: NAV_SCREENS.OVERVIEW, selectedSubjectId: null, selectedExamId: null },
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null }
		],
		[
			"ukjent aktiv skjerm går tilbake til SUBJECTS",
			{ activeScreen: "finnes-ikke", ...WITH_SUBJECT_AND_EXAM },
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null }
		]
	])("resolveBackNavigation: %s", (_, navState, expected) => {
		expect(resolveBackNavigation(navState)).toEqual(expected);
	});

	test.each([
		[NAV_SCREENS.SUBJECTS, false],
		[NAV_SCREENS.SELECT, true],
		[NAV_SCREENS.EXAM, true],
		[NAV_SCREENS.FLIPCARDS, true],
		[NAV_SCREENS.OVERVIEW, true],
		[NAV_SCREENS.NOTES, true],
		[NAV_SCREENS.SETTINGS, true],
		["finnes-ikke", true]
	])("hasBackNavigation(%s) returns %s", (activeScreen, expected) => {
		expect(hasBackNavigation(activeScreen)).toBe(expected);
	});

	test("createAppBackContract derives showBackButton from the navigation graph", () => {
		const onBack = () => {};

		expect(createAppBackContract({
			activeScreen: NAV_SCREENS.SUBJECTS,
			backLabel: "Tilbake",
			navigationLabel: "Navigasjon",
			onBack
		})).toEqual({
			showBackButton: false,
			backLabel: "Tilbake",
			navigationLabel: "Navigasjon",
			onBack
		});

		expect(createAppBackContract({
			activeScreen: NAV_SCREENS.EXAM,
			backLabel: "Tilbake",
			navigationLabel: "Navigasjon",
			onBack
		}).showBackButton).toBe(true);
	});
});

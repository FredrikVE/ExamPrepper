import { describe, expect, test } from "@jest/globals";
import { NAV_GRAPH, NAV_SCREENS, createAppBackContract, hasBackNavigation, resolveBackNavigation, resolveScreenChrome, resolveScreenEntry } from "../../src/navigation/navGraph.js";

const WITH_SUBJECT_AND_EXAM = {
	selectedSubjectId: "in5431",
	selectedExamId: "in5431-h25",
	selectedTopicAreaKey: null
};

const WITH_SUBJECT_ONLY = {
	selectedSubjectId: "in5431",
	selectedExamId: null,
	selectedTopicAreaKey: null
};

const WITHOUT_SELECTION = {
	selectedSubjectId: null,
	selectedExamId: null,
	selectedTopicAreaKey: null
};

describe("navGraph", () => {
	test("declares graph nodes only for renderable navigation screens", () => {
		expect(Object.keys(NAV_GRAPH)).toEqual([
			NAV_SCREENS.SUBJECTS,
			NAV_SCREENS.SELECT,
			NAV_SCREENS.EXAM,
			NAV_SCREENS.FLIPCARDS,
			NAV_SCREENS.MATCHCARDS,
			NAV_SCREENS.GLOSSARY,
			NAV_SCREENS.OVERVIEW
		]);
	});

	test("declares complete screen chrome for every graph node", () => {
		expect(Object.values(NAV_GRAPH).every((node) => (
		typeof node.pageClass === "string"
		&& typeof node.shellClass === "string"
		&& Object.prototype.hasOwnProperty.call(node, "themeScope")
	))).toBe(true);
	});

	test("lets the glossary graph node own topic-area reset", () => {
		expect(NAV_GRAPH[NAV_SCREENS.GLOSSARY].clearsTopicArea).toBe(true);
	});

	test.each([
		[NAV_SCREENS.SUBJECTS, "exam-select-page", "exam-select-shell"],
		[NAV_SCREENS.SELECT, "exam-select-page", "exam-select-shell"],
		[NAV_SCREENS.OVERVIEW, "exam-select-page", "exam-select-shell"],
		[NAV_SCREENS.EXAM, "exam-page", "exam-shell"],
		[NAV_SCREENS.GLOSSARY, "exam-select-page", "exam-select-shell"],
		["finnes-ikke", "exam-select-page", "exam-select-shell"]
	])("resolveScreenChrome(%s) returns standard classes", (screen, pageClassName, shellClassName) => {
		expect(resolveScreenChrome(screen)).toEqual({
			pageClassName,
			shellClassName
		});
	});

	test.each([NAV_SCREENS.FLIPCARDS, NAV_SCREENS.MATCHCARDS])(
		"resolveScreenChrome adds the card-practice theme scope for %s",
		(screen) => {
			expect(resolveScreenChrome(screen)).toEqual({
				pageClassName: "exam-page flipcards-theme-scope",
				shellClassName: "exam-shell"
			});
		}
	);

	test.each([
		[
			"SUBJECTS nullstiller fag og eksamen",
			NAV_SCREENS.SUBJECTS,
			WITH_SUBJECT_AND_EXAM,
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null, selectedTopicAreaKey: null }
		],
		[
			"SELECT med fag beholder fag og nullstiller eksamen",
			NAV_SCREENS.SELECT,
			WITH_SUBJECT_AND_EXAM,
			{ screen: NAV_SCREENS.SELECT, selectedSubjectId: "in5431", selectedExamId: null, selectedTopicAreaKey: null }
		],
		[
			"SELECT uten fag faller tilbake til SUBJECTS",
			NAV_SCREENS.SELECT,
			WITHOUT_SELECTION,
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null, selectedTopicAreaKey: null }
		],
		[
			"EXAM med valgt eksamen beholder fag og eksamen",
			NAV_SCREENS.EXAM,
			WITH_SUBJECT_AND_EXAM,
			{ screen: NAV_SCREENS.EXAM, selectedSubjectId: "in5431", selectedExamId: "in5431-h25", selectedTopicAreaKey: null }
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
			{ screen: NAV_SCREENS.FLIPCARDS, selectedSubjectId: "in5431", selectedExamId: null, selectedTopicAreaKey: null }
		],
		[
			"FLIPCARDS uten fag faller tilbake til SUBJECTS",
			NAV_SCREENS.FLIPCARDS,
			WITHOUT_SELECTION,
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null, selectedTopicAreaKey: null }
		],
		[
			"MATCHCARDS med fag beholder fag og nullstiller eksamen",
			NAV_SCREENS.MATCHCARDS,
			WITH_SUBJECT_AND_EXAM,
			{ screen: NAV_SCREENS.MATCHCARDS, selectedSubjectId: "in5431", selectedExamId: null, selectedTopicAreaKey: null }
		],
		[
			"MATCHCARDS uten fag faller tilbake til SUBJECTS",
			NAV_SCREENS.MATCHCARDS,
			WITHOUT_SELECTION,
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null, selectedTopicAreaKey: null }
		],
		[
			"GLOSSARY med fag nullstiller tidligere topic-area-valg",
			NAV_SCREENS.GLOSSARY,
			{ ...WITH_SUBJECT_AND_EXAM, selectedTopicAreaKey: "old-topic-area" },
			{
				screen: NAV_SCREENS.GLOSSARY,
				selectedSubjectId: "in5431",
				selectedExamId: null,
				selectedTopicAreaKey: null
			}
		],
		[
			"GLOSSARY uten fag faller tilbake til SUBJECTS",
			NAV_SCREENS.GLOSSARY,
			{ ...WITHOUT_SELECTION, selectedTopicAreaKey: "unknown-key" },
			{
				screen: NAV_SCREENS.SUBJECTS,
				selectedSubjectId: null,
				selectedExamId: null,
				selectedTopicAreaKey: null
			}
		],
		[
			"OVERVIEW uten fag er tillatt og nullstiller eksamen",
			NAV_SCREENS.OVERVIEW,
			WITHOUT_SELECTION,
			{ screen: NAV_SCREENS.OVERVIEW, selectedSubjectId: null, selectedExamId: null, selectedTopicAreaKey: null }
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
			{ screen: NAV_SCREENS.SUBJECTS, ...WITH_SUBJECT_AND_EXAM },
			null
		],
		[
			"SELECT går tilbake til SUBJECTS og nullstiller alt",
			{ screen: NAV_SCREENS.SELECT, ...WITH_SUBJECT_AND_EXAM },
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null, selectedTopicAreaKey: null }
		],
		[
			"EXAM med fag går tilbake til SELECT og nullstiller eksamen",
			{ screen: NAV_SCREENS.EXAM, ...WITH_SUBJECT_AND_EXAM },
			{ screen: NAV_SCREENS.SELECT, selectedSubjectId: "in5431", selectedExamId: null, selectedTopicAreaKey: null }
		],
		[
			"EXAM uten fag faller tilbake til SUBJECTS",
			{ screen: NAV_SCREENS.EXAM, selectedSubjectId: null, selectedExamId: "in5431-h25", selectedTopicAreaKey: null },
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null, selectedTopicAreaKey: null }
		],
		[
			"FLIPCARDS med fag går tilbake til SELECT",
			{ screen: NAV_SCREENS.FLIPCARDS, ...WITH_SUBJECT_AND_EXAM },
			{ screen: NAV_SCREENS.SELECT, selectedSubjectId: "in5431", selectedExamId: null, selectedTopicAreaKey: null }
		],
		[
			"FLIPCARDS uten fag faller tilbake til SUBJECTS",
			{ screen: NAV_SCREENS.FLIPCARDS, selectedSubjectId: null, selectedExamId: null, selectedTopicAreaKey: null },
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null, selectedTopicAreaKey: null }
		],
		[
			"MATCHCARDS med fag går tilbake til SELECT",
			{ screen: NAV_SCREENS.MATCHCARDS, ...WITH_SUBJECT_AND_EXAM },
			{ screen: NAV_SCREENS.SELECT, selectedSubjectId: "in5431", selectedExamId: null, selectedTopicAreaKey: null }
		],
		[
			"MATCHCARDS uten fag faller tilbake til SUBJECTS",
			{ screen: NAV_SCREENS.MATCHCARDS, selectedSubjectId: null, selectedExamId: null, selectedTopicAreaKey: null },
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null, selectedTopicAreaKey: null }
		],
		[
			"GLOSSARY med fag går tilbake til SELECT og nullstiller topic-area-valg",
			{
				screen: NAV_SCREENS.GLOSSARY,
				...WITH_SUBJECT_AND_EXAM,
				selectedTopicAreaKey: "unknown-key"
			},
			{
				screen: NAV_SCREENS.SELECT,
				selectedSubjectId: "in5431",
				selectedExamId: null,
				selectedTopicAreaKey: null
			}
		],
		[
			"GLOSSARY uten fag faller tilbake til SUBJECTS",
			{ screen: NAV_SCREENS.GLOSSARY, selectedSubjectId: null, selectedExamId: null, selectedTopicAreaKey: null },
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null, selectedTopicAreaKey: null }
		],
		[
			"OVERVIEW med fag går tilbake til SELECT",
			{ screen: NAV_SCREENS.OVERVIEW, ...WITH_SUBJECT_AND_EXAM },
			{ screen: NAV_SCREENS.SELECT, selectedSubjectId: "in5431", selectedExamId: null, selectedTopicAreaKey: null }
		],
		[
			"OVERVIEW uten fag faller tilbake til SUBJECTS via SELECT-guard",
			{ screen: NAV_SCREENS.OVERVIEW, selectedSubjectId: null, selectedExamId: null, selectedTopicAreaKey: null },
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null, selectedTopicAreaKey: null }
		],
		[
			"ukjent aktiv skjerm går tilbake til SUBJECTS",
			{ screen: "finnes-ikke", ...WITH_SUBJECT_AND_EXAM },
			{ screen: NAV_SCREENS.SUBJECTS, selectedSubjectId: null, selectedExamId: null, selectedTopicAreaKey: null }
		]
	])("resolveBackNavigation: %s", (_, navState, expected) => {
		expect(resolveBackNavigation(navState)).toEqual(expected);
	});

	test.each([
		[NAV_SCREENS.SUBJECTS, false],
		[NAV_SCREENS.SELECT, true],
		[NAV_SCREENS.EXAM, true],
		[NAV_SCREENS.FLIPCARDS, true],
		[NAV_SCREENS.GLOSSARY, true],
		[NAV_SCREENS.OVERVIEW, true],
		["finnes-ikke", true]
	])("hasBackNavigation(%s) returns %s", (screen, expected) => {
		expect(hasBackNavigation(screen)).toBe(expected);
	});

	test("createAppBackContract derives showBackButton from the navigation graph", () => {
		const onBack = () => {};

		expect(createAppBackContract({
			screen: NAV_SCREENS.SUBJECTS,
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
			screen: NAV_SCREENS.EXAM,
			backLabel: "Tilbake",
			navigationLabel: "Navigasjon",
			onBack
		}).showBackButton).toBe(true);
	});
});

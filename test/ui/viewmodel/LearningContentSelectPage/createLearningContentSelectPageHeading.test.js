// test/ui/viewmodel/LearningContentSelectPage/createLearningContentSelectPageHeading.test.js
import { describe, expect, jest, test } from "@jest/globals";
import createLearningContentSelectPageHeading from "../../../../src/ui/viewmodel/LearningContentSelectPage/createLearningContentSelectPageHeading.js";
import { LEARNING_CONTENT_TYPES } from "../../../../src/navigation/learningContent.js";

function createTranslations() {
	return {
		selectExamsTitle: "Velg eksamen",
		selectFlipcardsTitle: "Velg flipcards",
		selectMatchCardsTitle: "Velg begrepsmatch",
		selectGlossaryTitle: "Velg begrepsliste",
		selectSubtitle: jest.fn((subjectCode) => `Velg en øvingsprøve for ${subjectCode}`),
		selectSubtitleFallback: "Velg en øvingsprøve for å starte",
		selectExamsSubtitle: jest.fn((subjectCode) => `Velg en øvingsprøve for ${subjectCode}`),
		selectExamsSubtitleFallback: "Velg en øvingsprøve for å starte",
		selectFlipcardsSubtitle: jest.fn((subjectCode) => `Velg Flipcards for ${subjectCode}`),
		selectFlipcardsSubtitleFallback: "Velg Flipcards for å starte",
		selectMatchCardsSubtitle: jest.fn((subjectCode) => `Velg Begrepsmatch for ${subjectCode}`),
		selectMatchCardsSubtitleFallback: "Velg Begrepsmatch for å starte",
		selectGlossariesSubtitle: jest.fn((subjectCode) => `Øv på nøkkelbegreper og definisjoner for ${subjectCode}`),
		selectGlossariesSubtitleFallback: "Øv på nøkkelbegreper og definisjoner",
		selectLoadingMessage: "Laster eksamener...",
		selectEmptyTitle: "Ingen eksamener tilgjengelig",
		selectEmptyMessage: "Dette faget har ingen mock-eksamener ennå.",
		selectPracticeExamLabel: jest.fn((number) => `ØVINGSPRØVE ${number}`),
		selectQuestionLabel: "spørsmål",
		selectMinuteLabel: "minutter"
	};
}

function createEnglishTranslations() {
	return {
		...createTranslations(),
		selectExamsTitle: "Choose exam",
		selectFlipcardsTitle: "Choose flipcards",
		selectMatchCardsTitle: "Choose concept match",
		selectGlossaryTitle: "Choose glossary"
	};
}

describe("createLearningContentSelectPageHeading", () => {
	test("creates the exam heading from translations", () => {
		const t = createTranslations();
		const heading = createLearningContentSelectPageHeading(t, { code: "IN5431" }, LEARNING_CONTENT_TYPES.EXAMS);

		expect(heading).toEqual({
			title: "Velg eksamen",
			subtitle: "Velg en øvingsprøve for IN5431"
		});

		expect(t.selectExamsSubtitle).toHaveBeenCalledWith("IN5431");
	});

	test("returns localized title for each active content type", () => {
		const cases = [
			{ activeContentType: LEARNING_CONTENT_TYPES.EXAMS, noTitle: "Velg eksamen", enTitle: "Choose exam" },
			{ activeContentType: LEARNING_CONTENT_TYPES.FLIPCARDS, noTitle: "Velg flipcards", enTitle: "Choose flipcards" },
			{ activeContentType: LEARNING_CONTENT_TYPES.MATCHCARDS, noTitle: "Velg begrepsmatch", enTitle: "Choose concept match" },
			{ activeContentType: LEARNING_CONTENT_TYPES.GLOSSARY, noTitle: "Velg begrepsliste", enTitle: "Choose glossary" }
		];

		for (const testCase of cases) {
			const noHeading = createLearningContentSelectPageHeading(createTranslations(), { code: "IN2120" }, testCase.activeContentType);
			const enHeading = createLearningContentSelectPageHeading(createEnglishTranslations(), { code: "IN2120" }, testCase.activeContentType);

			expect(noHeading.title).toBe(testCase.noTitle);
			expect(enHeading.title).toBe(testCase.enTitle);
		}
	});

	test("returns exam title when content type is unknown", () => {
		const t = createTranslations();
		const heading = createLearningContentSelectPageHeading(t, { code: "IN2120" }, "unknown-content-type");

		expect(heading.title).toBe("Velg eksamen");
		expect(heading.subtitle).toBe("Velg en øvingsprøve for IN2120");
		expect(t.selectExamsSubtitle).toHaveBeenCalledWith("IN2120");
	});

	test("returns flipcards subtitle when flipcards content is active", () => {
		const t = createTranslations();
		const heading = createLearningContentSelectPageHeading(t, { code: "IN2120" }, LEARNING_CONTENT_TYPES.FLIPCARDS);

		expect(heading.title).toBe("Velg flipcards");
		expect(heading.subtitle).toBe("Velg Flipcards for IN2120");
		expect(t.selectFlipcardsSubtitle).toHaveBeenCalledWith("IN2120");
	});

	test("returns matchcards subtitle when matchcards content is active", () => {
		const t = createTranslations();
		const heading = createLearningContentSelectPageHeading(t, { code: "IN2120" }, LEARNING_CONTENT_TYPES.MATCHCARDS);

		expect(heading.title).toBe("Velg begrepsmatch");
		expect(heading.subtitle).toBe("Velg Begrepsmatch for IN2120");
		expect(t.selectMatchCardsSubtitle).toHaveBeenCalledWith("IN2120");
	});

	test("returns glossary subtitle when glossary content is active", () => {
		const t = createTranslations();
		const heading = createLearningContentSelectPageHeading(t, { code: "IN2120" }, LEARNING_CONTENT_TYPES.GLOSSARY);

		expect(heading.title).toBe("Velg begrepsliste");
		expect(heading.subtitle).toBe("Øv på nøkkelbegreper og definisjoner for IN2120");
		expect(t.selectGlossariesSubtitle).toHaveBeenCalledWith("IN2120");
	});

	test("uses active content fallback when subject code is missing", () => {
		const t = createTranslations();
		const heading = createLearningContentSelectPageHeading(t, null, LEARNING_CONTENT_TYPES.FLIPCARDS);

		expect(heading.title).toBe("Velg flipcards");
		expect(heading.subtitle).toBe("Velg Flipcards for å starte");
		expect(t.selectFlipcardsSubtitle).not.toHaveBeenCalled();
	});
});

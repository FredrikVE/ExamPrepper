// test/ui/viewmodel/LearningContentSelectPage/createLearningContentSelectPageCopy.test.js
import { describe, expect, jest, test } from "@jest/globals";
import createLearningContentSelectPageCopy from "../../../../src/ui/viewmodel/LearningContentSelectPage/createLearningContentSelectPageCopy.js";
import { LEARNING_CONTENT_TYPES } from "../../../../src/navigation/learningContent.js";

function createTranslations() {
    return {
        selectIntroTitle: "Velg eksamen",
        selectSubtitle: jest.fn((subjectCode) => `Velg en øvingsprøve for ${subjectCode}`),
        selectSubtitleFallback: "Velg en øvingsprøve for å starte",
        selectExamsSubtitle: jest.fn((subjectCode) => `Velg en øvingsprøve for ${subjectCode}`),
        selectExamsSubtitleFallback: "Velg en øvingsprøve for å starte",
        selectFlipcardsSubtitle: jest.fn((subjectCode) => `Velg Flipcards for ${subjectCode}`),
        selectFlipcardsSubtitleFallback: "Velg Flipcards for å starte",
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

describe("createLearningContentSelectPageCopy", () => {
    test("returns exam select copy from translations", () => {
        const t = createTranslations();
        const copy = createLearningContentSelectPageCopy(t, { code: "IN5431" });

        expect(copy).toEqual({
            title: "Velg eksamen",
            subtitle: "Velg en øvingsprøve for IN5431",
            loadingMessage: "Laster eksamener...",
            emptyTitle: "Ingen eksamener tilgjengelig",
            emptyMessage: "Dette faget har ingen mock-eksamener ennå.",
            practiceExamLabel: t.selectPracticeExamLabel,
            questionLabel: "spørsmål",
            minuteLabel: "minutter"
        });

        expect(t.selectExamsSubtitle).toHaveBeenCalledWith("IN5431");
    });

    test("returns flipcards subtitle when flipcards content is active", () => {
        const t = createTranslations();
        const copy = createLearningContentSelectPageCopy(
            t,
            { code: "IN2120" },
            LEARNING_CONTENT_TYPES.FLIPCARDS
        );

        expect(copy.subtitle).toBe("Velg Flipcards for IN2120");
        expect(t.selectFlipcardsSubtitle).toHaveBeenCalledWith("IN2120");
    });

    test("returns glossary subtitle when glossary content is active", () => {
        const t = createTranslations();
        const copy = createLearningContentSelectPageCopy(
            t,
            { code: "IN2120" },
            LEARNING_CONTENT_TYPES.CONCEPT_LISTS
        );

        expect(copy.subtitle).toBe("Øv på nøkkelbegreper og definisjoner for IN2120");
        expect(t.selectGlossariesSubtitle).toHaveBeenCalledWith("IN2120");
    });

    test("uses active content fallback when subject code is missing", () => {
        const t = createTranslations();
        const copy = createLearningContentSelectPageCopy(
            t,
            null,
            LEARNING_CONTENT_TYPES.FLIPCARDS
        );

        expect(copy.subtitle).toBe("Velg Flipcards for å starte");
        expect(t.selectFlipcardsSubtitle).not.toHaveBeenCalled();
    });
});

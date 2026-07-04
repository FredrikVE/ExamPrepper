// test/ui/viewmodel/LearningContentSelectPage/createLearningContentSelectPageCopy.test.js
import { describe, expect, jest, test } from "@jest/globals";
import createLearningContentSelectPageCopy from "../../../../src/ui/viewmodel/LearningContentSelectPage/createLearningContentSelectPageCopy.js";

function createTranslations() {
    return {
        selectIntroTitle: "Velg eksamen",
        selectSubtitle: jest.fn((subjectCode) => `Velg en øvingsprøve for ${subjectCode}`),
        selectSubtitleFallback: "Velg en øvingsprøve for å starte",
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

        expect(t.selectSubtitle).toHaveBeenCalledWith("IN5431");
    });

    test("uses subtitle fallback when subject code is missing", () => {
        const t = createTranslations();
        const copy = createLearningContentSelectPageCopy(t, null);

        expect(copy.subtitle).toBe("Velg en øvingsprøve for å starte");
        expect(t.selectSubtitle).not.toHaveBeenCalled();
    });
});

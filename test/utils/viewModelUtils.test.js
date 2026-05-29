// test/utils/viewModelUtils.test.js
import { describe, expect, test } from "@jest/globals";
import getAnsweredCountLabel from "../../src/ui/viewmodel/Utils/getAnsweredCountLabel.js";
import getFeedbackToggleLabel from "../../src/ui/viewmodel/Utils/getFeedbackToggleLabel.js";
import getQuestionProgressLabel from "../../src/ui/viewmodel/Utils/getQuestionProgressLabel.js";
import getScoreLabel from "../../src/ui/viewmodel/Utils/getScoreLabel.js";
import { buildExamProgressPoints } from "../../src/ui/view/components/ExamPage/ExamProgress/Utils/buildExamProgressPoints.js";

describe("view model utils", () => {
    test("formats answered count", () => {
        expect(getAnsweredCountLabel(3, 25)).toBe("3/25");
    });

    test("formats feedback toggle label", () => {
        expect(getFeedbackToggleLabel(true)).toBe("Skjul fasit");
        expect(getFeedbackToggleLabel(false)).toBe("Vis fasit");
    });

    test("formats question progress", () => {
        expect(getQuestionProgressLabel(0, 25)).toBe("1 / 25");
        expect(getQuestionProgressLabel(0, 0)).toBe("0 / 0");
    });

    test("formats score label", () => {
        expect(getScoreLabel(true, 7, 10)).toBe("7/10");
        expect(getScoreLabel(false, 7, 10)).toBe("—");
    });

    test("builds progress points for multiple questions", () => {
        const result = buildExamProgressPoints({ total: 25, currentQuestionNumber: 13 });

        expect(result.fillPercent).toBe(50);
        expect(result.points[0]).toEqual({ label: "Start", question: 1, left: 0 });
        expect(result.points.at(-1)).toEqual({ label: "25/25", question: 25, left: 100, isFlag: true });
    });

    test("builds progress points for one question", () => {
        const result = buildExamProgressPoints({ total: 1, currentQuestionNumber: 1 });

        expect(result.fillPercent).toBe(100);
        expect(result.points.at(-1)).toMatchObject({ question: 1, left: 100 });
    });
});

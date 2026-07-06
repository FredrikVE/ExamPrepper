// test/utils/viewModelUtils.test.js
import { describe, expect, test } from "@jest/globals";
import getAnsweredCountLabel from "../../src/ui/viewmodel/Utils/getAnsweredCountLabel.js";
import getFeedbackToggleLabel from "../../src/ui/viewmodel/Utils/getFeedbackToggleLabel.js";
import getQuestionProgressLabel from "../../src/ui/viewmodel/Utils/getQuestionProgressLabel.js";
import getScoreLabel from "../../src/ui/viewmodel/Utils/getScoreLabel.js";
import toggleExpandedAnswerOptionIndexes from "../../src/ui/viewmodel/Utils/toggleExpandedAnswerOptionIndexes.js";

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

    test("toggles multiple expanded answer option indexes", () => {
        expect(toggleExpandedAnswerOptionIndexes(undefined, 1)).toEqual([1]);
        expect(toggleExpandedAnswerOptionIndexes([1], 3)).toEqual([1, 3]);
        expect(toggleExpandedAnswerOptionIndexes([1, 3], 1)).toEqual([3]);
    });

});

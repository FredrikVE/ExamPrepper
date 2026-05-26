//test/utils/questionUtils.test.js
import { describe, expect, test } from "@jest/globals";
import { hasInlineFillBlank, isInlineBlankPart, splitPromptByInlineBlank } from "../../src/utils/questionutils/fillPromptUtils.js";
import { getExtendedExplanationPoints, hasExtendedExplanation } from "../../src/utils/questionutils/optionExplanationUtils.js";
import { getQuestionViewState, isFillQuestion } from "../../src/utils/questionutils/questionViewStateUtils.js";
import { QUESTION_TYPES } from "../../src/constants/QuestionTypes.js";

describe("question utils", () => {
    test("detects inline fill blanks", () => {
        expect(hasInlineFillBlank({ type: QUESTION_TYPES.FILL, prompt: "A ___ is B" })).toBe(true);
        expect(hasInlineFillBlank({ type: QUESTION_TYPES.SINGLE, prompt: "A ___ is B" })).toBe(false);
    });

    test("splits prompt by inline blank", () => {
        expect(splitPromptByInlineBlank("A ___ is B")).toEqual(["A ", "___", " is B"]);
    });

    test("detects blank prompt part", () => {
        expect(isInlineBlankPart("___")).toBe(true);
        expect(isInlineBlankPart("__x__")).toBe(false);
    });

    test("reads extended explanation points", () => {
        const option = { whyExtended: ["Point 1", "Point 2"] };

        expect(getExtendedExplanationPoints(option)).toEqual(["Point 1", "Point 2"]);
        expect(hasExtendedExplanation(option)).toBe(true);
        expect(hasExtendedExplanation({})).toBe(false);
    });

    test("identifies fill questions", () => {
        expect(isFillQuestion({ type: QUESTION_TYPES.FILL })).toBe(true);
        expect(isFillQuestion({ type: QUESTION_TYPES.MULTI })).toBe(false);
    });

    test("builds view state before submit", () => {
        const state = getQuestionViewState({
            question: { type: QUESTION_TYPES.SINGLE, source: "Lecture" },
            submitted: false,
            showAllFeedback: true,
            correct: false
        });

        expect(state).toMatchObject({
            feedbackMode: false,
            shouldShowOptions: true,
            shouldShowWarning: false,
            shouldShowSource: false
        });
    });

    test("builds view state after wrong submitted answer without full feedback", () => {
        const state = getQuestionViewState({
            question: { type: QUESTION_TYPES.SINGLE, source: "Lecture" },
            submitted: true,
            showAllFeedback: false,
            correct: false
        });

        expect(state.shouldShowWarning).toBe(true);
        expect(state.shouldShowSource).toBe(false);
    });

    test("builds view state for submitted fill question", () => {
        const state = getQuestionViewState({
            question: { type: QUESTION_TYPES.FILL, prompt: "A plain prompt" },
            submitted: true,
            showAllFeedback: true,
            correct: true
        });

        expect(state).toMatchObject({
            shouldShowFillInput: true,
            shouldShowOptions: false,
            shouldShowFillFeedback: true
        });
    });
});

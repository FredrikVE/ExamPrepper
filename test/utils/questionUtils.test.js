// test/utils/questionUtils.test.js
import { describe, expect, test } from "@jest/globals";
import { isInlineBlankPart, splitPromptByInlineBlank } from "../../src/ui/view/components/QuestionCard/QuestionTypes/FillBlankInputField/Utils/fillBlankPromptUtils.js";
import { getExtendedExplanationImages, getExtendedExplanationPoints, hasExtendedExplanation } from "../../src/ui/view/components/QuestionCard/AnswerCard/Utils/answerOptionCardView.js";
import { getQuestionViewState, hasInlineFillBlank } from "../../src/ui/viewmodel/Utils/questionCardViewState.js";
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

    test("reads extended explanation points and optional concept images", () => {
        const option = {
            whyExtended: ["Point 1", "Point 2"],
            whyExtendedImages: [
                {
                    id: "example",
                    src: "/subjects/in5431/designed-for-digital/d4d-building-blocks/example.svg",
                    alt: "Example diagram",
                    title: "Example",
                    caption: "A helpful visual."
                }
            ]
        };

        expect(getExtendedExplanationPoints(option)).toEqual(["Point 1", "Point 2"]);
        expect(getExtendedExplanationImages(option)).toEqual([
            {
                id: "example",
                src: "/subjects/in5431/designed-for-digital/d4d-building-blocks/example.svg",
                alt: "Example diagram",
                title: "Example",
                caption: "A helpful visual."
            }
        ]);
        expect(hasExtendedExplanation(option)).toBe(true);
        expect(hasExtendedExplanation({ whyExtendedImages: ["/subjects/in5431/designed-for-digital/d4d-building-blocks/only-image.svg"] })).toBe(true);
        expect(hasExtendedExplanation({})).toBe(false);
    });

    test("keeps matrix placement prompt ownership inside its renderer", () => {
        const state = getQuestionViewState({
            question: { type: QUESTION_TYPES.MATRIX_PLACEMENT },
            submitted: false,
            showAllFeedback: true,
            correct: false
        });

        expect(state.shouldShowPrompt).toBe(false);
    });

    test("shows fill feedback only in full feedback mode", () => {
        const question = { type: QUESTION_TYPES.FILL, prompt: "A plain prompt" };

        const answeringState = getQuestionViewState({
            question,
            submitted: false,
            showAllFeedback: true,
            correct: true
        });

        const feedbackState = getQuestionViewState({
            question,
            submitted: true,
            showAllFeedback: true,
            correct: true
        });

        expect(answeringState.shouldShowFillFeedback).toBe(false);
        expect(feedbackState.shouldShowFillFeedback).toBe(true);
    });

});

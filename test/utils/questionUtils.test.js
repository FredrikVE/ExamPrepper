//test/utils/questionUtils.test.js
import { describe, expect, test } from "@jest/globals";
import { hasInlineFillBlank, isInlineBlankPart, splitPromptByInlineBlank } from "../../src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/FillBlankInputField/Utils/fillBlankPromptUtils.js";
import { getExtendedExplanationPoints, hasExtendedExplanation } from "../../src/ui/view/components/ExamPage/QuestionCard/AnswerCard/Utils/answerOptionCardView.js";
import { getQuestionViewState, isFillQuestion, isMatrixPlacementQuestion } from "../../src/ui/view/components/ExamPage/QuestionCard/Shared/Utils/questionCardViewState.js";
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


    test("identifies matrix placement as a drag-drop question without options", () => {
        const state = getQuestionViewState({
            question: { type: QUESTION_TYPES.MATRIX_PLACEMENT },
            submitted: false,
            showAllFeedback: true,
            correct: false
        });

        expect(isMatrixPlacementQuestion({ type: QUESTION_TYPES.MATRIX_PLACEMENT })).toBe(true);
        expect(state).toMatchObject({
            shouldShowOptions: false,
            shouldShowPrompt: false,
            shouldShowDragDrop: true,
            shouldShowMatrixPlacement: true
        });
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
            shouldShowPrompt: true,
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

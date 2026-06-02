// test/utils/answerUtils.test.js
import { describe, expect, test } from "@jest/globals";
import normalizeAnswer from "../../src/model/domain/utils/normalizeAnswer.js";
import getOptionLetter from "../../src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/ChoiceShared/Utils/getOptionLetter.js";
import isOptionSelected from "../../src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/ChoiceShared/Utils/isOptionSelected.js";
import getAnswerLabel from "../../src/ui/view/components/ExamPage/FeedbackPanel/Utils/getAnswerLabel.js";
import AnswerLabelFormatter from "../../src/ui/view/components/ExamPage/FeedbackPanel/Utils/AnswerLabelFormatter.js";
import { QUESTION_TYPES } from "../../src/constants/QuestionTypes.js";

describe("answer utils", () => {
    test("normalizeAnswer trims, lowercases, removes punctuation and normalizes whitespace", () => {
        expect(normalizeAnswer("  Digital   Transformation!!! ")).toBe("digital transformation");
    });

    test("normalizeAnswer handles nullish values", () => {
        expect(normalizeAnswer(null)).toBe("");
        expect(normalizeAnswer(undefined)).toBe("");
    });


    test("getOptionLetter converts indexes to letters", () => {
        expect(getOptionLetter(0)).toBe("A");
        expect(getOptionLetter(2)).toBe("C");
    });

    test("isOptionSelected handles single choice", () => {
        expect(isOptionSelected(QUESTION_TYPES.SINGLE, 2, 2)).toBe(true);
        expect(isOptionSelected(QUESTION_TYPES.SINGLE, 1, 2)).toBe(false);
    });

    test("isOptionSelected handles multi choice", () => {
        expect(isOptionSelected(QUESTION_TYPES.MULTI, [1, 3], 3)).toBe(true);
        expect(isOptionSelected(QUESTION_TYPES.MULTI, [1, 3], 2)).toBe(false);
    });

    test("getAnswerLabel returns answerKey for fill question", () => {
        expect(getAnswerLabel({ type: QUESTION_TYPES.FILL, answerKey: "technology" })).toBe("technology");
    });

    test("AnswerLabelFormatter formats correct options", () => {
        const formatter = new AnswerLabelFormatter(" + ");
        const question = {
            type: QUESTION_TYPES.MULTI,
            options: [
                { text: "Operational Backbone", correct: true },
                { text: "PRINCE2", correct: false },
                { text: "Digital Platform", correct: true }
            ]
        };

        expect(formatter.format(question)).toBe("A. Operational Backbone + C. Digital Platform");
    });
});

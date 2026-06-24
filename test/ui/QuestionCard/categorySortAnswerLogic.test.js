// test/ui/QuestionCard/categorySortAnswerLogic.test.js
import { describe, expect, test } from "@jest/globals";
import { getCorrectCategoryId, getExpectedCategoryItemIds, isItemCorrectlyPlaced } from "../../../src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/CategorySort/Utils/categorySortAnswerLogic.js";

describe("categorySortAnswerLogic", () => {
    test("uses item correctCategoryId when persisted API question has no correctAnswer map", () => {
        const question = {
            categories: [
                { id: "vet", label: "Noe du vet" },
                { id: "har", label: "Noe du har" },
                { id: "er", label: "Noe du er" }
            ],
            items: [
                { id: "passord", text: "Passord", correctCategoryId: "vet" },
                { id: "bankid-brikke", text: "BankID-kodebrikke", correctCategoryId: "har" },
                { id: "fingeravtrykk", text: "Fingeravtrykk", correctCategoryId: "er" }
            ]
        };

        expect(getCorrectCategoryId(question, "passord")).toBe("vet");
        expect(getExpectedCategoryItemIds(question, "vet")).toEqual(["passord"]);
        expect(isItemCorrectlyPlaced(question, "vet", "passord")).toBe(true);
        expect(isItemCorrectlyPlaced(question, "har", "passord")).toBe(false);
    });

    test("does not read legacy correctAnswer map", () => {
        const question = {
            categories: [
                { id: "vet", label: "Noe du vet" }
            ],
            items: [
                { id: "passord", text: "Passord" }
            ],
            correctAnswer: {
                vet: ["passord"]
            }
        };

        expect(getCorrectCategoryId(question, "passord")).toBeNull();
        expect(getExpectedCategoryItemIds(question, "vet")).toEqual([]);
        expect(isItemCorrectlyPlaced(question, "vet", "passord")).toBe(false);
    });
});

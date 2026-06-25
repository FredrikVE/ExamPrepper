// test/ui/viewmodel/FlipcardsPage/flipcardsProgressModel.test.js
import { describe, expect, test } from "@jest/globals";
import {
    createFlipcardsProgressModel,
    FLIPCARD_PROGRESS_STATUS,
    resolveUpdatedFlipcardProgress
} from "../../../../src/ui/viewmodel/FlipcardsPage/flipcardsProgressModel.js";

const labels = {
    progressLabel: (completedCount, totalCount, masteredCount, practiceCount) => (
        `${completedCount}/${totalCount} reviewed · ${masteredCount} mastered · ${practiceCount} practice`
    ),
    completeBody: (masteredCount, practiceCount, totalCount) => (
        `${totalCount} total · ${masteredCount} mastered · ${practiceCount} practice`
    )
};

describe("flipcardsProgressModel", () => {
    test("moves a card from practice to mastered", () => {
        expect(resolveUpdatedFlipcardProgress({
            masteredCardIds: ["card-a"],
            practiceCardIds: ["card-b"],
            cardId: "card-b",
            status: FLIPCARD_PROGRESS_STATUS.MASTERED
        })).toEqual({
            masteredCardIds: ["card-a", "card-b"],
            practiceCardIds: []
        });
    });

    test("moves a card from mastered to practice", () => {
        expect(resolveUpdatedFlipcardProgress({
            masteredCardIds: ["card-a"],
            practiceCardIds: ["card-b"],
            cardId: "card-a",
            status: FLIPCARD_PROGRESS_STATUS.PRACTICE
        })).toEqual({
            masteredCardIds: [],
            practiceCardIds: ["card-b", "card-a"]
        });
    });

    test("creates counts, remaining count and labels", () => {
        expect(createFlipcardsProgressModel({
            totalCardCount: 4,
            masteredCardIds: ["card-a", "card-a"],
            practiceCardIds: ["card-b"],
            labels
        })).toEqual({
            totalCardCount: 4,
            masteredCount: 1,
            practiceCount: 1,
            completedCount: 2,
            remainingCount: 2,
            progressLabel: "2/4 reviewed · 1 mastered · 1 practice",
            completeBody: "4 total · 1 mastered · 1 practice"
        });
    });
});

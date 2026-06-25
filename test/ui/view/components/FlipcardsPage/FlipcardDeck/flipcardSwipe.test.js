import { describe, expect, test } from "@jest/globals";
import { FLIPCARD_SWIPE_RESULT, resolveFlipcardSwipeResult } from "../../../../../../src/ui/view/components/FlipcardsPage/FlipcardDeck/flipcardSwipe.js";

describe("resolveFlipcardSwipeResult", () => {
    test("returns practice when swiped far enough left", () => {
        expect(resolveFlipcardSwipeResult({ offsetX: -140, velocityX: 0 }))
            .toBe(FLIPCARD_SWIPE_RESULT.PRACTICE);
    });

    test("returns mastered when swiped far enough right", () => {
        expect(resolveFlipcardSwipeResult({ offsetX: 140, velocityX: 0 }))
            .toBe(FLIPCARD_SWIPE_RESULT.MASTERED);
    });

    test("returns null when card should snap back", () => {
        expect(resolveFlipcardSwipeResult({ offsetX: 80, velocityX: 200 })).toBeNull();
    });

    test("lets velocity win over offset", () => {
        expect(resolveFlipcardSwipeResult({ offsetX: 150, velocityX: -850 }))
            .toBe(FLIPCARD_SWIPE_RESULT.PRACTICE);

        expect(resolveFlipcardSwipeResult({ offsetX: -150, velocityX: 850 }))
            .toBe(FLIPCARD_SWIPE_RESULT.MASTERED);
    });
});

// src/ui/view/components/FlipcardsPage/FlipcardDeck/flipcardSwipe.js
export const FLIPCARD_SWIPE_RESULT = {
    PRACTICE: "practice",
    MASTERED: "mastered"
};

const SWIPE_OFFSET_THRESHOLD = 120;
const SWIPE_VELOCITY_THRESHOLD = 700;

export function resolveFlipcardSwipeResult({ offsetX, velocityX }) {
    if (velocityX <= -SWIPE_VELOCITY_THRESHOLD) {
        return FLIPCARD_SWIPE_RESULT.PRACTICE;
    }

    if (velocityX >= SWIPE_VELOCITY_THRESHOLD) {
        return FLIPCARD_SWIPE_RESULT.MASTERED;
    }

    if (offsetX <= -SWIPE_OFFSET_THRESHOLD) {
        return FLIPCARD_SWIPE_RESULT.PRACTICE;
    }

    if (offsetX >= SWIPE_OFFSET_THRESHOLD) {
        return FLIPCARD_SWIPE_RESULT.MASTERED;
    }

    return null;
}

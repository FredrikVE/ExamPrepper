// src/ui/view/components/FlipcardsPage/FlipcardDeck/flipcardSwipe.js
export const FLIPCARD_SWIPE_RESULT = {
    PRACTICE: "practice",
    MASTERED: "mastered"
};

export const FLIPCARD_SWIPE_COMMAND_DIRECTION = {
    LEFT: "left",
    RIGHT: "right"
};

const SWIPE_OFFSET_THRESHOLD = 120;
const SWIPE_VELOCITY_THRESHOLD = 700;

export function resolveFlipcardSwipeResult({ offsetX, velocityX }) {
    if (velocityX <= -SWIPE_VELOCITY_THRESHOLD) {
        return FLIPCARD_SWIPE_RESULT.MASTERED;
    }

    if (velocityX >= SWIPE_VELOCITY_THRESHOLD) {
        return FLIPCARD_SWIPE_RESULT.PRACTICE;
    }

    if (offsetX <= -SWIPE_OFFSET_THRESHOLD) {
        return FLIPCARD_SWIPE_RESULT.MASTERED;
    }

    if (offsetX >= SWIPE_OFFSET_THRESHOLD) {
        return FLIPCARD_SWIPE_RESULT.PRACTICE;
    }

    return null;
}

export function resolveFlipcardSwipeResultFromCommand(direction) {
    if (direction === FLIPCARD_SWIPE_COMMAND_DIRECTION.LEFT) {
        return FLIPCARD_SWIPE_RESULT.MASTERED;
    }

    if (direction === FLIPCARD_SWIPE_COMMAND_DIRECTION.RIGHT) {
        return FLIPCARD_SWIPE_RESULT.PRACTICE;
    }

    return null;
}

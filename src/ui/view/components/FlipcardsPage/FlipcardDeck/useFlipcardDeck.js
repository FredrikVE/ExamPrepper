// src/ui/view/components/FlipcardsPage/FlipcardDeck/useFlipcardDeck.js
import { useCallback, useEffect, useRef, useState } from "react";
import { FLIPCARD_SWIPE_COMMAND_DIRECTION } from "./flipcardSwipe.js";

export function useFlipcardDeck(cardCount, deckKey) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [swipeCommand, setSwipeCommand] = useState(null);
    const swipeCommandIdRef = useRef(0);

    useEffect(() => {
        setActiveIndex(0);
        setIsFlipped(false);
        setSwipeCommand(null);
    }, [deckKey]);

    const isComplete = activeIndex >= cardCount;
    const hasPrevious = activeIndex > 0;
    const hasNext = activeIndex < cardCount - 1;
    const isSwipeCommandActive = swipeCommand !== null;

    const flipActiveCard = useCallback(() => {
        setIsFlipped((flipped) => !flipped);
    }, []);

    const goToPrevious = useCallback(() => {
        setIsFlipped(false);
        setSwipeCommand(null);
        setActiveIndex((index) => Math.max(index - 1, 0));
    }, []);

    const goToNext = useCallback(() => {
        setIsFlipped(false);
        setSwipeCommand(null);
        setActiveIndex((index) => Math.min(index + 1, cardCount));
    }, [cardCount]);

    const requestSwipeLeft = useCallback(() => {
        swipeCommandIdRef.current += 1;
        setIsFlipped(false);
        setSwipeCommand({
            id: swipeCommandIdRef.current,
            direction: FLIPCARD_SWIPE_COMMAND_DIRECTION.LEFT
        });
    }, []);

    const requestSwipeRight = useCallback(() => {
        swipeCommandIdRef.current += 1;
        setIsFlipped(false);
        setSwipeCommand({
            id: swipeCommandIdRef.current,
            direction: FLIPCARD_SWIPE_COMMAND_DIRECTION.RIGHT
        });
    }, []);

    return {
        activeIndex,
        isFlipped,
        isComplete,
        hasPrevious,
        hasNext,
        swipeCommand,
        isSwipeCommandActive,
        flipActiveCard,
        goToPrevious,
        goToNext,
        requestSwipeLeft,
        requestSwipeRight
    };
}

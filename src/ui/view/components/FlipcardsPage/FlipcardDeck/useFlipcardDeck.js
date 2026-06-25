// src/ui/view/components/FlipcardsPage/FlipcardDeck/useFlipcardDeck.js
import { useCallback, useEffect, useState } from "react";

export function useFlipcardDeck(cardCount, deckKey) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        setActiveIndex(0);
        setIsFlipped(false);
    }, [deckKey]);

    const isComplete = activeIndex >= cardCount;
    const hasPrevious = activeIndex > 0;
    const hasNext = activeIndex < cardCount - 1;

    const flipActiveCard = useCallback(() => {
        setIsFlipped((flipped) => !flipped);
    }, []);

    const goToPrevious = useCallback(() => {
        setIsFlipped(false);
        setActiveIndex((index) => Math.max(index - 1, 0));
    }, []);

    const goToNext = useCallback(() => {
        setIsFlipped(false);
        setActiveIndex((index) => Math.min(index + 1, cardCount));
    }, [cardCount]);

    return {
        activeIndex,
        isFlipped,
        isComplete,
        hasPrevious,
        hasNext,
        flipActiveCard,
        goToPrevious,
        goToNext
    };
}

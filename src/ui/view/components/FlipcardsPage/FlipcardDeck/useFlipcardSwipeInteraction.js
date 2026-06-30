// src/ui/view/components/FlipcardsPage/FlipcardDeck/useFlipcardSwipeInteraction.js
import { useCallback, useEffect, useRef, useState } from "react";
import { FLIPCARD_SWIPE_COMMAND_DIRECTION } from "./flipcardSwipe.js";

export function useFlipcardSwipeInteraction(resetKey) {
    const nextSwipeCommandIdRef = useRef(0);
    const [activeSwipeCommand, setActiveSwipeCommand] = useState(null);

    const isSwipeCommandActive = activeSwipeCommand !== null;

    useEffect(() => {
        setActiveSwipeCommand(null);
    }, [resetKey]);

    const requestPracticeSwipe = useCallback(() => {
        nextSwipeCommandIdRef.current += 1;

        setActiveSwipeCommand({
            id: nextSwipeCommandIdRef.current,
            direction: FLIPCARD_SWIPE_COMMAND_DIRECTION.LEFT
        });
    }, []);

    const requestMasteredSwipe = useCallback(() => {
        nextSwipeCommandIdRef.current += 1;

        setActiveSwipeCommand({
            id: nextSwipeCommandIdRef.current,
            direction: FLIPCARD_SWIPE_COMMAND_DIRECTION.RIGHT
        });
    }, []);

    const clearActiveSwipeCommand = useCallback(() => {
        setActiveSwipeCommand(null);
    }, []);

    return {
        activeSwipeCommand,
        isSwipeCommandActive,
        requestPracticeSwipe,
        requestMasteredSwipe,
        clearActiveSwipeCommand
    };
}

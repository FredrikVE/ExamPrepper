// src/ui/view/components/FlipcardsPage/FlipcardDeck/Flipcard.jsx
import { useCallback, useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import CardFaces from "./CardFaces.jsx";
import SwipeIndicators from "./SwipeIndicators.jsx";
import {
    FLIPCARD_SWIPE_RESULT,
    resolveFlipcardSwipeResult,
    resolveFlipcardSwipeResultFromCommand
} from "./flipcardSwipe.js";

const EXIT_DISTANCE = 720;
const EXIT_DURATION_SECONDS = 0.22;
const SNAP_BACK_SPRING = {
    type: "spring",
    stiffness: 420,
    damping: 34
};

function resolveExitX(swipeResult) {
    if (swipeResult === FLIPCARD_SWIPE_RESULT.PRACTICE) {
        return -EXIT_DISTANCE;
    }

    return EXIT_DISTANCE;
}

export default function Flipcard({
    term,
    definition,
    isFlipped,
    label,
    labels,
    swipeCommand,
    onSwipePractice,
    onSwipeMastered
}) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-240, 0, 240], [-11, 0, 11]);
    const practiceOpacity = useTransform(x, [-160, -64, 0], [1, 0.35, 0]);
    const masteredOpacity = useTransform(x, [0, 64, 160], [0, 0.35, 1]);
    const handledSwipeCommandIdRef = useRef(null);
    const isCompletingSwipeRef = useRef(false);

    const completeSwipe = useCallback((swipeResult) => {
        if (swipeResult === FLIPCARD_SWIPE_RESULT.PRACTICE) {
            onSwipePractice();
            return;
        }

        onSwipeMastered();
    }, [onSwipeMastered, onSwipePractice]);

    const animateSwipeExit = useCallback((swipeResult) => {
        if (!swipeResult || isCompletingSwipeRef.current) {
            return;
        }

        isCompletingSwipeRef.current = true;

        animate(x, resolveExitX(swipeResult), {
            duration: EXIT_DURATION_SECONDS,
            ease: "easeOut",
            onComplete: () => {
                completeSwipe(swipeResult);
                isCompletingSwipeRef.current = false;
            }
        });
    }, [completeSwipe, x]);

    useEffect(() => {
        if (!swipeCommand || handledSwipeCommandIdRef.current === swipeCommand.id) {
            return;
        }

        handledSwipeCommandIdRef.current = swipeCommand.id;
        const swipeResult = resolveFlipcardSwipeResultFromCommand(swipeCommand.direction);
        animateSwipeExit(swipeResult);
    }, [animateSwipeExit, swipeCommand]);

    const handleDragEnd = (_event, info) => {
        if (isCompletingSwipeRef.current) {
            return;
        }

        const swipeResult = resolveFlipcardSwipeResult({
            offsetX: info.offset.x,
            velocityX: info.velocity.x
        });

        if (!swipeResult) {
            animate(x, 0, SNAP_BACK_SPRING);
            return;
        }

        animateSwipeExit(swipeResult);
    };

    return (
        <motion.article
            className="flipcard"
            aria-label={label}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            style={{ x, rotate }}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: "grabbing" }}
        >
            <SwipeIndicators
                labels={labels}
                practiceOpacity={practiceOpacity}
                masteredOpacity={masteredOpacity}
            />
            <motion.div
                className="swipe-indicator-proxy swipe-indicator-proxy-practice"
                style={{ opacity: practiceOpacity }}
                aria-hidden="true"
            />
            <motion.div
                className="swipe-indicator-proxy swipe-indicator-proxy-mastered"
                style={{ opacity: masteredOpacity }}
                aria-hidden="true"
            />
            <CardFaces
                term={term}
                definition={definition}
                isFlipped={isFlipped}
            />
        </motion.article>
    );
}

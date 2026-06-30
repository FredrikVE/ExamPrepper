// src/ui/view/components/FlipcardsPage/FlipcardDeck/useFlipcardMotionInteraction.js
import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useMotionValue, useTransform } from "motion/react";
import { FLIPCARD_SWIPE_RESULT, resolveFlipcardSwipeResult, resolveFlipcardSwipeResultFromCommand } from "./flipcardSwipe.js";

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

export function useFlipcardMotionInteraction(params) {
	const x = useMotionValue(0);
	const rotate = useTransform(x, [-240, 0, 240], [-11, 0, 11]);
	const practiceOpacity = useTransform(x, [-160, -64, 0], [1, 0.35, 0]);
	const masteredOpacity = useTransform(x, [0, 64, 160], [0, 0.35, 1]);
	const practiceHintOpacity = useTransform(x, [-160, -64, 0], [0.9, 0.32, 0]);
	const masteredHintOpacity = useTransform(x, [0, 64, 160], [0, 0.32, 0.9]);
	const practiceBadgeScale = useTransform(x, [-160, -64, 0], [1, 0.96, 0.92]);
	const masteredBadgeScale = useTransform(x, [0, 64, 160], [0.92, 0.96, 1]);
	const handledSwipeCommandIdRef = useRef(null);
	const isCompletingSwipeRef = useRef(false);
	const activeAnimationRef = useRef(null);
	const [isCompletingSwipe, setIsCompletingSwipe] = useState(false);

	const stopActiveAnimation = useCallback(() => {
		if (!activeAnimationRef.current) {
			return;
		}

		activeAnimationRef.current.stop();
		activeAnimationRef.current = null;
	}, []);

	const completeSwipe = useCallback((swipeResult) => {
		if (swipeResult === FLIPCARD_SWIPE_RESULT.PRACTICE) {
			params.onSwipePractice(params.cardId);
			return;
		}

		params.onSwipeMastered(params.cardId);
	}, [params.cardId, params.onSwipeMastered, params.onSwipePractice]);

	const animateSwipeExit = useCallback((swipeResult) => {
		if (!swipeResult || isCompletingSwipeRef.current) {
			return;
		}

		stopActiveAnimation();
		isCompletingSwipeRef.current = true;
		setIsCompletingSwipe(true);

		activeAnimationRef.current = animate(x, resolveExitX(swipeResult), {
			duration: EXIT_DURATION_SECONDS,
			ease: "easeOut",
			onComplete: () => {
				activeAnimationRef.current = null;
				completeSwipe(swipeResult);
				isCompletingSwipeRef.current = false;
				setIsCompletingSwipe(false);
			}
		});
	}, [completeSwipe, stopActiveAnimation, x]);

	useEffect(() => {
		if (!params.swipeCommand || handledSwipeCommandIdRef.current === params.swipeCommand.id) {
			return;
		}

		handledSwipeCommandIdRef.current = params.swipeCommand.id;
		const swipeResult = resolveFlipcardSwipeResultFromCommand(params.swipeCommand.direction);
		animateSwipeExit(swipeResult);
	}, [animateSwipeExit, params.swipeCommand]);

	useEffect(() => {
		return () => {
			stopActiveAnimation();
			isCompletingSwipeRef.current = false;
		};
	}, [stopActiveAnimation]);

	const handleDragEnd = useCallback((_event, info) => {
		if (isCompletingSwipeRef.current) {
			return;
		}

		const swipeResult = resolveFlipcardSwipeResult({
			offsetX: info.offset.x,
			velocityX: info.velocity.x
		});

		if (!swipeResult) {
			stopActiveAnimation();
			activeAnimationRef.current = animate(x, 0, SNAP_BACK_SPRING);
			return;
		}

		animateSwipeExit(swipeResult);
	}, [animateSwipeExit, stopActiveAnimation, x]);

	return {
		x,
		rotate,
		practiceOpacity,
		masteredOpacity,
		practiceHintOpacity,
		masteredHintOpacity,
		practiceBadgeScale,
		masteredBadgeScale,
		isCompletingSwipe,
		handleDragEnd
	};
}

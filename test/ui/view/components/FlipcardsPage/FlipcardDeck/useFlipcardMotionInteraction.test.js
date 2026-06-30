import { beforeEach, describe, expect, jest, test } from "@jest/globals";

const stateValues = [];
const stateSetters = [];
const refValues = [];

const useState = jest.fn((initialValue) => {
	const stateIndex = stateSetters.length;
	const fallbackValue = typeof initialValue === "function" ? initialValue() : initialValue;
	const value = stateIndex in stateValues ? stateValues[stateIndex] : fallbackValue;
	const setter = jest.fn((nextValue) => {
		stateValues[stateIndex] = typeof nextValue === "function"
			? nextValue(stateValues[stateIndex])
			: nextValue;
	});

	stateSetters.push(setter);

	return [value, setter];
});

const useEffect = jest.fn((effect) => effect());
const useCallback = jest.fn((callback) => callback);
const useRef = jest.fn((initialValue) => {
	const refIndex = refValues.length;

	if (!refValues[refIndex]) {
		refValues[refIndex] = { current: initialValue };
	}

	return refValues[refIndex];
});

const xMotionValue = { id: "x-motion-value" };
const rotateTransform = { id: "rotate-transform" };
const practiceOpacityTransform = { id: "practice-opacity-transform" };
const masteredOpacityTransform = { id: "mastered-opacity-transform" };

const stopAnimation = jest.fn();
const animate = jest.fn(() => ({ stop: stopAnimation }));
const useMotionValue = jest.fn(() => xMotionValue);
const useTransform = jest.fn((_value, _inputRange, _outputRange) => {
	const transformIndex = useTransform.mock.calls.length;

	if (transformIndex === 1) {
		return rotateTransform;
	}

	if (transformIndex === 2) {
		return practiceOpacityTransform;
	}

	return masteredOpacityTransform;
});

jest.unstable_mockModule("react", () => ({
	useCallback,
	useEffect,
	useRef,
	useState
}));

jest.unstable_mockModule("motion/react", () => ({
	animate,
	useMotionValue,
	useTransform
}));

const { FLIPCARD_SWIPE_COMMAND_DIRECTION } = await import(
	"../../../../../../src/ui/view/components/FlipcardsPage/FlipcardDeck/flipcardSwipe.js"
);
const { useFlipcardMotionInteraction } = await import(
	"../../../../../../src/ui/view/components/FlipcardsPage/FlipcardDeck/useFlipcardMotionInteraction.js"
);

function createHook(params) {
	return useFlipcardMotionInteraction(params);
}

function createParams(swipeCommand, onSwipePractice, onSwipeMastered) {
	return {
		cardId: "card-a",
		swipeCommand,
		onSwipePractice,
		onSwipeMastered
	};
}

describe("useFlipcardMotionInteraction", () => {
	beforeEach(() => {
		stateValues.length = 0;
		stateSetters.length = 0;
		refValues.length = 0;
		useState.mockClear();
		useEffect.mockClear();
		useCallback.mockClear();
		useRef.mockClear();
		animate.mockClear();
		useMotionValue.mockClear();
		useTransform.mockClear();
		stopAnimation.mockClear();
	});

	test("returns motion values used by the card renderer", () => {
		const motionInteraction = createHook(createParams(null, jest.fn(), jest.fn()));

		expect(motionInteraction.x).toBe(xMotionValue);
		expect(motionInteraction.rotate).toBe(rotateTransform);
		expect(motionInteraction.practiceOpacity).toBe(practiceOpacityTransform);
		expect(motionInteraction.masteredOpacity).toBe(masteredOpacityTransform);
		expect(motionInteraction.isCompletingSwipe).toBe(false);
	});

	test("completes command swipes with the card id after the exit animation", () => {
		const onSwipePractice = jest.fn();
		const onSwipeMastered = jest.fn();

		createHook(createParams({
			id: 7,
			direction: FLIPCARD_SWIPE_COMMAND_DIRECTION.LEFT
		}, onSwipePractice, onSwipeMastered));

		expect(animate).toHaveBeenCalledWith(xMotionValue, -720, expect.objectContaining({
			duration: 0.22,
			ease: "easeOut"
		}));
		expect(onSwipePractice).not.toHaveBeenCalled();

		animate.mock.calls[0][2].onComplete();

		expect(onSwipePractice).toHaveBeenCalledWith("card-a");
		expect(onSwipeMastered).not.toHaveBeenCalled();
	});

	test("snaps the card back when drag does not pass the swipe threshold", () => {
		const motionInteraction = createHook(createParams(null, jest.fn(), jest.fn()));

		motionInteraction.handleDragEnd(null, {
			offset: { x: 72 },
			velocity: { x: 0 }
		});

		expect(animate).toHaveBeenCalledWith(xMotionValue, 0, {
			type: "spring",
			stiffness: 420,
			damping: 34
		});
	});
});

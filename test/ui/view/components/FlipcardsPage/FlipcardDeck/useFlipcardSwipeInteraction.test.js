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

jest.unstable_mockModule("react", () => ({
	useCallback,
	useEffect,
	useRef,
	useState
}));

const { FLIPCARD_SWIPE_COMMAND_DIRECTION } = await import(
	"../../../../../../src/ui/view/components/FlipcardsPage/FlipcardDeck/flipcardSwipe.js"
);
const { useFlipcardSwipeInteraction } = await import(
	"../../../../../../src/ui/view/components/FlipcardsPage/FlipcardDeck/useFlipcardSwipeInteraction.js"
);

function createHook(activeSwipeCommand) {
	stateValues[0] = activeSwipeCommand;

	return useFlipcardSwipeInteraction("deck-a");
}

function clearSetterCalls() {
	stateSetters.forEach((setter) => setter.mockClear());
}

describe("useFlipcardSwipeInteraction", () => {
	beforeEach(() => {
		stateValues.length = 0;
		stateSetters.length = 0;
		refValues.length = 0;
		useState.mockClear();
		useEffect.mockClear();
		useCallback.mockClear();
		useRef.mockClear();
	});

	test("returns active command state and active flag", () => {
		const activeSwipeCommand = {
			id: 7,
			direction: FLIPCARD_SWIPE_COMMAND_DIRECTION.LEFT
		};

		const swipe = createHook(activeSwipeCommand);

		expect(swipe.activeSwipeCommand).toBe(activeSwipeCommand);
		expect(swipe.isSwipeCommandActive).toBe(true);
	});

	test("clears the active command when reset key changes", () => {
		createHook({
			id: 1,
			direction: FLIPCARD_SWIPE_COMMAND_DIRECTION.RIGHT
		});

		expect(stateSetters[0]).toHaveBeenCalledWith(null);
	});

	test("requests practice and mastered swipe commands with monotonic ids", () => {
		const swipe = createHook(null);

		clearSetterCalls();

		swipe.requestPracticeSwipe();
		swipe.requestMasteredSwipe();

		expect(stateSetters[0]).toHaveBeenNthCalledWith(1, {
			id: 1,
			direction: FLIPCARD_SWIPE_COMMAND_DIRECTION.LEFT
		});
		expect(stateSetters[0]).toHaveBeenNthCalledWith(2, {
			id: 2,
			direction: FLIPCARD_SWIPE_COMMAND_DIRECTION.RIGHT
		});
	});

	test("clears active command on demand", () => {
		const swipe = createHook({
			id: 3,
			direction: FLIPCARD_SWIPE_COMMAND_DIRECTION.LEFT
		});

		clearSetterCalls();

		swipe.clearActiveSwipeCommand();

		expect(stateSetters[0]).toHaveBeenCalledWith(null);
	});
});
